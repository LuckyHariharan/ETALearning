import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Section from './components/Section';
import Footer from './components/Footer';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [route, setRoute] = useState<'home' | 'login' | 'dashboard'>('home');

  const goToLogin = () => setRoute('login');
  const goToDashboard = () => setRoute('dashboard');
  const goHome = () => setRoute('home');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {route === 'home' && (
        <>
          <Hero onStart={goToLogin} />

          <Section title="Holistic and Personalized Curriculum" bgColor="bg-babyBlue">
            <p>
              Every child is unique. We believe that every student deserves a personalized learning strategy tailored to their unique needs.
            </p>
          </Section>
          <Section title="Behavioral Development" bgColor="bg-white">
            <p>
              Success is measured beyond classroom achievements. Good grades alone will not equip your child to face obstacles in the real world.
            </p>
          </Section>
          <Section title="Hands-On and Take Home Materials" bgColor="bg-babyPink">
            <p>
              Science has proven, time and time again, that learning with a hands-on activity develops a deep, conceptual understanding.
            </p>
          </Section>
        </>
      )}

      {route === 'login' && <Login onLogin={goToDashboard} onBack={goHome} />}

      {route === 'dashboard' && <Dashboard onBack={goHome} />}

      <Footer />
    </div>
  );
};

export default App;
