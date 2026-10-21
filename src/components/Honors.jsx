import React from 'react';

const HONORS_LIST = [
  {
    year: '2021–2022',
    title: 'Senior Fellowship in Visual Arts',
    institution: 'Centre for Cultural Resources and Training (CCRT), Ministry of Culture, Govt. of India',
    badge: 'National Fellowship'
  },
  {
    year: '2026',
    title: 'Snana Jyoti Samman',
    institution: 'In recognition of outstanding contributions to visual arts',
    badge: 'State Distinction'
  },
  {
    year: '2026',
    title: 'Chitrajyoti Samman',
    institution: 'Honoring excellence in painting and fine arts',
    badge: 'Art Award'
  },
  {
    year: '2024',
    title: 'Brajanatha Rath Saraswata Sambardhana',
    institution: 'Cultural and literary recognition',
    badge: 'Saraswata Honor'
  },
  {
    year: '2022',
    title: 'Purvodaya Kalaratna Award',
    institution: 'For distinction in Eastern Indian art traditions',
    badge: 'Kalaratna Award'
  },
  {
    year: '2003',
    title: '69th National Award',
    institution: 'Indian Academy of Fine Arts (IAFA), Amritsar',
    badge: 'National Award'
  },
  {
    year: '1994',
    title: 'Odisha Lalit Kala Akademi Award',
    institution: 'State-level recognition for excellence in fine arts',
    badge: 'State Akademi'
  },
];

const INVITED_CAMPS = [
  {
    year: '2026',
    role: 'Invited Expert Resource Person',
    event: 'LOK-ANTARDHWANI by SOPVA, IGNOU, New Delhi',
  },
  {
    year: '2026',
    role: 'Invited Resource Person',
    event: 'Vikramdev School of Art and Crafts, Jeypore, Koraput',
  },
  {
    year: '2022',
    role: 'Invited Resource Person',
    event: 'Government College of Art & Crafts, Khallikote, Ganjam',
  },
  {
    year: '2015',
    role: 'Invited Resource Person',
    event: '5-Day Painting Workshop & Seminar at B.K. College of Art & Crafts, Bhubaneswar',
  },
  {
    year: '2008',
    role: 'Invited Resident Artist',
    event: 'SCZCC Nagpur Artists\' Workshop Camp at Khajuraho',
  },
  {
    year: '2007',
    role: 'Invited Resident Artist',
    event: 'All-India Artists\' Camp by EZCC Kolkata at Shilpa Gram, Santiniketan',
  },
];

export default function Honors() {
  return (
    <section id="honors" className="py-24 bg-canvas border-b border-[#D8D2C5]/50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-subtitle text-xs tracking-[0.16em] uppercase text-terracotta font-bold block mb-2">
            Fellowships &amp; Distinctions
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark tracking-tight mb-4">
            Honours &amp; Recognition
          </h2>
          <div className="w-14 h-[2px] bg-terracotta mx-auto mb-5 rounded-full" />
        </div>

        {/* Major Awards & Fellowships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {HONORS_LIST.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-white/90 border border-[#D8D2C5] shadow-soft hover:shadow-lift hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-terracotta text-white font-subtitle text-xs tracking-wider font-bold">
                    {item.year}
                  </span>
                  <span className="text-[0.7rem] font-semibold tracking-wider uppercase text-muted">
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-bold text-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed font-medium">
                  {item.institution}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Historical Invited Camps & Workshops */}
        <div className="mt-16 pt-12 border-t border-[#D8D2C5]/60">
          <div className="max-w-xl mx-auto text-center mb-10">
            <h3 className="font-heading text-2xl font-bold text-dark mb-2">
              National Camps &amp; Expert Programs
            </h3>
            <p className="text-xs text-muted uppercase tracking-widest font-subtitle">
              Chronological invited workshops, master classes &amp; artist residencies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {INVITED_CAMPS.map((camp, idx) => (
              <div
                key={idx}
                className="p-5 rounded-lg bg-warm/70 border border-[#D8D2C5]/80 hover:bg-white transition-colors duration-200"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-subtitle text-xs font-bold text-terracotta tracking-wider">
                    {camp.year}
                  </span>
                  <span className="text-muted/60 text-xs">&bull;</span>
                  <span className="text-xs font-semibold text-charcoal tracking-wide">
                    {camp.role}
                  </span>
                </div>
                <p className="text-xs text-muted leading-relaxed font-medium">
                  {camp.event}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
