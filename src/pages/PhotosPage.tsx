import { useState, useEffect, useCallback } from 'react';

interface Photo {
  src: string;
  date: string;
  caption?: string;
}

// Add your photos here: drop images in public/photos/ and add entries
const PHOTOS: Photo[] = [];

const PER_PAGE = 3;

function PhotoEntry({ photo, align, onView }: {
  photo: Photo;
  align: 'left' | 'right';
  onView: () => void;
}) {
  const isLeft = align === 'left';
  return (
    <div style={{
      display: 'flex',
      flexDirection: isLeft ? 'row' : 'row-reverse',
      alignItems: 'center',
      gap: '0.75rem',
    }}>
      <div
        className="photo-frame"
        onClick={onView}
        style={{
          border: '1px solid #3a3835',
          padding: '5px',
          background: '#222120',
          flexShrink: 0,
          cursor: 'pointer',
        }}
      >
        <img
          src={photo.src}
          alt={photo.caption || ''}
          loading="lazy"
          style={{
            display: 'block',
            width: '140px',
            height: '105px',
            objectFit: 'cover',
          }}
        />
      </div>
      <div style={{ textAlign: isLeft ? 'left' : 'right' }}>
        <span style={{
          fontSize: '0.6rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#6a6660',
          fontWeight: 500,
        }}>
          {photo.date}
        </span>
        {photo.caption && (
          <p style={{
            fontSize: '0.7rem',
            color: '#5a5650',
            marginTop: '0.2rem',
            lineHeight: 1.4,
          }}>
            {photo.caption}
          </p>
        )}
      </div>
    </div>
  );
}

