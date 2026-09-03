import React from 'react';

interface HeroProps {
  onStart?: () => void;
  onQuestionnaire?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart, onQuestionnaire }) => {
  return (
    <section className="bg-white text-center h-max py-24 lg:py-60 px-4 animate-fade-in-up">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-mainPink tracking-tight leading-tight">
          ETA Learning
        </h1>
        <p className="mt-3 text-xl sm:text-2xl font-semibold text-black">
          Help your child understand the work—not just finish it.
        </p>
        <p className="mt-2 text-lg text-mainBlue font-medium">
          Hands-on learning. Foundations that last. Success beyond the classroom.
        </p>
        <p className="mt-1 text-base text-black">
          Small-group, <strong>3:1 tutoring</strong> ensures individualized attention.
        </p>
        <p className="mt-5 text-base text-gray-700">
          A blend of Montessori-inspired learning with structured academic support.
          Each child receives a personalized plan, take-home reinforcement, assessments, and clear progress updates every session.
        </p>
        <button
          onClick={() => onQuestionnaire ? onQuestionnaire() : onStart && onStart()}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-mainPink px-8 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-mainBlue"
        >
          2-minute parent questionnaire. No obligation. We'll recommend the next step.
        </button>
      </div>
    </section>
  );
};

export default Hero;
