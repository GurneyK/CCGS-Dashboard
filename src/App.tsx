import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Archive,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  BookImage,
  BookOpenCheck,
  Bot,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  ClipboardCheck,
  Clock3,
  Database,
  Download,
  FileArchive,
  FileChartColumn,
  FileImage,
  FileSearch,
  FileText,
  Filter,
  Gauge,
  HelpCircle,
  History,
  Home,
  Image,
  Layers3,
  LayoutPanelTop,
  LineChart,
  LockKeyhole,
  Menu,
  MessageSquare,
  MoreHorizontal,
  Paperclip,
  RefreshCw,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  UserRound,
} from "lucide-react";

type PageId = "command" | "agent" | "resources" | "deck" | "history" | "notifications" | "validation" | "profile" | "settings";
type Tone = "brand" | "success" | "warning" | "info" | "neutral" | "error";

const navItems = [
  { id: "command", icon: Home, label: "Command Center", meta: "Live workspace" },
  { id: "agent", icon: Bot, label: "Deck Agent", meta: "Interactive build" },
  { id: "resources", icon: FileArchive, label: "Resource Library", meta: "Text, images, files" },
  { id: "deck", icon: LayoutPanelTop, label: "Deck Builder", meta: "Slides and sections" },
  { id: "history", icon: History, label: "Historical CCGS", meta: "Continuity library" },
  { id: "notifications", icon: Bell, label: "Notifications", meta: "Tasks and alerts" },
  { id: "validation", icon: ClipboardCheck, label: "Validation Queue", meta: "Business review" },
  { id: "profile", icon: UserRound, label: "My Profile", meta: "Role and activity" },
  { id: "settings", icon: Settings, label: "Settings", meta: "Owners and access" },
] satisfies Array<{ id: PageId; icon: typeof Home; label: string; meta: string }>;

const sources = [
  { name: "Meltwater", type: "Qual / Quant", owner: "CMI", access: "Static export", status: "Mapped", coverage: "Social trends" },
  { name: "H&A Studies", type: "Quant", owner: "CMI", access: "Sample shared", status: "Review", coverage: "Consumer motivations" },
  { name: "Euromonitor", type: "Quant", owner: "CMI", access: "Manual file", status: "Mapped", coverage: "Category sizing" },
  { name: "NielsenIQ", type: "Quant", owner: "CMI", access: "BDL API", status: "Connected", coverage: "EPOS and customer data" },
  { name: "Kantar", type: "Quant", owner: "CMI", access: "Static export", status: "Mapped", coverage: "Shopper panel KPIs" },
  { name: "Historical CCGS", type: "Internal", owner: "CSP", access: "Document library", status: "Connected", coverage: "Prior CVDs" },
];

const signals = [
  {
    label: "Premium segment growth",
    value: "+12%",
    source: "Euromonitor",
    note: "Premium deodorants are outpacing category growth.",
    tone: "success",
  },
  {
    label: "Fragrance conversations",
    value: "+20%",
    source: "Meltwater",
    note: "Fragrance-led language is rising in social discussion.",
    tone: "brand",
  },
  {
    label: "Target penetration",
    value: "45%",
    source: "Kantar",
    note: "Headroom remains with target consumer segments.",
    tone: "info",
  },
  {
    label: "Addressable opportunity",
    value: "GBP 150M",
    source: "HC model",
    note: "Sizing uses the trade in, trade up, trade across frame.",
    tone: "warning",
  },
] satisfies Array<{ label: string; value: string; source: string; note: string; tone: Tone }>;

const sizing = [
  { label: "Trade up", value: "GBP 86M", percent: 57 },
  { label: "Trade across", value: "GBP 41M", percent: 27 },
  { label: "Trade in", value: "GBP 23M", percent: 16 },
];

const questions = [
  {
    id: "01",
    question: "Step-by-step walkthrough of the current category growth narrative process",
    response: "Overlay B&W trade-up logic and test for triple-win delivery.",
    status: "Logic required",
  },
  {
    id: "03",
    question: "Where are the data sets housed and can sample data be shared?",
    response: "Mostly CMI. Sample data can be shared.",
    status: "Ready",
  },
  {
    id: "04",
    question: "What does good look like for the UK PoC?",
    response: "Dynamically generate localized CCGS inputs and prioritize opportunities at market level.",
    status: "Benchmark",
  },
  {
    id: "05",
    question: "Which sources have API access versus manual exports?",
    response: "Nielsen available in BDL. Remaining data sources come from static files.",
    status: "Access split",
  },
  {
    id: "09",
    question: "Can third-party data be ingested and stored in an AI system?",
    response: "Assessment needed with data owners, procurement, legal, and compliance.",
    status: "Owner needed",
  },
];

const resourceCards = [
  {
    id: "TXT-014",
    title: "Fragrance-led premiumisation headline",
    type: "Text block",
    icon: FileText,
    owner: "Agent draft",
    status: "Ready",
    tone: "success",
    page: "Executive summary",
    details: "Headline, strategic implication, and three evidence bullets for leadership readout.",
  },
  {
    id: "CHT-021",
    title: "Trade-up opportunity waterfall",
    type: "Chart spec",
    icon: FileChartColumn,
    owner: "Analytics",
    status: "Needs validation",
    tone: "warning",
    page: "Opportunity sizing",
    details: "GBP 150M opportunity split into trade up, trade across, and trade in movements.",
  },
  {
    id: "IMG-008",
    title: "Premium fragrance shelf visual",
    type: "Image brief",
    icon: FileImage,
    owner: "Creative",
    status: "Queued",
    tone: "brand",
    page: "Growth narrative",
    details: "Retail shelf composition showing premium fragrance-led deodorant propositions.",
  },
  {
    id: "ATT-032",
    title: "Historical UK CCGS benchmark",
    type: "Attachment",
    icon: Paperclip,
    owner: "CSP",
    status: "Attached",
    tone: "success",
    page: "Appendix",
    details: "Prior year deck used as benchmark for structure, tone, and CVD continuity.",
  },
  {
    id: "SRC-117",
    title: "Meltwater fragrance conversation extract",
    type: "Source extract",
    icon: Database,
    owner: "CMI",
    status: "Mapped",
    tone: "brand",
    page: "Evidence base",
    details: "Social trend summary supporting the +20% increase in fragrance conversation.",
  },
  {
    id: "IMG-012",
    title: "Consumer routine image set",
    type: "Image pack",
    icon: Image,
    owner: "Brand",
    status: "Review",
    tone: "info",
    page: "Consumer context",
    details: "Three approved lifestyle images for morning routine and long-lasting freshness cues.",
  },
] satisfies Array<{
  id: string;
  title: string;
  type: string;
  icon: typeof FileText;
  owner: string;
  status: string;
  tone: Tone;
  page: string;
  details: string;
}>;

const notifications = [
  {
    id: "note-001",
    title: "Opportunity sizing owner requested",
    detail: "Finance needs to confirm the HC model reuse before the market sizing slide is locked.",
    time: "5 min ago",
    tone: "warning",
    owner: "Finance",
    unread: true,
  },
  {
    id: "note-002",
    title: "Nielsen BDL source connected",
    detail: "Customer-level EPOS data is available for UK Deodorants and ready for the agent run.",
    time: "18 min ago",
    tone: "success",
    owner: "CMI",
    unread: true,
  },
  {
    id: "note-003",
    title: "Image brief queued",
    detail: "Premium fragrance shelf visual is waiting for brand-approved product imagery.",
    time: "31 min ago",
    tone: "brand",
    owner: "Creative",
    unread: true,
  },
  {
    id: "note-004",
    title: "Legal review still open",
    detail: "Third-party data ingestion requires procurement and legal assessment.",
    time: "1 hr ago",
    tone: "warning",
    owner: "Legal",
    unread: false,
  },
  {
    id: "note-005",
    title: "Historical CCGS pattern matched",
    detail: "The agent found three prior-year patterns that can be reused for continuity in the new deck.",
    time: "2 hrs ago",
    tone: "info",
    owner: "Agent",
    unread: true,
  },
  {
    id: "note-006",
    title: "Profile permission updated",
    detail: "Alex Kumar can now approve narrative drafts and request source-owner reviews.",
    time: "Yesterday",
    tone: "neutral",
    owner: "Workspace admin",
    unread: false,
  },
] satisfies Array<{ id: string; title: string; detail: string; time: string; tone: Tone; owner: string; unread: boolean }>;

