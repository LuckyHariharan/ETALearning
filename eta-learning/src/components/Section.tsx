import React from 'react';

interface SectionProps {
  title: string;
  bgColor: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, bgColor, children }) => {
  return (
    <section className={`${bgColor} py-20 px-4 md:px-8 animate-fade-in-up`}>
      <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
      <div className="max-w-4xl mx-auto text-gray-700 text-lg">{children}</div>
    </section>
  );
};

export default Section;
