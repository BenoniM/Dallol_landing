import React from "react";

// Parallax offset driven by the --lx / --ly CSS variables (-1..1) set on an ancestor.
// Inside SVG, px in a CSS transform maps to viewBox user units.
const look = (x, y, extra = "") =>
  `translate(calc(var(--lx, 0) * ${x}px), calc(var(--ly, 0) * ${y}px)) ${extra}`;

const HAIR_BACK = {
  long: (
    <path d="M62 90 C58 54 80 44 100 44 C124 44 142 56 140 92 C142 120 146 140 150 158 C130 164 70 164 50 158 C56 140 60 120 62 90 Z" />
  ),
  bob: (
    <path d="M62 92 C58 54 80 44 100 44 C122 44 142 54 138 92 L140 128 C130 133 122 131 118 126 L82 126 C78 131 70 133 60 128 Z" />
  ),
  bun: <circle cx="100" cy="40" r="15" />,
};

const CURLS = Array.from({ length: 9 }, (_, i) => {
  const a = Math.PI * (1.05 - (i / 8) * 1.1);
  return { cx: 100 + Math.cos(a) * 36, cy: 82 - Math.sin(a) * 34 };
});

const HAIR_FRONT = {
  short: (
    <path d="M64 92 C60 58 80 46 102 46 C126 46 140 60 136 92 C132 80 126 72 116 70 C104 76 86 76 74 72 C68 78 65 84 64 92 Z" />
  ),
  long: (
    <path d="M64 94 C62 60 82 46 102 46 C126 46 140 62 136 96 C130 78 120 66 104 64 C96 74 80 82 64 94 Z" />
  ),
  bob: (
    <path d="M64 90 C62 58 80 46 100 46 C120 46 138 58 136 90 L134 78 Q100 83 66 78 Z" />
  ),
  bun: (
    <path d="M65 90 C62 58 82 48 100 48 C120 48 138 58 135 90 C128 74 116 64 100 64 C84 64 72 74 65 90 Z" />
  ),
  curly: (
    <>
      <ellipse cx="100" cy="64" rx="32" ry="18" />
      {CURLS.map((c, i) => (
        <circle key={i} cx={c.cx} cy={c.cy} r="12" />
      ))}
    </>
  ),
};

const ClientAvatar = ({ avatar, name, blinkDelay = 0 }) => {
  const { bg, accent, skin, skinShade, hair, shirt, hairStyle, beard, glasses } = avatar;

  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label={name}
      className="w-full h-full select-none"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="200" height="200" fill={bg} />

      {/* Background decor drifts opposite to the cursor for depth */}
      <g style={{ transform: look(-7, -6) }}>
        <circle cx="100" cy="108" r="72" fill="#ffffff" opacity="0.55" />
        <circle cx="156" cy="46" r="13" fill="none" stroke={accent} strokeWidth="3" />
        <circle cx="38" cy="150" r="5" fill={accent} />
        <circle cx="46" cy="52" r="3" fill={shirt} opacity="0.5" />
      </g>

      {HAIR_BACK[hairStyle] && (
        <g fill={hair} style={{ transform: look(3, 2) }}>
          {HAIR_BACK[hairStyle]}
        </g>
      )}

      {/* Body */}
      <g style={{ transform: look(1.5, 1) }}>
        <path d="M88 116 L88 150 Q100 158 112 150 L112 116 Z" fill={skin} />
        <path d="M88 128 Q100 138 112 128 L112 116 L88 116 Z" fill={skinShade} opacity="0.45" />
        <path
          d="M34 200 C36 168 62 150 88 146 Q100 158 112 146 C138 150 164 168 166 200 Z"
          fill={shirt}
        />
      </g>

      {/* Head turns and tilts toward the cursor */}
      <g
        style={{
          transform: look(5, 4, "rotate(calc(var(--lx, 0) * 4deg))"),
          transformOrigin: "100px 140px",
        }}
      >
        <g fill={skin} style={{ transform: look(-2, -1) }}>
          <circle cx="66" cy="98" r="7" />
          <circle cx="134" cy="98" r="7" />
        </g>
        <ellipse cx="100" cy="92" rx="34" ry="40" fill={skin} />

        {/* Facial features move further than the head, giving a 3D turn */}
        <g style={{ transform: look(4, 3) }}>
          <g
            stroke={hair}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            style={{ transform: "translateY(calc(var(--lh, 0) * -3px))" }}
          >
            <path d="M78 83 Q86 79 94 83" />
            <path d="M106 83 Q114 79 122 83" />
          </g>

          <g className="client-avatar-blink" style={{ animationDelay: `${blinkDelay}s` }}>
            <ellipse cx="86" cy="96" rx="6.5" ry="7" fill="#ffffff" />
            <ellipse cx="114" cy="96" rx="6.5" ry="7" fill="#ffffff" />
            <g style={{ transform: look(2.6, 2.6) }}>
              <circle cx="86" cy="96" r="3.6" fill="#1b1b1b" />
              <circle cx="114" cy="96" r="3.6" fill="#1b1b1b" />
              <circle cx="87.2" cy="94.6" r="1.1" fill="#ffffff" />
              <circle cx="115.2" cy="94.6" r="1.1" fill="#ffffff" />
            </g>
          </g>

          <path
            d="M100 98 Q96.5 107 101 109.5"
            stroke={skinShade}
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="77" cy="110" r="5" fill={accent} opacity="0.18" />
          <circle cx="123" cy="110" r="5" fill={accent} opacity="0.18" />

          {beard && (
            <path
              d="M66 100 C66 128 82 142 100 142 C118 142 134 128 134 100 C130 114 120 113 100 113 C80 113 70 114 66 100 Z"
              fill={hair}
            />
          )}

          <path
            d="M90 117 Q100 127 110 117 Z"
            fill="#ffffff"
            stroke="#5a2a26"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />

          {glasses && (
            <g stroke="#111111" strokeWidth="2.4" fill="#ffffff" fillOpacity="0.12">
              <rect x="75" y="87" width="22" height="18" rx="6" />
              <rect x="103" y="87" width="22" height="18" rx="6" />
              <path d="M97 95 Q100 92 103 95" fill="none" />
            </g>
          )}
        </g>

        {HAIR_FRONT[hairStyle] && (
          <g fill={hair} style={{ transform: look(1, 0.5) }}>
            {HAIR_FRONT[hairStyle]}
          </g>
        )}
      </g>
    </svg>
  );
};

export default ClientAvatar;
