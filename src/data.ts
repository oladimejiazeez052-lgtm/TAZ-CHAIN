import { Project } from "./types";

export const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: "educhain",
    title: "EduChain School Management Portal",
    category: "Platforms",
    categoryLabel: "Education",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9t-QAUAqcOLXwWLUJXvAy8hkWmugYO_zAefGKgvnt2g68hOZtnHllKohbkNtjuj5MEZqVcxXNsnUFKQOwMSOKzzW4e1VI0xgt1uT4V73k9dkSdx1fJXENoU2CRh9zuGR-XDA4GDaxNq-8SOcUig-GMb01bNxvsHgmveYRYWfxw6T8JQG8FF25tph4zhCbvJP0t8Gftj6wuLXfr7nqXll6HTS5qicuSdXLwaUvrMf6OM8o49j-dxle3g3QIRUWlOXfQbz76BolAw",
    techStack: ["Laravel", "Vue", "PostgreSQL"],
    description: "A comprehensive, high-performance web platform designed to unify administrative workflows, student tracking, and institutional communication into a single, seamless digital environment.",
    resultsSummary: "40% administrative efficiency improvement and 99.9% uptime.",
    client: "EduCore Systems",
    timeline: "6 Months",
    role: "Full-stack Dev, UI/UX, Cloud Infra",
    challenge: "Prior to EduChain, administrators relied on six disparate software solutions to manage enrollment, grading, scheduling, and billing. This fragmentation led to massive data inconsistencies, delayed reporting, and a frustrating experience for staff and parents alike. The legacy architecture was brittle, unable to scale with the institution's rapid growth.",
    solution: "We engineered a monolithic yet highly modular cloud-based portal. By abstracting the core business logic into a robust API layer, we unified all administrative tools under a single, intuitive interface built on React.",
    solutionPoints: [
      "Centralized Data Lake for real-time syncing.",
      "Role-Based Access Control (RBAC) architecture.",
      "Automated financial reconciliation engine."
    ],
    metrics: [
      { label: "Reduction in Admin Time", value: "40%" },
      { label: "System Uptime Achieved", value: "99.9%" },
      { label: "Faster Report Generation", value: "2.5x" },
      { label: "Active Daily Users", value: "10k+" }
    ],
    testimonial: {
      quote: "TAZ CHAIN didn't just build software; they re-engineered our entire operational methodology. Their technical precision and strategic insight delivered a platform that is robust, scalable, and remarkably intuitive.",
      author: "Sarah Jenkins",
      role: "CTO, EduCore Systems",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXKacaJBI8adghdohUC9_RLtx8qJDVTZqfPNVOrdw5OLaGT7pmfL7J4rvRiGGp8A0sLJKM69AdbBOaYjCSeQ8n5IfLPAhYUIBiUE-bBq4Z-_epGp4dA4WR-wg39eeE-dju6d-mPu8VJlQIPfcwyPIqkyTFWLNONdCExctZyw24b7MWhOlTbJrzv3MeMFmuryD73L0gJTqnjWG6JR5xE2I981g_quGswP-bqh7Q9BPu3XNfqd8cMgtufXzPu13Ba0AkV06Xc8ZOJw"
    }
  },
  {
    id: "global-finance",
    title: "Global Finance Corp website",
    category: "Web Apps",
    categoryLabel: "Web Presence",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXu1XKtfm9VJOWXttLY_k6TVJ11b1Zfq8hQmbc2jyRoRtm2kOcBLCyFqtbJcnwmz7FNlU68lysuLMI9-vVfXD9zQ3w-AIMbQpj2YvPhKhNXKSG5bya6c9_MGIGRkZZz_QWLSeJ6bxLnWyWcT8iQEhSDIoSkCEQAWg8T2mTdB01ZjbO6oiZU9KmG4lhIPhacRl6UCSfoPfc4UK-q_oV9aP1KobabfXPaXHfXp11aEkwvJ_gu6k9HZvFskuWkJ_d38peVf9_R7kJ2Jpw",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    description: "A high-performance corporate website engineered for a multinational financial institution, focusing on security, accessibility, and investor relations.",
    resultsSummary: "40% increase in lead conversion, sub-second load times.",
    client: "Global Finance Corp",
    timeline: "3 Months",
    role: "Lead Frontend Engineer & Performance Architect",
    challenge: "Global Finance Corp needed to overhaul their international digital presence to support high peak traffic, multi-language localization, and strictly secure data pipelines without compromising on lightning-fast speed.",
    solution: "We deployed an optimized Next.js server-side rendered application backed by edge caching. Built using high-fidelity Tailwind components to ensure modularity and maximum responsiveness.",
    solutionPoints: [
      "Edge-cached dynamic SSR architecture.",
      "Fully semantic, localized markdown components.",
      "Enterprise-grade static route optimization."
    ],
    metrics: [
      { label: "Increase in Lead Conversion", value: "+40%" },
      { label: "Core Web Vitals Index", value: "98/100" },
      { label: "Page Load Velocity", value: "<0.4s" },
      { label: "Security Incidents", value: "0" }
    ],
    testimonial: {
      quote: "TAZ CHAIN over-engineered a solution that simply works under intense high peak constraints. Our digital conversion metrics saw records break in the first calendar month.",
      author: "Marcus Vance",
      role: "VP of Engineering, Global Finance Corp",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXKacaJBI8adghdohUC9_RLtx8qJDVTZqfPNVOrdw5OLaGT7pmfL7J4rvRiGGp8A0sLJKM69AdbBOaYjCSeQ8n5IfLPAhYUIBiUE-bBq4Z-_epGp4dA4WR-wg39eeE-dju6d-mPu8VJlQIPfcwyPIqkyTFWLNONdCExctZyw24b7MWhOlTbJrzv3MeMFmuryD73L0gJTqnjWG6JR5xE2I981g_quGswP-bqh7Q9BPu3XNfqd8cMgtufXzPu13Ba0AkV06Xc8ZOJw"
    }
  },
  {
    id: "logistics-command",
    title: "Logistics Command Center",
    category: "Dashboards",
    categoryLabel: "Dashboard",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNZRkXesKasiqstvH4YAJ7BYeg6eEwjTYVVUQIGNYrru3BJSzXTE4GxMc0FU2cUcNHM9LNyBByGSCMygxRK1Q1HhHdMiyKVm-qiApR0LrKYjLV7ZMjJHv4kDvjvPHzQFwUY37qAYLI4jnG6avXkmT7-5fl2L6r1A2oQZv5JS7lei2GzaczLJyxGTE-dJw5Xxx3an19ylofDVQrU3uxXzP4DyU20EqCZ6u2t-5wk9XPnL18zWzFaYGFPDGglEQEa_6KAprgApHgEQ",
    techStack: ["React", "WebSockets", "D3.js"],
    description: "Real-time supply chain monitoring dashboard processing thousands of events per second with high-fidelity visual data mapping.",
    resultsSummary: "Reduced latency of route operations and dispatching dispatch lag fully.",
    client: "FastCargo Logistics",
    timeline: "4 Months",
    role: "Technical Lead / Architect",
    challenge: "Monitoring regional vehicle dispatching and package routes across 8 states was heavily lagging due to asynchronous batch processing.",
    solution: "Implemented full real-time event brokers connecting to React component subscribers using native WebSockets, visualization mapped dynamically with lightweight D3 widgets.",
    solutionPoints: [
      "Sub-millisecond update streams.",
      "Custom rendering logic using canvas-accelerated D3 graphs.",
      "Fault-tolerant buffer strategies."
    ],
    metrics: [
      { label: "Dispatch Latency Reduction", value: "92%" },
      { label: "Simultaneous route tracks", value: "10,000+" },
      { label: "Daily Active Dispatchers", value: "1,200+" },
      { label: "Updates Streamed", value: "60fps" }
    ],
    testimonial: {
      quote: "The real-time synchronization is pristine. Our dispatch latency dropped immediately from minutes to milliseconds.",
      author: "Aveline Ross",
      role: "VP of Logistics, FastCargo Systems",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXKacaJBI8adghdohUC9_RLtx8qJDVTZqfPNVOrdw5OLaGT7pmfL7J4rvRiGGp8A0sLJKM69AdbBOaYjCSeQ8n5IfLPAhYUIBiUE-bBq4Z-_epGp4dA4WR-wg39eeE-dju6d-mPu8VJlQIPfcwyPIqkyTFWLNONdCExctZyw24b7MWhOlTbJrzv3MeMFmuryD73L0gJTqnjWG6JR5xE2I981g_quGswP-bqh7Q9BPu3XNfqd8cMgtufXzPu13Ba0AkV06Xc8ZOJw"
    }
  },
  {
    id: "aura-retail",
    title: "Aura Retail Platform",
    category: "E-Commerce",
    categoryLabel: "E-Commerce",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBpueKXZAmyQ9eI63QbtC7gc5cl051omxvDl4k5_o6M93Q-MUmToPJuCVYrrH-xrzfB9g1_mp7HVDb_zYAeVU2k9FRDgI8Y0lriOazKa-LscbdMyfPjB_eb9ZwZHzdXxVmLyhLrAjuCinCh-kiTGga089QtS6tM5i1SbZ9Lmg8scKC9qSPPhAgCvNK3W1IKsqNKblOfkVjBLJ9h0I1XIex1M10VaWSKNMc6uoAf3l98y_BMvTDjichFsbdhMnkjfpPbPz34UFa7hg",
    techStack: ["Shopify Plus", "Vue.js", "GraphQL"],
    description: "Headless e-commerce architecture delivering a seamless, lightning-fast shopping experience across all devices.",
    resultsSummary: "Heavily optimized checkout flow increasing overall conversion indexes.",
    client: "Aura Luxury Brands",
    timeline: "5 Months",
    role: "Senior Full-Stack Architect",
    challenge: "Scaling catalog filters and ensuring fluid checkouts during viral launch windows without database gridlocks.",
    solution: "Re-architected client shop using an headless custom GraphQL pipeline running decoupled Vue components, improving search and filter latency.",
    solutionPoints: [
      "Decoupled headless retail design.",
      "GraphQL server-side caching layer.",
      "Instant product filter algorithms."
    ],
    metrics: [
      { label: "Checkout Conversion Rate", value: "+28%" },
      { label: "Search & Filter Latency", value: "<15ms" },
      { label: "Monthly Brand Scale", value: "1.2M+" },
      { label: "SEO Visibility Index", value: "99/100" }
    ],
    testimonial: {
      quote: "Converting our storefront into a headless Aura platform was a game-changer. Massive traffic spikes barely register on CPU usage now.",
      author: "Emil Novak",
      role: "E-commerce Director, Aura Luxury",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXKacaJBI8adghdohUC9_RLtx8qJDVTZqfPNVOrdw5OLaGT7pmfL7J4rvRiGGp8A0sLJKM69AdbBOaYjCSeQ8n5IfLPAhYUIBiUE-bBq4Z-_epGp4dA4WR-wg39eeE-dju6d-mPu8VJlQIPfcwyPIqkyTFWLNONdCExctZyw24b7MWhOlTbJrzv3MeMFmuryD73L0gJTqnjWG6JR5xE2I981g_quGswP-bqh7Q9BPu3XNfqd8cMgtufXzPu13Ba0AkV06Xc8ZOJw"
    }
  },
  {
    id: "luxestays-booking",
    title: "LuxeStays Booking Engine",
    category: "Platforms",
    categoryLabel: "Hospitality",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyfWS0LkATLcbO4IeDVRpH40eDxH23ktfGHeolpbFLMlnPiH6Se_n3ipZQgePY-mH8rzUyyDVS42fdbssL-g3jQV4NnUGguUhzFDlGohnWChmOB0gRmNxNCNZ0JHLEZu4EeHML-_Z4rCQJAsbFXCccehZX1ED8xAP44YDwxq_AaKGfYXcy_qsV7CEtU80evgbwrWtSWwwQu4xcmDI_AcaVTedoky5ehtNX-_cS013Qheyp93KIQOdgzddbwOqn20OSye2G6c0p6g",
    techStack: ["React", "Node.js", "Stripe Integration"],
    description: "A high-conversion booking engine integrating with legacy PMS systems while delivering a modern, frictionless user experience.",
    resultsSummary: "Boosted direct booking conversion ratios by 25% organically.",
    client: "LuxeStays Hospitality Group",
    timeline: "5 Months",
    role: "Payments Integrator & Consultant",
    challenge: "Stale reservations and multi-currency conflicts during high-season checkouts in legacy Property Management Systems.",
    solution: "Implemented atomic reservation locks on node backend and bound securely to Stripe webhook events to guarantee consistent multi-state updates.",
    solutionPoints: [
      "Atomic lock reservation architecture.",
      "Stripe secure automatic checkout integration.",
      "Frictionless legacy sync mapping."
    ],
    metrics: [
      { label: "Increase in Reservations", value: "+25%" },
      { label: "Sync System Accuracy", value: "100%" },
      { label: "Payment Checkout Time", value: "<15s" },
      { label: "Double-booking incidence", value: "0%" }
    ],
    testimonial: {
      quote: "We saw direct booking conversions climb instantly. The platform cut off middle-man commission fees beautifully.",
      author: "Clara Vance",
      role: "CLO, LuxeStays Group",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXKacaJBI8adghdohUC9_RLtx8qJDVTZqfPNVOrdw5OLaGT7pmfL7J4rvRiGGp8A0sLJKM69AdbBOaYjCSeQ8n5IfLPAhYUIBiUE-bBq4Z-_epGp4dA4WR-wg39eeE-dju6d-mPu8VJlQIPfcwyPIqkyTFWLNONdCExctZyw24b7MWhOlTbJrzv3MeMFmuryD73L0gJTqnjWG6JR5xE2I981g_quGswP-bqh7Q9BPu3XNfqd8cMgtufXzPu13Ba0AkV06Xc8ZOJw"
    }
  }
];
