import {
  BadgeCheck,
  BookCheck,
  ClipboardCheck,
  Compass,
  FileSearch,
  HardHat,
  KeyRound,
  Landmark,
  ListChecks,
  Scale,
  ScanSearch,
  Shield,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  number: string;
  title: string;
  summary: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    number: "01",
    title: "Clerk of Works Services",
    summary:
      "Independent oversight and inspections to help ensure workmanship, materials and construction activities meet the required project standards.",
    icon: ClipboardCheck,
  },
  {
    number: "02",
    title: "Site Audits & Build Quality Inspections",
    summary:
      "Detailed site reviews, identification of quality concerns, and practical recommendations to reduce defects and improve construction outcomes.",
    icon: ScanSearch,
  },
  {
    number: "03",
    title: "Quality Assurance & Quality Control",
    summary:
      "Strategic and operational QA guidance, inspection planning, monitoring, and continuous improvement of project quality processes.",
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "CDM & Regulatory Compliance Guidance",
    summary:
      "Support for project teams in understanding and managing relevant construction compliance responsibilities, including UK Building Regulations and applicable standards.",
    icon: Landmark,
  },
  {
    number: "05",
    title: "NEC Supervisor Services",
    summary:
      "Independent inspection and supervision support for projects operating under relevant NEC contract arrangements.",
    icon: FileSearch,
  },
  {
    number: "06",
    title: "Inspection & Test Plans (ITPs)",
    summary:
      "Development support, implementation, monitoring and oversight of project-specific inspection and test plans.",
    icon: ListChecks,
  },
  {
    number: "07",
    title: "Warranty Provider Inspections",
    summary:
      "Inspection support and advice relating to warranty requirements and construction quality expectations.",
    icon: BadgeCheck,
  },
  {
    number: "08",
    title: "Dispute Investigations & Resolution Support",
    summary:
      "Independent technical reviews, quality investigations and practical guidance to support the resolution of construction disputes.",
    icon: Scale,
  },
  {
    number: "09",
    title: "Handover, Defects & Closeout",
    summary:
      "Practical support with snagging, outstanding quality issues, handover inspections and project closeout processes.",
    icon: KeyRound,
  },
  {
    number: "10",
    title: "Construction Management Advisory",
    summary:
      "Expert input on construction practice, project-specific quality procedures and site management processes.",
    icon: HardHat,
  },
];

export const roles = [
  "Head of Quality Assurance",
  "Quality Control Manager",
  "Senior Clerk of Works",
  "Senior Site Management",
];

export const experienceCategories = [
  "Grade II-listed heritage refurbishments",
  "High-end refurbishment projects",
  "High-rise cut-and-carve schemes",
  "Complex mixed-use developments",
  "Major commercial construction projects",
];

export const experienceImages = [
  {
    src: "/images/commercial.jpg",
    alt: "Low-angle view of dark glass commercial towers against a pale sky",
    caption: "Commercial scale",
  },
  {
    src: "/images/structure.jpg",
    alt: "High-rise structures under construction, with tower cranes between the frames",
    caption: "Structures in progress",
  },
  {
    src: "/images/craft.jpg",
    alt: "Corner of a dark brick building with a metal fascia and large windows",
    caption: "Facade craftsmanship",
  },
  {
    src: "/images/residential.jpg",
    alt: "White residential façade with a repeating rhythm of glass balconies",
    caption: "High-end residential fabric",
  },
  {
    src: "/images/facade.jpg",
    alt: "Angular contemporary building with a glazed wall and metal cladding",
    caption: "Contemporary architecture",
  },
];

export const benefits: { title: string; summary: string; icon: LucideIcon }[] = [
  {
    title: "Reduce Defects",
    summary:
      "Detect workmanship and quality concerns before they become expensive problems.",
    icon: ScanSearch,
  },
  {
    title: "Improve Compliance",
    summary:
      "Support project teams in meeting applicable technical, regulatory and contractual requirements.",
    icon: BookCheck,
  },
  {
    title: "Protect Project Value",
    summary:
      "Improve oversight and help reduce avoidable rework, programme disruption and quality-related costs.",
    icon: Shield,
  },
  {
    title: "Build Confidence",
    summary:
      "Provide clear independent observations and practical guidance throughout delivery.",
    icon: Compass,
  },
];

export const steps = [
  {
    number: "01",
    title: "Understand",
    summary: "Review the project, scope, requirements, risks and quality expectations.",
  },
  {
    number: "02",
    title: "Inspect",
    summary: "Carry out relevant site inspections, audits, reviews and quality assessments.",
  },
  {
    number: "03",
    title: "Advise",
    summary: "Provide clear, actionable findings and practical recommendations.",
  },
  {
    number: "04",
    title: "Support",
    summary:
      "Assist project teams in addressing quality issues, monitoring progress and working towards effective closeout.",
  },
];

export const technologies = [
  "Procore",
  "Viewpoint For Projects",
  "Field View",
  "Conject",
  "Autodesk Navisworks",
  "Autodesk Revit",
  "Tekla",
];

export const audiences = [
  "Property Developers",
  "Main Contractors",
  "Client-Side Project Teams",
  "Construction Project Managers",
  "Commercial Development Teams",
  "Design and Construction Professionals",
];

export const faqs = [
  {
    question: "What does an independent construction QA consultant do?",
    answer:
      "An independent quality assurance consultant inspects workmanship, materials and site processes against the standards set for the project, then reports clear observations and practical recommendations. The role supports the project team. It does not replace the contractor’s duty to build the works correctly, and it is not a statutory approval or sign-off function.",
  },
  {
    question: "Can you provide Clerk of Works services?",
    answer:
      "Yes. Clerk of Works services are part of the consultancy: independent oversight and inspections focused on workmanship, materials and whether construction activities meet the required project standards.",
  },
  {
    question: "Do you support projects outside London?",
    answer:
      "Yes. Tommy is based in London and the consultancy is available for projects across the United Kingdom.",
  },
  {
    question: "Can you help with construction defects and disputes?",
    answer:
      "Yes. Tommy can carry out independent technical reviews and quality investigations, and can provide practical guidance to support the resolution of construction disputes. This is construction advisory work, not legal representation.",
  },
  {
    question: "Do you provide support during project handover?",
    answer:
      "Yes. Support is available for snagging, outstanding quality issues, handover inspections and project closeout.",
  },
  {
    question: "Can you assist with Inspection and Test Plans?",
    answer:
      "Yes. Tommy can support the preparation, implementation, monitoring and oversight of project-specific inspection and test plans.",
  },
];
