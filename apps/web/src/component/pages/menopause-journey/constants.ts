// Journey stages data
export const journeyStages = {
  lateRepro: {
    kicker: "Stage −3a / −3b",
    title: "Late Reproductive",
    oneLiner: "Cycles are mostly regular, but your hormones may start to feel less predictable.",
    badges: ["Cycles mostly regular", "Subtle changes", "Good time to track trends"],
    steps: [
      { q: "What you might notice", a: "Sleep feels lighter, PMS shifts, anxiety may rise, or periods change slightly." },
      { q: "What's happening (simple)", a: "Your ovulation hormones begin to wobble—small swings can feel big in the brain." },
      { q: "What to bring to a visit", a: "Cycle calendar, sleep notes, new mood symptoms, and any heavy bleeding changes." }
    ]
  },
  peri: {
    kicker: "Stage −2 / −1",
    title: "Perimenopause",
    oneLiner: "This is the 'hormone rollercoaster' phase—symptoms often peak here.",
    badges: ["Cycle skipping", "Hot flashes", "Mood/sleep changes"],
    steps: [
      { q: "What you might notice", a: "Hot flashes, night sweats, brain fog, heavier or irregular bleeding, more anxiety." },
      { q: "What's happening (simple)", a: "Estrogen rises and falls unpredictably; progesterone often drops earlier." },
      { q: "What to ask your clinician", a: "Symptom relief options, sleep plan, mood support, and bleeding red flags." }
    ]
  },
  earlyPost: {
    kicker: "Stage +1",
    title: "Early Postmenopause",
    oneLiner: "The 'new baseline' begins—symptoms may calm, but health prevention matters most now.",
    badges: ["12+ months no period", "Bone + heart focus", "Prevention window"],
    steps: [
      { q: "What you might notice", a: "Flashes may lessen, but vaginal dryness, sleep issues, or libido changes can persist." },
      { q: "What's happening (simple)", a: "Estrogen stays low; tissues that depended on estrogen adapt more slowly." },
      { q: "Smart check-ins", a: "Blood pressure, lipids, strength training, and discussing GSM symptoms early." }
    ]
  },
  latePost: {
    kicker: "Stage +2",
    title: "Late Postmenopause",
    oneLiner: "Long-term wellbeing is the goal—strong bones, heart, and brain habits pay off.",
    badges: ["Long-term health", "Bone density", "Metabolic risk"],
    steps: [
      { q: "What you might notice", a: "Vaginal/urinary symptoms can slowly worsen without treatment; joint aches may continue." },
      { q: "What's happening (simple)", a: "Lower estrogen affects collagen, bone turnover, and cardiovascular risk factors over time." },
      { q: "What helps most", a: "Strength + balance work, protein, sleep, cardio risk monitoring, GSM treatment if needed." }
    ]
  }
};

export const journeySymptoms = [
  {
    tag: "Hot flashes & night sweats",
    frontTitle: "Sudden heat waves",
    frontText: "Your internal thermostat becomes extra sensitive.",
    backTitle: "Thermostat reset in the brain",
    backText: "Small temperature changes can trigger heat → sweat → chills.",
    ask: "Ask about BP + cholesterol check"
  },
  {
    tag: "Joints, muscles & bones",
    frontTitle: "Aches + stiffness",
    frontText: "Estrogen supports joints and bone strength.",
    backTitle: "Menopausal arthralgia + bone loss",
    backText: "Lower estrogen may increase aches and speed bone density loss.",
    ask: "Ask about DEXA + strength plan"
  },
  {
    tag: "Vagina, bladder & sex",
    frontTitle: "Dryness / UTIs",
    frontText: "Tissues thin and get more sensitive over time.",
    backTitle: "GSM (Genitourinary Syndrome)",
    backText: "Higher pH + tissue thinning can cause pain, dryness, and infections.",
    ask: "Local estrogen is often first-line"
  },
  {
    tag: "Mood, sleep & brain fog",
    frontTitle: "Wired-but-tired",
    frontText: "Hormone swings affect sleep and focus.",
    backTitle: "The brain feels the swings",
    backText: "Estrogen interacts with serotonin/dopamine and sleep regulation.",
    ask: "Perimenopause depression is treatable"
  }
];

// Scanner data
export const scannerData = {
  repro: { 
    label: "Reproductive Phase", 
    est: "90%", prog: "85%", bone: "100%", 
    desc: "Peak Performance. Hormones (pink particles) flow abundantly. Vessels are elastic, bones are dense, and the brain's thermostat is stable."
  },
  peri: { 
    label: "Perimenopause (Transition)", 
    est: "55%", prog: "25%", bone: "90%", 
    desc: "The Storm. Hormone levels fluctuate wildly (chaos). Notice the brain flashing (hot flashes) and the heart beating irregularly."
  },
  post: { 
    label: "Postmenopause", 
    est: "10%", prog: "5%", bone: "65%", 
    desc: "New Baseline. Production drops. Note the 'Magnifying Glass' on the leg showing thinner bone structure and plaque starting in heart vessels."
  }
};

export type StageKey = keyof typeof journeyStages;
export type ScannerPhase = keyof typeof scannerData;

