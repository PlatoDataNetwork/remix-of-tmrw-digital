export type Difficulty = "beginner" | "intermediate" | "expert";

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  insight: string;
  difficulty: Difficulty;
}

/* ------------------------------------------------------------------ */
/*  BEGINNER — Fundamentals anyone should know                         */
/* ------------------------------------------------------------------ */

const BEGINNER_QUESTIONS: Question[] = [
  {
    id: 1,
    difficulty: "beginner",
    question: "What is the primary purpose of a trademark?",
    options: [
      "To copyright creative works",
      "To identify and distinguish the source of goods or services",
      "To patent an invention",
      "To register a business name with the government",
    ],
    correctIndex: 1,
    insight: "A trademark is a brand identifier — it tells consumers who stands behind a product or service.",
  },
  {
    id: 2,
    difficulty: "beginner",
    question: "Which symbol indicates a federally registered trademark in the United States?",
    options: ["™", "©", "®", "℠"],
    correctIndex: 2,
    insight: "The ® symbol can only be used after the USPTO grants federal registration. Using it prematurely is illegal.",
  },
  {
    id: 3,
    difficulty: "beginner",
    question: "What does the ™ symbol mean?",
    options: [
      "The mark is federally registered",
      "The owner claims trademark rights but hasn't registered",
      "The trademark has expired",
      "The mark is copyrighted",
    ],
    correctIndex: 1,
    insight: "™ signals a claim of rights — anyone can use it. ® requires actual federal registration.",
  },
  {
    id: 4,
    difficulty: "beginner",
    question: "Which of these can be trademarked?",
    options: [
      "A brand name",
      "A logo",
      "A slogan",
      "All of the above",
    ],
    correctIndex: 3,
    insight: "Trademarks protect brand names, logos, slogans, and even sounds, colors, and scents that identify a source.",
  },
  {
    id: 5,
    difficulty: "beginner",
    question: "How long does a trademark last?",
    options: [
      "20 years, like a patent",
      "The life of the author plus 70 years",
      "Indefinitely, as long as it's used and renewed",
      "10 years with no option to renew",
    ],
    correctIndex: 2,
    insight: "Trademarks can last forever — but you must keep using them and file renewal documents.",
  },
  {
    id: 6,
    difficulty: "beginner",
    question: "What happens if you don't enforce your trademark rights?",
    options: [
      "Nothing — trademarks last forever automatically",
      "You may lose your trademark through genericide or abandonment",
      "The government will enforce it for you",
      "Your trademark becomes stronger over time",
    ],
    correctIndex: 1,
    insight: "\"Aspirin\" and \"Escalator\" were once trademarks that became generic. Use it or lose it.",
  },
  {
    id: 7,
    difficulty: "beginner",
    question: "Which of these CANNOT be trademarked?",
    options: [
      "A color (e.g., Tiffany blue)",
      "A sound (e.g., NBC chimes)",
      "A generic word for the product it describes",
      "A scent (e.g., Play-Doh smell)",
    ],
    correctIndex: 2,
    insight: "You can't trademark \"Computer\" for computers, but colors, sounds, and even scents can be protected.",
  },
  {
    id: 8,
    difficulty: "beginner",
    question: "Where do you register a trademark in the United States?",
    options: [
      "The Library of Congress",
      "The U.S. Patent and Trademark Office (USPTO)",
      "The Federal Trade Commission (FTC)",
      "Your state's Secretary of State office only",
    ],
    correctIndex: 1,
    insight: "The USPTO handles federal trademark registration. State registration is possible but offers less protection.",
  },
  {
    id: 9,
    difficulty: "beginner",
    question: "What is 'trademark infringement'?",
    options: [
      "Forgetting to renew your trademark",
      "Using a mark that is confusingly similar to another's registered mark",
      "Registering a trademark in multiple countries",
      "Changing your logo after registration",
    ],
    correctIndex: 1,
    insight: "Infringement occurs when another's use creates a likelihood of confusion about the source of goods or services.",
  },
  {
    id: 10,
    difficulty: "beginner",
    question: "What is a 'service mark'?",
    options: [
      "A trademark used for services instead of physical goods",
      "A mark that has been abandoned",
      "A government certification mark",
      "A mark that only applies to online businesses",
    ],
    correctIndex: 0,
    insight: "Service marks (℠) work exactly like trademarks but for services. FedEx and Uber are service marks.",
  },
  {
    id: 11,
    difficulty: "beginner",
    question: "In 2025, what is the average cost to register a trademark with the USPTO?",
    options: [
      "$50–$100",
      "$250–$350 per class of goods/services",
      "$1,000–$2,000",
      "$5,000+",
    ],
    correctIndex: 1,
    insight: "USPTO filing fees range from $250–$350 per class in 2025, but legal costs for a full application can add up quickly.",
  },
  {
    id: 12,
    difficulty: "beginner",
    question: "When was the first known trademark enforced?",
    options: [
      "Ancient Rome, 100 BC",
      "England, 1266 — Henry III required bakers to mark bread",
      "United States, 1870",
      "France, 1857",
    ],
    correctIndex: 1,
    insight: "Henry III of England enforced the first trademark on bakers in 1266 — branding is literally medieval.",
  },
];

