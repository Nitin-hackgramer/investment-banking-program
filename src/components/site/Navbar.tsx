import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/data/program";
import { ApplyButton, Logo } from "./primitives";

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
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300",
        scrolled ? "border-b border-paper/10 bg-ink/85 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 transition-[padding] duration-300 sm:px-8",
          scrolled ? "py-2.5" : "py-5",
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
                    "absolute inset-x-3.5 bottom-1 h-px origin-left transition-transform duration-300 ease-[var(--ease-out)]",
                    "bg-paper",
                    current === l.href ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </a>
            ))}
          </nav>
          <ApplyButton size="sm" variant="bone" className="hidden sm:inline-flex" />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "press grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-colors lg:hidden",
              "border-paper/40 text-paper",
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* reading progress */}
      <div
        ref={bar}
        className={cn("h-[2px] origin-left scale-x-0", scrolled ? "bg-scarlet" : "bg-paper")}
        aria-hidden
      />

      {open ? (
        <div className="fixed inset-0 -z-10 overflow-y-auto panel-crimson px-5 pt-28 pb-12 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col">
            {navLinks.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ ["--i" as string]: i }}
                className="anim-swap flex items-baseline gap-4 border-b border-paper/20 py-5 font-display text-4xl text-paper"
              >
                <span className="eyebrow text-paper/60">0{i + 1}</span>
                {l.label}
              </a>
            ))}
            <ApplyButton size="lg" variant="bone" className="mt-8 w-full" />
          </nav>
        </div>
      ) : null}
    </header>
  );
}
