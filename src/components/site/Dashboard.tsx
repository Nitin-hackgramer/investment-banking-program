import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Hero workstation. Fully interactive: click a trade's status chip to push it
 * one stage down the lifecycle. Push everything to Reconciled to "clear the day".
 */

const stages = ["Captured", "Confirmed", "Settled", "Reconciled"] as const;

const seed = [
  { sym: "EQ.GLX", name: "Trade GLX-4471", px: 184.22, stage: 0 },
  { sym: "FI.BND", name: "Trade BND-8820", px: 99.41, stage: 1 },
  { sym: "FX.EUR", name: "Trade EUR-1093", px: 1.0842, stage: 0 },
  { sym: "DR.SWP", name: "Trade SWP-3317", px: 62.17, stage: 2 },
  { sym: "EQ.NVL", name: "Trade NVL-2208", px: 47.36, stage: 1 },
];

function useTick(ms = 1800) {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setT((v) => v + 1), ms);
    return () => clearInterval(id);
  }, [ms]);
  return t;
}

export function OperationsDashboard() {
  const t = useTick();
  const [trades, setTrades] = useState(seed);
  const [flash, setFlash] = useState<number | null>(null);

  const total = trades.length * (stages.length - 1);
  const done = trades.reduce((a, x) => a + x.stage, 0);
  const pct = Math.round((done / total) * 100);
  const cleared = done === total;

  const advance = (i: number) => {
    setTrades((prev) =>
      prev.map((x, k) => (k === i && x.stage < stages.length - 1 ? { ...x, stage: x.stage + 1 } : x)),
    );
    setFlash(i);
    setTimeout(() => setFlash(null), 500);
  };

  return (
    <div className="relative">
      <div className="rounded-2xl border border-paper/15 bg-ink/70 p-4 shadow-[0_40px_80px_-30px_oklch(0.1_0.05_20/0.8),inset_0_1px_0_oklch(1_0_0/0.08)] backdrop-blur-xl sm:p-5">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-paper/10 pb-4">
          <div className="min-w-0">
            <p className="eyebrow text-scarlet">Operations desk</p>
            <p className="truncate text-sm text-paper/80">
              {cleared ? "All trades reconciled. Desk is clear." : "Click a status to move the trade on"}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="anim-pulse-soft h-2 w-2 rounded-full bg-positive" />
            <span className="eyebrow text-paper/60">Live</span>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-end justify-between">
            <p className="eyebrow text-paper/50">Day cleared</p>
            <p className="tabular font-display text-4xl leading-none text-paper">{pct}%</p>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-paper/10">
            <div
              className="h-full origin-left rounded-full bg-scarlet transition-transform duration-500 ease-[var(--ease-out)]"
              style={{ transform: `scaleX(${pct / 100})` }}
            />
          </div>
        </div>

        <ul className="mt-4 divide-y divide-paper/10 overflow-hidden rounded-xl border border-paper/10">
          {trades.map((x, i) => {
            const drift = Math.sin((t + i * 2) / 1.7) * (x.px * 0.0025);
            const up = drift >= 0;
            const last = x.stage === stages.length - 1;
            return (
              <li
                key={x.sym}
                className={cn(
                  "grid grid-cols-[1fr_auto_auto] items-center gap-3 px-3 py-2.5 transition-colors duration-500",
                  flash === i && "bg-scarlet/20",
                )}
              >
                <div className="min-w-0">
                  <p className="truncate font-mono text-xs text-paper">{x.sym}</p>
                  <p className="truncate text-[0.7rem] text-paper/45">{x.name}</p>
                </div>
                <p
                  className={cn(
                    "tabular text-right font-mono text-xs",
                    up ? "text-positive" : "text-warning",
                  )}
                >
                  {(x.px + drift).toFixed(x.px < 5 ? 4 : 2)}
                </p>
                <button
                  type="button"
                  disabled={last}
                  onClick={() => advance(i)}
                  aria-label={`${x.name}: ${stages[x.stage]}${last ? "" : ", advance to next stage"}`}
                  className={cn(
                    "press eyebrow w-[6.5rem] rounded-full border px-2 py-1.5 text-center text-[0.6rem] transition-colors duration-200",
                    last
                      ? "border-positive/40 bg-positive/10 text-positive"
                      : "border-paper/25 text-paper hover:border-scarlet hover:bg-scarlet/15",
                  )}
                >
                  {stages[x.stage]}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="truncate font-mono text-[0.68rem] text-paper/45">
            <span className="text-scarlet">›</span>{" "}
            {cleared ? "EOD complete · 0 breaks open" : `${trades.filter((x) => x.stage < 3).length} trades pending`}
          </p>
          <button
            type="button"
            onClick={() => setTrades(seed)}
            className="press eyebrow shrink-0 text-paper/50 transition-colors hover:text-paper"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
