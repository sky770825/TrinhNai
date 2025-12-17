import React from 'react';
import { Phone, Clock, ExternalLink, Facebook } from 'lucide-react';
import { useLanguage } from '../translations';
import { useContent } from '../contentContext';

const StoreInfo: React.FC = () => {
  const { t } = useLanguage();
  const { content } = useContent();

  return (
    <div className="h-full bg-white flex flex-col border-r border-rose/20">
      {/* Featured Image */}
      <div className="h-48 sm:h-64 w-full overflow-hidden relative group">
        <img 
          src={content.storeImage} 
          alt="Store Interior" 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-6">
           <p className="text-white font-script text-3xl tracking-wide drop-shadow-md">Trinh Nail - Mi</p>
        </div>
      </div>

      <div className="p-8 sm:p-10 flex-1 bg-white">
        <div className="mb-8">
          <h3 className="font-serif text-2xl text-text mb-4 border-b border-rose/30 pb-2 inline-block">{t('store_title')}</h3>
          <p className="text-sm text-text/60 leading-relaxed mb-6 whitespace-pre-line">
            {t('store_desc')}
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4 group">
              <div className="p-2 bg-secondary rounded-full group-hover:bg-accent group-hover:text-white transition-colors text-accent">
                 <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-text mb-1">{t('store_hours_label')}</p>
                <p className="text-sm text-text/70">{t('store_hours_val')}</p>
                <p className="text-xs text-accent mt-1">{t('store_hours_note')}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
               <div className="p-2 bg-secondary rounded-full group-hover:bg-accent group-hover:text-white transition-colors text-accent">
                 <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-text mb-1">{t('store_phone_label')}</p>
                <a href="tel:0909318666" className="text-sm text-text/70 hover:text-accent transition-colors border-b border-transparent hover:border-accent">
                  0909-318-666
                </a>
              </div>
            </div>

            {/* LINE Section Updated */}
             <div className="flex items-start gap-4 group">
               <div className="p-2 bg-secondary rounded-full group-hover:bg-[#00B900] group-hover:text-white transition-colors text-accent">
                 <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 .5C5.4.5 0 5 0 10.6c0 5 4.3 9.2 10.6 10l.7 2.3c.1.3.4.4.6.2.1-.1.2-.2.2-.3l1.8-3.1c4.5-.4 7.9-3.7 7.9-7.7C24 5.2 18.6.5 12 .5z"/></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-text mb-1">Line ID</p>
                <a href="https://line.me/ti/p/~trinh270391" target="_blank" rel="noopener noreferrer" className="text-sm text-text/70 hover:text-[#00B900] transition-colors border-b border-transparent hover:border-[#00B900]">
                  trinh270391
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
               <div className="p-2 bg-secondary rounded-full group-hover:bg-[#1877F2] group-hover:text-white transition-colors text-accent">
                 <Facebook className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-text mb-1">{t('store_fb_label')}</p>
                <a href="https://www.facebook.com/nguyentrinh273" target="_blank" rel="noopener noreferrer" className="text-sm text-text/70 hover:text-[#1877F2] transition-colors border-b border-transparent hover:border-[#1877F2]">
                  {t('store_fb_link')}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-rose/30 pt-8 space-y-8">
          <div>
             <div className="flex items-center gap-2 mb-2">
               <span className="w-2 h-2 rounded-full bg-accent"></span>
               <h4 className="font-bold text-sm text-text">{t('store_loc_1')}</h4>
             </div>
             <p className="text-sm text-text/60 mb-3 pl-4">{t('store_addr_1')}</p>
             
             {/* Map for Yuanhua */}
             <div className="pl-4 mb-2">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!4v1765894801853!6m8!1m7!1sOQsqQDA2n9sgV_3__bodXg!2m2!1d24.95710195611089!2d121.2275221068176!3f285.17134851723023!4f3.5770594489634107!5f0.7820865974627469" 
                 width="100%" 
                 height="200" 
                 style={{ border: 0, borderRadius: '0.5rem' }} 
                 allowFullScreen 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 className="shadow-sm border border-rose/20 grayscale-[20%] hover:grayscale-0 transition-all duration-500"
               ></iframe>
             </div>

             <a href="https://www.google.com/maps/search/?api=1&query=中壢區元化路40號" target="_blank" rel="noopener noreferrer" className="pl-4 inline-flex items-center gap-1 text-xs text-accent hover:underline">
               Google Maps <ExternalLink size={10} />
             </a>
          </div>

          <div>
             <div className="flex items-center gap-2 mb-2">
               <span className="w-2 h-2 rounded-full bg-accent/60"></span>
               <h4 className="font-bold text-sm text-text">{t('store_loc_2')}</h4>
             </div>
             <p className="text-sm text-text/60 mb-3 pl-4">{t('store_addr_2')}</p>
             
             {/* Map for Zhongfu */}
             <div className="pl-4 mb-2">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!4v1765894899294!6m8!1m7!1srSe6ajOaO--anWaPYNlYbg!2m2!1d24.96760908053589!2d121.2329501326462!3f21.465701091636273!4f10.788829369520528!5f0.7820865974627469" 
                  width="100%" 
                  height="200" 
                  style={{ border: 0, borderRadius: '0.5rem' }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="shadow-sm border border-rose/20 grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                ></iframe>
             </div>

             <a href="https://www.google.com/maps/search/?api=1&query=中壢區福州一街262號" target="_blank" rel="noopener noreferrer" className="pl-4 inline-flex items-center gap-1 text-xs text-accent hover:underline">
               Google Maps <ExternalLink size={10} />
             </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;