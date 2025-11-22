import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

type WeatherContext = {
  city?: string;
  weather?: unknown;
  forecast?: unknown;
  time?: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      message,
      context,
    }: { message: string; context?: WeatherContext | null } = body;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("GEMINI_API_KEY eksik");
      return NextResponse.json(
        { error: "Sunucu yapılandırma hatası" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const baseInstruction = context
      ? `
Sen AirFit adında bir hava durumu ve giyim asistanısın.
Görevin yalnızca hava durumuna göre kıyafet ve ekipman önerileri yapmak.
Hava durumu, sıcaklık, nem, rüzgar, yağmur, kar, dışarı çıkma planı, spor, koşu, yürüyüş, yolculuk veya “ne giysem?” istekleri yoksa başka hiçbir konuda cevap verme.
Kullanıcı yemek, teknoloji, siyaset, sağlık, hikaye, matematik vb. farklı bir konu sorarsa şu şekilde sınır koy:
"Ben yalnızca hava durumuna göre kıyafet önerileri yapıyorum 😊 Hava ile ilgili bir şey sorarsan yardımcı olurum!"
Kısa, net ve samimi cevaplar ver (maksimum 4–5 cümle).
Aynı bilgiyi tekrar etme. Emoji kullanabilirsin ama abartma.
`
      : `
Sen samimi bir sohbet asistanısın.
Kullanıcı hava durumu veya kıyafetten bahsetmiyorsa normal sohbet et.
Kısa ve sade cevap ver (2–3 cümle).
Bu hava bilgilerini sadece kullanıcı hava durumu veya kıyafet tercihi sorarsa kullan. 
Eğer sorusu bununla ilgili değilse yine sınır koy ve başka konuya girmeden nazikçe reddet.
`;

    const weatherPart = context
      ? `
Konum: ${context.city || "bilinmiyor"}
Saat: ${context.time || "bilinmiyor"}

Mevcut hava durumu:
${context.weather ? JSON.stringify(context.weather, null, 2) : "bilinmiyor"}

Tahmin (kısa liste):
${context.forecast ? JSON.stringify(context.forecast, null, 2) : "bilinmiyor"}

Bu bilgileri sadece kullanıcı hava, sıcaklık, yağmur, ne giysem gibi şeyler soruyorsa kullan.
`
      : "";

    const prompt = `
${baseInstruction}

Kullanıcı mesajı:
${message}

${weatherPart}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("AI CHAT ERROR:", error);
    return NextResponse.json({ error: "AI error" }, { status: 500 });
  }
}
