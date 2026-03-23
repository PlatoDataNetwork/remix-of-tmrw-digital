export type TrademarkModule = "beginner" | "intermediate" | "expert";

export interface TrademarkQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  insight: string;
  module: TrademarkModule;
}

/* ------------------------------------------------------------------ */
/*  BEGINNER — 20 questions                                            */
/* ------------------------------------------------------------------ */

const BEGINNER_QUESTIONS: TrademarkQuestion[] = [
  {
    id: 1, module: "beginner",
    question: "What is the primary purpose of a trademark?",
    options: ["To copyright creative works.", "To identify and distinguish the source of goods or services.", "To patent an invention.", "To register a business name with the government."],
    correctIndex: 1,
    insight: "A trademark is a brand identifier — it tells consumers who stands behind a product or service.",
  },
  {
    id: 2, module: "beginner",
    question: "Which symbol indicates a federally registered trademark in the United States?",
    options: ["™.", "©.", "®.", "℠."],
    correctIndex: 2,
    insight: "The ® symbol can only be used after the USPTO grants federal registration. Using it prematurely is illegal.",
  },
  {
    id: 3, module: "beginner",
    question: "What does the ™ symbol mean?",
    options: ["The mark is federally registered.", "The owner claims trademark rights but hasn't registered.", "The trademark has expired.", "The mark is copyrighted."],
    correctIndex: 1,
    insight: "™ signals a claim of rights — anyone can use it. ® requires actual federal registration.",
  },
  {
    id: 4, module: "beginner",
    question: "Which of these can be trademarked?",
    options: ["A brand name only.", "A logo only.", "A slogan only.", "All of the above — brand names, logos, and slogans."],
    correctIndex: 3,
    insight: "Trademarks protect brand names, logos, slogans, and even sounds, colors, and scents that identify a source.",
  },
  {
    id: 5, module: "beginner",
    question: "How long does a trademark last?",
    options: ["20 years, like a patent.", "The life of the author plus 70 years.", "Indefinitely, as long as it's used and renewed.", "10 years with no option to renew."],
    correctIndex: 2,
    insight: "Trademarks can last forever — but you must keep using them and file renewal documents.",
  },
  {
    id: 6, module: "beginner",
    question: "What happens if you don't enforce your trademark rights?",
    options: ["Nothing — trademarks last forever automatically.", "The government will enforce it for you.", "You may lose your trademark through genericide or abandonment.", "Your trademark becomes stronger over time."],
    correctIndex: 2,
    insight: "\"Aspirin\" and \"Escalator\" were once trademarks that became generic. Use it or lose it.",
  },
  {
    id: 7, module: "beginner",
    question: "Which of these CANNOT be trademarked?",
    options: ["A color (e.g., Tiffany blue)", "A sound (e.g., NBC chimes)", "A scent (e.g., Play-Doh smell)", "A generic word for the product it describes."],
    correctIndex: 3,
    insight: "You can't trademark \"Computer\" for computers, but colors, sounds, and even scents can be protected.",
  },
  {
    id: 8, module: "beginner",
    question: "Where do you register a trademark in the United States?",
    options: ["The Library of Congress.", "Your state's Secretary of State office only.", "The Federal Trade Commission (FTC)", "The U.S. Patent and Trademark Office (USPTO)"],
    correctIndex: 3,
    insight: "The USPTO handles federal trademark registration. State registration is possible but offers less protection.",
  },
  {
    id: 9, module: "beginner",
    question: "What is 'trademark infringement'?",
    options: ["Using a mark that is confusingly similar to another's registered mark.", "Forgetting to renew your trademark.", "Registering a trademark in multiple countries.", "Changing your logo after registration."],
    correctIndex: 0,
    insight: "Infringement occurs when another's use creates a likelihood of confusion about the source of goods or services.",
  },
  {
    id: 10, module: "beginner",
    question: "What is a 'service mark'?",
    options: ["A trademark used for services instead of physical goods.", "A mark that has been abandoned.", "A government certification mark.", "A mark that only applies to online businesses."],
    correctIndex: 0,
    insight: "Service marks (℠) work exactly like trademarks but for services. FedEx and Uber are service marks.",
  },
  {
    id: 11, module: "beginner",
    question: "In 2025, what is the average filing fee to register a trademark with the USPTO?",
    options: ["$50–$100.", "$250–$350 per class of goods/services.", "$1,000–$2,000.", "$5,000+."],
    correctIndex: 1,
    insight: "USPTO filing fees range from $250–$350 per class in 2025, but legal costs for a full application can add up quickly.",
  },
  {
    id: 12, module: "beginner",
    question: "When was the first known trademark enforced?",
    options: ["Ancient Rome, 100 BC.", "United States, 1870.", "England, 1266 — Henry III required bakers to mark bread.", "France, 1857."],
    correctIndex: 2,
    insight: "Henry III of England enforced the first trademark on bakers in 1266 — branding is literally medieval.",
  },
  {
    id: 13, module: "beginner",
    question: "What does 'common law' trademark rights mean?",
    options: ["Rights that exist only after federal registration.", "Rights that exist automatically from using a mark in commerce, even without registration.", "Rights granted by a court after a lawsuit.", "Rights that apply only in the UK legal system."],
    correctIndex: 1,
    insight: "In the US, simply using a mark in commerce gives you common law rights — but they're limited to your geographic area.",
  },
  {
    id: 14, module: "beginner",
    question: "What is a trademark 'class'?",
    options: ["A category of goods or services you're registering the mark for.", "The quality level of a trademark.", "A type of trademark attorney certification.", "The year a trademark was filed."],
    correctIndex: 0,
    insight: "You must specify classes when registering. Apple has trademarks in electronics (Class 9), retail (Class 35), and more.",
  },
  {
    id: 15, module: "beginner",
    question: "Can two companies have the same trademark?",
    options: ["Never — trademarks are globally exclusive.", "Yes, if they operate in completely different industries.", "Only if one is in the US and one is abroad.", "Only if they have written permission from each other."],
    correctIndex: 1,
    insight: "Delta Airlines and Delta Faucets coexist because they're in completely different industries with no consumer confusion.",
  },
  {
    id: 16, module: "beginner",
    question: "What is 'specimen of use' in trademark filing?",
    options: ["A sample of the product itself sent to the USPTO.", "Evidence showing the mark is being used in commerce.", "A physical copy of the trademark certificate.", "A DNA sample from the trademark owner."],
    correctIndex: 1,
    insight: "The USPTO requires proof your mark is actually being used — labels, screenshots, packaging, and ads all qualify.",
  },
  {
    id: 17, module: "beginner",
    question: "Which type of mark is considered the strongest?",
    options: ["Descriptive marks.", "Suggestive marks.", "Fanciful/coined marks.", "Generic terms."],
    correctIndex: 2,
    insight: "Fanciful marks like 'Xerox' and 'Kodak' are invented words with no prior meaning — they get the strongest protection.",
  },
  {
    id: 18, module: "beginner",
    question: "What is a 'trademark search' and why is it important?",
    options: ["A Google search for your brand name.", "A comprehensive search of existing marks to avoid conflicts before filing.", "A search the USPTO does after you file.", "A search for trademark attorneys in your area."],
    correctIndex: 1,
    insight: "A proper clearance search checks federal, state, and common law sources. Skipping it can lead to costly disputes.",
  },
  {
    id: 19, module: "beginner",
    question: "How often must you renew a US federal trademark?",
    options: ["Every year.", "Every 5 years.", "Between the 5th and 6th year, then every 10 years.", "Never — once registered it's permanent."],
    correctIndex: 2,
    insight: "You must file a Section 8 declaration between years 5–6 and then renew every 10 years to maintain your registration.",
  },
  {
    id: 20, module: "beginner",
    question: "Can you trademark a hashtag?",
    options: ["No — hashtags can never be trademarked.", "Yes, if it functions as a source identifier for goods or services.", "Only if it goes viral first.", "Only if Twitter/X approves it."],
    correctIndex: 1,
    insight: "#SheReadsTruth and #JUSTDOIT are registered trademarks. The hashtag must function as a brand, not just a descriptive tag.",
  },
];

