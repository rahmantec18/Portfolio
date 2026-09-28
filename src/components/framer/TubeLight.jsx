import React from "react";

export default function TubeLight({
  stop1 = "#001829",
  stop2 = "#001829",
  stop3 = "#341180",
  stop4 = "#00f2fe",
  stop5 = "#ffffff",
  pos1 = 1,
  pos2 = 49,
  pos3 = 71,
  pos4 = 86,
  pos5 = 100,
  width = "100%",
  height = 3,
  className = "",
  glow = true,
  style = {}
}) {
  const gradient = `conic-gradient(
    from -90deg at 50% 50%,
    ${stop1} ${pos1}%,
    ${stop2} ${pos2}%,
    ${stop3} ${pos3}%,
    ${stop4} ${pos4}%,
    ${stop5} ${pos5}%
  )`;

  return (
    <div
      className={`relative overflow-visible flex items-center justify-center pointer-events-none ${className}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        ...style
      }}
    >
      {/* Mirrored Conic Gradients */}
      <div className="flex w-full h-full">
        <div
          className="flex-1 h-full"
          style={{
            background: gradient,
            transform: "scaleX(-1)"
          }}
        />
        <div
          className="flex-1 h-full"
          style={{
            background: gradient
          }}
        />
      </div>

      {/* Atmospheric Glow */}
      {glow && (
        <div
          className="absolute -top-4 w-3/4 h-8 rounded-full blur-xl pointer-events-none opacity-60"
          style={{
            background: `radial-gradient(ellipse at center, ${stop4} 0%, ${stop3} 50%, transparent 80%)`
          }}
        />
      )}
    </div>
  );
}
