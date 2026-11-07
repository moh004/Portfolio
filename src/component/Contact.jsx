
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

function Contact() {
    const form = useRef();

    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const sendEmail = async (e) => {
        e.preventDefault();

        setLoading(true);
        setStatus("");

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                form.current,
                {
                    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
                }
            );

            setStatus("Message sent successfully!");
            form.current.reset();

        } catch (error) {
            console.error(error);
            setStatus("Something went wrong. Try again.");

        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            id="contact"
            className="py-24 px-6"
        >
            <div className="max-w-6xl mx-auto">

                {/* Heading */}
                <div className="mb-14">
                    <span className="text-sm uppercase tracking-[0.3em] text-[var(--Accent)]">
                        Contact
                    </span>

                    <h2 className="text-4xl md:text-5xl font-bold mt-3">
                        Let's Get In Touch.
                    </h2>

                    <p className="mt-4 text-[var(--Muted)] max-w-xl">
                        Have a project in mind, a question, or just want
                        to say hello? My inbox is always open.
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Left Side */}
                    <div className="flex flex-col justify-between gap-10">

                        <div>
                            <h3 className="text-2xl font-semibold mb-4">
                                Let's build something great.
                            </h3>

                            <p className="text-[var(--Muted)] leading-relaxed max-w-md">
                                I'm always interested in new opportunities,
                                collaborations, and interesting projects.
                                Feel free to reach out.
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className="space-y-4">
                            <a
                                href="https://github.com/moh004"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-between p-4 rounded-xl border border-[var(--Border)] hover:border-[var(--Accent)] hover:bg-[var(--Surface)] transition group"
                            >
                                <span>GitHub</span>
                                <span className="text-[var(--Muted)] group-hover:text-[var(--Accent)] transition">
                                    ↗
                                </span>
                            </a>

                            <a
                                href="https://www.linkedin.com/in/mohsen-salehi-33070234a/"
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center justify-between p-4 rounded-xl border border-[var(--Border)] hover:border-[var(--Accent)] hover:bg-[var(--Surface)] transition group"
                            >
                                <span>LinkedIn</span>
                                <span className="text-[var(--Muted)] group-hover:text-[var(--Accent)] transition">
                                    ↗
                                </span>
                            </a>

                            <a
                                href="mailto:godofservertheimmortal@email.com"
                                className="flex items-center justify-between p-4 rounded-xl border border-[var(--Border)] hover:border-[var(--Accent)] hover:bg-[var(--Surface)] transition group"
                            >
                                <span>Email</span>
                                <span className="text-[var(--Muted)] group-hover:text-[var(--Accent)] transition">
                                    ↗
                                </span>
                            </a>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <form
                        ref={form}
                        onSubmit={sendEmail}
                        className="bg-[var(--Surface)] border border-[var(--Border)] rounded-2xl p-6 md:p-8 space-y-6"
                    >

                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium mb-2"
                            >
                                Your Name
                            </label>

                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                required
                                className="w-full bg-[var(--Background)] border border-[var(--Border)] rounded-lg px-4 py-3 outline-none focus:border-[var(--Accent)] transition placeholder:text-[var(--Muted)]"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium mb-2"
                            >
                                Email Address
                            </label>

                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="john@example.com"
                                required
                                className="w-full bg-[var(--Background)] border border-[var(--Border)] rounded-lg px-4 py-3 outline-none focus:border-[var(--Accent)] transition placeholder:text-[var(--Muted)]"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="block text-sm font-medium mb-2"
                            >
                                Your Message
                            </label>

                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                placeholder="Tell me about your project..."
                                required
                                className="w-full bg-[var(--Background)] border border-[var(--Border)] rounded-lg px-4 py-3 outline-none focus:border-[var(--Accent)] transition resize-none placeholder:text-[var(--Muted)]"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[var(--Accent)] text-white font-semibold py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Sending..." : "Send Message →"}
                        </button>

                        {status && (
                            <p
                                role="status"
                                aria-live="polite"
                                className={`text-sm text-center ${
                                    status.includes("successfully")
                                        ? "text-green-500"
                                        : "text-red-500"
                                }`}
                            >
                                {status}
                            </p>
                        )}

                    </form>
                </div>
            </div>
        </section>
    );
}

export default Contact;
