import { useState, useEffect } from 'react';

interface LoginProps {
  // onLogin may accept an optional role so App can render admin vs parent dashboard
  onLogin: (role?: 'admin' | 'parent') => void;
  onBack?: () => void;
  preselectedRole?: 'admin' | 'parent' | undefined;
}

const Login: React.FC<LoginProps> = ({ onLogin, onBack, preselectedRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (preselectedRole) {
      // if role was preselected (from Navbar), highlight it or auto-select — for now keep user on login screen
    }
  }, [preselectedRole]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // Per spec: any input should allow continuing
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Login</h2>
          {onBack && (
            <button onClick={onBack} className="text-sm text-gray-500 hover:text-gray-700">Back</button>
          )}
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => onLogin('admin')}
            className="py-2 px-3 border rounded bg-white hover:bg-gray-50 text-sm font-medium"
          >
            Login as Admin
          </button>
          <button
            onClick={() => onLogin('parent')}
            className="py-2 px-3 border rounded bg-white hover:bg-gray-50 text-sm font-medium"
          >
            Login as Parent / Student
          </button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-mainBlue"
              placeholder="Enter your password"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3 bg-mainPink text-white rounded-md font-medium hover:bg-mainBlue"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <button className="font-semibold text-sm text-gray-900">Don't have an account? Sign up</button>
        </div>

        <div className="mt-2 text-center">
          <button
            onClick={() => onLogin()}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Continue as guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
