type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  status: string;
  badgeStyle?: string;
};

const experiences: ExperienceItem[] = [
  {
    company: 'Amazon Web Services',
    role: 'Solutions Architect Intern, Forward Deployed Engineering',
    period: 'May 2026 – Aug 2026',
    location: 'Arlington, VA',
    status: 'Internship',
    badgeStyle: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    bullets: [
      'Architected a multi-tenant context service for AI coding agents, exposing REST APIs over source code, dependency graphs, runtime state, and team conventions, serving context across 250K+ file repositories at sub-150ms p95 retrieval latency.',
      'Built event-driven ingestion microservices across Lambda, S3, SQS, DynamoDB, and OpenSearch, processing 1M+ code changes with incremental indexing and content-addressed caching to cut redundant computation 88% and indexing costs 63%.',
      'Developed an offline evaluation and observability framework across 25K+ coding tasks, benchmarking retrieval strategies, detecting context regressions with 99.4% precision, and integrating automated testing into the CI/CD release gate.',
    ],
  },
  {
    company: 'Booz Allen Hamilton',
    role: 'Software Engineering Intern',
    period: 'May 2025 – Aug 2025',
    location: 'McLean, VA',
    status: 'Internship',
    bullets: [
      'Rebuilt a supplier intelligence REST search service in Flask and PostgreSQL using vector embeddings, query planning, and precomputed indexes, reducing p99 latency from 4.6s to 140ms across 12M+ searchable document fragments.',
      'Designed a fault-tolerant contract ingestion engine in Python/C++ with idempotent workers, checkpointing, and dead-letter recovery, processing 500K+ PDFs weekly with 99.99% completion while eliminating duplicate writes across distributed jobs.',
      'Built a distributed indexing service with PostgreSQL data modeling and semantic embeddings, transforming contract data into normalized supplier entities while sustaining 25K+ records per minute and reducing reprocessing 84%.',
    ],
  },
  {
    company: 'Red Light Management',
    role: 'Software Engineering Intern',
    period: 'Sept 2024 – May 2025',
    location: 'Charlottesville, VA',
    status: 'Internship',
    bullets: [
      'Built an event-driven Python ingestion platform processing 5M+ daily records from Spotify, Apple Music, and Ticketmaster APIs, adding Kafka-style partitioning, idempotent retries, and deduplication to sustain 20K+ events per second during peak traffic.',
      'Engineered Redis-backed caching and autoscaled AWS microservices with EC2, Docker, and RDS, cutting p99 API latency 68%.',
    ],
  },
  {
    company: 'UVA Link Lab',
    role: 'Machine Learning Engineering Intern',
    period: 'Apr 2024 – Aug 2024',
    location: 'Charlottesville, VA',
    status: 'Internship',
    bullets: [
      'Built a distributed geospatial forecasting pipeline in Python and TensorFlow processing 10M+ sensor observations, partitioning workloads across parallel workers and caching features to cut training time 94% and increase experiment throughput 18×.',
      'Designed a fault-tolerant model serving API on AWS EC2 with Docker, Redis, REST APIs, and CI/CD sustaining 2K+ prediction requests per second at sub-100ms p95 latency with automated health checks and zero-downtime rollouts.',
    ],
  },
  {
    company: 'Palantir',
    role: 'Launch Program Participant',
    period: 'March 2024',
    location: 'Remote',
    status: 'Launch Program',
    badgeStyle: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    bullets: [
      'Completed Palantir Launch Program in March 2024, focused on rapid product development, enterprise data workflows, and collaborative problem solving.',
      'Worked through simulations of data-driven decision making and prototyped scalable visualizations for complex operational use cases.',
    ],
  },
];

const education = {
  institution: 'University of Virginia',
  degree: 'B.A. Computer Science · Accelerated M.S. Data Science',
  period: 'Aug 2023 – May 2027',
  location: 'Charlottesville, VA',
  gpa: '3.80 / 4.00',
  bullets: [
    'Pursuing an accelerated dual-degree program with coursework spanning distributed systems, cloud infrastructure, machine learning systems, and applied data science.',
    'Focus areas include systems programming, large-scale data processing, probabilistic modeling, and the intersection of ML infrastructure with production ML systems.',
    'Active in project work connecting academic machine learning theory to real-world engineering patterns from internships in consulting, media-tech, and research.',
  ],
};

const Experience = () => {
  return (
    <main className="flex-1 bg-white dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400 mb-8">Experience</p>

        <div className="relative pl-10">
          <div className="absolute left-2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800"></div>

          {experiences.map((exp, index) => (
            <div key={index} className="relative mb-10">
              <div className="absolute -left-4 top-2 h-3 w-3 rounded-full bg-indigo-600 ring-4 ring-white dark:ring-slate-950"></div>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xl font-semibold text-slate-900 dark:text-white">{exp.company}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{exp.role}</p>
                </div>
                <div className="flex flex-col items-start sm:items-end text-sm text-slate-500 dark:text-slate-400 gap-1">
                  <span>{exp.period}</span>
                  <span>{exp.location}</span>
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${exp.badgeStyle ?? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
                    {exp.status}
                  </span>
                </div>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                {exp.bullets.map((bullet, idx) => (
                  <li key={idx} className="pl-4 border-l border-slate-200 dark:border-slate-800">{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-px bg-slate-200 dark:bg-slate-800 my-16"></div>

        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Education</p>
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xl font-semibold text-slate-900 dark:text-white">{education.institution}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{education.degree}</p>
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 text-left sm:text-right">
                <p>{education.period}</p>
                <p className="mt-2 font-semibold text-slate-900 dark:text-white">GPA: {education.gpa}</p>
              </div>
            </div>
            <p className="mt-5 text-sm text-slate-600 dark:text-slate-300">{education.bullets[0]}</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {education.bullets.slice(1).map((item, idx) => (
                <li key={idx} className="pl-4 border-l border-slate-200 dark:border-slate-800">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Experience;
