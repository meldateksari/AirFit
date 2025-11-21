import { ForecastItem } from "@/types/weather";

interface ForecastListProps {
  forecast: ForecastItem[];
}

export default function ForecastList({ forecast }: ForecastListProps) {
  const nextHours = forecast.slice(0, 8);

  return (
    <div className="mb-6">
      <h3 className="text-[var(--muted)] text-xs mb-3 font-heading uppercase tracking-widest">
        Gelecek Saatler
      </h3>

      <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
        {nextHours.map((item) => {
          const hour = new Date(item.dt * 1000).getHours();
          const temp = Math.round(item.main.temp);
          const desc = item.weather[0].description;

          return (
            <div
              key={item.dt}
              className="
                min-w-[120px] p-4 rounded-2xl 
                bg-[var(--panel)]
                border border-[var(--border)]
                shadow-sm 
                flex flex-col items-center justify-center
              "
            >
              <span className="text-[var(--muted)] text-xs">
                {hour}:00
              </span>

              <span className="text-3xl font-bold text-[var(--foreground)] my-2">
                {temp}°
              </span>

              <span className="
                text-[11px] text-[var(--muted)] capitalize text-center 
                leading-tight max-w-[100px] truncate
              ">
                {desc}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
