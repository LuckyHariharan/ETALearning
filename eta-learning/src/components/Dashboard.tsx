import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type TabKey = 'kids' | 'programs';

interface DashboardProps {
  onBack?: () => void;
  onSignOut: () => Promise<void>;
  profileName: string | null;
  userRole?: 'admin' | 'parent' | undefined;
  userId: string;
}

type Kid = {
  id: string;
  name: string;
  age?: number | null;
  remainingSessions?: number | null;
  level?: string | null;
  homeworkStreak: number;
  studyMaterialsUrl: string | null;
  sessionReportUrl: string | null;
  learningPlan: string;
};

function getTrustedGoogleLink(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (
      url.protocol === 'https:' &&
      (url.hostname === 'drive.google.com' || url.hostname === 'docs.google.com')
    ) {
      return url.toString();
    }
  } catch {
    return null;
  }
  return null;
}

function StudentResourceLink({ url, label, color }: { url: string | null; label: string; color: string }) {
  const trustedUrl = getTrustedGoogleLink(url);
  const className = `flex-1 text-center px-3 py-2 text-xs rounded min-h-[44px] flex items-center justify-center ${
    trustedUrl ? `${color} text-white transition-colors` : 'bg-gray-100 text-gray-400 cursor-not-allowed'
  }`;

  if (!trustedUrl) {
    return <span className={className} aria-disabled="true" title="This link has not been added yet">{label}</span>;
  }

  return (
    <a href={trustedUrl} target="_blank" rel="noopener noreferrer" className={className}>
      {label}
    </a>
  );
}

function Tally({ count }: { count: number }) {
  const filled = Math.min(count, 20);
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5" title={`${filled}/20`}>
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className={`w-1.5 h-3 rounded-sm ${i < filled ? 'bg-mainBlue' : 'bg-gray-200'}`} />
        ))}
      </div>
      <span className="text-xs text-gray-500 ml-1">{filled} / 20</span>
    </div>
  );
}

