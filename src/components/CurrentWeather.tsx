import { CurrentWeatherData } from "@/types/weather";

interface CurrentWeatherProps {
  data: CurrentWeatherData;
}

export default function CurrentWeather({ data }: CurrentWeatherProps) {
  return (
    <div className="
      bg-[var(--panel)]
      border border-[var(--border)]
      rounded-3xl p-8 mb-6 shadow-sm backdrop-blur-md
    ">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-5xl font-heading font-bold text-[var(--foreground)] mb-1">
            {Math.round(data.main.temp)}°
          </h2>

          <p className="text-[var(--muted)] capitalize text-lg tracking-tight">
            {data.weather[0].description}
          </p>

          <div className="flex gap-4 mt-4 text-sm text-[var(--muted)]">
            <span>💨 Rüzgar: {data.wind.speed} km/s</span>
            <span>💧 Nem: %{data.main.humidity}</span>
          </div>
        </div>

        <div className="text-right">
          <h3 className="text-2xl font-heading font-bold text-[var(--foreground)]">
            {data.name}
          </h3>
          <p className="text-[var(--muted)] text-sm">Şu An</p>
        </div>
      </div>
    </div>
  );
}