/* ------------------------------------------------------------------ */
/*  INTERMEDIATE — 20 questions                                        */
/* ------------------------------------------------------------------ */

const INTERMEDIATE_QUESTIONS: TrademarkQuestion[] = [
  {
    id: 101, module: "intermediate",
    question: "Taylor Swift has hundreds of registered trademarks. Which of these has she trademarked?",
    options: ["\."This Sick Beat\"",."\"Shake It Off\."",."\"Bad Blood\."",."All of the above"],
    correctIndex: 3,
    insight: "Taylor Swift has aggressively trademarked song titles, album names, and even phrases — a masterclass in brand protection.",
  },
  {
    id: 102, module: "intermediate",
    question: "Marvel and DC Comics once fought over which trademark?",
    options: ["\."Comic Book\"",."\"Action Figure\."",."\"Superhero\."",."\"Graphic Novel\.""],
    correctIndex: 2,
    insight: "Marvel and DC jointly trademarked \"Super Hero\" in the 1970s. They co-owned and enforced it for decades.",
  },
  {
    id: 103, module: "intermediate",
    question: "What is 'trademark squatting'?",
    options: ["Using a trademark in all capital letters.", "Filing multiple trademarks in the same class.", "Registering a trademark in bad faith to sell it back to the rightful owner.", "Abandoning a trademark after registration."],
    correctIndex: 2,
    insight: "Trademark squatting is rampant globally — especially in markets like China, where first-to-file rules apply.",
  },
  {
    id: 104, module: "intermediate",
    question: "On the Trademark Spectrum of Distinctiveness, which type is the MOST protectable?",
    options: ["Descriptive.", "Suggestive.", "Arbitrary.", "Fanciful."],
    correctIndex: 3,
    insight: "From weakest to strongest: Generic → Descriptive → Suggestive → Arbitrary → Fanciful. \"Xerox\" and \"Kodak\" are fanciful.",
  },
  {
    id: 105, module: "intermediate",
    question: "How many classes does the Nice Classification system have?",
    options: ["10 classes.", "25 classes.", "45 classes (34 goods + 11 services)", "100 classes."],
    correctIndex: 2,
    insight: "The Nice Classification has 34 goods classes and 11 service classes. You register in specific classes relevant to your business.",
  },
  {
    id: 106, module: "intermediate",
    question: "What is a 'cease and desist' letter in trademark law?",
    options: ["A formal complaint filed with the USPTO.", "A notification that your trademark has expired.", "A request to transfer trademark ownership.", "A letter demanding someone stop using an infringing mark."],
    correctIndex: 3,
    insight: "C&D letters are often the first step in enforcement. They're cheaper than lawsuits and put infringers on notice.",
  },
  {
    id: 107, module: "intermediate",
    question: "What does 'likelihood of confusion' test evaluate?",
    options: ["When a trademark examiner can't read your application.", "When two trademark applications are filed on the same day.", "Whether consumers might mistakenly think two products come from the same source.", "When a trademark is too similar to a patent."],
    correctIndex: 2,
    insight: "This is THE key test in trademark disputes. Courts weigh similarity of marks, goods, channels, and consumer sophistication.",
  },
  {
    id: 108, module: "intermediate",
    question: "What is 'trade dress'?",
    options: ["The uniform trademark attorneys wear to court.", "A temporary trademark during the registration process.", "The overall visual appearance and packaging that identifies a product's source.", "The dress code at trademark conventions."],
    correctIndex: 2,
    insight: "The Coca-Cola bottle shape and the Apple Store's minimalist design are protected trade dress.",
  },
  {
    id: 109, module: "intermediate",
    question: "What is the Madrid Protocol?",
    options: ["An international system to register trademarks in multiple countries with one application.", "A trademark enforcement treaty for the EU only.", "A code of conduct for trademark attorneys.", "A UN resolution on counterfeit goods."],
    correctIndex: 0,
    insight: "The Madrid Protocol lets you file one application to protect your mark in 130+ countries.",
  },
  {
    id: 110, module: "intermediate",
    question: "During trademark opposition, who can file an objection?",
    options: ["Only the USPTO director.", "Only competing companies.", "Anyone who believes they would be damaged by the registration.", "Only attorneys licensed in the filing state."],
    correctIndex: 2,
    insight: "After the USPTO approves a mark, it's published for 30 days. Anyone who believes they'd be harmed can file an opposition.",
  },
  {
    id: 111, module: "intermediate",
    question: "What is 'genericide' in trademark law?",
    options: ["When a trademark is intentionally abandoned.", "When a generic company registers a famous trademark.", "When a trademark is registered in too many classes.", "When a brand name becomes so common it loses trademark protection."],
    correctIndex: 3,
    insight: "\"Aspirin,\" \"Thermos,\" \"Escalator\" — all former trademarks killed by genericide. Google actively fights this.",
  },
  {
    id: 112, module: "intermediate",
    question: "What is the key difference between a trademark and a copyright?",
    options: ["There is no difference.", "Trademarks protect brand identifiers; copyrights protect original creative works.", "Copyrights are stronger than trademarks.", "Trademarks only apply to physical products."],
    correctIndex: 1,
    insight: "Nike's swoosh logo is trademarked as a brand identifier. The graphic design itself could also be copyrighted as artwork.",
  },
  {
    id: 113, module: "intermediate",
    question: "What is an 'intent-to-use' (ITU) trademark application?",
    options: ["An application filed when you're already using the mark.", "An application filed before you've started using the mark in commerce.", "An application that can only be filed by attorneys.", "A provisional trademark that lasts 6 months."],
    correctIndex: 1,
    insight: "ITU applications let you reserve a mark before launch. You must eventually prove use within a specified timeframe.",
  },
  {
    id: 114, module: "intermediate",
    question: "What is 'trademark dilution by blurring'?",
    options: ["When a mark becomes physically blurry on packaging.", "When multiple similar marks make a famous mark less distinctive.", "When a trademark is printed in low resolution.", "When a mark is used in too many colors."],
    correctIndex: 1,
    insight: "If someone opens 'Tiffany's Auto Shop,' it blurs the distinctiveness of the Tiffany jewelry brand even without competition.",
  },
  {
    id: 115, module: "intermediate",
    question: "What famous case established the 'Polaroid factors' test?",
    options: ["Nike v. Adidas.", "Apple v. Samsung.", "Polaroid Corp. v. Polarad Electronics Corp.", "Coca-Cola v. Pepsi."],
    correctIndex: 2,
    insight: "The 1961 Polaroid case created an 8-factor test for likelihood of confusion that courts still use today.",
  },
  {
    id: 116, module: "intermediate",
    question: "Can a single color be trademarked?",
    options: ["Never — colors are free for anyone to use.", "Only if combined with a logo.", "Yes, if it has acquired distinctiveness in a specific market.", "Only primary colors can be trademarked."],
    correctIndex: 2,
    insight: "Tiffany blue, UPS brown, and T-Mobile magenta are all trademarked colors with acquired distinctiveness.",
  },
  {
    id: 117, module: "intermediate",
    question: "What is the TTAB?",
    options: ["Trademark Transaction Advisory Board.", "The Trademark Trial and Appeal Board — handles registration disputes.", "Trademark Technical Assessment Bureau.", "The Trademark Testing and Analysis Branch."],
    correctIndex: 1,
    insight: "The TTAB resolves oppositions, cancellations, and appeals. It's an administrative tribunal within the USPTO.",
  },
  {
    id: 118, module: "intermediate",
    question: "What is 'secondary meaning' in trademark law?",
    options: ["When a mark has two different definitions in the dictionary.", "When consumers associate a descriptive term with a specific brand over time.", "When a trademark has a second registration.", "When a mark is translated into another language."],
    correctIndex: 1,
    insight: "\"American Airlines\" is descriptive, but through years of use, consumers associate it with one specific airline — that's secondary meaning.",
  },
  {
    id: 119, module: "intermediate",
    question: "What is 'trademark coexistence'?",
    options: ["When two marks exist in the same class but different countries.", "When two parties agree to use similar marks under defined conditions.", "When a trademark exists in both digital and physical form.", "When one trademark replaces another after expiration."],
    correctIndex: 1,
    insight: "Coexistence agreements define boundaries — geographic, product, or channel-based — to avoid litigation.",
  },
  {
    id: 120, module: "intermediate",
    question: "How many trademark applications does the USPTO receive annually (2025)?",
    options: ["About 50,000.", "About 200,000.", "About 500,000–700,000.", "Over 2 million."],
    correctIndex: 2,
    insight: "The USPTO processes roughly 600,000+ applications per year as of 2025, reflecting the growing importance of brand protection.",
  },
];

/* ------------------------------------------------------------------ */
/*  EXPERT — 20 questions                                              */
/* ------------------------------------------------------------------ */

const EXPERT_QUESTIONS: TrademarkQuestion[] = [
  {
    id: 201, module: "expert",
    question: "How can blockchain and tokenization impact trademark protection?",
    options: ["They can't — trademarks are only paper-based.", "By replacing the trademark office entirely.", "By creating immutable proof of first use and ownership on-chain.", "By making trademarks expire faster."],
    correctIndex: 2,
    insight: "On-chain timestamping creates tamper-proof evidence of first use — a game-changer for global trademark disputes.",
  },
  {
    id: 202, module: "expert",
    question: "What is the 'Tacking Doctrine' in trademark law?",
    options: ["Adding new products to an existing trademark registration.", "Combining two trademarks into one registration.", "Claiming priority dates from an older, substantially similar mark.", "Temporarily suspending a trademark during litigation."],
    correctIndex: 2,
    insight: "Tacking lets you keep your original priority date when making minor changes to a mark — but the marks must create the same commercial impression.",
  },
  {
    id: 203, module: "expert",
    question: "Where is a European Union Trade Mark (EUTM) registered?",
    options: ["The European Court of Justice in Luxembourg.", "The EUIPO in Alicante, Spain.", "The European Parliament in Brussels.", "WIPO in Geneva."],
    correctIndex: 1,
    insight: "A single EUTM application covers all 27 EU member states. The EUIPO in Alicante processes over 170,000 applications annually.",
  },
  {
    id: 204, module: "expert",
    question: "What is the 'Lanham Act'?",
    options: ["A state-level trademark law in California.", "An international treaty on counterfeiting.", "A law governing domain name disputes.", "The primary federal trademark statute in the United States (15 U.S.C. §§ 1051–1141)"],
    correctIndex: 3,
    insight: "Enacted in 1946, the Lanham Act is the backbone of US trademark law covering registration, infringement, dilution, and unfair competition.",
  },
  {
    id: 205, module: "expert",
    question: "How does trademark dilution differ from infringement?",
    options: ["They're the same thing.", "Dilution only applies to expired trademarks.", "Dilution protects famous marks from being weakened, even without consumer confusion.", "Dilution applies exclusively to pharmaceutical brands."],
    correctIndex: 2,
    insight: "Dilution covers 'blurring' (weakening distinctiveness) and 'tarnishment' (negative associations). Only famous marks qualify.",
  },
  {
    id: 206, module: "expert",
    question: "What does UDRP stand for?",
    options: ["Universal Design Review Process.", "Unrestricted Digital Rights Protocol.", "United Dispute Resolution Procedure.", "Uniform Domain-Name Dispute-Resolution Policy."],
    correctIndex: 3,
    insight: "UDRP through WIPO resolves domain cybersquatting faster and cheaper than litigation. Over 60,000 cases have been decided.",
  },
  {
    id: 207, module: "expert",
    question: "In China's 'first-to-file' trademark system, who gets priority?",
    options: ["The first person to use a mark in commerce.", "The first person to file a lawsuit over a mark.", "Filing speed determines the mark's registration class.", "The first person to file a registration application, regardless of prior use."],
    correctIndex: 3,
    insight: "China's first-to-file system has led to rampant trademark squatting. Apple paid $60 million to buy back the 'iPad' mark in China.",
  },
  {
    id: 208, module: "expert",
    question: "Why did Hermès win the MetaBirkins trademark case in 2023?",
    options: ["MetaBirkins used blockchain without permission.", "The case was dismissed — trademarks don't apply to digital assets.", "MetaBirkins won because NFTs are protected as free speech.", "Trademark rights extend to the metaverse — NFT creators can't use existing marks without authorization."],
    correctIndex: 3,
    insight: "The MetaBirkins case (2023) established that trademark rights extend to the metaverse. The jury awarded Hermès $133,000 in damages.",
  },
  {
    id: 209, module: "expert",
    question: "What are 'gray market goods' in trademark law?",
    options: ["Counterfeit goods manufactured in a parallel factory.", "Goods sold under two different brand names simultaneously.", "Genuine branded goods imported without the trademark owner's authorization in that market.", "Products with expired trademarks."],
    correctIndex: 2,
    insight: "Gray market goods are genuine but imported outside authorized channels. Different jurisdictions have wildly different rules on this.",
  },
  {
    id: 210, module: "expert",
    question: "What is the 'doctrine of foreign equivalents'?",
    options: ["Foreign trademarks are automatically valid in the US.", "All trademarks must be filed in English.", "Foreign companies get priority in US trademark registration.", "The USPTO may translate foreign words to determine if a mark is descriptive or confusingly similar."],
    correctIndex: 3,
    insight: "If you try to trademark \"LECHE\" for milk, the USPTO will translate it and likely reject it as generic.",
  },
  {
    id: 211, module: "expert",
    question: "What is a 'consent agreement' between trademark owners?",
    options: ["A legal requirement before any trademark can be registered.", "A consent form signed by consumers approving a brand name.", "An agreement where two parties with similar marks define boundaries for coexistence.", "An agreement to transfer a trademark to a new owner."],
    correctIndex: 2,
    insight: "Consent agreements help similar marks coexist. The USPTO considers but doesn't always honor them.",
  },
  {
    id: 212, module: "expert",
    question: "What role does AI play in modern trademark clearance searches in 2025?",
    options: ["AI has no role — searches are fully manual.", "AI automatically registers trademarks without human review.", "AI only checks for exact matches in one jurisdiction.", "AI analyzes phonetic, visual, and semantic similarity across global databases."],
    correctIndex: 3,
    insight: "AI-powered clearance tools now catch conflicts human searchers miss — analyzing sound-alikes, visual resemblance, and meaning across 200+ jurisdictions.",
  },
  {
    id: 213, module: "expert",
    question: "What is 'trademark exhaustion' (first sale doctrine)?",
    options: ["When a trademark owner runs out of products to sell.", "After the first authorized sale, the trademark owner can't control further resale of that specific item.", "When a trademark is used so much it becomes generic.", "When all classes of a trademark registration are filled."],
    correctIndex: 1,
    insight: "Once you buy a genuine Nike shoe, Nike can't prevent you from reselling it. But this gets complex internationally.",
  },
  {
    id: 214, module: "expert",
    question: "What is the 'Anti-Cybersquatting Consumer Protection Act' (ACPA)?",
    options: ["A US law that prohibits registering domain names in bad faith to profit from someone else's trademark.", "An international treaty on internet governance.", "A regulation governing social media usernames.", "A law protecting consumers from phishing attacks."],
    correctIndex: 0,
    insight: "ACPA allows trademark owners to sue and potentially win statutory damages up to $100,000 per domain for bad-faith cybersquatting.",
  },
  {
    id: 215, module: "expert",
    question: "What is 'reverse confusion' in trademark law?",
    options: ["When a consumer returns a product due to branding confusion.", "When a senior user's mark is swamped by a junior user's much larger market presence.", "When a trademark is read backwards.", "When confusion occurs in a foreign language."],
    correctIndex: 1,
    insight: "If a giant corporation adopts a small company's mark and floods the market, consumers think the small company copied the big one — that's reverse confusion.",
  },
  {
    id: 216, module: "expert",
    question: "What is the significance of the 'Supplemental Register' at the USPTO?",
    options: ["It's a backup database for expired trademarks.", "Marks too descriptive for the Principal Register can be placed here, gaining some benefits while building distinctiveness.", "It's a register for supplemental trademark fees.", "It's where foreign marks are registered in the US."],
    correctIndex: 1,
    insight: "The Supplemental Register allows use of ® and provides a basis for foreign registration, while the mark builds secondary meaning.",
  },
  {
    id: 217, module: "expert",
    question: "In the Jack Daniel's v. VIP Products (2023) Supreme Court case, what did the Court rule?",
    options: ["Parody products can never infringe trademarks.", "When an accused mark is used as a source identifier, the Rogers test doesn't apply — standard likelihood of confusion analysis is used.", "All dog toys are exempt from trademark law.", "The First Amendment always protects commercial parody."],
    correctIndex: 1,
    insight: "This landmark 2023 case clarified that when an accused infringer uses a mark as a brand identifier, even for a parody product, standard trademark analysis applies.",
  },
  {
    id: 218, module: "expert",
    question: "What is a 'well-known mark' under Article 6bis of the Paris Convention?",
    options: ["Any mark registered in more than 5 countries.", "A mark so famous it receives protection even in countries where it isn't registered.", "A mark that has won a trademark award.", "A mark owned by a Fortune 500 company."],
    correctIndex: 1,
    insight: "Well-known marks like Coca-Cola and Google can be protected against unauthorized registration even in countries where they haven't filed.",
  },
  {
    id: 219, module: "expert",
    question: "What is 'contributory trademark infringement'?",
    options: ["When you contribute money to a trademark registration.", "When a party intentionally induces or knowingly facilitates another's trademark infringement.", "When multiple marks contribute to consumer confusion.", "When a trademark contributes to increased sales."],
    correctIndex: 1,
    insight: "Platforms like Amazon and eBay have faced contributory infringement claims for hosting sellers of counterfeit goods.",
  },
  {
    id: 220, module: "expert",
    question: "Under the Lanham Act Section 43(a), what can be claimed WITHOUT federal trademark registration?",
    options: ["Nothing — registration is always required.", "Only copyright claims.", "Unfair competition and false designation of origin claims based on unregistered marks.", "Only state-level trademark claims."],
    correctIndex: 2,
    insight: "Section 43(a) is powerful — it protects unregistered marks against false designation of origin and misleading representations.",
  },
];

/* ------------------------------------------------------------------ */
/*  EXPORTS                                                            */
/* ------------------------------------------------------------------ */

export const TM_QUESTION_BANK: Record<TrademarkModule, TrademarkQuestion[]> = {
  beginner: BEGINNER_QUESTIONS,
  intermediate: INTERMEDIATE_QUESTIONS,
  expert: EXPERT_QUESTIONS,
};

export function pickTrademarkQuestions(module: TrademarkModule, count: number = 10): TrademarkQuestion[] {
  const pool = [...TM_QUESTION_BANK[module]];
  const selected: TrademarkQuestion[] = [];
  const n = Math.min(count, pool.length);
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    selected.push(pool.splice(idx, 1)[0]);
  }
  return selected;
}

export const TM_MODULE_META: Record<TrademarkModule, { label: string; desc: string; questions: number; icon: string }> = {
  beginner: {
    label: "MODULE 1 — FUNDAMENTALS",
    desc: "Trademark basics every brand owner should know",
    questions: 10,
    icon: "📗",
  },
  intermediate: {
    label: "MODULE 2 — STRATEGY",
    desc: "Industry battles, enforcement tactics & brand warfare",
    questions: 10,
    icon: "📙",
  },
  expert: {
    label: "MODULE 3 — MASTERY",
    desc: "Global IP doctrine, Web3 trademarks & advanced law",
    questions: 10,
    icon: "📕",
  },
};

/* ------------------------------------------------------------------ */
/*  TRADEMARK JOKES                                                    */
/* ------------------------------------------------------------------ */

interface TMJoke {
  setup: string;
  punchline: string;
}

const TM_JOKES: TMJoke[] = [
  { setup: "Why did the trademark attorney bring a ladder to court?", punchline: "Because the case had too many levels of confusion." },
  { setup: "What's the difference between a trademark and a copyright?", punchline: "About $500 an hour in legal fees to explain." },
  { setup: "Why did the generic brand go to therapy?", punchline: "It had an identity crisis — it used to be a trademark." },
  { setup: "How many trademark lawyers does it take to change a lightbulb?", punchline: "Three — one to change it, one to file a cease-and-desist against the old bulb, and one to trademark the new one." },
  { setup: "Why was the ® symbol so arrogant?", punchline: "Because it had federal registration and wouldn't let anyone forget it." },
  { setup: "What did the trademark say to the patent?", punchline: "\"You expire in 20 years. I'm forever.\"" },
  { setup: "Why did the startup founder trademark their morning coffee order?", punchline: "Because their lawyer said \'anything distinctive can be protected.\'" },
  { setup: "What's a trademark squatter's favorite hobby?", punchline: "Filing and chilling." },
  { setup: "Why don't trademarks ever get lost?", punchline: "Because they always have a distinctive mark." },
  { setup: "What did the TTAB judge say after a 200-page opposition filing?", punchline: "\"I'll allow it... after lunch.\"" },
  { setup: "Why did the brand owner break up with their trademark?", punchline: "They said it lost its distinctiveness." },
  { setup: "What's a trademark's favorite song?", punchline: "\"Don't Stop Believin\'\" — because abandonment kills." },
];

export function getRandomTMJoke(): TMJoke {
  return TM_JOKES[0];
}
