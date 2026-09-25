import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import logoUrl from "@/assets/acdyon-logo.webp";

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- reveal on enter ---------- */

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, shown };
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", shown && "reveal-in", className)}
    >
      {children}
    </div>
  );
}

/* ---------- scroll-pinned stepper ----------
 * A tall track element; inside it a `sticky` child stays pinned while the
 * page scrolls. Scroll position -> active step. `--p` (0..1) is written
 * straight to the element so progress bars never cause React re-renders.
 */

export function useStickyStep(steps: number) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = (el.firstElementChild as HTMLElement | null)?.offsetHeight ?? window.innerHeight;
      const total = Math.max(1, r.height - vh);
      const p = Math.min(1, Math.max(0, -r.top / total));
      el.style.setProperty("--p", p.toFixed(4));
      setActive(Math.min(steps - 1, Math.floor(p * steps)));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [steps]);

  const goTo = useCallback(
    (i: number) => {
      const el = ref.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const vh = (el.firstElementChild as HTMLElement | null)?.offsetHeight ?? window.innerHeight;
      const total = el.offsetHeight - vh;
      window.scrollTo({ top: top + ((i + 0.5) / steps) * total, behavior: "smooth" });
    },
    [steps],
  );

  return { ref, active, goTo };
}

/* ---------- cursor spotlight ---------- */

export function Spot({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
}) {
  const ref = useRef<HTMLElement>(null);
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  // Touch has no hover: light the card while it sits in the middle band of the screen.
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: none)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => el.toggleAttribute("data-lit", !!e?.isIntersecting),
      { rootMargin: "-32% 0px -32% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref as never} onPointerMove={onMove} className={cn("spot", className)}>
      {children}
    </Tag>
  );
}

/* ---------- scroll-reactive marquee ---------- */

export function Marquee({ children, className }: { children: ReactNode; className?: string }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || reduced()) return;
    const anim = el.getAnimations()[0];
    if (!anim) return;
    let dir = 1;
    let boost = 0;
    let raf = 0;
    let last = window.scrollY;
    const tick = () => {
      boost *= 0.93;
      if (boost < 0.02) boost = 0;
      anim.updatePlaybackRate(dir * (1 + boost));
      if (boost) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      const dy = window.scrollY - last;
      last = window.scrollY;
      if (Math.abs(dy) < 1) return;
      dir = dy > 0 ? 1 : -1;
      boost = Math.min(7, Math.abs(dy) / 5);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={cn("flex overflow-hidden", className)}>
      <div ref={track} className="anim-marquee flex w-max shrink-0 items-center">
        {children}
        <span aria-hidden className="flex items-center">
          {children}
        </span>
      </div>
    </div>
  );
}

/* ---------- layout ---------- */

export type Tone = "paper" | "bone" | "blush" | "ink" | "crimson";

export const isDark = (t: Tone) => t === "ink" || t === "crimson";

export function Section({
  id,
  tone = "paper",
  className,
  children,
  bare = false,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
  /** bare: no inner max-width wrapper (caller handles layout) */
  bare?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-20 px-5 py-16 sm:px-8 sm:py-24 md:py-36",
        tone === "paper" && "bg-paper text-ink",
        tone === "bone" && "bg-bone text-ink",
        tone === "blush" && "bg-blush text-ink",
        tone === "ink" && "panel-ink",
        tone === "crimson" && "panel-crimson",
        className,
      )}
    >
      {bare ? children : <div className="mx-auto w-full max-w-7xl">{children}</div>}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  tone = "paper",
  align = "left",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  tone?: Tone;
  align?: "left" | "center";
  className?: string;
}) {
  const dark = isDark(tone);
  return (
    <Reveal className={cn("max-w-4xl", align === "center" && "mx-auto text-center", className)}>
      <div
        className={cn(
          "eyebrow flex items-center gap-3",
          align === "center" && "justify-center",
          tone === "crimson" ? "text-paper/80" : dark ? "text-scarlet" : "text-crimson",
        )}
      >
        <span className="h-px w-10 bg-current opacity-70" />
        {eyebrow}
      </div>
      <h2
        className={cn(
          "mt-5 text-[2.6rem] leading-[1] text-balance sm:mt-6 sm:text-6xl md:text-7xl",
          dark ? "text-paper" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-6 max-w-2xl text-base leading-relaxed sm:text-lg",
            align === "center" && "mx-auto",
            dark ? "text-paper/70" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

export function Logo({ className, invert = false }: { className?: string; invert?: boolean }) {
  return (
    <span className={cn("flex min-w-0 items-center gap-2.5", className)}>
      <img
        src={logoUrl}
        alt="Acdyon Technologies"
        className="h-10 w-10 shrink-0 rounded-lg object-cover ring-1 ring-paper/20"
      />
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={cn(
            "truncate font-display text-2xl leading-none",
            invert ? "text-paper" : "text-ink",
          )}
        >
          Acdy<em className="text-scarlet">o</em>n
        </span>
        <span
          className={cn(
            "eyebrow mt-1 truncate text-[0.55rem]",
            invert ? "text-paper/55" : "text-muted-foreground",
          )}
        >
          Technologies
        </span>
      </span>
    </span>
  );
}

export function Badge({
  children,
  tone = "light",
}: {
  children: ReactNode;
  tone?: "light" | "dark" | "red";
}) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center rounded-full border px-3 py-1",
        tone === "light" && "border-ink/15 bg-paper text-muted-foreground",
        tone === "dark" && "border-paper/20 bg-paper/5 text-paper/75",
        tone === "red" && "border-crimson/30 bg-crimson/10 text-crimson",
      )}
    >
      {children}
    </span>
  );
}

