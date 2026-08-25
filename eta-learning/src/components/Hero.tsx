import React from 'react';

interface HeroProps {
  onStart?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="bg-white text-center py-20 px-4 animate-fade-in-up">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-mainPink tracking-tight leading-tight">
          ETA Learning
        </h1>
        <p className="mt-5 text-lg text-gray-700 sm:text-xl">
          A trusted tutoring and educational enrichment centre serving families across Toronto and the GTA.
        </p>
        <p className="mt-4 text-base text-gray-600">
          Drawing on modern principles of psychology, Montessori philosophies, learning science, and traditional, proven classroom-based practices, our programs focus on both behavioural and academic development.
        </p>
        <p className="mt-4 text-base text-gray-600">
          We help children build strong academic foundations and real-world skills, advance beyond grade level, and reach their full potential—while strengthening their confidence, resilience, and independence.
        </p>
        <p className="mt-4 text-base text-gray-600">
          Whether your child is looking to enhance areas of need, advance beyond grade level, or both—ETA Learning is the perfect fit.
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
