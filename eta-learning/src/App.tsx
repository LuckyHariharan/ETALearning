import { useState, useEffect, useCallback } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import Hero from './components/Hero';
import Section from './components/Section';
import Footer from './components/Footer';
import Login from './components/Login';
import Contact from './components/Contact';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Programs from './components/Programs';
import Questionnaire from './components/Questionnaire';
import ImageModal from './components/ImageModal';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ConstructionModal from './components/ConstructionModal';
import { supabase } from './lib/supabase';

const App: React.FC = () => {
  const [route, setRoute] = useState<'home' | 'login' | 'dashboard' | 'testimonials'>('home');
  const [userRole, setUserRole] = useState<'admin' | 'parent' | undefined>(undefined);
  const [profileName, setProfileName] = useState<string | null>(null);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [constructionModalOpen, setConstructionModalOpen] = useState(true);
  const dismissConstructionModal = useCallback(() => setConstructionModalOpen(false), []);

  // Navbar uses this small SPA helper to change routes.
  useEffect(() => {
    (window as any).setAppRoute = (r: string) => {
      if (r === 'home' || r === 'login' || r === 'dashboard' || r === 'testimonials') setRoute(r as any);
    };
    return () => {
      try { delete (window as any).setAppRoute; } catch {}
    };
  }, []);

  useEffect(() => {
    let active = true;
    let sessionCheck = 0;

    const syncSession = async (session: Session | null) => {
      const check = ++sessionCheck;
      if (!session) {
        setAuthUser(null);
        setUserRole(undefined);
        setProfileName(null);
        setAuthLoading(false);
        setRoute((current) => current === 'dashboard' ? 'home' : current);
        return;
      }

      setAuthLoading(true);
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('full_name, role, is_active')
          .eq('id', session.user.id)
          .maybeSingle();

        if (!active || check !== sessionCheck) return;
        if (error) throw new Error(`Unable to load your ETA profile: ${error.message}`);
        if (!profile || profile.is_active !== true || (profile.role !== 'admin' && profile.role !== 'parent')) {
          throw new Error('This account does not have an active ETA profile. Please contact an administrator.');
        }

        setAuthUser(session.user);
        setUserRole(profile.role);
        setProfileName(profile.full_name);
        setAuthError(null);
        setRoute('dashboard');
      } catch (error) {
        if (!active || check !== sessionCheck) return;
        setAuthUser(null);
        setUserRole(undefined);
        setProfileName(null);
        setAuthError(error instanceof Error ? error.message : 'Unable to verify your ETA profile.');
        setRoute('login');
        const { error: signOutError } = await supabase.auth.signOut();
        if (signOutError) {
          setAuthError(`${error instanceof Error ? error.message : 'Unable to verify your ETA profile.'} Sign-out failed: ${signOutError.message}`);
        }
      } finally {
        if (active && check === sessionCheck) setAuthLoading(false);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      window.setTimeout(() => {
        if (active) void syncSession(session);
      }, 0);
    });

    void supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return;
      if (error) {
        setAuthError(`Unable to restore your Supabase session: ${error.message}`);
        setAuthLoading(false);
        return;
      }
      void syncSession(data.session);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    document.body.dataset.route = route;
  }, [route]);

  useEffect(() => {
    if (!authLoading && route === 'dashboard' && (!authUser || !userRole)) setRoute('login');
  }, [authLoading, authUser, route, userRole]);

  const goToLogin = () => {
    setAuthError(null);
    setRoute('login');
  };
  const signIn = async (email: string, password: string) => {
    setAuthError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
  };
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  };
  const goHome = () => setRoute('home');
  const goTestimonials = () => setRoute('testimonials');

  // Scroll to an in-home section anchor; if on another route, switch to home first.
  const goAnchor = (anchor: string) => {
    const onHome = document.body.dataset.route === 'home';
    const scroll = () => {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    if (onHome) {
      scroll();
    } else {
      setRoute('home');
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(scroll);
      });
    }
  };

  const [questionnaireOpen, setQuestionnaireOpen] = useState(false);
  const [imageModalOpen, setImageModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <Navbar onAnchor={goAnchor} onTestimonials={goTestimonials} />

      {route === 'home' && (
        <>
          <Hero onStart={() => goToLogin()} onQuestionnaire={() => setQuestionnaireOpen(true)} />

          {/* Proof Strip — inverted triangle on sm+: 3 on top, 2 nestled in the gaps */}
          <section className="bg-mainBlue py-6 px-4">
            <div className="max-w-6xl mx-auto flex flex-col items-center gap-y-4 text-center text-white text-base md:text-lg font-medium lg:text-xl lg:font-bold lg:gap-y-5">
              {/* Top row — 3 evenly spaced (stacks on mobile) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-y-3 sm:gap-x-4 lg:gap-x-10">
                <span className="px-2">18 months–18 years+</span>
                <span className="px-2">3:1 student-to-tutor ratio</span>
                <span className="px-2">Take-home materials included</span>
              </div>
              {/* Bottom row — 2 items, center-anchored below the gaps of the top 3 */}
              <div className="w-full flex flex-col sm:flex-row md:flex-row items-center justify-center gap-x-24 md:gap-x-40 lg:gap-x-52 gap-y-3 sm:px-[16.67%] sm:mt-2">
                <span className="px-2 flex-shrink-0 whitespace-nowrap">Parent portal</span>
                <span className="px-2 flex-shrink-0 whitespace-nowrap">In-Person (all ages) + Online (7+)</span>
              </div>
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

          {/* Testimonials anchored by #testimonials */}
          <div id="testimonials">
            <Testimonials />
          </div>
          <FAQ />
          <div id="contact" className="mt-8">
            <Contact />
          </div>
          <Footer onGo={goAnchor} onTestimonials={goTestimonials} onContact={() => goAnchor('contact')} />
        </>
      )}

      {route === 'login' && <Login onLogin={signIn} onBack={goHome} error={authError} />}

      {route === 'dashboard' && authUser && userRole && (
        <Dashboard
          onBack={goHome}
          onSignOut={signOut}
          userRole={userRole}
          userId={authUser.id}
          profileName={profileName}
        />
      )}

      {route === 'testimonials' && (
        <>
          <Testimonials variant="page" onBack={goHome} />
          <Footer onGo={goAnchor} onTestimonials={goTestimonials} onContact={() => goAnchor('contact')} />
        </>
      )}
      <Questionnaire open={questionnaireOpen} onClose={() => setQuestionnaireOpen(false)} />
      {route === 'home' && (
        <ImageModal
          src={`${process.env.PUBLIC_URL}/eta-programs.webp`}
          alt="ETA Learning Program Packages"
          open={imageModalOpen}
          onClose={() => setImageModalOpen(false)}
        />
      )}
      {constructionModalOpen && (
        <ConstructionModal onClose={dismissConstructionModal} />
      )}
    </div>
  );
};

export default App;
