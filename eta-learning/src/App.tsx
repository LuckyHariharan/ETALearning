import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Section from './components/Section';
import Footer from './components/Footer';

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
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
      <Footer />
    </div>
  );
};

export default App;
