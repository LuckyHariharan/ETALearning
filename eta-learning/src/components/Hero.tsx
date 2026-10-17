import React from 'react';

interface HeroProps {
  onStart?: () => void;
  onQuestionnaire?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart, onQuestionnaire }) => {
  return (
    <section
      className="relative text-center h-max py-12 md:pt-28 md:pb-24 lg:pt-32 lg:pb-28 px-4 animate-fade-in-up"
    >
      {/* Photo background — bright classroom scene, swap URL anytime for your own shot */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1920&q=80')",
        }}
      />
      {/* Soft white overlay keeps text readable — tune opacity if you want more photo visible */}
      <div className="absolute inset-0 bg-white/75" />

      {/* Content sits above the bg + overlay */}
      <div className="relative z-10 mx-auto max-w-5xl flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-mainPink tracking-tight leading-tight">
          ETA Learning
        </h1>
        <p className="mt-6 md:mt-8 lg:mt-7 text-2xl sm:text-3xl lg:text-4xl font-semibold text-black">
          Help your child understand the work—not just finish it.
        </p>
        <p className="mt-4 md:mt-6 lg:mt-6 text-xl lg:text-2xl text-mainBlue font-medium">
          Hands-on learning. Foundations that last. Success beyond the classroom.
        </p>
        <p className="mt-4 md:mt-6 lg:mt-5 text-lg lg:text-xl text-black">
          Small-group, <strong>3:1 tutoring</strong> ensures individualized attention.
        </p>
        <p className="mt-6 md:mt-8 lg:mt-8 max-w-3xl lg:max-w-4xl text-lg lg:text-xl text-gray-700 leading-relaxed">
          A blend of Montessori-inspired learning with structured academic support.
          Each child receives a personalized plan, take-home reinforcement, assessments, and clear progress updates every session.
        </p>
        <button
          onClick={() => onQuestionnaire ? onQuestionnaire() : onStart && onStart()}
          className="mt-10 mb-6 w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-mainPink px-6 sm:px-10 lg:px-16 py-4 sm:py-4 lg:py-5 text-sm sm:text-base lg:text-lg font-semibold text-white transition duration-300 hover:bg-mainBlue break-words"
        >
          2-minute parent questionnaire. No obligation. We'll recommend the next step.
        </button>
      </div>
    </section>
  );
};

export default Hero;
