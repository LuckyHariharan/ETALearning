import React from 'react';

interface HeroProps {
  onStart?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="bg-white text-center py-20 px-4 animate-fade-in-up">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-mainPink tracking-tight leading-tight">
          ETA Montessori coaching for confident, joyful academic growth
        </h1>
        <p className="mt-5 text-lg text-gray-700 sm:text-xl">
          Personalized learning pathways that combine Montessori methods with proven academic strategies, designed to build independence and real-world readiness.
        </p>
        <button
          onClick={() => onStart && onStart()}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-mainPink px-8 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-mainBlue"
        >
          Start your journey
        </button>
      </div>
    </section>
  );
};

export default Hero;
