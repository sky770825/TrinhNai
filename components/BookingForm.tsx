import React, { useState, useRef, useEffect } from 'react';
import { Copy, X, Check, AlertCircle, ImagePlus, RefreshCw, Send } from 'lucide-react';
import { BookingData, TimeStatus, SERVICE_OPTIONS } from '../types';
import { useLanguage } from '../translations';

const BookingForm: React.FC = () => {
  const { t, lang } = useLanguage();

  // Dynamic Options based on language
  const BRANCH_OPTS = [
    { value: "Yuanhua", label: t('opt_branch_1') },
    { value: "Zhongfu", label: t('opt_branch_2') }
  ];

  const BIRTHDAY_OPTS = [
    { value: t('opt_bd_none'), label: t('opt_bd_none') },
    { value: t('opt_bd_month'), label: t('opt_bd_month') },
    { value: t('opt_bd_week'), label: t('opt_bd_week') }
  ];

  const MATTE_OPTS = [
    { value: t('opt_matte_none'), label: t('opt_matte_none') },
    { value: t('opt_matte_yes'), label: t('opt_matte_yes') },
    { value: t('opt_matte_no'), label: t('opt_matte_no') }
  ];

  const SERVICE_OPTS = [
    { value: "Nail", label: t('srv_nail_title') },
    { value: "Lash", label: t('srv_lash_title') },
    { value: "Tattoo", label: t('srv_tattoo_title') },
    { value: "Waxing", label: t('srv_wax_title') }
  ];

  const [formData, setFormData] = useState<BookingData>({
    name: '',
    phone: '',
    branch: '',
    birthday: '',
    services: [],
    date: new Date().toISOString().split('T')[0],
    time: '',
    style: '',
    matte: '',
    note: '',
    files: []
  });

  // Set default values when options change
  useEffect(() => {
    setFormData(prev => ({
        ...prev,
        birthday: prev.birthday || t('opt_bd_none'),
        matte: prev.matte || t('opt_matte_none')
    }));
  }, [lang]);

  const [timeStatus, setTimeStatus] = useState<TimeStatus>({
    isValid: true,
    message: '',
    type: 'default'
  });

  const [generatedMsg, setGeneratedMsg] = useState('');
  const [showMsgBox, setShowMsgBox] = useState(false);
  const [copyState, setCopyState] = useState<'idle' | 'copied'>('idle');
  const msgBoxRef = useRef<HTMLDivElement>(null);

  // Time Validation Logic
  useEffect(() => {
    if (!formData.time) {
      setTimeStatus({ isValid: false, message: '', type: 'default' });
      return;
    }

    const [h, m] = formData.time.split(':').map(Number);
    const mins = h * 60 + m;
    const open = 9 * 60;
    const close = 24 * 60; 
    const lateStart = 20 * 60;

    if (mins < open) {
      setTimeStatus({ isValid: true, message: t('msg_warn_early'), type: 'warn' });
    } else if (mins >= lateStart && mins < close) {
      setTimeStatus({ isValid: true, message: t('msg_warn_late'), type: 'warn' });
    } else {
      setTimeStatus({ isValid: true, message: t('msg_ok'), type: 'ok' });
    }
  }, [formData.time, lang]);

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (serviceValue: string) => {
    setFormData(prev => {
      const exists = prev.services.includes(serviceValue);
      return {
        ...prev,
        services: exists
          ? prev.services.filter(s => s !== serviceValue)
          : [...prev.services, serviceValue]
      };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).slice(0, 6); // Max 6
      setFormData(prev => ({ ...prev, files: newFiles }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const generateMessage = () => {
    if (!formData.name || !formData.phone || !formData.branch || !formData.date || !formData.time) {
      alert(lang === 'zh' ? '請填寫必填欄位 (*) 以生成訊息' : 'Vui lòng điền các trường bắt buộc (*)');
      return;
    }
    if (formData.services.length === 0) {
      alert(lang === 'zh' ? '請至少勾選一個服務項目' : 'Vui lòng chọn ít nhất một dịch vụ');
      return;
    }

    let timeTag = "";
    if (timeStatus.type === 'warn') timeTag = "⚠️";
    
    const imgHint = formData.files.length
      ? `${t('msg_img')} ${formData.files.length} ${t('msg_img_count')}`
      : `${t('msg_img')} ${t('msg_none')}`;

    // Map service values back to labels for the message
    const serviceLabels = formData.services.map(v => SERVICE_OPTS.find(o => o.value === v)?.label).join(", ");
    const branchLabel = BRANCH_OPTS.find(o => o.value === formData.branch)?.label;

    const lines = [
      t('msg_greeting'),
      "",
      `${t('msg_name')} ${formData.name} / ${formData.phone}`,
      `${t('msg_loc')} ${branchLabel}`,
      `${t('msg_time')} ${formData.date} ${formData.time} ${timeTag}`,
      `${t('msg_srv')} ${serviceLabels}`,
      `${t('msg_bd')} ${formData.birthday}`,
      `${t('msg_matte')} ${formData.matte}`,
      formData.style ? `${t('msg_style')} ${formData.style}` : null,
      `${imgHint}`,
      formData.note ? `${t('msg_note')} ${formData.note}` : null,
      "",
      t('msg_footer')
    ].filter(Boolean);

    setGeneratedMsg(lines.join("\n"));
    setShowMsgBox(true);
    
    setTimeout(() => {
      msgBoxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedMsg);
      setCopyState('copied');
      setTimeout(() => setCopyState('idle'), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const inputClass = "w-full border-b border-rose/30 bg-transparent py-2.5 text-sm text-text placeholder-text/30 focus:border-accent focus:outline-none focus:ring-0 transition-colors rounded-none";
  const labelClass = "block text-xs font-bold tracking-wider text-text/50 uppercase mb-1";

  return (
    <div className="h-full bg-white p-8 sm:p-10">
      <div className="mb-8">
        <h3 className="font-serif text-2xl text-text mb-2">{t('bk_title')}</h3>
        <p className="text-sm text-text/60">{t('bk_subtitle')}</p>
      </div>

      <form className="space-y-8" autoComplete="off">
        {/* Section 1: Basic Info */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass}>{t('bk_name')}</label>
            <input name="name" className={inputClass} placeholder={t('bk_name_ph')} value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label className={labelClass}>{t('bk_phone')}</label>
            <input name="phone" inputMode="tel" className={inputClass} placeholder="09xx-xxx-xxx" value={formData.phone} onChange={handleChange} required />
          </div>
        </div>

        {/* Section 2: Details */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass}>{t('bk_branch')}</label>
            <select name="branch" className={inputClass} value={formData.branch} onChange={handleChange} required>
              <option value="" disabled>{t('bk_branch_ph')}</option>
              {BRANCH_OPTS.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>{t('bk_birthday')}</label>
            <select name="birthday" className={inputClass} value={formData.birthday} onChange={handleChange}>
              {BIRTHDAY_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Section 3: Services */}
        <div>
          <label className={labelClass}>{t('bk_services')}</label>
          <div className="mt-3 flex flex-wrap gap-2">
            {SERVICE_OPTS.map(service => {
              const checked = formData.services.includes(service.value);
              return (
                <button
                  key={service.value}
                  type="button"
                  onClick={() => handleServiceToggle(service.value)}
                  className={`px-4 py-2 text-sm border rounded-full transition-all duration-300 ${
                    checked
                      ? 'border-accent bg-accent text-white shadow-md'
                      : 'border-rose/30 bg-white text-text/70 hover:border-accent/50'
                  }`}
                >
                  {service.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Time */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className={labelClass}>{t('bk_date')}</label>
            <input name="date" type="date" className={inputClass} value={formData.date} onChange={handleChange} required />
          </div>
          <div>
            <label className={labelClass}>
              {t('bk_time')} <span className="normal-case tracking-normal opacity-50">(09:00-24:00)</span> *
            </label>
            <div className="flex items-center gap-2">
              <input name="time" type="time" className={inputClass} value={formData.time} onChange={handleChange} required />
              {timeStatus.message && (
                <span className={`text-xs whitespace-nowrap px-2 py-1 rounded-full ${
                  timeStatus.type === 'warn' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                }`}>
                  {timeStatus.message}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Section 5: Customization */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
           <div>
            <label className={labelClass}>{t('bk_style')}</label>
            <input name="style" className={inputClass} placeholder={t('bk_style_ph')} value={formData.style} onChange={handleChange} />
          </div>
          <div>
            <label className={labelClass}>{t('bk_matte')}</label>
            <select name="matte" className={inputClass} value={formData.matte} onChange={handleChange}>
              {MATTE_OPTS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>

        {/* Section 6: Upload */}
        <div>
          <label className={labelClass}>{t('bk_img')} ({formData.files.length})</label>
          <div className="mt-2 flex items-start gap-4">
             <div className="relative overflow-hidden group">
                <input type="file" multiple accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                <button type="button" className="flex items-center gap-2 border border-dashed border-rose/40 px-4 py-3 text-sm text-text/60 hover:bg-secondary hover:border-accent transition-colors rounded-lg">
                  <ImagePlus size={16} />
                  <span>{t('bk_img_btn')}</span>
                </button>
             </div>
             <div className="flex gap-2 overflow-x-auto pb-2">
                {formData.files.map((file, idx) => (
                  <div key={idx} className="relative w-12 h-12 flex-shrink-0">
                    <img src={URL.createObjectURL(file)} className="w-full h-full object-cover border border-rose/30 rounded-md" />
                    <button onClick={() => removeFile(idx)} type="button" className="absolute -top-1 -right-1 bg-white text-red-400 rounded-full shadow-sm p-0.5 hover:text-red-600">
                      <X size={12} />
                    </button>
                  </div>
                ))}
             </div>
          </div>
        </div>

         <div>
            <label className={labelClass}>{t('bk_note')}</label>
            <textarea name="note" className={`${inputClass} resize-none h-20`} placeholder="..." value={formData.note} onChange={handleChange} />
          </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={generateMessage}
            className="flex-1 bg-text text-white py-3 text-sm tracking-widest hover:bg-accent transition-colors flex items-center justify-center gap-2 rounded-full"
          >
            <Send size={14} /> {t('bk_btn_gen')}
          </button>
          <button
             type="button"
             onClick={() => setFormData(prev => ({ ...prev, services: [], note: '', style: '', files: [] }))}
             className="px-4 border border-rose/30 text-text/50 hover:text-accent hover:border-accent transition-colors rounded-full"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </form>

      {/* Result Modal / Overlay Area */}
      {showMsgBox && (
        <div ref={msgBoxRef} className="mt-8 bg-secondary/50 border border-accent/20 p-6 rounded-xl shadow-sm animate-fade-in-up">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-serif text-lg text-accent">{t('bk_msg_title')}</h4>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 text-xs border border-accent text-accent px-3 py-1.5 hover:bg-accent hover:text-white transition-colors rounded-full"
            >
              {copyState === 'copied' ? <Check size={12}/> : <Copy size={12}/>}
              {copyState === 'copied' ? t('bk_msg_copied') : t('bk_msg_copy')}
            </button>
          </div>
          <div className="bg-white p-4 text-xs leading-relaxed font-mono text-text/80 whitespace-pre-wrap mb-4 border border-rose/20 rounded-lg">
            {generatedMsg}
          </div>
          <p className="text-center text-xs text-text/40">
            {t('bk_msg_hint')}
          </p>
          <div className="mt-4 text-center">
             <a href="https://line.me/ti/p/~trinh270391" target="_blank" className="inline-block text-sm underline underline-offset-4 text-accent hover:text-text">
               {t('bk_msg_link')}
             </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;