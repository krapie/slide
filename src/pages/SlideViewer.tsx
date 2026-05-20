import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { SlideEntry } from '../types'

export default function SlideViewer() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [slide, setSlide] = useState<SlideEntry | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch('/slides/manifest.json')
      .then(r => r.json())
      .then((slides: SlideEntry[]) => {
        const found = slides.find(s => s.slug === slug)
        if (found) setSlide(found)
        else setNotFound(true)
      })
      .catch(() => setNotFound(true))
  }, [slug])

  if (notFound) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--kp-bg)' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--kp-fg-3)', fontSize: 'var(--kp-text-sm)' }}>Slide not found</p>
          <button onClick={() => navigate('/')} style={backBtnStyle}>← Back</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--kp-bg)' }}>
      <div style={toolbarStyle}>
        <button onClick={() => navigate('/')} style={backBtnStyle}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M5 12l7 7M5 12l7-7"/>
          </svg>
          Back
        </button>
        {slide && (
          <span style={{ fontSize: 'var(--kp-text-sm)', color: 'var(--kp-fg-2)', fontWeight: 500 }}>
            {slide.title}
          </span>
        )}
        <a
          href={`/slides/${slug}.html`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...backBtnStyle, textDecoration: 'none', marginLeft: 'auto' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M10 14L21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          </svg>
          Full screen
        </a>
      </div>
      <iframe
        src={`/slides/${slug}.html`}
        style={{ flex: 1, border: 'none', width: '100%' }}
        title={slide?.title ?? slug}
      />
    </div>
  )
}

const toolbarStyle: React.CSSProperties = {
  height: 48,
  borderBottom: '1px solid var(--kp-border)',
  background: 'var(--kp-bg)',
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--kp-space-4)',
  padding: '0 var(--kp-page-pad)',
}

const backBtnStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: 'var(--kp-fg-3)',
  fontSize: 'var(--kp-text-sm)',
  fontFamily: 'var(--kp-font-sans)',
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--kp-space-1)',
  padding: 'var(--kp-space-1) var(--kp-space-2)',
  borderRadius: 'var(--kp-radius-sm)',
}
