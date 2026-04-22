import { useEffect, useMemo } from "react";
import AsciiBackdrop from "../components/AsciiBackdrop";
import { AsciiTile } from "../components/AsciiTile";
import { Crosshair, CornerPlus, Barcode } from "../components/Marks";
import { POSTS, postBySlug } from "../data/posts";
import "./immersive.css";
import "./post.css";

function navigate(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo(0, 0);
}

export default function PostPage({ slug }: { slug: string }) {
  const post = postBySlug(slug);

  useEffect(() => {
    if (post) document.title = `${post.title} · KONA`;
    return () => { document.title = "kona · kcodes.me"; };
  }, [post]);

  const related = useMemo(() => {
    if (!post) return [];
    return POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  }, [post]);

  if (!post) {
    return (
      <div className="im-root">
        <AsciiBackdrop opacity={0.5} />
        <div className="im-dim" />
        <div className="post-missing">
          <span className="slash">// 404</span>
          <h1>POST NOT FOUND<span className="acc-text">.</span></h1>
          <button className="btn btn-primary" onClick={() => navigate("/")}>[ ← BACK HOME ]</button>
        </div>
      </div>
    );
  }

  return (
    <div className="im-root">
      <AsciiBackdrop opacity={0.45} />
      <div className="im-dim" />
      <div className="im-scan" />

      <header className="hud hud-top">
        <div className="hud-group">
          <span className="hud-slash">//</span>
          <a className="hud-label hud-back" href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
            ← KONA / INDEX
          </a>
          <span className="hud-pill">{post.era}</span>
          <span className="hud-rule" />
        </div>
        <div className="hud-group hud-right">
          <Crosshair size={18} style={{ color: "var(--acc)" }} />
          <span className="hud-mono">{post.date}</span>
        </div>
      </header>

      <article className="post-wrap">
        <div className="post-hero">
          <div className="post-hero-cover">
            {post.cover.kind === "image" && post.cover.src ? (
              <>
                <div className="cover-image" style={{ backgroundImage: `url(${post.cover.src})` }} />
                <div className="cover-image-vignette" />
              </>
            ) : (
              <AsciiTile seed={post.cover.seed ?? 0} cell={9} live />
            )}
          </div>
          <CornerPlus style={{ position: "absolute", top: 20, left: 20, color: "var(--acc)" }} />
          <CornerPlus style={{ position: "absolute", top: 20, right: 20, color: "var(--acc)" }} />
          <CornerPlus style={{ position: "absolute", bottom: 20, left: 20, color: "var(--acc)" }} />
          <CornerPlus style={{ position: "absolute", bottom: 20, right: 20, color: "var(--acc)" }} />

          <div className="post-hero-meta">
            <span className="tag">{post.tag}</span>
            <span className="dot">·</span>
            <span>{post.date}</span>
          </div>

          <h1 className="post-title">{post.title}<span className="acc-text">.</span></h1>
        </div>

        <div className="post-body-grid">
          <aside className="post-meta">
            <div className="meta-block">
              <span className="meta-k">FILED</span>
              <span className="meta-v">{post.era}</span>
            </div>
            <div className="meta-block">
              <span className="meta-k">TAG</span>
              <span className="meta-v">{post.tag}</span>
            </div>
            <div className="meta-block">
              <span className="meta-k">DATE</span>
              <span className="meta-v">{post.date}</span>
            </div>
            <div className="meta-block">
              <span className="meta-k">PALETTE</span>
              <div className="meta-palette">
                {post.palette.map((hex) => (
                  <span key={hex} title={hex} style={{ background: hex }} />
                ))}
              </div>
            </div>
          </aside>

          <div className="post-body">
            <p className="post-lede">{post.excerpt}</p>
            {post.body.map((para, i) => (
              <p key={i} className="post-p">{para}</p>
            ))}

            <div className="post-sep">
              <Crosshair size={20} style={{ color: "var(--acc)" }} />
              <span className="line" />
            </div>

            <p className="post-p dim">
              — Kona, from the desk · {post.date}
            </p>
          </div>
        </div>

        <section className="post-related">
          <header className="log-head">
            <span className="slash">// MORE FROM THE LOG</span>
            <span className="hud-rule" />
          </header>
          <div className="log-grid">
            {related.map((r, i) => (
              <article key={r.slug} className="log-card" onClick={() => navigate(`/post/${r.slug}`)}>
                <div className="log-cover">
                  {r.cover.kind === "image" && r.cover.src ? (
                    <div className="cover-image" style={{ backgroundImage: `url(${r.cover.src})` }} />
                  ) : (
                    <AsciiTile seed={r.cover.seed ?? 0} cell={9} />
                  )}
                </div>
                <div className="log-info">
                  <div className="log-row">
                    <span className="log-idx">{String(i + 1).padStart(2, "0")}</span>
                    <span className="log-tag">{r.tag}</span>
                    <span className="log-date">{r.date}</span>
                  </div>
                  <h3 className="log-card-title">{r.title}</h3>
                  <p className="log-excerpt">{r.excerpt}</p>
                  <div className="log-cta"><span>READ</span><span className="arrow">→</span></div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </article>

      <footer className="hud hud-bottom">
        <Barcode style={{ color: "var(--acc)" }} />
        <span className="hud-mono">KCODES.ME</span>
        <span className="hud-mono acc-text">[ BUILT DIFFERENT ]</span>
      </footer>
    </div>
  );
}
