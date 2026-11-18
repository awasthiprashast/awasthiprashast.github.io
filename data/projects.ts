export type Category = "AI / ML" | "Data" | "Software" | "Privacy";

export type Project = {
  slug: string;
  title: string;
  /** Plain-English summary shown on cards and rows. */
  summary: string;
  tech: string[];
  /** How it is built. Omit while unverified. */
  built?: string;
  /** One notable detail. Omit while unverified. */
  notable?: string;
  categories: Category[];
  /** Why there is no public link, or a status note. Shown as a chip. */
  note?: string;
  repoUrl?: string;
  demoUrl?: string;
  /** Real screenshots only. Illustrative covers are drawn in code. */
  screenshots?: { src: string; alt: string; caption?: string }[];
  cover?: "pipeline" | "eye" | "swipe";
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "multi-agent-financial-research",
    title: "Multi-agent financial research assistant",
    summary:
      "Specialist agents research a listed company, and a separate verification agent re-checks every claim against real prices, statements and news before you see it. It can also fact-check text written by anyone else, sentence by sentence.",
    tech: ["Python", "Streamlit", "FastAPI", "FinBERT", "ChromaDB", "scikit-learn", "Docker"],
    built:
      "A router sends each question to four specialist analysts (fundamental, technical, sentiment, risk). The verification agent then re-retrieves evidence on its own, checks every number against the data, recomputes indicators like RSI from raw prices, and sends weak claims back for at most two revisions before withholding them. It runs on live Yahoo Finance prices, statements and Google News for NSE and BSE companies, behind a Streamlit app and a FastAPI endpoint.",
    notable:
      "Evaluated on 339 hand-labelled sentences of real chatbot text, tuned on 7 companies and tested once on 5 held-out ones: it caught 81.8% of the wrong sentences and was right 97.6% of the time when it gave a verdict, while a check that trusts any sentence containing a number catches none. An academic prototype, not investment advice.",
    categories: ["AI / ML"],
    repoUrl: "https://github.com/awasthiprashast/multi-agent-financial-research",
    demoUrl: "https://multi-agent-financial-research.streamlit.app",
    screenshots: [
      {
        src: "/projects/multiagent-factcheck.jpg",
        alt: "Fact-check results marking sentences as wrong, with the real figure and a corrected version",
        caption: "Fact-check mode: each sentence checked against the data, with the real figure shown",
      },
      {
        src: "/projects/multiagent-briefing.jpg",
        alt: "Company briefing with key figures and a verified summary",
        caption: "Company briefing: key figures and a summary whose every sentence was checked first",
      },
    ],
    featured: true,
  },
  {
    slug: "attention-monitoring",
    title: "Attention Monitoring System",
    summary:
      "Estimates student attention in online classes from the webcam, without any video leaving the student's computer.",
    tech: ["Python", "MediaPipe", "OpenCV", "FastAPI", "PostgreSQL", "Streamlit", "AWS", "Terraform", "Docker"],
    built:
      "MediaPipe FaceMesh runs on the student's laptop. Eye Aspect Ratio and head direction give a smoothed score after a short per-user calibration, and only numbers are posted to a FastAPI backend with a PostgreSQL time series. Teachers get a Streamlit dashboard with PDF reports; the AWS setup (EC2, RDS, S3) is defined in Terraform.",
    notable: "Edge-to-cloud by design, with 33 tests and CI running in GitHub Actions.",
    categories: ["AI / ML", "Software"],
    note: "cloud stack offline · AWS trial ended",
    repoUrl: "https://github.com/awasthiprashast/computer-vision-attention-monitoring",
    screenshots: [
      {
        src: "/projects/attention-dashboard.jpg",
        alt: "Teacher dashboard showing attention trends",
        caption: "Teacher dashboard, shown with synthetic demo data",
      },
    ],
    cover: "eye",
    featured: true,
  },
  {
    slug: "swipehire",
    title: "SwipeHire",
    summary:
      "Mutual-match hiring for internships and fresher roles: applicants swipe on jobs, recruiters swipe on applicants, and a mutual like opens an application with a resume tailored to that job.",
    tech: ["Java", "Spring Boot", "Hibernate", "JSP", "Java RMI", "WebSocket", "MySQL", "Lucene"],
    built:
      "A Maven multi-module build: a Spring Boot web app (JSP views, Hibernate entities, JDBC DAOs, servlets, WebSocket match alerts and chat) plus a standalone match engine in its own JVM, reached over Java RMI, that ranks candidates in parallel on a thread pool and falls back to in-process ranking if it is down.",
    notable:
      "Matching is explainable: 0.45 skills + 0.20 TF-IDF (Lucene) + 0.15 learned taste + 0.10 location + 0.10 stipend, with the breakdown and matched or missing skills on every card. One-click apply tailors the applicant's own projects and skills to each job, and nothing is invented.",
    categories: ["Software"],
    repoUrl: "https://github.com/awasthiprashast/swipehire",
    screenshots: [
      {
        src: "/projects/swipehire-deck.png",
        alt: "SwipeHire applicant deck showing a job card with a match score breakdown",
        caption: "Applicant deck with the score breakdown, demo data",
      },
      {
        src: "/projects/swipehire-recruiter.png",
        alt: "SwipeHire recruiter dashboard listing jobs and candidates waiting for review",
        caption: "Recruiter dashboard, demo data",
      },
    ],
    cover: "swipe",
    featured: true,
  },
  {
    slug: "executive-briefing-assistant",
    title: "Smart Executive Briefing Assistant",
    summary:
      "Turns a 30–45 minute consultant research task into an automated, source-cited executive briefing.",
    tech: ["Python", "LangGraph", "PostgreSQL", "pgvector", "FastAPI"],
    built:
      "A 6-node LangGraph pipeline turns 5 inputs into a briefing, drawing on a 500+ document knowledge base built from SEC EDGAR filings, GDELT news and web search.",
    notable:
      "Numeric checks run in deterministic Python and the LLM only cites metric reference IDs, so every figure in client-facing output stays auditable.",
    categories: ["AI / ML"],
    note: "internal tool · no link",
  },
  {
    slug: "microaggregation-income-tax",
    title: "Microaggregation of income and tax data",
    summary:
      "Publishes income and tax records with lower disclosure risk by grouping similar people together, then measures what that costs in accuracy.",
    tech: ["Python", "NumPy", "pandas", "SciPy", "Streamlit"],
    built:
      "Validates and cleans a 5,000-record synthetic income and tax dataset, groups records with MDAV (groups of k to 2k−1), replaces each with its group mean or mode, then measures information loss, regression validity, tax-rule consistency and re-identification attacks. An extension repeats this on real US Census data (ACS 2022, California, 5,000 sampled people) with a diversity-aware variant, DA-MDAV. A release guard blocks unsafe exports.",
    notable:
      "On the synthetic data at k=5, record-linkage risk falls from about 99.8% with per-attribute ranking to 13.8%, at 27% information loss. On the real data, plain MDAV leaves 22.8% of people in groups with a single income band; DA-MDAV leaves none, at 2.5× the information loss. It reduces disclosure risk; it does not make data anonymous.",
    categories: ["Data", "Privacy"],
    repoUrl: "https://github.com/awasthiprashast/microaggregation-income-tax",
    demoUrl: "https://microaggregation-income-tax.streamlit.app/",
    screenshots: [
      {
        src: "/projects/microagg-compare.png",
        alt: "Dashboard comparing original and released records after micro-aggregation",
        caption: "Original vs released records on a synthetic dataset, original values shown as bands",
      },
      {
        src: "/projects/microagg-tradeoff-dashboard.png",
        alt: "Dashboard chart of the privacy and utility trade-off across k values",
        caption: "Privacy vs utility trade-off across k",
      },
    ],
  },
  {
    slug: "order-tracking-system",
    title: "Order and delivery tracking system",
    summary:
      "A full-stack order app with three roles (customer, admin, delivery agent) covering browse, order, assign, dispatch and deliver.",
    tech: ["FastAPI", "SQLite", "Pydantic", "JavaScript", "pytest", "Render"],
    built:
      "A FastAPI backend serving a single-file vanilla JS frontend. The order lifecycle is a strict state machine, orders are placed in one transaction with an atomic stock check so concurrent orders can't oversell, and role-based access is enforced on the server.",
    notable: "Salted PBKDF2 passwords, rate-limited logins and pytest tests running in GitHub Actions.",
    categories: ["Software"],
    repoUrl: "https://github.com/awasthiprashast/Order-tracking-system",
    demoUrl: "https://odts-order-tracking.onrender.com",
    screenshots: [
      { src: "/projects/odts-admin.png", alt: "Admin dashboard of the order tracking system" },
      { src: "/projects/odts-tracking.png", alt: "Customer order tracking timeline" },
    ],
  },
  {
    slug: "face-recognition-photo-retrieval",
    title: "Face-recognition photo retrieval",
    summary:
      "Finds a person across a large wedding photo collection by comparing faces. Built for my brother's wedding.",
    tech: ["Python", "InsightFace", "FAISS", "FastAPI", "React"],
    categories: ["AI / ML"],
    note: "private · family photos",
  },
  {
    slug: "social-media-content-analyzer",
    title: "Social media content analyzer",
    summary:
      "Upload a PDF or a screenshot of a post and get an engagement score with concrete suggestions to improve it, for LinkedIn, Instagram, Facebook and X.",
    tech: ["React", "TypeScript", "Vite", "pdf.js", "Tesseract OCR"],
    built:
      "Text comes from the PDF's own text layer, rebuilt into reading order from glyph positions, or from OCR for scans and screenshots. The post is scored 0–100 across seven weighted categories (hook, engagement, length fit, readability, discoverability, tone, formatting) against each platform's norms.",
    notable:
      "Parsing, OCR and scoring all run in the browser, so uploads never leave the device. The scoring is hand-written, explainable rules rather than a model call: no API keys, works offline, and every score can be explained in a sentence.",
    categories: ["Data", "Software"],
    repoUrl: "https://github.com/awasthiprashast/social-media-content-analyzer",
    demoUrl: "https://social-media-content-analyzer-kappa-five.vercel.app/",
  },
  {
    slug: "adaptive-risk-detection",
    title: "Adaptive risk detection system",
    summary:
      "A low-cost ESP32 safety and security monitor that fuses six sensors into one live risk level, from low to critical.",
    tech: ["ESP32", "C++ (Arduino)", "LittleFS", "JSON API", "MQ135", "DHT22"],
    built:
      "Alerts come from combinations of sensors, not single readings: door open plus vibration means forced entry, rising gas plus high temperature means fire. Status shows on an OLED and a buzzer that speeds up with severity, and the ESP32 serves its own dashboard and JSON API over WiFi with no cloud.",
    notable:
      "The air-quality baseline calibrates itself after a 10-second warm-up and can be re-set from the dashboard, so alerts react to change from ambient rather than fixed values. Built from roughly ₹1,500–2,000 of parts.",
    categories: ["Software"],
    repoUrl: "https://github.com/awasthiprashast/Adaptive-Risk-Detection-System",
  },
];
