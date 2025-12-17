import React, { useState } from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import StoreInfo from './components/StoreInfo';
import BookingForm from './components/BookingForm';
import AdminDashboard, { AdminLogin } from './components/AdminDashboard';
import { Facebook, Lock, Settings } from 'lucide-react';
import { LanguageProvider, useLanguage } from './translations';
import { ContentProvider, useContent } from './contentContext';

const AppContent: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const { isAdmin } = useContent();
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleAdminClick = () => {
    if (isAdmin) {
      setShowDashboard(true);
    } else {
      setShowAdminLogin(true);
    }
  };

  return (
    <main className="w-full min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-rose/30 py-4 px-6 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          {/* Logo Brand Text */}
          <div className="flex flex-col items-start leading-none">
             <span className="font-script text-2xl sm:text-3xl text-text font-bold">Trinh</span>
             <span className="font-serif text-[10px] sm:text-xs tracking-[0.2em] text-accent uppercase">Nail - Mi</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex gap-6 text-xs tracking-widest text-text/70 font-medium items-center">
             <a href="#" className="hover:text-accent transition-colors">{t('nav_home')}</a>
             <a href="#services" className="hover:text-accent transition-colors">{t('nav_services')}</a>
             <a href="#booking-section" className="hover:text-accent transition-colors">{t('nav_booking')}</a>
             <a href="https://www.facebook.com/nguyentrinh273" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">{t('nav_facebook')}</a>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 border-l border-rose/30 pl-4 sm:pl-6">
             <button 
               onClick={() => setLang('zh')} 
               className={`text-xs font-bold transition-colors ${lang === 'zh' ? 'text-accent' : 'text-text/30 hover:text-text/60'}`}
             >
               中
             </button>
             <span className="text-text/20">|</span>
             <button 
               onClick={() => setLang('vi')} 
               className={`text-xs font-bold transition-colors ${lang === 'vi' ? 'text-accent' : 'text-text/30 hover:text-text/60'}`}
             >
               VN
             </button>
          </div>

          <a href="https://line.me/ti/p/~trinh270391" className="sm:hidden text-xs border border-text px-3 py-1 rounded-full">LINE</a>
        </div>
      </nav>

      <Hero />
      
      <div id="services">
        <Services />
      </div>

      <section id="booking-section" className="bg-[#FFFBF9] py-20 px-4 relative overflow-hidden">
        {/* Background blobs simulating watercolor */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto shadow-2xl shadow-rose/20 relative z-10 bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[0.4fr_0.6fr]">
            <StoreInfo />
            <BookingForm />
          </div>
        </div>
      </section>

      <footer className="bg-white py-12 text-center border-t border-rose/30 relative">
        <h2 className="font-script text-4xl text-text mb-2">Trinh</h2>
        <p className="font-serif text-sm text-accent tracking-[0.3em] uppercase mb-8">Nail - Mi</p>
        
        <div className="flex justify-center items-center gap-4 mb-6">
          <a 
            href="https://www.facebook.com/nguyentrinh273" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-text/20 text-text/60 transition-all hover:border-accent hover:bg-accent hover:text-white"
            aria-label="Facebook"
          >
            <Facebook size={18} />
          </a>
        </div>

        <p className="text-xs text-text/40 tracking-widest mb-6">EST. 2024</p>
        
        <div className="flex flex-col items-center gap-3">
          <div className="text-[10px] text-text/30">
            © Trinh Nail - Mi｜小貞美甲美睫
          </div>
          
          {/* Explicit Admin Button */}
          <button 
            onClick={handleAdminClick} 
            className="flex items-center gap-1.5 text-[10px] text-text/30 hover:text-accent transition-colors px-3 py-1 rounded-full border border-transparent hover:border-rose/30"
          >
            {isAdmin ? <Settings size={12} /> : <Lock size={12} />}
            <span>{isAdmin ? '後台管理' : '管理員登入'}</span>
          </button>
        </div>
      </footer>

      {/* Admin Modals */}
      {showAdminLogin && (
        <AdminLogin 
          onClose={() => setShowAdminLogin(false)} 
          onLoginSuccess={() => {
            setShowAdminLogin(false);
            setShowDashboard(true);
          }} 
        />
      )}
      
      {showDashboard && (
        <AdminDashboard onClose={() => setShowDashboard(false)} />
      )}
    </main>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ContentProvider>
        <AppContent />
      </ContentProvider>
    </LanguageProvider>
  );
};

export default App;