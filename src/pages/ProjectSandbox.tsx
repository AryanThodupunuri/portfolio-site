import React from 'react';

const ProjectSandbox: React.FC = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-4xl font-bold mb-4 text-center animate-fade-in">Project Sandbox</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center max-w-xl animate-fade-in-delay">
        Try out interactive demos of my projects below! More coming soon.
      </p>
      {/* TODO: Add live code widgets or interactive project demos here */}
      <div className="w-full max-w-2xl bg-gray-100 dark:bg-gray-800 rounded-xl p-8 flex flex-col items-center justify-center animate-fade-in-delay-2">
        <span className="text-2xl text-gray-400 dark:text-gray-500">🚧</span>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Interactive demos will appear here. Stay tuned!</p>
      </div>
    </main>
  );
};

export default ProjectSandbox;
