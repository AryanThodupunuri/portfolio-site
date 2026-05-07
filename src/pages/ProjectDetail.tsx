import { useParams, Link } from 'react-router-dom';

const projectDetails: { [key: string]: any } = {
  coursecompass: {
    title: 'CourseCompass',
    github: 'https://github.com/AryanThodupunuri/coursecompass',
    problem: 'UVA students face information asymmetry during course registration, leading to suboptimal schedules and missed opportunities.',
    solution: 'Built a full-stack distributed system with a high-concurrency Spring Boot API and Manifest V3 Chrome Extension to provide real-time course data and intelligent recommendations.',
    techStack: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'Docker', 'Chrome Extension API'],
    architecture: 'Microservices architecture with Spring Boot backend handling concurrent requests, PostgreSQL for data storage, and React-based Chrome extension for user interface.',
  },
  'aws-landing-zone': {
    title: 'AWS Landing Zone',
    github: 'https://github.com/AryanThodupunuri/aws-landing-zone',
    problem: 'Organizations need secure, compliant cloud foundations but lack standardized infrastructure as code.',
    solution: 'Created a modular Terraform-based AWS Landing Zone with automated security guardrails, CI/CD pipelines, and comprehensive testing.',
    techStack: ['Terraform', 'AWS', 'Terratest', 'CI/CD'],
    architecture: 'Infrastructure as Code using Terraform modules for VPC, IAM, CloudTrail, with automated security scans and plan-only validation via Terratest.',
  },
  'extreme-weather-classification': {
    title: 'Extreme Weather Classification',
    github: 'https://github.com/AryanThodupunuri/extreme-weather-classification',
    problem: 'Need for accurate, explainable AI models to detect catastrophic weather events from satellite imagery.',
    solution: 'Developed an HPC-accelerated computer vision pipeline comparing CNN architectures with Explainable AI techniques for model validation.',
    techStack: ['PyTorch', 'OpenCV', 'HPC', 'Grad-CAM', 'EfficientNetV2', 'MobileNetV2'],
    architecture: 'Pipeline utilizing Rivanna HPC for training, PyTorch for model development, and Grad-CAM for explainability analysis.',
  },
  'food-ordering-system': {
    title: 'Food Ordering System',
    github: 'https://github.com/AryanThodupunuri/food-ordering-system',
    problem: 'Traditional monolithic food ordering systems lack scalability and reliable event-driven communication.',
    solution: 'Implemented a microservices architecture with Domain-Driven Design, event sourcing, and the Outbox Pattern for reliable messaging.',
    techStack: ['Java', 'Spring Boot', 'Apache Kafka', 'Docker', 'PostgreSQL'],
    architecture: 'Event-driven microservices using Kafka for inter-service communication, Docker for containerization, and PostgreSQL with the Outbox Pattern for transactional messaging.',
  },
  'course-picker': {
    title: 'Course Picker',
    problem: 'UVA students struggle to optimize course schedules due to complex prerequisites and time conflicts.',
    solution: 'Built a web application with conflict-checking algorithms and data pipelines to help students plan optimal schedules.',
    techStack: ['React', 'Tailwind CSS', 'Python', 'Pandas', 'AWS S3', 'CloudFront'],
    architecture: 'React frontend deployed on AWS S3/CloudFront, Python data pipelines for course data processing, with custom algorithms for schedule optimization.',
  },
  slacklite: {
    title: 'SlackLite',
    github: 'https://github.com/AryanThodupunuri/SlackLite',
    problem: 'Need for low-latency, real-time communication platforms with secure file handling.',
    solution: 'Developed a messaging app with WebSocket-based real-time communication and secure file uploads to AWS S3.',
    techStack: ['React', 'FastAPI', 'MongoDB', 'WebSockets', 'AWS S3'],
    architecture: 'FastAPI backend with WebSocket support for real-time messaging, MongoDB for data storage, and AWS S3 for secure file uploads.',
  },
};

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const project = id ? projectDetails[id] : null;

  if (!project) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Project not found</p>
          <Link to="/projects" className="btn-primary">← Back to Projects</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 bg-white dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        {/* Breadcrumb */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors mb-10"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-10">{project.title}</h1>

        {project.github && (
          <div className="mb-8">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        )}

        <div className="space-y-10">
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-3">Problem</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{project.problem}</p>
          </section>

          <div className="border-t border-gray-100 dark:border-gray-800" />

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-3">Solution</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{project.solution}</p>
          </section>

          <div className="border-t border-gray-100 dark:border-gray-800" />

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech: string) => (
                <span key={tech} className="badge">{tech}</span>
              ))}
            </div>
          </section>

          <div className="border-t border-gray-100 dark:border-gray-800" />

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-3">Architecture</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{project.architecture}</p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProjectDetail;