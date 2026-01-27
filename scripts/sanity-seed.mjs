import { createClient } from "@sanity/client";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || "production";
const apiVersion = process.env.SANITY_API_VERSION || "2024-01-01";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  throw new Error(
    "SANITY_PROJECT_ID and SANITY_API_TOKEN are required to seed data."
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const docs = [
  // Hero
  {
    _id: "hero",
    _type: "hero",
    title: "Customer Success, Career Coaching & Expert Writing",
    description: "From landing your dream job to mastering customer success, I provide expert consulting, strategic guidance, and powerful writing services. Elevate your career, refine your brand, and connect with the right opportunities—let's make your success story unforgettable!",
    name: "Srinidhi Narayana",
  },

  // LinkedIn Section
  {
    _id: "section-linkedin",
    _type: "section",
    sectionType: "LinkedIn",
    title: "LinkedIn Profile Optimization",
    subtitle: "Stand Out on LinkedIn",
    description: "Transform your LinkedIn presence with a professionally optimized profile that attracts recruiters and showcases your expertise.",
  },
  {
    _id: "feature-linkedin-1",
    _type: "feature",
    featureType: "linkedin",
    title: "Professional Headline & Summary",
    description: "Craft a compelling headline and summary that captures attention and showcases your expertise.",
    icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    order: 1,
  },
  {
    _id: "feature-linkedin-2",
    _type: "feature",
    featureType: "linkedin",
    title: "Experience & Achievements",
    description: "Highlight your key accomplishments and experience with impactful metrics and results.",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    order: 2,
  },
  {
    _id: "feature-linkedin-3",
    _type: "feature",
    featureType: "linkedin",
    title: "SEO & Keywords",
    description: "Optimize your profile with industry-relevant keywords to improve visibility in recruiter searches.",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    order: 3,
  },

  // Resume Section
  {
    _id: "section-resume",
    _type: "section",
    sectionType: "Resume",
    title: "Professional Resume Writing",
    subtitle: "Stand Out with a Professionally Crafted Resume",
    description: "Get a professionally written resume that highlights your achievements and helps you stand out in the job market.",
  },
  {
    _id: "feature-resume-1",
    _type: "feature",
    featureType: "resume",
    title: "ATS-Optimized Format",
    description: "Ensure your resume passes through Applicant Tracking Systems with an optimized format and relevant keywords.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    order: 1,
  },
  {
    _id: "feature-resume-2",
    _type: "feature",
    featureType: "resume",
    title: "Achievement-Focused Content",
    description: "Showcase your impact with quantifiable achievements and compelling success stories.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    order: 2,
  },
  {
    _id: "feature-resume-3",
    _type: "feature",
    featureType: "resume",
    title: "Industry-Specific Keywords",
    description: "Incorporate relevant industry keywords to match job requirements and improve visibility.",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    order: 3,
  },
  {
    _id: "feature-resume-4",
    _type: "feature",
    featureType: "resume",
    title: "Professional Formatting",
    description: "Clean, modern design that's easy to read and highlights your key qualifications.",
    icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
    order: 4,
  },

  // Coaching Section
  {
    _id: "section-coaching",
    _type: "section",
    sectionType: "Coaching",
    title: "Customer Success Consulting",
    subtitle: "Customer Success",
    description: "Personalized guidance to accelerate your career growth in Customer Success. Get expert advice on breaking into the field and developing effective strategies.",
  },
  {
    _id: "feature-coaching-1",
    _type: "feature",
    featureType: "coaching",
    title: "Break into Customer Success",
    description: "Develop a clear roadmap for your career growth",
    order: 1,
  },
  {
    _id: "feature-coaching-2",
    _type: "feature",
    featureType: "coaching",
    title: "Customer Success Plans for Small Businesses",
    description: "Create effective customer success strategies",
    order: 2,
  },

  // Job Search Section
  {
    _id: "section-jobsearch",
    _type: "section",
    sectionType: "JobSearch",
    title: "Job Search Strategy and 1:1 Coaching",
    subtitle: "Land Your Dream Role",
    description: "Navigate your job search with confidence using my proven strategies. I'll help you target the right opportunities, optimize your applications, and prepare for interviews effectively.",
  },
  {
    _id: "feature-jobsearch-1",
    _type: "feature",
    featureType: "jobSearch",
    title: "Personalized Job Search Strategy",
    description: "Tailored guidance to help you navigate job boards, networking, and direct outreach to potential employers.",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    order: 1,
  },
  {
    _id: "feature-jobsearch-2",
    _type: "feature",
    featureType: "jobSearch",
    title: "Interview Preparation",
    description: "Master behavioral and technical interviews with comprehensive preparation and mock interview sessions.",
    icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    order: 2,
  },
  {
    _id: "feature-jobsearch-3",
    _type: "feature",
    featureType: "jobSearch",
    title: "Application Optimization",
    description: "Learn how to tailor your applications, follow up effectively, and stand out in the application process.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    order: 3,
  },

  // Why Me Section
  {
    _id: "section-whyme",
    _type: "section",
    sectionType: "WhyMe",
    title: "Why choose me?",
    description: "Expert guidance for your career growth",
  },
  {
    _id: "feature-whyme-1",
    _type: "feature",
    featureType: "whyMe",
    title: "Dedicated Support",
    description: "Your success is my priority! I'm dedicated to providing the tools, advice, and mentorship needed to help you reach your full potential and achieve your goals.",
    icon: "M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0",
    order: 1,
  },
  {
    _id: "feature-whyme-2",
    _type: "feature",
    featureType: "whyMe",
    title: "Continuous Guidance",
    description: "I'm committed to guiding you every step of the way, offering continuous support, resources, and regular check-ins to keep you motivated and on track.",
    icon: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z",
    order: 2,
  },
  {
    _id: "feature-whyme-3",
    _type: "feature",
    featureType: "whyMe",
    title: "Comprehensive Services",
    description: "From professional resume writing to LinkedIn optimization, interview coaching, and customer success consulting, I offer a full suite of services designed to help you thrive in your career and achieve your professional goals.",
    icon: "M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75",
    order: 3,
  },
  {
    _id: "feature-whyme-4",
    _type: "feature",
    featureType: "whyMe",
    title: "Proven Experience",
    description: "With 4+ years of experience in Customer Success and firsthand experience navigating the job application and interview process, I've learned from my own mistakes. Through conversations with many professionals, I've identified the key areas where people often need to tweak their approach to succeed.",
    icon: "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z",
    order: 4,
  },

  // How It Works Section
  {
    _id: "section-howitworks",
    _type: "section",
    sectionType: "HowItWorks",
    title: "How it works?",
    subtitle: "Simple Steps to Success",
    description: "A simple process to get you started on your journey",
  },
  {
    _id: "feature-howitworks-1",
    _type: "feature",
    featureType: "howItWorks",
    title: "Reach out with your needs",
    description: "Let's start the conversation!",
    subtitle: "Reach out to me and tell me what you're looking for. Whether it's career guidance, resume writing, LinkedIn help, or customer success consulting, I'll ask a few questions to understand your specific needs and challenges. I'll get back to you quickly with the next steps.",
    order: 1,
  },
  {
    _id: "feature-howitworks-2",
    _type: "feature",
    featureType: "howItWorks",
    title: "Action plan and pricing",
    description: "Create a personalized plan for your success",
    subtitle: "After understanding your needs, I will present a customized action plan for you, along with clear pricing for the services you require. You'll then choose the plan that works best for you, and once you're ready, you can make the payment to get started.",
    order: 2,
  },
  {
    _id: "feature-howitworks-3",
    _type: "feature",
    featureType: "howItWorks",
    title: "Implementation",
    description: "Let's get to work",
    subtitle: "After payment, I'll begin working on the service you've selected, whether it's crafting your resume, optimizing your LinkedIn profile, or developing a customer success strategy. You'll receive quality work that aligns with your goals and expectations.",
    order: 3,
  },
  {
    _id: "feature-howitworks-4",
    _type: "feature",
    featureType: "howItWorks",
    title: "Ongoing Support and Accountability",
    description: "I'm here for you every step",
    subtitle: "I believe in your long-term success. After the initial delivery, I'll provide continuous support, check-ins, and any necessary adjustments to ensure that you stay on track and feel confident in your progress.",
    order: 4,
  },
  {
    _id: "feature-howitworks-5",
    _type: "feature",
    featureType: "howItWorks",
    title: "Feedback and Revisions",
    description: "Perfecting your results",
    subtitle: "Your experience and satisfaction matters the most to me. I offer up to 3 revisions to make sure everything is just right. We'll work together to refine the final product until it perfectly reflects your vision and goals.",
    order: 5,
  },

  // Writing Section
  {
    _id: "section-writing",
    _type: "section",
    sectionType: "Writing",
    title: "Professional Writing Services",
    description: "Struggling to craft the perfect content that builds authority and engagement? I provide expert writing services tailored to your professional and business needs.",
  },
  {
    _id: "feature-writing-1",
    _type: "feature",
    featureType: "writing",
    title: "Blog and Article Writing",
    description: "Craft compelling, insightful, and SEO-friendly blogs and articles that position you/your organization as a thought leader in your industry. Whether it's customer success, career growth, or business strategy, I create content that engages, informs, and converts.",
    order: 1,
  },
  {
    _id: "feature-writing-2",
    _type: "feature",
    featureType: "writing",
    title: "LinkedIn Ghostwriting",
    description: "Strengthen your personal brand and expand your influence on LinkedIn with expertly crafted posts, articles, and thought leadership content. I help you share your expertise, tell your story, and attract the right audience—without the hassle of writing yourself.",
    order: 2,
  },
  {
    _id: "feature-writing-3",
    _type: "feature",
    featureType: "writing",
    title: "Customer Success Case Studies",
    description: "Highlight your wins and build credibility with well-structured, impactful case studies. I craft compelling success stories that showcase your business's value, helping you attract new clients, demonstrate ROI, and establish trust.",
    order: 3,
  },

  // Pricing
  {
    _id: "pricing-header",
    _type: "pricingHeader",
    title: "Choose the right plan for you",
    subtitle: "Pricing & Packages",
    description: "Select a package that best suits your career goals. Each plan is designed to help you stand out in the job market and accelerate your career growth.",
  },
  {
    _id: "pricing-tier-resume",
    _type: "pricingTier",
    name: "Resume Writing",
    price: "$299",
    description: "Get a professionally written resume that highlights your achievements and helps you stand out in the job market. I'll work with you to create a compelling resume that showcases your experience and gets you noticed by recruiters.",
    features: [
      "Here is what you get",
      "1. ATS-Optimized Resume Format",
      "2. Achievement-Focused Content",
      "3. Industry-Specific Keywords",
      "4. Professional Formatting",
      "5. 2 Rounds of Revisions",
      "6. Cover Letter Template",
    ],
    href: "/contact",
    buttonText: "Linkedin",
    featured: false,
    order: 1,
  },
  {
    _id: "pricing-tier-cs",
    _type: "pricingTier",
    name: "Customer Success Consulting",
    price: "$599",
    description: "As a Customer Success consultant, I understand the critical challenges startups face—reducing churn, improving retention, and scaling CS operations efficiently. Many startups struggle with these issues, but with the right strategy and processes, you can keep customers happy, engaged, and loyal without overwhelming your team.",
    features: [
      "Here is how I can help you",
      "1. Develop a Customer Success Strategy to build a scalable CS function from scratch.",
      "2. Create Onboarding and Adoption Programs to reduce churn and maximize engagement.",
      "3. Implement Customer Retention & Expansion strategies to boost retention and unlock growth opportunities.",
      "4. Develop Health Scores to measure customer health and proactively engage at-risk customers.",
      "5. Build CS Tech Stacks & Automate customer interactions, ensuring seamless support without expanding your team.",
      "6. Create Playbooks to define standardized processes for onboarding, renewals, and escalations.",
    ],
    href: "/contact",
    buttonText: "Linkedin",
    featured: false,
    order: 2,
  },

  // Testimonials
  {
    _id: "testimonial-1",
    _type: "testimonial",
    quote: "She is really good in resume writing and communicates very well. I would highly recommend her. Thank you.",
    authorName: "Kush Patel",
    authorTitle: "Financial Analyst",
  },

  // Footer
  {
    _id: "footer",
    _type: "footer",
    name: "Srinidhi Narayana",
  },

  // Social Links
  {
    _id: "social-link-instagram",
    _type: "socialLink",
    platform: "Instagram",
    url: "https://www.instagram.com",
    icon: "M8.6672 12C8.6672 10.1591 10.1591 8.6664 12 8.6664C13.8409 8.6664 15.3336 10.1591 15.3336 12C15.3336 13.8409 13.8409 15.3336 12 15.3336C10.1591 15.3336 8.6672 13.8409 8.6672 12ZM6.86512 12C6.86512 14.836 9.164 17.1349 12 17.1349C14.836 17.1349 17.1349 14.836 17.1349 12C17.1349 9.164 14.836 6.86512 12 6.86512C9.164 6.86512 6.86512 9.164 6.86512 12ZM16.1382 6.66152C16.1381 6.89886 16.2084 7.13089 16.3401 7.32829C16.4719 7.52568 16.6593 7.67956 16.8785 7.77047C17.0977 7.86138 17.339 7.88525 17.5718 7.83904C17.8046 7.79283 18.0185 7.67862 18.1863 7.51087C18.3542 7.34311 18.4686 7.12934 18.515 6.89658C18.5614 6.66382 18.5377 6.42253 18.447 6.20322C18.3563 5.98392 18.2025 5.79644 18.0052 5.6645C17.808 5.53257 17.576 5.4621 17.3386 5.462H17.3382C17.02 5.46215 16.715 5.58856 16.49 5.81347C16.265 6.03837 16.1384 6.34339 16.1382 6.66152ZM7.96 20.1398C6.98504 20.0954 6.45512 19.933 6.10296 19.7958C5.63608 19.614 5.30296 19.3975 4.95272 19.0478C4.60248 18.698 4.38568 18.3652 4.20472 17.8983C4.06744 17.5463 3.90504 17.0162 3.86072 16.0413C3.81224 14.9872 3.80256 14.6706 3.80256 12.0001C3.80256 9.3296 3.81304 9.01384 3.86072 7.95888C3.90512 6.98392 4.06872 6.45488 4.20472 6.10184C4.38648 5.63496 4.60296 5.30184 4.95272 4.9516C5.30248 4.60136 5.63528 4.38456 6.10296 4.2036C6.45496 4.06632 6.98504 3.90392 7.96 3.8596C9.01408 3.81112 9.33072 3.80144 12 3.80144C14.6693 3.80144 14.9862 3.81192 16.0412 3.8596C17.0162 3.904 17.5452 4.0676 17.8982 4.2036C18.3651 4.38456 18.6982 4.60184 19.0485 4.9516C19.3987 5.30136 19.6147 5.63496 19.7965 6.10184C19.9338 6.45384 20.0962 6.98392 20.1405 7.95888C20.189 9.01384 20.1986 9.3296 20.1986 12.0001C20.1986 14.6706 20.189 14.9863 20.1405 16.0413C20.0961 17.0162 19.9329 17.5462 19.7965 17.8983C19.6147 18.3652 19.3982 18.6983 19.0485 19.0478C18.6987 19.3972 18.3651 19.614 17.8982 19.7958C17.5462 19.933 17.0162 20.0954 16.0412 20.1398C14.9871 20.1882 14.6705 20.1979 12 20.1979C9.32952 20.1979 9.01376 20.1882 7.96 20.1398ZM7.8772 2.06056C6.81264 2.10904 6.0852 2.27784 5.44992 2.52504C4.792 2.78032 4.23504 3.1228 3.67848 3.67848C3.12192 4.23416 2.78032 4.792 2.52504 5.44992C2.27784 6.0856 2.10904 6.81264 2.06056 7.8772C2.01128 8.94344 2 9.28432 2 12C2 14.7157 2.01128 15.0566 2.06056 16.1228C2.10904 17.1874 2.27784 17.9144 2.52504 18.5501C2.78032 19.2076 3.122 19.7661 3.67848 20.3215C4.23496 20.877 4.792 21.219 5.44992 21.475C6.0864 21.7222 6.81264 21.891 7.8772 21.9394C8.944 21.9879 9.28432 22 12 22C14.7157 22 15.0566 21.9887 16.1228 21.9394C17.1874 21.891 17.9144 21.7222 18.5501 21.475C19.2076 21.219 19.765 20.8772 20.3215 20.3215C20.8781 19.7658 21.219 19.2076 21.475 18.5501C21.7222 17.9144 21.8918 17.1874 21.9394 16.1228C21.9879 15.0558 21.9992 14.7157 21.9992 12C21.9992 9.28432 21.9879 8.94344 21.9394 7.8772C21.891 6.81256 21.7222 6.0852 21.475 5.44992C21.219 4.7924 20.8772 4.23504 20.3215 3.67848C19.7658 3.12192 19.2076 2.78032 18.5509 2.52504C17.9144 2.27784 17.1874 2.10824 16.1236 2.06056C15.0574 2.01208 14.7165 2 12.0008 2C9.28512 2 8.944 2.01128 7.8772 2.06056Z",
    label: "Instagram",
    order: 1,
  },
  {
    _id: "social-link-threads",
    _type: "socialLink",
    platform: "Threads",
    url: "https://www.instagram.com",
    label: "Threads",
    order: 2,
  },
  {
    _id: "social-link-linkedin",
    _type: "socialLink",
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/srinidhinarayana21/",
    label: "LinkedIn",
    order: 3,
  },
];

console.log(`Seeding ${docs.length} documents...`);

await Promise.all(docs.map((doc) => client.createOrReplace(doc)));

console.log(`✅ Successfully seeded ${docs.length} documents into ${dataset} dataset!`);
console.log("\nNext steps:");
console.log("1. Run: npm run sanity:dev");
console.log("2. Open: http://localhost:3333");
console.log("3. View and edit your content in Sanity Studio");
