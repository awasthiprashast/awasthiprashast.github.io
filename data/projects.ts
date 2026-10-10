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
    cover: "pipeline",
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
      "A job platform where candidates swipe on jobs, hirers get matches, and applying takes one click.",
    tech: ["Java", "Spring MVC", "Hibernate", "JSP", "Java RMI", "Docker"],
    built:
      "Covers the full hiring workflow with a hirer web dashboard (JSP, AJAX). Users, jobs, swipes, matches and applications are a relational Hibernate schema (HQL, Criteria API), with job and application CRUD in Servlets and JDBC. A swipe-sync and match service runs over Java RMI.",
    notable:
      "Thread pools handle background card prefetch and asynchronous match alerts, and the whole thing is containerised with Docker.",
    categories: ["Software"],
    cover: "swipe",
    featured: true,
  },
  {
    slug: "multi-agent-financial-research",
    title: "Multi-agent financial research assistant",
    summary:
      "Routes analyst questions across eight specialist agents, with a verification agent that rechecks every number.",
    tech: ["Python", "LangGraph", "FinBERT", "ChromaDB", "Streamlit"],
    built:
      "An 8-agent orchestration workflow routes queries to specialist agents. The verification agent recomputes every number from source data and rejects out-of-tolerance claims.",
    categories: ["AI / ML"],
  },
  {
    slug: "microaggregation-income-tax",
    title: "Microaggregation of income and tax data",
    summary:
      "Publishes income and tax records with lower disclosure risk by grouping similar people together, then measures what that costs in accuracy.",
    tech: ["Python", "NumPy", "pandas", "SciPy", "Streamlit"],
    built:
      "Validates and cleans a 5,000-record synthetic dataset, groups records with MDAV (groups of k to 2k−1), replaces each record with its group mean or mode, then measures information loss, regression validity, tax-rule consistency and re-identification attacks. A release guard blocks unsafe exports.",
    notable:
      "At k=5, record-linkage risk falls from about 99.8% with per-attribute ranking to 13.8%, at 27% information loss. It reduces disclosure risk; it does not make data anonymous.",
    categories: ["Data", "Privacy"],
    repoUrl: "https://github.com/awasthiprashast/microaggregation-income-tax",
    demoUrl: "https://microaggregation-income-tax.streamlit.app/",
    screenshots: [
      {
        src: "/projects/microagg-tradeoff.png",
        alt: "Chart of the privacy and utility trade-off across k",
        caption: "Privacy vs utility across k, from the project's own experiments",
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
