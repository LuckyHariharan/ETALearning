import React, { useState } from 'react';

type TabKey = 'kids' | 'programs' | 'merch';

interface DashboardProps {
  onBack?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onBack }) => {
  const [tab, setTab] = useState<TabKey>('kids');

  return (
    <div className="min-h-screen p-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          {onBack && (
            <button
              onClick={onBack}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Back
            </button>
          )}
        </div>

        <div className="bg-gray-50 rounded-lg shadow-sm overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Tabs column */}
            <nav className="flex md:flex-col w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-200">
              <button
                className={`flex-1 md:flex-none px-4 py-3 text-left w-full md:w-auto ${tab === 'kids' ? 'bg-white text-mainBlue font-medium' : 'text-gray-700'}`}
                onClick={() => setTab('kids')}
              >
                My Kids
              </button>
              <button
                className={`flex-1 md:flex-none px-4 py-3 text-left w-full md:w-auto ${tab === 'programs' ? 'bg-white text-mainBlue font-medium' : 'text-gray-700'}`}
                onClick={() => setTab('programs')}
              >
                Programs & Plans
              </button>
              <button
                className={`flex-1 md:flex-none px-4 py-3 text-left w-full md:w-auto ${tab === 'merch' ? 'bg-white text-mainBlue font-medium' : 'text-gray-700'}`}
                onClick={() => setTab('merch')}
              >
                Merchandise
              </button>
            </nav>

            {/* Content area */}
            <div className="p-6 w-full md:w-2/3">
              {tab === 'kids' && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">My Kids</h3>
                  <p className="text-gray-600">Manage profiles, progress, and schedules for your children.</p>
                </div>
              )}

              {tab === 'programs' && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Programs & Plans</h3>
                  <p className="text-gray-600">Browse available programs, pricing, and enrollment options.</p>
                </div>
              )}

              {tab === 'merch' && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Merchandise</h3>
                  <p className="text-gray-600">Explore our branded items and learning materials.</p>
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
