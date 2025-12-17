import React from 'react';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../translations';
import { useContent } from '../contentContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const { content } = useContent();

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking-section');
    if (bookingSection) {
      const yOffset = -50; // Offset for sticky header
      const y = bookingSection.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      console.warn("Booking section not found");
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#FFFBF9]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full min-h-[600px] lg:min-h-[85vh]">
          
          {/* Left Column: Content */}
          <div className="flex flex-col justify-center py-20 lg:py-0 lg:pr-12 relative z-10">
            <div className="animate-fade-in-up">
              <span className="mb-6 inline-block rounded-full border border-accent/30 bg-white/50 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-accent backdrop-blur-sm">
                {t('hero_badge')}
              </span>
              
              <h1 className="mb-2 font-script text-6xl font-bold text-text sm:text-7xl lg:text-8xl">
                Trinh
              </h1>
              <h2 className="mb-6 font-serif text-3xl text-text/80 tracking-widest sm:text-4xl">
                 Nail - Mi
              </h2>
              
              <p className="mb-10 max-w-lg text-sm leading-loose text-text/70 sm:text-base border-l-2 border-accent pl-4">
                <span className="font-bold text-text block mb-1">{t('hero_subtitle')}</span>
                {t('hero_desc_1')} {t('hero_desc_2')}
                <br className="hidden sm:block"/>
                {t('hero_desc_3')}
              </p>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={scrollToBooking}
                  className="group relative overflow-hidden bg-text px-8 py-3 text-sm tracking-widest text-white transition-all hover:bg-accent rounded-full cursor-pointer"
                >
                  <span className="relative z-10">{t('hero_cta_book')}</span>
                </button>
                
                <a 
                  href="https://line.me/ti/p/~trinh270391"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden border border-text px-8 py-3 text-sm tracking-widest text-text transition-all hover:border-accent hover:text-accent rounded-full"
                >
                  <span className="relative z-10">{t('hero_cta_line')}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative h-[400px] lg:h-auto lg:py-12 flex items-center justify-center">
            {/* Pink Watercolor Blob Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-[#FFE4E1] blur-[60px] opacity-60 rounded-full pointer-events-none"></div>
            
            <div className="relative h-full w-full overflow-hidden lg:rounded-[100px_0_100px_0] shadow-2xl shadow-rose/30">
               <img 
                 src={content.heroImage}
                 alt="Elegant Beauty Portrait"
                 className="h-full w-full object-cover object-center animate-fade-in-up"
                 style={{ animationDelay: '0.2s' }}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#FFFBF9] via-transparent to-transparent lg:hidden"></div>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-accent hidden lg:block">
        <ArrowDown size={24} />
      </div>
    </section>
  );
};

export default Hero;