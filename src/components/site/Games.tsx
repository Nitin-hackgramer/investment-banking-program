import { useEffect, useState } from "react";
import { careerRoles } from "@/data/program";
import { cn } from "@/lib/utils";
import { ApplyButton, Reveal, Section, SectionHeader, cssVars } from "./primitives";

/* =====================================================================
 * BREAK HUNTER — a reconciliation game. Compare our books to the
 * custodian's, tap the rows that don't agree, beat the clock.
 * ===================================================================== */

type Row = { id: string; sec: string; ours: string; theirs: string | null; brk?: string | undefined; note?: string | undefined };

const r = (id: string, sec: string, ours: string, theirs: string | null, brk?: string, note?: string): Row => ({
  id,
  sec,
  ours,
  theirs,
  brk,
  note,
});

const levels: { name: string; secs: number; rows: Row[] }[] = [
  {
    name: "Morning batch",
    secs: 45,
    rows: [
      r("T-4101", "GLX", "500 @ 184.22 · 12 Mar", "500 @ 184.22 · 12 Mar"),
      r("T-4102", "BND", "1,000 @ 99.41 · 12 Mar", "1,000 @ 99.14 · 12 Mar", "Price transposition", "Digits swapped (99.41 vs 99.14) on a 1,000-lot: a 270 cash break."),
      r("T-4103", "EUR", "250,000 @ 1.0842 · 13 Mar", "250,000 @ 1.0842 · 13 Mar"),
      r("T-4104", "NVL", "750 @ 47.36 · 13 Mar", "570 @ 47.36 · 13 Mar", "Quantity mismatch", "750 vs 570. Position on the custodian side is 180 short."),
      r("T-4105", "SWP", "5,000 @ 62.17 · 14 Mar", null, "Missing at custodian", "Instruction never reached the custodian. It will fail unless chased today."),
      r("T-4106", "AXM", "300 @ 12.80 · 14 Mar", "300 @ 12.80 · 14 Mar"),
      r("T-4107", "RLD", "1,200 @ 88.05 · 14 Mar", "1,200 @ 88.05 · 15 Mar", "Settlement date", "One day apart. Cash lands a day late, so funding is off."),
      r("T-4108", "KPR", "90 @ 301.50 · 15 Mar", "90 @ 301.50 · 15 Mar"),
    ],
  },
  {
    name: "Quarter-end crunch",
    secs: 50,
    rows: [
      r("T-5201", "HLX", "2,400 @ 18.35 · 28 Mar", "2,400 @ 18.35 · 28 Mar"),
      r("T-5202", "OZN", "15,000 @ 3.4120 · 28 Mar", "15,000 @ 3.4210 · 28 Mar", "Price mismatch", "3.4120 vs 3.4210. Small per unit, 135 across the lot."),
      r("T-5203", "BRK", "800 @ 142.60 · 29 Mar", "800 @ 142.60 · 29 Mar"),
      r("T-5204", "TLR", "60,000 @ 0.9915 · 29 Mar", "60,000 @ 0.9915 · 29 Mar"),
      r("T-5205", "MRD", "1,100 @ 56.90 · 29 Mar", "1,010 @ 56.90 · 29 Mar", "Quantity mismatch", "1,100 vs 1,010. Classic keying slip, and hard to see at speed."),
      r("T-5206", "SLK", "420 @ 205.00 · 30 Mar", "420 @ 205.00 · 30 Mar"),
      r("T-5207", "VNT", "9,500 @ 7.75 · 30 Mar", null, "Missing at custodian", "Booked on our side, absent on theirs. Raise it with the custodian."),
      r("T-5208", "PLM", "3,000 @ 41.20 · 31 Mar", "3,000 @ 41.20 · 01 Apr", "Settlement date", "Quarter-end straddle: 31 Mar vs 01 Apr lands in a different period."),
      r("T-5209", "ASH", "700 @ 96.05 · 31 Mar", "700 @ 96.05 · 31 Mar"),
      r("T-5210", "GRN", "2,000 @ 28.44 · 31 Mar", "2,000 @ 28.44 · 31 Mar"),
    ],
  },
  {
    name: "Chaos Friday",
    secs: 60,
    rows: [
      r("T-6301", "ECL", "1,000 @ 99.41 · 05 Apr", "1,000 @ 99.410 · 05 Apr"),
      r("T-6302", "NRD", "18,000 @ 6.275 · 05 Apr", "18,000 @ 6.275 · 05 Apr"),
      r("T-6303", "QTZ", "640 @ 311.80 · 05 Apr", "640 @ 311.80 · 05 Apr"),
      r("T-6304", "FJD", "22,500 @ 1.0842 · 06 Apr", "22,500 @ 1.0824 · 06 Apr", "Price transposition", "1.0842 vs 1.0824. Easy to read past when everything looks alike."),
      r("T-6305", "HRZ", "4,200 @ 15.66 · 06 Apr", "4,200 @ 15.66 · 06 Apr"),
      r("T-6306", "LMN", "350 @ 480.00 · 06 Apr", "350 @ 480.00 · 09 Apr", "Settlement date", "06 Apr vs 09 Apr crosses a weekend: three days of unfunded exposure."),
      r("T-6307", "PRX", "12,000 @ 9.90 · 07 Apr", "12,000 @ 9.90 · 07 Apr"),
      r("T-6308", "DLT", "880 @ 74.15 · 07 Apr", "808 @ 74.15 · 07 Apr", "Quantity mismatch", "880 vs 808. A single transposed digit."),
      r("T-6309", "OKR", "5,500 @ 33.30 · 07 Apr", "5,500 @ 33.30 · 07 Apr"),
      r("T-6310", "SNW", "1,600 @ 121.05 · 08 Apr", null, "Missing at custodian", "No trace of this trade on the custodian statement."),
      r("T-6311", "VLC", "2,750 @ 8.125 · 08 Apr", "2,750 @ 8.1250 · 08 Apr"),
      r("T-6312", "MTH", "95 @ 1,204.00 · 08 Apr", "95 @ 1,240.00 · 08 Apr", "Price mismatch", "1,204 vs 1,240. Only 3.42 bps, but it is still a break."),
    ],
  },
];

