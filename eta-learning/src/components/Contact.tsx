import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [showThanks, setShowThanks] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Fake confirmation popup instead of mailto
    setShowThanks(true);
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

      {showThanks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4 text-center">
            <h4 className="text-lg font-semibold mb-2">Thank you</h4>
            <p className="text-sm text-gray-700 mb-4">Thank you for reaching out — we will get back to you. A confirmation email has been sent to you.</p>
            <div className="flex justify-center">
              <button onClick={() => setShowThanks(false)} className="px-4 py-2 bg-mainBlue text-white rounded">OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
