import React, { useState } from 'react';

type TabKey = 'kids' | 'programs' | 'merch';

interface DashboardProps {
  onBack?: () => void;
}

const sampleKids = [
  { id: 1, name: 'Ava', age: 6, progress: 72 },
  { id: 2, name: 'Noah', age: 8, progress: 45 },
];

const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  const [tab, setTab] = useState<TabKey>('kids');

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-semibold">Dashboard</h2>
            <p className="text-sm text-gray-500">Overview of your account, kids and active programs</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs text-gray-500">Welcome back,</span>
              <span className="font-medium">Parent</span>
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
            <div className="mt-2 text-2xl font-semibold">{sampleKids.length}</div>
            <p className="text-xs text-gray-400 mt-1">Profiles linked to your account</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <h4 className="text-sm text-gray-500">Active Programs</h4>
            <div className="mt-2 text-2xl font-semibold">3</div>
            <p className="text-xs text-gray-400 mt-1">Enrolled and recommended plans</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <h4 className="text-sm text-gray-500">Next Activity</h4>
            <div className="mt-2 text-xl font-medium">Letter Tracing</div>
            <p className="text-xs text-gray-400 mt-1">Tomorrow, 9:00 AM</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Tabs column */}
            <nav className="flex md:flex-col w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50">
              <button
                className={`w-1/3 md:w-auto px-4 py-3 text-left ${tab === 'kids' ? 'bg-white text-mainBlue font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setTab('kids')}
              >
                My Kids
              </button>
              <button
                className={`w-1/3 md:w-auto px-4 py-3 text-left ${tab === 'programs' ? 'bg-white text-mainBlue font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setTab('programs')}
              >
                Programs & Plans
              </button>
              <button
                className={`w-1/3 md:w-auto px-4 py-3 text-left ${tab === 'merch' ? 'bg-white text-mainBlue font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setTab('merch')}
              >
                Merchandise
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
                    {sampleKids.map((kid) => (
                      <div key={kid.id} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-xl font-semibold text-blue-700">{kid.name.charAt(0)}</div>
                          <div className="flex-1">
                            <div className="font-medium">{kid.name} <span className="text-xs text-gray-400">• {kid.age} yrs</span></div>
                            <div className="text-xs text-gray-500">Last activity: 2 days ago</div>
                          </div>
                          <div className="w-28">
                            <div className="text-xs text-gray-500">Progress</div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1 overflow-hidden">
                              <div className="h-2 bg-mainBlue rounded-full" style={{ width: `${kid.progress}%` }} />
                            </div>
                            <div className="text-xs text-gray-600 mt-1">{kid.progress}%</div>
                          </div>
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

              {tab === 'merch' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">Merchandise</h3>
                    <button className="text-sm text-mainBlue hover:underline">Shop</button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4].map((m) => (
                      <div key={m} className="bg-white rounded-lg border p-4 text-center">
                        <div className="w-full h-32 bg-gray-100 rounded mb-3 flex items-center justify-center text-gray-400">Image</div>
                        <div className="font-medium">ETA T-shirt</div>
                        <div className="text-sm text-gray-500">$18.00</div>
                        <button className="mt-3 px-3 py-1 bg-mainBlue text-white rounded text-sm">Add to cart</button>
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
