import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { SlideEntry } from '../types'

export default function SlideList() {
  const [slides, setSlides] = useState<SlideEntry[]>([])
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  )
  const navigate = useNavigate()

  useEffect(() => {
    fetch('/slides/manifest.json')
      .then(r => r.json())
      .then(setSlides)
      .catch(() => setSlides([]))
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--kp-bg)' }}>
      <header style={headerStyle}>
        <div style={headerInnerStyle}>
          <div style={logoStyle}>
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="4" fill="var(--kp-fg)" />
              <text x="16" y="22" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="18" fontWeight="500" fill="var(--kp-bg)">π</text>
            </svg>
            <span style={{ fontFamily: 'var(--kp-font-sans)', fontWeight: 500, fontSize: 'var(--kp-text-base)', color: 'var(--kp-fg-1)', letterSpacing: '-0.01em' }}>
              Slide
            </span>
          </div>
          <button
            onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
            style={themeToggleStyle}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
        </div>
      </header>

      <main style={mainStyle}>
        <div style={contentStyle}>
          <div style={{ marginBottom: 'var(--kp-space-7)' }}>
            <h1 style={{ fontSize: 'var(--kp-text-2xl)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--kp-fg)', lineHeight: 1.15 }}>
              Slides
            </h1>
            <p style={{ marginTop: 'var(--kp-space-2)', fontSize: 'var(--kp-text-sm)', color: 'var(--kp-fg-3)' }}>
              {slides.length} {slides.length === 1 ? 'presentation' : 'presentations'}
            </p>
          </div>

          {slides.length === 0 ? (
            <div style={{ color: 'var(--kp-fg-4)', fontSize: 'var(--kp-text-sm)', padding: 'var(--kp-space-8) 0', textAlign: 'center' }}>
              No slides yet.
            </div>
          ) : (
            <div style={gridStyle}>
              {slides.map(slide => (
                <button
                  key={slide.slug}
                  onClick={() => navigate(`/view/${slide.slug}`)}
                  style={cardStyle}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--kp-bg-subtle)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--kp-surface)')}
                >
                  <div style={cardPreviewStyle}>
                    <iframe
                      src={`/slides/${slide.slug}.html`}
                      sandbox="allow-same-origin"
                      tabIndex={-1}
                      title={`${slide.title} preview`}
                      style={{ width: '100%', height: '100%', border: 'none', pointerEvents: 'none', display: 'block' }}
                    />
                  </div>
                  <div style={cardBodyStyle}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--kp-space-3)' }}>
                      <span style={{ fontWeight: 500, fontSize: 'var(--kp-text-base)', color: 'var(--kp-fg)', lineHeight: 1.3 }}>
                        {slide.title}
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--kp-fg-4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                        <path d="M7 17L17 7M17 7H7M17 7v10"/>
                      </svg>
                    </div>
                    {slide.description && (
                      <p style={{ marginTop: 'var(--kp-space-1)', fontSize: 'var(--kp-text-sm)', color: 'var(--kp-fg-3)', lineHeight: 1.5 }}>
                        {slide.description}
                      </p>
                    )}
                    <span style={{ marginTop: 'var(--kp-space-3)', display: 'block', fontFamily: 'var(--kp-font-mono)', fontSize: 'var(--kp-text-xs)', color: 'var(--kp-fg-4)', letterSpacing: '-0.005em' }}>
                      {slide.created_at}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer style={footerStyle}>
        <span style={{ fontFamily: 'var(--kp-font-sans)', fontSize: 'var(--kp-text-xs)', color: 'var(--kp-fg-4)' }}>π</span>
      </footer>
    </div>
  )
}

const headerStyle: React.CSSProperties = {
  borderBottom: '1px solid var(--kp-border)',
  background: 'var(--kp-bg)',
}

const headerInnerStyle: React.CSSProperties = {
  maxWidth: 'var(--kp-wide-width)',
  margin: '0 auto',
  padding: '0 var(--kp-page-pad)',
  height: 52,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}

const logoStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--kp-space-2)',
}

const themeToggleStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 'var(--kp-space-2)',
  color: 'var(--kp-fg-3)',
  borderRadius: 'var(--kp-radius-sm)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const mainStyle: React.CSSProperties = {
  flex: 1,
  padding: 'var(--kp-space-8) var(--kp-page-pad)',
}

const contentStyle: React.CSSProperties = {
  maxWidth: 'var(--kp-wide-width)',
  margin: '0 auto',
}

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: 'var(--kp-space-4)',
}

const cardStyle: React.CSSProperties = {
  background: 'var(--kp-surface)',
  border: '1px solid var(--kp-border)',
  borderRadius: 'var(--kp-radius-lg)',
  overflow: 'hidden',
  cursor: 'pointer',
  textAlign: 'left',
  transition: 'background var(--kp-dur-fast) var(--kp-ease)',
  boxShadow: 'var(--kp-shadow-sm)',
}

const cardPreviewStyle: React.CSSProperties = {
  aspectRatio: '16 / 9',
  overflow: 'hidden',
  borderBottom: '1px solid var(--kp-border)',
  background: 'var(--kp-bg-muted)',
}

const cardBodyStyle: React.CSSProperties = {
  padding: 'var(--kp-space-4)',
}

const footerStyle: React.CSSProperties = {
  borderTop: '1px solid var(--kp-border)',
  padding: 'var(--kp-space-5) var(--kp-page-pad)',
  display: 'flex',
  justifyContent: 'center',
}
