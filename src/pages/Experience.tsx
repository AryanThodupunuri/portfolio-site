type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  status: string;
  salary?: string;
};

const experiences: ExperienceItem[] = [
  {
    company: 'Amazon Web Services (AWS)',
    role: 'Software Development Engineer Intern',
    period: 'Summer 2026',
    location: 'Arlington, VA',
    bullets: [
      'Selected for Amazon’s competitive SDE internship program supporting Generative AI and Data Acceleration initiatives within AWS.',
    ],
    status: 'Incoming',
  },
  {
    company: 'Booz Allen Hamilton',
    role: 'Software Engineering Intern',
    period: 'May 2025 – Aug 2025',
    location: 'McLean, VA',
    bullets: [
      'Architected a cloud-native supplier intelligence platform using React, Flask, AWS, and PostgreSQL to centralize 10K+ vendor records.',
      'Developed backend REST APIs and NLP pipelines with spaCy to parse PDF contracts, extract supplier metadata, and create searchable records.',
      'Engineered a production RAG pipeline with vector embeddings and semantic search, reducing document review time to ~5 seconds with sub-second p99 latency.',
      'Designed a PyTest regression harness with synthetic fixtures to validate contract parsing and improve extraction accuracy to 90%+, cutting QA overhead by 30%.',
    ],
    status: 'Internship',
  },
  {
    company: 'Red Light Management',
    role: 'Software Engineering Intern',
    period: 'Sept 2024 – May 2025',
    location: 'Charlottesville, VA',
    bullets: [
      'Built high-throughput ingestion pipelines processing 50K+ daily events from Spotify and Ticketmaster REST APIs for artist management analytics.',
      'Optimized backend performance by 35% through custom Redis caching and load-balancing layers on AWS.',
    ],
    status: 'Internship',
  },
  {
    company: 'UVA Link Lab',
    role: 'Machine Learning Engineering Intern',
    period: 'April 2024 – Aug 2024',
    location: 'Charlottesville, VA',
    bullets: [
      'Implemented an RNN layer for flood forecasting in TensorFlow, achieving 95% faster runtime and 15% higher accuracy than traditional physics models.',
      'Containerized forecasting models with Docker and exposed secure REST APIs to 100+ users through Plotly Dash dashboards.',
    ],
    status: 'Internship',
  },
];

const education = {
  institution: 'University of Virginia',
  degree: 'B.A. in Computer Science, Accelerated M.S. in Data Science',
  gpa: '3.80 / 4.00',
  period: 'Aug. 2023 – May 2027',
  location: 'Charlottesville, VA',
};

const Experience = () => {
	return (
    <main className="flex-1 bg-white dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">Experience</h1>
          <p className="text-gray-500 dark:text-gray-400">A resume-style breakdown of my most recent roles and education.</p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <section key={index} className="card">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{exp.period} · {exp.location}</p>
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-2">{exp.company}</h2>
                  <p className="mt-2 text-lg font-medium text-indigo-600 dark:text-indigo-400">{exp.role}</p>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 text-right">
                  <p>{exp.status}</p>
                  {exp.salary && <p className="mt-2 font-semibold text-gray-900 dark:text-white">{exp.salary}</p>}
                </div>
              </div>
              <ul className="space-y-3 list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

  <section className="mt-16 card">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Charlottesville, VA</p>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-2">University of Virginia</h2>
              <p className="mt-2 text-lg font-medium text-indigo-600 dark:text-indigo-400">B.A. in Computer Science, Accelerated M.S. in Data Science</p>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 text-right">
              <p>{education.period}</p>
              <p className="mt-2 font-semibold text-gray-900 dark:text-white">GPA: {education.gpa}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">Pursuing an accelerated dual degree with a focus on distributed systems, cloud infrastructure, and data science.</p>
        </section>
      </div>
    </main>
  );
};

export default Experience;
