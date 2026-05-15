import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const approvedEmails: string[] = [
  // Add approved user emails here to allow access to private notes.
  // Example: 'recruiter@example.com', 'friend@example.com'
];

type InterviewNote = {
  id: string;
  company: string;
  role: string;
  round: string;
  date: string;
  questions: string[];
  notes: string;
  result: 'pending' | 'passed' | 'rejected';
};
type NetworkingNote = {
  id: string;
  name: string;
  company: string;
  date: string;
  context: string;
  takeaways: string;
  follow_up: string;
};
type CompanyPrepNote = {
  id: string;
  company: string;
  role: string;
  stage: 'researching' | 'applied' | 'interviewing' | 'offer' | 'rejected';
  notes: string;
  resources: string[];
};

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

type InterviewCompany = {
  company: string;
  role: string;
  location: string;
  season: string;
  outcome: string;
  rating: number;
  salary?: string;
  employmentType?: string;
  noteSummary: string;
};

const interviewCompanies: InterviewCompany[] = [
  {
    company: 'AWS',
    role: 'Software Development Engineer Intern',
    location: 'Arlington, VA',
    season: 'Summer 2026',
    outcome: 'Offer',
    rating: 5,
    salary: '$55/hr',
    noteSummary: 'Selective technical process focused on problem-solving, leadership principles, and ownership at scale.',
  },
  {
    company: 'Barclays',
    role: 'Software Engineering Intern',
    location: 'Whippany, NJ',
    season: 'Summer 2026',
    outcome: 'Rejected at Technical',
    rating: 3,
    noteSummary: 'Formal finance-tech process with a Powerday. Tested technical ability and behavioral fit in a finance technology context.',
  },
  {
    company: 'EY',
    role: 'Technology Consulting Intern',
    location: 'Tysons, VA',
    season: 'Summer 2026',
    outcome: 'Offer',
    rating: 4,
    salary: '$42/hr',
    noteSummary: 'Consulting-oriented process focused on communication, business context, and applying technical skills to client work.',
  },
  {
    company: 'Freddie Mac',
    role: 'Software Engineering Intern',
    location: 'McLean, VA',
    season: 'Summer 2026',
    outcome: 'Offer',
    rating: 4,
    salary: '$35/hr',
    noteSummary: 'Balanced technical and communication-focused interviews in a financial services engineering environment.',
  },
  {
    company: 'AT&T',
    role: 'Software Engineering Intern',
    location: 'Dallas, TX',
    season: 'Summer 2026',
    outcome: 'Offer',
    rating: 4,
    salary: '$37/hr',
    noteSummary: 'Behavioral and experience-focused process with some technical discussion around projects and cloud experience.',
  },
  {
    company: 'CoStar Group',
    role: 'Software Engineering Intern',
    location: 'Arlington, VA',
    season: 'Summer 2026',
    outcome: 'Offer',
    rating: 5,
    salary: '$45/hr',
    noteSummary: 'SWE-aligned interviews centered on technical projects, backend experience, and engineering decision-making.',
  },
  {
    company: 'Fannie Mae',
    role: 'Software Engineering Intern',
    location: 'Reston, VA',
    season: 'Summer 2026',
    outcome: 'Offer',
    rating: 4,
    salary: '$41/hr',
    noteSummary: 'Structured process with behavioral, technical, and project-based discussion on enterprise engineering work.',
  },
  {
    company: 'Snowflake',
    role: 'Software Engineering Intern',
    location: 'Menlo Park, CA',
    season: 'Summer 2026',
    outcome: 'Rejected at Team Matching',
    rating: 3,
    noteSummary: 'Highly technical process with strong coding fundamentals and problem-solving, ended at team matching.',
  },
  {
    company: 'Booz Allen Hamilton',
    role: 'Software Engineering Intern',
    location: 'McLean, VA',
    season: 'Summer 2025',
    outcome: 'Offer',
    rating: 5,
    salary: '$35/hr',
    employmentType: 'Hybrid',
    noteSummary: 'Project-focused and communication-heavy interviews for consulting work, highlighting AWS and full-stack background.',
  },
  {
    company: 'CGI',
    role: 'Software Engineering Intern',
    location: 'Fairfax, VA',
    season: 'Summer 2025',
    outcome: 'Offer',
    rating: 4,
    salary: '$25/hr',
    noteSummary: 'Conversational process centered on background, projects, and ability to learn quickly within a consulting team.',
  },
  {
    company: '2nd Order Solutions',
    role: 'Software Engineering Intern',
    location: 'Arlington, VA',
    season: 'Summer 2025',
    outcome: 'Rejected at Technical',
    rating: 3,
    noteSummary: 'Technical, fundamentals-focused process with emphasis on communication and reasoning through solutions under pressure.',
  },
];

const outcomeColors = {
  offer: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
  rejected: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  default: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-200',
};

