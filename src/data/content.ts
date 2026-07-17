// All content below is sourced directly from Taufiq Nagori's resume.
// Centralizing it here keeps components presentational and makes future edits (e.g. a new project) a one-file change.

export const profile = {
  name: "Taufiq Nagori",
  tagline: "Full Stack Developer | Explainable AI & Agentic AI",
  summary:
    "Computer Science and Engineering graduate with hands-on experience in full-stack development, Explainable AI (XAI), and Agentic AI workflows — currently the sole full-stack developer at a product-based startup.",
  summaryExpanded:
    "I'm a Computer Science and Engineering graduate with hands-on experience in full-stack development, Explainable AI (XAI), and Agentic AI workflows. I've built voice calling agents and WhatsApp chatbot systems using the OpenAI API, Evolution API, and Meta API, and developed ML models with SHAP/LIME explainability for a 1,200+ player sports analytics platform. I'm currently the sole full-stack developer at a product-based startup, managing end-to-end web and mobile application development — the throughline across everything I build is the same: use modern tools deliberately, and make the output usable by a real person, not just accurate on paper.",
  location: "Arvi, Wardha, Maharashtra, India",
  email: "taufiqnagori99@gmail.com",
  phone: "+91-8530306570",
  github: "https://github.com/taufiqnagori",
  linkedin: "https://www.linkedin.com/in/taufiqnagori/",
  resumeFile: "/resume.pdf",
};

export const education = [
  {
    degree: "B.E. Computer Science and Engineering",
    school: "Prof. Ram Meghe College of Engineering and Management, Badnera",
    location: "Amravati, India",
    period: "2023 – 2026",
    score: "CGPA 8.54 / 10",
  },
  {
    degree: "Diploma in Computer Engineering",
    school: "Government Polytechnic Arvi",
    location: "Arvi, India",
    period: "2021 – 2023",
    score: "77.14%",
  },
  {
    degree: "Higher Secondary School (HSC)",
    school: "Municipal Jr. College of Science, Arvi",
    location: "Arvi, India",
    period: "2020 – 2021",
    score: "80.67%",
  },
];

export const skills = {
  "Technical Skills": ["Java", "Python", "JavaScript", "HTML", "CSS", "SQL", "Flutter", "FastAPI", "REST API", "MongoDB"],
  "AI/LLM Tools": ["OpenAI API", "Evolution API", "Meta API", "Agentic Workflow Design"],
  "Tools & Platforms": ["Git", "GitHub", "Streamlit"],
  "Core Areas": ["Full Stack Development", "Data Science", "Machine Learning", "Agentic AI"],
};

export const projects = [
  {
    title: "XAI-Powered Sports Analytics Suite",
    period: "Sep 2025 – May 2026",
    description: [
      "Led a 4-member team to build ML models (Scikit-learn) with 85%+ accuracy on a 1,200+ player dataset.",
      "Applied SHAP & LIME explainability for performance and injury risk prediction, so the reasoning behind a call is visible, not just the call itself.",
    ],
    tech: ["Python", "Scikit-learn", "SHAP", "LIME", "Streamlit"],
    github: "https://github.com/taufiqnagori/xai-football-analytics",
    demo: "#",
  },
  {
    title: "Customer Segmentation using K-Means Clustering",
    period: "Nov 2024 – Jan 2025",
    description: [
      "Applied K-Means clustering on a 50,000+ mall visitor dataset to identify 4–6 customer segments for targeted marketing.",
      "Handled data cleaning, feature selection, and visualization to surface segments that were actually meaningful, not just mathematically distinct.",
    ],
    tech: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
    github: "https://github.com/taufiqnagori/Customer_Segmentation_using_kmeansclustering",
    demo: "#",
  },
  {
    title: "Hotel Management and Restaurant Booking System",
    period: "Nov 2022 – Jan 2023",
    description: [
      "Built a booking system (JavaScript, Java, CSS, HTML) covering hotel rooms, restaurant tables, users, and reservations end to end.",
      "Implemented backend logic for availability tracking, the booking flow, and secure handling of user data.",
    ],
    tech: ["Java", "JavaScript", "HTML", "CSS"],
    github: "https://github.com/taufiqnagori/Hotel_Management_and_Restaurant_Booking_System",
    demo: "#",
  },
];

export const experience = [
  {
    role: "Full Stack Developer",
    company: "Let's Conceive, Amravati",
    period: "Dec 2025 – Present",
    points: [
      "Sole full-stack developer for a product-based startup, owning end-to-end design, development, and deployment of web and mobile applications, including internal workflow automation.",
      "Built voice calling agents and WhatsApp chatbot systems (one-to-many group messaging) using the OpenAI API, Evolution API, and Meta API.",
    ],
  },
];

export const certifications = [
  { name: "Google Cloud Generative AI Leader Track", issuer: "Cloud Career Launchpad" },
  { name: "Data Analytics Virtual Job Simulation", issuer: "Deloitte" },
  { name: "5-Day GenAI Intensive Badge", issuer: "Kaggle" },
  { name: "DBMS Course — Core & Advanced Concepts", issuer: "Scaler" },
  { name: "Java Full Stack Developer Virtual Internship", issuer: "Edu Skills · 10 Weeks" },
  { name: "AI-ML Virtual Internship", issuer: "Google Developers & Edu Skills · 10 Weeks" },
  { name: '"Active 365 Days" Badge', issuer: "LeetCode · 2025" },
];

export const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];
