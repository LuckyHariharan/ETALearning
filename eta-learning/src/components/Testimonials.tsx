import React, { useEffect, useRef, useState } from 'react';

const testimonials = [
  {
    name: "Jessica Murphy",
    avatar: "Jessica_Murphy.png",
    rating: 5,
    text: "Our family has had a wonderful experience with ETA Learning. We have two daughters enrolled, ages 8 and 3, and they have been learning with Diya for the past year."
  },
  {
    name: "Katherine Ward",
    avatar: "Katherine Ward.png",
    rating: 5,
    text: "We have seen such tremendous growth in our daughter since starting at ETA Learning. What is particularly impressive is that the teachers strike the balance of making it supportive, effective and also fun. My daughter loves going every week."
  },
  {
    name: "Aby Logan",
    avatar: "Aby Logan.png",
    rating: 5,
    text: "We've had an amazing experience with ETA Learning! My daughter has been attending for the past 3 years, and before that she was a student of Diya's from the age of 2. She takes both Math and English, and we've seen a huge advancement in her learning."
  },
  {
    name: "Mechelle Pilgrim Bain",
    avatar: "Mechelle Pilgrim Bain.png",
    rating: 5,
    text: "We've been with Diya way before she started ETA, and we couldn't be happier with our experience. Zee has always felt so comfortable with Diya, and that has made such a difference in her learning. She has a wonderful way of making math fun."
  },
  {
    name: "Mohammed Ahmed Wazir",
    avatar: "Mohammed Ahmed Wazir.png",
    rating: 5,
    text: "My kids have been learning with ETA tutoring program for a while, and the improvement has been incredible. Diya is patient, professional, and truly cares about my kids' progress. My children look forward to every session, and their confidence has grown so much. Highly recommended."
  },
  {
    name: "Hanan Abdosh",
    avatar: "Hanan Abdosh.png",
    rating: 5,
    text: "It has been about a year since my children started with the ETA tutoring program, and the experience has been exceptional. Focusing on math and language, we have seen remarkable improvement in their academic progress and confidence."
  },
  {
    name: "Novie",
    avatar: "Novie.png",
    rating: 5,
    text: "We've been with Diya since 2022, and we couldn't be happier with the support she has given our daughter. She takes the time to understand my daughter's needs and teaches with kindness and dedication."
  },
  {
    name: "Jacqueline Vong",
    avatar: "Jacqueline Vong.png",
    rating: 5,
    text: "We have been with ETA since the beginning with our 2 children from Kindergarten into elementary schools. She's instilled the fundamentals of reading, writing and math. My youngest son was so proud of his improvement over this year!"
  },
  {
    name: "Debbie Tsialafos",
    avatar: "Debbie Tsialafos.png",
    rating: 5,
    text: "We have seen a night-and-day difference in our daughter's math abilities in just a few weeks since starting with ETA. Her confidence has grown so much, and she is making amazing progress. We are so happy we chose ETA and cannot wait to see what she accomplishes next."
  },
  {
    name: "A Pleased Parent",
    avatar: "A Pleased Parent.png",
    rating: 5,
    text: "Grade 7 math (2025/2026) initially proved to be challenging for our son who expressed overwhelm toward new concepts and anxiety over test-taking. We were extremely pleased with the support and guidance we received from ETA."
  },
  {
    name: "Rajesh Khanna",
    avatar: "rajesh khanna.png",
    rating: 5,
    text: "Diya's commitment to her students and her interest in seeing their growth and success is wonderful. Rare to find this in today's mechanical and fast pace world."
  },
  {
    name: "Amy CM",
    avatar: "Amy CM.png",
    rating: 5,
    text: "My child had been with ETA at the beginning. She enjoys going to every class. The instructors are very patient and will take the time to explain instructions at their level. Definitely recommended!"
  },
  {
    name: "Sifat E Tahsin",
    avatar: "Sifat E Tahsin.png",
    rating: 5,
    text: "Enrolling our daughter at ETA Learning last summer was one of the best decisions we made. We wanted to give her a strong foundation before starting school, and the progress she has made has exceeded all our expectations."
  },
  {
    name: "Sasha Mehra",
    avatar: "Sasha Mehra.png",
    rating: 5,
    text: "Miss Diya is the most hardworking teacher. It's so refreshing to see teachers care about early development and foundational learning! She also tries a personalised approach for each student!"
  }
];

const Testimonials: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const container = scrollRef.current;
    if (!container) return;

    let pos = 0;
    const speed = 0.5; // pixels per frame
    const interval = setInterval(() => {
      pos -= speed;
      const maxScroll = -(container.scrollWidth / 2);
      if (pos <= maxScroll) {
        pos = 0;
      }
      container.style.transform = `translateX(${pos}px)`;
    }, 16);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-20 px-4 overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
        What Parents Are Saying
      </h2>
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex gap-6 max-w-7xl mx-auto will-change-transform"
        style={{ width: 'max-content' }}
      >
        {[...testimonials, ...testimonials].map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 w-80 flex-shrink-0 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <img
                src={`${process.env.PUBLIC_URL}/${item.avatar}`}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">{item.name}</p>
                <div className="flex text-yellow-400 text-sm">
                  {'★'.repeat(item.rating)}
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              "{item.text}"
            </p>
            <div className="mt-3 flex items-center gap-1 text-xs text-gray-400">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 5.268a7.486 7.486 0 0 0-3.512-6.322A7.486 7.486 0 0 0 12 0C5.373 0 0 5.373 0 12c0 2.323.88 4.452 2.344 6.134L20.5 23.5l.166-.166c1.09-1.09 1.89-2.517 2.234-4.093A7.486 7.486 0 0 0 24 12a7.486 7.486 0 0 0-2-5.732z"/>
              </svg>
              Google Review
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;