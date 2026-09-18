import React from 'react';
import { Cloud, Cpu, Settings, BarChart3, CloudLightning } from 'lucide-react';

export default function IsometricTechCity() {
  return (
    <div className="relative w-full max-w-[340px] h-[260px] flex items-center justify-center select-none pointer-events-none">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-2xl transform scale-75 animate-pulse" />

      {/* Main Isometric SVG Graphic */}
      <svg
        viewBox="0 0 400 320"
        className="w-full h-full drop-shadow-[0_15px_30px_rgba(6,182,212,0.3)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Base Platform Gradients */}
          <linearGradient id="baseTop" x1="200" y1="180" x2="200" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0891b2" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="baseLeft" x1="70" y1="230" x2="200" y2="295" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="baseRight" x1="200" y1="295" x2="330" y2="230" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#082f49" />
          </linearGradient>

          {/* Neon Grid Glow Ring */}
          <linearGradient id="ringGlow" x1="100" y1="200" x2="300" y2="260" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>

          {/* Building 1 (Front Center - Tall Tower) */}
          <linearGradient id="tower1Top" x1="160" y1="90" x2="230" y2="125" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e0f2fe" />
          </linearGradient>
          <linearGradient id="tower1Left" x1="150" y1="120" x2="195" y2="230" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
          <linearGradient id="tower1Right" x1="195" y1="120" x2="245" y2="230" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          {/* Building 2 (Back Left - Medium Block) */}
          <linearGradient id="tower2Top" x1="120" y1="120" x2="170" y2="150" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#7dd3fc" />
          </linearGradient>
          <linearGradient id="tower2Left" x1="110" y1="140" x2="145" y2="210" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0c4a6e" />
          </linearGradient>
          <linearGradient id="tower2Right" x1="145" y1="140" x2="180" y2="210" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          {/* Building 3 (Back Right - Tech Block) */}
          <linearGradient id="tower3Top" x1="220" y1="130" x2="270" y2="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="100%" stopColor="#bae6fd" />
          </linearGradient>
          <linearGradient id="tower3Left" x1="210" y1="150" x2="245" y2="220" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#075985" />
          </linearGradient>
          <linearGradient id="tower3Right" x1="245" y1="150" x2="280" y2="220" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          {/* Holographic Circuit Lines */}
          <pattern id="gridPattern" width="12" height="12" patternUnits="userSpaceOnUse">
            <path d="M 12 0 L 0 0 0 12" fill="none" stroke="rgba(34,211,238,0.25)" strokeWidth="0.8" />
          </pattern>
        </defs>

        {/* ------------------------------------
            FLOATING ISOMETRIC BASE PLATFORM
           ------------------------------------ */}
        {/* Outer Glow Ring */}
        <polygon
          points="200,165 345,230 200,295 55,230"
          fill="none"
          stroke="url(#ringGlow)"
          strokeWidth="3.5"
          className="opacity-85"
        />
        {/* Second Concentric Ring */}
        <polygon
          points="200,175 330,233 200,288 70,233"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          className="opacity-60"
        />

        {/* Platform Bottom Left Face */}
        <polygon points="55,230 200,295 200,308 55,243" fill="url(#baseLeft)" />
        {/* Platform Bottom Right Face */}
        <polygon points="200,295 345,230 345,243 200,308" fill="url(#baseRight)" />

        {/* Platform Top Surface */}
        <polygon points="200,175 330,233 200,290 70,233" fill="url(#baseTop)" />

        {/* Platform Grid Mesh Surface */}
        <polygon points="200,175 330,233 200,290 70,233" fill="url(#gridPattern)" />

        {/* ------------------------------------
            BUILDING 2 (BACK LEFT)
           ------------------------------------ */}
        {/* Left Face */}
        <polygon points="115,145 155,168 155,225 115,202" fill="url(#tower2Left)" />
        {/* Right Face */}
        <polygon points="155,168 190,148 190,205 155,225" fill="url(#tower2Right)" />
        {/* Top Face */}
        <polygon points="155,128 190,148 155,168 120,148" fill="url(#tower2Top)" />
        {/* Windows / Grids */}
        <line x1="125" y1="160" x2="148" y2="173" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.8" />
        <line x1="125" y1="175" x2="148" y2="188" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.8" />
        <line x1="125" y1="190" x2="148" y2="203" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.8" />

        {/* ------------------------------------
            BUILDING 3 (BACK RIGHT)
           ------------------------------------ */}
        {/* Left Face */}
        <polygon points="210,165 245,185 245,238 210,218" fill="url(#tower3Left)" />
        {/* Right Face */}
        <polygon points="245,185 285,162 285,215 245,238" fill="url(#tower3Right)" />
        {/* Top Face */}
        <polygon points="245,142 285,162 245,185 205,165" fill="url(#tower3Top)" />
        {/* Window Dots */}
        <line x1="255" y1="185" x2="278" y2="172" stroke="#0284c7" strokeWidth="1.5" strokeOpacity="0.6" />
        <line x1="255" y1="198" x2="278" y2="185" stroke="#0284c7" strokeWidth="1.5" strokeOpacity="0.6" />
        <line x1="255" y1="211" x2="278" y2="198" stroke="#0284c7" strokeWidth="1.5" strokeOpacity="0.6" />

        {/* ------------------------------------
            BUILDING 1 (MAIN CENTER TOWER)
           ------------------------------------ */}
        {/* Left Face (Deep Cyan/Blue) */}
        <polygon points="155,125 200,150 200,245 155,220" fill="url(#tower1Left)" />
        {/* Right Face (Crisp Light White/Silver) */}
        <polygon points="200,150 250,122 250,217 200,245" fill="url(#tower1Right)" />
        {/* Top Roof (Pure White/Cyan Edge) */}
        <polygon points="200,98 250,122 200,150 150,126" fill="url(#tower1Top)" stroke="#38bdf8" strokeWidth="1" />

        {/* Windows on Left Face (Glow Cyan Lines) */}
        <g stroke="#67e8f9" strokeWidth="2" strokeOpacity="0.9">
          <line x1="165" y1="140" x2="192" y2="155" />
          <line x1="165" y1="155" x2="192" y2="170" />
          <line x1="165" y1="170" x2="192" y2="185" />
          <line x1="165" y1="185" x2="192" y2="200" />
          <line x1="165" y1="200" x2="192" y2="215" />
        </g>

        {/* Windows on Right Face (Clean Dark Tech Lines) */}
        <g stroke="#0284c7" strokeWidth="2" strokeOpacity="0.75">
          <line x1="208" y1="154" x2="242" y2="135" />
          <line x1="208" y1="169" x2="242" y2="150" />
          <line x1="208" y1="184" x2="242" y2="165" />
          <line x1="208" y1="199" x2="242" y2="180" />
          <line x1="208" y1="214" x2="242" y2="195" />
        </g>

        {/* Spire / Antenna on top of Center Tower */}
        <line x1="200" y1="98" x2="200" y2="76" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="200" cy="74" r="3.5" fill="#22d3ee" className="animate-ping" />
        <circle cx="200" cy="74" r="3" fill="#ffffff" />
      </svg>

      {/* ------------------------------------
          FLOATING HOLOGRAPHIC BADGES
         ------------------------------------ */}
      {/* Badge 1: Cloud (Top Left) */}
      <div className="absolute top-8 left-4 sm:left-8 bg-blue-900/80 backdrop-blur-md border border-cyan-400/50 p-2 sm:p-2.5 rounded-xl shadow-lg shadow-cyan-500/20 text-cyan-300 animate-float-slow">
        <Cloud className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>

      {/* Badge 2: IA / Chip (Top Right) */}
      <div className="absolute top-6 right-6 sm:right-10 bg-blue-900/80 backdrop-blur-md border border-cyan-400/50 p-2 sm:p-2.5 rounded-xl shadow-lg shadow-cyan-500/20 text-cyan-300 animate-float-reverse">
        <div className="flex items-center gap-1">
          <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="text-[10px] font-extrabold tracking-wider">IA</span>
        </div>
      </div>

      {/* Badge 3: Analytics Chart (Bottom Left) */}
      <div className="absolute bottom-12 left-2 sm:left-6 bg-blue-950/80 backdrop-blur-md border border-cyan-400/40 p-2 sm:p-2.5 rounded-xl shadow-lg shadow-blue-500/20 text-cyan-300 animate-float-slow">
        <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>

      {/* Badge 4: Gear / Automation (Right Center) */}
      <div className="absolute top-28 right-2 sm:right-4 bg-blue-950/80 backdrop-blur-md border border-cyan-400/40 p-2 sm:p-2 rounded-xl shadow-lg shadow-cyan-500/20 text-cyan-300 animate-float-reverse">
        <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin-slow" />
      </div>

      {/* Badge 5: Cloud Lightning (Bottom Right) */}
      <div className="absolute bottom-10 right-8 sm:right-12 bg-blue-900/80 backdrop-blur-md border border-cyan-400/40 p-2 rounded-xl shadow-lg shadow-cyan-500/20 text-cyan-300 animate-float-slow">
        <CloudLightning className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </div>
    </div>
  );
}
