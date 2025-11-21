"use client";

import { useState } from "react";
import axios from "axios";

import {
  WeatherResponse,
  AdviceRequestBody,
} from "@/types/weather";
import { getWeatherData } from "@/lib/weatherService";

import CitySelector from "@/components/CitySelector";
import CurrentWeather from "@/components/CurrentWeather";
import ForecastList from "@/components/ForecastList";
import AdviceCard from "@/components/AdviceCard";
import Galaxy from "../components/Galaxy";




export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

/* ------------------------------------
   CHATBUBBLE (C1 – Apple Hybrid Monochrome)
------------------------------------ */
function ChatBubble({
  city,
  weather,
}: {
  city: string;
  weather: WeatherResponse | null;
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const lower = userMsg.content.toLowerCase();
      const needsWeatherContext =
        !!weather &&
        (
          lower.includes("hava") ||
          lower.includes("soğuk") ||
          lower.includes("sicak") ||
          lower.includes("sıcak") ||
          lower.includes("yağmur") ||
          lower.includes("giyim") ||
          lower.includes("ne giy") ||
          lower.includes("mont") ||
          lower.includes("kaban") ||
          lower.includes("bugün") ||
          lower.includes("yarın") ||
          lower.includes("hava durumu")
        );

      const res = await axios.post("/api/ai-chat", {
        message: userMsg.content,
        context: needsWeatherContext
          ? {
              city,
              weather: weather?.current || null,
              forecast: weather?.forecast?.slice(0, 5) || [],
              time: new Date().toISOString(),
            }
          : null,
      });

      const botMsg: ChatMessage = {
        role: "assistant",
        content: res.data.reply || "Cevap alınamadı.",
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Bir hata oluştu." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="
            fixed bottom-6 right-6 w-14 h-14 rounded-full 
            bg-[var(--foreground)] text-[var(--background)]
            flex items-center justify-center text-3xl shadow-lg
            z-50
          "
        >
          💬
        </button>
      )}

      {open && (
        <div
          className="
            fixed bottom-6 right-6 w-80 h-[500px]
            bg-[var(--panel)]
            border border-[var(--border)]
            rounded-3xl shadow-xl overflow-hidden 
            flex flex-col z-50 backdrop-blur-xl
          "
        >
          {/* Header */}
          <div
            className="
              px-4 py-3 border-b border-[var(--border)]
              bg-[var(--panel)]
              text-[var(--foreground)]
              font-semibold tracking-wide flex justify-between
            "
          >
            AirFit Asistan
            <button onClick={() => setOpen(false)} className="opacity-70">
              ×
            </button>
          </div>

          {/* Messages */}
          <div
            className="
              flex-1 overflow-y-auto px-3 py-4
              bg-[var(--background)]
              space-y-3
            "
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`
                  max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-sm
                  ${
                    msg.role === "user"
                      ? "ml-auto bg-[var(--foreground)] text-[var(--background)]"
                      : "mr-auto bg-[var(--panel)] text-[var(--foreground)] border border-[var(--border)]"
                  }
                `}
                style={{
                  borderRadius:
                    msg.role === "user"
                      ? "18px 18px 4px 18px"
                      : "18px 18px 18px 4px",
                }}
              >
                {msg.content}
              </div>
            ))}

            {loading && (
              <div className="text-xs text-[var(--muted)]">Yazıyor...</div>
            )}
          </div>

          {/* Input */}
          <div
            className="
              px-3 py-3 border-t border-[var(--border)]
              bg-[var(--panel)] flex items-center gap-2
            "
          >
            <input
              className="
                flex-1 px-3 py-2 rounded-xl
                bg-[var(--background)]
                border border-[var(--border)]
                text-[var(--foreground)]
                text-sm outline-none
              "
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Mesaj yaz..."
            />

            <button
              onClick={sendMessage}
              className="
                px-4 py-2 rounded-xl bg-[var(--foreground)]
                text-[var(--background)] text-sm
              "
            >
              Gönder
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* ------------------------------------
   HOME PAGE
------------------------------------ */
export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city) return;

    setLoading(true);
    setAdvice("");

    try {
      const data = await getWeatherData(city);
      setWeather(data);

      const body: AdviceRequestBody = {
        weatherData: data.current,
        forecastSample: data.forecast.slice(0, 5),
      };

      const aiResponse = await axios.post<{ advice: string }>(
        "/api/get-advice",
        body
      );

      setAdvice(aiResponse.data.advice);
    } catch (error) {
      console.error(error);
      alert("Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="relative z-10 min-h-screen flex flex-col items-center 
      pt-12 px-4 pb-24 
      bg-[var(--background)] 
      text-[var(--foreground)]"
    >
     
 <div
  style={{
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  }}
>
  <Galaxy
    saturation={0}
    hueShift={0}
    glowIntensity={0.3}
    density={1}
    mouseRepulsion={true}
    mouseInteraction={true}
    transparent={true}
  />
</div>

     
      <div className="w-full max-w-lg">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold">AirFit</h1>
          <p className="text-[var(--muted)] mt-2 text-sm">Akıllı Giyim Rehberin</p>
        </div>

        <CitySelector city={city} setCity={setCity} onSearch={handleSearch} loading={loading} />

        {weather && (
          <div className="animate-in fade-in duration-500 space-y-4">
            <CurrentWeather data={weather.current} />
            <ForecastList forecast={weather.forecast} />
            {advice ? <AdviceCard advice={advice} /> : <div className="h-32 w-full animate-pulse bg-[var(--panel)] rounded-xl" />}
          </div>
        )}
      </div>

      <ChatBubble city={city} weather={weather} />
    </main>
  );

}
