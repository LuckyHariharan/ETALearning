import React, { useState } from 'react';

interface ChildData {
  name: string;
  age: number | '';
  gender: string;
  level?: string;
  remainingSessions?: number | '';
  progress?: number | '';
  notes?: string;
}

interface ChildModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (child: Omit<ChildData, 'age' | 'remainingSessions' | 'progress'> & { age: number; remainingSessions?: number; progress?: number }) => void;
}

const ChildModal: React.FC<ChildModalProps> = ({ open, onClose, onSubmit }) => {
  const [form, setForm] = useState<ChildData>({ name: '', age: '', gender: '', level: '', remainingSessions: '', progress: '', notes: '' });

  if (!open) return null;

  function update<K extends keyof ChildData>(key: K, value: ChildData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || form.age === '') return alert('Please enter name and age');
    const child = {
      name: form.name,
      age: Number(form.age),
      gender: form.gender || 'Not specified',
      level: form.level || 'New learner',
      remainingSessions: form.remainingSessions === '' ? 0 : Number(form.remainingSessions),
      progress: form.progress === '' ? 0 : Number(form.progress),
      notes: form.notes || '',
    };
    onSubmit(child);
    setForm({ name: '', age: '', gender: '', level: '', remainingSessions: '', progress: '', notes: '' });
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Create child profile</h3>
            <button onClick={onClose} className="text-sm text-gray-500">Close</button>
          </div>

          <form onSubmit={submit} className="mt-4 space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input value={form.name} onChange={(e) => update('name', e.target.value)} className="mt-1 block w-full border border-gray-200 rounded px-3 py-2" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input value={form.age} onChange={(e) => update('age', e.target.value === '' ? '' : Number(e.target.value))} type="number" min={1} className="mt-1 block w-full border border-gray-200 rounded px-3 py-2" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select value={form.gender} onChange={(e) => update('gender', e.target.value)} className="mt-1 block w-full border border-gray-200 rounded px-3 py-2">
                  <option value="">Select</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Non-binary">Non-binary</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Level</label>
              <input value={form.level} onChange={(e) => update('level', e.target.value)} className="mt-1 block w-full border border-gray-200 rounded px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Remaining sessions</label>
              <input value={form.remainingSessions} onChange={(e) => update('remainingSessions', e.target.value === '' ? '' : Number(e.target.value))} type="number" min={0} className="mt-1 block w-full border border-gray-200 rounded px-3 py-2" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea value={form.notes} onChange={(e) => update('notes', e.target.value)} className="mt-1 block w-full border border-gray-200 rounded px-3 py-2" rows={3} />
            </div>

            <div className="flex justify-end">
              <button type="submit" className="px-4 py-2 bg-mainBlue text-white rounded">Create profile</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChildModal;
