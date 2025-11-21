import { Search } from "lucide-react";

interface CitySelectorProps {
  city: string;
  setCity: (val: string) => void;
  onSearch: () => void;
  loading: boolean;
}

export default function CitySelector({
  city,
  setCity,
  onSearch,
  loading,
}: CitySelectorProps) {
  return (
    <div className="
      flex w-full items-center 
      bg-[var(--panel)]
      border border-[var(--border)]
      rounded-2xl px-4 py-3 mb-8
      shadow-sm
      focus-within:ring-2 focus-within:ring-[var(--border)]
      transition-all
    ">
      <input
        type="text"
        placeholder="Şehir ara…"
        className="
          flex-1 bg-transparent
          text-[var(--foreground)]
          placeholder:text-[var(--muted)]
          outline-none text-sm
        "
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
      />

      <button
        onClick={onSearch}
        disabled={loading}
        className="
          px-3 py-2 rounded-xl border border-[var(--border)]
          bg-[var(--background)]
          text-[var(--foreground)]
          hover:bg-[var(--muted-bg)]
          transition-all active:scale-95 disabled:opacity-50
        "
      >
        <Search size={18} />
      </button>
    </div>
  );
}
