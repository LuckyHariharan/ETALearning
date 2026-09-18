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
import Programs from './components/Programs';
import Questionnaire from './components/Questionnaire';
import ImageModal from './components/ImageModal';

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
  const [questionnaireOpen, setQuestionnaireOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navbar />

      {route === 'home' && (
        <>
          <Hero onStart={() => goToLogin()} onQuestionnaire={() => setQuestionnaireOpen(true)} />

          {/* Proof Strip */}
          <section className="bg-mainBlue py-6 px-4">
            <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-4 text-white text-sm font-medium">
              <span>18 months–18 years+</span>
              <span className="hidden sm:inline">•</span>
              <span>3:1 student-to-tutor ratio</span>
              <span className="hidden sm:inline">•</span>
              <span>Take-home materials included</span>
              <span className="hidden sm:inline">•</span>
              <span>Parent portal</span>
              <span className="hidden sm:inline">•</span>
              <span>In-person tutoring</span>
              <span className="hidden sm:inline">•</span>
              <span>Online tutoring (7+)</span>
            </div>
          </section>

          <Section title="ETA Program Packages" bgColor="bg-white">
            <div id="programs" className="w-full -mx-2 sm:-mx-6 lg:-mx-10 px-2 sm:px-6 lg:px-10 py-8 sm:py-12">
              <button
                type="button"
                onClick={() => setImageModalOpen(true)}
                aria-label="View ETA Learning Program Packages in fullscreen"
                className="group block mx-auto w-full max-w-6xl cursor-pointer"
              >
                <img
                  src={`${process.env.PUBLIC_URL}/eta-programs.webp`}
                  alt="ETA Learning Program Packages"
                  loading="lazy"
                  className="w-full h-auto rounded-2xl shadow-xl ring-1 ring-black/5 transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:scale-[1.01] group-hover:shadow-2xl hover:scale-[1.005]"
                />
              </button>
            </div>
          </Section>

          <Programs />

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
      <Questionnaire open={questionnaireOpen} onClose={() => setQuestionnaireOpen(false)} />
      {route === 'home' && (
        <ImageModal
          src={`${process.env.PUBLIC_URL}/eta-programs.webp`}
          alt="ETA Learning Program Packages"
          open={imageModalOpen}
          onClose={() => setImageModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
