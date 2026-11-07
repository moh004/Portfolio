import {
    siReact, siJavascript, siHtml5, siAxios, 
    siDotenv, siExpress, siFigma, siGit, siGithub, siMongodb,
    siMongoose, siNodedotjs, siPostman, siPython, siScikitlearn,
    siSass, siSqlite, siTailwindcss, siVuedotjs, siPuppeteer
} from 'simple-icons';

const skillCategories = [
    {
        title: "Frontend Development",
        tools: [
            siHtml5,
            siJavascript,
            siReact,
            siVuedotjs,
            siTailwindcss,
            siSass,
            siFigma
        ]
    },
    {
        title: "Backend Development",
        tools: [
            siNodedotjs,
            siExpress,
            siAxios,
            siDotenv
        ]
    },
    {
        title: "Database & ORM",
        tools: [
            siMongodb,
            siMongoose,
            siSqlite
        ]
    },
    {
        title: "Machine Learning & Data Science",
        tools: [
            siPython,
            siScikitlearn
        ]
    },
    {
        title: "Development & Testing Tools",
        tools: [
            siGit,
            siGithub,
            siPostman,
            siPuppeteer
        ]
    }
];

function MySkills() {
    return (
        <div className="space-y-10 w-3/4 mx-auto">
            {skillCategories.map(category => (
                <section key={category.title}>
                    <h2 className="text-xl font-semibold mb-4">
                        {category.title}
                    </h2>

                    <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                        {category.tools.map(tool => (
                            <Skill
                                key={tool.slug}
                                name={tool.title}
                                id={tool.slug}
                                path={tool.path}
                                hex={tool.hex}
                            />
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    );
}

function Skill({ name, id, path, hex }) {
    return (
        <li key={id} className="flex flex-col justify-center items-center gap-2 bg-indigo-900/40 hover:bg-indigo-900/70 border border-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300 w-full py-4 rounded-2xl">
            <svg className="w-10 h-10" viewBox="0 0 24 24">
                <path d={path} fill={`#${hex}`} />
            </svg>

            <h3 className="text-sm text-center">{name}</h3>
        </li>
    );
}

export default MySkills;