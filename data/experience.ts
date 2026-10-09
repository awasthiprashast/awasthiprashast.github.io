export type Experience = {
  company: string;
  role: string;
  dates: string;
  place: string;
  points: string[];
  tech: string[];
};

export const experience: Experience[] = [
  {
    company: "Neve Jewels",
    role: "Data Science Intern",
    dates: "May – Jul 2026",
    place: "Mumbai",
    points: [
      "Built next-day order forecasting for a 3-brand omnichannel jewellery business. XGBoost reached 18.7% MAPE on 2.5 years of daily data, beating 5 other models.",
      "Traced a forecast accuracy problem to a left join plus null removal that silently dropped non-promotional days. Fixed the pipeline and restored full data coverage.",
      "Built SQL and Python workflows that merge order, discount, marketing and campaign data into one daily table with 25+ engineered business features.",
      "Presented findings in a Plotly report: discount depth and recent order volume were the top demand drivers, and very-high-spend days averaged 2.2x the orders of low-spend days.",
    ],
    tech: ["XGBoost", "Python", "SQL", "Plotly"],
  },
  {
    company: "AceQuant Research",
    role: "Quantitative Development Intern",
    dates: "May – Jul 2025",
    place: "Remote",
    points: [
      "Implemented 4+ rule-based trading strategies (SMA, EMA, Bollinger Bands, MACD) in Python using the Angel One and Zerodha broker APIs.",
      "Backtested and tuned variants on 6+ performance metrics including profitability and drawdown.",
    ],
    tech: ["Python", "Broker APIs", "Backtesting"],
  },
];
