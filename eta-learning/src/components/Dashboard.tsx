import React, { useState } from 'react';

type TabKey = 'kids' | 'programs';

interface DashboardProps {
  onBack?: () => void;
  userRole?: 'admin' | 'parent' | undefined;
}

type HomeworkItem = {
  id: number;
  text: string;
  done: boolean;
};

type Kid = {
  id: number;
  name: string;
  age: number;
  progress: number;
  remainingSessions: number;
  level: string;
  homework: HomeworkItem[];
};

const initialKids: Kid[] = [
  {
    id: 1,
    name: 'Anika',
    age: 6,
    progress: 78,
    remainingSessions: 8,
    level: 'Montessori Foundations',
    homework: [
      { id: 1, text: 'Practice letter sounds', done: false },
      { id: 2, text: 'Complete counting tray', done: true },
    ],
  },
  {
    id: 2,
    name: 'Rohan',
    age: 8,
    progress: 64,
    remainingSessions: 5,
    level: 'Early Literacy Plus',
    homework: [
      { id: 1, text: 'Read a short story aloud', done: false },
    ],
  },
];

const sampleSessions = [
  { id: 1, title: 'Montessori Reading Lab', date: '2026-08-12', time: '09:00 AM', teacher: 'Ms. Priya', status: 'upcoming' },
  { id: 2, title: 'Math Foundations', date: '2026-08-05', time: '10:00 AM', teacher: 'Mr. Lee', status: 'past' },
];

