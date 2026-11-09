import ThemeToggle from "./ThemeToggle"
import LanguageSwitcher from "./LngSwitcher"

function Navbar({isDark,setIsDark}) {
    return (
        <nav className="
            sticky top-0 z-50
            w-full
            bg-[var(--bgColor)]/85
            backdrop-blur-xl
            border-b border-[var(--Surface)]
            text-[var(--Text)]
        ">
            <div className="
                max-w-7xl mx-auto
                px-6 md:px-10
                h-20
                flex items-center justify-between
            ">

                {/* Logo */}
                <a href="#home" className="group flex items-center gap-2">
                    <span className="text-2xl font-bold tracking-tight">
                        Mohsen<span className="text-[var(--Accent)]">.</span>
                    </span>
                </a>

                {/* Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <a
                        href="#projects"
                        className="text-sm font-medium opacity-70 hover:opacity-100 hover:text-[var(--Accent)] transition-all duration-300"
                    >
                        Projects
                    </a>

                    <a
                        href="#about"
                        className="text-sm font-medium opacity-70 hover:opacity-100 hover:text-[var(--Accent)] transition-all duration-300"
                    >
                        About
                    </a>

                    <a
                        href="#contact"
                        className="text-sm font-medium opacity-70 hover:opacity-100 hover:text-[var(--Accent)] transition-all duration-300"
                    >
                        Contact
                    </a>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4">

                    <LanguageSwitcher/>

                    <ThemeToggle setIsDark={setIsDark} isDark={isDark} />

                </div>
            </div>
        </nav>
    )
}

export default Navbar