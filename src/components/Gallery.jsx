import React, { useState, useMemo } from 'react';
import { allArtworks, stats } from '../data/artworks';

const BATCH_SIZE = 24;

const TABS = [
  { id: 'all', label: 'All Works', count: stats.total },
  { id: 'sculpture', label: 'Sculptures', count: stats.sculpture },
  { id: 'realistic', label: 'Realistic Paintings', count: stats.realistic },
  { id: 'portrait', label: 'Portraits', count: stats.portrait },
];

export default function Gallery({ onSelectArtwork }) {
  const [activeTab, setActiveTab] = useState('all');
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  // Filter artworks according to active tab
  const filteredArtworks = useMemo(() => {
    return allArtworks[activeTab] || allArtworks.all;
  }, [activeTab]);

  // Artworks currently visible in the DOM (batch loaded)
  const displayedArtworks = useMemo(() => {
    return filteredArtworks.slice(0, visibleCount);
  }, [filteredArtworks, visibleCount]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setVisibleCount(BATCH_SIZE);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + BATCH_SIZE, filteredArtworks.length));
  };

  const hasMore = visibleCount < filteredArtworks.length;

  return (
    <section id="gallery" className="py-24 bg-warm/60 border-t border-b border-[#D8D2C5]/50">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-subtitle text-xs tracking-[0.16em] uppercase text-terracotta font-bold block mb-2">
            Monographic Collection
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-dark tracking-tight mb-4">
            Selected Works
          </h2>
          <div className="w-14 h-[2px] bg-terracotta mx-auto mb-5 rounded-full" />
          <p className="text-muted text-sm sm:text-base leading-relaxed">
            A curated exhibition spanning monumental sculptures in granite, realistic studies in oil, and dignitary portraits.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-12">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                  isActive
                    ? 'bg-terracotta text-white shadow-md'
                    : 'bg-white/80 hover:bg-white text-muted hover:text-terracotta border border-[#D8D2C5]'
                }`}
              >
                {tab.label} <span className="text-[0.7rem] opacity-75 ml-1">({tab.count})</span>
              </button>
            );
          })}
        </div>

        {/* Masonry-Style Artworks Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayedArtworks.map((artwork, index) => (
            <div
              key={artwork.id}
              onClick={() => onSelectArtwork(artwork, filteredArtworks)}
              className="group relative cursor-pointer overflow-hidden rounded-lg bg-[#EFECE6] border border-[#D8D2C5]/70 shadow-sm hover:shadow-lift hover:-translate-y-1 transition-all duration-300"
            >
              {/* Aspect Ratio 4:5 Container (prevents layout shifting) */}
              <div className="relative w-full aspect-[4/5] bg-[#EFECE6] overflow-hidden">
                <img
                  src={artwork.src}
                  alt={artwork.alt}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    // Fallback between lowercase and uppercase .jpg / .JPG
                    if (!e.target.dataset.tried) {
                      e.target.dataset.tried = 'true';
                      if (e.target.src.endsWith('.jpg')) {
                        e.target.src = e.target.src.replace(/\.jpg$/, '.JPG');
                      } else if (e.target.src.endsWith('.JPG')) {
                        e.target.src = e.target.src.replace(/\.JPG$/, '.jpg');
                      }
                    }
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Hover Exhibition Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="font-heading text-sm font-semibold text-white drop-shadow-sm">
                    {artwork.categoryLabel}
                  </span>
                  <span className="font-subtitle text-[0.72rem] tracking-wider uppercase text-[#EDE8DE] font-medium mt-0.5">
                    Plate No. {artwork.plateNumber}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Control to Prevent DOM Overloading */}
        {hasMore && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white border border-terracotta text-terracotta font-semibold text-xs tracking-wider uppercase hover:bg-terracotta hover:text-white transition-all duration-200 shadow-sm hover:shadow"
            >
              Load More Artworks ({filteredArtworks.length - visibleCount} remaining)
            </button>
          </div>
        )}

        {/* Collection Summary Counter */}
        <div className="mt-6 text-center text-xs tracking-wider uppercase text-muted font-medium">
          Showing {displayedArtworks.length} of {filteredArtworks.length} works in this view
        </div>

      </div>
    </section>
  );
}
