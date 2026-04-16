import { useState } from 'react';

type Tab = 'article' | 'talk' | 'source' | 'history';

const INFOBOX = [
  { label: 'Born', value: '████ ██, 1999 (age 26)' },
  { label: '', value: 'Raleigh, North Carolina, U.S.' },
  { label: 'Nationality', value: 'American' },
  { label: 'Other names', value: 'kcodes, kona' },
  { label: 'Occupation', value: 'Software developer, programmer' },
  { label: 'Years active', value: '2019–present' },
  { label: 'Known for', value: 'Duck Lang, kcodes.me' },
  { label: 'Website', value: 'kcodes.me', link: true },
];

const TALK_THREADS = [
  {
    title: 'Neutrality of this article',
    level: 2,
    posts: [
      { user: 'Griffin42', time: '04:03, 2 November 2025 (UTC)', text: 'Noticed nearly every "fact" in this article is sourced to the subject\'s own blog posts or tweets. Does this meet WP:RS? I\'m considering tagging the whole thing.' },
      { user: 'DuckLangFan99', time: '19:44, 2 November 2025 (UTC)', text: 'The sources are fine. Duck Lang is real, I have used it. The goose does work.', indent: 1 },
      { user: 'Griffin42', time: '22:10, 2 November 2025 (UTC)', text: 'Respectfully, "the goose does work" is not a reliable source.', indent: 2 },
    ],
  },
  {
    title: 'Claim about "Ship it raw"',
    level: 2,
    posts: [
      { user: 'Oenophile77', time: '11:08, 18 February 2026 (UTC)', text: 'The motto section states he coined "ship it raw." I cannot find any citation for this predating his own use in 2023. Suggest we move this to the "Claims" section pending a secondary source.' },
    ],
  },
  {
    title: 'Merge proposal',
    level: 2,
    posts: [
      { user: 'Bot_Keeper_III', time: '09:00, 1 April 2026 (UTC)', text: 'Should this article be merged with Duck Lang (programming language)? Much of the body describes the language rather than the person.' },
      { user: 'MeridianPost', time: '14:22, 1 April 2026 (UTC)', text: 'Oppose. They are distinct subjects. The language page covers the language; this page covers the developer.', indent: 1 },
    ],
  },
];

const HISTORY_ROWS = [
  { time: '04:12, 14 April 2026', user: '42.1.6.9 (talk)', size: '+240', note: 'added reference to the goose incident' },
  { time: '22:04, 11 April 2026', user: 'DuckLangFan99 (talk | contribs)', size: '+17', note: 'fixed typo in Early life' },
  { time: '15:51, 2 April 2026', user: 'Griffin42 (talk | contribs)', size: '−382', note: 'removed unsourced paragraph about "the big plan"' },
  { time: '06:06, 30 March 2026', user: 'kcodes0 (talk | contribs)', size: '+14', note: 'rv — this is actually correct. see Talk.', warn: true },
  { time: '05:41, 30 March 2026', user: 'Griffin42 (talk | contribs)', size: '−14', note: 'removed self-referential claim' },
  { time: '23:59, 14 March 2026', user: 'Oenophile77 (talk | contribs)', size: '+1,204', note: 'Added "Works" section with subsection for Duck Lang' },
  { time: '18:30, 7 February 2026', user: 'Bot_Keeper_III (talk | contribs)', size: '+48', note: 'automated: added {{living person}}' },
  { time: '02:14, 31 December 2025', user: 'kcodes0 (talk | contribs)', size: '+3,442', note: 'initial article' },
];