const Dashboard: React.FC<DashboardProps> = ({ onBack, onSignOut, profileName, userRole, userId }) => {
  const [tab, setTab] = useState<TabKey>('kids');
  const [kids, setKids] = useState<Kid[]>([]);
  const [studentsLoading, setStudentsLoading] = useState(true);
  const [studentsError, setStudentsError] = useState<string | null>(null);
  const [signOutError, setSignOutError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadStudents = async () => {
      const { data, error } = await supabase
        .from('students')
        .select('id, first_name, last_name, homework_streak, learning_plan, drive_url, drive_url_2')
        .eq('parent_id', userId)
        .order('first_name');

      if (!active) return;
      if (error) {
        setStudentsError(`Unable to load student profiles: ${error.message}`);
        setStudentsLoading(false);
        return;
      }

      setKids((data || []).map((student) => ({
        id: student.id,
        name: [student.first_name, student.last_name].filter(Boolean).join(' '),
        homeworkStreak: student.homework_streak,
        studyMaterialsUrl: student.drive_url,
        sessionReportUrl: student.drive_url_2,
        learningPlan: student.learning_plan || '',
      })));
      setStudentsLoading(false);
    };

    void loadStudents();
    return () => {
      active = false;
    };
  }, [userId]);

  const handleSignOut = async () => {
    setSignOutError(null);
    try {
      await onSignOut();
    } catch (error) {
      setSignOutError(error instanceof Error ? error.message : 'Unable to sign out. Please try again.');
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold">Parents&rsquo; Portal</h2>
            <p className="text-sm text-gray-500">Sessions, payments and your child&rsquo;s progress</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex min-w-0 flex-col text-right">
              <span className="text-xs text-gray-500">Welcome back,</span>
              <span className="max-w-[40vw] truncate text-sm font-medium sm:max-w-none sm:text-base">
                {profileName || (userRole === 'admin' ? 'Admin' : 'Parent')}
              </span>
            </div>
            {onBack && (
              <button
                onClick={onBack}
                className="px-4 py-2.5 bg-white border border-gray-200 rounded text-sm text-gray-700 hover:bg-gray-50 min-h-[44px]"
              >
                &larr; Back
              </button>
            )}
            <button
              onClick={() => void handleSignOut()}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded text-sm text-gray-700 hover:bg-gray-50 min-h-[44px]"
            >
              Sign out
            </button>
          </div>
        </div>
        {signOutError && <p role="alert" className="mb-4 text-sm text-red-700">{signOutError}</p>}

        {/* Tabs panel */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Tabs column */}
            <nav className="flex md:flex-col w-full md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50">
              <button
                className={`flex-1 md:flex-none px-4 py-3.5 text-left min-h-[48px] ${tab === 'kids' ? 'text-mainBlue font-medium bg-white md:bg-transparent border-b-2 border-mainBlue md:border-b-0' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setTab('kids')}
              >
                My Kids
              </button>
              <button
                className={`flex-1 md:flex-none px-4 py-3.5 text-left min-h-[48px] ${tab === 'programs' ? 'text-mainBlue font-medium bg-white md:bg-transparent border-b-2 border-mainBlue md:border-b-0' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setTab('programs')}
              >
                My Programs and Plans
              </button>
            </nav>

            {/* Content area */}
            <div className="p-4 md:p-6 w-full md:w-3/4">
              {tab === 'kids' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">My Kids</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {studentsLoading && <p role="status" className="text-sm text-gray-500">Loading student profiles…</p>}
                    {studentsError && <p role="alert" className="sm:col-span-2 text-sm text-red-700">{studentsError}</p>}
                    {!studentsLoading && !studentsError && kids.map((kid) => (
                      <div key={kid.id} className="bg-gray-50 rounded-lg border border-gray-100 p-4">
                        {/* Avatar + Name */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold text-blue-700 flex-shrink-0">
                            {kid.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-sm text-gray-900 truncate">{kid.name}</div>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-2 text-sm">
                          {kid.learningPlan && (
                            <div>
                              <div className="text-xs text-gray-500">Learning Plan</div>
                              <div className="font-medium text-gray-900 whitespace-pre-line">{kid.learningPlan}</div>
                            </div>
                          )}
                          <div>
                            <div className="text-xs text-gray-500 mb-1.5">Homework Streak</div>
                            <Tally count={kid.homeworkStreak} />
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
                          <StudentResourceLink url={kid.studyMaterialsUrl} label="Study Materials" color="bg-mainPink hover:bg-pink-700" />
                          <StudentResourceLink url={kid.sessionReportUrl} label="Session Report" color="bg-mainBlue hover:bg-mainBlue/80" />
                        </div>
                      </div>
                    ))}

                    {/* Empty state card */}
                    {!studentsLoading && !studentsError && kids.length === 0 && (
                      <div className="sm:col-span-2 bg-white rounded-lg border border-dashed border-gray-200 flex items-center justify-center p-6 text-center text-gray-500">
                        <div className="text-xs text-gray-500">No student profiles are assigned to this account.</div>
                      </div>
                    )}
                  </div>

                </div>
              )}

              {tab === 'programs' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">My Programs and Plans</h3>
                    <a
                      href={`${process.env.PUBLIC_URL}/ETA Program Packages.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-mainBlue hover:underline"
                    >
                      Packages PDF
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5-5m5 5V6m0 5l-5 5" />
                      </svg>
                    </a>
                  </div>

                  {studentsLoading ? (
                    <p role="status" className="text-sm text-gray-500">Loading student plans…</p>
                  ) : studentsError ? (
                    <p role="alert" className="text-sm text-red-700">{studentsError}</p>
                  ) : kids.length ? (
                    <div className="space-y-4">
                      {kids.map((kid) => (
                        <section key={kid.id} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                          <h4 className="font-semibold text-gray-900">{kid.name}</h4>
                          <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-gray-700">
                            {kid.learningPlan || 'Your instructor will add a learning plan here.'}
                          </p>
                        </section>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Student plans will appear here when profiles are assigned to this account.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
