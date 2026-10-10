"use client";

import {
  Activity,
  AlertTriangle,
  Bell,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Cable,
  Database,
  FileText,
  Gauge,
  GitBranch,
  LayoutDashboard,
  Menu,
  Network,
  PackageSearch,
  PlugZap,
  Router,
  Search,
  Server,
  Settings,
  ShieldCheck,
  Users,
  Wrench,
  X,
  Rocket,
  FlaskConical,
  CalendarClock,
  ClipboardCheck,
  Headphones,
  BookOpenCheck,
  CircleDot,
  LibraryBig,
  GitMerge,
  Siren,
  Megaphone,
  HeartPulse,
  ScanSearch,
  ListChecks,
  ChartNoAxesCombined,
  Boxes,
  FileCode2,
  TableProperties,
  BellRing,
  Archive,
  Radar,
  LifeBuoy,
  ShieldEllipsis,
  KeyRound,
  FileInput,
  TimerReset,
  type LucideIcon,
} from "lucide-react";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import OperationalOverview from "./operational-overview";
import NotificationCenter from "./notification-center";
import "./adapter-readiness.css";
import "./operational.css";

const DeviceInventory = lazy(() => import("./inventory"));
const RealTimeMonitoring = lazy(() => import("./monitoring"));
const AlertsIncidents = lazy(() => import("./alerts-incidents"));
const NetworkTopology = lazy(() => import("./topology"));
const PerformanceAnalytics = lazy(() => import("./performance"));
const CustomerServiceMonitoring = lazy(() => import("./customers"));
const ChangeManagement = lazy(() => import("./changes"));
const SecurityMonitoring = lazy(() => import("./security"));
const FieldOperations = lazy(() => import("./field-work"));
const ReportCenter = lazy(() => import("./reports"));
const Administration = lazy(() => import("./administration"));
const NetworkAutomation = lazy(() => import("./automation"));
const NocCopilot = lazy(() => import("./copilot"));
const DataIntegrations = lazy(() => import("./integrations"));
const AssetLifecycle = lazy(() => import("./assets"));
const NetworkIpam = lazy(() => import("./ipam"));
const CircuitProviderManagement = lazy(() => import("./circuits"));
const FirmwareCompliance = lazy(() => import("./firmware"));
const ServiceProvisioning = lazy(() => import("./provisioning"));
const PlatformFoundation = lazy(() => import("./platform"));
const TelemetrySimulationLab = lazy(() => import("./simulation-lab"));
const MaintenanceWindows = lazy(() => import("./maintenance"));
const ShiftHandover = lazy(() => import("./handover"));
const OnCallEscalation = lazy(() => import("./on-call"));
const PostIncidentReview = lazy(() => import("./postmortems"));
const ProblemManagement = lazy(() => import("./problems"));
const KnowledgeBase = lazy(() => import("./knowledge"));
const EventCorrelation = lazy(() => import("./event-correlation"));
const MajorIncidentCommand = lazy(() => import("./major-incidents"));
const ServiceCommunications = lazy(() => import("./service-communications"));
const RestorationAssurance = lazy(() => import("./restoration-assurance"));
const MonitoringAssurance = lazy(() => import("./monitoring-assurance"));
const DeviceOnboarding = lazy(() => import("./device-onboarding"));
const BaselineManagement = lazy(() => import("./baseline-management"));
const CollectorManagement = lazy(() => import("./collector-management"));
const MonitoringProfiles = lazy(() => import("./monitoring-profiles"));
const TelemetryExplorer = lazy(() => import("./telemetry-explorer"));
const AlertPolicies = lazy(() => import("./alert-policies"));
const DataLifecycle = lazy(() => import("./data-lifecycle"));
const DiscoveryDependencies = lazy(() => import("./discovery-dependencies"));
const PlatformResilience = lazy(() => import("./platform-resilience"));
const ProductionReadiness = lazy(() => import("./production-readiness"));
const DeviceCommissioning = lazy(() => import("./device-commissioning"));
const CredentialAssurance = lazy(() => import("./credential-assurance"));
const ReleaseAssurance = lazy(() => import("./release-assurance"));
const DeviceIntake = lazy(() => import("./device-intake"));
const CommissioningRehearsal = lazy(() => import("./commissioning-rehearsal"));
const CudyStabilityPilot = lazy(() => import("./cudy-stability-pilot"));
const MikrotikOnboarding = lazy(() => import("./mikrotik-onboarding"));
const MikrotikPilot = lazy(() => import("./mikrotik-pilot"));

