import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What ages do you work with?",
    answer: "We support learners from ages 3 to 14, offering tailored programs for early childhood through middle school. Each program is designed to match developmental stages and learning needs."
  },
  {
    question: "How are sessions structured?",
    answer: "Our sessions combine direct instruction, hands-on Montessori activities, and independent practice. Each learner follows a personalized plan that adapts to their pace, interests, and goals."
  },
  {
    question: "Do you offer group or one-on-one sessions?",
    answer: "We offer both! One-on-one sessions provide maximum personalization, while our small group sessions (3-5 students) encourage peer learning and social development. You can choose based on your child's needs."
  },
  {
    question: "How do you track my child's progress?",
    answer: "We use regular assessments, observation notes, and milestone tracking to monitor progress. Parents receive detailed reports and are invited to quarterly meetings to discuss their child's development."
  },
  {
    question: "What subjects do you cover?",
    answer: "We cover a comprehensive range including literacy, numeracy, science, social studies, and executive functioning skills. Our Montessori-inspired approach ensures a well-rounded educational experience."
  },
  {
    question: "How do I get started?",
    answer: "Getting started is easy! Simply reach out through our contact form or give us a call. We'll schedule a free consultation to understand your child's strengths, interests, and learning goals, then recommend the best program for your family."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white py-20 px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
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
              className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900 pr-4">{item.question}</span>
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