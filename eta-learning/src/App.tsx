import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Section from './components/Section';
import Footer from './components/Footer';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';

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
            <div id="programs" className="flex justify-center">
              <img
                src={`${process.env.PUBLIC_URL}/ETA-programs.webp`}
                alt="ETA Learning Program Packages"
                className="max-w-full rounded-xl shadow-lg"
              />
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
          <Testimonials />
          <FAQ />
          <div id="contact" className="mt-8">
            <Contact />
          </div>
        </>
      )}

      {route === 'login' && <Login onLogin={goToDashboard} onBack={goHome} />}

      {route === 'dashboard' && <Dashboard onBack={goHome} userRole={userRole} />}

      <Footer />
    </div>
  );
};

export default App;