const viewConfig = {
  "Command Center": {
    slug: "command-center",
    title: "Command Center",
    subtitle: "Current network operations",
  },
  Devices: {
    slug: "devices",
    title: "Device Inventory",
    subtitle: "Registered devices and persistent site assignments",
  },
  Monitoring: {
    slug: "monitoring",
    title: "Real-Time Monitoring",
    subtitle: "Observed health and collector freshness",
  },
  Topology: {
    slug: "topology",
    title: "Network Topology",
    subtitle: "486 nodes · 512 active links",
  },
  Performance: {
    slug: "performance",
    title: "Performance & Capacity",
    subtitle: "10.5 Gbps capacity · 3 congested links",
  },
  Alerts: {
    slug: "alerts",
    title: "Alerts & Incidents",
    subtitle: "27 active alerts · 7 open incidents",
  },
  Incidents: {
    slug: "incidents",
    title: "Alerts & Incidents",
    subtitle: "27 active alerts · 7 open incidents",
  },
  Changes: {
    slug: "changes",
    title: "Backups & Changes",
    subtitle: "482 protected devices · 7 pending approvals",
  },
  Security: {
    slug: "security",
    title: "Security Operations",
    subtitle: "3 critical threats · Security posture 94 / 100",
  },
  "Field Work": {
    slug: "field-work",
    title: "Field Operations",
    subtitle: "18 open work orders · 6 technicians online",
  },
  Customers: {
    slug: "customers",
    title: "Customers & Services",
    subtitle: "Live MikroTik pilot · Persistent service dependencies",
  },
  Reports: {
    slug: "reports",
    title: "Reports & Analytics",
    subtitle: "36 report templates · 11 active schedules",
  },
  Administration: {
    slug: "administration",
    title: "Administration",
    subtitle: "18 users · 7 of 8 integrations healthy",
  },
  Automation: {
    slug: "automation",
    title: "Network Automation",
    subtitle: "5 active runbooks · 3 approvals awaiting review",
  },
  Copilot: {
    slug: "copilot",
    title: "NOC Copilot",
    subtitle: "3 active analyses · 92% evidence confidence",
  },
  "Data Sources": {
    slug: "data-sources",
    title: "Data Sources & Integrations",
    subtitle: "7 of 8 connectors active · 18,420 events per minute",
  },
  Assets: {
    slug: "asset-lifecycle",
    title: "Asset Lifecycle & Spares",
    subtitle: "486 governed assets · 4 critical stock alerts",
  },
  IPAM: {
    slug: "ipam",
    title: "IPAM & Network Resources",
    subtitle: "34 managed prefixes · 3 address-space risks",
  },
  Circuits: {
    slug: "circuits",
    title: "Circuits, Providers & Peering",
    subtitle: "18 active circuits · 2 SLA risks · 4 upstream peers",
  },
  Firmware: {
    slug: "firmware",
    title: "Firmware & Configuration Compliance",
    subtitle: "486 governed devices · 23 upgrades due · 4 exposed versions",
  },
  Provisioning: {
    slug: "provisioning",
    title: "Service Provisioning & Activation",
    subtitle: "12 activation orders · 3 awaiting approval · 98.7% success rate",
  },
  Platform: {
    slug: "platform",
    title: "Production Platform",
    subtitle:
      "Persistent data · Authenticated access · Network writes disabled",
  },
  "Simulation Lab": {
    slug: "simulation-lab",
    title: "Telemetry Simulation Lab",
    subtitle: "4 safe scenarios · Production collectors isolated",
  },
  Maintenance: {
    slug: "maintenance",
    title: "Maintenance Windows",
    subtitle: "3 upcoming windows · 1 awaiting approval",
  },
  Handover: {
    slug: "handover",
    title: "Shift Handover",
    subtitle: "4 carry-over items · 1 acknowledgement pending",
  },
  "On Call": {
    slug: "on-call",
    title: "On-Call & Escalations",
    subtitle: "4 responders available · 0 unowned escalations",
  },
  Reviews: {
    slug: "post-incident-reviews",
    title: "Post-Incident Reviews",
    subtitle: "3 reviews open · 7 corrective actions tracked",
  },
  Problems: {
    slug: "problem-management",
    title: "Problem Management",
    subtitle:
      "7 open problems · 6 known workarounds · repeat incidents down 24%",
  },
  Knowledge: {
    slug: "knowledge-base",
    title: "Operations Knowledge Base",
    subtitle: "42 approved articles · 6 due for review · 3 draft updates",
  },
  Correlation: {
    slug: "event-correlation",
    title: "Event Correlation",
    subtitle: "3 active cases · 57 signals grouped · duplicate noise down 81%",
  },
  "Major Incidents": {
    slug: "major-incidents",
    title: "Major Incident Command",
    subtitle:
      "1 active SEV-1 · 184 customers impacted · next update in 8 minutes",
  },
  Communications: {
    slug: "service-communications",
    title: "Service Communications",
    subtitle:
      "1 update due · 227 customers covered · external sending disabled",
  },
  Restoration: {
    slug: "restoration-assurance",
    title: "Service Restoration Assurance",
    subtitle: "3 active validations · 1 observation running · 2 closure-ready",
  },
  "Monitoring Assurance": {
    slug: "monitoring-assurance",
    title: "Monitoring Assurance",
    subtitle: "6 of 8 sources trusted · 1 active blind spot · 94.7% coverage",
  },
  "Device Onboarding": {
    slug: "device-onboarding",
    title: "Controlled Device Onboarding",
    subtitle: "3 readiness records · 1 live pilot · network writes disabled",
  },
  Baselines: {
    slug: "baseline-management",
    title: "Baseline & Threshold Management",
    subtitle: "1 approved baseline · 3 versions · 0 active drift risks",
  },
  Collectors: {
    slug: "collector-management",
    title: "Collector Management",
    subtitle: "1 live collector · 3 planned targets · 0 overloaded collectors",
  },
  "Monitoring Profiles": {
    slug: "monitoring-profiles",
    title: "Monitoring Profiles",
    subtitle: "4 versioned profiles · 1 approved · network writes disabled",
  },
  "Telemetry Explorer": {
    slug: "telemetry-explorer",
    title: "Telemetry Explorer",
    subtitle: "5 recent samples · 2 validated mappings · credentials protected",
  },
  "Alert Policies": {
    slug: "alert-policies",
    title: "Alert Policy Management",
    subtitle: "4 versioned rules · 1 approved · unsafe activation blocked",
  },
  "Data Lifecycle": {
    slug: "data-lifecycle",
    title: "Telemetry Storage & Retention",
    subtitle: "Persistent history · governed retention · deletion disabled",
  },
  "Discovery & Dependencies": {
    slug: "discovery-dependencies",
    title: "Discovery & Dependency Assurance",
    subtitle: "3 controlled scopes · probes paused · 3 impact paths staged",
  },
  "Platform Resilience": {
    slug: "platform-resilience",
    title: "Backup, Recovery & Platform Health",
    subtitle: "Backups verified · RTO tested · 1 platform component at risk",
  },
  "Production Readiness": {
    slug: "production-readiness",
    title: "Security & Production Readiness",
    subtitle:
      "12 controls evidenced · 1 failure review · commissioning blocked",
  },
  Commissioning: {
    slug: "device-commissioning",
    title: "Device Commissioning",
    subtitle:
      "2 approved runbooks · equipment due next week · all probes paused",
  },
  "Credential Assurance": {
    slug: "credential-assurance",
    title: "Credential Assurance",
    subtitle:
      "1 ready reference · 2 waiting for equipment · 0 secret values stored",
  },
  "Release Assurance": {
    slug: "release-assurance",
    title: "Release Assurance",
    subtitle:
      "50 integration checks · 0 lint findings · real-device commissioning paused",
  },
  "Commissioning Intake": {
    slug: "commissioning-intake",
    title: "Pre-Commissioning Device Intake",
    subtitle: "2 vendor paths · draft-only staging · all device probes paused",
  },
  "Commissioning Rehearsal": {
    slug: "commissioning-rehearsal",
    title: "Commissioning Rehearsal",
    subtitle:
      "4 isolated scenarios · persistent evidence · hardware acceptance blocked",
  },
  "Cudy Stability Pilot": {
    slug: "cudy-stability-pilot",
    title: "Cudy Stability Pilot",
    subtitle:
      "Live availability evidence · incident automation · read-only monitoring",
  },
  "MikroTik Onboarding": {slug:"mikrotik-onboarding",title:"MikroTik One-Command Onboarding",subtitle:"Device-bound installers · 15-minute tokens · WireGuard-only bootstrap"},
  "MikroTik Pilot": {slug:"mikrotik-pilot",title:"MikroTik Pilot Commissioning",subtitle:"RB750Gr3 · 10.66.66.5 · SNMP GET verified · credential rotation due"},
} as const;

