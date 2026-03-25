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
      { name: "React", yoe: "2 YOE" },
      { name: "JavaScript (ES6+)", yoe: "3 YOE" },
      { name: "HTML5 / CSS3", yoe: "3 YOE" },
      { name: "Bootstrap 5", yoe: "2 YOE" },
    ]
  },
  {
    category: "Systems & Data Layer",
    subtitle: "APIs, persistence, business logic",
    icon: "fas fa-server",
    tier: "core",
    items: [
      { name: "Laravel (PHP)", yoe: "2 YOE" },
      { name: "MySQL / SQL", yoe: "3 YOE" },
      { name: "REST API Design", yoe: "2 YOE" },
      { name: "Git / GitHub", yoe: "3 YOE" },
    ]
  },
  {
    category: "Infrastructure & Cloud",
    subtitle: "Deployment, scaling, ops",
    icon: "fas fa-cloud",
    tier: "extended",
    items: [
      { name: "AWS (EC2, S3, IAM)" },
      { name: "Vercel / Netlify" },
      { name: "Postman" },
      { name: "Linux CLI" },
    ]
  },
  {
    category: "Experimental / Research",
    subtitle: "Current learning frontier",
    icon: "fas fa-flask",
    tier: "research",
    items: [
      { name: "TensorFlow.js" },
      { name: "Blockchain (Solidity basics)" },
      { name: "Game Design / Narrative Systems" },
      { name: "Cryptographic Algorithms" },
    ]
  }
];

export default skillsData;