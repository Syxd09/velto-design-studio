import heroLiving from "@/assets/hero-living.jpg";
import projectPenthouse from "@/assets/project-penthouse.jpg";
import projectBedroom from "@/assets/project-bedroom.jpg";
import projectCafe from "@/assets/project-cafe.jpg";
import projectOffice from "@/assets/project-office.jpg";
import boardConcept from "@/assets/board-concept.jpg";
import boardKitchen from "@/assets/board-kitchen.jpg";
import materialsFlatlay from "@/assets/materials-flatlay.jpg";

export const images = {
  heroLiving,
  projectPenthouse,
  projectBedroom,
  projectCafe,
  projectOffice,
  boardConcept,
  boardKitchen,
  materialsFlatlay,
};

export function formatINR(value: number, compact = false) {
  if (compact) {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type ProjectStatus = "concept" | "in-review" | "approved" | "delivered";

export interface Board {
  id: string;
  title: string;
  subtitle: string;
  status: "draft" | "in-review" | "approved";
  updated: string;
  image: string;
  palette: string[];
  items: string[];
}

export interface MaterialSpec {
  name: string;
  category: string;
  finish: string;
  room: string;
  supplier: string;
  color: string;
}

export interface QuoteItem {
  id: string;
  label: string;
  detail: string;
  amount: number;
  include: boolean;
}

export interface BoqRow {
  name: string;
  spec: string;
  qty: number;
  unit: string;
  rate: number;
}

export interface BoqGroup {
  room: string;
  rows: BoqRow[];
}

export interface Milestone {
  name: string;
  date: string;
  status: "done" | "active" | "upcoming";
}

export interface ActivityEntry {
  who: string;
  what: string;
  when: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  type: "Residential" | "Hospitality" | "Workplace";
  location: string;
  cover: string;
  status: ProjectStatus;
  progress: number;
  value: number;
  due: string;
  area: string;
  team: string[];
  palette: string[];
  brief: string;
  boards: Board[];
  materials: MaterialSpec[];
  quote: QuoteItem[];
  boq: BoqGroup[];
  timeline: Milestone[];
  activity: ActivityEntry[];
}

export const statusLabel: Record<ProjectStatus, string> = {
  concept: "Concept",
  "in-review": "In review",
  approved: "Approved",
  delivered: "Delivered",
};

const sharedTimeline = (stage: number): Milestone[] =>
  [
    { name: "Brief & site study", date: "12 Mar 2026", status: "done" },
    { name: "Concept direction", date: "02 Apr 2026", status: "done" },
    { name: "Material palette", date: "18 Apr 2026", status: "active" },
    { name: "3D visualization", date: "06 May 2026", status: "upcoming" },
    { name: "Client review", date: "20 May 2026", status: "upcoming" },
    { name: "Procurement", date: "01 Jun 2026", status: "upcoming" },
    { name: "Installation & handover", date: "15 Jul 2026", status: "upcoming" },
  ].map((m, i) => ({
    ...m,
    status: i < stage ? "done" : i === stage ? "active" : "upcoming",
  }));

export const projects: Project[] = [
  {
    id: "malabar-hill-penthouse",
    name: "Malabar Hill Penthouse",
    client: "Aisha Kapoor",
    type: "Residential",
    location: "Mumbai",
    cover: projectPenthouse,
    status: "in-review",
    progress: 68,
    value: 4996120,
    due: "20 May 2026",
    area: "4,200 sq ft",
    team: ["AR", "NK", "JD"],
    palette: ["#E8DCC8", "#C96F4A", "#7A8B6F", "#B08D4F", "#3F352C"],
    brief:
      "A warm-modernist penthouse for a family of four, layered in limewash, travertine and aged brass. The brief asks for quiet luxury — saturated earth tones against deep walnut millwork, with a living room that opens fully to the city skyline at dusk.",
    boards: [
      {
        id: "b1",
        title: "Concept — Warm Modernism",
        subtitle: "Mood, tone & spatial feeling",
        status: "approved",
        updated: "Updated 2 days ago",
        image: boardConcept,
        palette: ["#C96F4A", "#7A8B6F", "#EFE9DC", "#B08D4F", "#3F352C"],
        items: [
          "Limewash walls in warm sand",
          "Aged brass, patinated not polished",
          "Olive & cypress greenery as softener",
          "Curved silhouettes over hard lines",
          "Layered textiles — bouclé, linen, jute",
        ],
      },
      {
        id: "b2",
        title: "Living Room Material Study",
        subtitle: "Surfacing & upholstery pairings",
        status: "in-review",
        updated: "Updated this morning",
        image: materialsFlatlay,
        palette: ["#B0755C", "#D9CBB4", "#7A8B6F", "#B08D4F", "#5C4A3D"],
        items: [
          "Travertine coffee table, vein-cut",
          "Sage velvet lounge chair",
          "Terracotta bouclé scatter cushions",
          "Walnut veneer media wall",
          "Hand-knotted jute & wool rug",
        ],
      },
      {
        id: "b3",
        title: "Kitchen — Fluted Oak & Brass",
        subtitle: "Cabinetry, counters & tile",
        status: "draft",
        updated: "Updated 5 days ago",
        image: boardKitchen,
        palette: ["#D9CBB4", "#C89F6E", "#EFE9DC", "#B08D4F", "#8A6F52"],
        items: [
          "Fluted white-oak cabinetry",
          "Cream quartzite waterfall island",
          "Zellige backsplash in warm sand",
          "Unlacquered brass tapware",
          "Open shelving with studio ceramics",
        ],
      },
    ],
    materials: [
      { name: "Limewash plaster", category: "Paint", finish: "Matte", room: "All walls", supplier: "Clay & Lime Co.", color: "#E8DCC8" },
      { name: "Fluted white oak", category: "Wood", finish: "Oiled", room: "Millwork", supplier: "Bengal Veneers", color: "#C89F6E" },
      { name: "Travertine — vein cut", category: "Stone", finish: "Honed", room: "Living room", supplier: "Stone Atlas", color: "#D9CBB4" },
      { name: "Terracotta terrazzo", category: "Tile", finish: "Sealed", room: "Kitchen floor", supplier: "Gera Tileworks", color: "#C96F4A" },
      { name: "Sage velvet", category: "Fabric", finish: "92,000 rubs", room: "Lounge chairs", supplier: "House of Textile", color: "#7A8B6F" },
      { name: "Ivory bouclé", category: "Fabric", finish: "55,000 rubs", room: "Sofa", supplier: "House of Textile", color: "#EFE9DC" },
      { name: "Brushed brass", category: "Metal", finish: "Brushed", room: "Hardware & taps", supplier: "Artisan Metals", color: "#B08D4F" },
      { name: "Walnut veneer", category: "Wood", finish: "Satin lacquer", room: "Media wall", supplier: "Bengal Veneers", color: "#5C4A3D" },
    ],
    quote: [
      { id: "q1", label: "Design & concept development", detail: "Schematic to detailed design", amount: 350000, include: true },
      { id: "q2", label: "3D visualization & revisions", detail: "Two rounds of revisions", amount: 180000, include: true },
      { id: "q3", label: "Furniture — living & dining", detail: "Sofa, chairs, tables, rug", amount: 820000, include: true },
      { id: "q4", label: "Millwork — kitchen & wardrobes", detail: "Fluted oak, soft-close, accessories", amount: 1240000, include: true },
      { id: "q5", label: "Stone & surfacing", detail: "Travertine, quartzite, terrazzo", amount: 460000, include: true },
      { id: "q6", label: "Lighting design & fixtures", detail: "Decoratives, cove, task", amount: 390000, include: true },
      { id: "q7", label: "Soft furnishings & styling", detail: "Curtains, cushions, accessories", amount: 210000, include: true },
      { id: "q8", label: "Art & accessories", detail: "Curation and placement", amount: 150000, include: true },
      { id: "q9", label: "Site management & installation", detail: "End-to-end supervision", amount: 280000, include: true },
      { id: "q10", label: "Contingency", detail: "5% against variations", amount: 204000, include: true },
    ],
    boq: [
      {
        room: "Living & Dining",
        rows: [
          { name: "Curved bouclé sofa", spec: "3-seat, ivory", qty: 1, unit: "pcs", rate: 420000 },
          { name: "Sage velvet lounge chair", spec: "Swivel base", qty: 2, unit: "pcs", rate: 96000 },
          { name: "Travertine coffee table", spec: "Ø 1100 mm", qty: 1, unit: "pcs", rate: 165000 },
          { name: "Hand-knotted rug", spec: "Jute-wool, 300×400", qty: 1, unit: "pcs", rate: 110000 },
          { name: "Linen curtains", spec: "Sheer + blackout", qty: 320, unit: "sq ft", rate: 350 },
          { name: "Limewash — walls", spec: "Warm sand", qty: 900, unit: "sq ft", rate: 95 },
        ],
      },
      {
        room: "Kitchen",
        rows: [
          { name: "Fluted oak millwork", spec: "Base + tall units", qty: 280, unit: "sq ft", rate: 2450 },
          { name: "Quartzite island counter", spec: "Waterfall edges", qty: 120, unit: "sq ft", rate: 3800 },
          { name: "Zellige backsplash", spec: "Warm sand gloss", qty: 90, unit: "sq ft", rate: 1250 },
          { name: "Brass tapware set", spec: "Unlacquered", qty: 1, unit: "lot", rate: 145000 },
        ],
      },
      {
        room: "Master Suite",
        rows: [
          { name: "Walk-in wardrobe", spec: "Walnut, glass fronts", qty: 210, unit: "sq ft", rate: 2200 },
          { name: "Upholstered bed", spec: "King, arch headboard", qty: 1, unit: "pcs", rate: 240000 },
          { name: "Oak bedside tables", spec: "2-drawer", qty: 2, unit: "pcs", rate: 48000 },
          { name: "Rattan pendant", spec: "Ø 600 mm", qty: 1, unit: "pcs", rate: 32000 },
        ],
      },
      {
        room: "Balcony & Outdoor",
        rows: [
          { name: "Ipe decking", spec: "Reversible strips", qty: 180, unit: "sq ft", rate: 480 },
          { name: "Terracotta planters", spec: "Set of three", qty: 1, unit: "set", rate: 22000 },
          { name: "Teak bench", spec: "Slatted back", qty: 1, unit: "pcs", rate: 64000 },
        ],
      },
    ],
    timeline: sharedTimeline(2),
    activity: [
      { who: "Aisha Kapoor", what: "approved the Warm Modernism concept board", when: "2 days ago" },
      { who: "Nikhil (3D)", what: "started visualization renders for the living room", when: "Yesterday" },
      { who: "Studio Velto", what: "shared the revised quotation — v3", when: "3 days ago" },
      { who: "Jaya (Procurement)", what: "requested travertine samples from Stone Atlas", when: "4 days ago" },
    ],
  },
  {
    id: "indiranagar-villa",
    name: "Indiranagar Villa",
    client: "Rohan & Meera Iyer",
    type: "Residential",
    location: "Bengaluru",
    cover: projectBedroom,
    status: "approved",
    progress: 82,
    value: 3850000,
    due: "12 Jun 2026",
    area: "3,400 sq ft",
    team: ["AR", "PS"],
    palette: ["#EADFCB", "#B98A5E", "#94A187", "#4A4238", "#F4EEE2"],
    brief:
      "A calm, sunlit family villa in warm neutrals — rattan, oak and clay, designed around the courtyard tree. Procurement is underway with installation scheduled for early summer.",
    boards: [
      {
        id: "b1",
        title: "Serene Morning Palette",
        subtitle: "Bedrooms & courtyard",
        status: "approved",
        updated: "Updated 1 week ago",
        image: projectBedroom,
        palette: ["#EADFCB", "#B98A5E", "#F4EEE2", "#94A187", "#4A4238"],
        items: [
          "Limewash in warm sand tone",
          "Linen bedding in cream & clay",
          "Arched upholstered headboards",
          "Rattan pendant cluster",
          "Oak nightstands, rope-woven bench",
        ],
      },
      {
        id: "b2",
        title: "Courtyard Material Board",
        subtitle: "Outdoor surfacing",
        status: "approved",
        updated: "Updated 2 weeks ago",
        image: boardConcept,
        palette: ["#C4A484", "#8B9B7A", "#EFE7D6", "#6E5B44", "#D9C7A9"],
        items: [
          "Kota stone in honed grey-green",
          "Terracotta jaali screens",
          "Weathered teak seating",
          "Native planting — frangipani, ferns",
        ],
      },
    ],
    materials: [
      { name: "Limewash — warm sand", category: "Paint", finish: "Matte", room: "Bedrooms", supplier: "Clay & Lime Co.", color: "#EADFCB" },
      { name: "White oak flooring", category: "Wood", finish: "Oiled", room: "All rooms", supplier: "Bengal Veneers", color: "#C9A878" },
      { name: "Natural rattan", category: "Wood", finish: "Raw", room: "Pendants & benches", supplier: "Cane Craft", color: "#D2B48C" },
      { name: "Clay linen", category: "Fabric", finish: "Washed", room: "Bedding", supplier: "House of Textile", color: "#C98B6B" },
      { name: "Kota stone", category: "Stone", finish: "Honed", room: "Courtyard", supplier: "Stone Atlas", color: "#A8A896" },
    ],
    quote: [
      { id: "q1", label: "Design & execution drawings", detail: "Full working drawing set", amount: 320000, include: true },
      { id: "q2", label: "Furniture & upholstery", detail: "Bedrooms, living, courtyard", amount: 940000, include: true },
      { id: "q3", label: "Millwork & wardrobes", detail: "Oak, glass fronts", amount: 1180000, include: true },
      { id: "q4", label: "Stone & outdoor surfacing", detail: "Kota, terracotta jaali", amount: 380000, include: true },
      { id: "q5", label: "Lighting & decoratives", detail: "Rattan pendants, wall lights", amount: 260000, include: true },
      { id: "q6", label: "Site management", detail: "Weekly supervision", amount: 190000, include: true },
      { id: "q7", label: "Contingency", detail: "5% against variations", amount: 163500, include: true },
    ],
    boq: [
      {
        room: "Master Bedroom",
        rows: [
          { name: "Upholstered arch bed", spec: "King, linen", qty: 1, unit: "pcs", rate: 220000 },
          { name: "Oak nightstands", spec: "Rope detail", qty: 2, unit: "pcs", rate: 44000 },
          { name: "Rattan pendant", spec: "Ø 600 mm", qty: 1, unit: "pcs", rate: 28000 },
        ],
      },
      {
        room: "Courtyard",
        rows: [
          { name: "Kota stone paving", spec: "Honed, grey-green", qty: 420, unit: "sq ft", rate: 260 },
          { name: "Terracotta jaali screen", spec: "Custom moulds", qty: 96, unit: "sq ft", rate: 720 },
          { name: "Weathered teak bench", spec: "2.2 m", qty: 1, unit: "pcs", rate: 88000 },
        ],
      },
      {
        room: "Living Room",
        rows: [
          { name: "Modular linen sofa", spec: "4-seat, cream", qty: 1, unit: "pcs", rate: 310000 },
          { name: "Oak media console", spec: "2.4 m, fluted", qty: 1, unit: "pcs", rate: 132000 },
        ],
      },
    ],
    timeline: sharedTimeline(4),
    activity: [
      { who: "Meera Iyer", what: "signed off on the final BOQ", when: "1 week ago" },
      { who: "Prateek (Site)", what: "confirmed Kota stone delivery for 18 Apr", when: "5 days ago" },
      { who: "Studio Velto", what: "raised the stage-3 invoice", when: "2 weeks ago" },
    ],
  },
  {
    id: "verandah-cafe",
    name: "Verandah Café",
    client: "Devansh Roy",
    type: "Hospitality",
    location: "Kolkata",
    cover: projectCafe,
    status: "in-review",
    progress: 54,
    value: 2620000,
    due: "28 May 2026",
    area: "1,850 sq ft",
    team: ["AR", "NK"],
    palette: ["#C96F4A", "#8F9E7C", "#E9DDC8", "#B08D4F", "#4E4638"],
    brief:
      "An all-day neighbourhood café in a heritage building — curved terracotta bar, sage banquettes and brass warmth, with the original teak windows left intact.",
    boards: [
      {
        id: "b1",
        title: "Terracotta Bar & Brass",
        subtitle: "Service counter concept",
        status: "in-review",
        updated: "Updated yesterday",
        image: projectCafe,
        palette: ["#C96F4A", "#B08D4F", "#E9DDC8", "#8F9E7C", "#4E4638"],
        items: [
          "Curved terracotta plaster bar",
          "Brass counter edge & footrail",
          "Fluted teak back bar",
          "Milk-glass pendant trio",
        ],
      },
      {
        id: "b2",
        title: "Banquette & Terrazzo",
        subtitle: "Seating & floor study",
        status: "draft",
        updated: "Updated 6 days ago",
        image: materialsFlatlay,
        palette: ["#8F9E7C", "#D8C9B0", "#C96F4A", "#4E4638", "#EFE9DC"],
        items: [
          "Sage leather banquette",
          "Cream terrazzo floor",
          "Bentwood café chairs",
          "Marble bistro tables",
        ],
      },
    ],
    materials: [
      { name: "Terracotta plaster", category: "Paint", finish: "Troweled", room: "Bar front", supplier: "Clay & Lime Co.", color: "#C96F4A" },
      { name: "Cream terrazzo", category: "Tile", finish: "Ground", room: "Flooring", supplier: "Gera Tileworks", color: "#D8C9B0" },
      { name: "Sage leather", category: "Fabric", finish: "Aniline", room: "Banquette", supplier: "House of Textile", color: "#8F9E7C" },
      { name: "Aged brass sheet", category: "Metal", finish: "Patina", room: "Counter edge", supplier: "Artisan Metals", color: "#B08D4F" },
      { name: "Fluted teak", category: "Wood", finish: "Sealed", room: "Back bar", supplier: "Bengal Veneers", color: "#A97B4F" },
    ],
    quote: [
      { id: "q1", label: "Design & 3D visualization", detail: "Concept to renders", amount: 260000, include: true },
      { id: "q2", label: "Bar counter & back bar", detail: "Terracotta, teak, brass", amount: 720000, include: true },
      { id: "q3", label: "Seating & tables", detail: "Banquette, bentwood, marble", amount: 540000, include: true },
      { id: "q4", label: "Flooring", detail: "Terrazzo, supply & laying", amount: 410000, include: true },
      { id: "q5", label: "Lighting scheme", detail: "Pendants, wall & cove", amount: 230000, include: true },
      { id: "q6", label: "Site execution", detail: "Civil, MEP coordination", amount: 310000, include: true },
      { id: "q7", label: "Contingency", detail: "5% against variations", amount: 123500, include: true },
    ],
    boq: [
      {
        room: "Service Bar",
        rows: [
          { name: "Curved bar counter", spec: "Terracotta plaster, brass edge", qty: 1, unit: "lot", rate: 480000 },
          { name: "Fluted teak back bar", spec: "4.8 m run", qty: 48, unit: "sq ft", rate: 2400 },
          { name: "Espresso station counters", spec: "Stainless inset", qty: 1, unit: "lot", rate: 96000 },
        ],
      },
      {
        room: "Seating Hall",
        rows: [
          { name: "Sage leather banquette", spec: "Window run, 9 m", qty: 1, unit: "lot", rate: 310000 },
          { name: "Bentwood chairs", spec: "Thonet-style", qty: 14, unit: "pcs", rate: 14500 },
          { name: "Marble bistro tables", spec: "Ø 700 mm", qty: 8, unit: "pcs", rate: 28000 },
          { name: "Cream terrazzo floor", spec: "Ground & sealed", qty: 1450, unit: "sq ft", rate: 240 },
        ],
      },
    ],
    timeline: sharedTimeline(2),
    activity: [
      { who: "Devansh Roy", what: "requested a lighter tone for the bar plaster", when: "Yesterday" },
      { who: "Nikhil (3D)", what: "re-rendered the bar with warm brass footrail", when: "2 days ago" },
      { who: "Studio Velto", what: "logged the heritage-window survey", when: "1 week ago" },
    ],
  },
  {
    id: "prestige-lounge",
    name: "Prestige Tech Park Lounge",
    client: "Kavya Nair · Prestige Offices",
    type: "Workplace",
    location: "Bengaluru",
    cover: projectOffice,
    status: "concept",
    progress: 24,
    value: 3180000,
    due: "30 Jun 2026",
    area: "2,600 sq ft",
    team: ["AR", "JD"],
    palette: ["#E6DCC9", "#C89F6E", "#7A8B6F", "#4E4638", "#F1EBDE"],
    brief:
      "A reception and client-lounge for a design-forward tech campus — fluted oak desk, micro-cement walls and soft sage seating, built to feel residential rather than corporate.",
    boards: [
      {
        id: "b1",
        title: "Reception — First Impression",
        subtitle: "Desk, wall & lighting",
        status: "draft",
        updated: "Updated 3 days ago",
        image: projectOffice,
        palette: ["#E6DCC9", "#C89F6E", "#7A8B6F", "#4E4638", "#F1EBDE"],
        items: [
          "Fluted oak reception desk",
          "Cream micro-cement walls",
          "Sculptural paper pendants",
          "Travertine lounge tables",
        ],
      },
    ],
    materials: [
      { name: "Micro-cement", category: "Paint", finish: "Smooth", room: "Walls", supplier: "Clay & Lime Co.", color: "#E6DCC9" },
      { name: "Fluted oak", category: "Wood", finish: "Oiled", room: "Reception desk", supplier: "Bengal Veneers", color: "#C89F6E" },
      { name: "Sage wool bouclé", category: "Fabric", finish: "100,000 rubs", room: "Lounge chairs", supplier: "House of Textile", color: "#7A8B6F" },
      { name: "Travertine — cross cut", category: "Stone", finish: "Honed", room: "Tables & floor", supplier: "Stone Atlas", color: "#DCCFB8" },
    ],
    quote: [
      { id: "q1", label: "Design & visualization", detail: "Concept to client renders", amount: 240000, include: true },
      { id: "q2", label: "Reception desk", detail: "Fluted oak, stone top", amount: 620000, include: true },
      { id: "q3", label: "Lounge furniture", detail: "Seating, tables, rug", amount: 780000, include: true },
      { id: "q4", label: "Wall & floor finishes", detail: "Micro-cement, travertine", amount: 690000, include: true },
      { id: "q5", label: "Lighting & planting", detail: "Pendants, olive trees", amount: 410000, include: true },
      { id: "q6", label: "Contingency", detail: "5% against variations", amount: 137000, include: true },
    ],
    boq: [
      {
        room: "Reception",
        rows: [
          { name: "Fluted oak desk", spec: "5.4 m, stone top", qty: 1, unit: "lot", rate: 620000 },
          { name: "Micro-cement walls", spec: "Smooth trowel", qty: 1150, unit: "sq ft", rate: 210 },
        ],
      },
      {
        room: "Client Lounge",
        rows: [
          { name: "Sage bouclé armchairs", spec: "Pair", qty: 2, unit: "pcs", rate: 98000 },
          { name: "Travertine coffee table", spec: "Ø 900 mm", qty: 1, unit: "pcs", rate: 128000 },
          { name: "Olive tree planters", spec: "2.4 m specimen", qty: 2, unit: "pcs", rate: 46000 },
        ],
      },
    ],
    timeline: sharedTimeline(1),
    activity: [
      { who: "Kavya Nair", what: "shared the campus brand guidelines", when: "3 days ago" },
      { who: "Studio Velto", what: "opened the concept exploration board", when: "1 week ago" },
    ],
  },
  {
    id: "alipore-residence",
    name: "Alipore Residence",
    client: "S. Dutta",
    type: "Residential",
    location: "Kolkata",
    cover: heroLiving,
    status: "delivered",
    progress: 100,
    value: 5240000,
    due: "Handed over",
    area: "5,100 sq ft",
    team: ["AR", "NK", "PS"],
    palette: ["#EFE6D4", "#B4693F", "#8C9A7E", "#B08D4F", "#3E342A"],
    brief:
      "A completed five-bedroom family home in warm terracotta and olive — our most-photographed project to date, now part of the studio portfolio.",
    boards: [
      {
        id: "b1",
        title: "Sunlit Formal Living",
        subtitle: "As-built board",
        status: "approved",
        updated: "Archived",
        image: heroLiving,
        palette: ["#EFE6D4", "#B4693F", "#8C9A7E", "#B08D4F", "#3E342A"],
        items: [
          "Bouclé curve sofa & clay velvet chair",
          "Travertine drum tables",
          "Olive & cypress planting",
          "Arched window sheer linen",
        ],
      },
    ],
    materials: [
      { name: "Limewash — ivory", category: "Paint", finish: "Matte", room: "Living", supplier: "Clay & Lime Co.", color: "#EFE6D4" },
      { name: "Clay velvet", category: "Fabric", finish: "80,000 rubs", room: "Accent chair", supplier: "House of Textile", color: "#B4693F" },
      { name: "Olive wool throw", category: "Fabric", finish: "Handloom", room: "Styling", supplier: "House of Textile", color: "#8C9A7E" },
      { name: "Herringbone oak", category: "Wood", finish: "Oiled", room: "Flooring", supplier: "Bengal Veneers", color: "#B99163" },
    ],
    quote: [
      { id: "q1", label: "Design & execution", detail: "Full scope", amount: 540000, include: true },
      { id: "q2", label: "Furniture & styling", detail: "All rooms", amount: 1680000, include: true },
      { id: "q3", label: "Millwork", detail: "Wardrobes, doors, pantry", amount: 1620000, include: true },
      { id: "q4", label: "Stone & flooring", detail: "Herringbone, marble", amount: 780000, include: true },
      { id: "q5", label: "Site & handover", detail: "Snagging & styling", amount: 310000, include: true },
      { id: "q6", label: "Contingency", detail: "5% against variations", amount: 246500, include: true },
    ],
    boq: [
      {
        room: "Formal Living",
        rows: [
          { name: "Curved bouclé sofa", spec: "3.2 m, ivory", qty: 1, unit: "pcs", rate: 460000 },
          { name: "Clay velvet armchair", spec: "Barrel back", qty: 2, unit: "pcs", rate: 92000 },
          { name: "Travertine drum table", spec: "Ø 1000 mm", qty: 1, unit: "pcs", rate: 148000 },
        ],
      },
      {
        room: "Whole House",
        rows: [
          { name: "Herringbone oak floor", spec: "Oiled, 240 sqm", qty: 2580, unit: "sq ft", rate: 380 },
          { name: "Limewash walls", spec: "Ivory", qty: 4200, unit: "sq ft", rate: 85 },
        ],
      },
    ],
    timeline: sharedTimeline(7),
    activity: [
      { who: "Studio Velto", what: "completed handover & styling walk-through", when: "3 weeks ago" },
      { who: "S. Dutta", what: "shared a 5★ review and referral", when: "2 weeks ago" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Materials library                                                   */
/* ------------------------------------------------------------------ */

export interface LibraryMaterial {
  id: string;
  name: string;
  category: "Stone" | "Wood" | "Fabric" | "Metal" | "Tile" | "Paint" | "Weave";
  supplier: string;
  price: number;
  unit: string;
  color: string;
  finish: string;
  popular?: boolean;
}

export const materialCategories = [
  "All",
  "Stone",
  "Wood",
  "Fabric",
  "Metal",
  "Tile",
  "Paint",
  "Weave",
] as const;

export const libraryMaterials: LibraryMaterial[] = [
  { id: "m1", name: "Travertine — vein cut", category: "Stone", supplier: "Stone Atlas", price: 380, unit: "sq ft", color: "#D9CBB4", finish: "Honed", popular: true },
  { id: "m2", name: "Travertine — cross cut", category: "Stone", supplier: "Stone Atlas", price: 340, unit: "sq ft", color: "#DCCFB8", finish: "Honed" },
  { id: "m3", name: "Emerald marble", category: "Stone", supplier: "Stone Atlas", price: 720, unit: "sq ft", color: "#2E4638", finish: "Polished", popular: true },
  { id: "m4", name: "Kota stone — grey-green", category: "Stone", supplier: "Stone Atlas", price: 260, unit: "sq ft", color: "#A8A896", finish: "Honed" },
  { id: "m5", name: "Fluted white oak", category: "Wood", supplier: "Bengal Veneers", price: 2450, unit: "sq ft", color: "#C89F6E", finish: "Oiled", popular: true },
  { id: "m6", name: "Walnut veneer", category: "Wood", supplier: "Bengal Veneers", price: 1180, unit: "sq ft", color: "#5C4A3D", finish: "Satin lacquer" },
  { id: "m7", name: "Natural rattan cane", category: "Weave", supplier: "Cane Craft", price: 640, unit: "sq ft", color: "#D2B48C", finish: "Raw", popular: true },
  { id: "m8", name: "Jute-wool braid", category: "Weave", supplier: "Cane Craft", price: 320, unit: "sq ft", color: "#B49B6F", finish: "Handloom" },
  { id: "m9", name: "Sage velvet", category: "Fabric", supplier: "House of Textile", price: 890, unit: "metre", color: "#7A8B6F", finish: "92,000 rubs", popular: true },
  { id: "m10", name: "Ivory bouclé", category: "Fabric", supplier: "House of Textile", price: 1150, unit: "metre", color: "#EFE9DC", finish: "55,000 rubs", popular: true },
  { id: "m11", name: "Clay linen", category: "Fabric", supplier: "House of Textile", price: 540, unit: "metre", color: "#C98B6B", finish: "Washed" },
  { id: "m12", name: "Sage aniline leather", category: "Fabric", supplier: "House of Textile", price: 2400, unit: "metre", color: "#8F9E7C", finish: "Aniline" },
  { id: "m13", name: "Brushed brass", category: "Metal", supplier: "Artisan Metals", price: 980, unit: "sq ft", color: "#B08D4F", finish: "Brushed", popular: true },
  { id: "m14", name: "Aged brass — patina", category: "Metal", supplier: "Artisan Metals", price: 1120, unit: "sq ft", color: "#8F7440", finish: "Patina" },
  { id: "m15", name: "Blackened steel", category: "Metal", supplier: "Artisan Metals", price: 760, unit: "sq ft", color: "#33312C", finish: "Waxed" },
  { id: "m16", name: "Terracotta terrazzo", category: "Tile", supplier: "Gera Tileworks", price: 460, unit: "sq ft", color: "#C96F4A", finish: "Sealed", popular: true },
  { id: "m17", name: "Zellige — warm sand", category: "Tile", supplier: "Gera Tileworks", price: 1250, unit: "sq ft", color: "#E3D3B3", finish: "Gloss" },
  { id: "m18", name: "Cream terrazzo", category: "Tile", supplier: "Gera Tileworks", price: 420, unit: "sq ft", color: "#D8C9B0", finish: "Ground" },
  { id: "m19", name: "Limewash — warm sand", category: "Paint", supplier: "Clay & Lime Co.", price: 95, unit: "sq ft", color: "#E8DCC8", finish: "Matte", popular: true },
  { id: "m20", name: "Limewash — ivory", category: "Paint", supplier: "Clay & Lime Co.", price: 85, unit: "sq ft", color: "#EFE6D4", finish: "Matte" },
  { id: "m21", name: "Micro-cement — cream", category: "Paint", supplier: "Clay & Lime Co.", price: 210, unit: "sq ft", color: "#E6DCC9", finish: "Smooth" },
  { id: "m22", name: "Terracotta plaster", category: "Paint", supplier: "Clay & Lime Co.", price: 240, unit: "sq ft", color: "#C96F4A", finish: "Troweled" },
];

/* ------------------------------------------------------------------ */
/* Clients                                                             */
/* ------------------------------------------------------------------ */

export interface Client {
  id: string;
  name: string;
  company: string;
  initials: string;
  city: string;
  projects: number;
  lifetimeValue: number;
  lastProposal: string;
  status: "active" | "negotiating" | "past";
  since: string;
}

export const clients: Client[] = [
  { id: "c1", name: "Aisha Kapoor", company: "Private client", initials: "AK", city: "Mumbai", projects: 2, lifetimeValue: 8420000, lastProposal: "Sent 3 days ago", status: "active", since: "2025" },
  { id: "c2", name: "Rohan & Meera Iyer", company: "Private client", initials: "RI", city: "Bengaluru", projects: 1, lifetimeValue: 3850000, lastProposal: "Approved · v4", status: "active", since: "2024" },
  { id: "c3", name: "Devansh Roy", company: "Verandah Hospitality", initials: "DR", city: "Kolkata", projects: 1, lifetimeValue: 2620000, lastProposal: "Sent yesterday", status: "negotiating", since: "2026" },
  { id: "c4", name: "Kavya Nair", company: "Prestige Offices", initials: "KN", city: "Bengaluru", projects: 1, lifetimeValue: 3180000, lastProposal: "Draft ready", status: "negotiating", since: "2026" },
  { id: "c5", name: "S. Dutta", company: "Private client", initials: "SD", city: "Kolkata", projects: 1, lifetimeValue: 5240000, lastProposal: "Completed", status: "past", since: "2023" },
];

export const studio = {
  name: "Atelier Rölé",
  member: "Aarav Rölé",
  initials: "AR",
  role: "Principal Designer",
};

export function projectById(id: string) {
  return projects.find((p) => p.id === id);
}
