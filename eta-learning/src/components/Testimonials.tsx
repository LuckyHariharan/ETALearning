import React, { useState } from 'react';

interface Testimonial {
  name: string;
  avatar: string;
  rating: number;
  text: string;
  googleUrl: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Jessica Murphy",
    avatar: "Jessica_Murphy.png",
    rating: 5,
    text: "Our family has had a wonderful experience with ETA Learning. We have two daughters enrolled, ages 8 and 3, and they have been learning with Diya for the past year.",
    googleUrl: "https://share.google/1ksniR46lHTq7FyTu",
  },
  {
    name: "Katherine Ward",
    avatar: "Katherine Ward.png",
    rating: 5,
    text: "We have seen such tremendous growth in our daughter since starting at ETA Learning. What is particularly impressive is that the teachers strike the balance of making it supportive, effective and also fun. My daughter loves going every week.",
    googleUrl: "https://share.google/NVxGaUOo5o7xtDOXr",
  },
  {
    name: "Aby Logan",
    avatar: "Aby Logan.png",
    rating: 5,
    text: "We've had an amazing experience with ETA Learning! My daughter has been attending for the past 3 years, and before that she was a student of Diya's from the age of 2. She takes both Math and English, and we've seen a huge advancement in her learning.",
    googleUrl: "https://share.google/7LC4IsK17HS9RkbvC",
  },
  {
    name: "Mechelle Pilgrim Bain",
    avatar: "Mechelle Pilgrim Bain.png",
    rating: 5,
    text: "We've been with Diya way before she started ETA, and we couldn't be happier with our experience. Zee has always felt so comfortable with Diya, and that has made such a difference in her learning. She has a wonderful way of making math fun.",
    googleUrl: "https://share.google/8S9jC1TJYBo1eP4Cv",
  },
  {
    name: "Mohammed Ahmed Wazir",
    avatar: "Mohammed Ahmed Wazir.png",
    rating: 5,
    text: "My kids have been learning with ETA tutoring program for a while, and the improvement has been incredible. Diya is patient, professional, and truly cares about my kids' progress. My children look forward to every session, and their confidence has grown so much. Highly recommended.",
    googleUrl: "https://share.google/a3LgLiPcQqayXVZO7",
  },
  {
    name: "Hanan Abdosh",
    avatar: "Hanan Abdosh.png",
    rating: 5,
    text: "It has been about a year since my children started with the ETA tutoring program, and the experience has been exceptional. Focusing on math and language, we have seen remarkable improvement in their academic progress and confidence.",
    googleUrl: "https://share.google/YdQdIVCqPlMMhjkTj",
  },
  {
    name: "Novie",
    avatar: "Novie.png",
    rating: 5,
    text: "We've been with Diya since 2022, and we couldn't be happier with the support she has given our daughter. She takes the time to understand my daughter's needs and teaches with kindness and dedication.",
    googleUrl: "https://share.google/79NSwGyxHSv5195EP",
  },
  {
    name: "Jacqueline Vong",
    avatar: "Jacqueline Vong.png",
    rating: 5,
    text: "We have been with ETA since the beginning with our 2 children from Kindergarten into elementary schools. She's instilled the fundamentals of reading, writing and math. My youngest son was so proud of his improvement over this year!",
    googleUrl: "https://share.google/5ZgMIfgxvjCDlB7cC",
  },
  {
    name: "Debbie Tsialafos",
    avatar: "Debbie Tsialafos.png",
    rating: 5,
    text: "We have seen a night-and-day difference in our daughter's math abilities in just a few weeks since starting with ETA. Her confidence has grown so much, and she is making amazing progress. We are so happy we chose ETA and cannot wait to see what she accomplishes next.",
    googleUrl: "https://share.google/DV4vTtYlqlQmPRZwq",
  },
  {
    name: "A Pleased Parent",
    avatar: "A Pleased Parent.png",
    rating: 5,
    text: "Grade 7 math (2025/2026) initially proved to be challenging for our son who expressed overwhelm toward new concepts and anxiety over test-taking. We were extremely pleased with the support and guidance we received from ETA.",
    googleUrl: "https://share.google/KaTuXLZZqPpRmImON",
  },
  {
    name: "Rajesh Khanna",
    avatar: "rajesh khanna.png",
    rating: 5,
    text: "Diya's commitment to her students and her interest in seeing their growth and success is wonderful. Rare to find this in today's mechanical and fast pace world.",
    googleUrl: "https://share.google/Q3U2xqX9AoYn07fkO",
  },
  {
    name: "Amy CM",
    avatar: "Amy CM.png",
    rating: 5,
    text: "My child had been with ETA at the beginning. She enjoys going to every class. The instructors are very patient and will take the time to explain instructions at their level. Definitely recommended!",
    googleUrl: "https://share.google/ZtgWkeGBZQlaWqQxR",
  },
  {
    name: "Sifat E Tahsin",
    avatar: "Sifat E Tahsin.png",
    rating: 5,
    text: "Enrolling our daughter at ETA Learning last summer was one of the best decisions we made. We wanted to give her a strong foundation before starting school, and the progress she has made has exceeded all our expectations.",
    googleUrl: "https://share.google/AIdi32l6Qg8Z5iRCV",
  },
  {
    name: "Sasha Mehra",
    avatar: "Sasha Mehra.png",
    rating: 5,
    text: "Miss Diya is the most hardworking teacher. It's so refreshing to see teachers care about early development and foundational learning! She also tries a personalised approach for each student!",
    googleUrl: "https://share.google/mHhdTBFYdWvI3b1O9",
  },
];

const Testimonials: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? testimonials : testimonials.slice(0, 5);

  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          What Parents Are Saying
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow flex flex-col"
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
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                &ldquo;{item.text}&rdquo;
              </p>
              <a
                href={item.googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors self-start"
              >
                <span className="inline-flex items-center justify-center">
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path className="fill-[#4285F4]" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path className="fill-[#34A853]" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path className="fill-[#FBBC05]" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path className="fill-[#EA4335]" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </span>
                Read on Google
              </a>
            </div>
          ))}
        </div>
        {/* Mobile/tablet: reveal the remaining cards under the fold */}
        {!showAll && (
          <div className="text-center mt-8 lg:hidden">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center justify-center rounded-full bg-mainBlue px-8 py-3.5 text-base font-semibold text-white transition duration-300 hover:bg-mainPink min-h-[48px]"
            >
              Show More Testimonials
            </button>
          </div>
        )}
        <div className="text-center mt-10">
          <a
            href="https://www.google.com/maps/place/ETA+Learning/reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-mainPink px-8 py-3.5 text-base font-semibold text-white transition duration-300 hover:bg-mainBlue min-h-[48px] gap-2"
          >
            View All Google Reviews
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;