type ViewName = keyof typeof viewConfig;
type NavItem = { label: ViewName; icon: LucideIcon };


const navGroups: { label?: string; items: NavItem[] }[] = [
  { items: [{ label: "Command Center", icon: LayoutDashboard }] },
  {
    label: "Network",
    items: [
      { label: "Devices", icon: Server },
      { label: "Assets", icon: PackageSearch },
      { label: "IPAM", icon: Network },
      { label: "Circuits", icon: Cable },
      { label: "Firmware", icon: PackageSearch },
      { label: "Provisioning", icon: Rocket },
      { label: "Device Onboarding", icon: ListChecks },
      { label: "Baselines", icon: ChartNoAxesCombined },
      { label: "Collectors", icon: Boxes },
      { label: "Monitoring Profiles", icon: FileCode2 },
      { label: "Telemetry Explorer", icon: TableProperties },
      { label: "Alert Policies", icon: BellRing },
      { label: "Data Lifecycle", icon: Archive },
      { label: "Discovery & Dependencies", icon: Radar },
      { label: "Platform Resilience", icon: LifeBuoy },
      { label: "Production Readiness", icon: ShieldEllipsis },
      { label: "Commissioning", icon: ClipboardCheck },
      { label: "Credential Assurance", icon: KeyRound },
      { label: "Release Assurance", icon: ShieldCheck },
      { label: "Commissioning Intake", icon: FileInput },
      { label: "Commissioning Rehearsal", icon: FlaskConical },
      { label: "Cudy Stability Pilot", icon: TimerReset },
      { label: "MikroTik Onboarding", icon: Router },
      { label: "MikroTik Pilot", icon: Activity },
      { label: "Monitoring", icon: Activity },
      { label: "Topology", icon: GitBranch },
      { label: "Performance", icon: Gauge },
      { label: "Data Sources", icon: PlugZap },
      { label: "Simulation Lab", icon: FlaskConical },
    ],
  },
  {
    label: "Operations",
    items: [
      { label: "Alerts", icon: Bell },
      { label: "Incidents", icon: AlertTriangle },
      { label: "Correlation", icon: GitMerge },
      { label: "Major Incidents", icon: Siren },
      { label: "Communications", icon: Megaphone },
      { label: "Restoration", icon: HeartPulse },
      { label: "Monitoring Assurance", icon: ScanSearch },
      { label: "Changes", icon: FileText },
      { label: "Maintenance", icon: CalendarClock },
      { label: "Handover", icon: ClipboardCheck },
      { label: "On Call", icon: Headphones },
      { label: "Reviews", icon: BookOpenCheck },
      { label: "Problems", icon: CircleDot },
      { label: "Knowledge", icon: LibraryBig },
      { label: "Security", icon: ShieldCheck },
      { label: "Field Work", icon: Wrench },
      { label: "Automation", icon: Bot },
      { label: "Copilot", icon: BrainCircuit },
    ],
  },
  {
    items: [
      { label: "Customers", icon: Users },
      { label: "Reports", icon: FileText },
      { label: "Administration", icon: Settings },
      { label: "Platform", icon: Database },
    ],
  },
];

