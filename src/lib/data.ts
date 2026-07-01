export const ABOUT_DATA = {
  name: "Sajith Bandara",
  role: "Full Stack Developer & AI Enthusiast",
  tagline: "Full-stack developer and AI enthusiast from Sri Lanka, building robust web applications with a focus on quality assurance.",
  bio: [
    "I am a results-driven Management Information Systems  undergraduate with hands-on experience in full-stack web development and a strong passion for Artificial Intelligence. Blending technical depth with a keen eye for Software Quality Assurance (SQA), I consistently focus on delivering clean, maintainable, and highly reliable applications.",
    "My core technical stack is built around MERN, Next.js, and JavaScript, complemented by a solid foundation in Java basics. Whether crafting polished digital platforms, exploring AI-driven solutions, or implementing rigorous testing methodologies, I am actively seeking opportunities to contribute to impactful products and grow alongside talented engineering teams.",
  ],
};

export const SKILLS_DATA = [
  { name: "JavaScript" },
  { name: "TypeScript" },
  { name: "React" },
  { name: "Next.js" },
  { name: "Node.js" },
  { name: "Express.js" },
  { name: "MySQL" },
  { name: "MongoDB" },
  { name: "Tailwind CSS" },
  { name: "HTML / CSS" },
  { name: "Git & GitHub" },
  { name: "REST APIs" },
];

export const GITHUB_USERNAME = "sajith23420";

export const PROJECT_CATEGORIES = {
  FEATURED: ["bonavista-colombo", "cv-builder"], // cv-builder may be missing on GitHub currently
  FULL_STACK: ["kv-audio-frontend", "post-office-application", "forever-frontend"],
};

// Extended metadata mapped by github slug (lowercased)
export const PROJECT_ENHANCEMENTS: Record<string, any> = {
  "bonavista-colombo": {
    title: "Bonavista Colombo",
    thumbnail: "/placeholder.jpg",
    gallery: ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"],
    overview: "A premium website built for Bonavista Colombo, featuring modern design and animations.",
    features: ["Responsive Design", "Premium Animations", "Contact Form Integration", "SEO Optimized"],
    challenges: "Creating smooth, performant animations that work perfectly across all devices while maintaining a high-end feel.",
  },
  "cv-builder": {
    title: "CV Builder",
    thumbnail: "/placeholder.jpg",
    gallery: ["/placeholder.jpg", "/placeholder.jpg", "/placeholder.jpg"],
    overview: "An interactive application that helps users generate professional resumes quickly.",
    features: ["Live Preview", "Multiple Templates", "Export to PDF", "Customizable Sections"],
    challenges: "Handling complex state management for real-time document rendering and PDF generation.",
    // Mock repo data in case it's not on GitHub yet
    mockData: {
      id: 999999,
      name: "cv-builder",
      description: "Interactive CV Builder application",
      html_url: "https://github.com/sajith23420/cv-builder",
      homepage: "",
      topics: ["react", "typescript", "tailwind"],
      stargazers_count: 0,
      language: "TypeScript"
    }
  },
  "kv-audio-frontend": {
    title: "KV-Audio Rentals Platform",
    thumbnail: "/placeholder.jpg",
    gallery: ["/placeholder.jpg", "/placeholder.jpg"],
    overview: "A full-stack rental platform for audio equipment, managing inventory, bookings, and payments.",
    features: ["Inventory Management", "Booking System", "Admin Dashboard", "User Authentication"],
    challenges: "Building a robust date-conflict resolution system for the booking engine.",
  },
  "post-office-application": {
    title: "Post Office Management System",
    thumbnail: "/placeholder.jpg",
    gallery: ["/placeholder.jpg", "/placeholder.jpg"],
    overview: "A comprehensive management system for tracking parcels, handling staff, and managing deliveries.",
    features: ["Parcel Tracking", "Staff Roles", "Reporting Analytics", "Route Optimization"],
    challenges: "Designing a normalized database schema to handle thousands of concurrent tracking updates.",
  },
  "forever-frontend": {
    title: "Forever – E-Commerce Web App",
    thumbnail: "/placeholder.jpg",
    gallery: ["/placeholder.jpg", "/placeholder.jpg"],
    overview: "A complete e-commerce platform with a customer storefront and dedicated admin panel.",
    features: ["Product Cart", "Secure Checkout", "Admin Panel", "Order Management"],
    challenges: "Implementing secure authentication and managing complex cart state across sessions.",
  },
  "weather-app": {
    title: "Weather Dashboard",
    thumbnail: "/placeholder.jpg",
    gallery: ["/placeholder.jpg"],
    overview: "A sleek weather application fetching real-time data.",
    features: ["Location Search", "Dynamic Icons", "7-Day Forecast"],
    challenges: "Integrating third-party APIs and handling varied weather data formats.",
  }
};

export const EXPERIENCE_DATA = [
  {
    title: "Software Engineering Intern",
    company: "Sri Lanka Tea Board",
    date: "2025 – Present",
    description:
      "Designed and developed the Tea Land Registration System, a full-stack web application used to digitize tea land registration workflows. Built the React frontend with role-based dashboards and implemented the Node.js/MySQL backend with RESTful APIs for registration, inquiry management, and approval processing.",
  },
  {
    title: "BSc (Hons) in Software Engineering",
    company: "NSBM Green University",
    date: "2022 – Present",
    description:
      "Pursuing a Bachelor's degree in Software Engineering with coursework in data structures, algorithms, database systems, and software project management. Actively building real-world projects and contributing to open-source.",
  },
];

export const CONTACT_DATA = {
  email: "sajithbandara23420@gmail.com",
  linkedin: "www.linkedin.com/in/sajith-bandara-92a2652b1",
  github: "https://github.com/sajith23420",
};
