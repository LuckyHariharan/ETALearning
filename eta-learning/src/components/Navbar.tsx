import { useState, useEffect } from 'react';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const goRoute = (r: string, role?: 'admin' | 'parent') => {
    if ((window as any).setAppRoute) (window as any).setAppRoute(r, role);
    setOpen(false);
  };

  // prevent background scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md h-20 px-4 md:px-6 flex items-center z-40 animate-slide-down">
      <div className="flex items-center gap-3 h-full">
              {/* Logo: keep layout space to avoid header shift when menu opens. Use 'invisible' (keeps space) instead of removing the element so content doesn't jump. */}
              <img src={`${process.env.PUBLIC_URL}/Short.png`} alt="ETA logo" className={`h-10 md:h-12 w-auto ${open ? 'invisible' : 'visible'}`} />
              <span className="sr-only">ETA Learning</span>
            </div>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-4 ml-auto h-full">
        <a href="#home" className="text-gray-800 hover:text-mainBlue flex items-center h-full px-2">Home</a>
        <a href="#programs" className="text-gray-800 hover:text-mainBlue flex items-center h-full px-2">Programs</a>
        <a href="#faq" className="text-gray-800 hover:text-mainBlue flex items-center h-full px-2">FAQ</a>
        <a href="#contact" className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 flex items-center">Contact</a>

        <button onClick={() => goRoute('login', 'admin')} className="text-sm text-gray-700 px-3 py-2 border rounded hover:bg-gray-50">Admin Login</button>
        <button onClick={() => goRoute('login', 'parent')} className="text-sm text-gray-700 px-3 py-2 border rounded hover:bg-gray-50">Parent / Student Login</button>
      </div>

      {/* Mobile hamburger */}
      <div className="md:hidden bg-white ml-auto">
        {/* Simplified toggle button to avoid extra DOM that caused layout issues */}
        <button aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((s) => !s)} className="p-2 rounded focus:outline-none">
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu overlay: full-screen white panel to avoid showing underlying header */}
      {open && (
        <div className="text-sm md:hidden bg-white">
          <div className="h-80" /> {/* spacer so content starts below the header area */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <img src={`${process.env.PUBLIC_URL}/Short.png`} alt="ETA logo" className="h-10 md:h-10 w-auto" />
              <button onClick={() => setOpen(false)} className="text-sm text-gray-600">Close</button>
            </div>

            <nav className="flex flex-col gap-4 text-lg text-gray-900">
              <a href="#home" onClick={() => setOpen(false)} className="py-3 px-2">Home</a>
              <a href="#programs" onClick={() => setOpen(false)} className="py-3 px-2">Programs</a>
              <a href="#faq" onClick={() => setOpen(false)} className="py-3 px-2">FAQ</a>
              <a href="#contact" onClick={() => setOpen(false)} className="py-3 px-2 bg-pink-600 text-white rounded inline-block text-center">Contact</a>

              <div className="border-t text-sm pt-4 mt-4">
                              <button onClick={() => goRoute('login', 'admin')} className="w-full text-left py-3 px-2 border rounded mb-2">Admin Login</button>
                              <button onClick={() => goRoute('login', 'parent')} className="w-full text-left py-3 px-2 border rounded">Parent / Student Login</button>
              </div>

              <div className="mt-6 text-sm text-gray-500">© ETA Learning</div>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
