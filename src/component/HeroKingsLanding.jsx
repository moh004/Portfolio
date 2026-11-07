import { useMemo } from "react"

// Uses the same Cinzel font as the dark hero (see the link comment in Hero.jsx)

// ---------- helpers ----------
function rng(seed) {
    return () => {
        seed |= 0
        seed = (seed + 0x6d2b79f5) | 0
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

const ROOFS = ["#a5532f", "#8c3f2b", "#b8703f", "#7c3a2a", "#c0643a"]

// dense terracotta rooftops, generated once so the layout never changes
const HOUSES = (() => {
    const r = rng(7)
    const out = []
    for (let row = 0; row < 7; row++) {
        const y = 398 + row * 20
        let x = 130 + row * 12
        const end = 900 + row * 18
        while (x < end) {
            const w = 16 + r() * 10
            out.push({
                x,
                y: y + r() * 6,
                w,
                h: 11 + r() * 6,
                c: ROOFS[Math.floor(r() * ROOFS.length)],
            })
            x += w + 3 + r() * 5
        }
    }
    return out
})()

const TOWERS = [
    { x: 545, t: 236, w: 26 },
    { x: 586, t: 190, w: 34 },
    { x: 636, t: 218, w: 30 },
    { x: 684, t: 172, w: 40 },
    { x: 738, t: 214, w: 30 },
    { x: 782, t: 240, w: 26 },
    { x: 818, t: 262, w: 22 },
]

const WALL = "M90 440 Q110 520 300 535 Q500 550 700 545 Q900 540 1060 500"

// ---------- small pieces ----------
function Petals({ count = 30 }) {
    const petals = useMemo(
        () =>
            Array.from({ length: count }, (_, i) => ({
                id: i,
                left: Math.random() * 100,
                size: 6 + Math.random() * 7,
                dur: 9 + Math.random() * 9,
                delay: -Math.random() * 16,
                drift: -80 + Math.random() * 160,
                hue: Math.random() > 0.5 ? "#c8323c" : "#e9b44c",
            })),
        [count]
    )

    return (
        <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
            {petals.map((p) => (
                <span
                    key={p.id}
                    className="petal absolute top-0"
                    style={{
                        left: `${p.left}%`,
                        width: p.size,
                        height: p.size * 0.65,
                        background: p.hue,
                        borderRadius: "80% 0 80% 0",
                        opacity: 0.8,
                        animationDuration: `${p.dur}s`,
                        animationDelay: `${p.delay}s`,
                        "--drift": `${p.drift}px`,
                    }}
                />
            ))}
        </div>
    )
}

function Banner({ x, y }) {
    return (
        <g className="banner" style={{ transformOrigin: `${x}px ${y + 44}px` }}>
            <rect x={x} y={y} width="3" height="44" fill="#3a1a14" />
            <polygon points={`${x + 3},${y + 1} ${x + 32},${y + 8} ${x + 3},${y + 20}`} fill="#b3202b" />
            <polygon points={`${x + 3},${y + 20} ${x + 24},${y + 14} ${x + 3},${y + 27}`} fill="#e9b44c" />
        </g>
    )
}

function Ship({ x, y, s = 1 }) {
    return (
        <g transform={`translate(${x} ${y}) scale(${s})`}>
            <g className="ship">
                <path d="M-16 0 H16 L11 8 H-11Z" fill="#5a3a22" />
                <rect x="-1" y="-32" width="2" height="32" fill="#3a2418" />
                <polygon points="2,-30 17,-6 2,-6" fill="#f6ebcf" />
                <polygon points="-2,-24 -13,-6 -2,-6" fill="#e9d7ab" />
            </g>
        </g>
    )
}

// ---------- the scene ----------
function City() {
    const ROAD_IN = "M520 540 Q535 480 600 440 Q650 555 950 432"
    const ROAD_out = "M360 360 Q140 480 600 440 Q650 405 690 322"
    return (
        <svg
            className="absolute bottom-0 left-0 z-10 aspect-[1440/600] max-h-[68vh] min-h-[300px] w-full"
            viewBox="0 0 1440 600"
            preserveAspectRatio="xMidYMax slice"
            aria-hidden="true"
        >
            <defs>
                <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#b3bf7a" />
                    <stop offset="1" stopColor="#6f8a4a" />
                </linearGradient>
                <linearGradient id="bay" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#b4d8e2" />
                    <stop offset="1" stopColor="#4f8fa8" />
                </linearGradient>
                <linearGradient id="keep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#cf4a33" />
                    <stop offset="1" stopColor="#7a2020" />
                </linearGradient>
                <linearGradient id="hill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#b8945f" />
                    <stop offset="1" stopColor="#8a6a42" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="7" />
                </filter>
            </defs>

            {/* hazy far hills */}
            <path fill="#cdcf9e" opacity="0.7" d="M0 300 Q180 250 380 290 T640 282 V330 H0Z" />
            <path fill="#cdcf9e" opacity="0.7" d="M900 292 Q1100 236 1300 272 T1440 262 V330 H900Z" />

            {/* countryside */}
            <rect x="0" y="296" width="1440" height="304" fill="url(#grass)" />

            {/* Blackwater Bay */}
            <path
                fill="url(#bay)"
                d="M860 300 Q1000 270 1160 285 Q1300 270 1440 262 V520 Q1330 470 1230 500 Q1110 540 1000 470 Q920 410 860 300Z"
            />
            <g stroke="#ffffff" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round">
                <path d="M1210 300 h70" />
                <path d="M1240 318 h110" />
                <path d="M1190 336 h60" />
                <path d="M1290 480 h80" />
                <path d="M1170 510 h60" />
            </g>

            {/* shore under Rhaenys's Hill */}
            <path fill="#a3ad70" d="M960 424 Q1100 336 1310 384 V430 Q1200 470 1050 444Z" />

            {/* the three hills */}
            <path fill="url(#hill)" d="M420 420 Q520 250 700 250 Q880 252 990 420Z" />
            <path fill="#9a9660" d="M130 440 Q210 340 330 345 Q430 350 470 440Z" />
            <path fill="#9fa066" d="M1010 424 Q1080 332 1190 337 Q1260 347 1290 424Z" />
            <g stroke="#6e5538" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round">
                <path d="M470 380 L520 330" />
                <path d="M560 400 L600 340" />
                <path d="M830 340 L880 400" />
                <path d="M910 380 L940 412" />
            </g>

            {/* Great Sept of Baelor, teal dome */}
            <g stroke="#b3a487" strokeWidth="2">
                <rect x="240" y="306" width="110" height="44" fill="#d5c7ad" />
                <path d="M265 306 A30 30 0 0 1 325 306Z" fill="#4f9a9a" />
                <rect x="228" y="276" width="14" height="74" fill="#cfc1a6" />
                <rect x="348" y="276" width="14" height="74" fill="#cfc1a6" />
            </g>
            <polygon points="226,276 235,254 244,276" fill="#4f9a9a" />
            <polygon points="346,276 355,254 364,276" fill="#4f9a9a" />

            {/* Dragonpit, broken dome */}
            <ellipse cx="1150" cy="342" rx="64" ry="14" fill="#5d5953" />
            <path fill="#8a857c" d="M1088 340 Q1088 292 1134 288 L1150 302 L1166 286 Q1212 294 1212 340Z" />
            <polygon points="1134,288 1150,302 1166,286 1160,320 1140,322" fill="#4b4741" />

            {/* the Red Keep */}
            <rect x="560" y="262" width="250" height="48" fill="url(#keep)" />
            <path d="M560 258 H810" stroke="#a63426" strokeWidth="8" strokeDasharray="10 8" />
            {TOWERS.map((t) => (
                <g key={t.x}>
                    <rect x={t.x} y={t.t} width={t.w} height={310 - t.t} fill="url(#keep)" />
                    <rect x={t.x + t.w / 2 - 2} y={t.t + 14} width="4" height="12" fill="#2a1416" />
                    <polygon
                        points={`${t.x - 4},${t.t} ${t.x + t.w / 2},${t.t - t.w} ${t.x + t.w + 4},${t.t}`}
                        fill="#2e2224"
                    />
                </g>
            ))}
            <Banner x={703} y={88} />
            <Banner x={602} y={112} />

            {/* rooftops */}
            {HOUSES.map((h, i) => (
                <polygon
                    key={i}
                    points={`${h.x},${h.y + h.h} ${h.x + h.w / 2},${h.y} ${h.x + h.w},${h.y + h.h}`}
                    fill={h.c}
                    stroke="#4a2218"
                    strokeOpacity="0.35"
                />
            ))}

            {/* harbour: docks and ships */}
            <g stroke="#6b4a2c" strokeWidth="5" strokeLinecap="round">
                <path d="M1010 484 h72" />
                <path d="M1022 504 h84" />
                <path d="M1044 524 h70" />
                <path d="M1060 484 v-12" />
                <path d="M1090 504 v-12" />
            </g>
            <Ship x={1180} y={470} s={1} />
            <Ship x={1290} y={440} s={0.9} />
            <Ship x={1380} y={490} s={1.1} />
            <Ship x={1240} y={350} s={0.55} />
            <Ship x={1340} y={322} s={0.45} />

            {/* city wall with merlons and towers */}
            <path d={WALL} stroke="#c9b48a" strokeWidth="26" fill="none" strokeLinecap="round" />
            <path d={WALL} transform="translate(0 -15)" stroke="#c9b48a" strokeWidth="9" strokeDasharray="12 9" fill="none" />
            <path d={WALL} transform="translate(0 9)" stroke="#8a7650" strokeOpacity="0.5" strokeWidth="3" fill="none" />
            <g fill="#bfa87c" stroke="#8a7650" strokeOpacity="0.6">
                {[[118, 492], [300, 520], [700, 530], [900, 524], [1050, 488]].map(([x, y]) => (
                    <rect key={x} x={x - 9} y={y - 18} width="18" height="38" />
                ))}
            </g>

            {/* Kingsroad, glowing into the gate and up to the Keep */}
       {/*      <path d="M360 600 Q450 580 512 552" stroke="#ffe08a" strokeOpacity="0.7" strokeWidth="30" fill="none" filter="url(#glow)" />
            <path d="M360 600 Q450 580 512 552" stroke="#f7d983" strokeWidth="16" fill="none" strokeLinecap="round" />
            <path d="M520 540 Q535 480 600 440 Q650 405 690 322" stroke="#ffe08a" strokeOpacity="0.7" strokeWidth="14" fill="none" filter="url(#glow)" />
            <path d="M520 540 Q535 480 600 440 Q650 405 690 322" stroke="#fff1c2" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path className="road" d="M520 540 Q535 480 600 440 Q650 405 690 322" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="2.5" strokeDasharray="4 18" fill="none" />
 */}        
            <path d={ROAD_out} stroke="#ffe08a" strokeOpacity="0.7" strokeWidth="14" fill="none" filter="url(#glow)" />
            <path d={ROAD_out} stroke="#fff1c2" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path className="road" d={ROAD_out} stroke="#fff" strokeOpacity="0.85" strokeWidth="6.5" strokeDasharray="4 18" fill="none" />
            
            {/* another road */}

            <path d={ROAD_IN} stroke="#ffe08a" strokeOpacity="0.7" strokeWidth="14" fill="none" filter="url(#glow)" />
            <path d={ROAD_IN} stroke="#fff1c2" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path className="road" d={ROAD_IN} stroke="#fff" strokeOpacity="0.85" strokeWidth="2.5" strokeDasharray="4 18" fill="none" />
                        {/* the gate you are walking into */}
            <rect x="488" y="500" width="16" height="48" fill="#bfa87c" />
            <rect x="536" y="500" width="16" height="48" fill="#bfa87c" />
            <rect x="500" y="514" width="40" height="34" fill="#cdb78e" />
            <path d="M510 548 V532 Q520 520 530 532 V548Z" fill="#2a1a14" />
            <polygon points="484,500 496,482 508,500" fill="#7a2020" />
            <polygon points="532,500 544,482 556,500" fill="#7a2020" />

            {/* foreground trees */}
            <g fill="#4d6b3a">
                <circle cx="60" cy="566" r="30" />
                <circle cx="110" cy="586" r="24" />
                <circle cx="1390" cy="572" r="30" />
                <circle cx="1330" cy="592" r="22" />
            </g>
        </svg>
    )
}

// ---------- hero ----------
function HeroKingsLanding() {
    return (
        <section className="relative isolate min-h-screen overflow-hidden bg-gradient-to-b from-[#7fb6d6] via-[#f2d9a6] to-[#f7b777] text-[#3a0f14]">
            <style>{`
                @keyframes fall {
                    to { transform: translate3d(var(--drift), 105vh, 0) rotate(540deg); }
                }
                @keyframes wave {
                    0%, 100% { transform: skewY(0deg); }
                    50% { transform: skewY(-6deg); }
                }
                @keyframes glow {
                    0%, 100% { opacity: 0.85; }
                    50% { opacity: 1; }
                }
                @keyframes bob {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-3px); }
                }
                @keyframes flow {
                    to { stroke-dashoffset: -22; }
                }
                @keyframes rise {
                    from { opacity: 0; transform: translateY(18px); }
                    to { opacity: 1; transform: none; }
                }
                .petal { animation: fall linear infinite; }
                .banner { animation: wave 2.4s ease-in-out infinite; }
                .sun { animation: glow 5s ease-in-out infinite; }
                .ship { animation: bob 4s ease-in-out infinite; }
                .road { animation: flow 1.6s linear infinite; }
                .hero-in { animation: rise 1.1s ease-out both; }
                @media (prefers-reduced-motion: reduce) {
                    .petal, .banner, .sun, .ship, .road, .hero-in { animation: none; }
                }
            `}</style>

            {/* low sun over the bay */}
            <div
                className="sun absolute right-[10%] top-[10%] h-48 w-48 rounded-full"
                aria-hidden="true"
                style={{
                    background:
                        "radial-gradient(circle, #fffbe6 0%, #ffe9a8 35%, rgba(255,214,120,0) 70%)",
                }}
            />

            <City />
            <Petals />

            {/* soft gate vignette */}
            <div
                className="pointer-events-none absolute inset-0 z-40"
                aria-hidden="true"
                style={{
                    background:
                        "radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(70,28,20,0.4) 100%)",
                }}
            />

            {/* map-style border */}
            <div
                className="pointer-events-none absolute inset-3 z-[45] border-2 border-[#7b4b22]/50"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute inset-5 z-[45] border border-[#7b4b22]/30"
                aria-hidden="true"
            />

            <div className="relative z-50 mx-auto grid min-h-screen max-w-6xl items-start gap-10 px-8 pb-[340px] pt-24 md:grid-cols-2 md:items-start md:pb-[32vh] md:pt-28">
                <div className="hero-in">
                    <h2
                        className="text-4xl leading-tight text-[#4a0d14] md:text-6xl"
                        style={{ fontFamily: "Cinzel, 'Times New Roman', serif", fontWeight: 700 }}
                    >
                        Hi, I'm Mohsen.
                    </h2>
                    <p className="mt-4 max-w-md text-lg leading-relaxed text-[#4a1c1c]">
                        A Lannister always pays his debts. I ship what I promise.
                        I turn ideas into fast, functional, and beautifully crafted websites. 
                        With clean code, considered design, smooth interactions, 
                        and an obsession with the details, I build digital experiences 
                        that do more than look good.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4">
                        <a
                            href="https://github.com/moh004"
                            className="rounded-sm border border-[#7a1620] bg-[#a3202b] px-6 py-3 font-semibold text-[#fbe7b0] transition hover:bg-[#7a1620] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7a1620]"
                        >
                            GitHub
                        </a>
                        <a
                            href="mailto:godofservertheimmortal@gmail.com"
                            className="rounded-sm border border-[#a3202b] bg-[#fff3d6]/70 px-6 py-3 font-semibold text-[#7a1620] transition hover:bg-[#fff3d6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7a1620]"
                        >
                            Send a raven
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroKingsLanding
