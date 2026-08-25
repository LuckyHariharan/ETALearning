import React, { useEffect, useRef, useState } from 'react';

const testimonials = [
  {
    name: "Sarah Thompson",
    avatar: "ETA-Aby-Logan.png",
    rating: 5,
    text: "ETA Learning has been incredible for my daughter. Her confidence has grown so much and she actually looks forward to her sessions!"
  },
  {
    name: "Michael Chen",
    avatar: "ETA-Amy-CM.png",
    rating: 5,
    text: "The personalized approach really makes a difference. My son has improved tremendously in reading comprehension."
  },
  {
    name: "Jennifer Williams",
    avatar: "ETA-Hanon-Abdosh.png",
    rating: 5,
    text: "We've tried several tutoring services before, but ETA Learning stands out for their genuine care and structured approach."
  },
  {
    name: "David Park",
    avatar: "ETA-Jacqueline-Vong.png",
    rating: 5,
    text: "The Montessori methods combined with academic rigor is exactly what my child needed. Highly recommend!"
  },
  {
    name: "Rachel Foster",
    avatar: "ETA-Jessica-Murphy.png",
    rating: 5,
    text: "My daughter went from struggling to excelling. The team at ETA truly understands how children learn best."
  },
  {
    name: "Amanda Lewis",
    avatar: "ETA-Katherine-Ward.png",
    rating: 5,
    text: "The progress reports keep us informed and the results speak for themselves. Thank you ETA!"
  },
  {
    name: "Thomas Anderson",
    avatar: "ETA-Mechell-Pilgrim-Bain.png",
    rating: 5,
    text: "Both of my children attend and the improvement has been remarkable. They enjoy every session."
  },
  {
    name: "Priya Sharma",
    avatar: "ETA-Mohammed-Ahmed-Wazir.png",
    rating: 5,
    text: "Professional, patient, and effective. ETA Learning has given my child the tools to succeed independently."
  },
  {
    name: "Karen Mitchell",
    avatar: "ETA-Novie.png",
    rating: 5,
    text: "The hands-on materials and engaging approach make learning fun. My child has blossomed here."
  },
  {
    name: "Robert Garcia",
    avatar: "ETA-Rajes-Khanna.png",
    rating: 5,
    text: "I saw improvements within the first month. The educators are experienced and genuinely passionate."
  },
  {
    name: "Lisa Chang",
    avatar: "ETA-sasha-mehra.png",
    rating: 5,
    text: "Best investment in my child's education. The holistic approach covers academics and behavioral development."
  },
  {
    name: "Mark Johnson",
    avatar: "ETA-Sifat-e-tahsin.png",
    rating: 5,
    text: "ETA Learning helped my son advance beyond grade level. The supportive environment makes all the difference."
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