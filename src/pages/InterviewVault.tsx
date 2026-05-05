import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// ---------------------------------------------------------------------------
// Mock data — replace with Supabase queries once tables are set up (see SETUP.md)
// ---------------------------------------------------------------------------

interface InterviewNote {
  id: string;
  company: string;
  role: string;
  round: string;
  date: string;
  questions: string[];
  notes: string;
  result: 'pending' | 'passed' | 'rejected';
}

interface NetworkingNote {
  id: string;
  name: string;
  company: string;
  date: string;
  context: string;
  takeaways: string;
  followUp: string;
}

interface CompanyPrepNote {
  id: string;
  company: string;
  role: string;
  stage: 'researching' | 'applied' | 'interviewing' | 'offer' | 'rejected';
  notes: string;
  resources: string[];
}

const mockInterviews: InterviewNote[] = [
  {
    id: '1',
    company: 'Amazon',
    role: 'SDE Intern',
    round: 'Online Assessment',
    date: 'Jan 2026',
    questions: ['Two-sum variant with constraints', 'LRU Cache (sliding window approach)'],
    notes: 'OA was 70 mins, two LC-style problems. First was straightforward HashMap, second needed a deque. Got both in time.',
    result: 'passed',
  },
  {
    id: '2',
    company: 'Amazon',
    role: 'SDE Intern',
    round: 'Final Loop (3 rounds)',
    date: 'Feb 2026',
    questions: ['Design a rate limiter', 'Behavioral: ownership/conflict stories', 'Trees + DP follow-ups'],
    notes: 'Used sliding window counter for rate limiter. Talked through token bucket as alternative. LP rounds went well — used STAR, hit Ownership and Deliver Results. Offer received.',
    result: 'passed',
  },
  {
    id: '3',
    company: 'Palantir',
    role: 'SWE',
    round: 'Karat Screen',
    date: 'Dec 2025',
    questions: ['Graph traversal (islands variant)', 'Mock PR code review'],
    notes: 'Code review part was harder than expected — lots of edge cases in the diff. Should have asked more clarifying questions upfront.',
    result: 'rejected',
  },
];

const mockNetworking: NetworkingNote[] = [
  {
    id: '1',
    name: 'Priya Nair',
    company: 'Stripe',
    date: 'Mar 2026',
    context: 'Found on LinkedIn — 2021 UVA CS grad, reached out cold.',
    takeaways: 'Stripe interviews heavily on system design even for internships. Focus on data modeling. Culture is very writing-driven — internal docs matter.',
    followUp: 'She offered to refer me for summer \'27. Keep in touch.',
  },
  {
    id: '2',
    name: 'Marcus Webb',
    company: 'AWS (S3 team)',
    date: 'Feb 2026',
    context: 'Met at UVA career fair, followed up a week later.',
    takeaways: 'S3 team cares a lot about fault tolerance and durability guarantees. He mentioned the on-call rotation is intense. Good team for infra learning though.',
    followUp: 'Said to ping him once I start my internship this summer.',
  },
];

const mockCompanyPrep: CompanyPrepNote[] = [
  {
    id: '1',
    company: 'Jane Street',
    role: 'SWE Intern 2027',
    stage: 'researching',
    notes: 'Heavy OCaml focus, but Python is ok too. Known for probability/math-heavy technical screens. Start grinding Bayesian problems and functional patterns. Notorious for hard coding rounds.',
    resources: ['CLRS chapter on randomized algorithms', 'Glassdoor reports', 'YouTube: "Jane Street internship experience 2024"'],
  },
  {
    id: '2',
    company: 'Google',
    role: 'SWE Intern 2027',
    stage: 'researching',
    notes: 'Phone screen is usually 45 min, 1-2 coding problems, one easy-medium one harder. Googleyness in on-site. Need to nail time/space complexity explanations out loud. Blind 75 is the baseline.',
    resources: ['Neetcode 150', 'Google interview prep guide', 'Tech Interview Handbook'],
  },
  {
    id: '3',
    company: 'Amazon',
    role: 'SDE Intern 2026',
    stage: 'offer',
    notes: '16 LP principles — know all of them cold. OA typically 2 coding + work sim. Loop is 3 rounds: 1 coding + LP, 1 coding + LP, 1 design. They care a lot about Ownership and Bias for Action.',
    resources: ['Amazon LP stories doc (personal)', 'LC top 50 Amazon questions', 'Amazon SDE interview guide on YouTube'],
  },
];

