import React from 'react';

const Footer = () => {
  return (
    <>
      {/* Location Section — matches design image */}
      <section id="location" className="bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row">
          {/* Map — non-interactive, takes left half */}
          <div className="w-full md:w-1/2 min-h-[300px] md:min-h-[400px]">
            <iframe
              title="ETA Learning Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1848.7!2d-79.3765!3d43.7645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b337299e791cb%3A0xc7e427b6be2e1061!2s2454%20Bayview%20Ave%2C%20North%20York%2C%20ON%20M2L%201A6!5e0!3m2!1sen!2sca!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '300px', maxHeight: '400px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Info — right half */}
          <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-3">
              Come say hello!
            </h3>
            <p className="text-sm text-black mb-6">
              2454 Bayview Ave, Toronto, ON M2L 1A6
            </p>

            {/* Hours table */}
            <div className="text-sm text-black">
              {[
                ['Monday', '4PM - 8PM'],
                ['Tuesday', '4PM - 8PM'],
                ['Wednesday', '4PM - 8PM'],
                ['Thursday', '4PM - 8PM'],
                ['Friday', '4PM - 8PM'],
                ['Saturday', '10AM - 2PM'],
                ['Sunday', 'By Appointment Only'],
              ].map(([day, hours]) => (
                <div
                  key={day}
                  className="flex justify-between py-1 border-b border-gray-200"
                >
                  <span className="font-medium">{day}</span>
                  <span>{hours}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                const contact = document.getElementById('contact');
                if (contact) contact.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-6 bg-pink-600 text-white px-6 py-2.5 rounded hover:bg-mainBlue transition-colors self-start text-sm font-medium"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-black py-12 px-4 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Left: Logo image */}
            <div className="flex justify-start">
              <img
                src={`${process.env.PUBLIC_URL}/Long.png`}
                alt="ETA Learning"
                className="h-16 w-auto"
              />
            </div>

            {/* Center: Navigation links */}
            <nav className="flex flex-col md:items-center gap-2 text-sm">
              <a href="#home" className="text-black hover:text-mainBlue transition-colors">Home</a>
              <a href="#programs" className="text-black hover:text-mainBlue transition-colors">Programs</a>
              <a target="_blank" rel="noopener noreferrer" href="https://www.google.com/search?q=eta+learning" className="text-black hover:text-mainBlue transition-colors">Testimonials</a>
              <a href="#faq" className="text-black hover:text-mainBlue transition-colors">FAQ</a>
              <a href="#location" className="text-black hover:text-mainBlue transition-colors">Location</a>
              <a href="#contact" className="text-black hover:text-mainBlue transition-colors">Contact Us</a>
            </nav>

            {/* Right: Location + Social */}
            <div className="flex flex-col md:items-end gap-3">
              <h4 className="font-semibold text-black text-sm">Location</h4>
              <p className="text-black text-xs">2454 Bayview Ave, Toronto, ON M2L 1A6</p>

              <div className="flex gap-2 mt-1">
                <a
                  href="https://www.facebook.com/etalearning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/etalearning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t text-center text-xs text-black">
            <p>© {new Date().getFullYear()} ETA Learning. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
