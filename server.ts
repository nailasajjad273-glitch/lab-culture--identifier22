import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "20mb" }));

// Initialize GoogleGenAI SDK lazily/safely on server
function getAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not configured in Secrets.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Culture Identification API endpoint
app.post("/api/identify-culture", async (req, res) => {
  try {
    const { imageBase64, imageMimeType, agarMedium, observedTraits, specimenSource } = req.body;

    const ai = getAI();

    const prompt = `You are an expert Clinical Microbiologist, Medical Pathologist, and Diagnostic Specialist.
Analyze this laboratory culture specimen / agar plate image or described sample characteristics.

Specimen Context:
- Primary Agar Medium: ${agarMedium || "Not specified / Auto-detect"}
- Specimen Origin/Source: ${specimenSource || "Clinical specimen / Swab / Blood / Urine / Environmental"}
- Observed Lab Technician Notes: ${observedTraits || "None provided"}

Tasks:
1. Examine the visual colony morphology, color, elevation, margins, hemolysis (if Blood Agar), growth pattern, and medium reaction.
2. Provide a detailed primary culture identification along with top differential diagnosis candidates.
3. Outline key biochemical reaction profile, biosafety alert level, clinical significance, and recommended confirmatory testing.
4. Output strict JSON matching the schema.`;

    const contentsParts: any[] = [];

    if (imageBase64) {
      const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");
      contentsParts.push({
        inlineData: {
          mimeType: imageMimeType || "image/jpeg",
          data: cleanBase64,
        },
      });
    }

    contentsParts.push({ text: prompt });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: imageBase64 ? { parts: contentsParts } : prompt,
      config: {
        temperature: 0.2,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            organismName: { type: Type.STRING, description: "Scientific name e.g. Staphylococcus aureus" },
            commonName: { type: Type.STRING, description: "Common name e.g. Golden Staph" },
            category: { type: Type.STRING, description: "Classification e.g. Gram-positive Cocci in Clusters" },
            confidenceScore: { type: Type.NUMBER, description: "Confidence score between 50 and 99" },
            detectedMedium: { type: Type.STRING, description: "Identified growth agar medium" },
            colonyMorphology: {
              type: Type.OBJECT,
              properties: {
                form: { type: Type.STRING, description: "Circular, Irregular, Filamentous, Rhizoid, Punctiform" },
                elevation: { type: Type.STRING, description: "Flat, Raised, Convex, Umbonate, Pulvinate" },
                margin: { type: Type.STRING, description: "Entire, Undulate, Lobate, Erose, Filamentous" },
                colorAndPigment: { type: Type.STRING, description: "Colony pigmentation description" },
                hemolysis: { type: Type.STRING, description: "Alpha (partial greening), Beta (clear zone), Gamma (no hemolysis), or N/A" },
                texture: { type: Type.STRING, description: "Smooth, Mucoid, Rough, Dry, Shiny, Waxy" },
                opacity: { type: Type.STRING, description: "Opaque, Translucent, Transparent" }
              },
              required: ["form", "elevation", "margin", "colorAndPigment", "texture"]
            },
            differentialDiagnoses: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  organism: { type: Type.STRING },
                  probability: { type: Type.NUMBER },
                  keyDistinguishingFeature: { type: Type.STRING }
                },
                required: ["organism", "probability", "keyDistinguishingFeature"]
              }
            },
            biochemicalProfile: {
              type: Type.OBJECT,
              properties: {
                gramStain: { type: Type.STRING, description: "Gram +ve, Gram -ve, Acid-fast, or Yeast" },
                catalase: { type: Type.STRING, description: "Positive, Negative, or Variable" },
                oxidase: { type: Type.STRING, description: "Positive, Negative, or Variable" },
                coagulase: { type: Type.STRING, description: "Positive, Negative, or N/A" },
                indole: { type: Type.STRING, description: "Positive, Negative, or N/A" },
                citrate: { type: Type.STRING, description: "Positive, Negative, or N/A" },
                urease: { type: Type.STRING, description: "Positive, Negative, or N/A" },
                fermentation: { type: Type.STRING, description: "Lactose fermenter, Non-lactose fermenter, Mannitol fermenter, etc." }
              },
              required: ["gramStain", "catalase", "oxidase"]
            },
            clinicalSignificance: { type: Type.STRING, description: "Clinical relevance, pathogenicity, or normal flora notes" },
            associatedInfections: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            biosafetyLevel: { type: Type.STRING, description: "BSL-1, BSL-2, or BSL-3" },
            biosafetyPrecautions: { type: Type.STRING, description: "PPE, hood guidelines, spill management" },
            recommendedConfirmatoryTests: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            treatmentSusceptibilitySummary: { type: Type.STRING, description: "Typical antibiotic/antifungal sensitivity notes" },
            detailedExplanation: { type: Type.STRING, description: "Comprehensive pathobiological rationale" }
          },
          required: [
            "organismName",
            "commonName",
            "category",
            "confidenceScore",
            "colonyMorphology",
            "differentialDiagnoses",
            "biochemicalProfile",
            "clinicalSignificance",
            "associatedInfections",
            "biosafetyLevel",
            "recommendedConfirmatoryTests",
            "detailedExplanation"
          ]
        }
      }
    });

    const text = response.text;
    if (!text) {
      return res.status(500).json({ error: "No response text received from Gemini." });
    }

    const parsedResult = JSON.parse(text);
    return res.json({ success: true, data: parsedResult });
  } catch (err: any) {
    console.error("Error in /api/identify-culture:", err);
    return res.status(500).json({
      error: err.message || "Failed to analyze culture image.",
    });
  }
});

// AI Diagnostic Case / Quiz Generator
app.post("/api/generate-ai-case", async (req, res) => {
  try {
    const { difficulty } = req.body;
    const ai = getAI();

    const prompt = `Generate an interactive clinical microbiology laboratory case study for training.
Difficulty Level: ${difficulty || "Intermediate"}

Provide a realistic unknown pathogen case with specimen origin, patient history, agar medium, visual colony description, initial lab test results, 4 multiple choice options for organism identity, correct answer index, and comprehensive explanation.

Output JSON matching the schema.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            caseTitle: { type: Type.STRING },
            patientVignette: { type: Type.STRING },
            specimenType: { type: Type.STRING },
            agarMediumUsed: { type: Type.STRING },
            colonyDescription: { type: Type.STRING },
            gramStainResult: { type: Type.STRING },
            initialBiochemicals: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            correctOptionIndex: { type: Type.NUMBER },
            explanation: { type: Type.STRING },
            clinicalPearls: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: [
            "caseTitle",
            "patientVignette",
            "specimenType",
            "agarMediumUsed",
            "colonyDescription",
            "gramStainResult",
            "initialBiochemicals",
            "options",
            "correctOptionIndex",
            "explanation",
            "clinicalPearls"
          ]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    return res.json({ success: true, data: parsed });
  } catch (err: any) {
    console.error("Error in /api/generate-ai-case:", err);
    return res.status(500).json({ error: err.message || "Failed to generate case." });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
