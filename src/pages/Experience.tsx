

const experiences = [
  {
    company: 'Amazon Web Services (AWS)',
    role: 'Software Development Engineer Intern',
    period: 'Incoming Summer 2026',
    description: 'Incoming SDE Intern position focused on building scalable distributed systems and cloud infrastructure.',
  },
  {
    company: 'University of Virginia',
    role: 'Computer Science Student',
    period: '2022 - Present',
    description: 'Pursuing Bachelor\'s in Computer Science with focus on distributed systems, cloud computing, and machine learning.',
  },
];

const Experience = () => {
  return (
    <main className="flex-1 container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
        Experience
      </h1>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {exp.role} at {exp.company}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">{exp.period}</p>
            <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Experience;