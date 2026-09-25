import { type PointerEvent } from "react";
import { hero } from "@/data/program";
import { ApplyButton, Reveal } from "./primitives";
import { OperationsDashboard } from "./Dashboard";

export function Hero() {
  // The red "light" follows the cursor; written straight to CSS vars, no re-render.
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      id="top"
      onPointerMove={onMove}
      className="panel-crimson relative min-h-[100svh] overflow-hidden pt-24 pb-14 sm:pt-32 md:pt-40 md:pb-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(520px circle at var(--mx, 70%) var(--my, 30%), oklch(0.75 0.2 32 / 0.55), transparent 65%)",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-10 -left-4 hidden select-none md:block font-display text-[30vw] leading-none text-paper/[0.06] italic"
      >
        Ops
      </span>

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-8 lg:gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <Reveal>
            <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-paper/30 px-4 py-2 text-paper/90">
              <span className="anim-pulse-soft h-1.5 w-1.5 rounded-full bg-paper" />
              6-Month Online Program · Applications open
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-8 text-[clamp(2.9rem,9vw,8rem)] leading-[0.92] text-balance text-paper">
              The desk behind <em className="text-champagne">every</em> trade.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-paper/80 sm:text-lg">
              {hero.subheadline}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:flex sm:flex-wrap">
              <ApplyButton size="lg" variant="bone" className="min-h-14 w-full sm:w-auto">
                {hero.primaryCta}
              </ApplyButton>
              <ApplyButton size="lg" variant="ghost-dark" href="#break-hunter" className="min-h-14 w-full sm:w-auto">
                Play Break Hunter
              </ApplyButton>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <ul className="eyebrow mt-12 hidden flex-wrap sm:flex gap-x-8 gap-y-3 text-paper/70">
              {hero.meta.map((m) => (
                <li key={m} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-champagne" />
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <OperationsDashboard />
        </Reveal>
      </div>
    </section>
  );
}