const ranks = [
  { min: 0, t: "Fresh in the seat", s: "Rookie" },
  { min: 60, t: "Solid analyst", s: "Solid" },
  { min: 110, t: "Break whisperer", s: "Sharp" },
  { min: 150, t: "Reconciliation legend", s: "Legend" },
];

type Phase = "intro" | "play" | "review" | "done";

export function BreakHunter() {
  const [level, setLevel] = useState(0);
  const [phase, setPhase] = useState<Phase>("intro");
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [secs, setSecs] = useState(levels[0]!.secs);
  const [scores, setScores] = useState<number[]>([]);
  const [shake, setShake] = useState<string | null>(null);

  const lv = levels[level]!;
  const breaks = lv.rows.filter((x) => x.brk);

  useEffect(() => {
    if (phase !== "play") return;
    if (secs <= 0) {
      finish();
      return;
    }
    const id = setTimeout(() => setSecs((s) => s - 1), 1000);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, secs]);

  const start = (l: number) => {
    setLevel(l);
    setPicked(new Set());
    setSecs(levels[l]!.secs);
    setPhase("play");
  };

  const toggle = (id: string) => {
    if (phase !== "play") return;
    setShake(id);
    setTimeout(() => setShake(null), 260);
    setPicked((p) => {
      const n = new Set(p);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  const tally = () => {
    const good = lv.rows.filter((x) => x.brk && picked.has(x.id)).length;
    const bad = [...picked].filter((id) => !lv.rows.find((x) => x.id === id)?.brk).length;
    return { good, bad, missed: breaks.length - good };
  };

  function finish() {
    const { good, bad } = tally();
    const bonus = good === breaks.length && bad === 0 ? Math.max(0, secs) : 0;
    setScores((s) => [...s.slice(0, level), Math.max(0, good * 15 - bad * 8 + bonus)]);
    setPhase("review");
  }

  const total = scores.reduce((a, b) => a + b, 0);
  const rank = [...ranks].reverse().find((k) => total >= k.min)!;
  const t = tally();

  return (
    <Section id="break-hunter" tone="bone">
      <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            eyebrow="Playable · Reconciliation"
            title={
              <>
                Find the <em className="text-crimson">breaks</em> before the clock does.
              </>
            }
            description="This is the job in miniature. Our books on the left, the custodian's on the right. Tap every trade that disagrees. Miss one and cash goes missing. Cry wolf and you lose credibility."
          />
          <Reveal delay={100}>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-ink/15 pt-6">
              {[
                ["Level", `${level + 1}/${levels.length}`],
                ["Score", String(total)],
                ["Rank", rank.s],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="eyebrow text-muted-foreground">{k}</dt>
                  <dd className="tabular mt-1 font-display text-3xl leading-none">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="overflow-hidden rounded-3xl border border-ink/15 bg-card shadow-[0_40px_70px_-40px_oklch(0.3_0.1_25/0.5)]">
            {/* header */}
            <div className="flex items-center justify-between gap-4 border-b border-ink/10 bg-ink px-5 py-4 text-paper">
              <div className="min-w-0">
                <p className="eyebrow text-scarlet">
                  Shift {level + 1} · {lv.name}
                </p>
                <p className="truncate text-sm text-paper/70">
                  {phase === "play"
                    ? `${picked.size} flagged`
                    : phase === "intro"
                      ? `${breaks.length} breaks hidden in ${lv.rows.length} trades`
                      : "Shift review"}
                </p>
              </div>
              <div
                className={cn(
                  "tabular font-display text-4xl leading-none transition-colors",
                  phase === "play" && secs <= 10 ? "text-scarlet" : "text-paper",
                )}
              >
                {phase === "play" ? `0:${String(secs).padStart(2, "0")}` : "—"}
              </div>
            </div>

            {phase === "intro" || phase === "done" ? (
              <div className="px-6 py-16 text-center sm:px-12">
                {phase === "done" ? (
                  <>
                    <p className="eyebrow text-crimson">Final result</p>
                    <p className="mt-3 font-display text-7xl leading-none text-ink">{total}</p>
                    <p className="mt-3 font-display text-3xl text-crimson italic">{rank.t}</p>
                    <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
                      Reconciliation is Module 05 of the program, with real break aging, escalation
                      and resolution on top of what you just did in 2 minutes.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                      <ApplyButton>Turn this into a career</ApplyButton>
                      <button
                        type="button"
                        onClick={() => {
                          setScores([]);
                          setLevel(0);
                          setPhase("intro");
                        }}
                        className="press rounded-full border border-ink/25 px-6 py-3 text-sm hover:border-crimson hover:text-crimson"
                      >
                        Play again
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="font-display text-4xl leading-tight text-balance">
                      Three shifts. Real breaks. <em className="text-crimson">No hints.</em>
                    </p>
                    <p className="mx-auto mt-4 max-w-sm text-sm text-muted-foreground">
                      Types you will meet: price, quantity, settlement date and missing trades. Not
                      every difference is a break.
                    </p>
                    <button
                      type="button"
                      onClick={() => start(0)}
                      className="press mt-8 rounded-full bg-crimson px-8 py-4 text-base font-medium text-paper transition-colors hover:bg-scarlet"
                    >
                      Start shift 1
                    </button>
                  </>
                )}
              </div>
            ) : (
              <>
                <div className="eyebrow grid grid-cols-[4.2rem_1fr_1fr] gap-3 border-b border-ink/10 bg-bone px-5 py-2.5 text-muted-foreground sm:grid-cols-[5rem_1fr_1fr]">
                  <span>Trade</span>
                  <span>Our books</span>
                  <span>Custodian</span>
                </div>
                <ul className="divide-y divide-ink/10">
                  {lv.rows.map((x) => {
                    const on = picked.has(x.id);
                    const review = phase === "review";
                    const hit = review && x.brk && on;
                    const miss = review && x.brk && !on;
                    const fp = review && !x.brk && on;
                    return (
                      <li key={x.id}>
                        <button
                          type="button"
                          aria-pressed={on}
                          disabled={review}
                          onClick={() => toggle(x.id)}
                          className={cn(
                            "grid w-full grid-cols-[4.2rem_1fr_1fr] gap-3 px-5 py-3 text-left font-mono text-[0.7rem] leading-snug transition-colors duration-150 sm:grid-cols-[5rem_1fr_1fr] sm:text-xs",
                            !review && !on && "hover:bg-blush/40",
                            !review && on && "bg-crimson text-paper",
                            hit && "bg-positive/15",
                            miss && "bg-scarlet/15",
                            fp && "bg-ink/10 line-through decoration-crimson",
                            shake === x.id && "anim-shake",
                          )}
                        >
                          <span className="font-medium">{x.id}</span>
                          <span>{x.ours}</span>
                          <span className={x.theirs ? "" : "opacity-50 italic"}>
                            {x.theirs ?? "— no record —"}
                          </span>
                          {review && x.brk ? (
                            <span
                              className={cn(
                                "col-span-3 mt-1 font-sans text-xs leading-relaxed not-italic",
                                hit ? "text-ink" : "text-crimson-deep",
                              )}
                            >
                              <strong>{hit ? "Caught" : "Missed"}: {x.brk}.</strong> {x.note}
                            </span>
                          ) : null}
                          {fp ? (
                            <span className="col-span-3 mt-1 font-sans text-xs text-muted-foreground no-underline">
                              False alarm. These two agree.
                            </span>
                          ) : null}
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 bg-bone px-5 py-4">
                  {phase === "play" ? (
                    <>
                      <p className="text-xs text-muted-foreground">
                        Tap a row to flag it. Tap again to unflag.
                      </p>
                      <button
                        type="button"
                        onClick={finish}
                        className="press rounded-full bg-ink px-6 py-2.5 text-sm text-paper transition-colors hover:bg-crimson"
                      >
                        Submit shift
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-sm">
                        <span className="tabular font-medium">{t.good}</span> caught ·{" "}
                        <span className="tabular font-medium">{t.missed}</span> missed ·{" "}
                        <span className="tabular font-medium">{t.bad}</span> false alarms ·{" "}
                        <span className="tabular font-display text-2xl text-crimson">
                          +{scores[level] ?? 0}
                        </span>
                      </p>
                      <button
                        type="button"
                        onClick={() => (level + 1 < levels.length ? start(level + 1) : setPhase("done"))}
                        className="press rounded-full bg-crimson px-6 py-2.5 text-sm text-paper transition-colors hover:bg-scarlet"
                      >
                        {level + 1 < levels.length ? `Start shift ${level + 2}` : "See my rank"}
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* =====================================================================
 * ROLE FINDER — 4 questions, scored against the 8 roles the program
 * prepares for. Live bars show the tally moving as you answer.
 * ===================================================================== */

const questions = [
  {
    q: "A trade fails at 4:55pm. First move?",
    a: [
      { t: "Trace it through every system until I find where it broke", w: [1, 3] },
      { t: "Call the counterparty and agree a fix", w: [2, 6] },
      { t: "Check the paperwork. Was the client cleared to trade?", w: [4] },
      { t: "Work out who is affected and report status up", w: [6, 7, 0] },
    ],
  },
  {
    q: "Which puzzle would you pick?",
    a: [
      { t: "Two ledgers disagree by 4,120. Find out why.", w: [3, 2] },
      { t: "A dividend hits 3,000 accounts. Get every payout right.", w: [5] },
      { t: "Decide if a new client is who they say they are.", w: [4] },
      { t: "Map how one trade flows through five teams.", w: [0, 6] },
    ],
  },
  {
    q: "Your strongest trait?",
    a: [
      { t: "Relentless attention to detail", w: [3, 5, 4] },
      { t: "Calm under a ticking clock", w: [1, 2] },
      { t: "Explaining complex things simply", w: [0, 6, 7] },
      { t: "Spotting patterns other people miss", w: [3, 1, 4] },
    ],
  },
  {
    q: "The perfect day ends with…",
    a: [
      { t: "A clean, fully matched book", w: [3, 2] },
      { t: "A dashboard that tells the whole story", w: [7, 6] },
      { t: "A risky client file safely closed", w: [4] },
      { t: "Every event processed before deadline", w: [5, 1] },
    ],
  },
];

export const roleInfo = [
  { why: "You think in end-to-end flows and enjoy connecting the dots between desks.", mods: "Modules 01, 02" },
  { why: "You chase a trade through capture, validation and confirmation until it is right.", mods: "Module 03" },
  { why: "You are at your best when money and securities must move on a fixed date.", mods: "Module 05" },
  { why: "You cannot leave two numbers disagreeing. Breaks are your favourite kind of problem.", mods: "Module 05" },
  { why: "You weigh evidence and risk before you say yes. Trust is the product.", mods: "Module 04" },
  { why: "You love deadlines, calculations and exact entitlements.", mods: "Module 06" },
  { why: "You sit between the desk and the back office and keep both honest.", mods: "Modules 02, 07" },
  { why: "You make operations visible with numbers, reports and clear updates.", mods: "Module 08" },
];

export function RoleFinder() {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState<number[]>(() => careerRoles.map(() => 0));
  const done = step >= questions.length;

  const answer = (w: number[]) => {
    setScore((s) => s.map((v, i) => (w.includes(i) ? v + 1 : v)));
    setStep((s) => s + 1);
  };
  const reset = () => {
    setScore(careerRoles.map(() => 0));
    setStep(0);
  };

  const order = score.map((v, i) => [v, i] as const).sort((a, b) => b[0] - a[0] || a[1] - b[1]);
  const top = order[0]![1];
  const max = Math.max(1, ...score);

  return (
    <Section id="role-finder" tone="crimson">
      <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start">
        <SectionHeader
          eyebrow="Playable · Career fit"
          tone="crimson"
          title={
            <>
              Which operations role is <em className="text-champagne">yours</em>?
            </>
          }
          description="Four questions, no sign-up. Watch the eight roles this program prepares you to explore rise and fall as you answer."
        />

        <Reveal delay={100}>
          <div className="rounded-3xl border border-paper/20 bg-ink/85 p-6 shadow-[0_40px_80px_-40px_oklch(0.1_0.05_20),inset_0_1px_0_oklch(1_0_0/0.08)] backdrop-blur-xl sm:p-8">
            {/* live bars */}
            <ul className="grid gap-1.5" aria-label="Live role scores">
              {careerRoles.map((role, i) => (
                <li key={role} className="grid grid-cols-[minmax(0,1fr)_5rem] items-center gap-3">
                  <span
                    className={cn(
                      "truncate text-xs transition-colors",
                      done && i === top ? "text-champagne" : "text-paper/55",
                    )}
                  >
                    {role}
                  </span>
                  <span className="h-1.5 overflow-hidden rounded-full bg-paper/10">
                    <span
                      className={cn(
                        "block h-full origin-left rounded-full transition-transform duration-500 ease-[var(--ease-out)]",
                        done && i === top ? "bg-champagne" : "bg-scarlet",
                      )}
                      style={{ transform: `scaleX(${score[i]! / max})` }}
                    />
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-7 border-t border-paper/10 pt-7">
              {done ? (
                <div key="result" className="anim-swap">
                  <p className="eyebrow text-scarlet">Your best fit</p>
                  <p className="mt-3 font-display text-4xl leading-[1.02] text-paper sm:text-5xl">
                    {careerRoles[top]}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-paper/75">{roleInfo[top]!.why}</p>
                  <p className="eyebrow mt-4 text-paper/50">
                    Covered in: <span className="text-champagne">{roleInfo[top]!.mods}</span>
                  </p>
                  <p className="mt-3 text-xs text-paper/50">
                    Runner-up: {careerRoles[order[1]![1]]}. Roles you may prepare to explore, not
                    a guarantee of placement.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <ApplyButton variant="bone">Apply for this path</ApplyButton>
                    <button
                      type="button"
                      onClick={reset}
                      className="press rounded-full border border-paper/30 px-6 py-3 text-sm text-paper hover:bg-paper/10"
                    >
                      Retake
                    </button>
                  </div>
                </div>
              ) : (
                <div key={step} className="anim-swap">
                  <div className="flex items-center justify-between">
                    <p className="eyebrow text-scarlet">
                      Question {step + 1} of {questions.length}
                    </p>
                    <div className="flex gap-1.5">
                      {questions.map((_, i) => (
                        <span
                          key={i}
                          className={cn(
                            "h-1 w-6 rounded-full",
                            i <= step ? "bg-scarlet" : "bg-paper/15",
                          )}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-4 font-display text-3xl leading-tight text-paper">
                    {questions[step]!.q}
                  </p>
                  <div className="mt-5 grid gap-2">
                    {questions[step]!.a.map((o, i) => (
                      <button
                        key={o.t}
                        type="button"
                        onClick={() => answer(o.w)}
                        style={cssVars({ "--i": i + 1 })}
                        className="anim-swap press rounded-xl border border-paper/15 px-4 py-3 text-left text-sm text-paper/90 transition-colors duration-150 hover:border-scarlet hover:bg-scarlet/15"
                      >
                        {o.t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