const deckSlides = [
  { number: "01", title: "Category growth thesis", status: "Draft ready", resources: 4, owner: "Agent" },
  { number: "02", title: "Market performance snapshot", status: "Evidence linked", resources: 5, owner: "CMI" },
  { number: "03", title: "Signal synthesis map", status: "Draft ready", resources: 6, owner: "Agent" },
  { number: "04", title: "CVD recommendation", status: "Draft ready", resources: 3, owner: "Strategy" },
  { number: "05", title: "Opportunity sizing", status: "Needs validation", resources: 4, owner: "Finance" },
  { number: "06", title: "Retail action plan", status: "In progress", resources: 2, owner: "Sales" },
  { number: "07", title: "Source attribution", status: "Evidence linked", resources: 9, owner: "Agent" },
  { number: "08", title: "Appendix and Q&A", status: "In progress", resources: 7, owner: "CSP" },
];

const historicalCategories = [
  {
    category: "Deodorants",
    question: "What are the biggest growth opportunities in UK Deodorants?",
    status: "Draft awaiting review",
    statusTone: "warning",
    confidence: "86%",
    confidenceLabel: "High confidence",
    growth: "+4.8%",
    opportunitySize: "GBP 265M",
    sourcesRead: "9 of 11 sources",
    reviewOwner: "Finance + CMI",
    summary:
      "Fragrance, format, and efficacy signals point to a premiumisation story with enough source support for a business review draft.",
    sources: [
      { name: "NielsenIQ", status: "Connected", tone: "success", detail: "EPOS, customer, and pack-size movement" },
      { name: "Meltwater", status: "Mapped", tone: "brand", detail: "Fragrance and freshness conversation shifts" },
      { name: "Euromonitor", status: "Static file", tone: "neutral", detail: "Category and premium segment growth" },
      { name: "Historical CCGS", status: "Connected", tone: "success", detail: "2024-2025 CVD and narrative patterns" },
    ],
    drafts: [
      { section: "Growth thesis", status: "Draft awaiting review", tone: "warning", confidence: "88%" },
      { section: "Opportunity sizing", status: "Finance check needed", tone: "warning", confidence: "74%" },
      { section: "Source attribution", status: "Evidence linked", tone: "success", confidence: "91%" },
    ],
    opportunities: [
      {
        id: "deo-fragrance-premium",
        title: "Fragrance-led premiumisation is reshaping UK Deodorants",
        route: "Trade up",
        status: "Draft awaiting review",
        statusTone: "warning",
        confidence: "88%",
        confidenceLabel: "High confidence",
        confidenceTone: "success",
        sizing: "GBP 150M",
        growth: "+12%",
        penetration: "45%",
        cvd: "Freshness confidence",
        insight:
          "Premium deodorants are growing faster than the base category while social conversation and innovation activity concentrate around fragrance experiences.",
        evidence: [
          "Premium segment growth is materially ahead of total deodorants.",
          "Fragrance-related social conversation is up across recent listening extracts.",
          "Historical CCGS outputs show self-care language recurring in the category.",
        ],
        recommendation:
          "Anchor the deck around a fragrance-led trade-up narrative, then pair it with efficacy proof so premium claims still feel credible.",
        draftSection: "Slides 01-03",
        reviewOwner: "Alex Kumar",
        nextStep: "Business lead to approve the headline before Finance signs off sizing.",
        sourcesUsed: ["Euromonitor", "Meltwater", "Kantar", "Historical CCGS"],
        historicalReuse: "2025 grooming rituals and 2024 efficacy claims",
      },
      {
        id: "deo-value-multipack",
        title: "Value multipack trade-in can defend everyday affordability",
        route: "Trade in",
        status: "Needs source-owner review",
        statusTone: "info",
        confidence: "62%",
        confidenceLabel: "Medium confidence",
        confidenceTone: "info",
        sizing: "GBP 60M",
        growth: "+6%",
        penetration: "58%",
        cvd: "Everyday affordability",
        insight:
          "Multipack and larger-format shoppers show value pressure, but the agent needs stronger customer-level proof before this becomes a lead recommendation.",
        evidence: [
          "NielsenIQ points to pack-size movement among larger households.",
          "Kantar panel notes value seeking in repeat purchase missions.",
          "Prior-year CCGS warns that price framing should not dilute efficacy claims.",
        ],
        recommendation:
          "Position multipacks as a defensive growth platform while separating it from the premium fragrance story.",
        draftSection: "Slide 05",
        reviewOwner: "CMI source owner",
        nextStep: "Confirm customer-level EPOS view and rerun sizing confidence.",
        sourcesUsed: ["NielsenIQ", "Kantar", "Historical CCGS"],
        historicalReuse: "2024 long-lasting protection benchmark",
      },
      {
        id: "deo-sensitive-care",
        title: "Sensitive freshness opens a credible care-led flank",
        route: "Trade across",
        status: "Draft ready",
        statusTone: "success",
        confidence: "79%",
        confidenceLabel: "Good confidence",
        confidenceTone: "success",
        sizing: "GBP 55M",
        growth: "+8%",
        penetration: "31%",
        cvd: "Skin comfort and confidence",
        insight:
          "Sensitive-skin reassurance is a smaller but coherent opportunity when paired with freshness language and dermatologist-style proof points.",
        evidence: [
          "Sensitive claims are gaining search and social visibility.",
          "Skin Cleansing historical outputs show fragrance-free trust patterns.",
          "Consumer need states connect comfort with confidence in daily use.",
        ],
        recommendation:
          "Use this as a secondary growth platform for consumers who reject strong fragrance but still want freshness performance.",
        draftSection: "Slide 06",
        reviewOwner: "Brand + CMI",
        nextStep: "Add one approved product or shelf visual before deck export.",
        sourcesUsed: ["Meltwater", "H&A Studies", "Skin Cleansing CCGS"],
        historicalReuse: "2024 sensitive skin claims pattern",
      },
    ],
  },
  {
    category: "Skin Cleansing",
    question: "Where should Skin Cleansing play for routine-led category growth?",
    status: "Evidence synthesis active",
    statusTone: "brand",
    confidence: "81%",
    confidenceLabel: "High confidence",
    growth: "+5.6%",
    opportunitySize: "GBP 210M",
    sourcesRead: "8 of 10 sources",
    reviewOwner: "CMI + Brand",
    summary:
      "Routine building, barrier care, and value refill signals create a clear way to frame Skin Cleansing as a higher-frequency system.",
    sources: [
      { name: "H&A Studies", status: "Mapped", tone: "brand", detail: "Need states and occasion motivations" },
      { name: "Kantar", status: "Mapped", tone: "brand", detail: "Basket and trip behavior" },
      { name: "Meltwater", status: "Static file", tone: "neutral", detail: "Barrier care and sensitivity themes" },
      { name: "Historical CCGS", status: "Connected", tone: "success", detail: "Routine ladder examples" },
    ],
    drafts: [
      { section: "Routine opportunity map", status: "Draft ready", tone: "success", confidence: "84%" },
      { section: "Barrier care CVD", status: "CMI review open", tone: "warning", confidence: "78%" },
      { section: "Image brief", status: "Creative queued", tone: "brand", confidence: "69%" },
    ],
    opportunities: [
      {
        id: "skin-routine-bundles",
        title: "Routine bundles can expand baskets beyond single cleanse missions",
        route: "Trade across",
        status: "Draft ready",
        statusTone: "success",
        confidence: "84%",
        confidenceLabel: "High confidence",
        confidenceTone: "success",
        sizing: "GBP 95M",
        growth: "+10%",
        penetration: "39%",
        cvd: "Routine building",
        insight:
          "Consumers are linking cleansing to prep, treatment, and finishing steps, giving the category permission to move from product replacement to routine design.",
        evidence: [
          "Kantar basket analysis shows higher attach rates when routine language is present.",
          "Historical Skin Cleansing CCGS used a routine ladder that remains relevant.",
          "H&A studies connect self-care occasions with multi-step usage.",
        ],
        recommendation:
          "Show a routine ladder and identify the highest-value attach points for body wash, exfoliation, and fragrance-led finishing.",
        draftSection: "Slides 02-04",
        reviewOwner: "Brand strategy",
        nextStep: "Approve the routine ladder labels and attach relevant product examples.",
        sourcesUsed: ["Kantar", "H&A Studies", "Historical CCGS"],
        historicalReuse: "2025 multi-step routines pattern",
      },
      {
        id: "skin-barrier-care",
        title: "Barrier-care cleansing can premiumise sensitive skin claims",
        route: "Trade up",
        status: "CMI review open",
        statusTone: "warning",
        confidence: "78%",
        confidenceLabel: "Good confidence",
        confidenceTone: "success",
        sizing: "GBP 80M",
        growth: "+9%",
        penetration: "34%",
        cvd: "Skin barrier reassurance",
        insight:
          "The opportunity is to make sensitive skin care feel proactive and premium, not just a compromise for people avoiding fragrance.",
        evidence: [
          "Meltwater extracts show barrier language becoming more mainstream.",
          "H&A need states connect comfort, confidence, and visible skin health.",
          "Prior-year sensitive skin outputs reduce risk in the CVD framing.",
        ],
        recommendation:
          "Draft the CVD around barrier reassurance with a supporting proof hierarchy for claims, credentials, and usage occasions.",
        draftSection: "Slide 05",
        reviewOwner: "CMI",
        nextStep: "CMI to validate the barrier-care wording against source language.",
        sourcesUsed: ["Meltwater", "H&A Studies", "Historical CCGS"],
        historicalReuse: "2024 fragrance-free sensitive skin pattern",
      },
      {
        id: "skin-refill-value",
        title: "Refill and larger formats can protect value without flattening brand equity",
        route: "Trade in",
        status: "Sizing pending",
        statusTone: "warning",
        confidence: "65%",
        confidenceLabel: "Medium confidence",
        confidenceTone: "info",
        sizing: "GBP 35M",
        growth: "+4%",
        penetration: "52%",
        cvd: "Value with less waste",
        insight:
          "Refill and larger-format propositions can answer value pressure while also linking to sustainability cues already present in adjacent categories.",
        evidence: [
          "Pack-size movement suggests shoppers are open to value-led formats.",
          "Oral Care historical outputs show packaging credentials moving mainstream.",
          "The agent still needs a stronger read on margin and channel mix.",
        ],
        recommendation:
          "Keep as a supporting opportunity until Finance confirms whether the format economics justify a deck recommendation.",
        draftSection: "Appendix",
        reviewOwner: "Finance",
        nextStep: "Add margin guardrail and retail-channel assumptions.",
        sourcesUsed: ["Kantar", "Euromonitor", "Oral Care CCGS"],
        historicalReuse: "2024 sustainable packaging pattern",
      },
    ],
  },
  {
    category: "Oral Care",
    question: "Which Oral Care growth spaces can balance efficacy, premium, and access?",
    status: "Draft awaiting review",
    statusTone: "warning",
    confidence: "83%",
    confidenceLabel: "High confidence",
    growth: "+4.2%",
    opportunitySize: "GBP 240M",
    sourcesRead: "7 of 9 sources",
    reviewOwner: "Business lead + CMI",
    summary:
      "Whitening, gum health, and family access give the agent three distinct growth routes with clear CVD and deck implications.",
    sources: [
      { name: "Euromonitor", status: "Mapped", tone: "brand", detail: "Premium and therapeutic segment sizing" },
      { name: "NielsenIQ", status: "Connected", tone: "success", detail: "Retail sales and pack architecture" },
      { name: "Mintel", status: "Static file", tone: "neutral", detail: "Claims and innovation themes" },
      { name: "Historical CCGS", status: "Connected", tone: "success", detail: "Whitening and packaging continuity" },
    ],
    drafts: [
      { section: "Premium efficacy story", status: "Draft awaiting review", tone: "warning", confidence: "87%" },
      { section: "Gum health proof", status: "Evidence linked", tone: "success", confidence: "82%" },
      { section: "Family value sizing", status: "Owner needed", tone: "warning", confidence: "64%" },
    ],
    opportunities: [
      {
        id: "oral-visible-whitening",
        title: "Visible whitening remains the easiest premium entry point",
        route: "Trade up",
        status: "Draft awaiting review",
        statusTone: "warning",
        confidence: "87%",
        confidenceLabel: "High confidence",
        confidenceTone: "success",
        sizing: "GBP 120M",
        growth: "+11%",
        penetration: "42%",
        cvd: "Visible efficacy",
        insight:
          "Whitening continues to translate premium value quickly because shoppers understand the benefit and can connect it to visible outcomes.",
        evidence: [
          "Historical Oral Care CCGS identifies whitening as the default premium entry.",
          "Euromonitor premium segment read supports the trade-up direction.",
          "NielsenIQ pack movement shows continued interest in premium benefit tiers.",
        ],
        recommendation:
          "Lead with visible efficacy, then support with proof points that make premium claims feel measurable and easy to compare.",
        draftSection: "Slides 01-03",
        reviewOwner: "Business lead",
        nextStep: "Review headline and choose whether whitening or gum health leads the deck.",
        sourcesUsed: ["Euromonitor", "NielsenIQ", "Historical CCGS"],
        historicalReuse: "2025 whitening entry-point pattern",
      },
      {
        id: "oral-gum-health",
        title: "Gum health can move therapeutic care into everyday prevention",
        route: "Trade across",
        status: "Evidence linked",
        statusTone: "success",
        confidence: "82%",
        confidenceLabel: "High confidence",
        confidenceTone: "success",
        sizing: "GBP 75M",
        growth: "+8%",
        penetration: "29%",
        cvd: "Preventive confidence",
        insight:
          "There is room to make gum health more routine and less problem-led by connecting prevention to daily confidence and whole-mouth health.",
        evidence: [
          "Mintel claims review highlights prevention and gum-health language.",
          "H&A motivations show consumers respond to confidence and reassurance.",
          "Prior-year efficacy framing provides a credible proof structure.",
        ],
        recommendation:
          "Position gum health as a daily prevention platform and use claims hierarchy to avoid sounding too clinical.",
        draftSection: "Slide 04",
        reviewOwner: "CMI",
        nextStep: "Add clinical claim guardrails and confirm approved language.",
        sourcesUsed: ["Mintel", "H&A Studies", "Historical CCGS"],
        historicalReuse: "2024 efficacy proof hierarchy",
      },
      {
        id: "oral-family-access",
        title: "Family value packs can widen access while preserving expert trust",
        route: "Trade in",
        status: "Owner needed",
        statusTone: "warning",
        confidence: "64%",
        confidenceLabel: "Medium confidence",
        confidenceTone: "info",
        sizing: "GBP 45M",
        growth: "+5%",
        penetration: "61%",
        cvd: "Family confidence",
        insight:
          "Family-oriented formats can answer affordability pressure, but the recommendation needs customer-level validation before it is more than a watch item.",
        evidence: [
          "NielsenIQ suggests continued demand for family and larger formats.",
          "Value pressure appears in shopper panel commentary.",
          "The agent still needs pack economics and retailer prioritization.",
        ],
        recommendation:
          "Keep as a watch-list growth route until the source owner confirms retailer and margin assumptions.",
        draftSection: "Appendix",
        reviewOwner: "Commercial owner",
        nextStep: "Assign a commercial owner and add pack economics.",
        sourcesUsed: ["NielsenIQ", "Kantar", "Finance model"],
        historicalReuse: "2024 sustainable value pattern",
      },
    ],
  },
];