// ---------------------------------------------------------------------------

type Section = 'interviews' | 'networking' | 'prep';

const resultColors = {
  passed: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  rejected: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  pending: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
};

const stageColors = {
  researching: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
  applied: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  interviewing: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400',
  offer: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  rejected: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
};

const InterviewVault = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [section, setSection] = useState<Section>('interviews');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const toggle = (id: string) => setExpandedId(prev => prev === id ? null : id);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="flex items-start justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🔒</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500">Private</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Interview Vault</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Signed in as <span className="font-medium text-gray-700 dark:text-gray-300">{user?.email}</span></p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign out
          </button>
        </div>

        {/* Section tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-gray-100 dark:bg-gray-800/60 mb-8">
          {([
            { id: 'interviews', label: 'Interview Notes', icon: '📝' },
            { id: 'networking', label: 'Networking Calls', icon: '🤝' },
            { id: 'prep', label: 'Company Prep', icon: '🎯' },
          ] as { id: Section; label: string; icon: string }[]).map(tab => (
            <button
              key={tab.id}
              onClick={() => setSection(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                section === tab.id
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* --- Interview Notes --- */}
        {section === 'interviews' && (
          <div className="space-y-3">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">{mockInterviews.length} entries</p>
            {mockInterviews.map(entry => (
              <div key={entry.id} className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <button
                  onClick={() => toggle(entry.id)}
                  className="w-full flex items-center justify-between px-5 py-4 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-gray-900 dark:text-white">{entry.company}</span>
                        <span className="text-gray-400 dark:text-gray-500 text-sm">·</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{entry.round}</span>
                      </div>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{entry.role} · {entry.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${resultColors[entry.result]}`}>
                      {entry.result}
                    </span>
                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${expandedId === entry.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {expandedId === entry.id && (
                  <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 space-y-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Questions</p>
                      <ul className="space-y-1.5">
                        {entry.questions.map((q, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <span className="text-indigo-400 mt-0.5 shrink-0">—</span>
                            {q}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Notes</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{entry.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* --- Networking --- */}
        {section === 'networking' && (
          <div className="space-y-3">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">{mockNetworking.length} entries</p>
            {mockNetworking.map(entry => (
              <div key={entry.id} className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <button
                  onClick={() => toggle(entry.id)}
                  className="w-full flex items-center justify-between px-5 py-4 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 dark:text-white">{entry.name}</span>
                      <span className="text-gray-400 dark:text-gray-500 text-sm">·</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{entry.company}</span>
                    </div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{entry.date}</p>
                  </div>
                  <svg className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${expandedId === entry.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedId === entry.id && (
                  <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 space-y-4">
                    {[
                      { label: 'Context', value: entry.context },
                      { label: 'Takeaways', value: entry.takeaways },
                      { label: 'Follow-up', value: entry.followUp },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">{label}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* --- Company Prep --- */}
        {section === 'prep' && (
          <div className="space-y-3">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">{mockCompanyPrep.length} entries</p>
            {mockCompanyPrep.map(entry => (
              <div key={entry.id} className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <button
                  onClick={() => toggle(entry.id)}
                  className="w-full flex items-center justify-between px-5 py-4 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-gray-900 dark:text-white">{entry.company}</span>
                      <span className="text-gray-400 dark:text-gray-500 text-sm">·</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{entry.role}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${stageColors[entry.stage]}`}>
                      {entry.stage}
                    </span>
                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${expandedId === entry.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {expandedId === entry.id && (
                  <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 space-y-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Notes</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{entry.notes}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Resources</p>
                      <ul className="space-y-1.5">
                        {entry.resources.map((r, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <span className="text-indigo-400 mt-0.5 shrink-0">—</span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            💡 Notes are currently stored as mock data. See <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-xs">SETUP.md</code> to connect Supabase tables.
          </p>
        </div>
      </div>
    </main>
  );
};

export default InterviewVault;
