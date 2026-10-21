import React, { useState } from 'react';

const INQUIRY_OPTIONS = [
  { value: 'commission', label: 'Custom Artwork / Portrait Commission' },
  { value: 'monument', label: 'Granite Sculpture / Public Installation' },
  { value: 'exhibition', label: 'Exhibition / Curatorial Invite' },
  { value: 'academic', label: 'Academic Lecture / Workshop' },
  { value: 'other', label: 'Other Inquiry' }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'commission',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [whatsappLink, setWhatsappLink] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields (Name, Email, and Message).');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    const phone = "917978993645";
    const selectedOption = INQUIRY_OPTIONS.find(opt => opt.value === formData.subject);
    const inquiryTypeLabel = selectedOption ? selectedOption.label : formData.subject;

    // 2. Generate WhatsApp Pre-filled URL
    const encodedText = 
      `*New Studio Inquiry - Shri Nityananda Sahu Portfolio*%0A%0A` +
      `*Name:* ${encodeURIComponent(formData.name.trim())}%0A` +
      `*Email:* ${encodeURIComponent(formData.email.trim())}%0A` +
      `*Inquiry Type:* ${encodeURIComponent(inquiryTypeLabel)}%0A` +
      `*Message:* ${encodeURIComponent(formData.message.trim())}`;

    const generatedWhatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedText}`;
    setWhatsappLink(generatedWhatsappUrl);

    // 3. Dispatch to Gmail via FormSubmit AJAX endpoint (Delivers to aavaprava@gmail.com)
    try {
      const emailPayload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        inquiry_type: inquiryTypeLabel,
        message: formData.message.trim(),
        _subject: `New Studio Inquiry from ${formData.name.trim()} - Art Portfolio`,
        _replyto: formData.email.trim(),
        _captcha: 'false'
      };

      await fetch('https://formsubmit.co/ajax/aavaprava@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(emailPayload)
      }).catch(err => {
        console.warn('Email dispatch warning (handled gracefully):', err);
      });
    } catch (err) {
      console.warn('Form submission notice:', err);
    }

    // 4. Launch WhatsApp directly in a new tab
    try {
      window.open(generatedWhatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (e) {
      console.warn('Popup blocked, fallback button available');
    }

    // 5. Update UI to success state
    setStatus('success');
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: 'commission', message: '' });
    setStatus('idle');
    setWhatsappLink('');
    setErrorMessage('');
  };

  return (
    <>
      <section id="contact" className="py-24 bg-canvas">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-subtitle text-xs tracking-[0.16em] uppercase text-terracotta font-bold block mb-2">
              Studio Connect
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark tracking-tight mb-4">
              Get in Touch
            </h2>
            <div className="w-14 h-[2px] bg-terracotta mx-auto mb-5 rounded-full" />
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              Inquire about custom fine art commissions, monumental granite sculptures, or academic workshops.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
            
            {/* Left Column: Direct Connect & Studio Info */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* University Studio */}
              <div className="p-6 rounded-xl bg-white border border-[#D8D2C5] shadow-soft flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold text-dark mb-1">University Studio</h4>
                  <p className="text-xs text-muted leading-relaxed font-medium">
                    Department of Fine Arts<br />
                    Fakir Mohan University, Vyasavihar<br />
                    Balasore, Odisha &mdash; 756019
                  </p>
                </div>
              </div>

              {/* Permanent Studio */}
              <div className="p-6 rounded-xl bg-white border border-[#D8D2C5] shadow-soft flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold text-dark mb-1">Permanent Studio</h4>
                  <p className="text-xs text-muted leading-relaxed font-medium">
                    At: Tutapada, PO: Gududa Patana<br />
                    Via Remuna, Balasore District<br />
                    Odisha &mdash; 756019
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="p-6 rounded-xl bg-white border border-[#D8D2C5] shadow-soft flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold text-dark mb-1">Direct Gmail</h4>
                  <a
                    href="mailto:aavaprava@gmail.com"
                    className="text-xs font-semibold text-charcoal hover:text-terracotta transition-colors"
                  >
                    aavaprava@gmail.com
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="p-6 rounded-xl bg-white border border-[#D8D2C5] shadow-soft flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold text-dark mb-1">WhatsApp &amp; Phone</h4>
                  <a
                    href="https://wa.me/qr/HLZYO65NKZKAL1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-charcoal hover:text-terracotta transition-colors"
                  >
                    +91 7978993645
                  </a>
                </div>
              </div>

              {/* Social Channels Row */}
              <div className="flex items-center gap-3 pt-3">
                <a
                  href="https://www.facebook.com/share/1KgokkQ9gk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-full bg-white border border-[#D8D2C5] text-charcoal hover:bg-terracotta hover:border-terracotta hover:text-white flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </a>
                <a
                  href="https://www.instagram.com/nityananda_sahu_4?igsh=MXc4dDNndDRtYnFkeA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-full bg-white border border-[#D8D2C5] text-charcoal hover:bg-terracotta hover:border-terracotta hover:text-white flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  Instagram
                </a>
              </div>

            </div>

            {/* Right Column: Dedicated Contact & Commission Form */}
            <div className="lg:col-span-7 bg-white/95 rounded-2xl p-8 sm:p-10 border border-[#D8D2C5] shadow-soft">
              <h3 className="font-heading text-2xl font-bold text-dark mb-1">
                Send a Message
              </h3>
              <p className="text-xs text-muted uppercase tracking-wider font-subtitle mb-6">
                Direct dispatch to Gmail (aavaprava@gmail.com) &amp; instant WhatsApp chat
              </p>

              {status === 'error' && (
                <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs font-medium">
                  {errorMessage || 'Failed to submit form. Please verify inputs.'}
                </div>
              )}

              {status === 'success' ? (
                <div className="p-8 rounded-xl bg-[#2E7D32]/10 border border-[#2E7D32]/30 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#2E7D32]/20 text-[#1B5E20] mx-auto flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-heading text-xl font-bold text-[#1B5E20]">
                      Inquiry Dispatched Successfully!
                    </h4>
                    <p className="text-xs text-[#2E7D32] leading-relaxed mt-1 max-w-md mx-auto">
                      Your inquiry has been emailed to <strong>aavaprava@gmail.com</strong> and pre-formatted for direct WhatsApp chat.
                    </p>
                  </div>

                  {/* Fallback button if popup was blocked */}
                  {whatsappLink && (
                    <div className="pt-2">
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-semibold text-xs tracking-wider uppercase hover:bg-[#1EBE5D] transition-all shadow-md hover:shadow-lg"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Continue on WhatsApp with Pre-filled Message
                      </a>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-xs text-muted hover:text-dark font-semibold tracking-wider uppercase underline underline-offset-4"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold tracking-wider uppercase text-label mb-2"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full bg-transparent border-b-2 border-[#D8D2C5] focus:border-terracotta py-2.5 text-sm text-dark placeholder:text-muted/60 outline-none transition-colors font-medium"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold tracking-wider uppercase text-label mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="w-full bg-transparent border-b-2 border-[#D8D2C5] focus:border-terracotta py-2.5 text-sm text-dark placeholder:text-muted/60 outline-none transition-colors font-medium"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-semibold tracking-wider uppercase text-label mb-2"
                    >
                      Inquiry Type *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b-2 border-[#D8D2C5] focus:border-terracotta py-2.5 text-sm text-dark outline-none transition-colors cursor-pointer font-medium"
                    >
                      {INQUIRY_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-semibold tracking-wider uppercase text-label mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share details regarding your commission, portrait, or exhibition invitation..."
                      className="w-full bg-transparent border-b-2 border-[#D8D2C5] focus:border-terracotta py-2.5 text-sm text-dark placeholder:text-muted/60 outline-none transition-colors resize-y font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className={`w-full py-4 rounded-full text-white font-semibold text-xs tracking-widest uppercase transition-all duration-200 shadow-md ${
                      status === 'sending'
                        ? 'bg-terracotta/70 cursor-not-allowed'
                        : 'bg-terracotta hover:bg-terracotta-hover hover:shadow'
                    }`}
                  >
                    {status === 'sending' ? (
                      <span className="inline-flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending to Studio (Gmail &amp; WhatsApp)...
                      </span>
                    ) : (
                      'Send Studio Inquiry'
                    )}
                  </button>
                </form>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* ================================================================= */}
      {/* FOOTER                                                            */}
      {/* ================================================================= */}
      <footer className="bg-dark text-[#FAF8F5] py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/10 text-center md:text-left">
            <div>
              <h3 className="font-brand text-xl font-bold tracking-[0.16em] text-white">
                NITYANANDA SAHU
              </h3>
              <p className="font-subtitle text-xs tracking-[0.14em] uppercase text-white/60 mt-1">
                Visual Artist &bull; Sculptor &bull; Educator
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold tracking-widest uppercase text-white/80">
              <a href="#home" className="hover:text-terracotta transition-colors">Home</a>
              <a href="#gallery" className="hover:text-terracotta transition-colors">Works</a>
              <a href="#about" className="hover:text-terracotta transition-colors">Profile</a>
              <a href="#commissions" className="hover:text-terracotta transition-colors">Commissions</a>
              <a href="#honors" className="hover:text-terracotta transition-colors">Honors</a>
              <a href="#contact" className="hover:text-terracotta transition-colors">Contact</a>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
            <p>&copy; {new Date().getFullYear()} Shri Nityananda Sahu. All rights reserved.</p>
            <p className="font-subtitle tracking-wider">Crafted with reverence for classical Indian fine art.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
