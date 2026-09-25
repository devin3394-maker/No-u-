import express from "express";
import OpenAI from "openai";

const app = express();

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/generate", async (req, res) => {
  try {
    const response = await openai.responses.create({
      model: "gpt-5.6",
      input: `Create a short episode for No U Shorts.

Make it engaging and designed for a YouTube Short or TikTok.
Include:
- Episode title
- Hook
- Scene
- Dialogue
- Cliffhanger ending`,
    });

    res.json({
      episode: response.output_text,
    });
  } catch (error) {
    console.error(error);
console.error(error?.response?.data || error);
    res.status(500).json({
      error: "Failed to generate episode",
    });
  }
});

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("No U Shorts API is live!");
});
app.listen(PORT, () => {
  console.log(`No U Shorts server running on port ${PORT}`);
});
