import githubRepo from "../data/githubRepo.json";
import { useTranslation } from "react-i18next";

function Projects() {
    const {t} = useTranslation()
    return (
        <section id="projects" className="py-16">

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold"> {t("project.header")}</h2>
                    <p className="text-sm text-[var(--text-secondary)] mt-2">
                        {t("project.note")}
                    </p>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {githubRepo.map(repo => (
                    <Card
                        key={repo.name}
                        name={repo.name}
                        tools={repo.tools}
                        repoLink={repo.repoLink}
                        site={repo.site}
                        script={repo.about}
                    />
                ))}
                
                
            </div>
                <a href="https://github.com/moh004?tab=repositories"
                   target="_blank"
                   rel="noreferrer"
                   className="text-sm text-indigo-500 hover:text-indigo-300 flex justify-center p-6">
                    {t("project.viewAll")}
                </a>
        </section>
    );
}

function Card({ name, tools, repoLink, site, script }) {
    return (
        <div className="flex flex-col border-2 border-[var(--border)] 
                        rounded-xl p-3.5 bg-[var(--Surface)] 
                        hover:border-indigo-500/60 transition-all duration-300
                        hover:-translate-y-1">

            {/* Project Image */}
            <div className="aspect-[16/9] overflow-hidden rounded-lg 
                            border-2 border-[var(--border)] mb-4">
                <img
                    src={`/project/${name}.png`}
                    alt={`${name} preview`}
                    className="w-full h-full object-cover 
                               hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Project Info */}
            <h3 className="font-semibold text-lg mb-2">
                {name}
            </h3>

            <p className="text-sm text-gray-400
                          leading-relaxed line-clamp-3 mb-4">
                {script.length > 100? ( script.slice(0,100) + "...") : script }
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-5">
                {tools.map((tool, index) => (
                    <span
                        key={index}
                        className="text-xs px-3 py-1.5 rounded-full 
                                   bg-blue-950/70 text-blue-200"
                    >
                        {tool}
                    </span>
                ))}
            </div>

            {/* Links */}
            <div className="flex items-center gap-4 mt-auto pt-3">
                <a
                    href={repoLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-[var(--text-secondary)] 
                               hover:text-green-700   transition-colors"
                >
                    <span className="mr-2">◉</span>
                    View Code ↗
                </a>

                {site && (
                    <a href={site}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-indigo-400 hover:text-red-300 transition-colors">
                        Live Demo ↗
                    </a>
                )}
            </div>

        </div>
    );
}

export default Projects;
