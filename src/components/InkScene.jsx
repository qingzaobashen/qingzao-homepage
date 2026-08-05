import React from 'react'

/**
 * 水墨山水插画（SVG 装饰组件）
 * 仅在 ink 风格下渲染：层叠远山、云雾、涟漪、朱砂印章
 */
function InkScene() {
  return (
    <div className="ink-scene" aria-hidden="true">
      <svg
        className="ink-scene-svg"
        viewBox="0 0 1000 620"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="inkMist" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.09" />
          </linearGradient>
          <linearGradient id="inkHillFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.08" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.22" />
          </linearGradient>
          <linearGradient id="inkHillMid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.15" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.36" />
          </linearGradient>
          <linearGradient id="inkHillNear" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.26" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.58" />
          </linearGradient>
          <linearGradient id="inkTrunk" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="currentColor" stopOpacity="0.4" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.6" />
          </linearGradient>
          <radialGradient id="inkSun" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="var(--color-accent)" stopOpacity="0.5" />
            <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 雾霭底层 */}
        <rect x="0" y="300" width="1000" height="320" fill="url(#inkMist)" />

        {/* 远景群山（淡墨） */}
        <path
          d="M0 400 C120 330 230 318 380 356 C520 392 640 340 800 330 C880 325 950 340 1000 352 L1000 620 L0 620 Z"
          fill="url(#inkHillFar)"
        />
        {/* 中景山 */}
        <path
          d="M-40 470 C100 398 240 412 380 448 C520 484 660 424 820 414 C900 409 960 424 1040 440 L1040 620 L-40 620 Z"
          fill="url(#inkHillMid)"
        />
        {/* 近景山 */}
        <path
          d="M-60 540 C80 470 240 500 380 548 C520 596 700 520 860 506 C930 500 990 516 1060 528 L1060 620 L-60 620 Z"
          fill="url(#inkHillNear)"
        />

        {/* 孤舟 */}
        <g transform="translate(180 520)" stroke="currentColor" strokeWidth="2" strokeOpacity="0.5">
          <path d="M0 0 C28 -14 66 -14 94 0 C66 10 28 10 0 0 Z" fill="currentColor" fillOpacity="0.35" stroke="none" />
        </g>
        {/* 渔翁 */}
        <g transform="translate(224 512)" stroke="currentColor" strokeWidth="2" strokeOpacity="0.55" strokeLinecap="round">
          <line x1="0" y1="0" x2="10" y2="-10" />
          <path d="M10 -10 L26 -14" />
          <circle cx="4" cy="-13" r="2" fill="currentColor" stroke="none" />
          <line x1="4" y1="-11" x2="4" y2="0" />
        </g>

        {/* 松枝（前景） */}
        <g transform="translate(860 430)" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.6" fill="none" strokeLinecap="round">
          <path d="M0 0 L-6 -40" />
          <path d="M-6 -40 L-30 -52" />
          <path d="M-6 -40 L10 -56" />
          <path d="M-4 -26 L-26 -36" />
          <path d="M-4 -26 L12 -42" />
          <path d="M-2 -14 L-22 -22" />
          <path d="M-2 -14 L12 -28" />
        </g>

        {/* 云雾 */}
        <ellipse cx="260" cy="330" rx="190" ry="34" fill="url(#inkMist)" />
        <ellipse cx="680" cy="400" rx="220" ry="40" fill="url(#inkMist)" />
        <ellipse cx="500" cy="362" rx="150" ry="26" fill="url(#inkMist)" />

        {/* 水面涟漪 */}
        <g stroke="currentColor" strokeOpacity="0.2" strokeWidth="2" strokeLinecap="round">
          <path d="M120 588 h90" />
          <path d="M150 604 h120" />
          <path d="M260 620 h80" />
          <path d="M740 580 h100" />
          <path d="M780 600 h70" />
          <path d="M700 618 h110" />
        </g>

        {/* 朱砂印章 */}
        <g transform="translate(884 96)">
          <rect x="0" y="0" width="52" height="52" rx="6" fill="var(--color-primary)" opacity="0.92" />
          <text
            x="26"
            y="36"
            textAnchor="middle"
            fontFamily="var(--font-heading)"
            fontSize="30"
            fontWeight="600"
            fill="var(--color-on-primary)"
          >
            青
          </text>
        </g>
      </svg>
    </div>
  )
}

export default InkScene
