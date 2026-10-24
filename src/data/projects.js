const base = import.meta.env.BASE_URL;

export const webProjects = [
  {
    id: "jarvis",
    title: "J.A.R.V.I.S. Personal AI Ecosystem",
    category: "Autonomous AI • Voice Assistant • Windows Desktop Agency",
    url: `${base}projects/jarvis/`,
    githubUrl: "https://github.com/rahmantec18/JARVIS",
    description: "Inspired by Iron Man, J.A.R.V.I.S. is an autonomous personal AI ecosystem built specifically for Windows. Features an interactive Three.js 3D WebGL holographic Arc Reactor core, real-time voice interaction with British speech synthesis, a <15ms zero-latency reflex router, compound multi-step task execution, Google Gemini 2.5 Flash intelligence, and deep local desktop agency controlling Spotify, WhatsApp, pycaw master audio, and file automation.",
    tags: ["React 19 & Three.js", "Python 3.13 & FastAPI", "Google Gemini 2.5", "Windows Desktop Agency", "Voice Synthesis"],
    badge: "Flagship Desktop AI",
    accentColor: "#00f2fe",
    accentGradient: "from-cyan-500/30 via-blue-600/20 to-teal-400/30",
    previewImage: `${base}images/jarvis-preview.png`
  },
  {
    id: "jjk-cursed-energy",
    title: "Jujutsu Kaisen Cursed Energy",
    category: "Exclusive 3D WebGL & AI Computer Vision Experience",
    url: `${base}projects/jjk-cursed-energy/`,
    description: "Immersive 3D WebGL cursed energy simulation built with Three.js and real-time MediaPipe AI hand tracking. Form authentic hand gestures to unleash Domain Expansions: Infinite Void, Malevolent Shrine, Secret Technique: Hollow Purple, and Reverse Cursed Technique: Red across 20,000 volumetric bloom particles.",
    tags: ["Three.js", "MediaPipe AI", "WebGL 20K Particles", "Unreal Bloom", "Computer Vision"],
    badge: "Exclusive 3D / AI",
    accentColor: "#bb00ff",
    accentGradient: "from-purple-600/30 via-cyan-500/20 to-rose-600/30",
    previewImage: `${base}images/jjk-preview.svg`
  },
  {
    id: "profolio",
    title: "Profolio",
    category: "Web Development & Portfolio Service",
    url: "https://rahmantec18.github.io/rahmantec18-profolio/",
    description: "Web development and portfolio service website designed to elevate digital identity with sleek modern interfaces and robust performance.",
    tags: ["React", "Tailwind CSS", "JavaScript", "GitHub Pages"],
    badge: "Live Service",
    accentColor: "#00f2fe",
    accentGradient: "from-cyan-500/20 to-blue-600/20",
    previewImage: `${base}images/profolio-preview.svg`
  },
  {
    id: "crochet-house",
    title: "Crochet House of Swats",
    category: "Creative E-Commerce Experience",
    url: "https://crochethouseofswats.lovable.app",
    description: "Creative website project delivering a whimsical, elegant digital storefront and brand showcase for handcrafted crochet collections.",
    tags: ["Interactive UI", "Creative Design", "Web App", "Responsive"],
    badge: "Creative Web",
    accentColor: "#ec4899",
    accentGradient: "from-pink-500/20 to-purple-600/20",
    previewImage: `${base}images/crochet-preview.svg`
  },
  {
    id: "profolio-healthcare",
    title: "Profolio Healthcare",
    category: "3D & AI Healthcare Platform",
    url: "https://rahmantec18.github.io/health-care/",
    description: "Premium healthcare website concept featuring a 3D and AI-inspired experience for modern patient management and clinical intelligence.",
    tags: ["3D Experience", "AI UI Concept", "Tailwind CSS", "GitHub Pages"],
    badge: "3D / AI Concept",
    accentColor: "#3b82f6",
    accentGradient: "from-blue-500/20 to-indigo-600/20",
    previewImage: `${base}images/healthcare-preview.svg`
  }
];
