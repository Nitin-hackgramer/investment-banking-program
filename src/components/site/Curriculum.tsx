import { useEffect, useRef, useState } from "react";
import { curriculum } from "@/data/program";
import { cn } from "@/lib/utils";
import { Section, SectionHeader, useStickyStep, cssVars } from "./primitives";

function ModuleDetail({
  index,
  still = false,
  compact = false,
}: {
  index: number;
  still?: boolean;
  compact?: boolean;
}) {
  const m = curriculum[index]!;
  const a = still ? "" : "anim-swap";
  return (
    <div key={m.id} className={still ? "space-y-5" : "space-y-7"}>
      <div className={a} style={cssVars({ "--i": 0 })}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="eyebrow text-scarlet">Module {m.number}</span>
          <span className="eyebrow text-paper/45">{m.duration}</span>
        </div>
        <h3 className="mt-3 text-4xl leading-none text-paper">{m.title}</h3>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-paper/70 sm:text-base">
          {m.overview}
        </p>
      </div>

      <div className={cn("grid gap-7", compact ? "gap-5" : "sm:grid-cols-2")}>
        <div className={a} style={cssVars({ "--i": 2 })}>
          <p className="eyebrow text-paper/45">Topics covered</p>
          <ul className="mt-3 space-y-2.5">
            {m.topics.map((t) => (
              <li key={t} className="flex gap-3 text-sm text-paper/85">
                <span className="mt-2 h-1 w-3 shrink-0 rounded-full bg-scarlet" />
                <span className="min-w-0">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className={a} style={cssVars({ "--i": 3 })}>
          <p className="eyebrow text-paper/45">Skills developed</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {m.skills.map((s) => (
              <span
                key={s}
                className="rounded-full border border-paper/20 px-3 py-1 text-xs text-paper/85"
              >
                {s}
              </span>
            ))}
          </div>
          <p className="eyebrow mt-6 text-paper/45">Tools / workflows</p>
          <p className="mt-3 font-mono text-xs leading-relaxed text-champagne/85">
            {m.tools.join("  /  ")}
          </p>
        </div>
      </div>

      <div
        className={cn(a, "rounded-2xl border border-scarlet/40 bg-scarlet/10 p-5")}
        style={cssVars({ "--i": 5 })}
      >
        <p className="eyebrow text-scarlet">Practical exercise</p>
        <p className="mt-2 text-sm leading-relaxed text-paper/90">{m.exercise}</p>
      </div>
    </div>
  );
}

export function Curriculum() {
  const n = curriculum.length;
  const { ref, active, goTo } = useStickyStep(n);

  return (
    <Section id="curriculum" tone="ink" bare className="px-0! py-0!">
      <div className="mx-auto w-full max-w-7xl px-5 pt-24 pb-10 sm:px-8 md:pt-36">
        <SectionHeader
          eyebrow="The Curriculum"
          tone="ink"
          title={
            <>
              Eight chapters. <em className="text-scarlet">Scroll</em> to walk them.
            </>
          }
          description="Each chapter builds on the last. Swipe through them on your phone, or scroll on desktop and the syllabus turns its own pages."
        />
      </div>

      {/* Desktop: pinned scrollytelling. Each step = 55vh of scroll. */}
      <div
        ref={ref}
        className="relative hidden lg:block"
        style={{ height: `calc(100svh + ${n * 55}svh)` }}
      >
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          {/* ghost numeral */}
          <span
            key={active}
            aria-hidden
            className="anim-swap pointer-events-none absolute -right-6 bottom-[-8vh] select-none font-display text-[46vh] leading-none text-scarlet/[0.09] italic"
          >
            {curriculum[active]!.number}
          </span>

          <div className="relative mx-auto grid w-full max-w-7xl grid-cols-[minmax(0,330px)_minmax(0,1fr)] gap-14 px-8 pt-16">
            <div className="relative">
              {/* scroll-linked rail */}
              <div className="absolute top-2 bottom-2 left-0 w-px bg-paper/15">
                <div
                  className="h-full w-px origin-top bg-scarlet"
                  style={{ transform: "scaleY(var(--p, 0))" }}
                />
              </div>
              <ol>
                {curriculum.map((m, i) => (
                  <li key={m.id}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={i === active}
                      className="group flex w-full items-center gap-4 py-[1.05vh] pl-6 text-left"
                    >
                      <span
                        className={cn(
                          "font-display text-3xl leading-none transition-colors duration-300",
                          i === active ? "text-scarlet" : i < active ? "text-paper/60" : "text-paper/25",
                        )}
                      >
                        {m.number}
                      </span>
                      <span className="min-w-0">
                        <span
                          className={cn(
                            "block truncate text-sm transition-[color,transform] duration-300 ease-[var(--ease-out)]",
                            i === active
                              ? "translate-x-1 font-medium text-paper"
                              : "text-paper/50 group-hover:text-paper/80",
                          )}
                        >
                          {m.title}
                        </span>
                        <span className="eyebrow mt-1 block text-[0.6rem] text-paper/30">
                          {m.duration}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            {/* Card deck: each chapter is a card that slides up over the last as you scroll. */}
            <div className="relative h-[min(40rem,78svh)]">
              {curriculum.map((m, i) => (
                <div
                  key={m.id}
                  aria-hidden={i !== active}
                  className={cn(
                    "absolute inset-0 overflow-y-auto rounded-3xl border border-paper/12 p-8 shadow-[0_-24px_50px_-20px_oklch(0.05_0.03_20/0.8),inset_0_1px_0_oklch(1_0_0/0.08)]",
                    i % 2 ? "bg-[oklch(0.27_0.1_24)]" : "bg-[oklch(0.21_0.045_20)]",
                  )}
                  style={cssVars({
                    zIndex: i,
                    transformOrigin: "50% 0",
                    "--t": `clamp(0, calc((var(--p, 0) * ${n} - ${i} + 0.7) / 0.7), 1)`,
                    "--s":
                      i === n - 1
                        ? "0"
                        : `clamp(0, calc((var(--p, 0) * ${n} - ${i + 1} + 0.7) / 0.7), 1)`,
                    transform:
                      "translateY(calc((1 - var(--t)) * 135% - var(--s) * 2.5%)) scale(calc(1 - var(--s) * 0.05))",
                    opacity: "calc(1 - var(--s) * 0.5)",
                  })}
                >
                  <ModuleDetail index={i} still />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Phones / tablets: swipeable deck */}
      <div className="pb-14 lg:hidden">
        <CurriculumDeck />
      </div>
    </Section>
  );
}

/**
 * Touch version: snap-scrolling cards. The card nearest the centre is full size;
 * neighbours shrink and dim, driven by scroll position (transform/opacity only).
 */
function CurriculumDeck() {
  const scroller = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);
  const chips = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sc = scroller.current;
    if (!sc) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = sc.scrollLeft + sc.clientWidth / 2;
      let best = 0;
      let bestD = Infinity;
      cards.current.forEach((c, i) => {
        if (!c) return;
        const off = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
        const d = Math.min(1, off / c.offsetWidth);
        c.style.transform = `scale(${1 - d * 0.07})`;
        c.style.opacity = String(1 - d * 0.5);
        if (off < bestD) {
          bestD = off;
          best = i;
        }
      });
      setActive(best);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    sc.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      sc.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, []);

  // keep the active chip centred in the number strip
  useEffect(() => {
    const st = strip.current;
    const c = chips.current[active];
    if (st && c) st.scrollTo({ left: c.offsetLeft - (st.clientWidth - c.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  const goTo = (i: number) => {
    const sc = scroller.current;
    const c = cards.current[i];
    if (sc && c) sc.scrollTo({ left: c.offsetLeft - (sc.clientWidth - c.offsetWidth) / 2, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={strip}
        className="relative flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:px-8"
        role="tablist"
        aria-label="Chapters"
      >
        {curriculum.map((m, i) => (
          <button
            key={m.id}
            ref={(el) => {
              chips.current[i] = el;
            }}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => goTo(i)}
            className={cn(
              "press min-h-11 shrink-0 rounded-full border px-4 font-display text-xl transition-colors duration-200",
              i === active
                ? "border-scarlet bg-scarlet text-paper"
                : "border-paper/20 text-paper/60",
            )}
          >
            {m.number}
          </button>
        ))}
      </div>

      <div
        ref={scroller}
        className="relative mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[9%] pb-6 [scrollbar-width:none]"
      >
        {curriculum.map((m, i) => (
          <div
            key={m.id}
            ref={(el) => {
              cards.current[i] = el;
            }}
            className={cn(
              "relative w-[82%] max-w-md shrink-0 snap-center overflow-hidden rounded-3xl border border-paper/12 p-5 shadow-[inset_0_1px_0_oklch(1_0_0/0.08)] will-change-transform",
              i % 2 ? "bg-[oklch(0.27_0.1_24)]" : "bg-[oklch(0.21_0.045_20)]",
            )}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -top-4 right-2 select-none font-display text-[8rem] leading-none text-paper/[0.06] italic"
            >
              {m.number}
            </span>
            <div className="relative">
              <ModuleDetail index={i} still compact />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4">
        <span className="eyebrow tabular text-paper/50">
          {String(active + 1).padStart(2, "0")} / {String(curriculum.length).padStart(2, "0")}
        </span>
        <div className="flex gap-1.5" aria-hidden>
          {curriculum.map((m, i) => (
            <span
              key={m.id}
              className={cn(
                "h-1.5 rounded-full transition-[width,background-color] duration-300 ease-[var(--ease-out)]",
                i === active ? "w-6 bg-scarlet" : "w-1.5 bg-paper/25",
              )}
            />
          ))}
        </div>
        <span className="eyebrow text-paper/40">Swipe</span>
      </div>
    </div>
  );
}
