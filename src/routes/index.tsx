import { createFileRoute } from "@tanstack/react-router";
import { ClickFx, useSlowZones } from "@/components/site/primitives";
import { Navbar } from "@/components/site/Navbar";
import { MobileBar } from "@/components/site/MobileBar";
import { Hero } from "@/components/site/Hero";
import { Curriculum } from "@/components/site/Curriculum";
import { ApplySection } from "@/components/site/Apply";
import { BreakHunter, RoleFinder } from "@/components/site/Games";
import {
  Certification,
  Experience,
  Faq,
  Footer,
  Industries,
  Mentors,
  Outcomes,
  ProgramDetails,
  Projects,
  Stats,
  Testimonials,
  WhatYouLearn,
  WhyOperations,
  Workflow,
} from "@/components/site/Sections";

const title = "Investment Banking Operations Program | Acdyon Technologies";
const description =
  "A structured 6-month online program in investment banking operations: financial markets, trade lifecycle, KYC & AML, settlements, reconciliation, corporate actions, risk and reporting.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useSlowZones();
  return (
    <div className="min-h-[100dvh] bg-background">
      <ClickFx />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <WhyOperations />
        <WhatYouLearn />
        <Curriculum />
        <Workflow />
        <BreakHunter />
        <Projects />
        <Experience />
        <Outcomes />
        <RoleFinder />
        <Mentors />
        <Certification />
        <Industries />
        <Testimonials />
        <ProgramDetails />
        <Faq />
        <ApplySection />
      </main>
      <Footer />
      <MobileBar />
    </div>
  );
}
