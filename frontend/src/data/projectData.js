// src/data/projectData.js
//
// status field drives the card's UX in Projects.js:
//   "live"        — has both liveLink and repoLink, show both
//   "in-progress" — repo private, no live demo yet; show "Case Study" CTA
//   "case-study"  — no public repo but has a written writeup link
//   "archived"    — shipped but deprecated; show repo only

const projectData = [
  {
    id: 1,
    title: "Kumpirma",
    tagline: "AI-enhanced blockchain document authentication",
    description: "Designed a signature verification framework combining a trained image-classifier (TensorFlow.js) with an Ethereum-compatible hash ledger. Documents are fingerprinted on upload; tamper detection runs client-side without exposing the original file to the server.",
    tech: ["TensorFlow.js", "Blockchain", "React", "Laravel", "Cryptography"],
    status: "in-progress",
    liveLink: null,
    repoLink: null,
    highlight: true,  // featured / pinned
  },
  {
    id: 2,
    title: "Toka",
    tagline: "Gamified household economy & task management",
    description: "Built for a Technopreneurship course. Modeled a virtual coin economy where household tasks yield tokens redeemable for privileges. Used a state machine for task lifecycle (open → claimed → verified → rewarded) to prevent race conditions between concurrent family members.",
    tech: ["React", "Laravel", "MySQL", "Gamification", "State Machines"],
    status: "in-progress",
    liveLink: null,
    repoLink: null,
    highlight: true,
  },
  {
    id: 3,
    title: "RedQuest",
    tagline: "Emergency blood donation logistics platform",
    description: "On-demand matching platform connecting blood requestors with potential donors in real-time. Designed a geo-proximity query (haversine on MySQL) to rank donors by distance, urgency tier, and compatibility. Built the full Laravel API and React frontend.",
    tech: ["React", "Laravel", "MySQL", "Geolocation", "UI/UX"],
    status: "in-progress",
    liveLink: null,
    repoLink: null,
    highlight: false,
  },
  {
    id: 4,
    title: "SonicPath",
    tagline: "Phonics adventure game for learners with dyslexia",
    description: "Educational game prototype exploring how interactive gameplay mechanics (audio-first UX, progressive disclosure, immediate feedback loops) can replace rote-reading drills for early-literacy learners. Designed as a Software Engineering project with formal SRS documentation.",
    tech: ["Game Design", "Software Engineering", "HTML5", "JavaScript"],
    status: "in-progress",
    liveLink: null,
    repoLink: null,
    highlight: false,
  },
  {
    id: 5,
    title: "Prioritask",
    tagline: "Algorithmic school-work scheduler",
    description: "Applied complexity analysis (comparing greedy, dynamic programming, and comparator-sort approaches) to build an optimal task-prioritization engine for student workloads. Evaluated each approach's time/space trade-offs in the writeup.",
    tech: ["Algorithms", "Complexity Analysis", "JavaScript"],
    status: "case-study",
    liveLink: null,
    repoLink: "https://github.com/ziesevilla",  // link to profile; swap when repo is public
    highlight: false,
  },
  {
    id: 6,
    title: "LifeInPixels",
    tagline: "Pixel-mood journal with finance & media trackers",
    description: "Personal productivity app using a year-map visualization (inspired by pixel-art color grids) to log daily mood, spending, and media consumption. All data in localStorage — deliberately offline-first and zero-backend.",
    tech: ["React", "JavaScript", "Data Visualization", "LocalStorage"],
    status: "in-progress",
    liveLink: null,
    repoLink: null,
    highlight: false,
  },
  {
    id: 7,
    title: "Message Encryption Algorithm",
    tagline: "Stream cipher implementation study",
    description: "Implemented a custom XOR-based stream cipher and compared it against RC4 for throughput and entropy distribution. Written as a cryptography self-study; includes analysis of key-scheduling weaknesses.",
    tech: ["Cryptography", "JavaScript", "Algorithms"],
    status: "archived",
    liveLink: null,
    repoLink: "https://github.com/ziesevilla",
    highlight: false,
  },
];

export default projectData;