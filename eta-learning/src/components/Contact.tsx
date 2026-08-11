import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now simply open a mailto with the message prefilled — placeholder behaviour
    const to = 'admin@etalearning.com';
    const subject = encodeURIComponent('Contact form submission');
    const body = encodeURIComponent(`Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name *</label>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="mt-1 block w-full border border-gray-200 rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="mt-1 block w-full border border-gray-200 rounded px-3 py-2" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email *</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-1 block w-full border border-gray-200 rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" className="mt-1 block w-full border border-gray-200 rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="mt-1 block w-full border border-gray-200 rounded px-3 py-2" />
        </div>

        <div className="text-right">
          <button type="submit" className="px-4 py-2 bg-mainPink text-white rounded">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
