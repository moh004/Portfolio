import { useMemo } from "react"
import { useTranslation } from "react-i18next"

// Optional: add this to your index.html <head> for the title font
// <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&display=swap" rel="stylesheet">

function Snow({ count = 500 }) {
    const flakes = useMemo(
        () =>
            Array.from({ length: count }, (_, i) => ({
                id: i,
                left: Math.random() * 100,
                size: 2 + Math.random() * 3,
                dur: 6 + Math.random() * 8,
                delay: -Math.random() * 12,
                drift: -30 + Math.random() * 60,
                opacity: 0.4 + Math.random() * 0.5,
            })),
        [count]
    )

    return (
        <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
            {flakes.map((f) => (
                <span
                    key={f.id}
                    className="snowflake absolute top-0 rounded-full bg-white"
                    style={{
                        left: `${f.left}%`,
                        width: f.size,
                        height: f.size,
                        opacity: f.opacity,
                        animationDuration: `${f.dur}s`,
                        animationDelay: `${f.delay}s`,
                        "--drift": `${f.drift}px`,
                    }}
                />
            ))}
        </div>
    )
}

function Wall() {
    return (
        <svg
            className="absolute bottom-0 left-0 z-10 h-[52%] w-full"
            viewBox="0 0 1440 520"
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <defs>
                <linearGradient id="ice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#e6f4fb" />
                    <stop offset="0.35" stopColor="#9cc7de" />
                    <stop offset="1" stopColor="#1d3a52" />
                </linearGradient>
                <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#c9d8e3" />
                    <stop offset="1" stopColor="#6d8396" />
                </linearGradient>
            </defs>

            {/* the Wall, jagged where it has calved */}
            <polygon
                fill="url(#ice)"
                points="0,70 90,48 170,66 260,40 330,58 430,30 520,52 610,36 700,60 790,34 880,54 970,28 1060,50 1150,38 1240,62 1330,42 1440,60 1440,520 0,520"
            />
            {/* cracks and strata */}
            <g stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1.5" fill="none">
                <path d="M120 66 L150 180 L128 260" />
                <path d="M520 52 L492 150 L530 250" />
                <path d="M880 54 L910 170 L880 240" />
                <path d="M1240 62 L1210 160 L1250 250" />
            </g>
            <g stroke="#1d3a52" strokeOpacity="0.25" strokeWidth="2">
                <path d="M0 150 H1440" />
                <path d="M0 230 H1440" />
            </g>

            {/* snowy ground */}
            <path fill="url(#ground)" d="M0 420 Q360 380 720 410 T1440 400 V520 H0 Z" />

            {/* Castle Black at the foot of the Wall */}
            <g fill="#0d1620">
                <rect x="610" y="352" width="60" height="62" />
                <rect x="680" y="336" width="36" height="78" />
                <polygon points="680,336 698,310 716,336" />
                <rect x="724" y="360" width="70" height="54" />
                <rect x="590" y="372" width="22" height="42" />
            </g>
            <g className="torch" fill="#ffb347">
                <rect x="694" y="352" width="7" height="10" />
                <rect x="632" y="372" width="7" height="10" />
                <rect x="748" y="378" width="7" height="10" />
                <rect x="598" y="388" width="5" height="8" />
            </g>
        </svg>
    )
}

function Pines({ side }) {
    const flip = side === "right" ? "scale(-1,1)" : undefined
    return (
        <svg
            className={`absolute bottom-0 z-30 h-[70%] w-[38%] md:w-[26%] ${side === "left" ? "left-0" : "right-0"}`}
            viewBox="0 0 300 600"
            preserveAspectRatio="xMinYMax meet"
            aria-hidden="true"
            style={{ transform: flip }}
        >
            <g fill="#04080d">
                <polygon points="40,600 40,340 0,340 55,230 20,230 80,110 50,110 100,0 150,110 120,110 180,230 145,230 200,340 160,340 160,600" />
                <polygon points="170,600 170,430 135,430 190,330 160,330 215,230 190,230 240,140 290,230 265,230 320,330 290,330 340,430 300,430 300,600" />
            </g>
        </svg>
    )
}

function Hero() {
    const {t} = useTranslation()

    return (
        <section className="relative isolate min-h-screen overflow-hidden bg-gradient-to-b from-[#05080f] via-[#0c1a2b] to-[#1f3b55] text-slate-100">
            <style>{`
                @keyframes snowfall {
                    to { transform: translate3d(var(--drift), 105vh, 0); }
                }
                @keyframes flicker {
                    0%, 100% { opacity: 1; }
                    45% { opacity: 0.55; }
                    60% { opacity: 0.9; }
                }
                @keyframes rise {
                    from { opacity: 0; transform: translateY(18px); }
                    to { opacity: 1; transform: none; }
                }
                .snowflake { animation: snowfall linear infinite; }
                .torch { animation: flicker 1.6s ease-in-out infinite; filter: drop-shadow(0 0 6px #ff9f1c); }
                .hero-in { animation: rise 1.1s ease-out both; }
                @media (prefers-reduced-motion: reduce) {
                    .snowflake, .torch, .hero-in { animation: none; }
                }
            `}</style>

            {/* faint stars */}
            <div
                className="absolute inset-0 opacity-60"
                aria-hidden="true"
                style={{
                    backgroundImage:
                        "radial-gradient(1px 1px at 12% 18%, #fff, transparent), radial-gradient(1px 1px at 38% 8%, #fff, transparent), radial-gradient(1.5px 1.5px at 64% 22%, #fff, transparent), radial-gradient(1px 1px at 86% 12%, #fff, transparent), radial-gradient(1px 1px at 52% 34%, #fff, transparent), radial-gradient(1px 1px at 24% 40%, #fff, transparent)",
                }}
            />

            <Wall />
            <Pines side="left" />
            <Pines side="right" />
            <Snow />

            {/* hood vignette: you are looking out from under a cloak */}
            <div
                className="pointer-events-none absolute inset-0 z-40"
                aria-hidden="true"
                style={{
                    background:
                        "radial-gradient(ellipse at 50% 45%, transparent 55%, rgba(2,4,8,0.75) 100%)",
                }}
            />

            <div className="relative z-50 mx-auto grid min-h-screen max-w-6xl items-start gap-10 px-6 pb-[45vh] pt-24 md:grid-cols-2 md:items-center md:pb-[38vh]">
                <div className="hero-in">
                    <h2
                        className="text-4xl leading-tight text-sky-50 md:text-6xl"
                        style={{ fontFamily: "Cinzel, 'Times New Roman', serif", fontWeight: 700 }}
                    >
                      {t("heroDark.intro")}
                    </h2>
                    <p className="mt-4 max-w-md text-lg leading-relaxed text-slate-300">
                    {t("heroDark.script")}</p>
                    <div className="mt-8 flex flex-wrap gap-4">
                        <a
                            href="https://github.com/moh004"
                            className="rounded-sm border border-sky-200/60 bg-sky-100 px-6 py-3 font-semibold text-[#0c1a2b] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200"
                        >
                          {t("heroDark.github-btn")}
                        </a>
                        <a
                            href="mailto:you@example.com"
                            className="rounded-sm bg-[#0B1320] border border-amber-400/70 px-6 py-3 font-semibold text-amber-200 transition hover:bg-amber-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
                        >
                            {t("heroDark.email-btn")}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
