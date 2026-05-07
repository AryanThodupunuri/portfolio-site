import React, { useEffect, useState } from 'react';

interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number;
  acceptanceRate: number;
}

const LEETCODE_USERNAME = 'aryant437';

const skills = [
  // Languages
  { name: 'Python', experience: 3 },
  { name: 'Java', experience: 3 },
  { name: 'JavaScript', experience: 3 },
  { name: 'TypeScript', experience: 2 },
  { name: 'SQL', experience: 3 },
  { name: 'Golang', experience: 1 },
  { name: 'C++', experience: 2 },
  { name: 'Shell Scripting', experience: 2 },
  { name: 'GraphQL', experience: 2 },
  // Frameworks & Libraries
  { name: 'React', experience: 3 },
  { name: 'Spring Boot', experience: 2 },
  { name: 'Flask', experience: 2 },
  { name: 'Node.js', experience: 2 },
  { name: 'Express', experience: 2 },
  { name: 'TensorFlow', experience: 1 },
  { name: 'PyTest', experience: 2 },
  { name: 'Pandas', experience: 3 },
  { name: 'NumPy', experience: 3 },
  { name: 'Plotly Dash', experience: 1 },
  // Cloud/DevOps
  { name: 'AWS', experience: 3 },
  { name: 'Docker', experience: 2 },
  { name: 'Terraform', experience: 2 },
  { name: 'Kafka', experience: 2 },
  { name: 'CI/CD', experience: 2 },
  { name: 'Linux', experience: 2 },
  { name: 'Git', experience: 3 },
  // Databases
  { name: 'PostgreSQL', experience: 3 },
  { name: 'MySQL', experience: 2 },
  { name: 'MongoDB', experience: 2 },
  { name: 'Redis', experience: 2 },
  { name: 'Elasticsearch', experience: 1 },
  { name: 'Vector DBs (Pinecone/Milvus)', experience: 1 },
  // Concepts
  { name: 'Distributed Systems', experience: 2 },
  { name: 'RESTful APIs', experience: 3 },
  { name: 'Multithreading', experience: 2 },
  { name: 'Networking', experience: 2 },
  { name: 'Large Language Models (LLMs)', experience: 1 },
];

const SkillTracker: React.FC = () => {
  const [lc, setLc] = useState<LeetCodeStats | null>(null);
  const [lcLoading, setLcLoading] = useState(true);
  const [lcError, setLcError] = useState(false);

  useEffect(() => {
    // Uses the public alfa-leetcode-api proxy (no auth needed, public profile only)
    fetch(`https://alfa-leetcode-api.onrender.com/${LEETCODE_USERNAME}/solved`)
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.solvedProblem !== 'undefined') {
          setLc({
            totalSolved: data.solvedProblem,
            totalQuestions: data.totalProblem ?? 3400,
            easySolved: data.easySolved ?? 0,
            totalEasy: data.totalEasy ?? 0,
            mediumSolved: data.mediumSolved ?? 0,
            totalMedium: data.totalMedium ?? 0,
            hardSolved: data.hardSolved ?? 0,
            totalHard: data.totalHard ?? 0,
            ranking: data.ranking ?? 0,
            acceptanceRate: data.acceptanceRate ?? 0,
          });
        } else {
          setLcError(true);
        }
        setLcLoading(false);
      })
      .catch(() => { setLcError(true); setLcLoading(false); });
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Skills Section */}
        <section className="mb-14">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
            Skills
          </h2>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Skill Tracker
          </h1>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl">
            A dynamic showcase of my technical skills and LeetCode achievements.
          </p>
        </section>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="group block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-4 mb-4">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                    {skill.name}
                  </h3>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${skill.experience * 20}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LeetCode Tracker Section */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            LeetCode Stats
          </h2>
          {lcLoading ? (
            <p className="text-gray-500 dark:text-gray-400">Loading...</p>
          ) : lcError ? (
            <p className="text-red-500">Failed to load LeetCode stats. Please try again later.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Total Problems Solved
                </h3>
                <p className="text-2xl font-bold text-blue-600">{lc?.totalSolved}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Out of {lc?.totalQuestions} problems
                </p>
              </div>
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Global Ranking
                </h3>
                <p className="text-2xl font-bold text-blue-600">#{lc?.ranking}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default SkillTracker;
