import os
import discord
from discord import app_commands
import httpx

DISCORD_TOKEN = os.environ["DISCORD_TOKEN"]
API_BASE = os.environ.get("FAQ_API_BASE", "https://api.kcodes.me/claude-faqs/v1")
API_KEY = os.environ.get("FAQ_API_KEY", "")

PURPLE = 0x7855FA

intents = discord.Intents.default()
intents.message_content = True

client = discord.Client(intents=intents)
tree = app_commands.CommandTree(client)
http = httpx.AsyncClient(timeout=15)


def api_headers() -> dict[str, str]:
    headers = {"Content-Type": "application/json"}
    if API_KEY:
        headers["Authorization"] = f"Bearer {API_KEY}"
    return headers


async def api_get(path: str, params: dict | None = None) -> dict:
    url = f"{API_BASE}{path}"
    r = await http.get(url, params=params or {}, headers=api_headers())
    r.raise_for_status()
    return r.json()


async def api_post(path: str, body: dict) -> dict:
    url = f"{API_BASE}{path}"
    r = await http.post(url, json=body, headers=api_headers())
    r.raise_for_status()
    return r.json()


def entry_embed(data: dict) -> discord.Embed:
    answer = data.get("answer", data.get("description", ""))
    if len(answer) > 4096:
        answer = answer[:4093] + "..."

    embed = discord.Embed(
        title=data.get("question", data.get("title", "FAQ")),
        description=answer,
        color=PURPLE,
    )

    category = data.get("category", "")
    subcategory = data.get("subcategory", "")
    if category:
        cat_display = f"{category} > {subcategory}" if subcategory and subcategory != category else category
        embed.add_field(name="Category", value=cat_display, inline=True)

    tags = data.get("tags", [])
    if tags:
        embed.add_field(name="Tags", value=", ".join(tags[:5]), inline=True)

    embed.set_footer(text="Claude Community FAQ | api.kcodes.me")
    return embed


def search_results_embed(query: str, results: list[dict]) -> discord.Embed:
    embed = discord.Embed(
        title=f"Search: {query}",
        color=PURPLE,
    )

    if not results:
        embed.description = "No results found. Try different keywords."
        return embed

    lines = []
    for i, r in enumerate(results[:10], 1):
        slug = r.get("slug", "?")
        question = r.get("question", "?")
        preview = r.get("answer_preview", "")
        lines.append(f"**{i}. {question}**\n`/faq {slug}`\n{preview[:120]}{'...' if len(preview) > 120 else ''}\n")

    embed.description = "\n".join(lines)
    embed.set_footer(text=f"{len(results)} result(s) | Claude Community FAQ")
    return embed


def ask_embed(question: str, data: dict) -> discord.Embed:
    answer = data.get("answer", "No answer available.")
    if len(answer) > 4096:
        answer = answer[:4093] + "..."

    embed = discord.Embed(
        title=question[:256],
        description=answer,
        color=PURPLE,
    )

    sources = data.get("sources", [])
    if sources:
        source_lines = [f"`{s['slug']}` - {s['question']}" for s in sources[:5]]
        embed.add_field(name="Sources", value="\n".join(source_lines), inline=False)

    note = data.get("note")
    if note:
        embed.add_field(name="Note", value=note, inline=False)

    embed.set_footer(text="Claude Community FAQ | AI-powered answer")
    return embed


# ── Slash Commands ──

@tree.command(name="faq", description="Look up a FAQ entry by slug")
@app_commands.describe(slug="The FAQ slug (e.g. account-banned, billing-refund)")
async def faq_cmd(interaction: discord.Interaction, slug: str):
    await interaction.response.defer()
    try:
        data = await api_get(f"/{slug}")
        if "error" in data:
            suggestions = data.get("did_you_mean", [])
            msg = f"FAQ `{slug}` not found."
            if suggestions:
                msg += "\n\nDid you mean:\n" + "\n".join(f"- `{s['slug']}` — {s['question']}" for s in suggestions)
            await interaction.followup.send(msg)
        else:
            await interaction.followup.send(embed=entry_embed(data))
    except httpx.HTTPStatusError as e:
        if e.response.status_code == 404:
            body = e.response.json()
            suggestions = body.get("did_you_mean", [])
            msg = f"FAQ `{slug}` not found."
            if suggestions:
                msg += "\n\nDid you mean:\n" + "\n".join(f"- `{s['slug']}` — {s['question']}" for s in suggestions)
            await interaction.followup.send(msg)
        elif e.response.status_code == 429:
            await interaction.followup.send("Rate limited. Please try again later.")
        else:
            await interaction.followup.send(f"API error: {e.response.status_code}")
    except Exception as e:
        await interaction.followup.send(f"Error: {e}")


