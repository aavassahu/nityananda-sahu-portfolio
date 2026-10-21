import React, { useEffect, useCallback } from 'react';

export default function Lightbox({ currentArtwork, collection, onClose, onNavigate }) {
  if (!currentArtwork || !collection || collection.length === 0) return null;

  const currentIndex = collection.findIndex(item => item.id === currentArtwork.id);
  const totalItems = collection.length;

  const handleNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % totalItems;
    onNavigate(collection[nextIndex]);
  }, [currentIndex, totalItems, collection, onNavigate]);

  const handlePrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
    onNavigate(collection[prevIndex]);
  }, [currentIndex, totalItems, collection, onNavigate]);

  useEffect(() => {
    // Body scroll lock
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, handleNext, handlePrev]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 z-50 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors focus:outline-none"
        aria-label="Close Lightbox"
      >
        <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev Navigation Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all duration-200 focus:outline-none"
        aria-label="Previous artwork"
      >
        <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Navigation Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all duration-200 focus:outline-none"
        aria-label="Next artwork"
      >
        <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Main Image Container */}
      <div
        className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentArtwork.src}
          alt={currentArtwork.alt}
          className="max-w-[90vw] max-h-[75vh] object-contain rounded shadow-2xl transition-transform duration-300"
          decoding="async"
          onError={(e) => {
            if (!e.target.dataset.tried) {
              e.target.dataset.tried = 'true';
              if (e.target.src.endsWith('.jpg')) {
                e.target.src = e.target.src.replace(/\.jpg$/, '.JPG');
              } else if (e.target.src.endsWith('.JPG')) {
                e.target.src = e.target.src.replace(/\.JPG$/, '.jpg');
              }
            }
          }}
        />

        {/* Captions & Counter */}
        <div className="w-full mt-4 flex items-center justify-between text-white/90 px-2">
          <div>
            <h3 className="font-heading text-lg font-bold">
              {currentArtwork.categoryLabel} &mdash; <span className="font-normal italic">Plate No. {currentArtwork.plateNumber}</span>
            </h3>
            <p className="text-xs text-white/60 tracking-wider uppercase font-subtitle mt-0.5">
              {currentArtwork.medium}
            </p>
          </div>
          <div className="font-subtitle text-xs tracking-widest uppercase text-terracotta bg-white/10 px-3 py-1 rounded-full border border-white/15">
            {currentIndex + 1} / {totalItems}
          </div>
        </div>
      </div>
    </div>
  );
}
