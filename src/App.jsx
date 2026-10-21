import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Lightbox from './components/Lightbox';
import BioCommissions from './components/BioCommissions';
import Honors from './components/Honors';
import Contact from './components/Contact';

export default function App() {
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [activeCollection, setActiveCollection] = useState([]);

  const handleSelectArtwork = (artwork, collection) => {
    setSelectedArtwork(artwork);
    setActiveCollection(collection);
  };

  const handleCloseLightbox = () => {
    setSelectedArtwork(null);
  };

  const handleNavigateLightbox = (nextArtwork) => {
    setSelectedArtwork(nextArtwork);
  };

  return (
    <div className="min-h-screen bg-canvas text-charcoal font-body selection:bg-terracotta selection:text-white">
      {/* Fixed Sticky Header */}
      <Navbar />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Selected Works Gallery with Category Filtering */}
        <Gallery onSelectArtwork={handleSelectArtwork} />

        {/* Academic Profile & Signature Commissions */}
        <BioCommissions />

        {/* Fellowships, Awards & Historic Camps */}
        <Honors />

        {/* Contact, Studio Locations & Footer */}
        <Contact />
      </main>

      {/* Fullscreen Modal Lightbox */}
      {selectedArtwork && (
        <Lightbox
          currentArtwork={selectedArtwork}
          collection={activeCollection}
          onClose={handleCloseLightbox}
          onNavigate={handleNavigateLightbox}
        />
      )}
    </div>
  );
}
