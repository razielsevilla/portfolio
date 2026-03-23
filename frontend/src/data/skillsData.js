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
      { name: "React",        proficiency: 85 },
      { name: "JavaScript (ES6+)", proficiency: 80 },
      { name: "HTML5 / CSS3", proficiency: 90 },
      { name: "Bootstrap 5",  proficiency: 80 },
    ]
  },
  {
    category: "Systems & Data Layer",
    subtitle: "APIs, persistence, business logic",
    icon: "fas fa-server",
    tier: "core",
    items: [
      { name: "Laravel (PHP)", proficiency: 75 },
      { name: "MySQL / SQL",   proficiency: 70 },
      { name: "REST API Design", proficiency: 72 },
      { name: "Git / GitHub", proficiency: 85 },
    ]
  },
  {
    category: "Infrastructure & Cloud",
    subtitle: "Deployment, scaling, ops",
    icon: "fas fa-cloud",
    tier: "extended",
    items: [
      { name: "AWS (EC2, S3, IAM)", proficiency: 55 },
      { name: "Vercel / Netlify",   proficiency: 80 },
      { name: "Postman",            proficiency: 70 },
      { name: "Linux CLI",          proficiency: 50 },
    ]
  },
  {
    category: "Experimental / Research",
    subtitle: "Current learning frontier",
    icon: "fas fa-flask",
    tier: "research",
    items: [
      { name: "TensorFlow.js",     proficiency: 45 },
      { name: "Blockchain (Solidity basics)", proficiency: 40 },
      { name: "Game Design / Narrative Systems", proficiency: 60 },
      { name: "Cryptographic Algorithms", proficiency: 50 },
    ]
  }
];

export default skillsData;