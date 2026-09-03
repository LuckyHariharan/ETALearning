import React, { useState } from 'react';

interface QuestionnaireProps {
  open: boolean;
  onClose: () => void;
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ open, onClose }) => {
  const [step, setStep] = useState(0);
  const [childName, setChildName] = useState('');
  const [goals, setGoals] = useState<string[]>([]);
  const [timeline, setTimeline] = useState('');
  const [frequency, setFrequency] = useState('');
  const [support, setSupport] = useState('');

  const toggleGoal = (g: string) => {
    setGoals(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);
  };

  const next = () => setStep(s => Math.min(s + 1, 5));
  const prev = () => setStep(s => Math.max(s - 1, 0));

  const submit = () => {
    const body = [
      'ETA Learning — Parent Questionnaire',
      '',
      `Child's Name: ${childName}`,
      `Primary Goals: ${goals.join(', ') || 'Not selected'}`,
      `Timeline: ${timeline}`,
      `Attendance Frequency: ${frequency}`,
      `Home Support: ${support}`,
      '',
      'Program Placement (for your reference):',
      'ETA Tots: 18 months–2 years',
      'ETA Tinies: 2–7 years',
      'ETA Tykes: 7–11 years',
      'ETA Tweens/Teens: 11+ years',
    ].join('\n');

    const subject = encodeURIComponent('ETA Learning — Parent Questionnaire');
    const encodedBody = encodeURIComponent(body);
    window.location.href = `mailto:sepeghh@gmail.com?subject=${subject}&body=${encodedBody}`;
    onClose();
  };

  if (!open) return null;

  const goalOptions = [
    'Academic skills',
    'Confidence & motivation',
    'Focus & learning habits',
    'Independence & self-regulation',
    'Behaviour & social skills',
    'Overall development',
  ];

  const timelineOptions = ['Within 3 months', 'Within 6 months', 'Within 12 months', 'Long-term / ongoing'];
  const frequencyOptions = ['Once a week', 'Twice a week', '3+ times a week'];
  const supportOptions = [
    'Little to none — I cannot reliably support homework',
    'Minimal — I can ensure homework is completed',
    'High — I can provide assistance and monitor homework',
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-black">
              What&apos;s Your Child&apos;s ETA to Their Learning Goals?
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-black text-2xl leading-none">&times;</button>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Answer 5 quick questions so we can recommend their ETA and their ideal package.
          </p>

          <div className="mb-4">
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4, 5].map(i => (
                <div key={i} className={`h-1 flex-1 rounded ${i <= step ? 'bg-mainBlue' : 'bg-gray-200'}`} />
              ))}
            </div>
          </div>

          {step === 0 && (
            <div>
              <label className="block text-sm font-medium text-black mb-2">1. Child&apos;s Name</label>
              <input
                value={childName}
                onChange={e => setChildName(e.target.value)}
                className="w-full border border-gray-200 rounded px-3 py-2"
                placeholder="Enter your child's name"
              />
            </div>
          )}

          {step === 1 && (
            <div>
              <label className="block text-sm font-medium text-black mb-2">2. What is your child&apos;s primary goal?</label>
              <p className="text-xs text-gray-500 mb-3">Select all that apply</p>
              <div className="space-y-2">
                {goalOptions.map(g => (
                  <label key={g} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={goals.includes(g)}
                      onChange={() => toggleGoal(g)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">{g}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <label className="block text-sm font-medium text-black mb-2">3. When would you like to see meaningful progress?</label>
              <div className="space-y-2">
                {timelineOptions.map(t => (
                  <label key={t} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="timeline"
                      checked={timeline === t}
                      onChange={() => setTimeline(t)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">{t}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <label className="block text-sm font-medium text-black mb-2">4. How often can your child attend ETA sessions?</label>
              <div className="space-y-2">
                {frequencyOptions.map(f => (
                  <label key={f} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="frequency"
                      checked={frequency === f}
                      onChange={() => setFrequency(f)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">{f}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <label className="block text-sm font-medium text-black mb-2">5. How much support can you provide at home?</label>
              <div className="space-y-2">
                {supportOptions.map(s => (
                  <label key={s} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="support"
                      checked={support === s}
                      onChange={() => setSupport(s)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700">{s}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h3 className="text-lg font-semibold text-black mb-2">Program Placement</h3>
              <p className="text-sm text-gray-700 mb-4">
                Your child&apos;s age provides a baseline for program placement. Your answers and our free assessment will determine the best level within a specific ETA program, based on cognitive readiness.
              </p>
              <div className="space-y-2 text-sm text-gray-700">
                <p><strong>ETA Tots:</strong> 18 months–2 years</p>
                <p><strong>ETA Tinies:</strong> 2–7 years</p>
                <p><strong>ETA Tykes:</strong> 7–11 years</p>
                <p><strong>ETA Tweens/Teens:</strong> 11+ years</p>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                Programs are broken up based on Psychological Phases of Cognitive Development. We cannot move children into age categories beyond these boundaries. Programs are made to sufficiently challenge advanced learners in a holistic manner, while preparing them for their upcoming years.
              </p>
            </div>
          )}

          <div className="flex justify-between mt-6">
            {step > 0 ? (
              <button onClick={prev} className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50">
                Back
              </button>
            ) : (
              <div />
            )}
            {step < 5 ? (
              <button onClick={next} className="px-6 py-2 bg-mainPink text-white rounded hover:bg-mainBlue transition-colors">
                Next
              </button>
            ) : (
              <button onClick={submit} className="px-6 py-2 bg-mainBlue text-white rounded hover:bg-blue-600 transition-colors">
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;