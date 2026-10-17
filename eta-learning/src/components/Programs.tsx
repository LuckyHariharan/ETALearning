import React from 'react';

const programs = [
  {
    title: 'ETA Tots',
    age: '18 months–2 years',
    points: [
      '30 min paid session + 15 min free play (parent must be present for full 45 minutes)',
      'Montessori-based, play-based, and music-based learning',
      'Exposure to letters, numbers, tracing, real-world concepts and 1-step instruction',
      'Program develops classroom etiquette, communication, and fine-motor skills',
      'Fosters independence, curiosity, confidence, and a love of learning',
    ],
  },
  {
    title: 'ETA Tinies',
    age: '2–7 years',
    points: [
      'Montessori-based, play-based learning with worksheets',
      'Builds foundations in literacy, numeracy, writing, problem-solving & real-world skills',
      'Introduction to abstract, complex concepts up to 2 grade levels ahead',
      'Program develops independence, curiosity, confidence, and critical thinking',
      'Expectations foster self-regulation, responsibility, and resilience',
    ],
  },
  {
    title: 'ETA Tykes',
    age: '7–11 years',
    points: [
      'Montessori-based learning with worksheets',
      'Supports students in mastering abstract concepts in literacy, writing, and arithmetic',
      'Builds critical thinking, problem-solving skills, and real-world connections',
      'Expectations heightened to foster initiative, curiosity, leadership, test-taking skills, time management, and effective study habits',
    ],
  },
  {
    title: 'ETA Tweens & Teens',
    age: '11+ years',
    points: [
      'Worksheet-focused academic program supported by Montessori philosophies',
      'Supports academic advancement and filling foundational learning gaps',
      'Introduces middle and high school-level concepts',
      'Builds real-world skills, including financial planning and professional communication',
      'Fosters leadership, discipline, initiative, proactive study habits, curiosity, critical thinking, and test-taking skills',
    ],
  },
  {
    title: 'Test Prep',
    age: 'High school & University (13+ years)',
    points: [
      'Targeted preparation for mid-school, high school, and university entrance/standardized exams',
      'Exam-specific strategy, time management, and pressure-tested practice conditions',
      'Diagnostic review to pinpoint gaps and focus study on highest-yield areas',
      'Builds confidence and composure for high-stakes testing situations',
    ],
  },
  {
    title: 'Notetaking Skills',
    age: 'High school & University (13+ years)',
    points: [
      'Structured note-taking frameworks for lectures, textbooks, and study groups',
      'Develops efficient capture, organization, and review systems',
      'Covers Cornell method, mind mapping, and active listening techniques',
      'Prepares students for independent academic study in high school and university',
    ],
  },
  {
    title: 'Lecture Skills',
    age: 'High school & University (13+ years)',
    points: [
      'Builds active listening, question formulation, and in-class engagement',
      'Strengthens cross-examination and verbal response skills for mid-school and university exams',
      'Develops academic vocabulary and professional communication',
      'Supports confidence in oral examinations and presentations',
    ],
  },
];

const Programs: React.FC = () => {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-black">
          Programs
          <span className="block mt-2 text-base font-medium text-gray-500">
            Montessori foundations • Play-based • Cognitive-stage placement
          </span>
        </h2>
        <div className="space-y-12">
          {programs.map((prog, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-6 md:p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-black">
                {prog.title} <span className="text-mainBlue font-medium">| {prog.age}</span>
              </h3>
              <ul className="mt-4 space-y-2">
                {prog.points.map((point, j) => (
                  <li key={j} className="flex items-start gap-3 text-base md:text-lg text-gray-700">
                    <span className="text-mainBlue mt-1 flex-shrink-0">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-base text-gray-600">
          Groups are based on formal cognitive stages of development rather than created age ranges. Since every child develops differently, placement within the program is flexible and tailored to each learner.
        </p>
      </div>
    </section>
  );
};

export default Programs;