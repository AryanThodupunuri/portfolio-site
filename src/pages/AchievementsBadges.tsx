import React from 'react';
import AnimatedText from '../components/AnimatedText';

const badges = [
  {
    title: 'AWS Certified Solutions Architect – Associate',
    description: 'Validated cloud architecture skills with hands-on AWS experience.'
  },
  {
    title: 'AWS Certified Machine Learning Engineer – Associate',
    description: 'Validated ability to build, deploy, and operationalize ML solutions on AWS.',
    link: 'https://www.credly.com/badges/53ba49fe-83bd-419e-b8c6-0b0d30da1e61/public_url'
  },
  {
    title: 'AWS Certified Developer – Associate',
    description: 'Proficiency in developing, deploying, and debugging cloud-based applications on AWS.',
    link: 'https://www.credly.com/badges/48cd3595-2dd9-4ad4-bf76-3c64f4e5d17b/public_url'
  },
  {
    title: 'AWS Certified AI Practitioner',
    description: 'Validated knowledge of AI/ML concepts and AWS AI services including SageMaker, Bedrock, and Rekognition.',
    link: 'https://www.credly.com/badges/aa3d6139-a6e4-4d9c-a147-f7571ef15f95/public_url'
  },
  {
    title: 'AWS Certified Cloud Practitioner',
    description: 'Demonstrated foundational AWS knowledge and best practices.'
  },
  {
    title: 'AT&T Tech Academy Graduate',
    description: 'Completed AT&T’s technical training program.',
    link: 'https://www.credly.com/badges/ff7875ff-eee0-4f62-bc81-fe97c7f31c1e/public_url'
  },
  {
    title: 'HackUVA Finalist',
    description: "Placed in the top teams at UVA's flagship hackathon."
  },
  {
    title: 'Dean’s List',
    description: 'Recognized for academic excellence at UVA.'
  },
  {
    title: 'Open Source Contributor',
    description: 'Contributed to public projects on GitHub.'
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
            <div className="font-semibold text-gray-900 dark:text-white text-center mb-1">
              {badge.link ? (
                <a
                  href={badge.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline"
                >
                  {badge.title}
                </a>
              ) : (
                badge.title
              )}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center">{badge.description}</div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default AchievementsBadges;
