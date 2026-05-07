import React, { useEffect, useState } from 'react';

interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSubmissions: number;
  acceptedSubmissions: number;
  acceptanceRate: number;
}

const LEETCODE_USERNAME = 'aryant437';
const LEETCODE_PROFILE_URL = `https://leetcode.com/${LEETCODE_USERNAME}/`;
const MAX_SKILL_YEARS = 3;

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
        if (data && typeof data.solvedProblem !== 'undefined' && Array.isArray(data.acSubmissionNum) && Array.isArray(data.totalSubmissionNum)) {
          const totalSubmissions = data.totalSubmissionNum.reduce((sum: number, item: any) => sum + (item.submissions ?? 0), 0);
          const acceptedSubmissions = data.acSubmissionNum.reduce((sum: number, item: any) => sum + (item.submissions ?? 0), 0);
          const acceptanceRate = totalSubmissions > 0 ? Math.round((acceptedSubmissions / totalSubmissions) * 100) : 0;

          setLc({
            totalSolved: data.solvedProblem,
            easySolved: data.easySolved ?? 0,
            mediumSolved: data.mediumSolved ?? 0,
            hardSolved: data.hardSolved ?? 0,
            totalSubmissions,
            acceptedSubmissions,
            acceptanceRate,
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
            A dynamic showcase of my technical skills with real experience levels.
          </p>
        </section>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {skills.map((skill, index) => {
            const experienceLabel = `${skill.experience} year${skill.experience === 1 ? '' : 's'} experience`;
            const progressWidth = Math.round((skill.experience / MAX_SKILL_YEARS) * 100);
            return (
              <div
                key={index}
                className="group block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-md transition-all duration-200"
              >
                <div className="mb-4">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                      {skill.name}
                    </h3>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {experienceLabel}
                    </span>
                  </div>
                </div>
                <div className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                  Level based on recent hands-on experience and internship work.
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${Math.max(progressWidth, 10)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* LeetCode Tracker Section */}
        <div className="mt-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                LeetCode Stats
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
                Live problem stats from my public LeetCode profile, plus a direct profile link.
              </p>
            </div>
            <a
              href={LEETCODE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              View My LeetCode Profile
            </a>
          </div>

          {lcLoading ? (
            <p className="text-gray-500 dark:text-gray-400">Loading LeetCode data...</p>
          ) : lcError ? (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">LeetCode profile unavailable</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                The live LeetCode data couldn't be loaded, but you can still visit my profile directly.
              </p>
              <a
                href={LEETCODE_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Open LeetCode Profile
              </a>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Problems Solved</h3>
                <p className="text-4xl font-bold text-blue-600 mb-2">{lc?.totalSolved}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total problems solved on LeetCode</p>
              </div>
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Acceptance Rate</h3>
                <p className="text-4xl font-bold text-blue-600 mb-2">{lc?.acceptanceRate}%</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Accepted submissions across my LeetCode history</p>
              </div>
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Recent Difficulty Breakdown</h3>
                <div className="space-y-2 text-gray-500 dark:text-gray-400">
                  <p>Easy: {lc?.easySolved}</p>
                  <p>Medium: {lc?.mediumSolved}</p>
                  <p>Hard: {lc?.hardSolved}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default SkillTracker;
