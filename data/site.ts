// Single source of truth for personal details. Optional fields are hidden in the UI when unset.
export const site = {
  name: "Prashast Awasthi",
  firstName: "Prashast",
  lastName: "Awasthi.",
  tagline:
    "A computer science student who likes turning messy, unclear problems into things that work, from forecasting models to AI agents to backend systems.",
  education: "B.Tech CSE · VIT Vellore · 2027",
  focus: "Data · applied AI · backend",
  email: "prashast.awasthi2212@gmail.com",
  github: "https://github.com/awasthiprashast",
  linkedin: "https://linkedin.com/in/prashast-awasthi",
  // File lives in /public. The site is served from the domain root, so no base path is needed.
  resume: "/Prashast_Awasthi_Resume.pdf" as string | undefined,
  resumeFilename: "Prashast_Awasthi_Resume.pdf",
  siteUrl: undefined as string | undefined,
};