/* ------------------------------------------------------------------ */
/*  INTERMEDIATE — Industry knowledge & strategy                       */
/* ------------------------------------------------------------------ */

const INTERMEDIATE_QUESTIONS: Question[] = [
  {
    id: 101,
    difficulty: "intermediate",
    question: "Taylor Swift has hundreds of registered trademarks. Which of these has she trademarked?",
    options: [
      "\"This Sick Beat\"",
      "\"Shake It Off\"",
      "\"Bad Blood\"",
      "All of the above",
    ],
    correctIndex: 3,
    insight: "Taylor Swift has aggressively trademarked song titles, album names, and even phrases — a masterclass in brand protection.",
  },
  {
    id: 102,
    difficulty: "intermediate",
    question: "Marvel and DC Comics once fought over which trademark?",
    options: [
      "\"Comic Book\"",
      "\"Superhero\"",
      "\"Action Figure\"",
      "\"Graphic Novel\"",
    ],
    correctIndex: 1,
    insight: "Marvel and DC jointly trademarked \"Super Hero\" in the 1970s. They co-owned and enforced it for decades.",
  },
  {
    id: 103,
    difficulty: "intermediate",
    question: "What is 'trademark squatting'?",
    options: [
      "Using a trademark in all capital letters",
      "Registering a trademark in bad faith to sell it back to the rightful owner",
      "Filing multiple trademarks in the same class",
      "Abandoning a trademark after registration",
    ],
    correctIndex: 1,
    insight: "Trademark squatting is rampant globally — especially in markets like China, where first-to-file rules apply.",
  },
  {
    id: 104,
    difficulty: "intermediate",
    question: "What is the 'Trademark Spectrum of Distinctiveness'?",
    options: [
      "A color grading system for brand logos",
      "A scale ranking marks from generic to fanciful based on protectability",
      "A government rating of trademark quality",
      "A test measuring consumer brand loyalty",
    ],
    correctIndex: 1,
    insight: "From weakest to strongest: Generic → Descriptive → Suggestive → Arbitrary → Fanciful. \"Xerox\" and \"Kodak\" are fanciful.",
  },
  {
    id: 105,
    difficulty: "intermediate",
    question: "What is the 'Nice Classification' system?",
    options: [
      "A ranking of how polite trademark attorneys are",
      "An international system categorizing goods and services into 45 classes",
      "A European trademark quality rating",
      "A system for rating trademark distinctiveness",
    ],
    correctIndex: 1,
    insight: "The Nice Classification has 34 goods classes and 11 service classes. You register in specific classes relevant to your business.",
  },
  {
    id: 106,
    difficulty: "intermediate",
    question: "What is a 'cease and desist' letter in trademark law?",
    options: [
      "A formal complaint filed with the USPTO",
      "A letter demanding someone stop using an infringing mark",
      "A notification that your trademark has expired",
      "A request to transfer trademark ownership",
    ],
    correctIndex: 1,
    insight: "C&D letters are often the first step in enforcement. They're cheaper than lawsuits and put infringers on notice.",
  },
  {
    id: 107,
    difficulty: "intermediate",
    question: "What does 'likelihood of confusion' mean?",
    options: [
      "When a trademark examiner can't read your application",
      "When consumers might mistakenly think two products come from the same source",
      "When two trademark applications are filed on the same day",
      "When a trademark is too similar to a patent",
    ],
    correctIndex: 1,
    insight: "This is THE key test in trademark disputes. Courts weigh similarity of marks, goods, channels, and consumer sophistication.",
  },
  {
    id: 108,
    difficulty: "intermediate",
    question: "What is 'trade dress'?",
    options: [
      "The uniform trademark attorneys wear to court",
      "The overall visual appearance and packaging that identifies a product's source",
      "A temporary trademark during the registration process",
      "The dress code at trademark conventions",
    ],
    correctIndex: 1,
    insight: "The Coca-Cola bottle shape and the Apple Store's minimalist design are protected trade dress.",
  },
  {
    id: 109,
    difficulty: "intermediate",
    question: "What is the Madrid Protocol?",
    options: [
      "A trademark enforcement treaty for the EU only",
      "An international system to register trademarks in multiple countries with one application",
      "A code of conduct for trademark attorneys",
      "A UN resolution on counterfeit goods",
    ],
    correctIndex: 1,
    insight: "The Madrid Protocol lets you file one application to protect your mark in 130+ countries. It's the most efficient path to global protection.",
  },
  {
    id: 110,
    difficulty: "intermediate",
    question: "What is a 'trademark opposition'?",
    options: [
      "When a competitor protests your trademark application during the publication period",
      "When the USPTO rejects your application outright",
      "When you withdraw your trademark application",
      "When two companies agree to share a trademark",
    ],
    correctIndex: 0,
    insight: "After the USPTO approves a mark, it's published for 30 days. Anyone who believes they'd be harmed can file an opposition.",
  },
  {
    id: 111,
    difficulty: "intermediate",
    question: "What is 'genericide' in trademark law?",
    options: [
      "When a trademark is intentionally abandoned",
      "When a brand name becomes so common it loses trademark protection",
      "When a generic company registers a famous trademark",
      "When a trademark is registered in too many classes",
    ],
    correctIndex: 1,
    insight: "\"Aspirin,\" \"Thermos,\" \"Escalator\" — all former trademarks killed by genericide. Google actively fights to prevent \"google\" from becoming a verb.",
  },
  {
    id: 112,
    difficulty: "intermediate",
    question: "What is the difference between a trademark and a copyright?",
    options: [
      "There is no difference — they're the same thing",
      "Trademarks protect brand identifiers; copyrights protect original creative works",
      "Copyrights last longer than trademarks",
      "Trademarks only apply to physical products",
    ],
    correctIndex: 1,
    insight: "Nike's swoosh logo is trademarked as a brand identifier. The graphic design itself could also be copyrighted as artwork.",
  },
];

