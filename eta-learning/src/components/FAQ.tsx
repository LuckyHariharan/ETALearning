import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What is Montessori-based tutoring?",
    answer: "Our tutoring approach incorporates Montessori principles and Montessori materials into the program. This design particularly shapes children's behaviour, discipline, independence, focus and approach to learning.\n\nMontessori materials and hands-on activities engage multiple areas of the brain through hands-on, visual, and tactile activities, offering an interactive alternative to traditional pen-and-paper learning. These methods promote deeper conceptual understanding and retention and can be particularly beneficial for neurodivergent learners. Many parents even choose to purchase these beloved materials for home use, reinforcing learning and making homework more fun!"
  },
  {
    question: "What ages and grade levels do you work with?",
    answer: "ETA supports learners 18 months to 18 years, from toddlers through high school. Our mixed-age classrooms encourage leadership and role-modeling in older students while providing positive peer learning for younger children.\n\nYoung children must be potty trained or wear a diaper during sessions."
  },
  {
    question: "How do you personalize tutoring for each child?",
    answer: "Every child begins with an enrollment assessment to identify their strengths, areas of need, and learning gaps. We then create a personalized curriculum. Every session, lesson plans and homework are modified based on each child's progression and needs. Ongoing formal assessments allow us to track progress and tailor plans as they grow.\n\nNo two children follow the same program."
  },
  {
    question: "Can you support both struggling and advanced learners?",
    answer: "Yes. The balance of enhancing and advancing is at the heart of our approach—and is why our enrollment assessment is vital to build the student's curriculum.\n\nThe average ETA student is introduced to concepts up to two grade levels ahead, while filling the gaps in their foundation."
  },
  {
    question: "How do you assess progress and communicate with parents?",
    answer: "Our 3:1 student-to-teacher ratio allows us to closely observe learning supported with homework review, and formal assessments.\n\nParents receive verbal updates and written session reports after every session, available 24/7. Our system also provides 24/7 access to financial account information and records for added transparency."
  },
  {
    question: "Does my child need to attend a Montessori school?",
    answer: "No. Our Montessori-inspired approach is designed to make the benefits of Montessori learning more accessible to families, regardless of the type of school their child attends.\n\nStudents from non-Montessori schools benefit from the alternative approach to learning, building confidence, independence, and comfort in their school classroom. Children who attend Montessori schools may especially benefit from the familiarity and overlap between our approach and their classroom experience."
  },
  {
    question: "How often should my child attend and is homework mandatory?",
    answer: "We recommend two sessions per week with regular homework to maximize reinforcement, retention, and progress. This is the foundation of our program and is designed to provide consistent practice between sessions.\n\nOur experience shows clear, efficient and consistent results when families follow our recommended regimens."
  },
  {
    question: "What is the cancellation or rescheduling policy?",
    answer: "Cancellations made after 9:00 AM on the day of a session will be charged in full. No exceptions.\n\nMake-up sessions can be booked at any time by contacting admin."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white py-20 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
        Frequently Asked Questions
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between p-5 min-h-[56px] text-left hover:bg-gray-50 transition-colors"
              aria-expanded={openIndex === index}
            >
              <span className="font-semibold text-gray-900 pr-4 text-base">{item.question}</span>
              <svg
                className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;