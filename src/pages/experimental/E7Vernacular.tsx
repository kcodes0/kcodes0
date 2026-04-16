import { useState, useEffect } from 'react';

const GUESTBOOK_ENTRIES = [
  { name: 'marcus', date: '04/14/26', text: 'came from mara\'s webring. great site. the goose frightens me in the correct way.' },
  { name: 'anon', date: '04/09/26', text: 'first time on the web in twenty years and it looks like my first time on the web twenty years ago. thank you for this.' },
  { name: 'lin', date: '04/02/26', text: 'hi jason :) you told me about this site after we talked about letterpress. still thinking about the margaret garden piece. email me.' },
  { name: 'fernando', date: '03/21/26', text: 'the duck language is funny but i think it is also serious. i am going to learn it. this is a threat.' },
];

const WEBRING_NODES = ['← mara.garden', 'prev', 'RANDOM', 'next', 'julesnet →'];

export default function E7Vernacular() {
  const [hitCount] = useState(() => 14231 + Math.floor(Math.random() * 40));
  const [nameField, setNameField] = useState('');
  const [textField, setTextField] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [visitors] = useState(() => ({
    today: Math.floor(Math.random() * 22) + 6,
    online: Math.floor(Math.random() * 3) + 1,
  }));

  useEffect(() => {
    document.title = '~ JASON\'S HOMEPAGE ~';
    return () => { document.title = 'KONA'; };
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: `
        url("data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'><rect width='48' height='48' fill='%23008080'/><g fill='%2300a0a0' opacity='0.4'><circle cx='8' cy='8' r='2'/><circle cx='24' cy='24' r='2'/><circle cx='40' cy='8' r='2'/><circle cx='40' cy='40' r='2'/><circle cx='8' cy='40' r='2'/></g><g stroke='%2300c0c0' stroke-width='1' opacity='0.3' fill='none'><path d='M0 24 L48 24 M24 0 L24 48'/></g></svg>`)}")
      `,
      backgroundRepeat: 'repeat',
      fontFamily: '"Times New Roman", Times, serif',
      color: '#000000',
      padding: 0,
      margin: 0,
    }}>
      <style>{`
        a { color: #0000ee; }
        a:visited { color: #551a8b; }
        a:active { color: #ff0000; }
        .vn-table { border-collapse: separate; border-spacing: 0; }
        .vn-rainbow {
          background: linear-gradient(90deg, #ff0000, #ff8800, #ffee00, #00cc00, #0088ff, #6600cc, #ff00aa);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-stroke: 1px #000;
        }
        .vn-marquee {
          white-space: nowrap;
          display: inline-block;
          animation: vn-scroll 22s linear infinite;
          padding-left: 100%;
        }
        @keyframes vn-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .vn-blink {
          animation: vn-blink 1.1s steps(2, start) infinite;
        }
        @keyframes vn-blink {
          to { visibility: hidden; }
        }
        .vn-construction {
          background: repeating-linear-gradient(45deg, #ffcc00, #ffcc00 14px, #000000 14px, #000000 28px);
          animation: vn-stripes 1.5s linear infinite;
        }
        @keyframes vn-stripes {
          to { background-position: -40px 0; }
        }
        .vn-lcd {
          font-family: "Courier New", Courier, monospace;
          background: #000;
          color: #00ff55;
          padding: 3px 7px;
          border: 2px inset #aaa;
          letter-spacing: 0.15em;
          text-shadow: 0 0 4px #00ff55;
        }
        .vn-button-3d {
          background: linear-gradient(180deg, #f0f0f0 0%, #c0c0c0 100%);
          border: 2px outset #c0c0c0;
          padding: 4px 10px;
          font-family: "Times New Roman", serif;
          cursor: pointer;
        }
        .vn-button-3d:active { border-style: inset; }
        .vn-input {
          background: #ffffff;
          border: 2px inset #c0c0c0;
          padding: 3px 5px;
          font-family: "Courier New", monospace;
          font-size: 12px;
        }
        .vn-badge {
          display: inline-block;
          width: 88px;
          height: 31px;
          margin: 2px;
          font-size: 9px;
          font-family: Verdana, sans-serif;
          font-weight: bold;
          text-align: center;
          line-height: 1.1;
          padding-top: 6px;
          overflow: hidden;
          vertical-align: middle;
          border: 1px solid #000;
          color: #fff;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .vn-divider {
          height: 6px;
          background: repeating-linear-gradient(90deg, #000 0 8px, transparent 8px 16px);
          margin: 1rem 0;
        }
      `}</style>

      {/* MAIN TABLE-BASED LAYOUT — INTENTIONAL */}
      <table className="vn-table" width="760" align="center" cellPadding={0} cellSpacing={0} style={{ marginTop: '1.5rem', background: '#ffffff', border: '4px ridge #cc9933' }}>
        <tbody>
          {/* Header row */}
          <tr>
            <td colSpan={2} style={{ padding: '1rem', background: '#000000', color: '#ffff00', textAlign: 'center', borderBottom: '4px ridge #cc9933' }}>
              <div className="vn-rainbow" style={{ fontSize: '2.6rem', fontFamily: '"Comic Sans MS", "Chalkboard", cursive', fontWeight: 'bold', lineHeight: 1 }}>
                ~ Jason's Homepage ~
              </div>
              <div style={{ color: '#ffff00', fontStyle: 'italic', marginTop: '0.4rem', fontSize: '0.9rem' }}>
                " a small place on the web · since 2026 "
              </div>
            </td>
          </tr>

          {/* Marquee row */}
          <tr>
            <td colSpan={2} style={{ padding: '3px 0', background: '#000080', color: '#ffff00', overflow: 'hidden' }}>
              <div style={{ overflow: 'hidden', width: '100%' }}>
                <div className="vn-marquee" style={{ fontFamily: 'Verdana, sans-serif', fontSize: '0.8rem' }}>
                  *** welcome to my homepage *** last updated april 14th 2026 *** duck lang v0.3 is out now *** i finally got the guestbook working (it only took three years) *** if you are reading this i hope you are okay *** the webring is back and i am in it *** best viewed in netscape navigator 4.0 or a modern browser that is willing to forgive me *** you are visitor number → see counter below ← ***
                </div>
              </div>
            </td>
          </tr>

          {/* Under construction stripe */}
          <tr>
            <td colSpan={2} className="vn-construction" style={{ height: '32px', position: 'relative' }}>
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(0,0,0,0.7)',
                color: '#ffcc00',
                fontFamily: 'Verdana, sans-serif',
                fontSize: '0.78rem',
                letterSpacing: '0.25em',
                fontWeight: 'bold',
              }}>
                ⚠ UNDER CONSTRUCTION · PLEASE PARDON OUR DUST · EST. 1997 IN SPIRIT ⚠
              </div>
            </td>
          </tr>

          {/* Body row: sidebar + main */}
          <tr>
            {/* SIDEBAR */}
            <td width="180" valign="top" style={{ padding: '1rem 0.75rem', background: '#e8e0c8', borderRight: '2px ridge #cc9933' }}>
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ background: '#000080', color: '#ffff00', padding: '3px 6px', fontSize: '0.72rem', fontWeight: 'bold', letterSpacing: '0.1em' }}>
                  ·· NAVIGATE ··
                </div>
                <ul style={{ listStyle: 'square', paddingLeft: '1.1rem', marginTop: '0.5rem', fontSize: '0.85rem', lineHeight: 1.9 }}>
                  <li><a href="#about">about me</a></li>
                  <li><a href="#projects">my projects</a></li>
                  <li><a href="#now">what i do today</a></li>
                  <li><a href="#music">music i like</a></li>
                  <li><a href="#books">books shelf</a></li>
                  <li><a href="#guestbook">sign guestbook</a></li>
                  <li><a href="/">main site</a></li>
                  <li><a href="mailto:noone@example.com">email me</a></li>
                </ul>
              </div>

              {/* Hit counter */}
              <div style={{ margin: '1rem 0', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>VISITORS :</div>
                <div className="vn-lcd" style={{ fontSize: '1.05rem', display: 'inline-block', marginTop: '0.2rem' }}>
                  {hitCount.toString().padStart(7, '0')}
                </div>
                <div style={{ fontSize: '0.65rem', marginTop: '0.15rem' }}>
                  since 01/14/26
                </div>
              </div>

              {/* Online now */}
              <div style={{ textAlign: 'center', marginBottom: '1rem', border: '1px dashed #000', padding: '0.4rem' }}>
                <div style={{ fontSize: '0.7rem' }}>
                  <span className="vn-blink" style={{ color: '#008800' }}>●</span> {visitors.online} online now
                </div>
                <div style={{ fontSize: '0.7rem' }}>
                  {visitors.today} today
                </div>
              </div>

              {/* Now playing */}
              <div style={{ margin: '1rem 0', border: '1px solid #666', padding: '0.4rem', background: '#f0e8d0' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '0.2rem' }}>
                  ♪ now playing:
                </div>
                <div style={{ fontSize: '0.75rem', fontFamily: '"Courier New", monospace' }}>
                  stars_of_the_lid.mid
                </div>
                <div style={{ fontSize: '0.65rem', color: '#555', marginTop: '0.2rem' }}>
                  [ midi not autoplaying.<br/>this is not 1997. ]
                </div>
              </div>

              {/* Best viewed in */}
              <div style={{ fontSize: '0.7rem', textAlign: 'center', color: '#555', marginTop: '1.2rem', lineHeight: 1.5 }}>
                <div>best viewed in</div>
                <div style={{ fontWeight: 'bold', color: '#000' }}>
                  NETSCAPE NAVIGATOR 4.0
                </div>
                <div>@ 800 × 600</div>
                <div style={{ marginTop: '0.3rem' }}>or whatever</div>
              </div>
            </td>

            {/* MAIN */}
            <td valign="top" style={{ padding: '1rem 1.2rem', background: '#fffff0' }}>
              {/* About */}
              <section id="about" style={{ marginBottom: '1.5rem' }}>
                <h2 style={{
                  fontSize: '1.4rem',
                  fontFamily: '"Comic Sans MS", cursive',
                  color: '#cc0066',
                  margin: '0 0 0.4rem',
                  borderBottom: '3px double #cc0066',
                  paddingBottom: '0.2rem',
                }}>
                  hi, i am jason
                </h2>
                <p style={{ margin: '0.5rem 0', fontSize: '1rem', lineHeight: 1.55 }}>
                  this is my homepage. i am a <a href="#">self-taught programmer</a> from <a href="#">north carolina</a>. i write code mostly in <a href="#">rust</a> and <a href="#">typescript</a>. i like <a href="#music">ambient music</a>, <a href="#">film photography</a>, and <a href="#books">history books</a> that are too long.
                </p>
                <p style={{ margin: '0.5rem 0', fontSize: '1rem', lineHeight: 1.55 }}>
                  this page is not a joke and i am not being ironic. i wanted a place on the web that i built with my hands and that was not optimized for anything. i looked at the landing pages everyone ships and i did not see any of my friends in them. so i made this.
                </p>
                <p style={{ margin: '0.5rem 0', fontSize: '0.9rem', fontStyle: 'italic', color: '#444' }}>
                  — jason, writing this at 2:41 AM on a tuesday
                </p>
              </section>

              <div className="vn-divider" />

              {/* Projects */}
              <section id="projects" style={{ marginBottom: '1.5rem' }}>
                <h2 style={{
                  fontSize: '1.3rem',
                  fontFamily: '"Comic Sans MS", cursive',
                  color: '#005500',
                  margin: '0 0 0.4rem',
                  borderBottom: '3px double #005500',
                  paddingBottom: '0.2rem',
                }}>
                  ★ my projects ★
                </h2>
                <ul style={{ fontSize: '0.95rem', lineHeight: 1.8, paddingLeft: '1.3rem' }}>
                  <li>
                    <a href="#"><b>Duck Lang</b></a> — a programming language where you have to say "quack" to compile. the goose has opinions. written in rust.
                  </li>
                  <li>
                    <a href="#"><b>kcodes.me/news</b></a> — a satirical newsroom i built that looks like a small-town paper from 1992. <span className="vn-blink" style={{ color: '#cc0000', fontWeight: 'bold' }}>NEW!</span>
                  </li>
                  <li>
                    <a href="#"><b>Blog CMS</b></a> — markdown-first content management on cloudflare workers. currently runs three of my sites.
                  </li>
                  <li>
                    <a href="#"><b>LIKWID</b></a> — ASCII fluid simulation in the terminal. do not read the source.
                  </li>
                </ul>
              </section>

              <div className="vn-divider" />

              {/* Now */}
              <section id="now" style={{ marginBottom: '1.5rem', background: '#e0f0e0', padding: '0.75rem 1rem', border: '1px solid #8abc8a' }}>
                <h2 style={{ fontSize: '1.1rem', fontFamily: '"Comic Sans MS", cursive', color: '#224422', margin: '0 0 0.4rem' }}>
                  ~ what i am doing today ~
                </h2>
                <ul style={{ fontSize: '0.9rem', lineHeight: 1.7, paddingLeft: '1.3rem', margin: 0 }}>
                  <li>drinking coffee from a mug with a chip in the rim</li>
                  <li>writing the parser for duck lang v0.4</li>
                  <li>thinking about a short film i want to make about empty parking lots</li>
                  <li>avoiding laundry</li>
                </ul>
              </section>

              {/* Guestbook */}
              <section id="guestbook" style={{ marginBottom: '1.5rem' }}>
                <h2 style={{
                  fontSize: '1.3rem',
                  fontFamily: '"Comic Sans MS", cursive',
                  color: '#aa5500',
                  margin: '0 0 0.4rem',
                  borderBottom: '3px double #aa5500',
                  paddingBottom: '0.2rem',
                }}>
                  ✎ guestbook
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#555', fontStyle: 'italic', margin: '0 0 0.6rem' }}>
                  sign it! i read every entry. really.
                </p>

                <div style={{ marginBottom: '1rem', padding: '0.6rem 0.8rem', background: '#fff8e0', border: '1px dotted #aa5500' }}>
                  {submitted ? (
                    <div style={{ fontSize: '0.9rem' }}>
                      <b>✓ thanks, {nameField || 'friend'}!</b> your entry has been received. it will be reviewed by hand and may take up to several years to appear. that is normal.
                    </div>
                  ) : (
                    <form onSubmit={(e) => { e.preventDefault(); if (nameField || textField) setSubmitted(true); }}>
                      <div style={{ marginBottom: '0.4rem', fontSize: '0.85rem' }}>
                        <label>name: <input className="vn-input" value={nameField} onChange={e => setNameField(e.target.value)} maxLength={24} style={{ width: '180px' }} /></label>
                      </div>
                      <div style={{ marginBottom: '0.4rem', fontSize: '0.85rem' }}>
                        <label>message:<br/>
                          <textarea className="vn-input" value={textField} onChange={e => setTextField(e.target.value)} maxLength={300} rows={3} style={{ width: '94%' }} />
                        </label>
                      </div>
                      <button type="submit" className="vn-button-3d">sign it →</button>
                    </form>
                  )}
                </div>

                {GUESTBOOK_ENTRIES.map((entry, i) => (
                  <div key={i} style={{
                    padding: '0.5rem 0.8rem',
                    marginBottom: '0.4rem',
                    background: i % 2 === 0 ? '#f0f0e8' : '#fffff0',
                    borderLeft: '3px solid #aa5500',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                  }}>
                    <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '0.15rem' }}>
                      <b style={{ color: '#000' }}>{entry.name}</b> · {entry.date}
                    </div>
                    {entry.text}
                  </div>
                ))}
              </section>

              {/* Webring */}
              <div style={{
                margin: '1.5rem 0',
                padding: '0.8rem',
                background: '#000080',
                color: '#ffff00',
                textAlign: 'center',
                border: '3px ridge #6060c0',
              }}>
                <div style={{ fontFamily: 'Verdana, sans-serif', fontSize: '0.7rem', letterSpacing: '0.15em', marginBottom: '0.4rem' }}>
                  — — — — — THE SMALL WEB RING — — — — —
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '0.9rem' }}>
                  {WEBRING_NODES.map((n, i) => (
                    <a key={i} href="#" style={{ color: '#ffff00', textDecoration: 'underline' }}>[ {n} ]</a>
                  ))}
                </div>
                <div style={{ fontFamily: 'Verdana, sans-serif', fontSize: '0.6rem', color: '#c0c0ff', marginTop: '0.3rem' }}>
                  member #0042 · kcodes.me · joined 03/15/26
                </div>
              </div>

              {/* 88x31 badges */}
              <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
                <div style={{ fontSize: '0.7rem', color: '#555', marginBottom: '0.4rem' }}>badges · take one for your site:</div>
                <a href="#" style={{ textDecoration: 'none' }}>
                  <span className="vn-badge" style={{ background: 'linear-gradient(90deg, #cc0066 0%, #0066cc 50%, #00cc66 100%)' }}>
                    KCODES<br/>.ME
                  </span>
                </a>
                <span className="vn-badge" style={{ background: '#000', color: '#00ff00' }}>
                  DUCK<br/>LANG
                </span>
                <span className="vn-badge" style={{ background: '#cc0000' }}>
                  NO<br/>AI SLOP
                </span>
                <span className="vn-badge" style={{ background: '#ffcc00', color: '#000', borderColor: '#000' }}>
                  MADE WITH<br/>NOTEPAD*
                </span>
                <span className="vn-badge" style={{ background: '#6600cc' }}>
                  BEST VIEWED<br/>BY HUMANS
                </span>
                <span className="vn-badge" style={{ background: '#003366' }}>
                  NETSCAPE<br/>NOW!
                </span>
                <div style={{ fontSize: '0.6rem', color: '#777', marginTop: '0.3rem' }}>
                  * not actually notepad. it was vscode. sorry.
                </div>
              </div>
            </td>
          </tr>

          {/* Footer row */}
          <tr>
            <td colSpan={2} style={{ background: '#000080', color: '#ffffff', padding: '0.5rem 1rem', fontSize: '0.72rem', fontFamily: 'Verdana, sans-serif', letterSpacing: '0.05em', textAlign: 'center', borderTop: '4px ridge #cc9933' }}>
              © 2026 jason · <a href="mailto:x@x" style={{ color: '#ffff00' }}>mail me</a> · <a href="/" style={{ color: '#ffff00' }}>main site</a> · this page is 100% handwritten html <span style={{ fontStyle: 'italic' }}>(well, jsx, but spiritually)</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ textAlign: 'center', padding: '1rem', fontSize: '0.7rem', color: '#003030', fontFamily: 'Verdana, sans-serif' }}>
        <span style={{ background: 'rgba(255,255,255,0.7)', padding: '2px 6px' }}>
          this page does not collect your data. it does not even know what that means.
        </span>
      </div>
    </div>
  );
}