export function ApplyButton({
  children = "Apply Now",
  variant = "solid",
  size = "md",
  className,
  href = "#apply",
}: {
  children?: ReactNode;
  variant?: "solid" | "bone" | "ink" | "outline" | "ghost-dark";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group press relative inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-tight transition-[background-color,color,border-color,box-shadow] duration-300",
        size === "sm" && "px-5 py-2 text-sm",
        size === "md" && "px-6 py-3 text-sm",
        size === "lg" && "px-8 py-4 text-base",
        variant === "solid" &&
          "bg-crimson text-paper shadow-[0_14px_30px_-14px_var(--crimson)] hover:bg-scarlet",
        variant === "bone" && "bg-paper text-crimson-deep hover:bg-ink hover:text-paper",
        variant === "ink" && "bg-ink text-paper hover:bg-crimson-deep",
        variant === "outline" && "border border-ink/25 text-ink hover:border-crimson hover:text-crimson",
        variant === "ghost-dark" && "border border-paper/35 text-paper hover:bg-paper/10",
        className,
      )}
    >
      {children}
      <span
        aria-hidden
        className="transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  );
}

export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const { ref, shown } = useReveal<HTMLSpanElement>();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!shown) return;
    if (reduced()) {
      setN(value);
      return;
    }
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(value * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, value]);

  return (
    <span ref={ref} className="tabular">
      {n}
      {suffix}
    </span>
  );
}

export const cssVars = (v: Record<string, string | number>) => v as CSSProperties;

/* ---------- gentle slow-down in the hero and footer ----------
 * Wheel deltas are scaled while the hero/footer dominates the viewport. No easing
 * or momentum layer, so scrolling stays 1:1 responsive. Elsewhere it is native.
 */
export function useSlowZones(damp = 0.65) {
  useEffect(() => {
    if (reduced()) return;
    const inZone = () => {
      const h = window.innerHeight;
      const hero = document.getElementById("top")?.getBoundingClientRect();
      const foot = document.querySelector("footer")?.getBoundingClientRect();
      return (!!hero && hero.bottom > h * 0.35) || (!!foot && foot.top < h * 0.6);
    };
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.deltaMode !== 0 || !inZone()) return;
      e.preventDefault();
      window.scrollBy({ top: e.deltaY * damp, behavior: "instant" });
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [damp]);
}

/* ---------- click effect ----------
 * A champagne/scarlet ring blooms from the pointer with a small burst of
 * sparks. Pure Web Animations API on throwaway nodes: no React state.
 */
export function ClickFx() {
  useEffect(() => {
    if (reduced()) return;
    const layer = document.createElement("div");
    layer.setAttribute("aria-hidden", "true");
    layer.style.cssText = "position:fixed;inset:0;z-index:70;pointer-events:none;overflow:hidden";
    document.body.appendChild(layer);

    const spawn = (x: number, y: number) => {
      const ring = document.createElement("span");
      ring.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:18px;height:18px;margin:-9px 0 0 -9px;border-radius:50%;border:2px solid oklch(0.86 0.07 82);box-shadow:0 0 0 1px oklch(0.63 0.23 28),inset 0 0 0 1px oklch(0.63 0.23 28 / .5)`;
      layer.appendChild(ring);
      ring
        .animate(
          [
            { transform: "scale(0.3)", opacity: 1 },
            { transform: "scale(3.4)", opacity: 0 },
          ],
          { duration: 620, easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
        )
        .finished.then(() => ring.remove());

      const n = window.matchMedia("(pointer: coarse)").matches ? 5 : 8;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + Math.random() * 0.5;
        const dist = 26 + Math.random() * 26;
        const dot = document.createElement("span");
        const c = i % 2 ? "oklch(0.86 0.07 82)" : "oklch(0.63 0.23 28)";
        dot.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:5px;height:5px;margin:-2.5px 0 0 -2.5px;border-radius:50%;background:${c};box-shadow:0 0 0 1px oklch(0.15 0.028 20 / .35)`;
        layer.appendChild(dot);
        dot
          .animate(
            [
              { transform: "translate(0,0) scale(1)", opacity: 1 },
              { transform: `translate(${Math.cos(a) * dist}px,${Math.sin(a) * dist}px) scale(0)`, opacity: 0 },
            ],
            { duration: 520, easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
          )
          .finished.then(() => dot.remove());
      }
    };

    const onDown = (e: globalThis.PointerEvent) => {
      if (e.button === 0) spawn(e.clientX, e.clientY);
    };
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", onDown);
      layer.remove();
    };
  }, []);
  return null;
}

/* ---------- small mobile helpers ---------- */

/** Short haptic tick on devices that support it (Android Chrome). No-op elsewhere. */
export const buzz = (ms = 12) => {
  if (typeof navigator !== "undefined") navigator.vibrate?.(ms);
};

/** True only on the client after mount, so SSR markup never differs. */
export function useCanShare() {
  const [can, setCan] = useState(false);
  useEffect(() => setCan(typeof navigator.share === "function"), []);
  return can;
}

export const shareText = (text: string) =>
  navigator.share?.({ title: "Acdyon IB Operations", text, url: window.location.origin }).catch(() => {});