function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: Tone | string }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function IconButton({ icon: Icon, label, onClick }: { icon: typeof Search; label: string; onClick?: () => void }) {
  return (
    <button className="icon-button" aria-label={label} onClick={onClick} type="button" title={label}>
      <Icon size={18} aria-hidden="true" />
    </button>
  );
}

function Panel({
  actions,
  children,
  description,
  title,
  className = "",
}: {
  actions?: React.ReactNode;
  children: React.ReactNode;
  description?: string;
  title?: string;
  className?: string;
}) {
  return (
    <section className={`panel ${className}`}>
      {(title || description || actions) && (
        <div className="panel-header">
          <div>
            {title && <h2>{title}</h2>}
            {description && <p>{description}</p>}
          </div>
          {actions && <div className="panel-actions">{actions}</div>}
        </div>
      )}
      <div className="panel-body">{children}</div>
    </section>
  );
}

function Step({ label, state }: { label: string; state: "done" | "active" | "queued" }) {
  return (
    <div className={`workflow-step ${state}`}>
      <span>{state === "done" ? <Check size={14} /> : <CircleDot size={14} />}</span>
      <strong>{label}</strong>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, meta }: { icon: typeof Home; label: string; value: string; meta: string }) {
  return (
    <div className="metric-card">
      <Icon size={18} aria-hidden="true" />
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{meta}</small>
    </div>
  );
}

