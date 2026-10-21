import React from 'react';

export default function BioCommissions() {
  return (
    <>
      {/* ================================================================= */}
      {/* ARTIST PROFILE & ACADEMIC LIFE                                    */}
      {/* ================================================================= */}
      <section id="about" className="py-24 bg-canvas">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-subtitle text-xs tracking-[0.16em] uppercase text-terracotta font-bold block mb-2">
              Academic Life &amp; Practice
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark tracking-tight mb-4">
              Artist Profile
            </h2>
            <div className="w-14 h-[2px] bg-terracotta mx-auto mb-5 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Portrait Accent */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative max-w-[380px] w-full">
                <div className="p-3 bg-white rounded-lg shadow-frame border border-[#D8D2C5]">
                  <div className="relative aspect-[4/5] rounded overflow-hidden bg-[#EFECE6]">
                    <img
                      src="pictures/Profile photo/Profile_pic.png"
                      alt="Shri Nityananda Sahu"
                      className="w-full h-full object-cover contrast-[1.02]"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Profile Narrative & Credentials */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-dark mb-1">
                  Shri Nityananda Sahu
                </h3>
                <p className="text-sm font-semibold tracking-wider uppercase text-terracotta font-subtitle">
                  Assistant Professor in Fine Arts
                </p>
                <p className="text-sm text-muted font-medium mt-0.5">
                  Fakir Mohan University, Vyasavihar, Balasore, Odisha &mdash; 756019
                </p>
              </div>

              {/* Academic Credentials Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                <div className="p-5 rounded-lg bg-white/80 border border-[#D8D2C5] shadow-soft">
                  <div className="w-9 h-9 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mb-3">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  <h4 className="font-heading text-base font-bold text-dark mb-1">B.F.A. in Painting</h4>
                  <p className="text-xs text-muted font-medium">Berhampur University, Odisha</p>
                </div>

                <div className="p-5 rounded-lg bg-white/80 border border-[#D8D2C5] shadow-soft">
                  <div className="w-9 h-9 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mb-3">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                  </div>
                  <h4 className="font-heading text-base font-bold text-dark mb-1">M.F.A. in Painting</h4>
                  <p className="text-xs text-muted font-medium">Mahatma Gandhi Kashi Vidyapith (MGKVP), Varanasi</p>
                </div>
              </div>

              <p className="text-base text-[#3A3733] leading-relaxed">
                Shri Nityananda Sahu is an eminent visual artist, sculptor, and art educator whose works celebrate the classical heritage of Odisha while embracing modern human expressions. His mastery spans granite sculpture, realistic oil painting, and portraiture &mdash; each work representing decades of dedicated studio practice.
              </p>

              <div className="pt-2">
                <a
                  href="Nityananda_Sahu_Artists_Biodata-1.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-terracotta text-white font-semibold text-xs tracking-wider uppercase shadow-md hover:bg-terracotta-hover transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Full Biodata (PDF)
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================================================================= */}
      {/* SIGNATURE COMMISSIONS & PUBLIC INSTALLATIONS                      */}
      {/* ================================================================= */}
      <section id="commissions" className="py-24 bg-warm/80 border-t border-[#D8D2C5]/50">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-subtitle text-xs tracking-[0.16em] uppercase text-terracotta font-bold block mb-2">
              Public Monuments &amp; Installations
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark tracking-tight mb-4">
              Signature Commissions
            </h2>
            <div className="w-14 h-[2px] bg-terracotta mx-auto mb-5 rounded-full" />
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              Monumental public sculptures and dignitary oil portraits recognized at the highest levels of national governance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Monument 1 */}
            <div className="p-8 rounded-xl bg-white border border-[#D8D2C5] shadow-soft hover:shadow-lift hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mb-6">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-dark mb-2">
                  Fakir Mohan Senapati Monument
                </h3>
                <span className="font-subtitle text-xs tracking-wider uppercase text-terracotta font-bold block mb-4">
                  2012 &bull; 8&rsquo;8&Prime; Life-size Granite Sculpture
                </span>
                <p className="text-sm text-muted leading-relaxed">
                  Monumental granite sculpture installed at Fakir Mohan Autonomous College, Balasore. This iconic work was commemorated on a <strong>Government of India postage stamp in 2019</strong> &mdash; a rare national distinction recognizing the monument's historical and artistic weight.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#EFECE6] text-xs font-semibold text-label">
                Fakir Mohan Autonomous College, Balasore
              </div>
            </div>

            {/* Monument 2 */}
            <div className="p-8 rounded-xl bg-white border border-[#D8D2C5] shadow-soft hover:shadow-lift hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mb-6">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-dark mb-2">
                  Mahatma Gandhi in Dhyana Mudra
                </h3>
                <span className="font-subtitle text-xs tracking-wider uppercase text-terracotta font-bold block mb-4">
                  2014 &bull; 4&rsquo;8&Prime; Life-size Granite Sculpture
                </span>
                <p className="text-sm text-muted leading-relaxed">
                  A meditative life-size granite sculpture of Mahatma Gandhi in deep contemplative posture, permanently installed at Gandhi Sthal, St. Xavier&rsquo;s Public School, Balasore &mdash; capturing calm spiritual strength in stone.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#EFECE6] text-xs font-semibold text-label">
                Gandhi Sthal, St. Xavier's, Balasore
              </div>
            </div>

            {/* Monument 3 */}
            <div className="p-8 rounded-xl bg-white border border-[#D8D2C5] shadow-soft hover:shadow-lift hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mb-6">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-dark mb-2">
                  Dignitary &amp; VVIP Oil Portraits
                </h3>
                <span className="font-subtitle text-xs tracking-wider uppercase text-terracotta font-bold block mb-4">
                  2013 &ndash; Present &bull; Oil on Canvas
                </span>
                <p className="text-sm text-muted leading-relaxed">
                  Commissioned portraits presented to <strong>Chief Minister Shri Naveen Patnaik</strong> (2013) and Odisha State Governors &mdash; <em>M. M. Rajendran, Rameshwar Thakur, S. C. Jamir,</em> and <em>Prof. Ganeshi Lal</em>.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-[#EFECE6] text-xs font-semibold text-label">
                State &amp; National Portfolios
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}
