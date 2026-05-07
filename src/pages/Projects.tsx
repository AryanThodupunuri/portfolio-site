import { Link } from 'react-router-dom';

const projects = [
	{
		id: 'coursecompass',
		title: 'CourseCompass',
		description: 'Full-stack UVA course registration platform combining Spring Boot, React, PostgreSQL, and a Chrome extension to simplify real-time course planning.',
		tags: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'Docker'],
		github: 'https://github.com/AryanThodupunuri/coursecompass',
		image: '/assets/CourseCompass_System_Overview (1).png',
	},
	{
		id: 'aws-landing-zone',
		title: 'AWS Landing Zone',
		description: 'Modular Terraform AWS landing zone with automated security guardrails, CI tests, and reusable infrastructure components for safe deployments.',
		tags: ['Terraform', 'AWS', 'HCL', 'CI/CD'],
		github: 'https://github.com/AryanThodupunuri/aws-landing-zone',
		image: '/assets/aws_logo.png',
	},
	{
		id: 'extreme-weather-classification',
		title: 'Extreme Weather Classification',
		description: 'AI-driven weather classification pipeline using PyTorch and Grad-CAM to make extreme weather detection explainable and accurate.',
		tags: ['PyTorch', 'OpenCV', 'HPC', 'Python'],
		github: 'https://github.com/AryanThodupunuri/extreme-weather-classification',
		image: '/assets/extreme_weather_cnn.jpeg',
	},
	{
		id: 'food-ordering-system',
		title: 'Food Ordering System',
		description: 'Microservices-based food ordering backend using Kafka, Spring Boot, and PostgreSQL with reliable event delivery and Docker deployment.',
		tags: ['Java', 'Kafka', 'Spring Boot', 'Docker'],
		github: 'https://github.com/AryanThodupunuri/food-ordering-system',
		image: '/assets/food_ordering_system.png',
	},
	{
		id: 'slacklite',
		title: 'SlackLite',
		description: 'Real-time messaging platform built with React, FastAPI, MongoDB, and AWS S3 for secure file sharing and low-latency chat.',
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
						A selection of things I&apos;ve built - from distributed systems to ML
						pipelines.
					</p>
				</div>

				<div className="grid md:grid-cols-2 gap-5">
					{projects.map((project) => (
						<div key={project.id} className="group card">
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
							<div className="mt-6 flex flex-wrap items-center gap-3">
								<Link
									to={`/projects/${project.id}`}
									className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
								>
									View details
								</Link>
								<a
									href={project.github}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-transparent px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
								>
									GitHub
								</a>
							</div>
						</div>
					))}
				</div>
			</div>
		</main>
	);
};

export default Projects;