import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Section from './components/Section';
import Footer from './components/Footer';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Contact from './components/Contact';

const App: React.FC = () => {
  const [route, setRoute] = useState<'home' | 'login' | 'dashboard'>('home');
  const [userRole, setUserRole] = useState<'admin' | 'parent' | undefined>(undefined);

  // helper that Navbar uses to set route + role (small SPA helper)
  useEffect(() => {
    (window as any).setAppRoute = (r: string, role?: 'admin' | 'parent') => {
      if (role) setUserRole(role);
      if (r === 'home' || r === 'login' || r === 'dashboard') setRoute(r as any);
    };
    return () => {
      try { delete (window as any).setAppRoute; } catch {}
    };
  }, []);

  const goToLogin = (role?: 'admin' | 'parent') => {
    if (role) setUserRole(role);
    setRoute('login');
  };
  const goToDashboard = (role?: 'admin' | 'parent') => {
    if (role) setUserRole(role);
    setRoute('dashboard');
  };
  const goHome = () => setRoute('home');

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navbar />

      {route === 'home' && (
        <>
          <Hero onStart={() => goToLogin()} />

          <Section title="ETA Program Packages" bgColor="bg-white">
            <div id="programs" className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-slate-50 to-sky-50 p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-xl font-semibold text-mainBlue">Explorer Package</h3>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                  A gentle introduction to Montessori-inspired learning for early readers, combining sensory materials with structured literacy support.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-gray-700">
                  <li>Weekly progress checks</li>
                  <li>Hands-on sensory learning tools</li>
                  <li>Parent update summary</li>
                </ul>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-slate-50 to-pink-50 p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-xl font-semibold text-mainPink">Achiever Package</h3>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                  Built for growing learners, this package balances academic growth, social development, and hands-on Montessori experiences.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-gray-700">
                  <li>Custom learning plan</li>
                  <li>Formative assessment cycles</li>
                  <li>Flexible session scheduling</li>
                </ul>
              </div>

              <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-white via-slate-50 to-lime-50 p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-xl font-semibold text-[#008060]">Momentum Package</h3>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                  A premium program for students ready to accelerate academic confidence and real-world skills with meaningful projects.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-gray-700">
                  <li>Advanced literacy coaching</li>
                  <li>Skill-building initiatives</li>
                  <li>Detailed family progress reports</li>
                </ul>
              </div>
            </div>
          </Section>

          <Section title="Holistic and Personalized Curriculum" bgColor="bg-babyBlue">
            <p>
              Every child is unique. At ETA, we build learning plans that adapt to each student’s strengths, pace, and curiosity.
            </p>
          </Section>
          <Section title="Behavioral Development" bgColor="bg-white">
            <p>
              We support academic growth and social confidence, helping learners build resilience, independence, and a positive mindset.
            </p>
          </Section>
          <Section title="Hands-On and Take Home Materials" bgColor="bg-babyPink">
            <p>
              Montessori-inspired activities and take-home materials keep learning tactile, meaningful, and joyfully connected to everyday life.
            </p>
          </Section>

          {/* Contact section anchored by #contact */}
          <div id="contact" className="mt-8">
            <Contact />
          </div>
        </>
      )}

      {route === 'login' && <Login onLogin={goToDashboard} onBack={goHome} preselectedRole={userRole} />}

      {route === 'dashboard' && <Dashboard onBack={goHome} userRole={userRole} />}

      <Footer />
    </div>
  );
};

export default App;
