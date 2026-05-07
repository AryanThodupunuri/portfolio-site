import { Link } from 'react-router-dom';
import AnimatedText from '../components/AnimatedText';
import profilePicture from '../assets/IMG_4437.jpg';
const uvaGameImage = new URL('../assets/IMG_3604.jpg', import.meta.url).href;
const boozAllenImage = new URL('../assets/IMG_5164.PNG', import.meta.url).href;

const skills = ['Java', 'Spring Boot', 'Python', 'AWS', 'Terraform', 'Docker', 'Apache Kafka', 'PostgreSQL', 'PyTorch', 'React', 'Git'];

const Landing = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero */}
        <section className="max-w-5xl mx-auto px-6 pt-24 pb-20 bg-gradient-to-br from-sky-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-cyan-950 rounded-[2rem] shadow-[0_40px_120px_-40px_rgba(14,165,233,0.35)]">
        <div className="flex flex-col md:flex-row md:items-start md:gap-14">
          {/* Profile picture */}
          <div className="flex-shrink-0 flex justify-center md:justify-start mb-8 md:mb-0">
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 shadow-lg">
              <img
                src={profilePicture}
                alt="Aryan Thodupunuri"
                className="w-full h-full object-cover"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                Open to opportunities
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
              <AnimatedText
                texts={["Aryan Thodupunuri", "Software Engineer", "Builder · Problem Solver", "CS @ UVA"]}
                type="typewriter"
                interval={2200}
                className="block"
              />
            </h1>
            <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mb-8 leading-relaxed">
              <AnimatedText
                texts={["CS student at UVA · Incoming SDE Intern at AWS.", "I like building things that actually work at scale.", "Backends, infra, the occasional ML experiment."]}
                type="fade"
                interval={2600}
                className="block"
              />
            </p>
            <div className="flex flex-wrap gap-3 mb-14">
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Download Resume
              </a>
              <a
                href="https://github.com/AryanThodupunuri"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/aryanthodupunuri"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                LinkedIn
              </a>
            </div>
          </div>{/* end flex-1 */}
        </div>{/* end flex row */}

        {/* Photo gallery */}
          <div className="grid gap-4 md:grid-cols-2 mt-10 mb-14">
          <div className="rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-900">
            <img src={uvaGameImage} alt="UVA game with friends" className="w-full h-80 object-cover" />
          </div>
          <div className="rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-900">
            <img src={boozAllenImage} alt="Booz Allen office with coworkers" className="w-full h-80 object-cover" />
          </div>
        </div>

        {/* About */}
        <div className="border-t border-gray-100 dark:border-gray-800 pt-14 mb-14">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6">About</h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
            <p>
              I'm a CS student at UVA headed to AWS this summer. Most of my time goes toward distributed systems and cloud infra - I find the problem of "how do you make this not fall over at 10x load" genuinely interesting, not just a resume line.
            </p>
            <p>
              Some things I've built: <span className="text-gray-900 dark:text-gray-200 font-medium">CourseCompass</span>, a Chrome Extension that ~25,000 UVA students use during registration; a <span className="text-gray-900 dark:text-gray-200 font-medium">Terraform AWS Landing Zone</span> with automated security guardrails; and a <span className="text-gray-900 dark:text-gray-200 font-medium">weather classification pipeline</span> on Rivanna HPC using PyTorch + Grad-CAM for explainability. I also break things in production and learn from it.
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="border-t border-gray-100 dark:border-gray-800 pt-14 mb-14">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="border-t border-gray-100 dark:border-gray-800 pt-14">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-6">Featured Work</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold hover:bg-gray-700 dark:hover:bg-gray-100 transition-all duration-200"
            >
              View All Projects
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Landing;