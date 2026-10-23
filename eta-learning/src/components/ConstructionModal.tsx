import { useEffect, useRef } from 'react';

interface ConstructionModalProps {
  onClose: () => void;
}

const ConstructionModal = ({ onClose }: ConstructionModalProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'Tab') {
        const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (!focusableElements?.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/70 px-4 py-6 backdrop-blur-sm sm:px-6">
      <section
        aria-labelledby="construction-modal-title"
        aria-describedby="construction-modal-description"
        aria-modal="true"
        ref={dialogRef}
        className="relative my-auto grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-950/30 lg:grid-cols-2"
        role="dialog"
      >
        <div className="relative h-56 overflow-hidden sm:h-72 lg:h-full lg:min-h-[560px]">
          <img
            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=85"
            alt="A young student enjoying a moment of learning"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-slate-950/10 lg:bg-gradient-to-r lg:from-transparent lg:to-slate-950/10" />
          <div className="absolute bottom-5 left-5 right-5 text-white sm:bottom-7 sm:left-7 lg:bottom-9 lg:left-9">
            <p className="text-sm font-semibold tracking-wide text-white/90">
              Curious minds. Confident futures.
            </p>
          </div>
        </div>

        <div className="relative flex flex-col justify-center px-6 py-9 sm:px-10 sm:py-11 lg:px-12 lg:py-14">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close announcement"
            className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 sm:right-6 sm:top-6"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-sky-50 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-sky-800 sm:mb-8">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-sky-500" />
            A new chapter is taking shape
          </div>

          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
            ETA Learning
          </p>
          <h1
            id="construction-modal-title"
            className="max-w-md text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[2.65rem]"
          >
            We’re building something wonderful.
          </h1>
          <p
            id="construction-modal-description"
            className="mt-5 max-w-md text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8"
          >
            Our website is getting a thoughtful refresh to better support every
            learner and family. We can’t wait to share what’s next.
          </p>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
            While we put the finishing touches in place, you’re welcome to
            explore our current site.
          </p>

          <button
            type="button"
            onClick={onClose}
            className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 sm:mt-9 sm:w-fit"
          >
            Explore the website
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
              <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <p className="mt-5 text-xs text-slate-400">
            Thank you for being part of the ETA Learning community.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ConstructionModal;
