import { useEffect, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { company } from "@/data/program";
import { waUrl } from "./Navbar";

/**
 * Thumb-zone action bar (phones only). Appears once the hero is behind you,
 * tucks away while the Apply section is on screen.
 */
export function MobileBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let raf = 0;
    const run = () => {
      raf = 0;
      const apply = document.getElementById("apply")?.getBoundingClientRect();
      const nearApply = !!apply && apply.top < window.innerHeight * 0.7;
      setShow(window.scrollY > window.innerHeight * 0.7 && !nearApply);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(run);
    };
    run();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      inert={!show}
      className={cn(
        "fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 flex items-center gap-2 rounded-full border border-paper/15 bg-ink/95 p-1.5 shadow-[0_18px_40px_-12px_oklch(0.05_0.03_20/0.8)] transition-[transform,opacity] duration-300 ease-[var(--ease-out)] md:hidden",
        show ? "translate-y-0 opacity-100" : "translate-y-[140%] opacity-0",
      )}
    >
      <a
        href="#apply"
        className="press flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-crimson text-sm font-semibold text-paper active:bg-scarlet"
      >
        Apply now <span aria-hidden>→</span>
      </a>
      <a
        href={waUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="press grid h-12 w-12 place-items-center rounded-full bg-paper text-ink"
      >
        <MessageCircle className="h-5 w-5" />
      </a>
      <a
        href={`tel:${company.phone.replace(/\s/g, "")}`}
        aria-label="Call us"
        className="press grid h-12 w-12 place-items-center rounded-full bg-paper text-ink"
      >
        <Phone className="h-5 w-5" />
      </a>
    </div>
  );
}
