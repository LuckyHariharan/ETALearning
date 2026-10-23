import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onAnchor?: (anchor: string) => void;
  onTestimonials?: () => void;
}

const Navbar = ({ onAnchor, onTestimonials }: NavbarProps) => {
  const [open, setOpen] = useState(false);

  const goRoute = (r: string, role?: 'admin' | 'parent') => {
    if ((window as any).setAppRoute) (window as any).setAppRoute(r, role);
    setOpen(false);
  };

  // Navigate to home route, then scroll to the given section anchor.
  const goHome = (anchor: string) => {
    setOpen(false);
    const routeFn = (window as any).setAppRoute;
    const onHome = document.body.dataset.route === 'home';

    if (anchor === 'testimonials') {
      if (onTestimonials) {
        onTestimonials();
        return;
      }
      if (onAnchor) {
        onAnchor('testimonials');
        return;
      }
      if (routeFn && !onHome) routeFn('home');
    }

    if (anchor === 'home') {
      if (routeFn && !onHome) routeFn('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (onAnchor) {
      // App-level goAnchor handles cross-route switching + scrolling.
      onAnchor(anchor);
      return;
    }

    if (onHome) {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      if (routeFn) routeFn('home');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const el = document.getElementById(anchor);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    }
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
    <>
      <nav className="fixed top-0 w-full bg-white shadow-md h-20 px-4 md:px-6 flex items-center z-40 animate-slide-down">
        <button
          onClick={() => goHome('home')}
          aria-label="ETA Learning — Go to homepage"
          className="flex items-center gap-3 h-full min-h-[44px] focus:outline-none rounded cursor-pointer"
        >
          <img
            src={`${process.env.PUBLIC_URL}/Short.png`}
            alt="ETA logo"
            className="h-14 md:h-20 w-auto"
          />
          <span className="sr-only">ETA Learning</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-4 ml-auto h-full">
          <button onClick={() => goHome('home')} className="text-gray-800 hover:text-mainBlue flex items-center h-full px-2">Home</button>
          <button onClick={() => goHome('programs')} className="text-gray-800 hover:text-mainBlue flex items-center h-full px-2">Programs + Plans</button>
          <button onClick={() => goHome('testimonials')} className="text-gray-800 hover:text-mainBlue flex items-center h-full px-2">Testimonials</button>
          <button onClick={() => goHome('faq')} className="text-gray-800 hover:text-mainBlue flex items-center h-full px-2">FAQ</button>
          <button onClick={() => goHome('contact')} className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-mainBlue flex items-center">Contact</button>
          <button onClick={() => goRoute('login')} className="text-sm text-gray-700 px-3 py-2 border rounded hover:bg-gray-50">Login</button>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden bg-white ml-auto">
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((s) => !s)}
            className="p-2 rounded focus:outline-none"
          >
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
      </nav>

      {/* Mobile menu overlay — sibling of <nav>, not a child, so it can use full viewport positioning */}
      {open && (
        <div className="md:hidden fixed inset-0 z-30 bg-white overflow-y-auto pt-20">
          <div className="p-6">
            {/* Header row – logo removed, keep Close button only */}
            <div className="flex items-center justify-end mb-6">
              <button
                onClick={() => setOpen(false)}
                className="text-sm text-gray-600 hover:text-gray-900 px-2 py-1"
              >
                Close
              </button>
            </div>

            <nav className="flex flex-col gap-1 text-lg text-gray-900">
              <button onClick={() => goHome('home')} className="text-left py-3 px-3 rounded hover:bg-gray-50">Home</button>
              <button onClick={() => goHome('programs')} className="text-left py-3 px-3 rounded hover:bg-gray-50">Programs + Plans</button>
              <button onClick={() => goHome('testimonials')} className="text-left py-3 px-3 rounded hover:bg-gray-50">Testimonials</button>
              <button onClick={() => goHome('faq')} className="text-left py-3 px-3 rounded hover:bg-gray-50">FAQ</button>
              <button onClick={() => goHome('contact')} className="text-left py-3 px-3 bg-pink-600 text-white rounded">
                Contact
              </button>

              <div className="border-t mt-4 pt-4">
                <button
                  onClick={() => goRoute('login')}
                  className="w-full text-left py-3 px-3 border rounded hover:bg-gray-50"
                >
                  Login
                </button>
              </div>

              <div className="mt-6 text-sm text-gray-400">© ETA Learning</div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
