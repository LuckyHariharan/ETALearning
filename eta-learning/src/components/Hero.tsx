import React from 'react';

interface HeroProps {
  onStart?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <section className="bg-white text-center py-20 px-4">
      <h1 className="text-4xl font-bold text-mainPink">
        Where <span className="text-mainBlue">Montessori</span> Meets <span className="text-mainPink">Tradition.</span>
      </h1>
      <p className="mt-4 text-lg text-gray-700">
        At Enhance to Advance, we pride ourselves on our exclusive tutoring program,
        ensuring individualized success beyond the classroom.
      </p>
      <button
        onClick={() => onStart && onStart()}
        className="mt-6 px-6 py-3 bg-mainPink text-white rounded hover:bg-mainBlue"
      >
        Take Our 5-Minute Questionnaire
      </button>
    </section>
  );
};

export default Hero;
