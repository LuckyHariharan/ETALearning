import { useState } from 'react';
import ChildModal from './ChildModal';

type ChildFormData = {
  name: string;
  age: number;
  level?: string;
  remainingSessions?: number;
  homeworkStreak?: number;
};

type TabKey = 'kids' | 'programs';

interface DashboardProps {
  onBack?: () => void;
  userRole?: 'admin' | 'parent' | undefined;
}

type Kid = {
  id: number;
  name: string;
  age: number;
  remainingSessions: number;
  level: string;
  homeworkStreak: number;
};

const initialKids: Kid[] = [
  {
    id: 1,
    name: 'Anika',
    age: 6,
    remainingSessions: 8,
    level: 'ETA Tots • Montessori Foundations',
    homeworkStreak: 3,
  },
  {
    id: 2,
    name: 'Rohan',
    age: 8,
    remainingSessions: 5,
    level: 'ETA Tinies • Literacy Plus',
    homeworkStreak: 7,
  },
];

type Session = {
  id: number;
  childName: string;
  day: string;
  time: string;
  tutor: string;
  date: string;
};

const sampleSessions: Session[] = [
  { id: 1, childName: 'Anika', day: 'Mon, Sep 21', time: '4:00 PM', tutor: 'Ms. Priya', date: '2026-09-21' },
  { id: 2, childName: 'Rohan', day: 'Wed, Sep 23', time: '5:30 PM', tutor: 'Mr. Lee', date: '2026-09-23' },
];

const paymentEmail = 'acadyya@gmail.com';
const adminEmail = 'acadyya@gmail.com';

function formatDueDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  } catch {
    return iso;
  }
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

