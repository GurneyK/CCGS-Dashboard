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

type PageId = "command" | "agent" | "resources" | "deck" | "notifications" | "validation" | "settings";
type Tone = "brand" | "success" | "warning" | "info" | "neutral" | "error";

const navItems = [
  { id: "command", icon: Home, label: "Command Center", meta: "Live workspace" },
  { id: "agent", icon: Bot, label: "Deck Agent", meta: "Interactive build" },
  { id: "resources", icon: FileArchive, label: "Resource Library", meta: "Text, images, files" },
  { id: "deck", icon: LayoutPanelTop, label: "Deck Builder", meta: "Slides and sections" },
  { id: "notifications", icon: Bell, label: "Notifications", meta: "Tasks and alerts" },
  { id: "validation", icon: ClipboardCheck, label: "Validation Queue", meta: "Business review" },
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
    title: "Opportunity sizing owner requested",
    detail: "Finance needs to confirm the HC model reuse before the market sizing slide is locked.",
    time: "5 min ago",
    tone: "warning",
    owner: "Finance",
  },
  {
    title: "Nielsen BDL source connected",
    detail: "Customer-level EPOS data is available for UK Deodorants and ready for the agent run.",
    time: "18 min ago",
    tone: "success",
    owner: "CMI",
  },
  {
    title: "Image brief queued",
    detail: "Premium fragrance shelf visual is waiting for brand-approved product imagery.",
    time: "31 min ago",
    tone: "brand",
    owner: "Creative",
  },
  {
    title: "Legal review still open",
    detail: "Third-party data ingestion requires procurement and legal assessment.",
    time: "1 hr ago",
    tone: "warning",
    owner: "Legal",
  },
] satisfies Array<{ title: string; detail: string; time: string; tone: Tone; owner: string }>;

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

function NotificationsPage() {
  return (
    <>
      <section className="page-heading">
        <div>
          <Badge tone="warning">3 open actions</Badge>
          <h1>Notifications</h1>
          <p>Business, source, and approval events that affect the deck build.</p>
        </div>
        <div className="hero-actions">
          <button className="button secondary" type="button">
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
          <NotificationList />
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

function NotificationList({ compact = false }: { compact?: boolean }) {
  const items = compact ? notifications.slice(0, 3) : notifications;

  return (
    <div className="notification-list">
      {items.map((notification) => (
        <article className={`notification-item ${notification.tone}`} key={notification.title}>
          <span className="notification-dot" />
          <div>
            <strong>{notification.title}</strong>
            <p>{notification.detail}</p>
            <small>{notification.owner} - {notification.time}</small>
          </div>
          <button className="icon-button subtle" type="button" aria-label={`Open ${notification.title}`}>
            <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        </article>
      ))}
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
  const pageLabel = useMemo(() => navItems.find((item) => item.id === activePage)?.label ?? "Command Center", [activePage]);

  function renderPage() {
    switch (activePage) {
      case "agent":
        return <AgentPage setActivePage={setActivePage} />;
      case "resources":
        return <ResourcesPage />;
      case "deck":
        return <DeckPage />;
      case "notifications":
        return <NotificationsPage />;
      case "validation":
        return <ValidationPage />;
      case "settings":
        return <SettingsPage />;
      default:
        return <CommandCenterPage setActivePage={setActivePage} />;
    }
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
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
                onClick={() => setActivePage(item.id)}
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

      <div className="workspace">
        <header className="topbar">
          <div className="topbar-title">
            <button className="icon-button mobile-menu" type="button" aria-label="Open navigation">
              <Menu size={18} aria-hidden="true" />
            </button>
            <div>
              <p>Consumer Category Growth Strategy</p>
              <strong>{pageLabel} - UK Deodorants PoC</strong>
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
                onClick={() => setNotificationOpen((value) => !value)}
                type="button"
                aria-label="Notifications"
              >
                <Bell size={18} aria-hidden="true" />
                <span>3</span>
              </button>
              {notificationOpen ? (
                <div className="notification-popover">
                  <div className="popover-header">
                    <strong>Notifications</strong>
                    <button className="text-button" onClick={() => setActivePage("notifications")} type="button">
                      Open center
                    </button>
                  </div>
                  <NotificationList compact />
                </div>
              ) : null}
            </div>
            <button className="user-menu" type="button">
              <span className="avatar">AK</span>
              <span>
                <strong>Alex Kumar</strong>
                <small>Business lead</small>
              </span>
              <ChevronDown size={16} aria-hidden="true" />
            </button>
          </div>
        </header>

        <main className="content">{renderPage()}</main>
      </div>
    </div>
  );
}
