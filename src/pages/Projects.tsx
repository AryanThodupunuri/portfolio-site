import { Link } from 'react-router-dom';

const projects = [
	{
		id: 'coursecompass',
		title: 'CourseCompass',
		description:
			"<strong>Problem:</strong> UVA students face information asymmetry during course registration, leading to suboptimal schedules and missed opportunities.<br/><br/>			<strong>Solution:</strong> Built a full-stack distributed system with a high-concurrency Spring Boot API and Manifest V3 Chrome Extension to provide real-time course data and intelligent recommendations.<br/><br/>			<strong>Tech Stack:</strong> Java, Spring Boot, React, PostgreSQL, Docker, Chrome Extension API.<br/><br/>			<strong>Architecture:</strong> Microservices architecture with Spring Boot backend handling concurrent requests, PostgreSQL for data storage, and React-based Chrome extension for user interface.",
		tags: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'Docker'],
		github: 'https://github.com/AryanThodupunuri/coursecompass',
		image: '/assets/CourseCompass_System_Overview (1).png',
	},
	{
		id: 'aws-landing-zone',
		title: 'AWS Landing Zone',
		description:
			"<strong>Problem:</strong> Setting up secure and scalable AWS environments manually is error-prone and time-consuming.<br/><br/>			<strong>Solution:</strong> AWS Landing Zone provides a modular Terraform setup with secure defaults like VPC, IAM, and CloudTrail guardrails. It automates CI security scans and uses Terratest for validation, ensuring compliance and scalability.<br/><br/>			<strong>Tech Stack:</strong> Terraform, AWS, HCL, CI/CD.<br/><br/>			<strong>Architecture:</strong> The project employs a modular Terraform architecture with reusable components for VPC, IAM, and CloudTrail. Automated CI pipelines validate configurations, while Terratest ensures plan-only validation for safe deployments.",
		tags: ['Terraform', 'AWS', 'HCL', 'CI/CD'],
		github: 'https://github.com/AryanThodupunuri/aws-landing-zone',
		image: '/assets/aws_logo.png',
	},
	{
		id: 'extreme-weather-classification',
		title: 'Extreme Weather Classification',
		description:
			"<strong>Problem:</strong> Detecting catastrophic weather events in real-time is challenging due to the complexity of visual data and the need for explainability.<br/><br/>			<strong>Solution:</strong> This project builds an AI-powered pipeline using PyTorch and OpenCV to classify extreme weather events. It compares CNN architectures like EfficientNetV2 and MobileNetV2, with Grad-CAM visualizations for explainability.<br/><br/>			<strong>Tech Stack:</strong> PyTorch, OpenCV, HPC, Python.<br/><br/>			<strong>Architecture:</strong> The pipeline processes visual data through pre-trained CNN models, fine-tuned on HPC clusters for efficiency. Grad-CAM overlays provide insights into model decisions, enhancing interpretability.",
		tags: ['PyTorch', 'OpenCV', 'HPC', 'Python'],
		github: 'https://github.com/AryanThodupunuri/extreme-weather-classification',
		image: '/assets/extreme_weather_cnn.jpeg',
	},
	{
		id: 'food-ordering-system',
		title: 'Food Ordering System',
		description:
			"<strong>Problem:</strong> Reliable event-driven messaging is critical for food delivery systems to ensure order consistency and timely updates.<br/><br/>			<strong>Solution:</strong> This backend microservices architecture simulates a food delivery ecosystem using Java, Spring Boot, Kafka, and PostgreSQL. It implements the Outbox Pattern for reliable messaging and is fully Dockerized for deployment.<br/><br/>			<strong>Tech Stack:</strong> Java, Kafka, Spring Boot, Docker, PostgreSQL.<br/><br/>			<strong>Architecture:</strong> The system uses a microservices design with Kafka for event-driven communication. PostgreSQL ensures data integrity, while Docker containers enable scalable and isolated deployments.",
		tags: ['Java', 'Kafka', 'Spring Boot', 'Docker'],
		github: 'https://github.com/AryanThodupunuri/food-ordering-system',
		image: '/assets/food_ordering_system.png',
	},
	{
		id: 'slacklite',
		title: 'SlackLite',
		description:
			"<strong>Problem:</strong> Existing messaging platforms often lack low-latency communication and seamless file-sharing capabilities.<br/><br/>			<strong>Solution:</strong> SlackLite is a real-time messaging app built with React, FastAPI, and MongoDB. It supports WebSocket-based messaging, file uploads, and emoji reactions, offering a modern and responsive user experience.<br/><br/>			<strong>Tech Stack:</strong> React, FastAPI, MongoDB, WebSockets, AWS S3.<br/><br/>			<strong>Architecture:</strong> The backend, built with FastAPI, manages WebSocket connections for real-time updates. MongoDB stores message data, while AWS S3 handles secure file uploads. The React frontend ensures a smooth and interactive user interface.",
		tags: ['React', 'FastAPI', 'MongoDB', 'WebSockets'],
		github: 'https://github.com/AryanThodupunuri/SlackLite',
		image: '/assets/SlackLite.png',
	},
];

const Projects = () => {
	return (
		<main className="min-h-screen bg-white dark:bg-gray-950">
			<div className="max-w-5xl mx-auto px-6 py-20">
				<div className="mb-14">
					<h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
						Work
					</h2>
					<h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
						Projects
					</h1>
					<p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl">
						A selection of things I&apos;ve built — from distributed systems to ML
						pipelines.
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-5">
					{projects.map((project) => (
						<Link
							key={project.id}
							to={`/projects/${project.id}`}
							className="group block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-md transition-all duration-200"
						>
							<div className="flex items-center gap-4 mb-4">
								<img
									src={project.image}
									alt={`${project.title} Logo`}
									className="w-12 h-12 object-contain"
								/>
								<div>
									<h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
										{project.title}
									</h3>
									<p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
										{project.description}
									</p>
								</div>
							</div>
							<div className="flex flex-wrap gap-1.5">
								{project.tags.map((tag) => (
									<span
										key={tag}
										className="px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
									>
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