import React from 'react';
import AnimatedText from '../components/AnimatedText';

const skills = [
  // Languages
  { name: 'Python', level: 95 },
  { name: 'Java', level: 93 },
  { name: 'JavaScript', level: 90 },
  { name: 'TypeScript', level: 88 },
  { name: 'SQL', level: 90 },
  { name: 'Golang', level: 75 },
  { name: 'C++', level: 70 },
  { name: 'Shell Scripting', level: 80 },
  { name: 'GraphQL', level: 80 },
  // Frameworks & Libraries
  { name: 'React', level: 90 },
  { name: 'Spring Boot', level: 85 },
  { name: 'Flask', level: 80 },
  { name: 'Node.js', level: 85 },
  { name: 'Express', level: 80 },
  { name: 'TensorFlow', level: 75 },
  { name: 'PyTest', level: 85 },
  { name: 'Pandas', level: 90 },
  { name: 'NumPy', level: 90 },
  { name: 'Plotly Dash', level: 70 },
  // Cloud/DevOps
  { name: 'AWS', level: 90 },
  { name: 'Docker', level: 88 },
  { name: 'Terraform', level: 85 },
  { name: 'Kafka', level: 80 },
  { name: 'CI/CD', level: 80 },
  { name: 'Linux', level: 85 },
  { name: 'Git', level: 90 },
  // Databases
  { name: 'PostgreSQL', level: 90 },
  { name: 'MySQL', level: 80 },
  { name: 'MongoDB', level: 80 },
  { name: 'Redis', level: 80 },
  { name: 'Elasticsearch', level: 70 },
  { name: 'Vector DBs (Pinecone/Milvus)', level: 70 },
  // Concepts
  { name: 'Distributed Systems', level: 85 },
  { name: 'RESTful APIs', level: 90 },
  { name: 'Multithreading', level: 80 },
  { name: 'Networking', level: 80 },
  { name: 'Large Language Models (LLMs)', level: 75 },
];

const SkillTracker: React.FC = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center px-4 py-12">
      <h1 className="text-4xl font-bold mb-4 text-center">
        <AnimatedText
          texts={["Skill Tracker", "Learning Roadmap", "SWE New Grad Readiness"]}
          type="slide"
          interval={2000}
        />
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center max-w-xl">
        <AnimatedText
          texts={["Skills for SWE new grad roles at top companies.", "Progress based on my learning journey."]}
          type="fade"
          interval={2600}
        />
      </p>
      <div className="w-full max-w-2xl space-y-6">
        {skills.map(skill => (
          <div key={skill.name} className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{skill.level}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full transition-all duration-700"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default SkillTracker;
