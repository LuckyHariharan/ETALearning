import { useEffect, useState } from 'react';

interface ChildData {
  name: string;
  age: number | '';
  level?: string;
  remainingSessions?: number | '';
}

interface ChildModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (child: { name: string; age: number; level?: string; remainingSessions?: number }) => void;
  initialData?: ChildData | null;
  mode?: 'create' | 'edit';
}

const emptyForm = (): ChildData => ({ name: '', age: '', level: '', remainingSessions: '' });

const ChildModal: React.FC<ChildModalProps> = ({ open, onClose, onSubmit, initialData, mode = 'create' }) => {
  const [form, setForm] = useState<ChildData>(emptyForm());

  useEffect(() => {
    if (open) {
      if (initialData) {
        setForm({
          name: initialData.name || '',
          age: initialData.age ?? '',
          level: initialData.level || '',
          remainingSessions: initialData.remainingSessions ?? '',
        });
      } else {
        setForm(emptyForm());
      }
    }
  }, [open, initialData]);

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
      level: form.level || 'New learner',
      remainingSessions: form.remainingSessions === '' ? 0 : Number(form.remainingSessions),
    };
    onSubmit(child);
    setForm(emptyForm());
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{mode === 'edit' ? 'Edit child profile' : 'Create child profile'}</h3>
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
                <label className="block text-sm font-medium text-gray-700">Remaining sessions</label>
                <input value={form.remainingSessions} onChange={(e) => update('remainingSessions', e.target.value === '' ? '' : Number(e.target.value))} type="number" min={0} className="mt-1 block w-full border border-gray-200 rounded px-3 py-2" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Program &amp; Level</label>
              <input value={form.level} onChange={(e) => update('level', e.target.value)} placeholder="e.g. ETA Tinies • Literacy Plus" className="mt-1 block w-full border border-gray-200 rounded px-3 py-2" />
            </div>

            <div className="flex justify-end">
              <button type="submit" className="px-4 py-2 bg-mainBlue text-white rounded">
                {mode === 'edit' ? 'Save changes' : 'Create profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChildModal;
