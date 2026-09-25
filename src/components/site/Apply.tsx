import { useState, type FormEvent } from "react";
import { company } from "@/data/program";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";
import { Reveal } from "./primitives";
import { waUrl } from "./Navbar";

const backgrounds = ["Student", "Fresh graduate", "Career switcher", "Working professional", "Other"];

export function ApplySection() {
  const [sent, setSent] = useState(false);
  const [pending, setPending] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    // Front-end only for now: wire to a backend / email service before launch.
    setTimeout(() => {
      setPending(false);
      setSent(true);
    }, 700);
  };

  return (
    <section id="apply" className="panel-crimson relative scroll-mt-20 overflow-hidden px-5 py-16 sm:px-8 sm:py-24 md:py-36">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-10 -bottom-16 hidden select-none md:block font-display text-[32vw] leading-none text-paper/[0.07] italic"
      >
        Apply
      </span>

      <div className="relative mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <Reveal>
          <div>
            <span className="eyebrow text-paper/80">Applications open</span>
            <h2 className="mt-6 text-5xl leading-[0.95] text-balance text-paper sm:text-7xl md:text-8xl">
              Take the <em className="text-champagne">seat</em>.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-paper/80">
              Tell us where you are today. The Acdyon team reads every application and replies
              personally.
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="press mt-8 inline-flex min-h-14 items-center gap-3 rounded-full border border-paper/40 px-6 text-base font-medium text-paper hover:bg-paper/10"
            >
              <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
            </a>
            <p className="mt-5 text-sm text-paper/70">
              Prefer email?{" "}
              <a href={`mailto:${company.email}`} className="text-paper underline underline-offset-4">
                {company.email}
              </a>
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-3xl bg-ink p-5 shadow-[0_50px_90px_-30px_oklch(0.08_0.05_20),inset_0_1px_0_oklch(1_0_0/0.08)] sm:p-9">
            {sent ? (
              <div className="py-10 text-center">
                <div className="anim-pop mx-auto grid h-16 w-16 place-items-center rounded-full bg-scarlet text-2xl text-paper">
                  ✓
                </div>
                <h3 className="mt-6 text-4xl text-paper">Application received.</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm text-paper/60">
                  Thank you for applying. The Acdyon team will get back to you at the email address
                  you provided.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="press mt-8 rounded-full border border-paper/25 px-6 py-2.5 text-sm text-paper hover:bg-paper/10"
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6">
                <p className="eyebrow text-scarlet">Application form</p>
                <Field label="Name">
                  <input required name="name" autoComplete="name" className={inputCls} />
                </Field>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Email">
                    <input required type="email" name="email" autoComplete="email" className={inputCls} />
                  </Field>
                  <Field label="Phone">
                    <input required type="tel" inputMode="tel" name="phone" autoComplete="tel" className={inputCls} />
                  </Field>
                </div>
                <Field label="Current background">
                  <select required name="background" defaultValue="" className={inputCls}>
                    <option value="" disabled>
                      Select one
                    </option>
                    {backgrounds.map((b) => (
                      <option key={b} value={b} className="bg-ink">
                        {b}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Why are you interested?">
                  <textarea required name="motivation" rows={3} className={inputCls} />
                </Field>

                <button
                  type="submit"
                  disabled={pending}
                  className={cn(
                    "press w-full rounded-full bg-crimson px-6 py-4 text-base font-medium text-paper transition-colors hover:bg-scarlet",
                    pending && "opacity-70",
                  )}
                >
                  {pending ? "Sending…" : "Submit application"}
                </button>
                <p className="eyebrow text-[0.6rem] text-paper/35">
                  We only use your details to contact you about this program.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const inputCls =
  "w-full border-b border-paper/25 bg-transparent py-2.5 text-base text-paper outline-none transition-colors placeholder:text-paper/30 focus:border-scarlet";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow mb-1 block text-paper/50">{label}</span>
      {children}
    </label>
  );
}
