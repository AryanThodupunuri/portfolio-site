import React from 'react';
import AnimatedText from '../components/AnimatedText';

const badges = [
  {
    title: 'AWS Certified Solutions Architect – Associate',
    icon: '🟧',
    description: 'Validated cloud architecture skills with hands-on AWS experience.'
  },
  {
    title: 'AWS Certified Cloud Practitioner',
    icon: '🟦',
    description: 'Demonstrated foundational AWS knowledge and best practices.'
  },
  {
    title: 'AT&T Tech Academy Graduate',
    icon: '📜',
    description: 'Completed AT&T’s technical training program.'
  },
  {
    title: 'HackUVA Finalist',
    icon: '🏆',
    description: 'Placed in the top teams at UVA’s flagship hackathon.'
  },
  {
    title: 'Open Source Contributor',
    icon: '🌐',
    description: 'Contributed to public projects on GitHub.'
  },
  {
    title: 'Dean’s List',
    icon: '🎓',
    description: 'Recognized for academic excellence at UVA.'
  },
];

const AchievementsBadges: React.FC = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center px-4 py-12">
      <h1 className="text-4xl font-bold mb-4 text-center">
        <AnimatedText
          texts={["Achievements & Badges", "Milestones & Recognition", "What I'm Proud Of"]}
          type="slide"
          interval={2000}
        />
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center max-w-xl">
        <AnimatedText
          texts={["A showcase of certifications, awards, and accomplishments.", "Proof of impact, learning, and growth."]}
          type="fade"
          interval={2600}
        />
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {badges.map(badge => (
          <div key={badge.title} className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all">
            <span className="text-4xl mb-2">{badge.icon}</span>
            <div className="font-semibold text-gray-900 dark:text-white text-center mb-1">{badge.title}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center">{badge.description}</div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default AchievementsBadges;
