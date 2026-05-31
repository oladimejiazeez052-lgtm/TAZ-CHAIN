import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialization of Gemini client to prevent crash on startup if API key is not present.
let aiClient: GoogleGenAI | null = null;
function getGenAI() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in the environment secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// AI Project Consultant API endpoint
app.post("/api/consultant", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
      res.status(400).json({ error: "Project description prompt is required." });
      return;
    }

    const ai = getGenAI();

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Provide an architectural proposal for the following project: "${prompt}"`,
      config: {
        systemInstruction: "You are the primary Elite Enterprise Architect and Partner at TAZ CHAIN technical consultancy. Provide a pragmatic, highly realistic, custom-tailored recommendation based strictly on the client's description.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["summary", "services", "techStack", "timelineWeeks"],
          properties: {
            summary: {
              type: Type.STRING,
              description: "A summary explaining the design thinking, core challenges, and architectural direction for this system based on the client description. Keep it structured and highly professional (1-2 paragraphs).",
            },
            services: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 3-4 recommended services (e.g., Custom Web Development, Cloud Architecture Setup, Payment Gateway Integration, Security Audit & Compliance).",
            },
            techStack: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 4-6 recommended technical tools (e.g., Next.js, Node.js, PostgreSQL, Stripe API, AWS, Docker).",
            },
            timelineWeeks: {
              type: Type.STRING,
              description: "Estimated weeks of development for MVP release, e.g., '10 - 14' or '8 - 12'.",
            },
            alternativeOptions: {
              type: Type.STRING,
              description: "Strategic advice or alternative suggestions.",
            }
          }
        }
      }
    });

    const recommendationText = response.text;
    if (!recommendationText) {
      throw new Error("No response text returned from Gemini API");
    }

    const recommendation = JSON.parse(recommendationText.trim());
    res.json(recommendation);

  } catch (error: any) {
    console.error("Gemini API Error in backend:", error);
    res.status(500).json({
      error: error.message || "Failed to generate recommendation. Check if GEMINI_API_KEY is configured."
    });
  }
});

// Setup Vite Dev Server / Static Asset Serving
async function setupVite() {
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
    console.log(`Taz Chain full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error("Failed to start Vite dev server wrapper:", err);
});
