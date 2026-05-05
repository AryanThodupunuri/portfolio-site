import { Link } from 'react-router-dom';

const projects = [
  {
    id: 'coursecompass',
    title: 'CourseCompass',
    description: 'A full-stack distributed system and Manifest V3 Chrome Extension built with Java, Spring Boot, React, and PostgreSQL. Engineered a high-concurrency API to eliminate information asymmetry for 25,000+ UVA students, deployed via Docker.',
    image: '/project1.jpg', // placeholder
  },
  {
    id: 'aws-landing-zone',
    title: 'AWS Landing Zone',
    description: 'A modular AWS Landing Zone built with Terraform. Designed with VPC/IAM/CloudTrail guardrails, automated CI for security scans, and Terratest implementation for plan-only validation.',
    image: '/project2.jpg',
  },
  {
    id: 'extreme-weather-classification',
    title: 'Extreme Weather Classification',
    description: 'An HPC-accelerated computer vision pipeline utilizing PyTorch and OpenCV. Compares CNN architectures (EfficientNetV2/MobileNetV2) to detect catastrophic weather events, using Grad-CAM for Explainable AI.',
    image: '/project3.jpg',
  },
  {
    id: 'food-ordering-system',
    title: 'Food Ordering System',
    description: 'A backend microservices architecture built with Java, Spring Boot, Kafka, Docker, and PostgreSQL. Simulates a full food delivery ecosystem using the Outbox Pattern for reliable event-driven messaging.',
    image: '/project4.jpg',
  },
  {
    id: 'course-picker',
    title: 'Course Picker',
    description: 'A React and Tailwind web application deployed via AWS S3 and CloudFront that helps UVA students optimize their course schedules. Features custom conflict-checking and robust data pipelines built with Python and Pandas.',
    image: '/project5.jpg',
  },
  {
    id: 'slacklite',
    title: 'SlackLite',
    description: 'A real-time messaging app deployed with React, FastAPI, MongoDB, and AWS S3 for secure file uploads. Built for low-latency communication utilizing WebSockets.',
    image: '/project6.jpg',
  },
];

const Projects = () => {
  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        My Projects
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {project.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {project.description}
              </p>
              <Link
                to={`/projects/${project.id}`}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Learn More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Projects;