/* ------------------------------------------------------------------ */
/*  EXPERT — Advanced legal, global, and Web3 concepts                 */
/* ------------------------------------------------------------------ */

const EXPERT_QUESTIONS: Question[] = [
  {
    id: 201,
    difficulty: "expert",
    question: "How can blockchain and tokenization impact trademark protection?",
    options: [
      "They can't — trademarks are only paper-based",
      "By creating immutable proof of first use and ownership on-chain",
      "By replacing the trademark office entirely",
      "By making trademarks expire faster",
    ],
    correctIndex: 1,
    insight: "On-chain timestamping creates tamper-proof evidence of first use — a game-changer for global trademark disputes.",
  },
  {
    id: 202,
    difficulty: "expert",
    question: "What is the 'Tacking Doctrine' in trademark law?",
    options: [
      "Adding new products to an existing trademark registration",
      "Claiming priority dates from an older, substantially similar mark",
      "Combining two trademarks into one registration",
      "Temporarily suspending a trademark during litigation",
    ],
    correctIndex: 1,
    insight: "Tacking lets you keep your original priority date when making minor changes to a mark — but the marks must create the same commercial impression.",
  },
  {
    id: 203,
    difficulty: "expert",
    question: "In the EU, what is a 'EUTM' and where is it registered?",
    options: [
      "A European Universal Trademark Mark, registered at the European Court of Justice",
      "A European Union Trade Mark, registered at the EUIPO in Alicante, Spain",
      "A Euro-Unified Trademark, registered at the European Parliament",
      "A European Trade Mechanism, registered at the World Intellectual Property Organization",
    ],
    correctIndex: 1,
    insight: "A single EUTM application covers all 27 EU member states. The EUIPO in Alicante processes over 170,000 applications annually.",
  },
  {
    id: 204,
    difficulty: "expert",
    question: "What is the 'Lanham Act'?",
    options: [
      "A state-level trademark law in California",
      "The primary federal trademark statute in the United States (15 U.S.C. §§ 1051–1141)",
      "An international treaty on counterfeiting",
      "A law governing domain name disputes",
    ],
    correctIndex: 1,
    insight: "Enacted in 1946, the Lanham Act is the backbone of US trademark law. It covers registration, infringement, dilution, and unfair competition.",
  },
  {
    id: 205,
    difficulty: "expert",
    question: "What is 'trademark dilution' and how does it differ from infringement?",
    options: [
      "They're the same — dilution is just a synonym for infringement",
      "Dilution protects famous marks from being weakened, even without consumer confusion",
      "Dilution only applies to expired trademarks",
      "Dilution applies exclusively to pharmaceutical brands",
    ],
    correctIndex: 1,
    insight: "Dilution covers 'blurring' (weakening distinctiveness) and 'tarnishment' (negative associations). Only famous marks qualify.",
  },
  {
    id: 206,
    difficulty: "expert",
    question: "What is a 'UDRP' proceeding?",
    options: [
      "A Universal Design Review Process for brand logos",
      "A Uniform Domain-Name Dispute-Resolution Policy for cybersquatting cases",
      "An Unrestricted Digital Rights Protocol for NFTs",
      "A United Dispute Resolution Procedure for patent conflicts",
    ],
    correctIndex: 1,
    insight: "UDRP through WIPO resolves domain cybersquatting faster and cheaper than litigation. Over 60,000 cases have been decided.",
  },
  {
    id: 207,
    difficulty: "expert",
    question: "In China, trademarks follow a 'first-to-file' system. What does this mean?",
    options: [
      "The first person to use a mark in commerce owns it",
      "The first person to file a registration application gets priority, regardless of prior use",
      "The first person to file a lawsuit over a mark wins",
      "Filing speed determines the mark's registration class",
    ],
    correctIndex: 1,
    insight: "China's first-to-file system has led to rampant trademark squatting. Apple paid $60 million to buy back the 'iPad' mark in China.",
  },
  {
    id: 208,
    difficulty: "expert",
    question: "What are 'NFT trademarks' and why did Hermès sue MetaBirkins?",
    options: [
      "Hermès sued because MetaBirkins used blockchain without permission",
      "Hermès won because NFT creators can't use existing trademarks to sell digital goods without authorization",
      "The case was dismissed because trademarks don't apply to digital assets",
      "MetaBirkins won because NFTs are protected as free speech",
    ],
    correctIndex: 1,
    insight: "The MetaBirkins case (2023) established that trademark rights extend to the metaverse. The jury awarded Hermès $133,000 in damages.",
  },
  {
    id: 209,
    difficulty: "expert",
    question: "What is 'parallel importation' (gray market goods) in trademark law?",
    options: [
      "Manufacturing counterfeit goods in a parallel factory",
      "Importing genuine branded goods without the trademark owner's authorization in that market",
      "Filing identical trademark applications in multiple countries",
      "Selling goods under two different brand names simultaneously",
    ],
    correctIndex: 1,
    insight: "Gray market goods are genuine but imported outside authorized channels. Different jurisdictions have wildly different rules on this.",
  },
  {
    id: 210,
    difficulty: "expert",
    question: "What is the 'doctrine of foreign equivalents' in trademark examination?",
    options: [
      "Foreign trademarks are automatically valid in the US",
      "The USPTO may translate foreign words to determine if a mark is descriptive or confusingly similar",
      "All trademarks must be filed in English",
      "Foreign companies get priority in US trademark registration",
    ],
    correctIndex: 1,
    insight: "If you try to trademark \"LECHE\" for milk, the USPTO will translate it and likely reject it as generic — same as trademarking \"MILK.\"",
  },
  {
    id: 211,
    difficulty: "expert",
    question: "What is a 'consent agreement' between trademark owners?",
    options: [
      "A legal requirement before any trademark can be registered",
      "An agreement where two parties with similar marks define boundaries for coexistence",
      "A consent form signed by consumers approving a brand name",
      "An agreement to transfer a trademark to a new owner",
    ],
    correctIndex: 1,
    insight: "Consent agreements help similar marks coexist — e.g., different geographic markets or product categories. The USPTO considers but doesn't always honor them.",
  },
  {
    id: 212,
    difficulty: "expert",
    question: "What role does AI play in modern trademark clearance searches in 2025?",
    options: [
      "AI has no role — trademark searches are fully manual",
      "AI analyzes phonetic similarity, visual similarity, and semantic overlap across global databases",
      "AI automatically registers trademarks without human review",
      "AI only checks for exact matches in one jurisdiction",
    ],
    correctIndex: 1,
    insight: "AI-powered clearance tools now catch conflicts human searchers miss — analyzing sound-alikes, visual resemblance, and meaning across 200+ jurisdictions.",
  },
];

