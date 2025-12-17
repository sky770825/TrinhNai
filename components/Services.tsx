import React from 'react';
import { Sparkles, Eye, Feather, Brush, ArrowRight } from 'lucide-react';
import { useLanguage } from '../translations';
import { useContent } from '../contentContext';

const Services: React.FC = () => {
  const { t } = useLanguage();
  const { content } = useContent();

  const scrollToBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    const bookingSection = document.getElementById('booking-section');
    if (bookingSection) {
      const yOffset = -50; 
      const y = bookingSection.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const services = [
    {
      title: t('srv_nail_title'),
      en: "Nail Art",
      desc: t('srv_nail_desc'),
      image: content.serviceImages.nail,
      icon: <Brush className="h-5 w-5" />
    },
    {
      title: t('srv_lash_title'),
      en: "Eyelash",
      desc: t('srv_lash_desc'),
      image: content.serviceImages.lash,
      icon: <Eye className="h-5 w-5" />
    },
    {
      title: t('srv_tattoo_title'),
      en: "Makeup Tattoo",
      desc: t('srv_tattoo_desc'),
      image: content.serviceImages.tattoo,
      icon: <Sparkles className="h-5 w-5" />
    },
    {
      title: t('srv_wax_title'),
      en: "Waxing",
      desc: t('srv_wax_desc'),
      image: content.serviceImages.wax,
      icon: <Feather className="h-5 w-5" />
    }
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl lg:text-5xl font-serif text-text mb-4">{t('srv_title')}</h2>
            <div className="w-16 h-0.5 bg-primary mb-4"></div>
            <p className="text-text/60 text-sm tracking-wide max-w-md">
              {t('srv_subtitle')}
            </p>
          </div>
          <div className="hidden md:block pb-2">
             <button 
               onClick={scrollToBooking}
               className="text-sm font-bold text-primary flex items-center gap-2 hover:gap-4 transition-all"
             >
               {t('srv_goto_booking')} <ArrowRight size={16}/>
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {services.map((s, i) => (
            <div key={i} className="group cursor-default flex flex-col h-full">
              {/* Image Container */}
              <div className="relative overflow-hidden mb-6 aspect-[3/4] bg-[#F5F0EB]">
                <img 
                  src={s.image} 
                  alt={s.title}
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur p-2 rounded-full text-primary opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {s.icon}
                </div>
              </div>
              
              {/* Text Content */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-serif text-2xl text-text group-hover:text-primary transition-colors">{s.title}</h3>
                  <span className="text-[10px] font-bold tracking-widest text-text/30 uppercase">{s.en}</span>
                </div>
                <p className="text-sm text-text/60 leading-relaxed mb-4 flex-1 border-t border-dashed border-[#EAE0D5] pt-3">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;