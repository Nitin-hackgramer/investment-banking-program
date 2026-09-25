import { useEffect, useRef, useState } from "react";
import { MessageCircle, Menu, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { company, navLinks } from "@/data/program";
import { ApplyButton, Logo } from "./primitives";

export const waUrl = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
  "Hi Acdyon, I want to know more about the Investment Banking Operations Program.",
)}`;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const run = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.current?.style.setProperty("transform", `scaleX(${max > 0 ? y / max : 0})`);
      setScrolled(y > 24);
      let cur = "";
      for (const l of navLinks) {
        const el = document.querySelector(l.href);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) cur = l.href;
      }
      setCurrent(cur);
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300",
          scrolled
            ? "border-b border-paper/10 bg-ink/95 md:bg-ink/85 md:backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <div
          className={cn(
            "mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 transition-[padding] duration-300 sm:px-8",
            scrolled ? "py-2" : "py-4 md:py-5",
          )}
        >
          <a href="#top" className="min-w-0">
            <Logo invert />
          </a>

          <div className="flex items-center gap-2">
            <nav className="mr-3 hidden items-center gap-1 lg:flex">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors duration-200",
                    current === l.href ? "text-paper" : "text-paper/75 hover:text-paper",
                  )}
                >
                  {l.label}
                  <span
                    className={cn(
                      "absolute inset-x-3.5 bottom-1 h-px origin-left bg-paper transition-transform duration-300 ease-[var(--ease-out)]",
                      current === l.href ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              ))}
            </nav>
            <ApplyButton size="sm" variant="bone" className="hidden sm:inline-flex" />
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="press grid h-11 w-11 shrink-0 place-items-center rounded-full border border-paper/40 text-paper lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* reading progress */}
        <div
          ref={bar}
          className={cn("h-[2px] origin-left scale-x-0", scrolled ? "bg-scarlet" : "bg-paper")}
          aria-hidden
        />
      </header>

      {/* Bottom sheet: sibling of <header> so its backdrop-filter can't trap this fixed layer. */}
      <div
        inert={!open}
        className={cn(
          "fixed inset-0 z-[55] lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <button
          type="button"
          aria-label="Close menu"
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-ink/70 transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          role="dialog"
          aria-label="Menu"
          className={cn(
            "panel-crimson absolute inset-x-0 bottom-0 max-h-[88svh] overflow-y-auto rounded-t-[2rem] px-5 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-[0_-30px_60px_-20px_oklch(0.05_0.03_20/0.7)] transition-transform duration-[420ms] ease-[var(--ease-out)]",
            open ? "translate-y-0" : "translate-y-full",
          )}
        >
          <div className="mx-auto h-1 w-10 rounded-full bg-paper/40" />
          <div className="mt-2 flex items-center justify-between">
            <span className="eyebrow text-paper/70">Menu</span>
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="press grid h-11 w-11 place-items-center rounded-full border border-paper/30 text-paper"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="mt-2 flex flex-col">
            {navLinks.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-paper/20 py-4 font-display text-4xl text-paper active:text-champagne"
              >
                <span className="eyebrow text-paper/60">0{i + 1}</span>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-6 grid grid-cols-[1fr_auto_auto] gap-3">
            <ApplyButton size="lg" variant="bone" className="min-h-14" />
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat on WhatsApp"
              className="press grid h-14 w-14 place-items-center rounded-full border border-paper/40 text-paper"
            >
              <MessageCircle className="h-6 w-6" />
            </a>
            <a
              href={`tel:${company.phone.replace(/\s/g, "")}`}
              aria-label="Call us"
              className="press grid h-14 w-14 place-items-center rounded-full border border-paper/40 text-paper"
            >
              <Phone className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
