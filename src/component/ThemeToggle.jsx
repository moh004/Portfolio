

function ThemeToggle({setIsDark,isDark}) {

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      aria-label="Toggle theme"
      className={`
        relative w-[180px] h-[72px] rounded-full
        overflow-hidden border-[4px]
        transition-all duration-500
        shadow-[inset_0_3px_8px_rgba(0,0,0,0.5),0_4px_8px_rgba(0,0,0,0.2)]
        ${isDark ? "bg-[#171a1d] border-[#303437]" : "bg-[#24669b] border-[#17476c]"}
      `}
    >
      {/* Background layers */}
      <div
        className={`
          absolute inset-0 transition-all duration-700
          ${isDark ? "opacity-100" : "opacity-0"}
        `}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-[#25292c] to-[#555b5d]" />

        {/* Stars */}
        {[
          ["20%", "25%"],
          ["38%", "55%"],
          ["48%", "20%"],
          ["60%", "75%"],
          ["72%", "30%"],
          ["30%", "78%"],
          ["55%", "45%"],
        ].map(([x, y], i) => (
          <span
            key={i}
            className="absolute text-white text-xs animate-pulse"
            style={{ left: x, top: y }}
          >
            ✦
          </span>
        ))}
      </div>

      {/* Day clouds */}
      <div
        className={`
          absolute bottom-0 right-0 w-full h-7
          transition-opacity duration-500
          ${isDark ? "opacity-0" : "opacity-100"}
        `}
      >
        <div className="absolute bottom-[-12px] right-[-5px] flex">
          {[24, 32, 27, 36, 28, 25].map((size, i) => (
            <span
              key={i}
              className="rounded-full bg-[#d8f5fa]"
              style={{
                width: size,
                height: size,
                marginLeft: -7,
              }}
            />
          ))}
        </div>
      </div>

      {/* Sun / Moon */}
      <div
        className={`
          absolute top-[5px] left-[5px]
          w-[54px] h-[54px] rounded-full
          transition-all duration-700 ease-in-out
          ${isDark
            ? "translate-x-[104px] bg-[#e6e5d5] shadow-[0_0_8px_rgba(255,255,255,0.5)]"
            : "translate-x-0 bg-[#c6dc22] shadow-[0_3px_5px_rgba(0,0,0,0.35)]"
          }
        `}
      >
        {/* Moon craters */}
        <div className={`${isDark ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}>
          <span className="absolute w-3 h-3 rounded-full bg-[#a5a59d] top-2 left-8" />
          <span className="absolute w-6 h-6 rounded-full bg-[#b6b5ad] top-6 left-2" />
          <span className="absolute w-5 h-5 rounded-full bg-[#b6b5ad] top-7 right-2" />
        </div>
      </div>
    </button>
  );
}

export default ThemeToggle;
