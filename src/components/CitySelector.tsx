import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

interface CitySelectorProps {
  city: string;
  setCity: (val: string) => void;
  onSearch: () => void;
  loading: boolean;
}

type CityItem = {
  id: number;
  name: string;
  country: string;
};

export default function CitySelector({
  city,
  setCity,
  onSearch,
  loading,
}: CitySelectorProps) {
  const [cities, setCities] = useState<CityItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Şehir listesini yükle
  useEffect(() => {
    fetch("/cities.json")
      .then((res) => res.json())
      .then((data) => setCities(data));
  }, []);

  // Filtre
  const filtered = useMemo(() => {
    if (!showSuggestions) return [];

    if (!city.trim()) {
      return cities.slice(0, 200);
    }

    const lower = city.toLowerCase();

    return cities
      .filter((c) => c.name.toLowerCase().includes(lower))
      .slice(0, 20);
  }, [city, cities, showSuggestions]);

  return (
    <div className="relative w-full">
      <div className="
        flex w-full items-center 
        bg-[var(--panel)] border border-[var(--border)]
        rounded-2xl px-4 py-3 mb-2 shadow-sm
        focus-within:ring-2 focus-within:ring-[var(--border)]
      ">
        <input
          type="text"
          placeholder="Şehir ara…"
          className="flex-1 bg-transparent outline-none"
          value={city}
          onFocus={() => setShowSuggestions(true)}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setShowSuggestions(false);
              onSearch();   // Enter ile ara
            }
          }}
        />

        <button
          onClick={() => {
            setShowSuggestions(false);
            onSearch();     // buton ile ara
          }}
          disabled={loading}
          className="px-3 py-2 rounded-xl border border-[var(--border)]"
        >
          <Search size={18} />
        </button>
      </div>

      {/* Liste */}
      {showSuggestions && filtered.length > 0 && (
        <div className="
          absolute left-0 right-0 z-20
          bg-[var(--panel)] border border-[var(--border)]
          rounded-xl shadow-md max-h-60 overflow-auto
        ">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setCity(item.name);     // şehir güncelle
                setShowSuggestions(false);
                onSearch();             // tıklanınca HEMEN arama
              }}
              className="
                px-4 py-2 cursor-pointer
                hover:bg-[var(--muted-bg)]
                text-sm text-[var(--foreground)]
              "
            >
              {item.name}
              <span className="text-xs text-[var(--muted)]">
                {" "}({item.country})
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
