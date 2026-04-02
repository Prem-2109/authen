import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/appContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()
  const { backendUrl, setLoggedIn, getUserData } = useContext(AppContext)
  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      axios.defaults.withCredentials = true
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/auth/register', { name, email, password })
        if (data.success) { setLoggedIn(true); getUserData(); navigate('/') }
        else toast.error(data.message)
      } else {
        const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password })
        if (data.success) { setLoggedIn(true); getUserData(); navigate('/') }
        else toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  const isSignUp = state === 'Sign Up'

  return (
    <div className="min-h-screen bg-[#09090f] flex items-center justify-center p-4 font-sans">


      {/* Card */}
      <div className="auth-page flex w-[960px] min-h-[600px] rounded-3xl overflow-hidden border border-white/[0.07] shadow-[0_40px_120px_rgba(0,0,0,0.6),0_0_0_1px_rgba(124,106,247,0.1)]">

        {/* LEFT VISUAL PANEL */}
        <div className="visual-panel flex-1 flex flex-col justify-between p-[52px_48px] relative overflow-hidden"
          style={{ background: 'linear-gradient(145deg,#0d0b1f,#1a0b2e 50%,#0b1230)' }}>

          {/* Grid overlay */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'linear-gradient(rgba(124,106,247,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(124,106,247,.05) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-2.5">
            {/* <img onClick={() => navigate('/')} src={assets.logo} alt="logo"
              className="w-28 cursor-pointer brightness-125" /> */}
              <h1 onClick={() => navigate('/')} style={{ fontFamily: "'Syne', sans-serif", fontSize: '38px', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-1.5px', marginBottom: '16px', color: '#f0eeff' }}>
              Authfy</h1>
          </div>

          {/* Headline */}
          <div className="relative z-10">
            <div className="visual-tag inline-flex items-center gap-1.5 bg-[rgba(124,106,247,0.12)] border border-[rgba(124,106,247,0.25)] rounded-full px-3.5 py-1.5 text-[11px] text-[#7c6af7] tracking-widest uppercase font-medium mb-6">
              Secure Platform
            </div>
            <h1 className="text-[38px] font-extrabold leading-[1.1] tracking-[-1.5px] mb-4 text-[#f0eeff]"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              Your space to<br />
              <span style={{ background: 'linear-gradient(90deg,#7c6af7,#c56af7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                build & grow
              </span>
            </h1>
            <p className="text-sm text-[#6b6888] leading-relaxed max-w-[280px] font-light">
              One account. Complete access. Everything you need, secured and ready.
            </p>
          </div>

          {/* Feature pills */}
          <div className="visual-features relative z-10 flex flex-col gap-2.5">
            {[['🔐', 'End-to-end encrypted'], ['⚡', 'Instant authentication'], ['🌍', 'Available everywhere']].map(([icon, text]) => (
              <div key={text} className="flex items-center gap-2.5 bg-white/[0.03] border border-white/[0.07] rounded-xl px-3.5 py-2.5 text-[12.5px] text-white/60 w-fit">
                <span>{icon}</span>{text}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT FORM PANEL */}
        <div className="form-panel w-[400px] flex flex-col p-[52px_44px] bg-[#13131f]">

          {/* Tab Switcher */}
          <div className="tab-bar relative flex bg-[#1a1a2e] rounded-xl p-1 mb-8">
            <div className="tab-slider" style={{ transform: isSignUp ? 'translateX(0)' : 'translateX(100%)' }} />
            <button className="flex-1 py-2.5 text-[13.5px] font-medium relative z-10 rounded-[9px] border-none bg-transparent cursor-pointer transition-colors duration-200"
              style={{ color: isSignUp ? 'white' : '#6b6888', fontFamily: "'DM Sans', sans-serif" }}
              onClick={() => setState('Sign Up')}>Sign Up</button>
            <button className="flex-1 py-2.5 text-[13.5px] font-medium relative z-10 rounded-[9px] border-none bg-transparent cursor-pointer transition-colors duration-200"
              style={{ color: !isSignUp ? 'white' : '#6b6888', fontFamily: "'DM Sans', sans-serif" }}
              onClick={() => setState('Login')}>Login</button>
          </div>

          {/* Form heading */}
          <h2 className="text-[22px] font-bold text-[#f0eeff] mb-1.5 tracking-[-0.5px]"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-[13px] text-[#6b6888] font-light mb-7">
            {isSignUp ? 'Join thousands of users today' : 'Sign in to your account'}
          </p>

          <form onSubmit={onSubmitHandler}>

            {/* Name — sign up only */}
            <div className={`name-field ${isSignUp ? 'show' : ''}`}>
              <label className="block text-[11.5px] text-[#6b6888] uppercase tracking-widest font-medium mb-1.5">
                Full Name
              </label>
              <div className="input-wrap flex items-center bg-[#1a1a2e] border border-white/[0.07] rounded-xl px-4 transition-all duration-200">
                <img src={assets.person_icon} alt="" className="w-4 mr-2.5 opacity-45" />
                <input className="flex-1 bg-transparent border-none outline-none text-[#f0eeff] text-sm py-3.5 placeholder:text-[rgba(107,104,136,0.6)]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  type="text" placeholder="Your full name"
                  onChange={e => setName(e.target.value)} value={name} required={isSignUp} />
              </div>
            </div>

            {/* Email */}
            <div className="mb-3.5">
              <label className="block text-[11.5px] text-[#6b6888] uppercase tracking-widest font-medium mb-1.5">
                Email
              </label>
              <div className="input-wrap flex items-center bg-[#1a1a2e] border border-white/[0.07] rounded-xl px-4 transition-all duration-200">
                <img src={assets.mail_icon} alt="" className="w-4 mr-2.5 opacity-45" />
                <input className="flex-1 bg-transparent border-none outline-none text-[#f0eeff] text-sm py-3.5 placeholder:text-[rgba(107,104,136,0.6)]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  type="email" placeholder="you@example.com"
                  onChange={e => setEmail(e.target.value)} value={email} required />
              </div>
            </div>

            {/* Password */}
            <div className="mb-3.5">
              <label className="block text-[11.5px] text-[#6b6888] uppercase tracking-widest font-medium mb-1.5">
                Password
              </label>
              <div className="input-wrap flex items-center bg-[#1a1a2e] border border-white/[0.07] rounded-xl px-4 transition-all duration-200">
                <img src={assets.lock_icon} alt="" className="w-4 mr-2.5 opacity-45" />
                <input className="flex-1 bg-transparent border-none outline-none text-[#f0eeff] text-sm py-3.5 placeholder:text-[rgba(107,104,136,0.6)]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                  type="password" placeholder="••••••••"
                  onChange={e => setPassword(e.target.value)} value={password} required />
              </div>
            </div>

            {/* Forgot password */}
            {!isSignUp && (
              <p onClick={() => navigate('/resetpassword')}
                className="text-right text-xs text-[#7c6af7] cursor-pointer mb-5 -mt-1.5 hover:opacity-80 transition-opacity">
                Forgot password?
              </p>
            )}

            {/* Submit */}
            <button type="submit"
              className="submit-btn w-full py-3.5 mb-5 rounded-xl text-white text-[15px] font-bold tracking-wide border-none cursor-pointer transition-all duration-200"
              style={{ background: 'linear-gradient(135deg,#7c6af7,#c56af7)', boxShadow: '0 8px 28px rgba(124,106,247,0.35)', fontFamily: "'Syne', sans-serif" }}>
              {isSignUp ? 'Create Account →' : 'Login →'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4 text-[11.5px] text-[#6b6888] uppercase tracking-wider">
            <div className="flex-1 h-px bg-white/[0.07]" />
            or continue with
            <div className="flex-1 h-px bg-white/[0.07]" />
          </div>

          {/* Social buttons */}
          {/* <div className="flex gap-2.5 mb-6">
            <button className="social-btn flex-1 flex items-center justify-center gap-2 py-3 bg-[#1a1a2e] border border-white/[0.07] rounded-xl text-white/65 text-[13px] font-medium cursor-pointer transition-all duration-200">
              <svg width="15" height="15" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </button>
            <button className="social-btn flex-1 flex items-center justify-center gap-2 py-3 bg-[#1a1a2e] border border-white/[0.07] rounded-xl text-white/65 text-[13px] font-medium cursor-pointer transition-all duration-200">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </button>
          </div> */}

          {/* Switch mode */}
          <p className="text-center text-[12.5px] text-[#6b6888]">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <span onClick={() => setState(isSignUp ? 'Login' : 'Sign Up')}
              className="text-[#7c6af7] cursor-pointer font-medium ml-1 hover:underline">
              {isSignUp ? 'Login here' : 'Sign up'}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
