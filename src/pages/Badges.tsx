import React from 'react';

const badges = [
  {
    title: 'AWS Certified Solutions Architect - Associate',
    description: 'Demonstrated expertise in designing and deploying scalable systems on AWS.',
    link: '',
    cta: '',
  },
  {
    title: 'AWS Certified Machine Learning Engineer - Associate',
    description: 'Validated ability to build, deploy, and operationalize ML solutions on AWS.',
    link: 'https://www.credly.com/badges/53ba49fe-83bd-419e-b8c6-0b0d30da1e61/public_url',
    cta: 'View Credential →',
  },
  {
    title: 'AWS Certified Developer - Associate',
    description: 'Proficiency in developing, deploying, and debugging cloud-based applications on AWS.',
    link: 'https://www.credly.com/badges/48cd3595-2dd9-4ad4-bf76-3c64f4e5d17b/public_url',
    cta: 'View Credential →',
  },
  {
    title: 'AWS Certified AI Practitioner',
    description: 'Validated knowledge of AI/ML concepts and AWS AI services including SageMaker, Bedrock, and Rekognition.',
    link: 'https://www.credly.com/badges/aa3d6139-a6e4-4d9c-a147-f7571ef15f95/public_url',
    cta: 'View Credential →',
  },
  {
    title: 'AWS Certified Cloud Practitioner',
    description: 'Validated foundational knowledge of AWS Cloud concepts and services.',
    link: '',
    cta: '',
  },
  {
    title: 'AT&T Tech Academy Graduate',
    description: 'Completed a comprehensive program in software development and engineering.',
    link: 'https://www.credly.com/badges/ff7875ff-eee0-4f62-bc81-fe97c7f31c1e/public_url',
    cta: 'View Credential →',
  },
  {
    title: 'HooHacks Best Use of AI (CourseCompass)',
    description: 'Awarded for innovative use of AI in the CourseCompass project.',
    link: 'https://github.com/AryanThodupunuri/coursecompass',
    cta: 'View Project →',
  },
  {
    title: 'Eagle Scout',
    description: 'Achieved the rank of Eagle Scout, demonstrating leadership and community service.',
    link: '',
    cta: '',
  },
];

const Badges: React.FC = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="mb-14">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
            Achievements
          </h2>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Badges, Milestones, and Recognitions
          </h1>
          <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl">
            A showcase of my achievements and certifications, highlighting my skills and dedication.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {badges.map((badge, index) => (
              <div key={index} className="group card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {badge.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                {badge.description}
              </p>
              {badge.link && (
                <a
                  href={badge.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline font-medium"
                >
                  {badge.cta}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Badges;