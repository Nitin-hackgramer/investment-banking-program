/**
 * Centralized, editable content for the Acdyon Technologies
 * Investment Banking Operations Program website.
 *
 * Replace any value here without touching the visual components.
 */

export const company = {
  name: "Acdyon Technologies",
  program: "Investment Banking Operations Program",
  email: "shishir@acdyon.com",
  phone: "+91 79862 40239",
  // wa.me wants digits only, with country code (assumed India, +91)
  whatsapp: "917986240239",
  tagline:
    "Practical, operations-first training for careers in investment banking and capital markets.",
};

export const hero = {
  headline: "Build Your Career in Investment Banking Operations.",
  subheadline:
    "A structured 6-month online program designed to build practical knowledge of investment banking operations, financial markets, trade lifecycle, risk, compliance and real-world banking workflows.",
  primaryCta: "Apply Now",
  secondaryCta: "Explore Program",
  meta: ["6 Months", "Online", "Industry-Focused", "Practical Learning"],
};

export const stats = [
  { value: 6, suffix: "", label: "Months", sublabel: "Structured Program" },
  { value: 8, suffix: "+", label: "Modules", sublabel: "Core Learning Modules" },
  { value: 20, suffix: "+", label: "Exercises", sublabel: "Practical Exercises" },
  { value: 100, suffix: "%", label: "Online", sublabel: "Online Learning" },
] as const;

export const whyPillars = [
  {
    code: "OPS-01",
    title: "Trade Lifecycle",
    description:
      "Every trade moves through capture, validation, confirmation and settlement. Operations teams keep that chain accurate and on time.",
    metric: "T+1",
    metricLabel: "Standard settlement cycle",
  },
  {
    code: "OPS-02",
    title: "Risk & Compliance",
    description:
      "Controls, checks and regulatory reporting sit at the centre of banking operations, protecting both the firm and its clients.",
    metric: "4 Eyes",
    metricLabel: "Typical control principle",
  },
  {
    code: "OPS-03",
    title: "Settlements & Reconciliation",
    description:
      "Cash and securities must match across internal books, custodians and counterparties. Breaks are investigated and resolved daily.",
    metric: "Nostro",
    metricLabel: "Cash & stock reconciliation",
  },
  {
    code: "OPS-04",
    title: "Corporate Actions",
    description:
      "Dividends, splits, mergers and rights issues change positions and entitlements. Accurate processing keeps client records correct.",
    metric: "Ex-Date",
    metricLabel: "Entitlement key date",
  },
];

export const learningAreas = [
  {
    title: "Financial Markets",
    blurb: "Market structure, participants, instruments and how capital moves between them.",
    size: "lg" as const,
  },
  {
    title: "Investment Banking Fundamentals",
    blurb: "Front, middle and back office responsibilities across the deal and trade lifecycle.",
    size: "md" as const,
  },
  { title: "Trade Lifecycle", blurb: "Order to settlement, end to end.", size: "sm" as const },
  { title: "KYC & AML", blurb: "Client onboarding, due diligence and monitoring.", size: "sm" as const },
  { title: "Settlements", blurb: "Delivery versus payment, fails and resolution.", size: "md" as const },
  { title: "Reconciliation", blurb: "Break identification, investigation and resolution.", size: "sm" as const },
  { title: "Corporate Actions", blurb: "Mandatory and voluntary event processing.", size: "sm" as const },
  { title: "Risk & Compliance", blurb: "Operational risk, controls and regulatory obligation.", size: "md" as const },
  { title: "Reporting & Operations", blurb: "Daily MIS, exception reporting and operational metrics.", size: "lg" as const },
];

export type Module = {
  id: string;
  number: string;
  title: string;
  duration: string;
  overview: string;
  topics: string[];
  skills: string[];
  exercise: string;
  tools: string[];
};

