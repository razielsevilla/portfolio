// src/data/skillsData.js
//
// Categories are framed around ROLE / CONTEXT — not just type.
// This signals systems thinking: you know WHAT the tool is FOR,
// not just that you've heard of it.

const skillsData = [
  {
    category: "Interface Layer",
    subtitle: "What users see and touch",
    icon: "fas fa-layer-group",
    tier: "core",          // 'core' | 'extended' | 'research'
    items: [
      { name: "React", startDate: "2024-03" },
      { name: "JavaScript (ES6+)", startDate: "2023-01" },
      { name: "HTML5 / CSS3", startDate: "2023-01" },
      { name: "Bootstrap 5", startDate: "2024-06" },
    ]
  },
  {
    category: "Systems & Data Layer",
    subtitle: "APIs, persistence, business logic",
    icon: "fas fa-server",
    tier: "core",
    items: [
      { name: "Laravel (PHP)", startDate: "2024-02" },
      { name: "MySQL / SQL", startDate: "2023-03" },
      { name: "REST API Design", startDate: "2024-05" },
      { name: "Git / GitHub", startDate: "2023-01" },
    ]
  },
  {
    category: "Infrastructure & Cloud",
    subtitle: "Deployment, scaling, ops",
    icon: "fas fa-cloud",
    tier: "extended",
    items: [
      { name: "AWS (EC2, S3, IAM)", startDate: "2025-01" },
      { name: "Vercel / Netlify", startDate: "2024-03" },
      { name: "Postman", startDate: "2024-08" },
      { name: "Linux CLI", startDate: "2023-05" },
    ]
  },
  {
    category: "Experimental / Research",
    subtitle: "Current learning frontier",
    icon: "fas fa-flask",
    tier: "research",
    items: [
      { name: "TensorFlow.js", startDate: "2025-09" },
      { name: "Blockchain", startDate: "2025-11" },
      { name: "Game Design", startDate: "2025-02" },
      { name: "Cryptography", startDate: "2025-09" },
    ]
  }
];

export default skillsData;