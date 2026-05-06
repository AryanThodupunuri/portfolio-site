import React, { useEffect, useState } from 'react';
import AnimatedText from '../components/AnimatedText';

const GITHUB_USERNAME = 'AryanThodupunuri';

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  fork: boolean;
}

const OpenSourceDashboard: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`).then(r => r.json()),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`).then(r => r.json()),
    ])
      .then(([reposData, profileData]) => {
        if (Array.isArray(reposData)) {
          setRepos(
            reposData
              .filter((repo: Repo) => !repo.fork)
              .sort((a: Repo, b: Repo) => b.stargazers_count - a.stargazers_count)
              .slice(0, 6)
          );
        } else {
          setError('Failed to load repositories.');
        }
        setProfile(profileData);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load GitHub data.');
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center px-4 py-12">
      <h1 className="text-4xl font-bold mb-4 text-center">
        <AnimatedText
          texts={["Open Source Dashboard", "GitHub Contributions", "Featured Projects"]}
          type="slide"
          interval={2000}
        />
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center max-w-xl">
        <AnimatedText
          texts={["Live stats and top repositories from my GitHub.", "Open source is my favorite way to learn and build."]}
          type="fade"
          interval={2600}
        />
      </p>
      {profile && (
        <div className="flex flex-col items-center mb-8">
          <img src={profile.avatar_url} alt="GitHub avatar" className="w-20 h-20 rounded-full mb-2 border-2 border-indigo-400" />
          <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">{profile.login}</a>
          <div className="text-sm text-gray-500 dark:text-gray-400">{profile.public_repos} repos · {profile.followers} followers · {profile.following} following</div>
        </div>
      )}
      {loading ? (
        <div className="text-gray-400 dark:text-gray-500">Loading GitHub data...</div>
      ) : error ? (
        <div className="text-red-500 dark:text-red-400">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          {repos.map(repo => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gray-100 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-gray-900 dark:text-white text-lg">{repo.name}</span>
                {repo.language && (
                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700/50">
                    {repo.language}
                  </span>
                )}
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-sm mb-2 min-h-[2.5em]">{repo.description}</div>
              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-2">
                <span>⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </main>
  );
};

export default OpenSourceDashboard;
