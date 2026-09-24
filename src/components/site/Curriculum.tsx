import { useState } from "react";
import { curriculum } from "@/data/program";
import { cn } from "@/lib/utils";
import { Section, SectionHeader, useStickyStep, cssVars } from "./primitives";

function ModuleDetail({ index, still = false }: { index: number; still?: boolean }) {
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

      <div className="grid gap-7 sm:grid-cols-2">
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
  const [open, setOpen] = useState(0);

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
          description="Each chapter builds on the last. Keep scrolling and the syllabus turns its own pages, or jump straight to any chapter."
        />
      </div>

      {/* Desktop: pinned scrollytelling. Each step = 55vh of scroll. */}
      <div
        ref={ref}
        className="relative hidden lg:block"
        style={{ height: `calc(100dvh + ${n * 55}vh)` }}
      >
        <div className="sticky top-0 flex h-[100dvh] items-center overflow-hidden">
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
            <div className="relative h-[min(40rem,78dvh)]">
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

      {/* Mobile / tablet: tap to open */}
      <div className="px-5 pb-24 sm:px-8 lg:hidden">
        <ol className="mx-auto max-w-2xl border-t border-paper/15">
          {curriculum.map((m, i) => {
            const isOpen = i === open;
            return (
              <li key={m.id} className="border-b border-paper/15">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 py-5 text-left"
                >
                  <span
                    className={cn(
                      "font-display text-3xl leading-none",
                      isOpen ? "text-scarlet" : "text-paper/35",
                    )}
                  >
                    {m.number}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-base text-paper">{m.title}</span>
                    <span className="eyebrow mt-1 block text-paper/35">{m.duration}</span>
                  </span>
                  <span
                    className={cn(
                      "text-2xl text-paper/50 transition-transform duration-300 ease-[var(--ease-out)]",
                      isOpen && "rotate-45 text-scarlet",
                    )}
                  >
                    +
                  </span>
                </button>
                {isOpen ? (
                  <div className="pb-8">
                    <ModuleDetail index={i} />
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
