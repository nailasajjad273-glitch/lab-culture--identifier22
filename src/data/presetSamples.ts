import { PresetSampleSpecimen } from '../types';

// Helper SVG generator for realistic agar plate renderings
function generateAgarPlateSvg(
  mediumColor: string,
  colonyColor: string,
  colonyCount: number,
  type: 'golden' | 'green_sheen' | 'pink_mucoid' | 'hemolysis' | 'pyocyanin' | 'creamy' | 'red_prodigiosin'
): string {
  let colonyElements = '';
  
  if (type === 'golden') {
    // S. aureus golden circular colonies on Mannitol Salt Agar or Blood Agar
    for (let i = 0; i < colonyCount; i++) {
      const cx = 100 + (Math.sin(i * 1.3) * 60);
      const cy = 100 + (Math.cos(i * 1.7) * 60);
      const r = 4 + (i % 3);
      colonyElements += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r}" fill="#f59e0b" stroke="#fef3c7" stroke-width="0.8" opacity="0.95"/>`;
    }
  } else if (type === 'green_sheen') {
    // E. coli metallic green sheen on EMB agar
    for (let i = 0; i < colonyCount; i++) {
      const cx = 100 + (Math.sin(i * 0.9) * 65);
      const cy = 100 + (Math.cos(i * 1.1) * 65);
      const r = 3 + (i % 4);
      colonyElements += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r}" fill="#10b981" stroke="#34d399" stroke-width="1.2" opacity="0.98"/>`;
    }
  } else if (type === 'pink_mucoid') {
    // Klebsiella or E. coli pink lactose-fermenting colonies on MacConkey
    for (let i = 0; i < colonyCount; i++) {
      const cx = 100 + (Math.sin(i * 1.5) * 55);
      const cy = 100 + (Math.cos(i * 1.4) * 55);
      const r = 5 + (i % 4);
      colonyElements += `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${r}" ry="${r*0.9}" fill="#ec4899" stroke="#fbcfe8" stroke-width="1" opacity="0.9"/>`;
    }
  } else if (type === 'hemolysis') {
    // S. pyogenes beta hemolysis (clear zones around colonies) on Blood Agar
    for (let i = 0; i < colonyCount; i++) {
      const cx = 100 + (Math.sin(i * 1.2) * 58);
      const cy = 100 + (Math.cos(i * 1.2) * 58);
      // Halo zone
      colonyElements += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="12" fill="#fef08a" opacity="0.35"/>`;
      // Colony
      colonyElements += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="3" fill="#e2e8f0" stroke="#94a3b8" stroke-width="0.5"/>`;
    }
  } else if (type === 'pyocyanin') {
    // Pseudomonas pyocyanin green pigment diffusion on Nutrient agar
    colonyElements += `<circle cx="100" cy="100" r="75" fill="#0d9488" opacity="0.4" filter="blur(8px)"/>`;
    for (let i = 0; i < colonyCount; i++) {
      const cx = 100 + (Math.sin(i * 1.6) * 50);
      const cy = 100 + (Math.cos(i * 1.8) * 50);
      colonyElements += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="4.5" fill="#14b8a6" stroke="#ccfbf1" stroke-width="0.8"/>`;
    }
  } else if (type === 'red_prodigiosin') {
    // Serratia marcescens red prodigiosin pigment
    for (let i = 0; i < colonyCount; i++) {
      const cx = 100 + (Math.sin(i * 1.4) * 60);
      const cy = 100 + (Math.cos(i * 1.3) * 60);
      colonyElements += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="4" fill="#dc2626" stroke="#fca5a5" stroke-width="0.8"/>`;
    }
  } else {
    // Creamy yeast on SDA
    for (let i = 0; i < colonyCount; i++) {
      const cx = 100 + (Math.sin(i * 1.1) * 55);
      const cy = 100 + (Math.cos(i * 1.5) * 55);
      colonyElements += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="5" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>`;
    }
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="400" height="400">
    <defs>
      <radialGradient id="agarGrad_${type}" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
        <stop offset="0%" stop-color="${mediumColor}" stop-opacity="0.95"/>
        <stop offset="85%" stop-color="${mediumColor}" stop-opacity="1"/>
        <stop offset="100%" stop-color="#1e293b"/>
      </radialGradient>
      <linearGradient id="glassRim" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.6"/>
        <stop offset="50%" stop-color="#94a3b8" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#0f172a" stop-opacity="0.8"/>
      </linearGradient>
    </defs>
    <!-- Petri Dish Glass Base -->
    <circle cx="100" cy="100" r="94" fill="#0f172a"/>
    <circle cx="100" cy="100" r="90" fill="url(#agarGrad_${type})"/>
    
    <!-- Culture Colonies -->
    ${colonyElements}
    
    <!-- Petri Dish Rim Highlight -->
    <circle cx="100" cy="100" r="92" fill="none" stroke="url(#glassRim)" stroke-width="3"/>
    <circle cx="100" cy="100" r="88" fill="none" stroke="#ffffff" stroke-width="0.5" opacity="0.3"/>
    <!-- Quad streak quadrant line faint indication -->
    <path d="M 100 20 L 100 180 M 20 100 L 180 100" stroke="#ffffff" stroke-width="0.5" opacity="0.15" stroke-dasharray="2,2"/>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const PRESET_SAMPLE_SPECIMENS: PresetSampleSpecimen[] = [
  {
    id: 'sample-1',
    title: 'Golden Circular Colonies',
    organismName: 'Staphylococcus aureus',
    agarMedium: 'Mannitol Salt Agar (MSA) / Blood Agar',
    description: 'Golden-yellow carotenoid (staphyloxanthin) pigmented circular, convex, smooth colonies with beta-hemolysis on blood agar.',
    imageUrl: generateAgarPlateSvg('#78350f', '#f59e0b', 22, 'golden'),
    specimenSource: 'Wound Swab / Abscess Specimen',
    observedTraits: 'Gram-positive cocci in clusters, Catalase (+), Coagulase (+), Beta-hemolytic, Mannitol fermentation positive (yellow turn).'
  },
  {
    id: 'sample-2',
    title: 'Metallic Green Sheen',
    organismName: 'Escherichia coli',
    agarMedium: 'Eosin Methylene Blue (EMB) Agar',
    description: 'Rapid lactose fermenter producing dark purple colonies with a characteristic brilliant metallic green sheen.',
    imageUrl: generateAgarPlateSvg('#312e81', '#10b981', 25, 'green_sheen'),
    specimenSource: 'Mid-stream Urine Culture',
    observedTraits: 'Gram-negative rod, Indole (+), Methyl Red (+), Voges-Proskauer (-), Citrate (-), Lactose Fermenter.'
  },
  {
    id: 'sample-3',
    title: 'Mucoid Pink Colonies',
    organismName: 'Klebsiella pneumoniae',
    agarMedium: 'MacConkey Agar',
    description: 'Large, mucoid, bright pink lactose-fermenting colonies due to heavy polysaccharide capsule production.',
    imageUrl: generateAgarPlateSvg('#831843', '#ec4899', 18, 'pink_mucoid'),
    specimenSource: 'Sputum Specimen / Endotracheal Aspirate',
    observedTraits: 'Gram-negative encapsulated rod, Non-motile, Indole (-), Citrate (+), Urease (+), Lactose fermenter.'
  },
  {
    id: 'sample-4',
    title: 'Beta-Hemolytic Clear Zones',
    organismName: 'Streptococcus pyogenes (Group A)',
    agarMedium: '5% Sheep Blood Agar',
    description: 'Small pinpoint translucent colonies surrounded by a wide, completely clear zone of beta-hemolysis.',
    imageUrl: generateAgarPlateSvg('#7f1d1d', '#fef08a', 20, 'hemolysis'),
    specimenSource: 'Throat Swab / Pharyngitis',
    observedTraits: 'Gram-positive cocci in chains, Catalase (-), Bacitracin sensitive, Pyrrolidonyl arylamidase (PYR) positive.'
  },
  {
    id: 'sample-5',
    title: 'Blue-Green Pigmented Diffuse Growth',
    organismName: 'Pseudomonas aeruginosa',
    agarMedium: 'Nutrient Agar / Cetrimide Agar',
    description: 'Flat, spreading colonies with metallic iridescent sheen and characteristic blue-green pyocyanin/pyoverdine pigment diffusing into agar.',
    imageUrl: generateAgarPlateSvg('#064e3b', '#14b8a6', 16, 'pyocyanin'),
    specimenSource: 'Burn Wound Swab / Bronchial Wash',
    observedTraits: 'Gram-negative rod, Oxidase (+), Non-lactose fermenter, Sweet grape/tortilla odor, Growth at 42°C.'
  },
  {
    id: 'sample-6',
    title: 'Bright Red Pigmented Colonies',
    organismName: 'Serratia marcescens',
    agarMedium: 'Nutrient Agar',
    description: 'Smooth, convex, intense crimson-red colonies due to prodigiosin pigment synthesis when grown at 25-28°C.',
    imageUrl: generateAgarPlateSvg('#450a0a', '#dc2626', 24, 'red_prodigiosin'),
    specimenSource: 'Catheter Tip / Environmental Swab',
    observedTraits: 'Gram-negative motile bacillus, DNase (+), Gelatinase (+), Lipase (+), Prodigiosin pigment positive.'
  },
  {
    id: 'sample-7',
    title: 'Smooth Creamy Convex Yeast',
    organismName: 'Candida albicans',
    agarMedium: 'Sabouraud Dextrose Agar (SDA)',
    description: 'Smooth, creamy, convex, opaque white-to-cream colonies with a distinct yeasty yeast-bread odor.',
    imageUrl: generateAgarPlateSvg('#f1f5f9', '#ffffff', 20, 'creamy'),
    specimenSource: 'Oral Swab / Vaginal Secretions',
    observedTraits: 'Gram-positive oval yeast cells with budding, Germ tube positive in serum at 37°C, Chlamydospore positive.'
  }
];