export default function PhotosPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [spread, setSpread] = useState(0);
  const [viewPhoto, setViewPhoto] = useState<Photo | null>(null);

  const totalSpreads = Math.max(1, Math.ceil(PHOTOS.length / (PER_PAGE * 2)));

  const next = useCallback(() => {
    if (!isOpen) { setIsOpen(true); return; }
    if (spread < totalSpreads - 1) setSpread(s => s + 1);
  }, [isOpen, spread, totalSpreads]);

  const prev = useCallback(() => {
    if (!isOpen) return;
    if (spread === 0) { setIsOpen(false); return; }
    setSpread(s => s - 1);
  }, [isOpen, spread]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (viewPhoto) {
        if (e.key === 'Escape') setViewPhoto(null);
        return;
      }
      switch (e.key) {
        case 'ArrowRight':
        case 'e':
          next(); break;
        case 'ArrowLeft':
        case 'q':
          prev(); break;
        case ' ':
          if (!isOpen) { e.preventDefault(); setIsOpen(true); }
          break;
        case 'Escape':
          if (isOpen) { setIsOpen(false); setSpread(0); }
          break;
        case 'Home':
          setSpread(0); break;
        case 'End':
          setSpread(totalSpreads - 1); break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, next, prev, viewPhoto, totalSpreads]);

  const getPagePhotos = (side: 'left' | 'right') => {
    const offset = spread * PER_PAGE * 2 + (side === 'left' ? 0 : PER_PAGE);
    return PHOTOS.slice(offset, offset + PER_PAGE);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#0e0d0c',
      color: '#d5d0c8',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <style>{`
        .book-cover {
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .book-cover:hover {
          transform: scale(1.02);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        .book-nav {
          background: none;
          border: 1px solid #2a2825;
          color: #6a6660;
          width: 40px;
          height: 40px;
          cursor: pointer;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
          flex-shrink: 0;
        }
        .book-nav:hover:not(:disabled) {
          color: #a8c8e8;
          border-color: #a8c8e8;
        }
        .book-nav:disabled {
          opacity: 0.2;
          cursor: default;
        }
        .photo-frame {
          transition: transform 0.2s ease;
        }
        .photo-frame:hover {
          transform: scale(1.03);
        }
        .book-back:hover {
          color: #a8c8e8 !important;
        }
        .book-spread {
          animation: bookOpen 0.3s ease;
        }
        @keyframes bookOpen {
          from { opacity: 0; transform: scaleX(0.8); }
          to { opacity: 1; transform: scaleX(1); }
        }
        @media (max-width: 768px) {
          .book-spread {
            flex-direction: column !important;
            width: 92vw !important;
            height: auto !important;
            max-height: 78vh !important;
            overflow-y: auto !important;
          }
          .book-page {
            width: 100% !important;
            min-height: 35vh !important;
          }
          .book-spine {
            width: 100% !important;
            height: 1px !important;
          }
          .book-cover {
            width: min(300px, 80vw) !important;
            height: min(420px, 60vh) !important;
          }
          .photo-frame img {
            width: 110px !important;
            height: 82px !important;
          }
        }
      `}</style>

      {/* Controls bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.75rem 1.5rem',
        borderBottom: '1px solid #1e1d1b',
        fontSize: '0.6rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: '#4a4640',
        flexShrink: 0,
      }}>
        <a href="/" className="book-back" style={{
          color: '#6a6660',
          textDecoration: 'none',
          transition: 'color 0.15s',
        }}>← Back</a>
        <span>
          {isOpen
            ? '← → Navigate · Esc Close'
            : 'Space to open'
          }
        </span>
        <span>
          {isOpen && PHOTOS.length > 0 ? `${spread + 1} / ${totalSpreads}` : ''}
        </span>
      </div>

      {/* Book area */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        gap: '1rem',
      }}>
        {!isOpen ? (
          /* ---- COVER ---- */
          <div
            className="book-cover"
            onClick={() => setIsOpen(true)}
            style={{
              width: 'min(380px, 80vw)',
              height: 'min(520px, 70vh)',
              background: '#1a1917',
              border: '1px solid #2a2825',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
              position: 'relative',
            }}
          >
            {/* Spine edge */}
            <div style={{
              position: 'absolute',
              left: 0, top: 0, bottom: 0,
              width: '3px',
              background: '#2a2825',
            }} />
            <h1 style={{
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}>
              KO<span style={{ color: '#a8c8e8' }}>NA</span>
            </h1>
            <p style={{
              fontSize: '0.65rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#6a6660',
              marginTop: '0.5rem',
            }}>
              Photos
            </p>
          </div>
        ) : (
          /* ---- OPEN BOOK ---- */
          <>
            <button className="book-nav" onClick={prev} title="Previous (←)">
              ←
            </button>

            <div className="book-spread" style={{
              display: 'flex',
              width: 'min(880px, 82vw)',
              height: 'min(520px, 70vh)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
            }}>
              {/* Left page */}
              <div className="book-page" style={{
                flex: 1,
                background: '#1a1917',
                border: '1px solid #2a2825',
                borderRight: 'none',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: getPagePhotos('left').length > 0 ? 'space-around' : 'center',
                overflow: 'hidden',
              }}>
                {getPagePhotos('left').length > 0 ? (
                  getPagePhotos('left').map((photo, i) => (
                    <PhotoEntry
                      key={`l-${spread}-${i}`}
                      photo={photo}
                      align={i % 2 === 0 ? 'left' : 'right'}
                      onView={() => setViewPhoto(photo)}
                    />
                  ))
                ) : (
                  <div style={{
                    textAlign: 'center',
                    color: '#2a2825',
                    fontSize: '0.7rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}>
                    {spread === 0 && PHOTOS.length === 0 ? 'No photos yet' : ''}
                  </div>
                )}
              </div>

              {/* Spine */}
              <div className="book-spine" style={{
                width: '2px',
                background: '#2a2825',
                flexShrink: 0,
                boxShadow: '-2px 0 8px rgba(0,0,0,0.3), 2px 0 8px rgba(0,0,0,0.3)',
              }} />

              {/* Right page */}
              <div className="book-page" style={{
                flex: 1,
                background: '#1a1917',
                border: '1px solid #2a2825',
                borderLeft: 'none',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: getPagePhotos('right').length > 0 ? 'space-around' : 'center',
                overflow: 'hidden',
              }}>
                {getPagePhotos('right').length > 0 ? (
                  getPagePhotos('right').map((photo, i) => (
                    <PhotoEntry
                      key={`r-${spread}-${i}`}
                      photo={photo}
                      align={i % 2 === 0 ? 'right' : 'left'}
                      onView={() => setViewPhoto(photo)}
                    />
                  ))
                ) : (
                  <div style={{
                    textAlign: 'center',
                    color: '#2a2825',
                    fontSize: '0.7rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                  }}>
                    {spread === 0 && PHOTOS.length === 0 ? 'Check back soon' : ''}
                  </div>
                )}
              </div>
            </div>

            <button
              className="book-nav"
              onClick={next}
              disabled={spread >= totalSpreads - 1}
              title="Next (→)"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* Photo lightbox */}
      {viewPhoto && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(0,0,0,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            animation: 'bookOpen 0.2s ease',
          }}
          onClick={() => setViewPhoto(null)}
        >
          <div style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
            <img
              src={viewPhoto.src}
              alt={viewPhoto.caption || ''}
              style={{
                maxWidth: '90vw',
                maxHeight: '85vh',
                objectFit: 'contain',
                display: 'block',
              }}
            />
            {(viewPhoto.date || viewPhoto.caption) && (
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <span style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#6a6660',
                }}>
                  {viewPhoto.date}
                </span>
                {viewPhoto.caption && (
                  <p style={{ fontSize: '0.85rem', color: '#8a8680', marginTop: '0.25rem' }}>
                    {viewPhoto.caption}
                  </p>
                )}
              </div>
            )}
            <button
              onClick={() => setViewPhoto(null)}
              style={{
                position: 'absolute',
                top: '-2rem',
                right: '-1rem',
                background: 'none',
                border: 'none',
                color: '#6a6660',
                fontSize: '1.5rem',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