export const curriculum: Module[] = [
  {
    id: "financial-markets",
    number: "01",
    title: "Financial Markets",
    duration: "Weeks 1–3",
    overview:
      "Understand how global financial markets are structured, who participates in them and how instruments are traded, cleared and held.",
    topics: [
      "Market structure and participants",
      "Equities, fixed income and derivatives",
      "Primary versus secondary markets",
      "Exchanges, clearing houses and custodians",
    ],
    skills: ["Market literacy", "Instrument identification", "Financial terminology"],
    exercise: "Map a single equity trade across every market participant involved.",
    tools: ["Market data concepts", "Instrument reference data", "Spreadsheet analysis"],
  },
  {
    id: "ib-fundamentals",
    number: "02",
    title: "Investment Banking Fundamentals",
    duration: "Weeks 4–6",
    overview:
      "Learn how an investment bank is organised and how front, middle and back office functions interact on a daily basis.",
    topics: [
      "Front, middle and back office roles",
      "Product and desk structures",
      "Client onboarding to trade booking",
      "Operational hand-offs and dependencies",
    ],
    skills: ["Organisational awareness", "Process mapping", "Stakeholder communication"],
    exercise: "Build a process map showing hand-offs between desk, middle office and operations.",
    tools: ["Process mapping", "Operating model templates"],
  },
  {
    id: "trade-lifecycle",
    number: "03",
    title: "Trade Lifecycle",
    duration: "Weeks 7–10",
    overview:
      "Follow a trade from order placement through capture, validation, confirmation, clearing and settlement.",
    topics: [
      "Order capture and execution",
      "Trade validation and enrichment",
      "Confirmation and affirmation",
      "Clearing and settlement instructions",
    ],
    skills: ["Lifecycle analysis", "Exception handling", "Attention to detail"],
    exercise: "Investigate a set of failed trade captures and document the root cause of each.",
    tools: ["Trade blotter simulation", "Exception queues", "Settlement instructions"],
  },
  {
    id: "kyc-aml",
    number: "04",
    title: "KYC / AML",
    duration: "Weeks 11–13",
    overview:
      "Work through client onboarding, due diligence tiers and the monitoring controls that support financial crime prevention.",
    topics: [
      "Client identification and verification",
      "Standard and enhanced due diligence",
      "Sanctions and PEP screening",
      "Ongoing monitoring and periodic review",
    ],
    skills: ["Documentation review", "Risk rating", "Regulatory awareness"],
    exercise: "Complete a simulated onboarding file and justify the assigned client risk rating.",
    tools: ["Onboarding checklists", "Screening workflow", "Case notes"],
  },
  {
    id: "settlements",
    number: "05",
    title: "Settlements & Reconciliation",
    duration: "Weeks 14–17",
    overview:
      "Understand delivery versus payment, settlement fails and the daily reconciliation of cash and securities positions.",
    topics: [
      "DVP and free-of-payment settlement",
      "Settlement fails and buy-ins",
      "Nostro and depot reconciliation",
      "Break investigation and escalation",
    ],
    skills: ["Reconciliation discipline", "Break analysis", "Escalation judgement"],
    exercise: "Reconcile a day of cash and stock records and resolve the outstanding breaks.",
    tools: ["Reconciliation workbook", "Break aging report", "Custodian statements"],
  },
  {
    id: "corporate-actions",
    number: "06",
    title: "Corporate Actions",
    duration: "Weeks 18–20",
    overview:
      "Process mandatory and voluntary corporate action events and understand their effect on positions and entitlements.",
    topics: [
      "Dividends, splits and bonus issues",
      "Mergers, spin-offs and rights issues",
      "Key dates: announcement, ex, record, pay",
      "Election capture and entitlement calculation",
    ],
    skills: ["Event interpretation", "Entitlement calculation", "Deadline management"],
    exercise: "Calculate client entitlements for a cash dividend and a rights issue.",
    tools: ["Event notification formats", "Entitlement calculators"],
  },
  {
    id: "risk-compliance",
    number: "07",
    title: "Risk & Compliance",
    duration: "Weeks 21–22",
    overview:
      "Study operational risk in a banking environment and the control framework that keeps processes safe and auditable.",
    topics: [
      "Operational risk categories",
      "Preventive and detective controls",
      "Incident capture and root cause analysis",
      "Audit trails and evidence",
    ],
    skills: ["Control thinking", "Root cause analysis", "Clear written reporting"],
    exercise: "Write an incident report for a simulated operational break, including controls to add.",
    tools: ["Risk register", "Incident log", "Control matrix"],
  },
  {
    id: "reporting",
    number: "08",
    title: "Operational Reporting",
    duration: "Weeks 23–26",
    overview:
      "Produce the daily reporting that operations teams rely on, from exception dashboards to management information.",
    topics: [
      "Daily exception and break reporting",
      "Key operational metrics",
      "Dashboard design and data quality",
      "Communicating operational status",
    ],
    skills: ["Data handling", "Reporting design", "Operational storytelling"],
    exercise: "Build a daily operations dashboard from a week of simulated exception data.",
    tools: ["Spreadsheet modelling", "Dashboard mock-ups", "MIS templates"],
  },
];