const getOutcomeClass = (outcome: string) => {
  const normalized = outcome.toLowerCase();
  if (normalized.includes('offer')) return outcomeColors.offer;
  if (normalized.includes('rejected')) return outcomeColors.rejected;
  return outcomeColors.default;
};

const InterviewVault = () => {
  const { user } = useAuth();
  const isApproved = Boolean(user && approvedEmails.includes(user.email ?? ''));
  const isAuthenticated = Boolean(user);
  const [section, setSection] = useState<Section>('interviews');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [interviews, setInterviews] = useState<InterviewNote[]>([]);
  const [networking, setNetworking] = useState<NetworkingNote[]>([]);
  const [prep, setPrep] = useState<CompanyPrepNote[]>([]);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    setError(null);
    Promise.all([
      supabase
        .from('interview_notes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }),
      supabase
        .from('networking_notes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }),
      supabase
        .from('company_prep')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
    ]).then(([i, n, c]) => {
      if (i.error || n.error || c.error) {
        setError(i.error?.message || n.error?.message || c.error?.message || 'Failed to load notes');
        setInterviews([]);
        setNetworking([]);
        setPrep([]);
      } else {
        setInterviews(i.data || []);
        setNetworking(n.data || []);
        setPrep(c.data || []);
      }
      setLoading(false);
    });
  }, [user]);

  const toggle = (id: string) => setExpandedId(prev => prev === id ? null : id);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Interviews</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-2xl">
            {isAuthenticated
              ? 'You\'re signed in — you can see my notes for each company below.'
              : 'Browse every company I\'ve interviewed with. Sign in to unlock my notes for each one.'}
          </p>
        </div>

        {/* Companies list */}
        <div className="mb-12">
          <div className="grid gap-5 sm:grid-cols-2">
            {interviewCompanies.map(company => (
              <div key={company.company} className="card">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{company.company}</h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{company.role}</p>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{company.location}</p>
                  </div>
                  <div className="text-right text-xs text-gray-400 dark:text-gray-500 shrink-0">
                    <div>{company.season}</div>
                    {company.employmentType && <div className="mt-1">{company.employmentType}</div>}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${getOutcomeClass(company.outcome)}`}>
                    {company.outcome}
                  </span>
                  {company.salary && (
                    <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-xs font-semibold text-gray-600 dark:text-gray-300">
                      {company.salary}
                    </span>
                  )}
                </div>

                <div className="mt-3 flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, idx) => (
                    <span key={idx} className={idx < company.rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-700'}>★</span>
                  ))}
                </div>

                {isAuthenticated && (
                  <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-4">
                    {company.noteSummary}
                  </p>
                )}
                {!isAuthenticated && (
                  <p className="mt-4 text-xs text-gray-400 dark:text-gray-500 italic">
                    Sign in to see my notes on this process.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {isAuthenticated ? (
          isApproved ? (
          <>
            {/* Tab Bar */}
            <div className="flex gap-2 mb-8">
              {[
                { id: 'interviews', label: 'Interview Vault', icon: '🗂' },
                { id: 'networking', label: 'Networking Calls', icon: '🤝' },
                { id: 'prep', label: 'Company Prep', icon: '🎯' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setSection(tab.id as Section)}
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
                {loading ? (
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">Loading interview notes...</p>
                ) : error ? (
                  <p className="text-xs text-red-500 dark:text-red-400 mb-4">{error}</p>
                ) : (
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">{interviews.length} entries</p>
                )}
                {interviews.map(entry => (
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
                                <span className="text-indigo-400 mt-0.5 shrink-0">•</span>
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
                {loading ? (
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">Loading networking notes...</p>
                ) : error ? (
                  <p className="text-xs text-red-500 dark:text-red-400 mb-4">{error}</p>
                ) : (
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">{networking.length} entries</p>
                )}
                {networking.map(entry => (
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
                          { label: 'Follow-up', value: entry.follow_up },
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
                {loading ? (
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">Loading company prep notes...</p>
                ) : error ? (
                  <p className="text-xs text-red-500 dark:text-red-400 mb-4">{error}</p>
                ) : (
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">{prep.length} entries</p>
                )}
                {prep.map(entry => (
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
                                <span className="text-indigo-400 mt-0.5 shrink-0">•</span>
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
          </>
          ) : (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Access pending approval</h3>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                You are signed in, but your account still needs approval before private interview notes are visible.
                I approve or deny users in the Supabase dashboard by allowing or removing their email.
              </p>
              <div className="mt-6">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
                >
                  Manage sign-in
                </Link>
              </div>
            </div>
          )
        ) : null}

        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            💡 Notes are loaded from Supabase. See <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-xs">SETUP.md</code> to add, edit, or manage your data.
          </p>
        </div>
      </div>
    </main>
  );
};

export default InterviewVault;