@tree.command(name="faq-search", description="Search FAQs by keyword")
@app_commands.describe(
    query="Search keywords (e.g. billing refund)",
    mode="Search mode: tags (fast) or semantic (AI-powered)",
)
@app_commands.choices(mode=[
    app_commands.Choice(name="Tags (keyword match)", value="tags"),
    app_commands.Choice(name="Semantic (AI-powered)", value="semantic"),
])
async def faq_search_cmd(interaction: discord.Interaction, query: str, mode: str = "tags"):
    await interaction.response.defer()
    try:
        data = await api_get("/search", {"q": query, "mode": mode, "limit": "5"})
        results = data.get("results", [])
        await interaction.followup.send(embed=search_results_embed(query, results))
    except httpx.HTTPStatusError as e:
        if e.response.status_code == 429:
            await interaction.followup.send("Rate limited. Please try again later.")
        else:
            await interaction.followup.send(f"API error: {e.response.status_code}")
    except Exception as e:
        await interaction.followup.send(f"Error: {e}")


@tree.command(name="faq-ask", description="Ask a question and get an AI-powered answer")
@app_commands.describe(question="Your question about Claude")
async def faq_ask_cmd(interaction: discord.Interaction, question: str):
    await interaction.response.defer()
    try:
        data = await api_post("/ask", {"question": question})
        await interaction.followup.send(embed=ask_embed(question, data))
    except httpx.HTTPStatusError as e:
        if e.response.status_code == 429:
            await interaction.followup.send("Rate limited. Please try again later.")
        else:
            await interaction.followup.send(f"API error: {e.response.status_code}")
    except Exception as e:
        await interaction.followup.send(f"Error: {e}")


@tree.command(name="faq-categories", description="List all FAQ categories")
async def faq_categories_cmd(interaction: discord.Interaction):
    await interaction.response.defer()
    try:
        data = await api_get("/categories")
        categories = data.get("categories", [])

        embed = discord.Embed(title="FAQ Categories", color=PURPLE)
        for cat in categories:
            subs = cat.get("subcategories", [])
            value = f"{cat['entry_count']} entries"
            if subs:
                value += f"\n{', '.join(subs[:5])}"
            embed.add_field(name=cat["name"], value=value, inline=False)

        embed.set_footer(text="Claude Community FAQ | api.kcodes.me")
        await interaction.followup.send(embed=embed)
    except Exception as e:
        await interaction.followup.send(f"Error: {e}")


@tree.command(name="faq-list", description="List FAQ entries, optionally filtered by category")
@app_commands.describe(category="Filter by category name (optional)")
async def faq_list_cmd(interaction: discord.Interaction, category: str | None = None):
    await interaction.response.defer()
    try:
        params = {}
        if category:
            params["category"] = category

        data = await api_get("/entries", params)
        entries = data.get("entries", [])

        if not entries:
            await interaction.followup.send("No entries found for that category.")
            return

        embed = discord.Embed(
            title=f"FAQ Entries{f' — {category}' if category else ''}",
            color=PURPLE,
        )

        lines = []
        for e in entries[:25]:
            lines.append(f"`{e['slug']}` — {e['question']}")

        embed.description = "\n".join(lines)

        if len(entries) > 25:
            embed.set_footer(text=f"Showing 25 of {len(entries)} entries | Use /faq <slug> for details")
        else:
            embed.set_footer(text=f"{len(entries)} entries | Use /faq <slug> for details")

        await interaction.followup.send(embed=embed)
    except Exception as e:
        await interaction.followup.send(f"Error: {e}")


# ── @mention handler ──

@client.event
async def on_message(message: discord.Message):
    if message.author.bot:
        return

    if not client.user or client.user not in message.mentions:
        return

    # Strip the mention to get the question
    question = message.content
    for mention in message.mentions:
        question = question.replace(f"<@{mention.id}>", "").replace(f"<@!{mention.id}>", "")
    question = question.strip()

    if not question:
        await message.reply("Ask me a question about Claude! For example: `@bot How do I reset my password?`")
        return

    async with message.channel.typing():
        try:
            data = await api_post("/ask", {"question": question})
            await message.reply(embed=ask_embed(question, data))
        except httpx.HTTPStatusError as e:
            if e.response.status_code == 429:
                await message.reply("Rate limited. Please try again later.")
            else:
                await message.reply(f"API error: {e.response.status_code}")
        except Exception as e:
            await message.reply(f"Error: {e}")


# ── Startup ──

@client.event
async def on_ready():
    await tree.sync()
    print(f"Logged in as {client.user} (ID: {client.user.id})")
    print(f"API base: {API_BASE}")
    print(f"Synced {len(tree.get_commands())} slash commands")
    print("---")


client.run(DISCORD_TOKEN)