export const workflow = [
  { step: "01", title: "Trade Initiated", detail: "An order is placed and executed on behalf of a client or desk." },
  { step: "02", title: "Trade Capture", detail: "Trade details are booked, enriched with reference data and validated." },
  { step: "03", title: "Confirmation", detail: "Economics are matched and affirmed with the counterparty." },
  { step: "04", title: "Settlement", detail: "Cash and securities are exchanged on the agreed settlement date." },
  { step: "05", title: "Reconciliation", detail: "Internal records are matched against custodian and counterparty records." },
  { step: "06", title: "Reporting", detail: "Exceptions, metrics and daily status are reported to stakeholders." },
];

export const projects = [
  {
    ref: "CASE 01",
    title: "Trade Lifecycle Analysis",
    scenario:
      "A trading desk reports that several equity trades did not reach settlement on the expected date.",
    task: "Trace each trade through capture, confirmation and settlement to isolate where the chain broke.",
    skills: ["Lifecycle analysis", "Exception handling", "Documentation"],
    outcome: "A written lifecycle report identifying failure points and recommended process fixes.",
  },
  {
    ref: "CASE 02",
    title: "Settlement & Reconciliation Case",
    scenario:
      "End-of-day cash and stock balances do not agree with the custodian statement for a client account.",
    task: "Reconcile both records, classify the breaks and propose resolution and escalation steps.",
    skills: ["Reconciliation", "Break analysis", "Escalation"],
    outcome: "A reconciled position with an aged break log and a resolution plan.",
  },
  {
    ref: "CASE 03",
    title: "Corporate Actions Processing",
    scenario:
      "A mandatory dividend and a voluntary rights issue are announced across a book of client holdings.",
    task: "Interpret each event, capture elections and calculate entitlements against key dates.",
    skills: ["Event interpretation", "Entitlement calculation", "Deadline control"],
    outcome: "An entitlement schedule with supporting calculations and an election summary.",
  },
  {
    ref: "CASE 04",
    title: "KYC / AML Operations Simulation",
    scenario:
      "A new corporate client requires onboarding with an incomplete documentation pack.",
    task: "Review the file, identify gaps, run screening checks and assign a risk rating with rationale.",
    skills: ["Due diligence", "Risk rating", "Regulatory awareness"],
    outcome: "A completed onboarding case file with a documented risk assessment.",
  },
];

export const experiencePillars = [
  {
    title: "Live / Guided Learning",
    detail: "Structured sessions that walk through concepts and operational scenarios step by step.",
  },
  {
    title: "Practical Assignments",
    detail: "Every module ends with hands-on work rather than a multiple-choice quiz.",
  },
  {
    title: "Case-Based Learning",
    detail: "Realistic operational situations modelled on how banking teams actually work.",
  },
  {
    title: "Mentor Support",
    detail: "Guidance and review on assignments, with feedback you can act on.",
  },
  {
    title: "Industry-Oriented Curriculum",
    detail: "Content built around the workflows operations teams run every day.",
  },
  {
    title: "Progress Tracking",
    detail: "Clear visibility of modules completed, assignments submitted and skills built.",
  },
];

