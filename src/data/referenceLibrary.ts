import { ReferenceOrganism } from '../types';

export const REFERENCE_ORGANISMS: ReferenceOrganism[] = [
  {
    id: 'org-s-aureus',
    name: 'Staphylococcus aureus',
    commonName: 'Golden Staph',
    category: 'Gram-Positive Bacteria',
    gramReaction: 'Gram-Positive',
    shape: 'Cocci',
    primaryMedia: ['Mannitol Salt Agar (MSA)', 'Blood Agar', 'Nutrient Agar'],
    colonyTraits: {
      color: 'Golden-yellow to cream',
      form: 'Circular, smooth',
      elevation: 'Convex',
      margin: 'Entire',
      hemolysis: 'Beta-hemolytic (wide zone)',
      uniqueFeature: 'Mannitol fermenter (turns MSA yellow), Staphyloxanthin golden carotenoid pigment.'
    },
    biochemicals: {
      catalase: 'Positive',
      oxidase: 'Negative',
      coagulase: 'Positive',
      urease: 'Positive',
      lactoseFermentation: 'Variable'
    },
    biosafetyLevel: 'BSL-2',
    clinicalSummary: 'Major human pathogen responsible for skin infections, abscesses, bacteremia, endocarditis, osteomyelitis, and toxic shock syndrome. High propensity for antibiotic resistance (MRSA).',
    commonInfections: ['Skin & Soft Tissue Infections', 'Surgical Site Infection', 'Infective Endocarditis', 'Toxic Shock Syndrome'],
    imageUrl: 'https://images.unsplash.com/photo-1583912267670-6575ad3736f3?w=500&auto=format&fit=crop&q=80',
    bgGradient: 'from-amber-500/20 to-yellow-600/10'
  },
  {
    id: 'org-e-coli',
    name: 'Escherichia coli',
    commonName: 'E. coli',
    category: 'Gram-Negative Bacteria',
    gramReaction: 'Gram-Negative',
    shape: 'Bacilli',
    primaryMedia: ['MacConkey Agar', 'Eosin Methylene Blue (EMB)', 'Blood Agar'],
    colonyTraits: {
      color: 'Pink (MacConkey) / Metallic Green Sheen (EMB)',
      form: 'Circular, smooth',
      elevation: 'Convex',
      margin: 'Entire',
      hemolysis: 'Gamma or Beta',
      uniqueFeature: 'Rapid lactose fermentation with high acid production resulting in metallic sheen on EMB.'
    },
    biochemicals: {
      catalase: 'Positive',
      oxidase: 'Negative',
      indole: 'Positive',
      citrate: 'Negative',
      urease: 'Negative',
      lactoseFermentation: 'Positive (Rapid)'
    },
    biosafetyLevel: 'BSL-1',
    clinicalSummary: 'Predominant facultative anaerobe of human colonic microbiota. Leading cause of urinary tract infections (UTI), neonatal meningitis, traveler diarrhea, and sepsis.',
    commonInfections: ['Urinary Tract Infection (UTI)', 'Gastroenteritis', 'Neonatal Sepsis', 'Peritonitis'],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80',
    bgGradient: 'from-indigo-500/20 to-pink-600/10'
  },
  {
    id: 'org-p-aeruginosa',
    name: 'Pseudomonas aeruginosa',
    commonName: 'Pseudomonas',
    category: 'Gram-Negative Bacteria',
    gramReaction: 'Gram-Negative',
    shape: 'Bacilli',
    primaryMedia: ['Nutrient Agar', 'Cetrimide Agar', 'MacConkey Agar'],
    colonyTraits: {
      color: 'Blue-green pigment (Pyocyanin & Pyoverdine)',
      form: 'Irregular, spreading',
      elevation: 'Flat',
      margin: 'Undulate',
      hemolysis: 'Beta-hemolytic',
      uniqueFeature: 'Diffusible blue-green pyocyanin pigment, metallic sheen, sweet grape-like or tortilla-like odor.'
    },
    biochemicals: {
      catalase: 'Positive',
      oxidase: 'Positive',
      indole: 'Negative',
      citrate: 'Positive',
      urease: 'Variable',
      lactoseFermentation: 'Negative (Non-lactose fermenter)'
    },
    biosafetyLevel: 'BSL-2',
    clinicalSummary: 'Opportunistic nosocomial pathogen with intrinsic multi-drug resistance. Causes severe burn infections, ventilator-associated pneumonia, and chronic respiratory illness in cystic fibrosis patients.',
    commonInfections: ['Ventilator Pneumonia', 'Burn Wound Infections', 'Otitis Externa (Swimmer ear)', 'Catheter Urosepsis'],
    imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=500&auto=format&fit=crop&q=80',
    bgGradient: 'from-emerald-500/20 to-teal-600/10'
  },
  {
    id: 'org-k-pneumoniae',
    name: 'Klebsiella pneumoniae',
    commonName: 'Friedländer Bacillus',
    category: 'Gram-Negative Bacteria',
    gramReaction: 'Gram-Negative',
    shape: 'Bacilli',
    primaryMedia: ['MacConkey Agar', 'CLED Agar', 'Blood Agar'],
    colonyTraits: {
      color: 'Mucoid Pink (MacConkey)',
      form: 'Circular, mucoid stringy',
      elevation: 'Convex, domed',
      margin: 'Entire',
      hemolysis: 'Gamma',
      uniqueFeature: 'Extremely mucoid colonies that string out when touched with an inoculating loop (hypervirulence string test).'
    },
    biochemicals: {
      catalase: 'Positive',
      oxidase: 'Negative',
      indole: 'Negative',
      citrate: 'Positive',
      urease: 'Positive',
      lactoseFermentation: 'Positive (Mucoid)'
    },
    biosafetyLevel: 'BSL-2',
    clinicalSummary: 'Encapsulated Gram-negative opportunist causing severe hospital-acquired pneumonia, liver abscesses, and UTIs. ESBL and Carbapenemase (KPC/NDM) producing strains are critical threats.',
    commonInfections: ['Lobar Pneumonia (Current Jelly Sputum)', 'Pyogenic Liver Abscess', 'Catheter UTIs', 'Bacteremia'],
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=500&auto=format&fit=crop&q=80',
    bgGradient: 'from-fuchsia-500/20 to-purple-600/10'
  },
  {
    id: 'org-s-pyogenes',
    name: 'Streptococcus pyogenes',
    commonName: 'Group A Streptococcus (GAS)',
    category: 'Gram-Positive Bacteria',
    gramReaction: 'Gram-Positive',
    shape: 'Cocci',
    primaryMedia: ['5% Sheep Blood Agar'],
    colonyTraits: {
      color: 'Translucent grayish white',
      form: 'Circular, pinpoint',
      elevation: 'Convex or flat',
      margin: 'Entire',
      hemolysis: 'Beta-hemolytic (wide, clear zone)',
      uniqueFeature: 'Wide clear beta-hemolysis due to Streptolysin S and O toxins. Sensitive to 0.04U Bacitracin disk.'
    },
    biochemicals: {
      catalase: 'Negative',
      oxidase: 'Negative',
      coagulase: 'Negative',
      lactoseFermentation: 'N/A'
    },
    biosafetyLevel: 'BSL-2',
    clinicalSummary: 'Primary cause of bacterial pharyngitis (strep throat), impetigo, erysipelas, necrotizing fasciitis (flesh-eating bacteria), rheumatic fever, and acute post-streptococcal glomerulonephritis.',
    commonInfections: ['Streptococcal Pharyngitis', 'Necrotizing Fasciitis', 'Scarlet Fever', 'Acute Rheumatic Fever'],
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&auto=format&fit=crop&q=80',
    bgGradient: 'from-rose-500/20 to-red-600/10'
  },
  {
    id: 'org-s-pneumoniae',
    name: 'Streptococcus pneumoniae',
    commonName: 'Pneumococcus',
    category: 'Gram-Positive Bacteria',
    gramReaction: 'Gram-Positive',
    shape: 'Cocci',
    primaryMedia: ['Blood Agar', 'Chocolate Agar'],
    colonyTraits: {
      color: 'Grayish, draughtsman-like',
      form: 'Circular with central depression',
      elevation: 'Umbonate / Depressed center',
      margin: 'Entire',
      hemolysis: 'Alpha-hemolytic (green clearance)',
      uniqueFeature: 'Autolysis produces characteristic coin-shaped or draughtsman colonies. Optochin sensitive (zone >= 14mm).'
    },
    biochemicals: {
      catalase: 'Negative',
      oxidase: 'Negative',
      lactoseFermentation: 'N/A'
    },
    biosafetyLevel: 'BSL-2',
    clinicalSummary: 'Encapsulated diplococcus that is the leading cause of community-acquired pneumonia, otitis media, sinusitis, and bacterial meningitis in adults and children.',
    commonInfections: ['Community-Acquired Pneumonia', 'Bacterial Meningitis', 'Acute Otitis Media', 'Sinusitis'],
    imageUrl: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=500&auto=format&fit=crop&q=80',
    bgGradient: 'from-teal-500/20 to-cyan-600/10'
  },
  {
    id: 'org-c-albicans',
    name: 'Candida albicans',
    commonName: 'Candida / Thrush Yeast',
    category: 'Fungi/Yeast',
    gramReaction: 'Fungi',
    shape: 'Yeast/Hyphae',
    primaryMedia: ['Sabouraud Dextrose Agar (SDA)', 'CHROMagar Candida', 'Blood Agar'],
    colonyTraits: {
      color: 'Cream to white (SDA) / Emerald Green (CHROMagar)',
      form: 'Circular, smooth',
      elevation: 'Convex',
      margin: 'Entire or slightly feathery',
      hemolysis: 'Gamma',
      uniqueFeature: 'Forms positive germ tubes when incubated in mammalian serum for 2-3 hours at 37°C.'
    },
    biochemicals: {
      catalase: 'Positive',
      oxidase: 'N/A',
      lactoseFermentation: 'N/A'
    },
    biosafetyLevel: 'BSL-1',
    clinicalSummary: 'Dimorphic commensal fungus that causes oral candidiasis (thrush), vulvovaginal candidiasis, invasive candidemia in immunocompromised host, and catheter fungal infections.',
    commonInfections: ['Oral Thrush', 'Vulvovaginal Candidiasis', 'Candidemia / Systemic Fungal Sepsis', 'Intertrigo'],
    imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=500&auto=format&fit=crop&q=80',
    bgGradient: 'from-amber-500/20 to-orange-600/10'
  },
  {
    id: 'org-b-subtilis',
    name: 'Bacillus subtilis',
    commonName: 'Hay Bacillus',
    category: 'Gram-Positive Bacteria',
    gramReaction: 'Gram-Positive',
    shape: 'Bacilli',
    primaryMedia: ['Nutrient Agar', 'Tryptic Soy Agar (TSA)'],
    colonyTraits: {
      color: 'Dull grayish-white',
      form: 'Irregular, spreading, rough',
      elevation: 'Flat or raised',
      margin: 'Undulate or lobate',
      hemolysis: 'Beta-hemolytic',
      uniqueFeature: 'Spore-forming aerobic bacillus with dry, dull, wrinkled colony morphology.'
    },
    biochemicals: {
      catalase: 'Positive',
      oxidase: 'Positive',
      citrate: 'Positive',
      urease: 'Negative',
      lactoseFermentation: 'Negative'
    },
    biosafetyLevel: 'BSL-1',
    clinicalSummary: 'Non-pathogenic environmental spore-forming rod widely used as a laboratory model organism, biological indicator for sterilizers, and probiotic strain.',
    commonInfections: ['Rare Opportunistic Eye Infection (Trauma)', 'Generally Non-Pathogenic / Environmental'],
    imageUrl: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=500&auto=format&fit=crop&q=80',
    bgGradient: 'from-emerald-500/20 to-lime-600/10'
  },
  {
    id: 'org-proteus-mirabilis',
    name: 'Proteus mirabilis',
    commonName: 'Proteus',
    category: 'Gram-Negative Bacteria',
    gramReaction: 'Gram-Negative',
    shape: 'Bacilli',
    primaryMedia: ['Blood Agar', 'Nutrient Agar', 'MacConkey Agar'],
    colonyTraits: {
      color: 'Translucent gray',
      form: 'Concentric swarming rings',
      elevation: 'Flat film',
      margin: 'Lobate / Ripple waves',
      hemolysis: 'Beta or Gamma',
      uniqueFeature: 'Hyperflagellated cells cause dramatic waves of swarming motility across non-inhibitory blood agar.'
    },
    biochemicals: {
      catalase: 'Positive',
      oxidase: 'Negative',
      indole: 'Negative',
      citrate: 'Positive',
      urease: 'Positive (Rapid strong hydrolyzer)',
      lactoseFermentation: 'Negative (Non-lactose fermenter)'
    },
    biosafetyLevel: 'BSL-2',
    clinicalSummary: 'Potent urease producer causing rapid urinary alkalinization leading to magnesium ammonium phosphate (struvite/staghorn) kidney stones.',
    commonInfections: ['Complicated UTI', 'Staghorn Renal Calculi', 'Wound Infection', 'Catheter Sepsis'],
    imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=500&auto=format&fit=crop&q=80',
    bgGradient: 'from-blue-500/20 to-indigo-600/10'
  },
  {
    id: 'org-s-marcescens',
    name: 'Serratia marcescens',
    commonName: 'Red Bacillus',
    category: 'Gram-Negative Bacteria',
    gramReaction: 'Gram-Negative',
    shape: 'Bacilli',
    primaryMedia: ['Nutrient Agar', 'MacConkey Agar'],
    colonyTraits: {
      color: 'Crimson red (at 25-28°C)',
      form: 'Circular, smooth',
      elevation: 'Convex',
      margin: 'Entire',
      hemolysis: 'Gamma',
      uniqueFeature: 'Produces temperature-dependent red tripyrrole pigment (prodigiosin).'
    },
    biochemicals: {
      catalase: 'Positive',
      oxidase: 'Negative',
      indole: 'Negative',
      citrate: 'Positive',
      urease: 'Variable',
      lactoseFermentation: 'Late / Slow fermenter'
    },
    biosafetyLevel: 'BSL-2',
    clinicalSummary: 'Opportunistic pathogen involved in hospital outbreaks, urinary tract infections, bloodstream infections, and respiratory tract colonization.',
    commonInfections: ['Nosocomial UTI', 'Catheter Sepsis', 'Post-Surgical Wound Infection'],
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80',
    bgGradient: 'from-red-500/20 to-rose-600/10'
  }
];
