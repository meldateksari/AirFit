import { Search, MapPin } from "lucide-react";

interface Props {
  city: string;
  setCity: (city: string) => void;
  onSearch: () => void;
  onGps: () => void; // YENİ PROP
  loading: boolean;
}

export default function CitySelector({
  city,
  setCity,
  onSearch,
  onGps,
  loading,
}: Props) {
  return (
    <div className="flex w-full gap-2 mb-6">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Şehir ara..."
          className="
            w-full pl-4 pr-12 py-3 rounded-xl
            bg-[var(--panel)] 
            border border-[var(--border)]
            text-[var(--foreground)]
            focus:outline-none focus:ring-2 focus:ring-[var(--foreground)]
            transition-all
          "
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
        />
        <button
          onClick={onSearch}
          disabled={loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-t-transparent border-[var(--foreground)] rounded-full animate-spin" />
          ) : (
            <Search size={20} />
          )}
        </button>
      </div>

      {/* YENİ EKLENEN GPS BUTONU */}
      <button
        onClick={onGps}
        disabled={loading}
        className="
          px-3 rounded-xl
          bg-[var(--panel)]
          border border-[var(--border)]
          text-[var(--foreground)]
          hover:bg-[var(--foreground)] hover:text-[var(--background)]
          transition-all active:scale-95 flex items-center justify-center
        "
        title="Konumumu Bul"
      >
        <MapPin size={22} />
      </button>
    </div>
  );
}