export default function E1Wikipedia() {
  const [tab, setTab] = useState<Tab>('article');

  return (
    <div style={{
      minHeight: '100vh',
      background: '#ffffff',
      color: '#202122',
      fontFamily: '"Linux Libertine", Georgia, "Times New Roman", serif',
      fontSize: '14px',
      lineHeight: 1.6,
    }}>
      <style>{`
        .w-link { color: #0645ad; text-decoration: none; }
        .w-link:hover { text-decoration: underline; }
        .w-link-red { color: #ba0000; text-decoration: none; }
        .w-link-red:hover { text-decoration: underline; }
        .w-tab {
          padding: 0.45rem 0.9rem;
          font-size: 12.7px;
          color: #0645ad;
          background: #f8f9fa;
          border: 1px solid #a7d7f9;
          border-bottom: none;
          margin-right: 1px;
          cursor: pointer;
          font-family: sans-serif;
        }
        .w-tab:hover { background: #ffffff; }
        .w-tab-active {
          background: #ffffff !important;
          color: #202122 !important;
          border-bottom: 1px solid #ffffff !important;
          position: relative;
          top: 1px;
        }
        .w-sidebar-item {
          display: block;
          padding: 0.1rem 0.5rem;
          font-size: 12.7px;
          color: #0645ad;
          text-decoration: none;
          font-family: sans-serif;
        }
        .w-sidebar-item:hover { text-decoration: underline; }
        .w-sidebar-header {
          font-size: 11px;
          font-weight: 400;
          color: #54595d;
          text-transform: none;
          padding: 0.75rem 0.5rem 0.2rem;
          font-family: sans-serif;
        }
        .w-body p { margin: 0 0 0.6em; }
        .w-body h2 {
          font-family: "Linux Libertine", Georgia, serif;
          font-size: 1.6em;
          font-weight: 400;
          margin: 1em 0 0.25em;
          padding-bottom: 0.2em;
          border-bottom: 1px solid #a2a9b1;
        }
        .w-body h3 {
          font-family: "Linux Libertine", Georgia, serif;
          font-size: 1.2em;
          font-weight: 700;
          margin: 1em 0 0.3em;
        }
        .w-body sup { font-size: 0.75em; }
        .w-citation-needed {
          color: #ba0000;
          font-size: 0.85em;
          font-style: italic;
          font-family: sans-serif;
        }
        .w-ref-list { font-size: 0.9em; line-height: 1.5; }
        .w-ref-list li { margin-bottom: 0.35em; }
        .w-infobox {
          float: right;
          width: 270px;
          margin: 0 0 1em 1.5em;
          background: #f8f9fa;
          border: 1px solid #a2a9b1;
          font-size: 12px;
          font-family: sans-serif;
          line-height: 1.4;
        }
        .w-infobox-title {
          background: #ddd;
          padding: 0.5em;
          text-align: center;
          font-weight: 700;
          font-size: 13.5px;
          font-family: "Linux Libertine", Georgia, serif;
        }
        .w-infobox-image {
          padding: 0.5em;
          text-align: center;
          background: #f8f9fa;
        }
        .w-infobox-row { display: flex; border-top: 1px solid #eaecf0; }
        .w-infobox-label { width: 35%; padding: 0.35em 0.5em; font-weight: 700; background: #eaecf0; font-size: 11.5px; }
        .w-infobox-value { flex: 1; padding: 0.35em 0.5em; font-size: 11.5px; }
        .w-hatnote { font-style: italic; font-size: 13px; padding: 0.3em 0; border-bottom: none; }
        .w-toc {
          display: inline-block;
          background: #f8f9fa;
          border: 1px solid #a2a9b1;
          padding: 0.4em 1em;
          margin: 0.75em 0;
          font-size: 13px;
          font-family: sans-serif;
        }
        .w-toc ol { margin: 0.3em 0 0.3em 1.4em; padding: 0; }
        .w-toc-title { font-weight: 700; padding-right: 0.3em; }
        .w-talk-post { margin: 0.5em 0; font-size: 13px; line-height: 1.5; }
        .w-history-row { font-size: 12.7px; padding: 0.15em 0; font-family: sans-serif; }
      `}</style>

      {/* Top bar */}
      <div style={{ borderBottom: '1px solid #a7d7f9', background: '#f6f6f6', padding: '0.4rem 1rem', fontSize: '12.5px', fontFamily: 'sans-serif', color: '#54595d' }}>
        <span style={{ marginRight: '1rem' }}>Not logged in</span>
        <a href="#" className="w-link">Talk</a>
        <span style={{ margin: '0 0.4rem' }}>·</span>
        <a href="#" className="w-link">Contributions</a>
        <span style={{ margin: '0 0.4rem' }}>·</span>
        <a href="#" className="w-link">Create account</a>
        <span style={{ margin: '0 0.4rem' }}>·</span>
        <a href="#" className="w-link">Log in</a>
      </div>

      <div style={{ display: 'flex', maxWidth: '100%', minHeight: 'calc(100vh - 40px)' }}>
        {/* Left sidebar */}
        <aside style={{ width: '170px', padding: '1rem 0.5rem', borderRight: '1px solid #eaecf0', flexShrink: 0, background: '#ffffff' }}>
          <div style={{ padding: '0 0.5rem', marginBottom: '1rem', fontSize: '13px', fontFamily: 'serif', fontWeight: 700 }}>
            WIKIPEDIA
            <div style={{ fontSize: '9.5px', fontFamily: 'sans-serif', color: '#54595d', fontWeight: 400, marginTop: '0.1em' }}>
              The Free Encyclopedia
            </div>
          </div>
          <a href="#" className="w-sidebar-item">Main page</a>
          <a href="#" className="w-sidebar-item">Contents</a>
          <a href="#" className="w-sidebar-item">Current events</a>
          <a href="#" className="w-sidebar-item">Random article</a>
          <a href="#" className="w-sidebar-item">About Wikipedia</a>
          <a href="#" className="w-sidebar-item">Contact us</a>
          <a href="#" className="w-sidebar-item">Donate</a>

          <div className="w-sidebar-header">Contribute</div>
          <a href="#" className="w-sidebar-item">Help</a>
          <a href="#" className="w-sidebar-item">Learn to edit</a>
          <a href="#" className="w-sidebar-item">Community portal</a>
          <a href="#" className="w-sidebar-item">Recent changes</a>

          <div className="w-sidebar-header">Tools</div>
          <a href="#" className="w-sidebar-item">What links here</a>
          <a href="#" className="w-sidebar-item">Related changes</a>
          <a href="#" className="w-sidebar-item">Upload file</a>
          <a href="#" className="w-sidebar-item">Special pages</a>
          <a href="#" className="w-sidebar-item">Permanent link</a>
          <a href="#" className="w-sidebar-item">Page information</a>
          <a href="#" className="w-sidebar-item">Cite this page</a>

          <div className="w-sidebar-header">In other languages</div>
          <a href="#" className="w-sidebar-item">Deutsch</a>
          <a href="#" className="w-sidebar-item">Español</a>
          <a href="#" className="w-sidebar-item">Français</a>
          <a href="#" className="w-sidebar-item">Nederlands</a>
          <a href="#" className="w-sidebar-item">日本語</a>
          <a href="#" className="w-sidebar-item">Português</a>
          <a href="#" className="w-sidebar-item">Türkçe</a>
          <a href="#" className="w-sidebar-item">中文</a>
        </aside>

        {/* Main */}
        <main style={{ flex: 1, minWidth: 0, padding: '1rem 1.5rem' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', alignItems: 'flex-end', borderBottom: '1px solid #a7d7f9', marginBottom: '0.75rem' }}>
            <div style={{ flex: 1 }}>
              <button className={`w-tab ${tab === 'article' ? 'w-tab-active' : ''}`} onClick={() => setTab('article')}>Article</button>
              <button className={`w-tab ${tab === 'talk' ? 'w-tab-active' : ''}`} onClick={() => setTab('talk')}>Talk <span style={{ fontSize: '10px', color: '#54595d' }}>(3)</span></button>
            </div>
            <div>
              <button className={`w-tab ${tab === 'source' ? 'w-tab-active' : ''}`} onClick={() => setTab('source')}>View source</button>
              <button className={`w-tab ${tab === 'history' ? 'w-tab-active' : ''}`} onClick={() => setTab('history')}>View history</button>
              <button className="w-tab" style={{ padding: '0.35rem 0.7rem' }}>★</button>
            </div>
          </div>

          {/* Page title */}
          <h1 style={{
            fontSize: '1.9em',
            fontWeight: 400,
            fontFamily: '"Linux Libertine", Georgia, serif',
            margin: '0 0 0.1em',
            paddingBottom: '0.2em',
            borderBottom: '1px solid #a2a9b1',
          }}>
            {tab === 'talk' ? 'Talk:Jason (programmer)' : 'Jason (programmer)'}
          </h1>
          <div style={{ fontSize: '12.5px', fontFamily: 'sans-serif', color: '#54595d', marginBottom: '1rem' }}>
            From Wikipedia, the free encyclopedia
          </div>

          {tab === 'article' && (
            <article className="w-body">
              <p className="w-hatnote">
                For the pastry, see <a href="#" className="w-link">Jason (pastry)</a>. For other uses, see <a href="#" className="w-link">Jason (disambiguation)</a>.
              </p>

              <div className="w-infobox">
                <div className="w-infobox-title">Jason</div>
                <div className="w-infobox-image">
                  <div style={{
                    width: '200px',
                    height: '220px',
                    margin: '0 auto',
                    background: 'repeating-linear-gradient(45deg, #eee, #eee 6px, #f8f9fa 6px, #f8f9fa 12px)',
                    border: '1px solid #c8ccd1',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '10px', color: '#72777d', fontFamily: 'sans-serif',
                  }}>
                    [no free image available]
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#54595d', padding: '0.4em 0.3em 0', fontStyle: 'italic' }}>
                    Subject has declined to provide a photograph.
                  </div>
                </div>
                {INFOBOX.map((row, i) => (
                  <div className="w-infobox-row" key={i}>
                    <div className="w-infobox-label">{row.label}</div>
                    <div className="w-infobox-value">
                      {row.link ? <a href="#" className="w-link">{row.value}</a> : row.value}
                    </div>
                  </div>
                ))}
              </div>

              <p>
                <b>Jason</b> (born ████ ██, 1999) is an American <a href="#" className="w-link">self-taught</a> <a href="#" className="w-link">software developer</a> and creative coder, best known for the esoteric programming language <a href="#" className="w-link">Duck Lang</a><sup>[1]</sup> and the satirical news site <i><a href="#" className="w-link">kcodes.me/news</a></i>.<sup>[2]</sup> He is the principal author of a <a href="#" className="w-link">content management system</a> built on <a href="#" className="w-link">Cloudflare Workers</a> and has been credited as an early advocate of the motto <i>"ship it raw"</i><sup>[<a href="#" className="w-link-red">citation needed</a>]</sup> within certain small online developer communities.
              </p>
              <p>
                Outside of programming, Jason has identified publicly as a <a href="#" className="w-link">film enthusiast</a>, a collector of <a href="#" className="w-link">ambient music</a>, and a reader of <a href="#" className="w-link">history books</a>. He maintains that he prefers to be identified only by his first name and has repeatedly declined interview requests, a stance described by some observers as <i>"mild but firm reclusiveness."</i><sup>[3]</sup>
              </p>

              <div className="w-toc">
                <div style={{ textAlign: 'center', fontWeight: 700, fontSize: '12.5px', borderBottom: '1px solid #a2a9b1', paddingBottom: '0.2em', marginBottom: '0.3em' }}>Contents <span style={{ fontWeight: 400, fontSize: '11px' }}>[hide]</span></div>
                <ol>
                  <li><a href="#" className="w-link"><span className="w-toc-title">1</span>Early life</a></li>
                  <li><a href="#" className="w-link"><span className="w-toc-title">2</span>Career</a>
                    <ol>
                      <li><a href="#" className="w-link"><span className="w-toc-title">2.1</span>Duck Lang</a></li>
                      <li><a href="#" className="w-link"><span className="w-toc-title">2.2</span>kcodes.me</a></li>
                      <li><a href="#" className="w-link"><span className="w-toc-title">2.3</span>Other works</a></li>
                    </ol>
                  </li>
                  <li><a href="#" className="w-link"><span className="w-toc-title">3</span>Philosophy</a></li>
                  <li><a href="#" className="w-link"><span className="w-toc-title">4</span>Personal life</a></li>
                  <li><a href="#" className="w-link"><span className="w-toc-title">5</span>Reception</a></li>
                  <li><a href="#" className="w-link"><span className="w-toc-title">6</span>See also</a></li>
                  <li><a href="#" className="w-link"><span className="w-toc-title">7</span>References</a></li>
                  <li><a href="#" className="w-link"><span className="w-toc-title">8</span>External links</a></li>
                </ol>
              </div>

              <h2>Early life</h2>
              <p>
                Little is publicly known about Jason's early life. According to a brief biographical note posted on his personal website,<sup>[4]</sup> he grew up in <a href="#" className="w-link">North Carolina</a> and first began writing code at age seventeen, an event he has described as <i>"accidentally and without parental consent."</i><sup>[<a href="#" className="w-link-red">citation needed</a>]</sup> He has written that he did not attend a university.
              </p>

              <h2>Career</h2>
              <h3>Duck Lang</h3>
              <p>
                In 2024, Jason released <b><a href="#" className="w-link">Duck Lang</a></b>, a <a href="#" className="w-link">programming language</a> written in <a href="#" className="w-link">Rust</a> in which every program must begin with the token <code>quack</code>.<sup>[1]</sup> According to the language's documentation, programs are evaluated by a fictional goose that <i>"has opinions"</i> and rates all submitted programs on a scale from one to ten.<sup>[5]</sup> Critics have described the project as <i>"at once a parody and a love letter to compiler design."</i><sup>[6]</sup>
              </p>

              <h3>kcodes.me</h3>
              <p>
                Jason's personal website, <i>kcodes.me</i>, hosts a satirical newsroom,<sup>[2]</sup> a <a href="#" className="w-link">photo gallery</a>, and a rotating collection of smaller experimental projects<sup>[<a href="#" className="w-link-red">citation needed</a>]</sup>. The site's design has undergone at least five distinct visual redesigns between its launch and 2026.
              </p>

              <h2>Philosophy</h2>
              <p>
                Jason has described his working philosophy as <i>"Done is greater than perfect,"</i> a slogan he is said to have shortened from a longer aphorism found in an unnamed cookbook.<sup>[<a href="#" className="w-link-red">citation needed</a>]</sup>
              </p>

              <h2>Personal life</h2>
              <p>
                Jason has not publicly confirmed most details of his personal life. <span className="w-citation-needed">[further information needed]</span>
              </p>

              <h2>References</h2>
              <ol className="w-ref-list">
                <li><a href="#" className="w-link">^</a> "Duck Lang: Design and Motivation." <i>kcodes.me/blog</i>. Retrieved 14 April 2026.</li>
                <li><a href="#" className="w-link">^</a> "About this newsroom." <i>kcodes.me/news</i>. Retrieved 14 April 2026.</li>
                <li><a href="#" className="w-link">^</a> Comment, Discord server, 2025. Archived from the original on 3 February 2026.</li>
                <li><a href="#" className="w-link">^</a> "Bio." <i>kcodes.me</i>. Retrieved 14 April 2026.</li>
                <li><a href="#" className="w-link">^</a> Duck Lang README, GitHub, 2024.</li>
                <li><a href="#" className="w-link">^</a> Unsigned post on a small forum, January 2025.</li>
              </ol>

              <h2>External links</h2>
              <ul>
                <li><a href="#" className="w-link">Official website</a></li>
                <li><a href="#" className="w-link">Duck Lang on GitHub</a></li>
                <li><a href="#" className="w-link">kcodes.me/news</a></li>
              </ul>

              <div style={{ marginTop: '2rem', padding: '0.6em 0.8em', background: '#f8f9fa', border: '1px solid #eaecf0', fontSize: '12px', fontFamily: 'sans-serif' }}>
                <b>Categories:</b> <a href="#" className="w-link">Living people</a> · <a href="#" className="w-link">American software developers</a> · <a href="#" className="w-link">Self-taught programmers</a> · <a href="#" className="w-link">Esoteric programming language designers</a> · <a href="#" className="w-link">People from North Carolina</a> · <a href="#" className="w-link-red">1999 births</a> <span className="w-citation-needed">[citation needed]</span>
              </div>
            </article>
          )}

          {tab === 'talk' && (
            <div style={{ fontFamily: 'sans-serif', fontSize: '13px', lineHeight: 1.6 }}>
              <div style={{ padding: '0.6em', background: '#fef6e7', border: '1px solid #fc3', marginBottom: '1em' }}>
                <b>This is the talk page for discussing improvements to the Jason (programmer) article.</b> This is not a forum for general discussion of the article's subject.
              </div>

              {TALK_THREADS.map((thread, ti) => (
                <div key={ti} style={{ marginBottom: '2em' }}>
                  <h2 style={{ fontFamily: '"Linux Libertine", Georgia, serif', fontSize: '1.4em', fontWeight: 400, paddingBottom: '0.2em', borderBottom: '1px solid #a2a9b1', margin: '0 0 0.5em' }}>
                    {thread.title}
                  </h2>
                  {thread.posts.map((post, pi) => (
                    <div className="w-talk-post" key={pi} style={{ marginLeft: `${(post.indent || 0) * 1.5}em` }}>
                      <p style={{ margin: 0 }}>
                        {post.text} — <a href="#" className="w-link">{post.user}</a> <span style={{ color: '#54595d' }}>({post.time})</span>
                      </p>
                    </div>
                  ))}
                </div>
              ))}

              <div style={{ marginTop: '2em', padding: '0.6em', background: '#f8f9fa', border: '1px solid #a2a9b1' }}>
                <b>Add a new thread</b>
                <div style={{ height: '100px', marginTop: '0.4em', background: '#ffffff', border: '1px solid #c8ccd1' }} />
              </div>
            </div>
          )}

          {tab === 'source' && (
            <pre style={{
              fontFamily: 'Consolas, Monaco, "Courier New", monospace',
              fontSize: '12.5px',
              padding: '1em',
              background: '#f8f9fa',
              border: '1px solid #c8ccd1',
              whiteSpace: 'pre-wrap',
              lineHeight: 1.5,
              color: '#202122',
            }}>{`{{short description|American software developer}}
{{Infobox person
| name         = Jason
| birth_date   = ████ ██, 1999
| birth_place  = Raleigh, North Carolina, U.S.
| nationality  = American
| other_names  = kcodes, kona
| occupation   = Software developer
| years_active = 2019–present
| known_for    = [[Duck Lang]], kcodes.me
| website      = {{URL|kcodes.me}}
}}

'''Jason''' (born ████ ██, 1999) is an American [[self-taught]]
[[software developer]] and creative coder, best known for the
esoteric programming language [[Duck Lang]]<ref name="duck" />
and the satirical news site ''[[kcodes.me/news]]''.<ref name="news" />

== Early life ==
Little is publicly known about Jason's early life. According to
a brief biographical note posted on his personal website,<ref
name="bio" /> he grew up in [[North Carolina]] and first began
writing code at age seventeen, an event he has described as
"accidentally and without parental consent."{{cn|date=March 2026}}

== Career ==
=== Duck Lang ===
In 2024, Jason released '''[[Duck Lang]]''', a [[programming
language]] written in [[Rust]] in which every program must begin
with the token <code>quack</code>.<ref name="duck" /> ...
`}</pre>
          )}

          {tab === 'history' && (
            <div style={{ fontFamily: 'sans-serif' }}>
              <p style={{ fontSize: '12.7px', color: '#54595d' }}>
                View logs for this page — (<a href="#" className="w-link">view abuse log</a>)
              </p>
              <p style={{ fontSize: '12.7px' }}>
                <a href="#" className="w-link">Find revisions</a> — Filter revisions: <select style={{ fontFamily: 'sans-serif', fontSize: '12.5px' }}><option>Only show edits that are latest revisions</option><option>Tag filter</option></select>
              </p>
              <div style={{ fontSize: '12.7px', padding: '0.3em 0', borderBottom: '1px solid #eaecf0', marginBottom: '0.3em', color: '#54595d' }}>
                (cur | prev) — Compare selected revisions
              </div>
              {HISTORY_ROWS.map((row, i) => (
                <div className="w-history-row" key={i} style={{ padding: '0.25em 0', borderBottom: '1px dotted #eaecf0' }}>
                  <span style={{ color: '#72777d' }}>(<a href="#" className="w-link">cur</a> | <a href="#" className="w-link">prev</a>)</span>
                  {' '}<input type="radio" style={{ verticalAlign: 'middle' }} />
                  {' '}<input type="radio" style={{ verticalAlign: 'middle' }} defaultChecked={i === 1} />
                  {' '}<span>{row.time}</span>
                  {' '}<a href="#" className="w-link">{row.user}</a>
                  {' '}<span style={{ color: row.size.startsWith('−') ? '#ba0000' : '#006400', fontWeight: 700 }}>({row.size})</span>
                  {' '}<span style={{ color: '#54595d', fontStyle: 'italic' }}>{row.note}</span>
                  {row.warn && <span style={{ marginLeft: '0.4em', padding: '0 0.3em', background: '#fee7e6', border: '1px solid #d33', color: '#b32424', fontSize: '10.5px' }}>Tag: Possible self-edit</span>}
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: '3rem', paddingTop: '1rem', borderTop: '1px solid #eaecf0', fontSize: '11.5px', color: '#54595d', fontFamily: 'sans-serif', lineHeight: 1.6 }}>
            <div>This page was last edited on 14 April 2026, at 04:12 (UTC).</div>
            <div>Text is available under the <a href="#" className="w-link">Creative Commons Attribution-ShareAlike License 4.0</a>; additional terms may apply.</div>
            <div style={{ marginTop: '0.5em' }}>
              <a href="/" className="w-link">← Back to site</a>
              {' · '}
              <a href="#" className="w-link">Privacy policy</a>
              {' · '}
              <a href="#" className="w-link">About Wikipedia</a>
              {' · '}
              <a href="#" className="w-link">Disclaimers</a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
