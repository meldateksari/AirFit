import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { AdviceRequestBody } from "@/types/weather";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as AdviceRequestBody;
    const { weatherData, forecastSample } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY eksik");

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });


    const forecastText = forecastSample
      .map(
        (f) =>
          `${new Date(f.dt * 1000).getHours()}:00 → ${Math.round(
            f.main.temp
          )}°C (${f.weather[0].description})`
      )
      .join(", ");

    const prompt = `
      Sen AirFit moda asistanısın.

      Şehir: ${weatherData.name}
      Sıcaklık: ${Math.round(weatherData.main.temp)}°C
      Hava: ${weatherData.weather[0].description}

      Gelecek saatler: ${forecastText}

      Görevin:
      - kısa ve öz bir kombin öner
      - modern ve havalı olsun
      - emoji kullanabilirsin
    `;

    const result = await model.generateContent(prompt);
    const advice = result.response.text();

    return NextResponse.json({ advice });
  } catch (error: any) {
    console.error("AI ERROR:", error);
    return NextResponse.json(
      { error: error.message || "AI işleme hatası" },
      { status: 500 }
    );
  }
}
