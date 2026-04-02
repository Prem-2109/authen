import React, { useContext, useMemo } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const { userData } = useContext(AppContext)
  const navigate = useNavigate()

  // Memoized values (avoid recalculating on every render)
  const { firstName, initial } = useMemo(() => {
    return {
      firstName: userData?.name?.split(' ')[0] || 'Developer',
      initial: userData?.name?.[0]?.toUpperCase() || '?'
    }
  }, [userData])

  return (
    <div className="hero-wrap relative flex flex-col items-center text-center pt-[120px] pb-20 px-6 overflow-hidden">

      {/* Glow blobs */}
      <div
        className="absolute -top-[120px] left-1/2 -translate-x-1/2 w-[600px] h-[440px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse,rgba(124,106,247,0.12) 0%,transparent 70%)' }}
      />
      <div
        className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[400px] h-[280px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse,rgba(197,106,247,0.07) 0%,transparent 70%)' }}
      />

      {/* Floating cards */}
      <div className="hero-fc fc-1 absolute top-[160px] left-[5%] flex items-center gap-2.5 bg-[#13131f] border border-white/[0.07] rounded-xl px-3.5 py-2.5 text-xs text-white/60 pointer-events-none">
        <div className="w-[7px] h-[7px] rounded-full flex-shrink-0 bg-gradient-to-br from-[#1D9E75] to-[#5DCAA5]" />
        Account verified
      </div>

      <div className="hero-fc fc-2 absolute top-[220px] right-[5%] flex items-center gap-2.5 bg-[#13131f] border border-white/[0.07] rounded-xl px-3.5 py-2.5 text-xs text-white/60 pointer-events-none">
        <div className="w-[7px] h-[7px] rounded-full flex-shrink-0 bg-gradient-to-br from-[#7c6af7] to-[#c56af7]" />
        Secure session active
      </div>

      {/* Avatar */}
      <div className="avatar-ring relative w-[108px] h-[108px] mb-7 flex-shrink-0">
        <div
          className="absolute inset-[7px] rounded-full z-10 overflow-hidden flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg,#1a1a2e,#13131f)' }}
        >
          {userData ? (
            <span
              className="text-[30px] font-extrabold"
              style={{
                fontFamily: "'Syne',sans-serif",
                background: 'linear-gradient(135deg,#7c6af7,#c56af7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {initial}
            </span>
          ) : (
            <img
              src={assets.header_img}
              alt="header"
              className="w-full h-full object-cover rounded-full"
              loading="lazy"
            />
          )}
        </div>
      </div>

      {/* Greeting */}
      <div className="relative z-10 inline-flex items-center gap-2 bg-[rgba(124,106,247,0.1)] border border-[rgba(124,106,247,0.25)] rounded-full px-4 py-1.5 mb-5">
        <span className="greeting-wave text-[15px]">👋</span>
        <span className="text-[13px] font-medium text-[#a89af7]">
          Hello, {firstName}!
        </span>
      </div>

      {/* Heading */}
      <h1
        className="hero-headline relative z-10 font-extrabold leading-[1.05] tracking-[-2px] text-[#f0eeff] mb-4"
        style={{ fontFamily: "'Syne',sans-serif", fontSize: 'clamp(36px,6vw,56px)' }}
      >
        Welcome to<br />
        <span className="g">your workspace</span>
      </h1>

      {/* Subtext */}
      <p
        className="relative z-10 text-base text-[#6b6888] font-light leading-relaxed max-w-[420px] mx-auto mb-9"
        style={{ fontFamily: "'DM Sans',sans-serif" }}
      >
        Let's get you up and running. Take a quick tour and discover everything built just for you.
      </p>

      {/* CTA */}
      <div className="relative z-10 flex items-center gap-3 flex-wrap justify-center">
        <button
          className="cta-primary flex items-center gap-2 rounded-full px-7 py-3.5 text-white text-sm font-bold border-none cursor-pointer transition-all duration-200"
          style={{
            fontFamily: "'Syne',sans-serif",
            background: 'linear-gradient(135deg,#7c6af7,#c56af7)',
            boxShadow: '0 8px 28px rgba(124,106,247,0.35)'
          }}
        >
          Get Started
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        {/* <button
          className="cta-secondary flex items-center gap-2 rounded-full px-6 py-3.5 text-sm text-white/55 bg-transparent border border-white/[0.12] cursor-pointer transition-all duration-200"
          style={{ fontFamily: "'DM Sans',sans-serif" }}
          onClick={() => navigate('/features')}
        >
          Explore features
        </button> */}
      </div>
    </div>
  )
}

export default React.memo(Header)