export const careerRoles = [
  "Investment Banking Operations Analyst",
  "Trade Operations Analyst",
  "Settlement Analyst",
  "Reconciliation Analyst",
  "KYC / AML Analyst",
  "Corporate Actions Analyst",
  "Middle Office Analyst",
  "Financial Operations Associate",
];

export const careerProgression = [
  { label: "Learning", detail: "Structured modules across markets and operations" },
  { label: "Practical Skills", detail: "Assignments, cases and operational exercises" },
  { label: "Industry Readiness", detail: "Workflow fluency and operational vocabulary" },
  { label: "Career Opportunities", detail: "Roles you can prepare to explore" },
];

export const mentors = [
  {
    name: "Mentor Name",
    role: "Program Mentor — Trade Operations",
    experience: "Placeholder experience summary",
    specialization: "Trade lifecycle, settlements",
    initials: "MN",
  },
  {
    name: "Mentor Name",
    role: "Program Mentor — Risk & Compliance",
    experience: "Placeholder experience summary",
    specialization: "Operational risk, controls",
    initials: "MN",
  },
  {
    name: "Mentor Name",
    role: "Program Mentor — Client Onboarding",
    experience: "Placeholder experience summary",
    specialization: "KYC, AML, due diligence",
    initials: "MN",
  },
  {
    name: "Mentor Name",
    role: "Program Mentor — Reporting",
    experience: "Placeholder experience summary",
    specialization: "Reconciliation, operational MIS",
    initials: "MN",
  },
];

export const industryDomains = [
  "Investment Banking",
  "Asset Management",
  "Capital Markets",
  "Financial Services",
  "FinTech",
  "Global Operations",
];

export const testimonials = [
  {
    quote:
      "Placeholder testimonial copy describing how the structured modules made the trade lifecycle easy to follow.",
    name: "Participant Name",
    role: "Placeholder background",
    initials: "PN",
  },
  {
    quote:
      "Placeholder testimonial copy about the practical assignments and the operational detail covered in each case.",
    name: "Participant Name",
    role: "Placeholder background",
    initials: "PN",
  },
  {
    quote:
      "Placeholder testimonial copy about mentor feedback and how the reconciliation exercises built confidence.",
    name: "Participant Name",
    role: "Placeholder background",
    initials: "PN",
  },
];

export const programDetails = [
  { label: "Duration", value: "6 Months" },
  { label: "Mode", value: "Online" },
  { label: "Audience", value: "Students, graduates & working professionals" },
  { label: "Format", value: "Structured learning + practical exercises + case studies" },
  { label: "Pricing", value: "Coming Soon" },
  { label: "Application", value: "Apply Now" },
];

export const faqs = [
  {
    q: "Who is this program for?",
    a: "Students, fresh graduates, career switchers and working professionals who want to build practical knowledge of investment banking operations.",
  },
  {
    q: "Do I need prior investment banking experience?",
    a: "No. The program starts with financial markets fundamentals before moving into operational workflows, so beginners can follow along.",
  },
  {
    q: "Is the program completely online?",
    a: "Yes. All learning, assignments and mentor support are delivered online.",
  },
  { q: "How long is the program?", a: "Six months, organised into eight structured modules." },
  {
    q: "What will I learn?",
    a: "Financial markets, investment banking fundamentals, trade lifecycle, KYC and AML, settlements, reconciliation, corporate actions, risk and compliance, and operational reporting.",
  },
  {
    q: "Are practical projects included?",
    a: "Yes. Each module includes a practical exercise, and the program includes case studies modelled on real operational situations.",
  },
  {
    q: "What career paths can this prepare me for?",
    a: "It can prepare you to explore operations-focused roles such as trade operations, settlements, reconciliation, KYC and AML, corporate actions and middle office analyst positions. The program does not guarantee employment.",
  },
  {
    q: "How do I apply?",
    a: `Use the Apply Now form on this page, or email ${company.email} with your background and interest.`,
  },
];

export const navLinks = [
  { label: "Program", href: "#program" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Play", href: "#break-hunter" },
  { label: "Outcomes", href: "#outcomes" },
  { label: "FAQ", href: "#faq" },
];
