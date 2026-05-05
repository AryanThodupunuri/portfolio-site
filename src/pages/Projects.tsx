import { Link } from 'react-router-dom';

const projects = [
  {
    id: 'coursecompass',
    title: 'CourseCompass',
    description: 'Full-stack distributed system and Manifest V3 Chrome Extension built with Java, Spring Boot, React, and PostgreSQL. Engineered a high-concurrency API for 25,000+ UVA students.',
    tags: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/AryanThodupunuri/coursecompass',
  },
  {
    id: 'aws-landing-zone',
    title: 'AWS Landing Zone',
    description: 'Modular AWS Landing Zone built with Terraform. VPC/IAM/CloudTrail guardrails, automated CI security scans, and Terratest plan-only validation.',
    tags: ['Terraform', 'AWS', 'HCL', 'CI/CD'],
    github: 'https://github.com/AryanThodupunuri/aws-landing-zone',
  },
  {
    id: 'extreme-weather-classification',
    title: 'Extreme Weather Classification',
    description: 'HPC-accelerated computer vision pipeline with PyTorch and OpenCV. Compares EfficientNetV2/MobileNetV2 for weather event detection, with Grad-CAM for Explainable AI.',
    tags: ['PyTorch', 'OpenCV', 'HPC', 'Python'],
    github: 'https://github.com/AryanThodupunuri/extreme-weather-classification',
  },
  {
    id: 'food-ordering-system',
    title: 'Food Ordering System',
    description: 'Backend microservices architecture with Java, Spring Boot, Kafka, Docker, and PostgreSQL. Implements the Outbox Pattern for reliable event-driven messaging.',
    tags: ['Java', 'Kafka', 'Spring Boot', 'Docker'],
    github: 'https://github.com/AryanThodupunuri/food-ordering-system',
  },
  {
    id: 'course-picker',
    title: 'Course Picker',
    description: 'React web app deployed on AWS S3/CloudFront that helps UVA students optimize schedules. Features conflict-checking algorithms and Python/Pandas data pipelines.',
    tags: ['React', 'Python', 'AWS S3', 'CloudFront'],
    github: 'https://github.com/AryanThodupunuri/course-picker',
  },
  {
    id: 'slacklite',
    title: 'SlackLite',
    description: 'Real-time messaging app with React, FastAPI, MongoDB, and AWS S3 for file uploads. Built for low-latency communication with WebSockets.',
    tags: ['React', 'FastAPI', 'MongoDB', 'WebSockets'],
    github: 'https://github.com/AryanThodupunuri/SlackLite',
  },
];

const Projects = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="mb-14">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">Work</h2>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Projects
          </h1>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl">
            A selection of things I've built — from distributed systems to ML pipelines.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${project.id}`}
              className="group block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Projects;