import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const projects = [
  {
    title: "Aether — Modular E-Ink Smart Display",
    summary:
      "A low-power, swappable e-ink panel for calendars, dashboards and art.",
    description:
      "Aether is a wall-mounted e-ink display built around hot-swappable face plates. The core module handles Wi-Fi, scheduling and rendering while magnetic frames let you change size and finish in seconds. Runs for months on a single charge thanks to a custom power-gated MCU board.\n\nThis is currently a hardware mockup with 3D-printed enclosures and a breadboarded driver.",
    category: "hardware",
    stage: "mockup",
    tags: "e-ink,low-power,iot,3d-printed",
    featured: true,
    voteCount: 0,
  },
  {
    title: "Pulse — Realtime Team Mood Analytics",
    summary: "Privacy-first sentiment dashboards for distributed teams.",
    description:
      "Pulse aggregates anonymous, opt-in signals from chat and standups to surface burnout risk and momentum trends — without ever reading message content. Everything runs on-device with federated aggregation.\n\nA working prototype exists with a Next.js dashboard and a local inference engine.",
    category: "software",
    stage: "prototype",
    tags: "analytics,privacy,ml,saas",
    featured: false,
    voteCount: 0,
  },
  {
    title: "Forge CLI — Instant Dev Environments",
    summary:
      "One command to spin up reproducible, containerized project sandboxes.",
    description:
      "Forge reads a single manifest and provisions a fully-configured dev environment with services, seed data and tunneled URLs. Think devcontainers, but instant and language-agnostic.\n\nShipped and in daily use across several internal projects.",
    category: "software",
    stage: "completed",
    tags: "devtools,cli,containers",
    featured: false,
    voteCount: 0,
  },
  {
    title: "Halo — Open Source Smart Ring",
    summary:
      "A hackable sleep & recovery ring with a fully documented API.",
    description:
      "Halo is an open hardware smart ring tracking heart-rate variability, temperature and motion. Unlike closed competitors, every sensor stream is exposed over BLE with open firmware you can flash yourself.\n\nEarly idea stage — sensor selection and PCB layout are being explored.",
    category: "hardware",
    stage: "idea",
    tags: "wearable,open-hardware,ble,health",
    featured: false,
    voteCount: 0,
  },
  {
    title: "Canvas — AI Whiteboard for Architects",
    summary:
      "Sketch system diagrams and get instant infra-as-code suggestions.",
    description:
      "Canvas turns freehand architecture sketches into editable diagrams and proposes Terraform / Pulumi scaffolding. Drag a box labelled 'queue' and it suggests the right managed service for your cloud.\n\nInteractive design mockup with clickable Figma-style flows.",
    category: "software",
    stage: "mockup",
    tags: "ai,diagramming,infra,design",
    featured: true,
    voteCount: 0,
  },
  {
    title: "Drift — Desktop CNC for Small Spaces",
    summary: "A foldable, apartment-friendly CNC mill that stows like a laptop.",
    description:
      "Drift is a compact CNC platform that folds flat for storage and enforces a sealed cutting envelope for dust and noise control. Targeted at makers without a dedicated workshop.\n\nCurrently a working prototype milling soft materials.",
    category: "hardware",
    stage: "prototype",
    tags: "cnc,maker,fabrication",
    featured: false,
    voteCount: 0,
  },
];

async function main() {
  const count = await prisma.project.count();
  if (count > 0) {
    console.log(`Database already has ${count} projects — skipping seed.`);
    return;
  }
  for (const p of projects) {
    await prisma.project.create({ data: p });
  }
  console.log(`Seeded ${projects.length} sample projects.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
