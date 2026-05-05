import { useParams, Link } from 'react-router-dom';

const projectDetails: { [key: string]: any } = {
  coursecompass: {
    title: 'CourseCompass',
    problem: 'UVA students face information asymmetry during course registration, leading to suboptimal schedules and missed opportunities.',
    solution: 'Built a full-stack distributed system with a high-concurrency Spring Boot API and Manifest V3 Chrome Extension to provide real-time course data and intelligent recommendations.',
    techStack: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'Docker', 'Chrome Extension API'],
    architecture: 'Microservices architecture with Spring Boot backend handling concurrent requests, PostgreSQL for data storage, and React-based Chrome extension for user interface.',
  },
  'aws-landing-zone': {
    title: 'AWS Landing Zone',
    problem: 'Organizations need secure, compliant cloud foundations but lack standardized infrastructure as code.',
    solution: 'Created a modular Terraform-based AWS Landing Zone with automated security guardrails, CI/CD pipelines, and comprehensive testing.',
    techStack: ['Terraform', 'AWS', 'Terratest', 'CI/CD'],
    architecture: 'Infrastructure as Code using Terraform modules for VPC, IAM, CloudTrail, with automated security scans and plan-only validation via Terratest.',
  },
  'extreme-weather-classification': {
    title: 'Extreme Weather Classification',
    problem: 'Need for accurate, explainable AI models to detect catastrophic weather events from satellite imagery.',
    solution: 'Developed an HPC-accelerated computer vision pipeline comparing CNN architectures with Explainable AI techniques for model validation.',
    techStack: ['PyTorch', 'OpenCV', 'HPC', 'Grad-CAM', 'EfficientNetV2', 'MobileNetV2'],
    architecture: 'Pipeline utilizing Rivanna HPC for training, PyTorch for model development, and Grad-CAM for explainability analysis.',
  },
  'food-ordering-system': {
    title: 'Food Ordering System',
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
    return <div className="text-center py-8">Project not found</div>;
  }

  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      <Link to="/projects" className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block">
        ← Back to Projects
      </Link>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        {project.title}
      </h1>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Problem</h2>
          <p className="text-gray-600 dark:text-gray-300">{project.problem}</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Solution</h2>
          <p className="text-gray-600 dark:text-gray-300">{project.solution}</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Tech Stack</h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
            {project.techStack.map((tech: string) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Architecture</h2>
          <p className="text-gray-600 dark:text-gray-300">{project.architecture}</p>
        </section>
      </div>
    </main>
  );
};

export default ProjectDetail;