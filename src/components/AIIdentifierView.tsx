import React, { useState, useRef } from 'react';
import { CultureIdentificationResult, PresetSampleSpecimen } from '../types';
import { PRESET_SAMPLE_SPECIMENS } from '../data/presetSamples';
import { 
  Upload, Camera, Sparkles, AlertTriangle, ShieldCheck, 
  Layers, CheckCircle2, FlaskConical, FileText, RefreshCw, 
  HelpCircle, Info, Stethoscope, Microchip, ChevronRight, Microscope
} from 'lucide-react';

interface AIIdentifierViewProps {
  onIdentificationComplete: (result: CultureIdentificationResult) => void;
  onOpenReportModal: (result: CultureIdentificationResult) => void;
}

export const AIIdentifierView: React.FC<AIIdentifierViewProps> = ({
  onIdentificationComplete,
  onOpenReportModal,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string>('image/jpeg');
  const [specimenSource, setSpecimenSource] = useState<string>('Wound Swab / Abscess');
  const [agarMedium, setAgarMedium] = useState<string>('Blood Agar');
  const [observedTraits, setObservedTraits] = useState<string>('');
  
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [result, setResult] = useState<CultureIdentificationResult | null>(null);

  // Camera state
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const specimenSourceOptions = [
    'Wound Swab / Abscess',
    'Mid-stream Urine',
    'Blood Culture Bottle',
    'Sputum / Respiratory Tract',
    'Stool / Gastrointestinal Swab',
    'Cerebrospinal Fluid (CSF)',
    'Catheter Tip',
    'Skin / Nail Scraping',
    'Environmental / Surface Swab'
  ];

  const agarMediumOptions = [
    '5% Sheep Blood Agar',
    'MacConkey Agar',
    'Mannitol Salt Agar (MSA)',
    'Eosin Methylene Blue (EMB)',
    'Sabouraud Dextrose Agar (SDA)',
    'Nutrient Agar',
    'Cetrimide Agar',
    'Chocolate Agar',
    'CLED Agar',
    'TCBS Agar',
    'Auto-Detect Medium'
  ];

  // File Upload Handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        setAnalysisError('File size exceeds 15MB limit. Please upload a smaller image.');
        return;
      }
      setImageMimeType(file.type || 'image/jpeg');
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setAnalysisError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // Preset Specimen Handler
  const handleSelectPreset = (preset: PresetSampleSpecimen) => {
    setSelectedImage(preset.imageUrl);
    setImageMimeType('image/svg+xml');
    setAgarMedium(preset.agarMedium);
    setSpecimenSource(preset.specimenSource);
    setObservedTraits(preset.observedTraits);
    setAnalysisError(null);
  };

  // Camera Start
  const startCamera = async () => {
    try {
      setAnalysisError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } } 
      });
      setMediaStream(stream);
      setIsCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err: any) {
      console.error("Camera access error:", err);
      setAnalysisError('Unable to access camera. Please check permissions or upload an image file.');
    }
  };

  // Capture Photo
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setSelectedImage(dataUrl);
        setImageMimeType('image/jpeg');
        stopCamera();
      }
    }
  };

  // Stop Camera
  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
      setMediaStream(null);
    }
    setIsCameraActive(false);
  };

  // Run AI Culture Identification
  const runIdentification = async () => {
    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const response = await fetch('/api/identify-culture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: selectedImage,
          imageMimeType: imageMimeType,
          agarMedium,
          specimenSource,
          observedTraits
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to complete culture identification.');
      }

      const identificationData: CultureIdentificationResult = {
        ...data.data,
        id: 'CR-' + Math.floor(100000 + Math.random() * 900000),
        timestamp: new Date().toLocaleString(),
        specimenSource,
        agarMedium,
        imagePreviewUrl: selectedImage || undefined,
        technologistNotes: observedTraits
      };

      setResult(identificationData);
      onIdentificationComplete(identificationData);
    } catch (err: any) {
      console.error('Identification Error:', err);
      setAnalysisError(err.message || 'An error occurred during AI analysis. Please verify server connection.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-6 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-1">
              <Microchip className="w-4 h-4" /> Multimodal Clinical Vision Engine
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
              AI Laboratory Culture Identifier
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Upload or snap a photo of an agar plate culture or microscopic slide. Gemini AI analyzes colony morphology, hemolysis, pigmentation, and growth media to deliver instant pathogen identification and diagnostic profiles.
            </p>
          </div>

          <div className="flex items-center space-x-3 self-start md:self-center">
            <span className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Gemini 3.6 Flash
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Specimen Input & Setup */}
        <div className="lg:col-span-5 space-y-6">
          {/* Image Capture Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-slate-100 flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-emerald-400" /> Culture Specimen Image
              </h2>
              {selectedImage && (
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setResult(null);
                  }}
                  className="text-xs text-rose-400 hover:text-rose-300 font-medium"
                >
                  Clear Image
                </button>
              )}
            </div>

            {/* Camera Active View */}
            {isCameraActive ? (
              <div className="relative rounded-xl overflow-hidden bg-slate-950 aspect-video border border-slate-700">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                <canvas ref={canvasRef} className="hidden" />
                <div className="absolute bottom-4 inset-x-0 flex justify-center space-x-3">
                  <button
                    onClick={capturePhoto}
                    className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg shadow-lg flex items-center gap-2 text-sm"
                  >
                    <Camera className="w-4 h-4" /> Snap Photo
                  </button>
                  <button
                    onClick={stopCamera}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : selectedImage ? (
              /* Selected Image Preview */
              <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 group">
                <img
                  src={selectedImage}
                  alt="Culture Specimen"
                  className="w-full h-64 object-contain bg-slate-950/80 p-2"
                />
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-slate-800 text-slate-200 rounded-lg text-xs font-medium hover:bg-slate-700"
                  >
                    Replace Image
                  </button>
                </div>
              </div>
            ) : (
              /* Dropzone Placeholder */
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-700 hover:border-emerald-500/50 rounded-xl p-8 text-center bg-slate-950/40 hover:bg-slate-950/80 transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full bg-slate-800 group-hover:bg-emerald-500/10 text-slate-400 group-hover:text-emerald-400 flex items-center justify-center mx-auto mb-3 transition-colors">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-slate-200">
                  Click to upload agar plate or microscopy photo
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Supports JPG, PNG, WEBP (Max 15MB)
                </p>
                <div className="mt-4 flex items-center justify-center space-x-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      startCamera();
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg text-xs font-medium flex items-center gap-1.5 border border-slate-700"
                  >
                    <Camera className="w-3.5 h-3.5" /> Use Live Camera
                  </button>
                </div>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Quick Test Presets */}
            <div className="pt-2">
              <label className="text-xs font-semibold text-slate-400 block mb-2">
                Or select a reference agar culture specimen:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PRESET_SAMPLE_SPECIMENS.slice(0, 4).map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className="flex items-center space-x-2.5 p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-left transition-all"
                  >
                    <img src={preset.imageUrl} alt={preset.title} className="w-8 h-8 rounded-full object-cover bg-slate-900 border border-slate-700" />
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-200 truncate">{preset.organismName}</p>
                      <p className="text-[10px] text-slate-400 truncate">{preset.agarMedium}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Specimen Context Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
            <h2 className="text-base font-semibold text-slate-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" /> Specimen & Growth Context
            </h2>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Specimen Origin / Source
              </label>
              <select
                value={specimenSource}
                onChange={(e) => setSpecimenSource(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                {specimenSourceOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Primary Isolation Agar Medium
              </label>
              <select
                value={agarMedium}
                onChange={(e) => setAgarMedium(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                {agarMediumOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Technologist Notes / Observed Traits (Optional)
              </label>
              <textarea
                value={observedTraits}
                onChange={(e) => setObservedTraits(e.target.value)}
                placeholder="e.g., Gram reaction, Catalase status, odor, incubation hours..."
                rows={3}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 placeholder-slate-500 resize-none"
              />
            </div>

            {analysisError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-xs text-rose-300 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{analysisError}</span>
              </div>
            )}

            <button
              onClick={runIdentification}
              disabled={isAnalyzing}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2 text-sm disabled:opacity-50 transition-all"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Analyzing Colony Morphology & Medium...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Identify Culture with AI Vision</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: AI Analysis Results */}
        <div className="lg:col-span-7">
          {isAnalyzing ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center shadow-lg h-full flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin" />
                <Microscope className="w-8 h-8 text-emerald-400 absolute inset-0 m-auto" />
              </div>
              <h3 className="text-lg font-semibold text-slate-100">
                AI Diagnostic Engine at Work
              </h3>
              <p className="text-xs text-slate-400 max-w-sm">
                Examining colony geometry, pigmentation, optical density, hemolysis patterns, and medium fermentation characteristics...
              </p>
            </div>
          ) : result ? (
            /* Results Display Card */
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              {/* Header Title & Confidence */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      Primary Identification Candidate
                    </span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      result.biosafetyLevel === 'BSL-3' 
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse'
                        : result.biosafetyLevel === 'BSL-2'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    }`}>
                      {result.biosafetyLevel} Alert
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-100 italic tracking-tight">
                    {result.organismName}
                  </h2>
                  <p className="text-xs text-slate-400 font-medium">
                    {result.commonName} • <span className="text-slate-300 font-normal">{result.category}</span>
                  </p>
                </div>

                {/* Score Dial */}
                <div className="flex items-center space-x-3 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800">
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Confidence</p>
                    <p className="text-xl font-extrabold text-emerald-400">{result.confidenceScore}%</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Colony Morphology Grid */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Microscope className="w-3.5 h-3.5 text-emerald-400" /> Colony Visual Morphology Breakdown
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">Form / Shape</span>
                    <span className="text-xs font-medium text-slate-200">{result.colonyMorphology.form}</span>
                  </div>
                  <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">Elevation</span>
                    <span className="text-xs font-medium text-slate-200">{result.colonyMorphology.elevation}</span>
                  </div>
                  <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">Margin Edge</span>
                    <span className="text-xs font-medium text-slate-200">{result.colonyMorphology.margin}</span>
                  </div>
                  <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">Pigmentation</span>
                    <span className="text-xs font-medium text-slate-200">{result.colonyMorphology.colorAndPigment}</span>
                  </div>
                  <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">Hemolysis</span>
                    <span className="text-xs font-medium text-slate-200">{result.colonyMorphology.hemolysis}</span>
                  </div>
                  <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                    <span className="text-[10px] text-slate-500 block uppercase font-semibold">Texture</span>
                    <span className="text-xs font-medium text-slate-200">{result.colonyMorphology.texture}</span>
                  </div>
                </div>
              </div>

              {/* Differential Diagnoses */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-teal-400" /> Top Differential Diagnosis Candidates
                </h3>
                <div className="space-y-2">
                  {result.differentialDiagnoses.map((dd, idx) => (
                    <div key={idx} className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-slate-200 italic">{dd.organism}</span>
                        <p className="text-[11px] text-slate-400 mt-0.5">{dd.keyDistinguishingFeature}</p>
                      </div>
                      <span className="font-bold text-slate-300 px-2 py-1 bg-slate-900 rounded border border-slate-800">
                        {dd.probability}% match
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Biochemical Profile Summary */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <FlaskConical className="w-3.5 h-3.5 text-indigo-400" /> Biochemical & Phenotypic Profile
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg">
                    <span className="text-[10px] text-slate-500 block font-semibold">Gram Reaction</span>
                    <span className="font-semibold text-emerald-400">{result.biochemicalProfile.gramStain}</span>
                  </div>
                  <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg">
                    <span className="text-[10px] text-slate-500 block font-semibold">Catalase</span>
                    <span className="font-semibold text-slate-200">{result.biochemicalProfile.catalase}</span>
                  </div>
                  <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg">
                    <span className="text-[10px] text-slate-500 block font-semibold">Oxidase</span>
                    <span className="font-semibold text-slate-200">{result.biochemicalProfile.oxidase}</span>
                  </div>
                  <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg">
                    <span className="text-[10px] text-slate-500 block font-semibold">Coagulase / Indole</span>
                    <span className="font-semibold text-slate-200">
                      {result.biochemicalProfile.coagulase || result.biochemicalProfile.indole || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Clinical Significance */}
              <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl space-y-2">
                <div className="flex items-center space-x-2 text-xs font-bold text-amber-400">
                  <Stethoscope className="w-4 h-4" />
                  <span>Clinical Significance & Associated Infections</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {result.clinicalSignificance}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {result.associatedInfections.map((inf, i) => (
                    <span key={i} className="px-2 py-0.5 rounded text-[11px] bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      • {inf}
                    </span>
                  ))}
                </div>
              </div>

              {/* Confirmatory Tests & Biosafety */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
                  <span className="font-semibold text-slate-200 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Biosafety Protocol
                  </span>
                  <p className="text-slate-400 leading-normal">{result.biosafetyPrecautions}</p>
                </div>
                <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
                  <span className="font-semibold text-slate-200 flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5 text-teal-400" /> Recommended Confirmatory Tests
                  </span>
                  <ul className="text-slate-400 list-disc list-inside space-y-0.5">
                    {result.recommendedConfirmatoryTests.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Detailed Pathobiological Rationale */}
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-indigo-400" /> Diagnostic Rationale & Explanation
                </span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {result.detailedExplanation}
                </p>
              </div>

              {/* Action Bar */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
                <button
                  onClick={() => onOpenReportModal(result)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl shadow-lg flex items-center justify-center space-x-2 text-xs"
                >
                  <FileText className="w-4 h-4" />
                  <span>Generate Official Clinical Lab Report</span>
                </button>
              </div>
            </div>
          ) : (
            /* Placeholder when no result */
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center shadow-lg h-full flex flex-col items-center justify-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-500 mx-auto">
                <Microscope className="w-8 h-8" />
              </div>
              <h3 className="text-base font-semibold text-slate-200">
                Awaiting Culture Specimen Input
              </h3>
              <p className="text-xs text-slate-400 max-w-sm">
                Upload a photo, snap a camera image, or click one of the reference agar presets on the left to initiate AI culture identification.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
