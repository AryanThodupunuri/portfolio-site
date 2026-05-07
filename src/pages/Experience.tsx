const experiences = [
	{
		company: 'Amazon Web Services (AWS)',
		role: 'Software Development Engineer Intern',
		period: 'Incoming Summer 2026',
		location: 'Seattle, WA',
		description:
			'Incoming SDE Intern position focused on building scalable distributed systems and cloud infrastructure.',
		tags: ['Distributed Systems', 'Cloud Infrastructure', 'AWS'],
		upcoming: true,
	},
	{
		company: 'University of Virginia',
		role: 'Computer Science Student',
		period: '2022 – Present',
		location: 'Charlottesville, VA',
		description:
			"Pursuing Bachelor's in Computer Science with focus on distributed systems, cloud computing, and machine learning.",
		tags: ['Algorithms', 'Operating Systems', 'Machine Learning'],
		upcoming: false,
	},
	{
		company: 'Booz Allen Hamilton',
		role: 'Consultant',
		period: '2021 – 2022',
		location: 'McLean, VA',
		description:
			'Worked as a consultant focusing on delivering high-quality solutions to clients in the public and private sectors.',
		tags: ['Consulting', 'Client Relations', 'Project Management'],
		upcoming: false,
	},
];

const Experience = () => {
	return (
		<main className="flex-1 bg-white dark:bg-gray-950 min-h-screen">
			<div className="container mx-auto px-4 py-16 max-w-3xl">
				<div className="mb-12">
					<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
						Experience
					</h1>
					<p className="text-gray-500 dark:text-gray-400">
						My professional journey and education
					</p>
				</div>

				<div className="relative">
					<div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800" />
					<div className="space-y-10">
						{experiences.map((exp, index) => (
							<div key={index} className="relative pl-12">
								<div
									className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-gray-950 ${
										exp.upcoming
											? 'bg-indigo-500'
											: 'bg-gray-200 dark:bg-gray-700'
									}`}
								>
									{exp.upcoming ? (
										<svg
											className="w-4 h-4 text-white"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M5 3l14 9-14 9V3z"
											/>
										</svg>
									) : (
										<svg
											className="w-4 h-4 text-gray-500 dark:text-gray-400"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 14l9-5-9-5-9 5 9 5z"
											/>
										</svg>
									)}
								</div>
								<div className="card">
									<div className="flex flex-wrap items-start justify-between gap-2 mb-1">
										<div className="flex items-center gap-4">
											{exp.company === 'Amazon Web Services (AWS)' && (
												<img
													src="/assets/aws_logo.png"
													alt="AWS Logo"
													className="w-12 h-12 object-contain"
												/>
											)}
											{exp.company === 'Booz Allen Hamilton' && (
												<img
													src="/assets/booz_logo.png"
													alt="Booz Allen Logo"
													className="w-12 h-12 object-contain"
												/>
											)}
											<div>
												<h2 className="text-lg font-semibold text-gray-900 dark:text-white">
													{exp.role}
												</h2>
												<p className="text-indigo-600 dark:text-indigo-400 font-medium">
													{exp.company}
												</p>
											</div>
										</div>
										{exp.upcoming && (
											<span className="text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full">
												Upcoming
											</span>
										)}
									</div>
									<div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
										<span>{exp.period}</span>
										<span>·</span>
										<span>{exp.location}</span>
									</div>
									<p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
										{exp.description}
									</p>
									<div className="flex flex-wrap gap-2">
										{exp.tags.map((tag) => (
											<span key={tag} className="badge">
												{tag}
											</span>
										))}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</main>
	);
};

export default Experience;