const viewBySlug = Object.fromEntries(
  Object.entries(viewConfig).map(([label, config]) => [config.slug, label]),
) as Record<string, ViewName>;

const searchOptions: { label: string; kind: string; view: ViewName }[] = [
  { label: "Paje Tower", kind: "Site", view: "Topology" },
  { label: "North Backhaul", kind: "Link", view: "Monitoring" },
  { label: "UPS Battery Kendwa", kind: "Device", view: "Devices" },
  { label: "Mala Boutique", kind: "Customer", view: "Customers" },
  { label: "Wireless Link Kibweni", kind: "Service", view: "Customers" },
  { label: "Critical alert queue", kind: "Operations", view: "Alerts" },
  { label: "Open incidents", kind: "Operations", view: "Incidents" },
  {
    label: "Correlated alert storms and probable root causes",
    kind: "Operations",
    view: "Correlation",
  },
  {
    label: "Customer outage and restoration communications",
    kind: "Operations",
    view: "Communications",
  },
  {
    label: "Service restoration and closure evidence",
    kind: "Operations",
    view: "Restoration",
  },
  {
    label: "Telemetry trust, collector gaps and monitoring blind spots",
    kind: "Operations",
    view: "Monitoring Assurance",
  },
  {
    label: "Collector fleet health, load and target ownership",
    kind: "Telemetry",
    view: "Collectors",
  },
  {
    label: "MikroTik, Ubiquiti and SNMP monitoring profiles",
    kind: "Telemetry",
    view: "Monitoring Profiles",
  },
  {
    label: "Alert thresholds, rule versions and noise controls",
    kind: "Telemetry",
    view: "Alert Policies",
  },
  {
    label: "Telemetry storage, rollups and retention",
    kind: "Platform",
    view: "Data Lifecycle",
  },
  {
    label: "Controlled discovery scopes and dependency impact",
    kind: "Topology",
    view: "Discovery & Dependencies",
  },
  {
    label: "Backup, recovery and NOCX self-monitoring",
    kind: "Platform",
    view: "Platform Resilience",
  },
  {
    label: "MikroTik and Ubiquiti commissioning runbooks",
    kind: "Workflow",
    view: "Commissioning",
  },
  {
    label: "Protected credential references and rotation evidence",
    kind: "Security",
    view: "Credential Assurance",
  },
  {
    label: "Version 66 release audit and integration evidence",
    kind: "Assurance",
    view: "Release Assurance",
  },
  {
    label: "MikroTik and Ubiquiti pre-commissioning CSV intake",
    kind: "Workflow",
    view: "Commissioning Intake",
  },
  {
    label: "Isolated MikroTik and Ubiquiti commissioning rehearsals",
    kind: "Assurance",
    view: "Commissioning Rehearsal",
  },
  {
    label:
      "Live Cudy availability, latency, packet loss and stability evidence",
    kind: "Telemetry",
    view: "Cudy Stability Pilot",
  },
  {
    label: "Device onboarding readiness and safe acceptance",
    kind: "Workflow",
    view: "Device Onboarding",
  },
  { label: "Capacity forecasts", kind: "Analytics", view: "Performance" },
  { label: "Change approvals", kind: "Workflow", view: "Changes" },
  { label: "Maintenance windows", kind: "Operations", view: "Maintenance" },
  { label: "Shift handover log", kind: "Operations", view: "Handover" },
  {
    label: "On-call roster and escalation policy",
    kind: "Operations",
    view: "On Call",
  },
  {
    label: "Post-incident reviews and root causes",
    kind: "Operations",
    view: "Reviews",
  },
  {
    label: "Recurring faults and known errors",
    kind: "Operations",
    view: "Problems",
  },
  {
    label: "Approved troubleshooting guides and SOPs",
    kind: "Knowledge",
    view: "Knowledge",
  },
  { label: "Threat investigations", kind: "Security", view: "Security" },
  { label: "Field dispatch board", kind: "Field work", view: "Field Work" },
  { label: "Scheduled reports", kind: "Reports", view: "Reports" },
  { label: "Platform users", kind: "Administration", view: "Administration" },
  { label: "Network runbooks", kind: "Automation", view: "Automation" },
  { label: "Automation approvals", kind: "Workflow", view: "Automation" },
  { label: "Root cause analysis", kind: "Copilot", view: "Copilot" },
  { label: "Diagnostic evidence", kind: "Copilot", view: "Copilot" },
  { label: "MikroTik RouterOS API", kind: "Connector", view: "Data Sources" },
  {
    label: "UISP and UniFi integrations",
    kind: "Connector",
    view: "Data Sources",
  },
  { label: "Regional collectors", kind: "Telemetry", view: "Data Sources" },
  {
    label: "Asset lifecycle register",
    kind: "Asset management",
    view: "Assets",
  },
  { label: "Critical spares inventory", kind: "Warehouse", view: "Assets" },
  { label: "Warranty and RMA cases", kind: "Lifecycle", view: "Assets" },
  { label: "IP prefix registry", kind: "IPAM", view: "IPAM" },
  { label: "DHCP and address pools", kind: "Address management", view: "IPAM" },
  { label: "VLAN assignments", kind: "Network resources", view: "IPAM" },
  { label: "Duplicate IP conflicts", kind: "IPAM", view: "IPAM" },
  {
    label: "Upstream circuits and peers",
    kind: "Connectivity",
    view: "Circuits",
  },
  {
    label: "Provider SLA breaches",
    kind: "Carrier management",
    view: "Circuits",
  },
  { label: "Circuit contract renewals", kind: "Commercial", view: "Circuits" },
  { label: "Firmware upgrade campaigns", kind: "Lifecycle", view: "Firmware" },
  { label: "Vulnerable device versions", kind: "Security", view: "Firmware" },
  {
    label: "Configuration compliance baselines",
    kind: "Governance",
    view: "Firmware",
  },
  {
    label: "Service activation orders",
    kind: "Provisioning",
    view: "Provisioning",
  },
  {
    label: "MikroTik and Omada provisioning templates",
    kind: "Provisioning",
    view: "Provisioning",
  },
  {
    label: "Activation preflight checks",
    kind: "Workflow",
    view: "Provisioning",
  },
  { label: "Production backend readiness", kind: "Platform", view: "Platform" },
  {
    label: "Telemetry simulation scenarios",
    kind: "Testing",
    view: "Simulation Lab",
  },
];

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [activeView, setActiveView] = useState<ViewName>("Command Center");
  const [navHasMore, setNavHasMore] = useState(false);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const normalized = query.trim().toLowerCase();
    return searchOptions.filter((item) =>
      `${item.label} ${item.kind} ${item.view}`
        .toLowerCase()
        .includes(normalized),
    );
  }, [query]);

  useEffect(() => {
    const syncViewFromUrl = () => {
      const slug = window.location.hash.replace(/^#\/?/, "").split(/[?&]/)[0];
      const nextView = viewBySlug[slug];
      if (nextView) setActiveView(nextView);
    };

    syncViewFromUrl();
    window.addEventListener("hashchange", syncViewFromUrl);
    window.addEventListener("popstate", syncViewFromUrl);
    return () => {
      window.removeEventListener("hashchange", syncViewFromUrl);
      window.removeEventListener("popstate", syncViewFromUrl);
    };
  }, []);

  useEffect(() => {
    const nav = document.querySelector<HTMLElement>(".sidebar-nav");
    if (!nav) return;
    const updateCue = () =>
      setNavHasMore(nav.scrollTop + nav.clientHeight < nav.scrollHeight - 4);
    const observer = new ResizeObserver(updateCue);
    nav.addEventListener("scroll", updateCue, { passive: true });
    window.addEventListener("resize", updateCue);
    observer.observe(nav);
    updateCue();
    return () => {
      nav.removeEventListener("scroll", updateCue);
      window.removeEventListener("resize", updateCue);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const sidebar = document.querySelector<HTMLElement>(".sidebar");
    const media = window.matchMedia("(max-width: 820px)");
    const syncSidebar = () => {
      const hidden = media.matches && !sidebarOpen;
      if (hidden) {
        sidebar?.setAttribute("inert", "");
        sidebar?.setAttribute("aria-hidden", "true");
      } else {
        sidebar?.removeAttribute("inert");
        sidebar?.removeAttribute("aria-hidden");
      }
      document.body.classList.toggle("nav-open", media.matches && sidebarOpen);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && media.matches && sidebarOpen) {
        event.preventDefault();
        setSidebarOpen(false);
      }
    };

    syncSidebar();
    if (media.matches && sidebarOpen) {
      window.requestAnimationFrame(() =>
        document.querySelector<HTMLButtonElement>(".sidebar-close")?.focus(),
      );
    }
    media.addEventListener("change", syncSidebar);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      media.removeEventListener("change", syncSidebar);
      document.removeEventListener("keydown", closeOnEscape);
      document.body.classList.remove("nav-open");
      if (media.matches && sidebarOpen)
        document.querySelector<HTMLButtonElement>(".menu-button")?.focus();
    };
  }, [sidebarOpen]);

  useEffect(() => {
    let activeDialog: HTMLElement | null = null;
    let previousFocus: HTMLElement | null = null;
    const dialogSelector = 'aside[class*="drawer"], [role="dialog"]';
    const tablistSelector =
      ".event-tabs, .customer-tabs, .customer-drawer-tabs, .changes-tabs, .security-tabs, .field-tabs, .reports-tabs, .admin-tabs";
    const tabbableSelector =
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const enhanceUi = () => {
      const dialogs = Array.from(
        document.querySelectorAll<HTMLElement>(dialogSelector),
      ).filter((dialog) => dialog.getClientRects().length > 0);
      const nextDialog = dialogs.at(-1) ?? null;
      dialogs.forEach((dialog) => {
        dialog.setAttribute("role", "dialog");
        dialog.setAttribute("aria-modal", "true");
        dialog.setAttribute("tabindex", "-1");
      });

      if (nextDialog && nextDialog !== activeDialog) {
        previousFocus =
          document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null;
        activeDialog = nextDialog;
        document.body.classList.add("dialog-open");
        window.requestAnimationFrame(() => {
          const firstControl =
            nextDialog.querySelector<HTMLElement>(tabbableSelector);
          (firstControl ?? nextDialog).focus();
        });
      } else if (!nextDialog && activeDialog) {
        activeDialog = null;
        document.body.classList.remove("dialog-open");
        if (previousFocus?.isConnected) previousFocus.focus();
        previousFocus = null;
      }

      document
        .querySelectorAll<HTMLElement>(tablistSelector)
        .forEach((tablist, listIndex) => {
          tablist.setAttribute("role", "tablist");
          tablist
            .querySelectorAll<HTMLButtonElement>(":scope > button")
            .forEach((tab, tabIndex) => {
              const selected = tab.className.includes("active");
              tab.setAttribute("role", "tab");
              tab.setAttribute("aria-selected", String(selected));
              tab.tabIndex =
                selected ||
                (!tablist.querySelector('[aria-selected="true"]') &&
                  tabIndex === 0)
                  ? 0
                  : -1;
              if (!tab.id) tab.id = `nocx-tab-${listIndex}-${tabIndex}`;
            });
        });

      document
        .querySelectorAll<HTMLButtonElement>(".toggle-switch")
        .forEach((toggle) => {
          toggle.setAttribute("role", "switch");
          toggle.setAttribute(
            "aria-checked",
            String(toggle.classList.contains("toggle-on")),
          );
        });

      document.querySelectorAll<HTMLTableElement>("table").forEach((table) => {
        if (!table.hasAttribute("aria-label")) {
          const heading = table
            .closest("section, article")
            ?.querySelector("h2, h3");
          table.setAttribute(
            "aria-label",
            heading?.textContent?.trim() || "Network operations data",
          );
        }
      });

      document
        .querySelectorAll<HTMLTableRowElement>("tbody tr")
        .forEach((row) => {
          if (!row.querySelector("button") && row.querySelector("svg")) {
            row.tabIndex = 0;
            row.dataset.keyboardRow = "true";
          }
        });

      document.querySelectorAll<HTMLElement>(".toast").forEach((toast) => {
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
      });
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (activeDialog) {
        if (event.key === "Escape") {
          event.preventDefault();
          activeDialog
            .querySelector<HTMLButtonElement>(
              'button[aria-label*="Close"], button[aria-label*="close"]',
            )
            ?.click();
          return;
        }
        if (event.key === "Tab") {
          const controls = Array.from(
            activeDialog.querySelectorAll<HTMLElement>(tabbableSelector),
          ).filter((item) => item.getClientRects().length > 0);
          if (controls.length) {
            const first = controls[0];
            const last = controls[controls.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first.focus();
            }
          }
        }
      }

      const target = event.target instanceof HTMLElement ? event.target : null;
      const tab = target?.closest<HTMLButtonElement>('[role="tab"]');
      if (
        tab &&
        ["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)
      ) {
        const tabs = Array.from(
          tab.parentElement?.querySelectorAll<HTMLButtonElement>(
            ':scope > [role="tab"]',
          ) ?? [],
        );
        const currentIndex = tabs.indexOf(tab);
        const nextIndex =
          event.key === "Home"
            ? 0
            : event.key === "End"
              ? tabs.length - 1
              : (currentIndex +
                  (event.key === "ArrowRight" ? 1 : -1) +
                  tabs.length) %
                tabs.length;
        event.preventDefault();
        tabs[nextIndex]?.focus();
        tabs[nextIndex]?.click();
      }

      const row = target?.closest<HTMLTableRowElement>(
        'tr[data-keyboard-row="true"]',
      );
      if (row && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        row.click();
      }
    };

    const observer = new MutationObserver(enhanceUi);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"],
    });
    document.addEventListener("keydown", handleKeyDown);
    enhanceUi();
    return () => {
      observer.disconnect();
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("dialog-open");
    };
  }, []);

  const navigate = (label: ViewName) => {
    setSidebarOpen(false);
    setActiveView(label);
    const nextHash = `#/${viewConfig[label].slug}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState({ view: label }, "", nextHash);
    }
  };


  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <aside
        id="primary-sidebar"
        className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}
        aria-label="Primary navigation"
      >
        <div className="brand-row">
          <div className="brand-mark" aria-hidden="true">
            <Network size={22} strokeWidth={2.5} />
          </div>
          <div>
            <div className="brand-name">NOCX</div>
            <div className="brand-caption">Network Operations</div>
          </div>
          <button
            className="icon-button sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navGroups.map((group, groupIndex) => (
            <div
              className={`nav-group ${groupIndex === navGroups.length - 1 ? "nav-group-bottom" : ""}`}
              key={group.label ?? `group-${groupIndex}`}
            >
              {group.label && <p className="nav-label">{group.label}</p>}
              {group.items.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  className={`nav-item ${label === activeView ? "nav-item-active" : ""}`}
                  onClick={() => navigate(label)}
                  aria-current={label === activeView ? "page" : undefined}
                >
                  <Icon size={18} strokeWidth={1.8} />
                  <span>{label}</span>
                  {label === "Alerts" && <span className="nav-count">12</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {navHasMore && (
          <div className="nav-scroll-cue" aria-hidden="true">
            More navigation <ChevronDown size={13} />
          </div>
        )}

        <div className="sidebar-foot">
          <span className="status-dot status-dot-green" />
          <div>
            <strong>Collectors online</strong>
            <span>Last sync 12 seconds ago</span>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          className="sidebar-scrim"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="workspace">
        <header className="topbar">
          <div className="header-title-wrap">
            <button
              className="icon-button menu-button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
              aria-expanded={sidebarOpen}
              aria-controls="primary-sidebar"
            >
              <Menu size={21} />
            </button>
            <div>
              <h1>{viewConfig[activeView].title}</h1>
              <p>{viewConfig[activeView].subtitle}</p>
            </div>
          </div>

          <div className="header-actions">
            <div className="search-wrap">
              <Search size={18} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search customers, devices, IPs..."
                aria-label="Search NOCX"
              />
              {query && (
                <button onClick={() => setQuery("")} aria-label="Clear search">
                  <X size={16} />
                </button>
              )}
              {query.trim() && (
                <div
                  className="search-results"
                  role="list"
                  aria-label="Quick search results"
                >
                  <p>Quick results</p>
                  {searchResults.length > 0 ? (
                    searchResults.map((result) => (
                      <button
                        key={`${result.label}-${result.kind}`}
                        onClick={() => {
                          navigate(result.view);
                          setQuery("");
                          setNotice(
                            `${result.label} opened in ${result.view}.`,
                          );
                        }}
                      >
                        {result.label}
                        <span>{result.kind}</span>
                        <ChevronRight size={15} />
                      </button>
                    ))
                  ) : (
                    <div className="search-empty">
                      No quick results. Try a device, customer, site, or module
                      name.
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="live-indicator">
              <span className="live-dot" /> LIVE
            </div>
            <NotificationCenter />
            <button className="avatar" aria-label="Open operator profile">
              SM
            </button>
          </div>
        </header>

        <div
          id="main-content"
          className={`view-stage ${activeView === "Monitoring Profiles" || activeView === "Telemetry Explorer" || activeView === "Alert Policies" || activeView === "Data Lifecycle" || activeView === "Discovery & Dependencies" || activeView === "Platform Resilience" || activeView === "Production Readiness" || activeView === "Commissioning" || activeView === "Credential Assurance" || activeView === "Release Assurance" || activeView === "Commissioning Intake" || activeView === "Commissioning Rehearsal" || activeView === "Cudy Stability Pilot" || activeView === "MikroTik Onboarding" || activeView === "MikroTik Pilot" ? "profile-view" : ""}`}
          tabIndex={-1}
        >
          <Suspense
            fallback={
              <main className="module-loading" role="status">
                <Activity className="refresh-spin" size={22} />
                <span>Loading operational workspace…</span>
              </main>
            }
          >
            {activeView === "MikroTik Pilot" ? (<MikrotikPilot/>) : activeView === "MikroTik Onboarding" ? (<MikrotikOnboarding/>) : activeView === "Cudy Stability Pilot" ? (
              <CudyStabilityPilot />
            ) : activeView === "Commissioning Rehearsal" ? (
              <CommissioningRehearsal />
            ) : activeView === "Commissioning Intake" ? (
              <DeviceIntake />
            ) : activeView === "Release Assurance" ? (
              <ReleaseAssurance />
            ) : activeView === "Credential Assurance" ? (
              <CredentialAssurance />
            ) : activeView === "Commissioning" ? (
              <DeviceCommissioning />
            ) : activeView === "Production Readiness" ? (
              <ProductionReadiness />
            ) : activeView === "Platform Resilience" ? (
              <PlatformResilience />
            ) : activeView === "Discovery & Dependencies" ? (
              <DiscoveryDependencies />
            ) : activeView === "Data Lifecycle" ? (
              <DataLifecycle />
            ) : activeView === "Alert Policies" ? (
              <AlertPolicies />
            ) : activeView === "Telemetry Explorer" ? (
              <TelemetryExplorer />
            ) : activeView === "Monitoring Profiles" ? (
              <MonitoringProfiles />
            ) : activeView === "Collectors" ? (
              <CollectorManagement />
            ) : activeView === "Baselines" ? (
              <BaselineManagement />
            ) : activeView === "Device Onboarding" ? (
              <DeviceOnboarding />
            ) : activeView === "Monitoring Assurance" ? (
              <MonitoringAssurance />
            ) : activeView === "Restoration" ? (
              <RestorationAssurance />
            ) : activeView === "Communications" ? (
              <ServiceCommunications />
            ) : activeView === "Major Incidents" ? (
              <MajorIncidentCommand />
            ) : activeView === "Correlation" ? (
              <EventCorrelation />
            ) : activeView === "Knowledge" ? (
              <KnowledgeBase />
            ) : activeView === "Problems" ? (
              <ProblemManagement />
            ) : activeView === "Reviews" ? (
              <PostIncidentReview />
            ) : activeView === "On Call" ? (
              <OnCallEscalation />
            ) : activeView === "Handover" ? (
              <ShiftHandover />
            ) : activeView === "Maintenance" ? (
              <MaintenanceWindows />
            ) : activeView === "Simulation Lab" ? (
              <TelemetrySimulationLab />
            ) : activeView === "Platform" ? (
              <PlatformFoundation />
            ) : activeView === "Devices" ? (
              <DeviceInventory />
            ) : activeView === "Assets" ? (
              <AssetLifecycle />
            ) : activeView === "IPAM" ? (
              <NetworkIpam />
            ) : activeView === "Circuits" ? (
              <CircuitProviderManagement />
            ) : activeView === "Firmware" ? (
              <FirmwareCompliance />
            ) : activeView === "Provisioning" ? (
              <ServiceProvisioning />
            ) : activeView === "Monitoring" ? (
              <RealTimeMonitoring />
            ) : activeView === "Topology" ? (
              <NetworkTopology />
            ) : activeView === "Performance" ? (
              <PerformanceAnalytics />
            ) : activeView === "Data Sources" ? (
              <DataIntegrations />
            ) : activeView === "Customers" ? (
              <CustomerServiceMonitoring />
            ) : activeView === "Changes" ? (
              <ChangeManagement />
            ) : activeView === "Security" ? (
              <SecurityMonitoring />
            ) : activeView === "Field Work" ? (
              <FieldOperations />
            ) : activeView === "Reports" ? (
              <ReportCenter />
            ) : activeView === "Administration" ? (
              <Administration />
            ) : activeView === "Automation" ? (
              <NetworkAutomation />
            ) : activeView === "Copilot" ? (
              <NocCopilot />
            ) : activeView === "Alerts" || activeView === "Incidents" ? (
              <AlertsIncidents
                key={activeView}
                initialTab={activeView === "Incidents" ? "incidents" : "alerts"}
              />
            ) : (
              <OperationalOverview />
            )}
          </Suspense>
        </div>
      </div>

      {notice && (
        <div className="toast" role="status">
          <CheckCircle2 size={18} />
          {notice}
        </div>
      )}

    </div>
  );
}
