import { useEffect, useState, type PointerEvent } from "react";
import {
  careerProgression,
  careerRoles,
  company,
  experiencePillars,
  faqs,
  industryDomains,
  learningAreas,
  mentors,
  programDetails,
  projects,
  stats,
  testimonials,
  whyPillars,
  workflow,
} from "@/data/program";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ApplyButton,
  Badge,
  Counter,
  Marquee,
  Reveal,
  Section,
  SectionHeader,
  Spot,
  cssVars,
  useStickyStep,
} from "./primitives";
import { roleInfo } from "./Games";

/* ---------------- Stats + ticker ---------------- */

const tickerWords = [
  "Trade lifecycle",
  "KYC & AML",
  "Settlements",
  "Reconciliation",
  "Corporate actions",
  "Risk & controls",
  "Reporting",
];

export function Stats() {
  return (
    <>
      <Section tone="paper" className="py-16 md:py-24">
        <dl className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.sublabel} delay={i * 80}>
              <div className={cn("px-2 md:px-8", i > 0 && "md:border-l md:border-ink/15")}>
                <dt className="eyebrow text-crimson">{s.sublabel}</dt>
                <dd className="mt-3 font-display text-7xl leading-none sm:text-8xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </dl>
      </Section>
      <div className="bg-ink py-6 text-paper" aria-hidden>
        <Marquee>
          {tickerWords.map((w) => (
            <span key={w} className="flex items-center gap-8 pr-8 font-display text-4xl italic sm:text-5xl">
              {w}
              <span className="text-scarlet">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </>
  );
}

/* ---------------- Why: expanding panels ---------------- */

export function WhyOperations() {
  const [open, setOpen] = useState(0);

  return (
    <Section id="program" tone="paper">
      <SectionHeader
        eyebrow="Why Operations"
        title={
          <>
            Where markets meet <em className="text-crimson">the machinery</em>.
          </>
        }
        description="Operations sits behind every executed trade. It validates, confirms, settles, reconciles and reports: the discipline that turns market activity into accurate books. Pick a pillar."
      />

      <div className="mt-16 flex flex-col gap-3 lg:h-[34rem] lg:flex-row">
        {whyPillars.map((p, i) => {
          const on = i === open;
          return (
            <button
              key={p.code}
              type="button"
              onClick={() => setOpen(i)}
              onFocus={() => setOpen(i)}
              aria-expanded={on}
              className={cn(
                "group relative overflow-hidden rounded-3xl p-6 text-left transition-[flex-grow,background-color,color] duration-500 ease-[var(--ease-out)] lg:flex-1 lg:p-8",
                on ? "bg-crimson text-paper lg:grow-[4]" : "bg-ink text-paper/80 hover:bg-ink-2 lg:grow-[1]",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <span className={cn("eyebrow", on ? "text-paper/80" : "text-scarlet")}>{p.code}</span>
                <span
                  className={cn(
                    "text-2xl leading-none transition-transform duration-300 ease-[var(--ease-out)]",
                    on ? "rotate-45" : "",
                  )}
                >
                  +
                </span>
              </div>

              {/* collapsed label (desktop only) */}
              <h3
                className={cn(
                  "mt-6 hidden text-3xl transition-opacity duration-300 lg:absolute lg:bottom-8 lg:left-8 lg:mt-0 lg:block lg:[writing-mode:vertical-rl] lg:rotate-180",
                  on ? "lg:pointer-events-none lg:opacity-0" : "lg:opacity-100",
                )}
              >
                {p.title}
              </h3>

              <div
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out)] lg:h-full lg:content-end",
                  on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 lg:grid-rows-[1fr] lg:opacity-0",
                )}
              >
                <div className="min-h-0 overflow-hidden lg:min-w-[20rem]">
                  <h3 className="mt-4 text-4xl leading-none sm:text-5xl lg:mt-0">{p.title}</h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/80">{p.description}</p>
                  <div className="mt-6 border-t border-paper/25 pt-4">
                    <p className="font-display text-5xl leading-none">{p.metric}</p>
                    <p className="eyebrow mt-2 text-paper/70">{p.metricLabel}</p>
                  </div>
                </div>
              </div>
              {/* mobile: always show title */}
              <h3 className={cn("mt-4 text-3xl lg:hidden", on && "hidden")}>{p.title}</h3>
            </button>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------------- What you'll learn: spotlight bento ---------------- */

export function WhatYouLearn() {
  return (
    <Section tone="bone">
      <SectionHeader
        eyebrow="Curriculum Scope"
        title={
          <>
            Nine areas. <em className="text-crimson">One</em> connected picture.
          </>
        }
        description="Sequenced from market fundamentals through to the daily reporting operations teams produce. Move your cursor across the grid."
      />
      <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {learningAreas.map((a, i) => {
          const big = a.size === "lg";
          return (
            <Reveal key={a.title} delay={(i % 4) * 60} className={cn(big && "sm:col-span-2")}>
              <Spot
                as="article"
                className={cn(
                  "h-full min-h-56 overflow-hidden rounded-3xl p-7 transition-transform duration-300 ease-[var(--ease-out)] hover:-translate-y-1",
                  big ? "bg-crimson text-paper" : "border border-ink/10 bg-card",
                )}
              >
                <span className={cn("font-display text-6xl leading-none italic", big ? "text-paper/40" : "text-crimson/30")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={cn("mt-6 leading-none", big ? "text-4xl sm:text-5xl" : "text-3xl")}>
                  {a.title}
                </h3>
                <p className={cn("mt-3 max-w-sm text-sm leading-relaxed", big ? "text-paper/80" : "text-muted-foreground")}>
                  {a.blurb}
                </p>
              </Spot>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------------- Workflow: scroll-pinned trade journey ---------------- */

export function Workflow() {
  const n = workflow.length;
  const { ref, active, goTo } = useStickyStep(n);
  const w = workflow[active]!;

  return (
    <Section id="workflow" tone="crimson" bare className="px-0! py-0!">
      <div className="mx-auto w-full max-w-7xl px-5 pt-24 pb-6 sm:px-8 md:pt-36">
        <SectionHeader
          eyebrow="Operational Flow"
          tone="crimson"
          title={
            <>
              Ride one trade from <em className="text-champagne">order</em> to report.
            </>
          }
          description="Keep scrolling. The trade moves through the same six stages an operations team works every day."
        />
      </div>

      <div ref={ref} className="relative" style={{ height: `calc(100dvh + ${n * 45}vh)` }}>
        <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden px-5 pt-16 sm:px-8">
          <div className="mx-auto w-full max-w-7xl">
            {/* rail */}
            <div className="relative">
              <div className="absolute inset-x-0 top-[0.65rem] h-px bg-paper/25" />
              <div
                className="absolute top-[0.65rem] left-0 h-px w-full origin-left bg-paper"
                style={{ transform: "scaleX(var(--p, 0))" }}
              />
              <ol className="relative flex justify-between">
                {workflow.map((s, i) => (
                  <li key={s.step}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={i === active}
                      className="group flex flex-col items-start gap-3 sm:items-center"
                    >
                      <span
                        className={cn(
                          "grid h-[1.35rem] w-[1.35rem] place-items-center rounded-full border-2 transition-[background-color,transform,border-color] duration-300 ease-[var(--ease-out)]",
                          i <= active ? "border-paper bg-paper" : "border-paper/40 bg-crimson",
                          i === active && "scale-125",
                        )}
                      />
                      <span
                        className={cn(
                          "eyebrow hidden text-[0.6rem] transition-colors sm:block",
                          i === active ? "text-paper" : "text-paper/50",
                        )}
                      >
                        {s.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-[8vh] grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div key={active} className="relative">
                <span
                  aria-hidden
                  className="anim-swap block font-display text-[clamp(7rem,24vw,20rem)] leading-[0.8] text-paper/15 italic"
                >
                  {w.step}
                </span>
                <div className="-mt-[0.4em] pl-1 sm:-mt-[2.5rem]">
                  <h3 className="anim-swap text-5xl leading-none text-paper sm:text-7xl" style={cssVars({ "--i": 1 })}>
                    {w.title}
                  </h3>
                  <p className="anim-swap mt-5 max-w-lg text-base leading-relaxed text-paper/85 sm:text-lg" style={cssVars({ "--i": 3 })}>
                    {w.detail}
                  </p>
                </div>
              </div>

              {/* trade ticket */}
              <div className="hidden rounded-2xl border border-paper/25 bg-ink/80 p-5 shadow-[inset_0_1px_0_oklch(1_0_0/0.08)] backdrop-blur-xl sm:block">
                <div className="flex items-center justify-between border-b border-paper/10 pb-3">
                  <p className="eyebrow text-scarlet">Trade GLX-4471</p>
                  <p className="eyebrow text-paper/50">
                    {active + 1}/{n}
                  </p>
                </div>
                <ul className="mt-3 space-y-2">
                  {workflow.map((s, i) => (
                    <li key={s.step} className="flex items-center gap-3 text-sm">
                      <span
                        className={cn(
                          "grid h-5 w-5 shrink-0 place-items-center rounded-full text-[0.65rem] transition-colors duration-300",
                          i < active && "bg-positive text-ink",
                          i === active && "anim-pulse-soft bg-scarlet text-paper",
                          i > active && "border border-paper/25 text-paper/30",
                        )}
                      >
                        {i < active ? "✓" : i + 1}
                      </span>
                      <span
                        className={cn(
                          "transition-colors duration-300",
                          i === active ? "text-paper" : i < active ? "text-paper/60" : "text-paper/30",
                        )}
                      >
                        {s.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Projects: case files with reveal stepper ---------------- */

const caseStages = ["Scenario", "Your task", "Outcome"] as const;

export function Projects() {
  const [c, setC] = useState(0);
  const [stage, setStage] = useState(0);
  const p = projects[c]!;
  const body = [p.scenario, p.task, p.outcome][stage]!;

  return (
    <Section tone="blush">
      <SectionHeader
        eyebrow="Practical Work"
        title={
          <>
            Open a <em className="text-crimson">case file</em>.
          </>
        }
        description="Each case mirrors a problem operations teams handle: something has broken and needs to be traced, explained and resolved. Pick one and work through it."
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
        <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
          {projects.map((x, i) => (
            <li key={x.ref}>
              <button
                type="button"
                onClick={() => {
                  setC(i);
                  setStage(0);
                }}
                aria-current={i === c}
                className={cn(
                  "press flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-colors duration-200",
                  i === c
                    ? "border-crimson bg-crimson text-paper"
                    : "border-ink/15 bg-paper/60 hover:border-crimson hover:bg-paper",
                )}
              >
                <span className={cn("font-display text-3xl leading-none italic", i === c ? "text-paper/70" : "text-crimson")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 text-sm font-medium">{x.title}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="overflow-hidden rounded-3xl bg-ink p-7 text-paper shadow-[0_40px_70px_-40px_oklch(0.3_0.12_25)] md:p-10">
          <div className="flex items-center justify-between gap-3">
            <span className="eyebrow text-scarlet">{p.ref}</span>
            <Badge tone="dark">Case study</Badge>
          </div>
          <h3 className="mt-4 text-4xl leading-none sm:text-5xl">{p.title}</h3>

          <div className="mt-8 flex gap-2" role="tablist" aria-label="Case stage">
            {caseStages.map((s, i) => (
              <button
                key={s}
                type="button"
                role="tab"
                aria-selected={i === stage}
                onClick={() => setStage(i)}
                className={cn(
                  "press eyebrow rounded-full border px-4 py-2 text-[0.65rem] transition-colors",
                  i === stage
                    ? "border-scarlet bg-scarlet text-paper"
                    : i < stage
                      ? "border-paper/30 text-paper/80"
                      : "border-paper/15 text-paper/40",
                )}
              >
                {i + 1}. {s}
              </button>
            ))}
          </div>

          <p
            key={`${c}-${stage}`}
            className="anim-swap mt-6 min-h-24 max-w-2xl font-display text-2xl leading-snug text-paper/95 sm:text-3xl"
          >
            {body}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-paper/10 pt-6">
            <div className="flex flex-wrap gap-2">
              {p.skills.map((s) => (
                <Badge key={s} tone="dark">
                  {s}
                </Badge>
              ))}
            </div>
            <button
              type="button"
              onClick={() => (stage < 2 ? setStage(stage + 1) : (setC((c + 1) % projects.length), setStage(0)))}
              className="press rounded-full bg-paper px-6 py-2.5 text-sm text-crimson-deep transition-colors hover:bg-scarlet hover:text-paper"
            >
              {stage < 2 ? `Reveal ${caseStages[stage + 1]!.toLowerCase()} →` : "Next case →"}
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Experience: tick modules, watch progress ---------------- */

const trackerModules = [
  "Financial Markets",
  "IB Fundamentals",
  "Trade Lifecycle",
  "KYC / AML",
  "Settlements & Reconciliation",
  "Corporate Actions",
];

export function Experience() {
  const [done, setDone] = useState<boolean[]>([true, true, false, false, false, false]);
  const count = done.filter(Boolean).length;
  const pct = Math.round((count / trackerModules.length) * 100);
  const r = 54;
  const circ = 2 * Math.PI * r;

  return (
    <Section id="experience" tone="ink">
      <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <SectionHeader
            eyebrow="Learning Experience"
            tone="ink"
            title={
              <>
                Progress you can <em className="text-scarlet">see</em>.
              </>
            }
            description="Guided sessions, practical assignments and mentor review, tracked module by module across the six months."
          />
          <ul className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {experiencePillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 50}>
                <li className="border-t border-paper/15 pt-4">
                  <p className="text-sm font-medium text-paper">{p.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-paper/55">{p.detail}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={100}>
          <div className="rounded-3xl border border-paper/15 bg-paper/[0.04] p-6 shadow-[inset_0_1px_0_oklch(1_0_0/0.08)] md:p-8">
            <div className="flex items-center justify-between gap-4 border-b border-paper/10 pb-5">
              <div>
                <p className="eyebrow text-paper/50">Participant view</p>
                <p className="mt-1 text-sm text-paper">Tick a module to complete it</p>
              </div>
              <svg viewBox="0 0 120 120" className="h-24 w-24 shrink-0 -rotate-90" aria-label={`${pct}% complete`}>
                <circle cx="60" cy="60" r={r} fill="none" stroke="oklch(1 0 0 / 0.12)" strokeWidth="8" />
                <circle
                  cx="60"
                  cy="60"
                  r={r}
                  fill="none"
                  stroke="var(--scarlet)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circ}
                  strokeDashoffset={circ * (1 - pct / 100)}
                  className="transition-[stroke-dashoffset] duration-700 ease-[var(--ease-out)]"
                />
                <text
                  x="60"
                  y="60"
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="rotate-90 fill-paper font-display text-[2rem]"
                  style={{ transformOrigin: "60px 60px" }}
                >
                  {pct}%
                </text>
              </svg>
            </div>

            <ul className="mt-4 divide-y divide-paper/10">
              {trackerModules.map((m, i) => (
                <li key={m}>
                  <button
                    type="button"
                    aria-pressed={done[i]}
                    onClick={() => setDone((d) => d.map((v, k) => (k === i ? !v : v)))}
                    className="press group flex w-full items-center gap-4 py-3.5 text-left"
                  >
                    <span
                      className={cn(
                        "grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs transition-[background-color,border-color,transform] duration-200",
                        done[i] ? "scale-105 border-scarlet bg-scarlet text-paper" : "border-paper/30 text-transparent group-hover:border-scarlet",
                      )}
                    >
                      ✓
                    </span>
                    <span className={cn("min-w-0 flex-1 truncate text-sm transition-colors", done[i] ? "text-paper" : "text-paper/60")}>
                      {m}
                    </span>
                    <span className="eyebrow text-paper/35">M{String(i + 1).padStart(2, "0")}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-4 grid grid-cols-3 gap-3 border-t border-paper/10 pt-5">
              {[
                { l: "Assignments", v: Math.round(count * 2.3) },
                { l: "Cases", v: Math.floor(count / 1.5) },
                { l: "Mentor reviews", v: Math.round(count * 1.5) },
              ].map((s) => (
                <div key={s.l}>
                  <p className="tabular font-display text-4xl leading-none text-paper">{s.v}</p>
                  <p className="eyebrow mt-1.5 text-[0.6rem] text-paper/45">{s.l}</p>
                </div>
              ))}
            </div>
            <p className="eyebrow mt-5 text-paper/35">Illustrative interface</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------- Outcomes: pick a role ---------------- */

export function Outcomes() {
  const [sel, setSel] = useState(0);

  return (
    <Section id="outcomes" tone="paper">
      <SectionHeader
        eyebrow="Career Outcomes"
        title={
          <>
            Paths this program can prepare you to <em className="text-crimson">explore</em>.
          </>
        }
        description="The program builds operational knowledge and practical skills. It does not guarantee employment, placement or a specific salary."
      />

      <div className="mt-16 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <ul className="border-t border-ink/15">
          {careerRoles.map((role, i) => {
            const on = i === sel;
            return (
              <li key={role} className="border-b border-ink/15">
                <button
                  type="button"
                  onClick={() => setSel(i)}
                  aria-expanded={on}
                  className="group flex w-full items-center gap-5 py-4 text-left"
                >
                  <span className={cn("eyebrow w-8 shrink-0 transition-colors", on ? "text-crimson" : "text-muted-foreground")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "min-w-0 flex-1 font-display text-3xl leading-tight transition-[color,transform] duration-300 ease-[var(--ease-out)] sm:text-4xl",
                      on ? "translate-x-2 text-crimson italic" : "text-ink group-hover:translate-x-1",
                    )}
                  >
                    {role}
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-400 ease-[var(--ease-out)]",
                    on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="max-w-lg pb-5 pl-[3.25rem] text-sm leading-relaxed text-muted-foreground">
                      {roleInfo[i]!.why}{" "}
                      <span className="eyebrow text-crimson">{roleInfo[i]!.mods}</span>
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <Reveal delay={100}>
          <ol className="rounded-3xl bg-ink p-8 text-paper md:p-10">
            <p className="eyebrow text-scarlet">Progression</p>
            {careerProgression.map((c, i) => (
              <li key={c.label} className="relative flex gap-4 pt-7">
                <div className="flex flex-col items-center">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-scarlet font-display text-lg text-scarlet italic">
                    {i + 1}
                  </span>
                  {i < careerProgression.length - 1 ? (
                    <span className="mt-2 w-px flex-1 bg-gradient-to-b from-scarlet/70 to-transparent" />
                  ) : null}
                </div>
                <div className="min-w-0 pb-1">
                  <p className="font-display text-2xl leading-none">{c.label}</p>
                  <p className="mt-1.5 text-sm text-paper/60">{c.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------- Mentors ---------------- */

export function Mentors() {
  return (
    <Section tone="bone">
      <SectionHeader
        eyebrow="Mentors"
        title={
          <>
            Guidance through <em className="text-crimson">every</em> module.
          </>
        }
        description="Mentor profiles below are placeholders and will be updated with the confirmed program faculty."
      />
      <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {mentors.map((m, i) => (
          <Reveal key={m.role} delay={i * 60}>
            <Spot
              as="article"
              className="h-full rounded-3xl border border-ink/10 bg-card p-7 transition-transform duration-300 ease-[var(--ease-out)] hover:-translate-y-1"
            >
              <div className="grid h-20 w-20 place-items-center rounded-full bg-crimson font-display text-3xl text-paper italic">
                {m.initials}
              </div>
              <h3 className="mt-6 text-3xl leading-none">{m.name}</h3>
              <p className="mt-2 text-sm text-crimson">{m.role}</p>
              <dl className="mt-6 space-y-3 border-t border-ink/10 pt-4 text-sm">
                <div>
                  <dt className="eyebrow text-muted-foreground">Experience</dt>
                  <dd className="mt-1 text-ink/80">{m.experience}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-muted-foreground">Specialization</dt>
                  <dd className="mt-1 text-ink/80">{m.specialization}</dd>
                </div>
              </dl>
            </Spot>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Certificate: type your name ---------------- */

function refFor(name: string) {
  let h = 7;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) % 10000;
  return `ACD-IBO-${String(h).padStart(4, "0")}`;
}

export function Certification() {
  const [name, setName] = useState("");
  const [today, setToday] = useState("DD / MM / YYYY");

  useEffect(() => {
    setToday(new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }));
  }, []);

  const shown = name.trim() || "Your Name";

  const tilt = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    e.currentTarget.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
    e.currentTarget.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
  };
  const untilt = (e: PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "";
  };

  return (
    <Section tone="ink">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeader
            eyebrow="Completion"
            tone="ink"
            title={
              <>
                Put <em className="text-scarlet">your name</em> on it.
              </>
            }
            description="Participants who complete the modules, assignments and case studies receive a completion document from Acdyon Technologies. The design is a visual placeholder; final details will be confirmed."
          />
          <Reveal delay={100}>
            <label className="mt-10 block max-w-md">
              <span className="eyebrow text-paper/50">Type your name</span>
              <input
                value={name}
                maxLength={36}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aarav Mehta"
                className="mt-2 w-full border-b border-paper/30 bg-transparent py-3 font-display text-3xl text-paper outline-none transition-colors placeholder:text-paper/25 focus:border-scarlet"
              />
            </label>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div
            onPointerMove={tilt}
            onPointerLeave={untilt}
            className="rounded-3xl bg-paper p-3 text-ink shadow-[0_50px_90px_-30px_oklch(0.05_0.03_20)] transition-transform duration-200 ease-out will-change-transform sm:p-4"
          >
            <div className="relative overflow-hidden rounded-2xl border border-champagne bg-bone p-7 text-center sm:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-60 mix-blend-soft-light"
                style={{
                  background:
                    "radial-gradient(300px circle at var(--gx, 50%) var(--gy, 0%), oklch(0.9 0.12 60 / 0.9), transparent 60%)",
                }}
              />
              <p className="eyebrow relative text-crimson">Certificate of Completion</p>
              <div className="relative mx-auto mt-5 h-px w-16 bg-crimson/50" />
              <p className="relative mt-7 text-sm text-muted-foreground">This is to certify that</p>
              <p
                key={shown}
                className="anim-pop relative mt-2 min-h-[1.1em] font-display text-5xl leading-tight break-words text-ink italic sm:text-6xl"
              >
                {shown}
              </p>
              <p className="relative mt-6 text-sm text-muted-foreground">has completed the</p>
              <p className="relative mt-2 font-display text-2xl text-crimson sm:text-3xl">
                Investment Banking Operations Program
              </p>
              <p className="relative mt-5 text-sm text-ink/70">{company.name}</p>
              <div className="relative mt-8 grid grid-cols-2 gap-6 border-t border-ink/15 pt-5 text-left">
                <div>
                  <p className="eyebrow text-muted-foreground">Issued</p>
                  <p className="mt-1 text-sm">{today}</p>
                </div>
                <div className="text-right">
                  <p className="eyebrow text-muted-foreground">Reference</p>
                  <p className="mt-1 font-mono text-sm">{refFor(shown)}</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------- Industry exposure: kinetic marquee ---------------- */

export function Industries() {
  return (
    <section className="panel-crimson overflow-hidden py-20 text-paper md:py-28" aria-label="Industry domains">
      <div className="mx-auto mb-12 max-w-7xl px-5 sm:px-8">
        <p className="eyebrow text-paper/75">Industry context · scroll to speed it up</p>
        <p className="mt-4 max-w-2xl text-lg text-paper/85">
          The program is built around operational functions that exist across these areas of the
          financial industry.
        </p>
      </div>
      <Marquee>
        {industryDomains.map((d) => (
          <span key={d} className="flex items-center gap-10 pr-10 font-display text-[clamp(4rem,11vw,9rem)] leading-none whitespace-nowrap">
            <span className="text-outline text-paper">{d}</span>
            <span className="italic">✦</span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}

/* ---------------- Testimonials: one at a time ---------------- */

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i]!;
  const go = (d: number) => setI((v) => (v + d + testimonials.length) % testimonials.length);

  return (
    <Section tone="paper">
      <SectionHeader
        eyebrow="Feedback"
        title={
          <>
            What participants <em className="text-crimson">say</em>.
          </>
        }
        description="The quotes below are placeholder content and will be replaced with feedback from program participants."
      />
      <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <figure key={i} className="anim-swap">
          <span className="font-display text-9xl leading-none text-crimson/25">“</span>
          <blockquote className="-mt-10 max-w-4xl font-display text-4xl leading-[1.1] text-balance sm:text-5xl md:text-6xl">
            {t.quote}
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-crimson text-sm font-medium text-paper">
              {t.initials}
            </span>
            <span>
              <span className="block text-sm font-medium">{t.name}</span>
              <span className="block text-xs text-muted-foreground">{t.role}</span>
            </span>
          </figcaption>
        </figure>
        <div className="flex items-center gap-3">
          <button type="button" aria-label="Previous quote" onClick={() => go(-1)} className="press grid h-12 w-12 place-items-center rounded-full border border-ink/25 text-lg hover:border-crimson hover:text-crimson">
            ←
          </button>
          <span className="eyebrow tabular w-12 text-center text-muted-foreground">
            {i + 1} / {testimonials.length}
          </span>
          <button type="button" aria-label="Next quote" onClick={() => go(1)} className="press grid h-12 w-12 place-items-center rounded-full bg-crimson text-lg text-paper hover:bg-scarlet">
            →
          </button>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- Program details ---------------- */

export function ProgramDetails() {
  return (
    <Section tone="blush">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <SectionHeader
          eyebrow="Program Details"
          title={
            <>
              Everything, <em className="text-crimson">one page</em>.
            </>
          }
          description="Program pricing will be published shortly. Applications are open in the meantime."
        />
        <Reveal delay={100}>
          <dl className="border-t border-ink/20">
            {programDetails.map((d) => (
              <div
                key={d.label}
                className="grid grid-cols-[minmax(0,8rem)_minmax(0,1fr)] items-baseline gap-4 border-b border-ink/20 py-5 transition-colors hover:bg-paper/40 sm:px-3"
              >
                <dt className="eyebrow text-crimson-deep">{d.label}</dt>
                <dd className="min-w-0 font-display text-2xl leading-tight">{d.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8">
            <ApplyButton size="lg" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------- FAQ: searchable ---------------- */

export function Faq() {
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();
  const list = faqs.filter((f) => !term || (f.q + f.a).toLowerCase().includes(term));

  return (
    <Section id="faq" tone="paper">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeader
            eyebrow="FAQ"
            title={
              <>
                Questions, <em className="text-crimson">answered</em>.
              </>
            }
          />
          <Reveal delay={80}>
            <label className="mt-10 block max-w-sm">
              <span className="eyebrow text-muted-foreground">Search the answers</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="settlement, online, beginners…"
                className="mt-2 w-full border-b border-ink/25 bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-ink/30 focus:border-crimson"
              />
              <span className="eyebrow mt-2 block text-muted-foreground">
                {list.length} of {faqs.length} shown
              </span>
            </label>
          </Reveal>
        </div>
        <Reveal delay={80}>
          {list.length ? (
            <Accordion type="single" collapsible className="w-full border-t border-ink/20">
              {list.map((f) => (
                <AccordionItem key={f.q} value={f.q} className="border-b border-ink/20">
                  <AccordionTrigger className="py-6 text-left font-display text-2xl font-normal hover:no-underline data-[state=open]:text-crimson">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="rounded-3xl border border-dashed border-ink/25 p-10 text-center">
              <p className="font-display text-3xl">Nothing matches “{q}”.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Ask us directly at{" "}
                <a className="text-crimson underline-offset-4 hover:underline" href={`mailto:${company.email}`}>
                  {company.email}
                </a>
              </p>
            </div>
          )}
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------- Footer ---------------- */

export function Footer() {
  return (
    <footer className="panel-ink px-5 pt-20 pb-10 sm:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <a
          href="#top"
          className="block font-display text-[clamp(4rem,17vw,15rem)] leading-[0.85] text-paper/90 transition-colors hover:text-scarlet"
        >
          Acdy<em className="text-scarlet">o</em>n
        </a>

        <div className="mt-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <p className="max-w-sm text-sm leading-relaxed text-paper/55">{company.tagline}</p>
          <div>
            <p className="eyebrow text-paper/40">Program</p>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                { l: "Program", h: "#program" },
                { l: "Curriculum", h: "#curriculum" },
                { l: "Break Hunter", h: "#break-hunter" },
                { l: "FAQ", h: "#faq" },
                { l: "Apply", h: "#apply" },
              ].map((x) => (
                <li key={x.l}>
                  <a href={x.h} className="text-paper/65 transition-colors hover:text-scarlet">
                    {x.l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-paper/40">Contact</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={`mailto:${company.email}`} className="text-paper/65 transition-colors hover:text-scarlet">
                  {company.email}
                </a>
              </li>
              <li className="text-paper/40">Social links coming soon</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-paper/10 pt-6">
          <p className="eyebrow text-paper/35">
            © {new Date().getFullYear()} {company.name}
          </p>
          <p className="eyebrow text-paper/35">Online · 6 Months</p>
        </div>
      </div>
    </footer>
  );
}