/* ------------------------------------------------------------------ */
/*  EXPORTS                                                            */
/* ------------------------------------------------------------------ */

export const QUESTION_BANK: Record<Difficulty, Question[]> = {
  beginner: BEGINNER_QUESTIONS,
  intermediate: INTERMEDIATE_QUESTIONS,
  expert: EXPERT_QUESTIONS,
};

/** Pick `count` random questions from a pool */
export function pickQuestions(difficulty: Difficulty, count: number = 10): Question[] {
  const pool = [...QUESTION_BANK[difficulty]];
  const selected: Question[] = [];
  const n = Math.min(count, pool.length);
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    selected.push(pool.splice(idx, 1)[0]);
  }
  return selected;
}

export const DIFFICULTY_META: Record<Difficulty, { label: string; desc: string; questions: number; icon: string }> = {
  beginner: {
    label: "BEGINNER",
    desc: "Trademark fundamentals — do you know the basics?",
    questions: 10,
    icon: "📗",
  },
  intermediate: {
    label: "INTERMEDIATE",
    desc: "Industry strategy & brand battles — test your edge",
    questions: 10,
    icon: "📙",
  },
  expert: {
    label: "EXPERT",
    desc: "Global IP law, Web3 & advanced doctrine — prove your mastery",
    questions: 10,
    icon: "📕",
  },
};
