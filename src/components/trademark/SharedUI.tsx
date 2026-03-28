import { ArrowLeft } from "lucide-react";
import { NEON } from "./constants";
import platoIcon from "@/assets/plato-icon.webp";

export function TMRWBranding() {
  return (
    <div className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center gap-2 z-30">
      <div className="h-5 w-5 shrink-0" style={{
        background: NEON,
        WebkitMaskImage: `url(${platoIcon})`, WebkitMaskSize: "contain", WebkitMaskRepeat: "no-repeat", WebkitMaskPosition: "center",
        maskImage: `url(${platoIcon})`, maskSize: "contain", maskRepeat: "no-repeat", maskPosition: "center",
      }} />
      <span className="text-[10px] font-light tracking-[0.2em] uppercase" style={{ color: "hsl(0,0%,50%)" }}>
        W3AI <span style={{ color: "hsl(0,0%,30%)" }}>|</span> TMRW
      </span>
    </div>
  );
}

export function BackButton({ onClick, label = "BACK" }: { onClick: () => void; label?: string }) {
  return (
    <button onClick={onClick} className="absolute top-6 left-6 flex items-center gap-2 text-xs tracking-[0.2em] uppercase transition-opacity hover:opacity-100 z-30" style={{ color: "hsl(0,0%,50%)" }}>
      <ArrowLeft size={14} /> {label}
    </button>
  );
}
