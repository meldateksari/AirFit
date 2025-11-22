import ReactMarkdown from "react-markdown";
import { Sparkles } from "lucide-react";
interface AdviceCardProps { advice: string; }

export default function AdviceCard({ advice }: AdviceCardProps) {
  return (
    <div className="
      rounded-3xl p-6
      bg-[var(--panel)]
      text-[var(--foreground)]
      border border-[var(--border)]
      shadow-md backdrop-blur-md
    ">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-[var(--background)]/40 border border-[var(--border)]">
          <Sparkles size={20} className="text-[var(--foreground)]" />
        </div>
        <span className="font-heading font-semibold text-lg tracking-wide">
          AirFit Asistanı
        </span>
      </div>

      <div className="text-sm leading-relaxed text-[var(--foreground)]/80">
        <ReactMarkdown>{advice}</ReactMarkdown>
      </div>
    </div>
  );
}