const Dashboard: React.FC<DashboardProps> = ({ onBack, userRole }) => {
  const [tab, setTab] = useState<TabKey>('kids');
  const [kids, setKids] = useState<Kid[]>(initialKids);
  const [showChildModal, setShowChildModal] = useState(false);
  const [editingKidId, setEditingKidId] = useState<number | null>(null);

  const upcomingPayment = { dueDate: '2026-09-28', amount: '$120.00' };

  function addChild(payload: ChildFormData) {
    setKids((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((k) => k.id)) + 1 : 1;
      return [
        ...prev,
        {
          id: nextId,
          name: payload.name,
          age: payload.age,
          remainingSessions: payload.remainingSessions ?? 0,
          level: payload.level ?? 'New learner',
          homeworkStreak: payload.homeworkStreak ?? 0,
        },
      ];
    });
  }

  function updateChild(id: number, payload: ChildFormData) {
    setKids((prev) =>
      prev.map((kid) =>
        kid.id === id
          ? {
              ...kid,
              name: payload.name,
              age: payload.age,
              remainingSessions: payload.remainingSessions ?? kid.remainingSessions,
              level: payload.level ?? kid.level,
            }
          : kid
      )
    );
  }

  function openCreateModal() {
    setEditingKidId(null);
    setShowChildModal(true);
  }

  function openEditModal(kid: Kid) {
    setEditingKidId(kid.id);
    setShowChildModal(true);
  }

  function handleCancel(session: Session) {
    const to = userRole === 'admin' ? adminEmail : paymentEmail;
    const subject = 'Cancel ETA Session';
    const body = `Please cancel ${session.childName}'s ETA session for ${session.day}.\n\nThank you.`;
    const confirmMsg =
      userRole === 'admin'
        ? `Cancel ${session.childName}'s session on ${session.day}? This will send an email to ${to}.`
        : `This will open your email client to send a cancellation notice to ETA.\n(You should cancel before 9:00 AM on the day of the session.)\n\nDo you want to continue?`;
    if (window.confirm(confirmMsg)) {
      window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  }

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

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          {/* Next Session card */}
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-5">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Next Session</h4>
            {sampleSessions.length > 0 ? (
              <div className="space-y-3">
                {sampleSessions.map((s) => (
                  <div key={s.id} className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-medium text-sm text-gray-900">{s.childName}</div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {s.day} &middot; {s.time} &middot; {s.tutor}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCancel(s)}
                      className="flex-shrink-0 px-2.5 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No upcoming sessions.</p>
            )}
            <p className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-400 leading-relaxed">
              Click cancel to email ETA your cancellation notice. Cancellations made after 9:00 AM on the day of your session will be charged in full.
            </p>
          </div>

          {/* Next Payment card */}
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-5">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Next Payment</h4>
            <div className="text-1xl md:text-2xl font-semibold text-gray-900">{upcomingPayment.amount}</div>
            <p className="text-sm text-gray-500 mt-1">
              Payment Due: <span className="font-medium text-gray-700">{formatDueDate(upcomingPayment.dueDate)}</span>
            </p>
            <p className="text-xs text-gray-400 mt-3 leading-relaxed">
              If you have questions about attendance or payment history, please refer to your Google Account Sheet.
            </p>
            <a
              href={`mailto:${paymentEmail}?subject=${encodeURIComponent('ETA Learning Payment')}`}
              className="inline-block mt-4 px-3 py-2 bg-mainBlue text-white rounded text-sm hover:bg-mainBlue/80 transition-colors"
            >
              E-transfer to {paymentEmail}
            </a>
          </div>

        </div>

        {/* Tabs panel */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Tabs column */}
            <nav className="flex md:flex-col w-full md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50">
              <button
                className={`flex-1 md:flex-none px-4 py-3 text-left ${tab === 'kids' ? 'text-mainBlue font-medium bg-white md:bg-transparent' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setTab('kids')}
              >
                My Kids
              </button>
              <button
                className={`flex-1 md:flex-none px-4 py-3 text-left ${tab === 'programs' ? 'text-mainBlue font-medium bg-white md:bg-transparent' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setTab('programs')}
              >
                Programs &amp; Plans
              </button>
            </nav>

            {/* Content area */}
            <div className="p-4 md:p-6 w-full md:w-3/4">
              {tab === 'kids' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">My Kids</h3>
                    {userRole === 'admin' && (
                      <button onClick={openCreateModal} className="text-sm text-mainBlue hover:underline">
                        Add child
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {kids.map((kid) => (
                      <div key={kid.id} className="bg-gray-50 rounded-lg border border-gray-100 p-4">
                        {/* Avatar + Name */}
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold text-blue-700 flex-shrink-0">
                            {kid.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-sm text-gray-900 truncate">{kid.name}</div>
                            <div className="text-xs text-gray-500">{kid.age} yrs</div>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-2 text-sm">
                          <div>
                            <div className="text-xs text-gray-500">Remaining Sessions</div>
                            <div className="font-semibold text-gray-900">{kid.remainingSessions}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Program &amp; Level</div>
                            <div className="font-medium text-gray-900">{kid.level}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1.5">Homework Streak</div>
                            <Tally count={kid.homeworkStreak} />
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100">
                          <a
                            href="#hw-pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-center px-3 py-1.5 text-xs bg-mainPink text-white rounded hover:bg-pink-700 transition-colors"
                          >
                            HW PDF
                          </a>
                          <a
                            href="#session-report"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-center px-3 py-1.5 text-xs bg-mainBlue text-white rounded hover:bg-mainBlue/80 transition-colors"
                          >
                            Session Report
                          </a>
                          {userRole === 'admin' && (
                            <button
                              onClick={() => openEditModal(kid)}
                              className="px-2 py-1.5 text-xs border rounded hover:bg-gray-100 transition-colors"
                            >
                              Edit
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Empty state card */}
                    {kids.length === 0 && (
                      <div className="sm:col-span-2 bg-white rounded-lg border border-dashed border-gray-200 flex items-center justify-center p-6 text-center text-gray-500">
                        <div>
                          <div className="mb-2">No profiles yet?</div>
                          {userRole === 'admin' ? (
                            <button onClick={openCreateModal} className="px-3 py-2 bg-mainBlue text-white rounded text-sm">
                              Create a profile
                            </button>
                          ) : (
                            <div className="text-xs text-gray-500">Contact admin to add a profile.</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <ChildModal
                    open={showChildModal}
                    onClose={() => {
                      setShowChildModal(false);
                      setEditingKidId(null);
                    }}
                    mode={editingKidId !== null ? 'edit' : 'create'}
                    initialData={
                      editingKidId !== null
                        ? (() => {
                            const k = kids.find((x) => x.id === editingKidId);
                            return k
                              ? { name: k.name, age: k.age, level: k.level, remainingSessions: k.remainingSessions }
                              : null;
                          })()
                        : null
                    }
                    onSubmit={(c) => {
                      if (editingKidId !== null) {
                        updateChild(editingKidId, c);
                      } else {
                        addChild(c);
                      }
                      setShowChildModal(false);
                      setEditingKidId(null);
                    }}
                  />
                </div>
              )}

              {tab === 'programs' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Programs &amp; Plans</h3>
                    <button className="text-sm text-mainBlue hover:underline">Browse all</button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[1, 2, 3].map((p) => (
                      <div key={p} className="bg-gray-50 rounded-lg border border-gray-100 p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-babyPink rounded-md flex items-center justify-center text-white font-semibold flex-shrink-0">
                            P{p}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm text-gray-900">Program {p} — Early Literacy</div>
                            <div className="text-xs text-gray-500 mt-1">Suitable for ages 4–6 &middot; 8 weeks</div>
                            <div className="mt-3 flex gap-2">
                              <button className="px-3 py-1 text-xs bg-mainBlue text-white rounded">View</button>
                              {userRole === 'admin' && (
                                <button className="px-3 py-1 text-xs border rounded">Enroll</button>
                              )}
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