const Dashboard: React.FC<DashboardProps> = ({ onBack, userRole }) => {
  const [tab, setTab] = useState<TabKey>('kids');
  const [kids, setKids] = useState<Kid[]>(initialKids);

  const email = 'Admin@etalearning.com';

  function toggleHomework(kidId: number, hwId: number) {
    setKids((prev) =>
      prev.map((k) => {
        if (k.id !== kidId) return k;
        return {
          ...k,
          homework: k.homework.map((h) => (h.id === hwId ? { ...h, done: !h.done } : h)),
        };
      })
    );
  }

  function handleCancel(session: { title: string; date: string; time: string }) {
    // show an explicit confirmation explaining the 9AM rule, then open mail client
    const msg = `To cancel, you MUST cancel before 9:00 AM on the day of the session.\n\nThis will open your email client to send a message to ${email} requesting cancellation for:\n\n${session.title} on ${session.date} at ${session.time}\n\nDo you want to continue?`;
    if (window.confirm(msg)) {
      const subject = encodeURIComponent('Cancel session');
      const body = encodeURIComponent(`Please cancel my session scheduled on ${session.date} at ${session.time} - ${session.title}. I understand I must cancel by 9:00 AM on the day of the session.`);
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    }
  }

  // Payment dummy data
  const upcomingPayment = {
    dueDate: '2026-08-20',
    amount: '$120.00',
    method: 'Visa ending in 4242',
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-semibold">Dashboard</h2>
            <p className="text-sm text-gray-500">Overview of your account, kids and next sessions</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs text-gray-500">Welcome back,</span>
              <span className="font-medium">{userRole === 'admin' ? 'Admin' : 'Parent'}</span>
            </div>
            {onBack && (
              <button
                onClick={onBack}
                className="px-3 py-2 bg-white border border-gray-200 rounded text-sm text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
            )}
          </div>
        </div>

        {/* Top summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h4 className="text-sm text-gray-500">Active Kids</h4>
            <div className="mt-2 text-2xl font-semibold">{kids.length}</div>
            <p className="text-xs text-gray-400 mt-1">Profiles linked to your account</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <h4 className="text-sm text-gray-500">Next Sessions</h4>
            <div className="mt-2 space-y-2 text-sm text-gray-700">
              {sampleSessions.map((s) => (
                <div key={s.id} className={`flex items-start justify-between ${s.status === 'past' ? 'opacity-70' : ''}`}>
                  <div>
                    <div className="font-medium">{s.title}</div>
                    <div className="text-xs text-gray-400">{s.date} • {s.time} • {s.teacher} {s.status === 'past' && <span className="ml-2 text-xs text-gray-500">(past)</span>}</div>
                  </div>
                  {s.status === 'upcoming' && (
                    <div className="ml-4">
                      <button
                        onClick={() => handleCancel(s)}
                        className="px-2 py-1 bg-red-600 text-white rounded text-sm"
                        title="Must cancel before 9AM the day of"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-gray-400">Click cancel to open your email client. Please cancel before 9:00 AM the day of the session.</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <h4 className="text-sm text-gray-500">Upcoming Payment</h4>
            <div className="mt-2 text-lg font-medium">{upcomingPayment.amount}</div>
            <p className="text-xs text-gray-400 mt-1">Due {upcomingPayment.dueDate} • {upcomingPayment.method}</p>
            <div className="mt-3">
              <button className="px-3 py-1 bg-mainBlue text-white rounded text-sm">Pay Now</button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Tabs column */}
            <nav className="flex md:flex-col w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50">
              <button
                className={`w-1/2 md:w-auto px-4 py-3 text-left ${tab === 'kids' ? 'bg-white text-mainBlue font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setTab('kids')}
              >
                My Kids
              </button>
              <button
                className={`w-1/2 md:w-auto px-4 py-3 text-left ${tab === 'programs' ? 'bg-white text-mainBlue font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setTab('programs')}
              >
                Programs & Plans
              </button>
            </nav>

            {/* Content area */}
            <div className="p-6 w-full md:w-2/3">
              {tab === 'kids' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">My Kids</h3>
                    <button className="text-sm text-mainBlue hover:underline">Add child</button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {kids.map((kid) => (
                      <div key={kid.id} className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex flex-col sm:flex-row items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl font-semibold text-blue-700 flex-shrink-0">{kid.name.charAt(0)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{kid.name} <span className="text-xs text-gray-400">• {kid.age} yrs</span></div>
                          <div className="text-xs text-gray-500">Last activity: 2 days ago</div>

                          <div className="mt-3 grid grid-cols-2 gap-3">
                            <div>
                              <div className="text-xs text-gray-500">Remaining sessions</div>
                              <div className="text-lg font-semibold">{kid.remainingSessions}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Current level</div>
                              <div className="text-lg font-semibold">{kid.level}</div>
                            </div>
                          </div>

                          <div className="mt-3">
                            <div className="text-sm font-medium">Homework</div>
                            <ul className="mt-2 space-y-2">
                              {kid.homework.map((h) => (
                                <li key={h.id} className="flex items-center gap-3">
                                  <input
                                    type="checkbox"
                                    checked={h.done}
                                    onChange={() => toggleHomework(kid.id, h.id)}
                                    className="w-4 h-4"
                                  />
                                  <span className={`${h.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>{h.text}</span>
                                </li>
                              ))}
                              {kid.homework.length === 0 && <li className="text-xs text-gray-400">No homework assigned</li>}
                            </ul>
                          </div>
                        </div>

                        <div className="w-full sm:w-28 flex-shrink-0">
                          <div className="text-xs text-gray-500">Progress</div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1 overflow-hidden">
                            <div className="h-2 bg-mainBlue rounded-full" style={{ width: `${kid.progress}%` }} />
                          </div>
                          <div className="text-xs text-gray-600 mt-1">{kid.progress}%</div>

                          {userRole === 'admin' && (
                            <div className="mt-2">
                              <button className="text-xs px-2 py-1 border rounded">Edit</button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Empty state card */}
                    <div className="bg-white rounded-lg border border-dashed border-gray-200 flex items-center justify-center p-6 text-center text-gray-500">
                      <div>
                        <div className="mb-2">No profiles yet?</div>
                        <button className="px-3 py-2 bg-mainBlue text-white rounded text-sm">Create a profile</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {tab === 'programs' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Programs & Plans</h3>
                    <button className="text-sm text-mainBlue hover:underline">Browse all</button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[1, 2, 3].map((p) => (
                      <div key={p} className="bg-white rounded-lg border p-4 shadow-sm">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-babyPink rounded-md flex items-center justify-center text-white font-semibold">P{p}</div>
                          <div className="flex-1">
                            <div className="font-medium">Program {p} — Early Literacy</div>
                            <div className="text-xs text-gray-500 mt-1">Suitable for ages 4–6 · 8 weeks</div>
                            <div className="mt-3">
                              <button className="px-3 py-1 text-sm bg-mainBlue text-white rounded">View</button>
                              <button className="px-3 py-1 text-sm ml-2 border rounded">Enroll</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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
