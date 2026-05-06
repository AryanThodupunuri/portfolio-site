import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

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

const InterviewVault = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
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

        {/* Tab Bar */}
        <div className="flex gap-2 mb-8">
          {[
            { id: 'interviews', label: 'Interview Vault', icon: '�' },
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
            💡 Notes are loaded from Supabase. See <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-xs">SETUP.md</code> to add, edit, or manage your data.
          </p>
        </div>
      </div>
    </main>
  );
};

export default InterviewVault;
