import { useEffect, useState } from "react";
import AsciiBackdrop from "../components/AsciiBackdrop";
import { AsciiTile } from "../components/AsciiTile";
import { Crosshair, CornerPlus, TickBar, RotatingBadge, Barcode } from "../components/Marks";
import { POSTS, type Post } from "../data/posts";
import "./immersive.css";

function navigate(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo(0, 0);
}

function useTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function useCoords() {
  const [c, setC] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const h = (e: PointerEvent) => setC({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", h);
    return () => window.removeEventListener("pointermove", h);
  }, []);
  return c;
}

function PostCover({ post }: { post: Post }) {
  if (post.cover.kind === "image" && post.cover.src) {
    return (
      <div className="cover-image" style={{ backgroundImage: `url(${post.cover.src})` }}>
        <div className="cover-image-vignette" />
      </div>
    );
  }
  return <AsciiTile seed={post.cover.seed ?? 0} cell={9} />;
}

export default function ImmersiveHome() {
  const now = useTime();
  const coords = useCoords();
  const featured = POSTS[0];
  const recent = POSTS.slice(1, 5);
  const extras = POSTS.slice(5);

  return (
    <div className="im-root">
      {/* Animated ASCII shader backdrop */}
      <AsciiBackdrop opacity={0.55} />

      {/* Dimming gradient layer */}
      <div className="im-dim" />

      {/* Scanlines */}
      <div className="im-scan" />

      {/* HUD: top bar */}
      <header className="hud hud-top">
        <div className="hud-group">
          <span className="hud-slash">//</span>
          <span className="hud-label">KONA · PORTFOLIO</span>
          <span className="hud-pill">01</span>
          <span className="hud-rule" />
        </div>
        <div className="hud-group hud-right">
          <Crosshair size={18} style={{ color: "var(--acc)" }} />
          <span className="hud-mono">
            {now.toISOString().slice(0, 10)} · {now.toISOString().slice(11, 19)}Z
          </span>
        </div>
      </header>

      {/* Bento grid */}
      <main className="im-grid">
        {/* Hero block */}
        <section className="tile tile-hero">
          <CornerPlus style={{ position: "absolute", top: 10, left: 10, color: "var(--acc)" }} />
          <span className="tile-meta tl">[ 00 / INDEX ]</span>

          <h1 className="mega">
            <span className="mega-k">K</span>
            <span className="mega-rest">ONA</span>
            <span className="mega-dot">.</span>
          </h1>
          <p className="hero-sub">
            IMAGE-MAKER &amp; WRITER<br />
            CATALOGUING THE STUFF<br />
            BETWEEN THE STUFF.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => navigate(`/post/${featured.slug}`)}>
              [ ENTER →  ]
            </button>
            <button className="btn btn-ghost" onClick={() => document.getElementById("log")?.scrollIntoView({ behavior: "smooth" })}>
              VIEW LOG ↓
            </button>
          </div>

          <span className="tile-meta br">CURSOR · {String(coords.x).padStart(4, "0")}, {String(coords.y).padStart(4, "0")}</span>
        </section>

        {/* Featured cover */}
        <section className="tile tile-feature" onClick={() => navigate(`/post/${featured.slug}`)}>
          <div className="feature-cover">
            <PostCover post={featured} />
          </div>
          <div className="feature-top">
            <span>FEATURED</span>
            <span>{featured.date.slice(0, 4)}</span>
          </div>
          <div className="feature-bottom">
            <div className="feature-year">{featured.date.slice(0, 4)}</div>
            <div className="feature-sub">{featured.excerpt}</div>
          </div>
          <CornerPlus style={{ position: "absolute", bottom: 10, left: 10, color: "var(--acc)" }} />
        </section>

        {/* Nav */}
        <nav className="tile tile-nav">
          <Crosshair size={14} style={{ color: "var(--acc)", position: "absolute", top: 14, left: 14 }} />
          <a href="#log" onClick={(e) => { e.preventDefault(); document.getElementById("log")?.scrollIntoView({ behavior: "smooth" }); }}>LOG</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }}>ABOUT</a>
          <a href="/labs" onClick={(e) => { e.preventDefault(); navigate("/labs"); }}>LABS</a>
          <a href="mailto:hi@kcodes.me">CONTACT</a>
          <span className="nav-led" />
        </nav>

        {/* Terrain feature image */}
        <section className="tile tile-terrain">
          <div
            className="terrain-bg"
            style={{ backgroundImage: `url(/images/sona/kona-black.png)` }}
          />
          <div className="terrain-veins" />
          <span className="tile-meta tl">/ TERRAIN / 24.01</span>
          <span className="tile-meta br">LAT 22.39° LON 114.10°</span>
        </section>

        {/* CTA stack */}
        <section className="tile tile-ctas">
          <button className="cta-row cta-primary" onClick={() => navigate(`/post/${featured.slug}`)}>
            <span>ENTER THE ARCHIVE</span>
            <span>↗</span>
          </button>
          <button className="cta-row" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
            <span>ABOUT KONA</span>
            <span>↗</span>
          </button>
        </section>

        {/* Badge */}
        <section className="tile tile-badge">
          <RotatingBadge />
        </section>

        {/* Icon row */}
        <section className="tile tile-icons">
          <div className="icon-cell"><CornerPlus style={{ color: "var(--acc)" }} /></div>
          <div className="icon-cell"><svg width="20" height="20" viewBox="0 0 20 20"><rect x="2" y="2" width="12" height="12" fill="none" stroke="currentColor" /><rect x="6" y="6" width="12" height="12" fill="none" stroke="currentColor" /></svg></div>
          <div className="icon-cell"><Crosshair size={20} /></div>
          <div className="icon-cell">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 4px)", gridAutoRows: "4px", gap: 2 }}>
              {Array.from({ length: 9 }).map((_, i) => <div key={i} style={{ background: "currentColor" }} />)}
            </div>
          </div>
        </section>

        {/* Static portrait tile */}
        <section className="tile tile-portrait">
          <AsciiTile seed={42} cell={7} accent="#c9ff00" dim="#2a2a1e" live />
          <div className="portrait-ui">
            <span className="tile-meta tl">///</span>
            <span className="tile-meta tr">+</span>
            <span className="tile-meta bl">+</span>
            <TickBar count={30} style={{ position: "absolute", right: 10, top: "40%", color: "var(--acc)", width: 60, transform: "rotate(90deg)", transformOrigin: "right top" }} />
          </div>
        </section>

        {/* Typography specimen */}
        <section className="tile tile-type">
          <span className="tile-meta tl">JETBRAINS MONO / SPACE GROTESK</span>
          <div className="type-aa">Kk</div>
          <div className="type-alpha">ABCDEFGH!@#$%^&amp;*()_+=-</div>
          <div className="type-weights">
            <span>LIGHT</span><span>REGULAR</span><span>MEDIUM</span><span className="on">BOLD</span>
          </div>
        </section>

        {/* Palette */}
        <section className="tile tile-palette">
          {featured.palette.map((hex) => (
            <div className="swatch" key={hex}>
              <span className="chip" style={{ background: hex }} />
              <span className="hex">{hex}</span>
            </div>
          ))}
        </section>

        {/* Gradient / mood */}
        <section className="tile tile-mood">
          <div className="mood-bloom" />
          <span className="tile-meta tl">MOOD · 004</span>
          <span className="tile-meta br">+</span>
        </section>

        {/* Work card (opens second post) */}
        <section className="tile tile-work" onClick={() => navigate(`/post/${recent[0].slug}`)}>
          <PostCover post={recent[0]} />
          <div className="work-top">
            <span className="work-label">WORK</span>
            <span className="work-num">(04)</span>
          </div>
          <div className="work-bottom">
            <span>EXPLORE</span>
            <span>→</span>
          </div>
        </section>
      </main>

      {/* Bottom HUD */}
      <footer className="hud hud-bottom">
        <Barcode style={{ color: "var(--acc)" }} />
        <Crosshair size={18} style={{ color: "var(--acc)" }} />
        <span className="hud-mono">[ BUILT DIFFERENT ]</span>
      </footer>

      {/* LOG SECTION */}
      <section id="log" className="log-section">
        <header className="log-head">
          <span className="slash">// LOG</span>
          <span className="ticker">{POSTS.length} ENTRIES · UPDATED {now.toISOString().slice(0, 10)}</span>
          <span className="hud-rule" />
        </header>

        <h2 className="log-title">
          POSTS<span className="acc">,</span> PHOTOS<span className="acc">,</span><br />
          FIELD NOTES<span className="acc">.</span>
        </h2>

        <div className="log-grid">
          {[featured, ...recent, ...extras].map((post, i) => (
            <article
              key={post.slug}
              className="log-card"
              onClick={() => navigate(`/post/${post.slug}`)}
            >
              <div className="log-cover">
                <PostCover post={post} />
              </div>
              <div className="log-info">
                <div className="log-row">
                  <span className="log-idx">{String(i + 1).padStart(2, "0")}</span>
                  <span className="log-tag">{post.tag}</span>
                  <span className="log-date">{post.date}</span>
                </div>
                <h3 className="log-card-title">{post.title}</h3>
                <p className="log-excerpt">{post.excerpt}</p>
                <div className="log-cta">
                  <span>READ</span>
                  <span className="arrow">→</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="about-section">
        <div className="about-grid">
          <div className="about-left">
            <span className="slash">// ABOUT · 02</span>
            <h2 className="about-title">
              HI, I'M<br /><span className="acc-text">KONA.</span>
            </h2>
            <p className="about-body">
              I photograph, write, and design things at the intersection of image and interface.
              This site is a running archive — more scrapbook than CV — of the pieces I keep coming back to.
            </p>
            <p className="about-body">
              Lives in a notebook. Works in a text editor. Ships in the dark.
            </p>
            <div className="about-links">
              <a href="mailto:hi@kcodes.me">HI@KCODES.ME ↗</a>
              <a href="https://github.com/kcodes0" target="_blank" rel="noreferrer">GITHUB ↗</a>
              <a href="/labs" onClick={(e) => { e.preventDefault(); navigate("/labs"); }}>LABS ↗</a>
            </div>
          </div>

          <div className="about-right">
            <AsciiTile seed={99} cell={9} live />
            <div className="about-card-hud">
              <span className="tile-meta tl">+</span>
              <span className="tile-meta tr">PORTRAIT · 01</span>
              <span className="tile-meta bl">+</span>
              <span className="tile-meta br">+</span>
            </div>
          </div>
        </div>

        <footer className="site-foot">
          <span>© {now.getUTCFullYear()} KONA</span>
          <span>KCODES.ME</span>
          <span className="acc">[ BUILT DIFFERENT ]</span>
        </footer>
      </section>
    </div>
  );
}
