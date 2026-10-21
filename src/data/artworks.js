// Programmatically generated collection of 127 artworks by Shri Nityananda Sahu
// Sculptures: 27 items, Realistic: 50 items, Portraits: 50 items
// Accurately maps mixed disk extensions (.jpg vs .JPG)

const uppercaseSculptures = new Set([22]);
const uppercasePortraits = new Set([7, 13, 21, 22, 33, 36, 43]);

const sculptures = Array.from({ length: 27 }, (_, i) => {
  const plate = i + 1;
  const ext = uppercaseSculptures.has(plate) ? 'JPG' : 'jpg';
  return {
    id: `sculpture-${plate}`,
    plateNumber: plate,
    category: 'sculpture',
    categoryLabel: 'Sculpture',
    medium: 'Granite & Mixed Media',
    src: `pictures/sculpture/${plate}.${ext}`,
    alt: `Sculpture by Shri Nityananda Sahu — Plate No. ${plate}`
  };
});

const realistic = Array.from({ length: 50 }, (_, i) => {
  const plate = i + 1;
  return {
    id: `realistic-${plate}`,
    plateNumber: plate,
    category: 'realistic',
    categoryLabel: 'Realistic Painting',
    medium: 'Oil on Canvas',
    src: `pictures/realistic/${plate}.jpg`,
    alt: `Realistic Painting by Shri Nityananda Sahu — Plate No. ${plate}`
  };
});

const portraits = Array.from({ length: 50 }, (_, i) => {
  const plate = i + 1;
  const ext = uppercasePortraits.has(plate) ? 'JPG' : 'jpg';
  return {
    id: `portrait-${plate}`,
    plateNumber: plate,
    category: 'portrait',
    categoryLabel: 'Portrait',
    medium: 'Oil on Canvas',
    src: `pictures/portrait/${plate}.${ext}`,
    alt: `Portrait by Shri Nityananda Sahu — Plate No. ${plate}`
  };
});

// Proportional interleaving algorithm for a balanced, rhythmic museum curation
function interleaveArtworks(sList, rList, pList) {
  const s = [...sList];
  const r = [...rList];
  const p = [...pList];
  const result = [];
  
  while (s.length > 0 || r.length > 0 || p.length > 0) {
    if (r.length > 0) result.push(r.shift());
    if (p.length > 0) result.push(p.shift());
    if (s.length > 0 && result.length % 4 === 0) result.push(s.shift());
    if (r.length > 0) result.push(r.shift());
    if (p.length > 0) result.push(p.shift());
    if (s.length > 0) result.push(s.shift());
  }
  return result;
}

export const curatedArtworks = interleaveArtworks(sculptures, realistic, portraits);

export const allArtworks = {
  all: curatedArtworks,
  sculpture: sculptures,
  realistic: realistic,
  portrait: portraits
};

export const stats = {
  total: 127,
  sculpture: 27,
  realistic: 50,
  portrait: 50
};
