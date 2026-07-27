https://lab-culture-identifier22.vercel.app# 🔬 Clinical Microbiology Culture Identifier & Diagnostic Suite

[![Live Demo](https://img.shields.io/badge/Live_Demo-lab--culture--identifier22.vercel.app-059669?style=for-the-badge&logo=vercel)](https://lab-culture-identifier22.vercel.app/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

An advanced AI-powered clinical microbiology and diagnostic decision-support system. Designed for medical laboratory scientists, pathologists, microbiologists, and medical students, this web platform provides computer vision analysis of agar culture plates, interactive biochemical differential matrix solvers, Kirby-Bauer antimicrobial susceptibility testing (AST) calculators, a reference pathogen atlas, and automated clinical lab report generation.

🌐 **Live Application:** [https://lab-culture-identifier22.vercel.app/](https://lab-culture-identifier22.vercel.app/)

---

## ✨ Key Features & Capabilities

### 1. 🧬 AI Agar Culture Colony Identifier
- **Computer Vision Analysis**: Upload or capture high-resolution images of agar culture plates (Blood Agar, MacConkey, Sabouraud Dextrose, CLED, Mueller-Hinton, Chocolate Agar, Mannitol Salt Agar, etc.).
- **Morphology Profiling**: Analyzes key macroscopic colony features including form (punctiform, circular, irregular), elevation (convex, flat, umbonate), margin (entire, undulate, filamentous), color/pigmentation, hemolysis pattern ($\alpha$, $\beta$, $\gamma$), and texture.
- **Pathogen Identification**: Powered by Gemini multimodal model vision pipeline to identify target bacteria/fungi with confidence scoring and differential diagnosis likelihood percentages.
- **Biosafety & Clinical Pearls**: Instantly displays Biosafety Levels (BSL-2 / BSL-3), recommended confirmatory benchtop tests, primary specimen sources, and clinical infectious risks.

### 2. 🧫 Interactive Biochemical Decision Matrix
- **Dual-Branch Decision Trees**: Interactive diagnostic decision solver categorized into Gram-Positive and Gram-Negative pathways.
- **Benchtop Test Filtering**: Select key reaction results:
  - **Gram-Positive**: Catalase, Coagulase, Novobiocin, Optochin, Bacitracin, Bile Esculin, Hemolysis, 6.5% NaCl tolerance.
  - **Gram-Negative**: Oxidase, Lactose Fermentation (MacConkey), Indole, Citrate, Urease, TSI (Triple Sugar Iron agar), Motility, H₂S Production, Methyl Red / Voges-Proskauer.
- **Dynamic Matching Engine**: Narrows down possible bacterial species in real-time as tests are selected.

### 3. 🧫 Kirby-Bauer AST Calculator & Superbug Alert System
- **CLSI M100 & EUCAST Breakpoints**: Measure inhibition zone diameters in millimeters ($\text{mm}$) and evaluate sensitivity profiles: Sensitive ($S$), Intermediate ($I$), or Resistant ($R$).
- **Visual Agar Plate Simulator**: Interactive 90mm Petri dish simulator displaying proportional zones of inhibition surrounding antibiotic paper disks.
- **Superbug Resistance Phenotypes**:
  - **MRSA Alert**: Detects Methicillin-Resistant *Staphylococcus aureus* via Cefoxitin disk screening ($\le 21\,\text{mm}$).
  - **CRE Alert**: Flags Carbapenem-Resistant Enterobacteriaceae on Meropenem resistance ($\le 19\,\text{mm}$).
  - **ESBL Alert**: Warns against Extended-Spectrum Beta-Lactamase producers via 3rd-gen cephalosporin resistance.

### 4. 📚 Reference Microbiology Atlas
- **Pathogen Library**: Detailed clinical reference files covering major Gram-positive, Gram-negative, Acid-fast, and Fungal organisms.
- **Diagnostic Specs**: Includes growth media preferences, optimal incubation temperatures, colony morphology descriptions, biochemical hallmarks, and associated human clinical conditions.
- **Search & Filter**: Easily filter pathogens by Gram reaction, BSL classification, or disease keyword.

### 5. 🎓 Clinical Case Quiz & Spotter Simulator
- **Interactive Vignettes**: Clinical patient histories, specimen sources, agar descriptions, Gram stain findings, and biochemical test results.
- **AI Case Generator**: Integrated option to dynamically generate fresh, realistic microbiology spotter cases on demand for medical education and board exam practice.
- **Performance Tracking**: Instant diagnostic feedback with clinical pearls and score tracking.

### 6. 📄 Official Clinical Lab Report Generator
- **Printable Diagnostics**: Generates standardized clinical microbiology laboratory reports complete with specimen metadata, primary culture ID, differential likelihoods, and pathologist signoff blocks.
- **Local Persistence**: Automatically saves report histories locally for review and re-printing.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite 6, Tailwind CSS v4, Lucide React Icons, Framer Motion.
- **Backend API**: Express.js server providing secure proxy endpoints for Google Gemini AI vision and text generation (`@google/genai` SDK).
- **Build System**: Vite + ESBuild bundling with CommonJS runtime compilation.
- **Deployment Platform**: Vercel / Cloud Run compatible containerization.

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js** (v18.0 or higher)
- **npm** or **yarn**
- **Google Gemini API Key** (obtainable from [Google AI Studio](https://aistudio.google.com/))

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/lab-culture-identifier.git
   cd lab-culture-identifier
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory (refer to `.env.example`):
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   The application will run locally at `http://localhost:3000`.

5. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

---

## 🔐 Security & Privacy
- **Server-Side API Proxying**: API keys (such as `GEMINI_API_KEY`) remain strictly on the backend server (`server.ts`) and are never exposed in client-side bundles or browser DevTools.
- **No PHI Storage**: All specimen simulations use anonymized clinical parameters for diagnostic educational and laboratory support.

---

## 📜 Disclaimer
*This platform is designed for laboratory education, training, and clinical workflow assistance. Diagnostic identification results should be confirmed with standard operational laboratory protocols (e.g., MALDI-TOF MS, VITEK, automated AST panels, PCR) in accordance with clinical pathology guidelines.*

---

## 📄 License
Licensed under the Apache License, Version 2.0.
vvvv 
