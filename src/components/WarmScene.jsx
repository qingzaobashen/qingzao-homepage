import React from 'react'

/**
 * 温暖风格装饰插画（SVG 背景组件）
 * 仅在 warm 风格下渲染：暖阳、光线、盆栽、温馨小物
 * 与 InkScene（水墨山水）互补
 */
function WarmScene() {
  return (
    <div className="warm-scene" aria-hidden="true">
      <svg
        className="warm-scene-svg"
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          {/* 暖阳渐变 */}
          <radialGradient id="warmSunGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="var(--color-accent-amber)" stopOpacity="0.35" />
            <stop offset="0.4" stopColor="var(--color-accent-amber)" stopOpacity="0.15" />
            <stop offset="1" stopColor="var(--color-accent-amber)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="warmSunCore" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="var(--color-accent-amber)" stopOpacity="0.9" />
            <stop offset="0.6" stopColor="var(--color-accent-orange)" stopOpacity="0.5" />
            <stop offset="1" stopColor="var(--color-accent-orange)" stopOpacity="0" />
          </radialGradient>
          {/* 光线渐变 */}
          <linearGradient id="warmRay" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-accent-amber)" stopOpacity="0.12" />
            <stop offset="1" stopColor="var(--color-accent-amber)" stopOpacity="0" />
          </linearGradient>
          {/* 盆栽盆体渐变 */}
          <linearGradient id="warmPot" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-accent-orange)" stopOpacity="0.35" />
            <stop offset="1" stopColor="var(--color-accent-orange)" stopOpacity="0.55" />
          </linearGradient>
          {/* 窗光渐变 */}
          <linearGradient id="warmWindow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-accent-amber)" stopOpacity="0.18" />
            <stop offset="1" stopColor="var(--color-accent-amber)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 右上角暖阳光晕 */}
        <circle cx="1150" cy="140" r="200" fill="url(#warmSunGlow)" />

        {/* 太阳本体 */}
        <circle cx="1150" cy="140" r="60" fill="url(#warmSunCore)" />
        <circle cx="1150" cy="140" r="28" fill="var(--color-accent-amber)" opacity="0.4" />

        {/* 柔和光线（扇形扩散） */}
        <g transform="translate(1150 140)" opacity="0.5">
          <path d="M0 -60 L180 -200 L200 -60 Z" fill="url(#warmRay)" />
          <path d="M0 -60 L60 -220 L120 -60 Z" fill="url(#warmRay)" />
          <path d="M0 -60 L-100 -230 L-20 -60 Z" fill="url(#warmRay)" />
          <path d="M0 -60 L-240 -160 L-60 -60 Z" fill="url(#warmRay)" />
        </g>

        {/* 右下角温馨窗框 */}
        <g transform="translate(1180 360)" opacity="0.6">
          <rect x="0" y="0" width="120" height="160" rx="6"
            fill="none"
            stroke="var(--color-accent-orange)"
            strokeOpacity="0.3"
            strokeWidth="2"
          />
          {/* 窗内光 */}
          <rect x="8" y="8" width="104" height="144" rx="4" fill="url(#warmWindow)" />
          {/* 窗棂 */}
          <line x1="60" y1="8" x2="60" y2="152" stroke="var(--color-accent-orange)" strokeOpacity="0.25" strokeWidth="1.5" />
          <line x1="8" y1="80" x2="112" y2="80" stroke="var(--color-accent-orange)" strokeOpacity="0.25" strokeWidth="1.5" />
        </g>

        {/* 左下角盆栽 */}
        <g transform="translate(80 380)">
          {/* 叶片 - 左 */}
          <path d="M40 80 C30 30 50 10 70 20 C60 40 50 60 45 80"
            fill="var(--color-accent-green)"
            fillOpacity="0.35"
          />
          {/* 叶片 - 中 */}
          <path d="M60 80 C55 20 80 0 95 15 C85 35 70 55 65 80"
            fill="var(--color-accent-green)"
            fillOpacity="0.45"
          />
          {/* 叶片 - 右 */}
          <path d="M80 80 C85 40 110 25 120 40 C105 55 90 70 85 80"
            fill="var(--color-accent-green)"
            fillOpacity="0.3"
          />
          {/* 小花 */}
          <circle cx="95" cy="12" r="5" fill="var(--color-accent-orange)" fillOpacity="0.5" />
          <circle cx="75" cy="8" r="4" fill="var(--color-accent-amber)" fillOpacity="0.5" />
          {/* 花盆 */}
          <path d="M35 75 L105 75 L95 120 C95 125 90 128 85 128 L55 128 C50 128 45 125 45 120 Z"
            fill="url(#warmPot)"
          />
          <rect x="35" y="70" width="70" height="10" rx="2"
            fill="var(--color-accent-orange)"
            fillOpacity="0.45"
          />
        </g>

        {/* 远处小盆栽（中偏左） */}
        <g transform="translate(300 460)" opacity="0.4">
          <path d="M25 60 C20 30 35 15 45 20 C38 35 30 50 28 60"
            fill="var(--color-accent-green)"
            fillOpacity="0.4"
          />
          <path d="M40 60 C38 25 55 10 65 20 C55 35 45 50 42 60"
            fill="var(--color-accent-green)"
            fillOpacity="0.5"
          />
          <path d="M20 55 L60 55 L55 85 C55 88 52 90 50 90 L30 90 C28 90 25 88 25 85 Z"
            fill="var(--color-accent-orange)"
            fillOpacity="0.4"
          />
        </g>

        {/* 地面柔和曲线（暗示桌面/地面） */}
        <path d="M0 580 C200 560 500 570 800 565 C1100 560 1300 575 1440 565 L1440 600 L0 600 Z"
          fill="var(--color-accent-amber)"
          fillOpacity="0.04"
        />
        <path d="M0 590 C250 575 550 585 900 578 C1200 572 1350 585 1440 578 L1440 600 L0 600 Z"
          fill="var(--color-accent-orange)"
          fillOpacity="0.03"
        />

        {/* 飘散的小光点 */}
        <g opacity="0.5">
          <circle cx="980" cy="100" r="3" fill="var(--color-accent-amber)" />
          <circle cx="1050" cy="60" r="2" fill="var(--color-accent-orange)" />
          <circle cx="900" cy="150" r="2" fill="var(--color-accent-amber)" />
          <circle cx="1300" cy="200" r="2.5" fill="var(--color-accent-orange)" />
          <circle cx="1250" cy="300" r="2" fill="var(--color-accent-amber)" />
          <circle cx="200" cy="200" r="2.5" fill="var(--color-accent-amber)" opacity="0.6" />
          <circle cx="250" cy="150" r="2" fill="var(--color-accent-orange)" opacity="0.5" />
        </g>

        {/* 柔和波浪线（温暖流动感） */}
        <g stroke="var(--color-accent-orange)" strokeOpacity="0.08" strokeWidth="1.5" fill="none">
          <path d="M0 520 C120 510 240 525 360 515 C480 505 600 520 720 515 C840 510 960 525 1080 515 C1200 505 1320 520 1440 515" />
          <path d="M0 540 C150 530 280 545 420 535 C560 525 700 540 840 535 C980 530 1120 545 1260 535 C1350 528 1400 535 1440 533" />
        </g>
      </svg>
    </div>
  )
}

export default WarmScene