function SourceTable() {
  return (
    <div className="table-shell">
      <table>
        <thead>
          <tr>
            <th>Source</th>
            <th>Type</th>
            <th>Owner</th>
            <th>Access</th>
            <th>Status</th>
            <th>Coverage</th>
          </tr>
        </thead>
        <tbody>
          {sources.map((source) => (
            <tr key={source.name}>
              <td>
                <strong>{source.name}</strong>
              </td>
              <td>{source.type}</td>
              <td>{source.owner}</td>
              <td>{source.access}</td>
              <td>
                <Badge
                  tone={source.status === "Connected" ? "success" : source.status === "Review" ? "warning" : "brand"}
                >
                  {source.status}
                </Badge>
              </td>
              <td>{source.coverage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function WorkflowStrip() {
  return (
    <section className="workflow-strip" aria-label="Workflow status">
      <Step label="Intake" state="done" />
      <Step label="Source review" state="done" />
      <Step label="Signal synthesis" state="active" />
      <Step label="CVD fit" state="active" />
      <Step label="Deck resources" state="active" />
      <Step label="Business validation" state="queued" />
    </section>
  );
}

function CommandCenterPage({ setActivePage }: { setActivePage: (page: PageId) => void }) {
  return (
    <>
      <section className="hero-band">
        <div className="hero-copy">
          <Badge tone="brand">Agent run active</Badge>
          <h1>CCGS command center</h1>
          <p>Review connected sources, validate evidence, and shape a slide-ready growth narrative for category teams.</p>
        </div>
        <div className="hero-actions">
          <button className="button secondary" type="button">
            <Filter size={16} aria-hidden="true" />
            Filters
          </button>
          <button className="button secondary" type="button">
            <RefreshCw size={16} aria-hidden="true" />
            Refresh
          </button>
          <button className="button primary" onClick={() => setActivePage("agent")} type="button">
            <Bot size={16} aria-hidden="true" />
            Work with agent
          </button>
        </div>
      </section>

      <section className="metric-grid" aria-label="Workspace metrics">
        <MetricCard icon={Database} label="Sources connected" value="9" meta="6 mapped, 3 in review" />
        <MetricCard icon={Layers3} label="Signals linked" value="18" meta="4 high-confidence themes" />
        <MetricCard icon={FileArchive} label="Deck resources" value="24" meta="17 ready, 7 in review" />
        <MetricCard icon={BarChart3} label="Opportunity sizing" value="GBP 150M" meta="Market-level model" />
      </section>

      <WorkflowStrip />

      <div className="main-grid">
        <div className="primary-column">
          <Panel title="Agent brief" description="Business question and run configuration" actions={<Badge tone="success">Ready for synthesis</Badge>}>
            <div className="brief-grid">
              <div className="question-card">
                <label>Business question</label>
                <p>What are the biggest growth opportunities in UK Deodorants?</p>
              </div>
              <div className="brief-controls">
                {["United Kingdom", "Deodorants", "Slide-ready narrative"].map((item, index) => (
                  <div key={item}>
                    <label>{index === 0 ? "Market" : index === 1 ? "Category" : "Output format"}</label>
                    <button className="select-button" type="button">
                      {item}
                      <ChevronDown size={16} aria-hidden="true" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Panel>

          <Panel
            title="Deck resource progress"
            description="Agent-generated ingredients for the working presentation"
            actions={
              <button className="button secondary compact" onClick={() => setActivePage("resources")} type="button">
                <ArrowUpRight size={15} aria-hidden="true" />
                Open library
              </button>
            }
          >
            <div className="resource-progress-grid">
              <div>
                <FileText size={18} aria-hidden="true" />
                <strong>9 text blocks</strong>
                <span>Headlines, bullets, implications</span>
              </div>
              <div>
                <FileChartColumn size={18} aria-hidden="true" />
                <strong>5 charts</strong>
                <span>Sizing, source coverage, CVD fit</span>
              </div>
              <div>
                <FileImage size={18} aria-hidden="true" />
                <strong>4 image briefs</strong>
                <span>Shelf, product, consumer routine</span>
              </div>
              <div>
                <Paperclip size={18} aria-hidden="true" />
                <strong>6 attachments</strong>
                <span>PDF, spreadsheet, source extracts</span>
              </div>
            </div>
          </Panel>

          <Panel
            title="Source readiness"
            description="Ownership, access route, and category coverage"
            actions={
              <button className="button secondary compact" type="button">
                <Download size={15} aria-hidden="true" />
                Export
              </button>
            }
          >
            <SourceTable />
          </Panel>

          <Panel title="Signal synthesis" description="Signals connected across source systems">
            <SignalSynthesis />
          </Panel>

          <div className="split-grid">
            <OpportunitySizingPanel />
            <CvdPanel />
          </div>

          <NarrativePanel setActivePage={setActivePage} />
          <ValidationPanel compact />
        </div>

        <InsightRail setActivePage={setActivePage} />
      </div>
    </>
  );
}

function SignalSynthesis() {
  return (
    <>
      <div className="signal-grid">
        {signals.map((signal) => (
          <article className={`signal-card ${signal.tone}`} key={signal.label}>
            <div>
              <span>{signal.label}</span>
              <strong>{signal.value}</strong>
            </div>
            <p>{signal.note}</p>
            <Badge tone={signal.tone}>{signal.source}</Badge>
          </article>
        ))}
      </div>
      <div className="connection-map">
        <div>
          <Database size={18} aria-hidden="true" />
          Source evidence
        </div>
        <span />
        <div>
          <LineChart size={18} aria-hidden="true" />
          Connected pattern
        </div>
        <span />
        <div>
          <Sparkles size={18} aria-hidden="true" />
          Growth opportunity
        </div>
      </div>
    </>
  );
}

function OpportunitySizingPanel() {
  return (
    <Panel title="Opportunity sizing" description="Market sizing by customer economic movement">
      <div className="sizing-summary">
        <div>
          <span>Total modeled opportunity</span>
          <strong>GBP 150M</strong>
        </div>
        <Badge tone="info">HC model to validate</Badge>
      </div>
      <div className="bar-list">
        {sizing.map((item) => (
          <div className="bar-row" key={item.label}>
            <div>
              <strong>{item.label}</strong>
              <span>{item.value}</span>
            </div>
            <div className="bar-track">
              <span style={{ width: `${item.percent}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function CvdPanel() {
  return (
    <Panel title="Recommended CVD" description="Category Value Driver fit">
      <div className="cvd-card">
        <div className="cvd-score">
          <strong>87%</strong>
          <span>confidence</span>
        </div>
        <div>
          <Badge tone="brand">Freshness / Premium Fragrance Experience</Badge>
          <h3>Fragrance-led premiumisation is emerging as a key UK deodorants opportunity.</h3>
        </div>
      </div>
      <ul className="check-list">
        <li>
          <CheckCircle2 size={16} />
          Shopper demand increasing
        </li>
        <li>
          <CheckCircle2 size={16} />
          Social buzz increasing
        </li>
        <li>
          <CheckCircle2 size={16} />
          Innovation activity increasing
        </li>
      </ul>
    </Panel>
  );
}

function NarrativePanel({ setActivePage }: { setActivePage: (page: PageId) => void }) {
  return (
    <Panel
      title="Narrative draft"
      description="Slide-ready headlines, bullets, source attribution, and strategic implication"
      actions={
        <button className="button primary compact" onClick={() => setActivePage("deck")} type="button">
          <ArrowUpRight size={15} aria-hidden="true" />
          Open deck
        </button>
      }
    >
      <article className="narrative-card">
        <Badge tone="brand">Draft narrative</Badge>
        <h2>Fragrance-led premiumisation is reshaping UK Deodorants</h2>
        <div className="narrative-columns">
          <div>
            <h3>Evidence</h3>
            <ul>
              <li>Premium deodorants are growing faster than the category.</li>
              <li>Social conversations around fragrance continue to rise.</li>
              <li>Innovation activity is concentrated around premium fragrance propositions.</li>
            </ul>
          </div>
          <div>
            <h3>Strategic implication</h3>
            <p>Retailers can unlock growth by expanding premium fragrance-led offerings and supporting trade-up behaviour.</p>
          </div>
        </div>
        <div className="citation-row">
          <Badge tone="neutral">Euromonitor</Badge>
          <Badge tone="neutral">Meltwater</Badge>
          <Badge tone="neutral">Kantar</Badge>
          <Badge tone="neutral">Historical CCGS</Badge>
        </div>
      </article>
    </Panel>
  );
}

function ValidationPanel({ compact = false }: { compact?: boolean }) {
  const rows = compact ? questions.slice(0, 5) : questions;

  return (
    <Panel title="Business validation queue" description="Open questions and captured responses from the working output">
      <div className="qa-list">
        {rows.map((item) => (
          <article className="qa-row" key={item.id}>
            <span>{item.id}</span>
            <div>
              <strong>{item.question}</strong>
              <p>{item.response}</p>
            </div>
            <Badge tone={item.status === "Owner needed" ? "warning" : item.status === "Ready" ? "success" : "brand"}>
              {item.status}
            </Badge>
          </article>
        ))}
      </div>
    </Panel>
  );
}

function InsightRail({ setActivePage }: { setActivePage: (page: PageId) => void }) {
  return (
    <aside className="insight-rail">
      <Panel title="Output checklist" description="Required fields for each topic">
        <ul className="check-list stacked">
          {["Insight", "Supporting data points", "Recommended CVD", "Source attribution", "Opportunity sizing", "Draft narrative", "Strategic implication"].map((item) => (
            <li key={item}>
              <CheckCircle2 size={16} />
              {item}
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Source preview" description="Attached business context">
        <div className="document-preview">
          <img src={`${import.meta.env.BASE_URL}assets/ccgs-1.png`} alt="CCGS business context PDF preview" />
          <div>
            <FileSearch size={18} aria-hidden="true" />
            <span>CCGS.pdf</span>
            <Badge tone="success">4 pages</Badge>
          </div>
        </div>
      </Panel>

      <Panel title="Readiness notes" description="PoC criteria and unresolved gates">
        <div className="note-stack">
          <div className="note-card success">
            <CheckCircle2 size={18} aria-hidden="true" />
            <p>Dynamically generate localized CCGS inputs for UK categories.</p>
          </div>
          <div className="note-card warning">
            <AlertTriangle size={18} aria-hidden="true" />
            <p>Validate real opportunity sizing methodology and ownership.</p>
          </div>
          <div className="note-card neutral">
            <LockKeyhole size={18} aria-hidden="true" />
            <p>Confirm legal approval for third-party source ingestion.</p>
          </div>
        </div>
      </Panel>

      <Panel
        title="Activity"
        actions={
          <button className="text-button" onClick={() => setActivePage("notifications")} type="button">
            View all
          </button>
        }
      >
        <ActivityList />
      </Panel>
    </aside>
  );
}

function ActivityList() {
  return (
    <div className="activity-list">
      <div>
        <Archive size={16} aria-hidden="true" />
        <span>Nielsen BDL source connected</span>
        <small>8 min ago</small>
      </div>
      <div>
        <MessageSquare size={16} aria-hidden="true" />
        <span>CMI added sample data note</span>
        <small>21 min ago</small>
      </div>
      <div>
        <UserRound size={16} aria-hidden="true" />
        <span>Legal review owner requested</span>
        <small>1 hr ago</small>
      </div>
    </div>
  );
}

function AgentPage({ setActivePage }: { setActivePage: (page: PageId) => void }) {
  return (
    <>
      <section className="page-heading">
        <div>
          <Badge tone="brand">Deck analyst agent</Badge>
          <h1>Build the CCGS deck resources</h1>
          <p>Agent workspace for gathering the text, charts, images, source extracts, and attachments used in the final deck.</p>
        </div>
        <div className="hero-actions">
          <button className="button secondary" onClick={() => setActivePage("resources")} type="button">
            <FileArchive size={16} aria-hidden="true" />
            Resource library
          </button>
          <button className="button primary" onClick={() => setActivePage("deck")} type="button">
            <LayoutPanelTop size={16} aria-hidden="true" />
            Deck outline
          </button>
        </div>
      </section>

      <div className="agent-layout">
        <Panel title="Agent conversation" description="Working session for the UK Deodorants CCGS deck" className="chat-panel">
          <div className="chat-thread">
            <div className="chat-message user">
              <span className="avatar">AK</span>
              <div>
                <strong>Alex Kumar</strong>
                <p>Build the UK Deodorants CCGS deck. I need the story, evidence, images, and attachments ready for business review.</p>
              </div>
            </div>
            <div className="chat-message agent">
              <span className="agent-avatar">
                <Bot size={17} aria-hidden="true" />
              </span>
              <div>
                <strong>CCGS Agent</strong>
                <p>
                  I found four high-confidence signals and created a working resource set for the deck. Opportunity sizing needs finance validation before the slide is locked.
                </p>
                <div className="message-resource-row">
                  <Badge tone="success">9 text blocks</Badge>
                  <Badge tone="brand">5 charts</Badge>
                  <Badge tone="info">4 image briefs</Badge>
                  <Badge tone="neutral">6 attachments</Badge>
                </div>
              </div>
            </div>
            <div className="chat-message agent">
              <span className="agent-avatar">
                <Sparkles size={17} aria-hidden="true" />
              </span>
              <div>
                <strong>Next recommendation</strong>
                <p>
                  Use "Fragrance-led premiumisation is reshaping UK Deodorants" as the opening thesis, then support it with Euromonitor growth, Meltwater social signals, and Kantar penetration.
                </p>
              </div>
            </div>
          </div>
          <div className="composer">
            <input aria-label="Message CCGS agent" placeholder="Ask for a sharper retailer implication or another chart option" />
            <button className="button primary compact" type="button">
              <Send size={15} aria-hidden="true" />
              Send
            </button>
          </div>
        </Panel>

        <div className="agent-side">
          <Panel title="Resource tray" description="Drafted by the agent in this session">
            <div className="resource-mini-list">
              {resourceCards.slice(0, 4).map((resource) => {
                const Icon = resource.icon;
                return (
                  <article key={resource.id}>
                    <Icon size={17} aria-hidden="true" />
                    <div>
                      <strong>{resource.title}</strong>
                      <span>{resource.type} - {resource.page}</span>
                    </div>
                    <Badge tone={resource.tone}>{resource.status}</Badge>
                  </article>
                );
              })}
            </div>
          </Panel>

          <Panel title="Agent checklist" description="Build ingredients required before export">
            <ul className="check-list stacked">
              <li>
                <CheckCircle2 size={16} />
                Draft slide headlines
              </li>
              <li>
                <CheckCircle2 size={16} />
                Link source citations
              </li>
              <li>
                <Clock3 size={16} className="pending-icon" />
                Validate opportunity model
              </li>
              <li>
                <Clock3 size={16} className="pending-icon" />
                Attach approved image assets
              </li>
            </ul>
          </Panel>
        </div>
      </div>

      <Panel title="Deck resource pipeline" description="How the agent converts source material into slide-ready assets">
        <div className="pipeline-grid">
          {[
            { title: "Gather", detail: "Sources, prior decks, data extracts", icon: Database },
            { title: "Synthesize", detail: "Signals, CVD fit, opportunity sizing", icon: Sparkles },
            { title: "Package", detail: "Text, charts, images, attachments", icon: FileArchive },
            { title: "Review", detail: "Business, CMI, finance, legal approvals", icon: ClipboardCheck },
          ].map(({ title, detail, icon: Icon }) => (
            <div className="pipeline-step" key={title}>
              <Icon size={20} aria-hidden="true" />
              <strong>{title}</strong>
              <span>{detail}</span>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}

function ResourcesPage() {
  return (
    <>
      <section className="page-heading">
        <div>
          <Badge tone="success">24 resources</Badge>
          <h1>Resource library</h1>
          <p>Reusable deck ingredients produced or gathered for the UK Deodorants CCGS narrative.</p>
        </div>
        <div className="hero-actions">
          <button className="button secondary" type="button">
            <Filter size={16} aria-hidden="true" />
            Filters
          </button>
          <button className="button primary" type="button">
            <UploadCloud size={16} aria-hidden="true" />
            Add file
          </button>
        </div>
      </section>

      <section className="resource-toolbar">
        <div className="topbar-search inline-search">
          <Search size={18} aria-hidden="true" />
          <input aria-label="Search resources" placeholder="Search text blocks, image briefs, charts, attachments" />
        </div>
        <div className="segmented-control" aria-label="Resource filter">
          <button className="active" type="button">All</button>
          <button type="button">Text</button>
          <button type="button">Images</button>
          <button type="button">Attachments</button>
        </div>
      </section>

      <div className="resource-card-grid">
        {resourceCards.map((resource) => (
          <ResourceCard resource={resource} key={resource.id} />
        ))}
      </div>

      <Panel title="Attachment inventory" description="Files and source extracts that travel with the deck">
        <div className="table-shell">
          <table>
            <thead>
              <tr>
                <th>Attachment</th>
                <th>Type</th>
                <th>Owner</th>
                <th>Slide</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {resourceCards.map((resource) => (
                <tr key={resource.id}>
                  <td>
                    <strong>{resource.title}</strong>
                  </td>
                  <td>{resource.type}</td>
                  <td>{resource.owner}</td>
                  <td>{resource.page}</td>
                  <td><Badge tone={resource.tone}>{resource.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}

function ResourceCard({ resource }: { resource: (typeof resourceCards)[number] }) {
  const Icon = resource.icon;

  return (
    <article className="resource-card">
      <div className={`resource-thumb ${resource.tone}`}>
        <Icon size={26} aria-hidden="true" />
        {resource.type.includes("Chart") ? (
          <div className="thumb-bars">
            <span />
            <span />
            <span />
          </div>
        ) : null}
      </div>
      <div className="resource-card-body">
        <div className="resource-card-topline">
          <Badge tone={resource.tone}>{resource.status}</Badge>
          <span>{resource.id}</span>
        </div>
        <h2>{resource.title}</h2>
        <p>{resource.details}</p>
        <div className="resource-meta">
          <span>{resource.type}</span>
          <span>{resource.page}</span>
        </div>
      </div>
    </article>
  );
}

function DeckPage() {
  return (
    <>
      <section className="page-heading">
        <div>
          <Badge tone="brand">8-slide working deck</Badge>
          <h1>Deck builder</h1>
          <p>Slide outline with mapped text, charts, image briefs, attachments, and validation status.</p>
        </div>
        <div className="hero-actions">
          <button className="button secondary" type="button">
            <Download size={16} aria-hidden="true" />
            Export draft
          </button>
          <button className="button primary" type="button">
            <BookOpenCheck size={16} aria-hidden="true" />
            Send for review
          </button>
        </div>
      </section>

      <div className="deck-layout">
        <Panel title="Slide outline" description="Generated structure for the CCGS story">
          <div className="slide-list">
            {deckSlides.map((slide) => (
              <article className={slide.status === "Needs validation" ? "needs-review" : ""} key={slide.number}>
                <span>{slide.number}</span>
                <div>
                  <strong>{slide.title}</strong>
                  <small>{slide.resources} resources - {slide.owner}</small>
                </div>
                <Badge tone={slide.status === "Needs validation" ? "warning" : slide.status === "Draft ready" ? "success" : "brand"}>
                  {slide.status}
                </Badge>
              </article>
            ))}
          </div>
        </Panel>

        <Panel title="Selected slide preview" description="Category growth thesis">
          <div className="slide-preview">
            <div className="slide-preview-header">
              <Badge tone="brand">Slide 01</Badge>
              <span>UK Deodorants CCGS</span>
            </div>
            <h2>Fragrance-led premiumisation is reshaping UK Deodorants</h2>
            <div className="slide-preview-grid">
              <div>
                <strong>Growth opportunity</strong>
                <p>Premium propositions are growing faster than the category, with rising fragrance-led consumer conversation and target headroom.</p>
              </div>
              <div className="slide-chart">
                <span style={{ height: "58%" }} />
                <span style={{ height: "78%" }} />
                <span style={{ height: "44%" }} />
              </div>
            </div>
            <div className="citation-row">
              <Badge tone="neutral">Euromonitor</Badge>
              <Badge tone="neutral">Meltwater</Badge>
              <Badge tone="neutral">Kantar</Badge>
            </div>
          </div>
        </Panel>
      </div>

      <Panel title="Slide resource mapping" description="Which deck resources are attached to each section">
        <div className="mapping-grid">
          {resourceCards.slice(0, 5).map((resource) => (
            <div className="mapping-card" key={resource.id}>
              <Badge tone={resource.tone}>{resource.type}</Badge>
              <strong>{resource.page}</strong>
              <span>{resource.title}</span>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}

function HistoricalPage() {
  const [activeCategory, setActiveCategory] = useState(historicalCategories[0].category);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(historicalCategories[0].opportunities[0].id);
  const currentCategory = historicalCategories.find((item) => item.category === activeCategory) ?? historicalCategories[0];
  const filteredOpportunities = currentCategory.opportunities.filter((opportunity) => {
    const searchable = [
      opportunity.title,
      opportunity.route,
      opportunity.status,
      opportunity.cvd,
      opportunity.insight,
      opportunity.evidence.join(" "),
      opportunity.sourcesUsed.join(" "),
    ]
      .join(" ")
      .toLowerCase();
    return searchable.includes(query.toLowerCase());
  });
  const selectedOpportunity =
    currentCategory.opportunities.find((opportunity) => opportunity.id === selectedId) ??
    filteredOpportunities[0] ??
    currentCategory.opportunities[0];

  function selectCategory(category: string) {
    const nextCategory = historicalCategories.find((item) => item.category === category) ?? historicalCategories[0];
    setActiveCategory(nextCategory.category);
    setSelectedId(nextCategory.opportunities[0].id);
    setQuery("");
  }

  return (
    <section className="history-page">
      <section className="page-heading history-heading">
        <div>
          <Badge tone={currentCategory.statusTone}>{currentCategory.status}</Badge>
          <h1>Historical CCGS</h1>
          <p>
            Category strategy drafts built from prior-year CCGS patterns, source evidence, opportunity sizing,
            confidence, and review status across UK Personal Care.
          </p>
        </div>
        <div className="history-heading-actions">
          <div className="history-search">
            <Search size={17} aria-hidden="true" />
            <input
              aria-label="Search historical CCGS opportunities"
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search opportunities, sources, CVDs"
              value={query}
            />
          </div>
          <button className="button secondary" type="button">
            <Archive size={16} aria-hidden="true" />
            Benchmark library
          </button>
        </div>
      </section>

      <div className="history-tabs" aria-label="Historical CCGS category filter">
        {historicalCategories.map((category) => (
          <button
            className={activeCategory === category.category ? "active" : ""}
            key={category.category}
            onClick={() => selectCategory(category.category)}
            type="button"
          >
            {category.category}
          </button>
        ))}
      </div>

      <section className="history-stat-grid" aria-label={`${currentCategory.category} strategy snapshot`}>
        <div>
          <span>Opportunity size</span>
          <strong>{currentCategory.opportunitySize}</strong>
          <small>{currentCategory.question}</small>
        </div>
        <div>
          <span>Confidence</span>
          <strong>{currentCategory.confidence}</strong>
          <small>{currentCategory.confidenceLabel}</small>
        </div>
        <div>
          <span>Growth signal</span>
          <strong>{currentCategory.growth}</strong>
          <small>Latest category read</small>
        </div>
        <div>
          <span>Sources scanned</span>
          <strong>{currentCategory.sourcesRead}</strong>
          <small>Review owner: {currentCategory.reviewOwner}</small>
        </div>
      </section>

      <div className="history-layout">
        <aside className="history-list-card">
          <div className="history-list-heading">
            <div>
              <h2>Growth opportunities</h2>
              <p>{currentCategory.summary}</p>
            </div>
            <Badge tone="brand">{currentCategory.opportunities.length} routes</Badge>
          </div>

          <div className="history-list">
            {filteredOpportunities.map((opportunity) => (
              <button
                className={`history-row ${selectedOpportunity.id === opportunity.id ? "selected" : ""}`}
                key={opportunity.id}
                onClick={() => setSelectedId(opportunity.id)}
                type="button"
              >
                <div className="history-row-topline">
                  <Badge tone="brand">{opportunity.route}</Badge>
                  <Badge tone={opportunity.statusTone}>{opportunity.status}</Badge>
                </div>
                <strong>{opportunity.title}</strong>
                <span>{opportunity.cvd}</span>
                <div className="history-row-metrics">
                  <small>{opportunity.sizing}</small>
                  <small>{opportunity.confidence} confidence</small>
                </div>
              </button>
            ))}

            {filteredOpportunities.length === 0 ? (
              <div className="empty-state">
                <FileSearch size={18} aria-hidden="true" />
                <strong>No matching opportunities</strong>
                <p>Try a source, CVD, route, or review status.</p>
              </div>
            ) : null}
          </div>
        </aside>

        <article className="history-detail-card">
          <div className="history-detail-topline">
            <Badge tone="brand">{currentCategory.category}</Badge>
            <Badge tone={selectedOpportunity.statusTone}>{selectedOpportunity.status}</Badge>
          </div>
          <div className="history-detail-title">
            <div>
              <span>{selectedOpportunity.route} growth opportunity</span>
              <h2>{selectedOpportunity.title}</h2>
            </div>
            <Badge tone={selectedOpportunity.confidenceTone}>{selectedOpportunity.confidenceLabel}</Badge>
          </div>

          <p className="history-detail-summary">{selectedOpportunity.insight}</p>

          <div className="history-detail-metrics">
            <div>
              <BarChart3 size={17} aria-hidden="true" />
              <span>Opportunity</span>
              <strong>{selectedOpportunity.sizing}</strong>
            </div>
            <div>
              <LineChart size={17} aria-hidden="true" />
              <span>Growth</span>
              <strong>{selectedOpportunity.growth}</strong>
            </div>
            <div>
              <Gauge size={17} aria-hidden="true" />
              <span>Confidence</span>
              <strong>{selectedOpportunity.confidence}</strong>
            </div>
            <div>
              <CircleDot size={17} aria-hidden="true" />
              <span>Penetration</span>
              <strong>{selectedOpportunity.penetration}</strong>
            </div>
          </div>

          <div className="history-section-grid">
            <section>
              <h3>
                <Sparkles size={16} aria-hidden="true" />
                Strategic implication
              </h3>
              <p>{selectedOpportunity.recommendation}</p>
            </section>
            <section>
              <h3>
                <ClipboardCheck size={16} aria-hidden="true" />
                Draft review
              </h3>
              <dl className="history-review-list">
                <div>
                  <dt>Deck section</dt>
                  <dd>{selectedOpportunity.draftSection}</dd>
                </div>
                <div>
                  <dt>Owner</dt>
                  <dd>{selectedOpportunity.reviewOwner}</dd>
                </div>
                <div>
                  <dt>Next step</dt>
                  <dd>{selectedOpportunity.nextStep}</dd>
                </div>
              </dl>
            </section>
          </div>

          <section className="history-evidence">
            <h3>
              <BookOpenCheck size={16} aria-hidden="true" />
              Supporting data points
            </h3>
            <ul>
              {selectedOpportunity.evidence.map((evidence) => (
                <li key={evidence}>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  {evidence}
                </li>
              ))}
            </ul>
          </section>

          <div className="history-source-row" aria-label="Sources used">
            {selectedOpportunity.sourcesUsed.map((source) => (
              <Badge key={source} tone="neutral">
                {source}
              </Badge>
            ))}
          </div>

          <div className="history-reuse-note">
            <FileSearch size={17} aria-hidden="true" />
            <span>Historical reuse: {selectedOpportunity.historicalReuse}</span>
          </div>
        </article>
      </div>

      <div className="history-lower-grid">
        <Panel title="Source coverage" description={`Evidence readiness for ${currentCategory.category}`}>
          <div className="history-source-grid">
            {currentCategory.sources.map((source) => (
              <div key={source.name}>
                <div>
                  <Database size={17} aria-hidden="true" />
                  <Badge tone={source.tone}>{source.status}</Badge>
                </div>
                <strong>{source.name}</strong>
                <p>{source.detail}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Draft review queue" description="What is ready, waiting, or blocked before deck export">
          <div className="history-draft-list">
            {currentCategory.drafts.map((draft) => (
              <div key={draft.section}>
                <div>
                  <strong>{draft.section}</strong>
                  <span>{draft.confidence} confidence</span>
                </div>
                <Badge tone={draft.tone}>{draft.status}</Badge>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <footer className="history-footer">
        Mock data only. Sizing, growth, penetration, and confidence levels are illustrative until connected to live source data.
      </footer>
    </section>
  );
}

function NotificationsPage({
  onMarkAllRead,
  onOpenItem,
  readNotificationIds,
}: {
  onMarkAllRead: () => void;
  onOpenItem: (id: string) => void;
  readNotificationIds: string[];
}) {
  const unreadCount = notifications.filter((notification) => !readNotificationIds.includes(notification.id)).length;

  return (
    <>
      <section className="page-heading">
        <div>
          <Badge tone={unreadCount > 0 ? "warning" : "success"}>{unreadCount} unread updates</Badge>
          <h1>Notifications</h1>
          <p>Business, source, and approval events that affect the deck build.</p>
        </div>
        <div className="hero-actions">
          <button className="button secondary" onClick={onMarkAllRead} type="button">
            <CheckCircle2 size={16} aria-hidden="true" />
            Mark read
          </button>
          <button className="button primary" type="button">
            <ArrowRight size={16} aria-hidden="true" />
            Review actions
          </button>
        </div>
      </section>

      <div className="notification-page-grid">
        <Panel title="Notification center" description="Prioritized updates for the current CCGS run">
          <NotificationList onOpenItem={onOpenItem} readNotificationIds={readNotificationIds} />
        </Panel>
        <Panel title="Action summary" description="Open items by owner">
          <div className="owner-stack">
            {[
              ["Finance", "Opportunity sizing validation", "warning"],
              ["Creative", "Approved premium shelf image", "brand"],
              ["Legal", "Third-party ingestion approval", "warning"],
              ["CMI", "H&A sample data upload", "success"],
            ].map(([owner, task, tone]) => (
              <div className="owner-row" key={owner}>
                <span>{owner}</span>
                <strong>{task}</strong>
                <Badge tone={tone}>{tone === "success" ? "Complete" : "Open"}</Badge>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}

function NotificationList({
  compact = false,
  onOpenItem,
  readNotificationIds,
}: {
  compact?: boolean;
  onOpenItem: (id: string) => void;
  readNotificationIds: string[];
}) {
  const items = compact ? notifications.slice(0, 3) : notifications;

  return (
    <div className="notification-list">
      {items.map((notification) => {
        const isRead = readNotificationIds.includes(notification.id);

        return (
          <article className={`notification-item ${notification.tone} ${isRead ? "read" : "unread"}`} key={notification.id}>
            <span className="notification-dot" />
            <div>
              <strong>{notification.title}</strong>
              <p>{notification.detail}</p>
              <small>{notification.owner} - {notification.time}</small>
            </div>
            <button className="icon-button subtle" onClick={() => onOpenItem(notification.id)} type="button" aria-label={`Open ${notification.title}`}>
              <ArrowUpRight size={16} aria-hidden="true" />
            </button>
          </article>
        );
      })}
    </div>
  );
}

function ValidationPage() {
  return (
    <>
      <section className="page-heading">
        <div>
          <Badge tone="brand">Business review</Badge>
          <h1>Validation queue</h1>
          <p>Questions, ownership, and gating decisions captured from the CCGS working output.</p>
        </div>
      </section>

      <div className="split-grid">
        <ValidationPanel />
        <Panel title="Approval gates" description="Decisions needed before the deck is business-ready">
          <div className="note-stack">
            <div className="note-card warning">
              <AlertTriangle size={18} aria-hidden="true" />
              <p>Opportunity sizing methodology must be confirmed by Finance.</p>
            </div>
            <div className="note-card warning">
              <LockKeyhole size={18} aria-hidden="true" />
              <p>Third-party data ingestion policy requires legal confirmation.</p>
            </div>
            <div className="note-card success">
              <CheckCircle2 size={18} aria-hidden="true" />
              <p>UK Deodorants, Skin Cleansing, and Oral Care scope is accepted for PoC.</p>
            </div>
          </div>
        </Panel>
      </div>

      <Panel title="Access model" description="API and static file split across sources">
        <SourceTable />
      </Panel>
    </>
  );
}

function ProfilePage() {
  return (
    <>
      <section className="page-heading">
        <div>
          <Badge tone="brand">My profile</Badge>
          <h1>Alex Kumar</h1>
          <p>Business lead profile for the UK Deodorants CCGS proof-of-concept workspace.</p>
        </div>
        <div className="hero-actions">
          <button className="button secondary" type="button">
            <Settings size={16} aria-hidden="true" />
            Preferences
          </button>
          <button className="button primary" type="button">
            <ShieldCheck size={16} aria-hidden="true" />
            Request access
          </button>
        </div>
      </section>

      <div className="profile-layout">
        <Panel title="Profile summary" description="Role, ownership, and workspace activity">
          <div className="profile-card">
            <span className="profile-avatar-large">AK</span>
            <div>
              <h2>Alex Kumar</h2>
              <p>Business lead - Beauty and Wellbeing</p>
              <div className="citation-row">
                <Badge tone="brand">UK market</Badge>
                <Badge tone="success">Narrative approver</Badge>
                <Badge tone="neutral">CCGS PoC</Badge>
              </div>
            </div>
          </div>
          <div className="profile-stat-grid">
            <div>
              <strong>7</strong>
              <span>Assigned reviews</span>
            </div>
            <div>
              <strong>4</strong>
              <span>Deck resources approved</span>
            </div>
            <div>
              <strong>2</strong>
              <span>Open access requests</span>
            </div>
          </div>
        </Panel>

        <Panel title="Permissions" description="Demo role capabilities">
          <ul className="check-list stacked">
            <li>
              <CheckCircle2 size={16} />
              Approve narrative drafts
            </li>
            <li>
              <CheckCircle2 size={16} />
              Request CMI source-owner review
            </li>
            <li>
              <CheckCircle2 size={16} />
              Export deck draft for feedback
            </li>
            <li>
              <Clock3 size={16} className="pending-icon" />
              Legal approval required for third-party ingestion
            </li>
          </ul>
        </Panel>
      </div>

      <Panel title="Recent profile activity" description="Actions Alex has taken in the CCGS workspace">
        <div className="activity-table">
          {[
            ["Approved opening narrative thesis", "Narrative Studio", "Today, 10:42 AM"],
            ["Requested validation on GBP 150M sizing", "Opportunity Sizing", "Today, 9:18 AM"],
            ["Attached historical UK CCGS benchmark", "Resource Library", "Yesterday"],
            ["Shared feedback on CVD wording", "Deck Builder", "Yesterday"],
          ].map(([action, area, time]) => (
            <div className="activity-row" key={action}>
              <span>{area}</span>
              <strong>{action}</strong>
              <small>{time}</small>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}

function SettingsPage() {
  return (
    <>
      <section className="page-heading">
        <div>
          <Badge tone="neutral">Workspace settings</Badge>
          <h1>Owners and access</h1>
          <p>Mock configuration for source owners, review responsibilities, and deck export controls.</p>
        </div>
      </section>

      <div className="settings-grid">
        <Panel title="Role matrix" description="Who can edit, approve, and export">
          <div className="owner-stack">
            {[
              ["Business lead", "Can approve narrative and export deck", "Alex Kumar"],
              ["CMI owner", "Can approve data source interpretation", "Priya S."],
              ["Finance partner", "Can approve sizing model", "Marcus L."],
              ["Legal reviewer", "Can approve third-party data use", "Dana R."],
            ].map(([role, permissions, owner]) => (
              <div className="owner-row" key={role}>
                <span>{role}</span>
                <strong>{permissions}</strong>
                <Badge tone="neutral">{owner}</Badge>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Export controls" description="Deck output rules">
          <ul className="check-list stacked">
            <li>
              <CheckCircle2 size={16} />
              Include source attribution appendix
            </li>
            <li>
              <CheckCircle2 size={16} />
              Include attachments manifest
            </li>
            <li>
              <Clock3 size={16} className="pending-icon" />
              Lock slides after finance validation
            </li>
            <li>
              <Clock3 size={16} className="pending-icon" />
              Block export if legal gate remains open
            </li>
          </ul>
        </Panel>
      </div>
    </>
  );
}

export function App() {
  const [activePage, setActivePage] = useState<PageId>("command");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [readNotificationIds, setReadNotificationIds] = useState<string[]>(
    notifications.filter((notification) => !notification.unread).map((notification) => notification.id),
  );
  const pageLabel = useMemo(() => navItems.find((item) => item.id === activePage)?.label ?? "Command Center", [activePage]);
  const pageContext = activePage === "history" ? "UK Personal Care PoC" : "UK Deodorants PoC";
  const unreadCount = notifications.filter((notification) => !readNotificationIds.includes(notification.id)).length;

  function openPage(page: PageId) {
    setActivePage(page);
    setNotificationOpen(false);
    setProfileOpen(false);
    setMobileNavOpen(false);
  }

  function markNotificationRead(id: string) {
    setReadNotificationIds((current) => (current.includes(id) ? current : [...current, id]));
  }

  function markAllNotificationsRead() {
    setReadNotificationIds(notifications.map((notification) => notification.id));
  }

  function renderPage() {
    switch (activePage) {
      case "agent":
        return <AgentPage setActivePage={openPage} />;
      case "resources":
        return <ResourcesPage />;
      case "deck":
        return <DeckPage />;
      case "history":
        return <HistoricalPage />;
      case "notifications":
        return (
          <NotificationsPage
            onMarkAllRead={markAllNotificationsRead}
            onOpenItem={markNotificationRead}
            readNotificationIds={readNotificationIds}
          />
        );
      case "validation":
        return <ValidationPage />;
      case "profile":
        return <ProfilePage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <CommandCenterPage setActivePage={openPage} />;
    }
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNavOpen ? "mobile-open" : ""}`}>
        <div className="brand-lockup">
          <div className="brand-mark">
            <Sparkles size={22} aria-hidden="true" />
          </div>
          <div>
            <strong>CCGS</strong>
            <span>Growth strategy agent</span>
          </div>
        </div>

        <nav className="nav-list" aria-label="CCGS workspace">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                className={`nav-item ${activePage === item.id ? "active" : ""}`}
                key={item.id}
                onClick={() => openPage(item.id)}
                type="button"
              >
                <Icon size={18} aria-hidden="true" />
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.meta}</small>
                </span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-card">
          <div className="mini-icon">
            <ShieldCheck size={18} aria-hidden="true" />
          </div>
          <strong>Data guardrails</strong>
          <p>Third-party ingestion pending legal and procurement review.</p>
          <Badge tone="warning">Compliance gate</Badge>
        </div>
      </aside>
      <button
        className={`mobile-nav-backdrop ${mobileNavOpen ? "show" : ""}`}
        onClick={() => setMobileNavOpen(false)}
        type="button"
        aria-label="Close navigation"
      />

      <div className="workspace">
        <header className="topbar">
          <div className="topbar-title">
            <button
              className="icon-button mobile-menu"
              onClick={() => setMobileNavOpen(true)}
              type="button"
              aria-label="Open navigation"
              aria-expanded={mobileNavOpen}
            >
              <Menu size={18} aria-hidden="true" />
            </button>
            <div>
              <p>Consumer Category Growth Strategy</p>
              <strong>{pageLabel} - {pageContext}</strong>
            </div>
          </div>
          <div className="topbar-search">
            <Search size={18} aria-hidden="true" />
            <input aria-label="Search workspace" placeholder="Search sources, resources, slides, approvals" />
          </div>
          <div className="topbar-actions">
            <IconButton icon={HelpCircle} label="Help" />
            <div className="notification-wrap">
              <button
                className="notification-button"
                onClick={() => {
                  setNotificationOpen((value) => !value);
                  setProfileOpen(false);
                }}
                type="button"
                aria-label="Notifications"
              >
                <Bell size={18} aria-hidden="true" />
                {unreadCount > 0 ? <span>{unreadCount}</span> : null}
              </button>
              {notificationOpen ? (
                <div className="notification-popover">
                  <div className="popover-header">
                    <strong>Notifications</strong>
                    <button className="text-button" onClick={() => openPage("notifications")} type="button">
                      Open center
                    </button>
                  </div>
                  <NotificationList compact onOpenItem={markNotificationRead} readNotificationIds={readNotificationIds} />
                </div>
              ) : null}
            </div>
            <div className="profile-wrap">
              <button
                className="user-menu"
                onClick={() => {
                  setProfileOpen((value) => !value);
                  setNotificationOpen(false);
                }}
                type="button"
              >
                <span className="avatar">AK</span>
                <span>
                  <strong>Alex Kumar</strong>
                  <small>Business lead</small>
                </span>
                <ChevronDown size={16} aria-hidden="true" />
              </button>
              {profileOpen ? (
                <div className="profile-popover">
                  <div className="profile-popover-head">
                    <span className="profile-avatar-large">AK</span>
                    <div>
                      <strong>Alex Kumar</strong>
                      <p>Business lead - UK Deodorants</p>
                    </div>
                  </div>
                  <div className="profile-menu-list">
                    <button onClick={() => openPage("profile")} type="button">
                      <UserRound size={16} aria-hidden="true" />
                      View profile
                    </button>
                    <button onClick={() => openPage("settings")} type="button">
                      <Settings size={16} aria-hidden="true" />
                      Workspace settings
                    </button>
                    <button onClick={() => openPage("validation")} type="button">
                      <ClipboardCheck size={16} aria-hidden="true" />
                      My approvals
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <main className="content">{renderPage()}</main>
      </div>
    </div>
  );
}
