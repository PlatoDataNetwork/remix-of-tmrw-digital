/* ------------------------------------------------------------------ */
/*  ORBITAL BEAM — Question Bank                                       */
/*  3 Modules: Signal Cadet → Beam Operator → Orbital Commander        */
/*  Topics: RWA, Web3, Tokenization, DeFi, AI Infrastructure           */
/* ------------------------------------------------------------------ */

export type OrbitalModule = "cadet" | "operator" | "commander";

export interface OrbitalQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  insight: string;
}

export const ORBITAL_MODULE_META: Record<OrbitalModule, { label: string; icon: string; desc: string; questions: number; passingPct: number }> = {
  cadet: { label: "MODULE 1 — SIGNAL CADET", icon: "📡", desc: "RWA fundamentals, tokenization basics & Web3 infrastructure", questions: 10, passingPct: 70 },
  operator: { label: "MODULE 2 — BEAM OPERATOR", icon: "⚡", desc: "DeFi mechanics, compliance frameworks & cross-chain RWA flows", questions: 10, passingPct: 70 },
  commander: { label: "MODULE 3 — ORBITAL COMMANDER", icon: "🛰️", desc: "Institutional-grade RWA architecture, sovereign asset frameworks & AI-driven markets", questions: 10, passingPct: 70 },
};

export const ORBITAL_QUESTION_BANK: Record<OrbitalModule, OrbitalQuestion[]> = {
  /* ================================================================ */
  /*  MODULE 1 — SIGNAL CADET: RWA & Web3 Fundamentals                 */
  /* ================================================================ */
  cadet: [
    { id: "c1", question: "What does 'tokenization of real-world assets' fundamentally mean?", options: ["Converting physical assets into digital tokens on a blockchain.", "Creating a cryptocurrency for every physical object.", "Digitizing paperwork for real estate transactions.", "Building a metaverse representation of physical assets."], correctIndex: 0, insight: "Tokenization converts ownership rights of real-world assets (real estate, commodities, securities) into digital tokens on a blockchain, enabling fractional ownership, increased liquidity, and 24/7 trading." },
    { id: "c2", question: "Which organization issued the landmark report projecting $16 trillion in tokenized assets by 2030?", options: ["Goldman Sachs.", "The World Economic Forum.", "Boston Consulting Group.", "McKinsey & Company."], correctIndex: 2, insight: "BCG and ADDX published a widely cited report projecting that tokenized illiquid assets could reach $16.1 trillion by 2030 — roughly 10% of global GDP." },
    { id: "c3", question: "What is the primary function of an oracle in a blockchain-based RWA system?", options: ["Mining new blocks for the network.", "Providing off-chain real-world data to smart contracts.", "Storing private keys securely.", "Validating user identities for KYC."], correctIndex: 1, insight: "Oracles (like Chainlink) bridge the gap between blockchains and the real world by feeding external data — asset prices, weather, interest rates — into smart contracts, which is essential for RWA valuations." },
    { id: "c4", question: "What is a 'security token' in the context of digital assets?", options: ["A token used to secure a blockchain network through staking.", "A digital representation of a traditional security (equity, debt, or asset-backed) subject to securities regulation.", "An authentication token for logging into crypto exchanges.", "A privacy-focused cryptocurrency."], correctIndex: 1, insight: "Security tokens represent ownership in real-world assets and are subject to securities laws. Unlike utility tokens, they derive value from an external, tradable asset and must comply with regulations like SEC guidelines." },
    { id: "c5", question: "What is 'fractional ownership' and why is it significant for RWAs?", options: ["Owning a fraction of a blockchain node.", "Allowing multiple investors to own portions of a single high-value asset through tokenization.", "Splitting a company into multiple subsidiaries.", "A type of partial loan collateralization."], correctIndex: 1, insight: "Fractional ownership through tokenization lets investors own portions of assets like commercial real estate or fine art with much lower capital requirements, democratizing access to previously illiquid markets." },
    { id: "c6", question: "What does ERC-3643 specifically standardize?", options: ["Decentralized exchange protocols.", "Permissioned token transfers with on-chain identity verification for compliant security tokens.", "Cross-chain bridge communication.", "NFT royalty distribution."], correctIndex: 1, insight: "ERC-3643 (formerly T-REX) is the most widely adopted standard for compliant security tokens, enabling on-chain identity checks and transfer restrictions — critical for tokenized RWAs that must meet regulatory requirements." },
    { id: "c7", question: "What is a 'liquidity premium' in the context of tokenized assets?", options: ["A fee charged by liquidity providers in DeFi pools.", "The additional value an asset gains when tokenization makes it easier to buy and sell.", "The interest rate earned from providing liquidity.", "A bonus paid to early token holders."], correctIndex: 1, insight: "Traditionally illiquid assets like real estate or private equity trade at a discount due to difficulty selling. Tokenization can reduce this 'illiquidity discount' by enabling secondary market trading, potentially unlocking 20-30% additional value." },
    { id: "c8", question: "What is the primary regulatory framework that tokenized securities must comply with in the United States?", options: ["The Bank Secrecy Act.", "SEC regulations including Regulation D, Regulation S, and Regulation A+.", "The Dodd-Frank Act exclusively.", "CFTC commodity trading rules."], correctIndex: 1, insight: "Tokenized securities in the US must comply with SEC regulations. Reg D (private placements to accredited investors), Reg S (offshore offerings), and Reg A+ (mini-IPO for broader access) are the most commonly used exemptions." },
    { id: "c9", question: "What role does a 'transfer agent' play in the tokenized securities ecosystem?", options: ["They physically transfer assets between warehouses.", "They maintain official records of security ownership and ensure compliant transfers.", "They convert fiat currency to stablecoins.", "They validate blockchain transactions."], correctIndex: 1, insight: "Transfer agents are legally required intermediaries that maintain records of who owns securities. In tokenized securities, they ensure on-chain ownership records align with legal requirements — bridging traditional finance infrastructure with blockchain." },
    { id: "c10", question: "What is the key difference between a 'permissioned' and 'permissionless' blockchain for RWA tokenization?", options: ["Permissioned blockchains are faster; permissionless are more secure.", "Permissioned blockchains restrict who can participate, enabling regulatory compliance; permissionless are open to anyone.", "Permissioned blockchains use proof-of-work; permissionless use proof-of-stake.", "There is no meaningful difference for RWA applications."], correctIndex: 1, insight: "Most institutional RWA tokenization uses permissioned or hybrid approaches because regulators require controlled access, KYC/AML compliance, and the ability to restrict transfers — features that purely permissionless chains don't natively support." },
  ],

  /* ================================================================ */
  /*  MODULE 2 — BEAM OPERATOR: DeFi, Compliance & Cross-Chain RWA     */
  /* ================================================================ */
  operator: [
    { id: "o1", question: "What is 'atomic settlement' and why does it matter for tokenized RWAs?", options: ["Settlement that happens using nuclear energy.", "Simultaneous exchange of assets and payment in a single, indivisible transaction on-chain.", "Settlement within one atomic clock cycle.", "Breaking large settlements into the smallest possible units."], correctIndex: 1, insight: "Atomic settlement eliminates counterparty risk by ensuring both sides of a trade execute simultaneously or not at all. For RWAs, this reduces settlement from T+2 days to near-instant, freeing up billions in trapped capital." },
    { id: "o2", question: "BlackRock's BUIDL fund tokenized on Ethereum represents which type of asset?", options: ["Commercial real estate.", "US Treasury securities.", "Corporate bonds.", "Gold reserves."], correctIndex: 1, insight: "BlackRock's USD Institutional Digital Liquidity Fund (BUIDL), launched in March 2024 on Ethereum via Securitize, invests in US Treasuries. It quickly surpassed $500M in AUM, signaling major institutional confidence in tokenized government debt." },
    { id: "o3", question: "What is 'composability' in DeFi and why is it critical for tokenized RWAs?", options: ["The ability to compose music using blockchain.", "The ability to combine and stack different DeFi protocols together like building blocks.", "Writing smart contracts in multiple programming languages.", "The process of decomposing complex trades."], correctIndex: 1, insight: "Composability lets tokenized RWAs plug into existing DeFi infrastructure — use tokenized real estate as collateral on Aave, trade tokenized bonds on Uniswap. This interoperability is what makes DeFi + RWA a powerful combination." },
    { id: "o4", question: "What is 'rehypothecation' in the context of tokenized assets?", options: ["Hypothesizing about future asset values.", "Using an asset posted as collateral to serve as collateral again in another transaction.", "Resetting a smart contract's state.", "A method of token burning."], correctIndex: 1, insight: "Rehypothecation allows collateral to be reused across multiple transactions, increasing capital efficiency. In tokenized markets, smart contracts can enforce transparent rehypothecation chains — unlike opaque traditional finance practices that contributed to the 2008 crisis." },
    { id: "o5", question: "What does 'NAV on-chain' mean for tokenized funds?", options: ["Navigation data stored on blockchain.", "Real-time Net Asset Value calculation and publication directly on the blockchain.", "Network Access Verification protocol.", "A new consensus algorithm."], correctIndex: 1, insight: "Publishing NAV (Net Asset Value) on-chain provides transparent, real-time fund valuation that anyone can verify. This eliminates reliance on end-of-day calculations and self-reported values, increasing trust in tokenized fund products." },
    { id: "o6", question: "What is the 'Howey Test' and why is it relevant to RWA tokenization?", options: ["A test for blockchain network performance.", "A US legal test to determine whether a transaction qualifies as an investment contract (security).", "A compliance framework for European digital assets.", "A smart contract auditing standard."], correctIndex: 1, insight: "The Howey Test (from SEC v. Howey, 1946) determines if something is a security: investment of money, in a common enterprise, with expectation of profit from others' efforts. Most tokenized RWAs meet these criteria and must comply with securities law." },
    { id: "o7", question: "What is MiCA and how does it impact tokenized assets in Europe?", options: ["A type of mineral used in chip manufacturing.", "The Markets in Crypto-Assets Regulation — the EU's comprehensive framework for digital asset regulation.", "A blockchain consensus mechanism.", "A decentralized identity protocol."], correctIndex: 1, insight: "MiCA (Markets in Crypto-Assets) is the EU's landmark regulatory framework that went into effect in 2024. It provides legal clarity for tokenized assets, stablecoins, and crypto-asset service providers — the most comprehensive crypto regulation globally." },
    { id: "o8", question: "What is 'tokenized deposit' as proposed by JPMorgan and other banks?", options: ["Depositing physical tokens at a bank branch.", "A blockchain-based representation of commercial bank deposits that maintains existing deposit insurance.", "A type of stablecoin without any backing.", "Transferring savings to a DeFi protocol."], correctIndex: 1, insight: "Tokenized deposits represent existing bank deposits on a blockchain, maintaining FDIC insurance and bank guarantees while enabling programmability and instant settlement. Banks prefer this model over stablecoins because it preserves their deposit base." },
    { id: "o9", question: "What is a 'Special Purpose Vehicle' (SPV) in RWA tokenization?", options: ["A special type of blockchain node.", "A legal entity created specifically to hold and isolate assets being tokenized from the issuer's balance sheet.", "A vehicle used to transport physical assets.", "A DeFi protocol for special transactions."], correctIndex: 1, insight: "SPVs are bankruptcy-remote legal entities that hold the underlying assets. If the token issuer goes bankrupt, the assets in the SPV remain protected for token holders — a critical legal structure for investor protection in tokenized markets." },
    { id: "o10", question: "What is 'cross-chain interoperability' and why is it essential for tokenized RWA markets?", options: ["Running the same smart contract on multiple chains.", "The ability for tokenized assets to move and be recognized across different blockchain networks.", "Connecting multiple blockchains to the same database.", "Using one wallet across different exchanges."], correctIndex: 1, insight: "Tokenized RWAs need to be tradeable across multiple chains to maximize liquidity. Protocols like Chainlink CCIP and LayerZero enable cross-chain transfers while maintaining compliance — preventing the fragmentation that would kill RWA liquidity." },
  ],

  /* ================================================================ */
  /*  MODULE 3 — ORBITAL COMMANDER: Institutional Architecture          */
  /* ================================================================ */
  commander: [
    { id: "x1", question: "What is 'programmable compliance' in institutional RWA infrastructure?", options: ["Writing compliance reports using code.", "Smart contracts that automatically enforce regulatory rules, transfer restrictions, and investor eligibility at the protocol level.", "A compliance training program delivered via blockchain.", "Government-mandated blockchain standards."], correctIndex: 1, insight: "Programmable compliance embeds regulatory rules directly into token smart contracts — automatically blocking unauthorized transfers, enforcing holding periods, and maintaining investor accreditation. This reduces compliance costs by up to 80% while making violations technically impossible." },
    { id: "x2", question: "What is 'sovereign tokenization' and why are nation-states pursuing it?", options: ["Tokenizing national flags and anthems as NFTs.", "Nations creating digital representations of sovereign assets (bonds, reserves, infrastructure) on state-controlled blockchain infrastructure.", "A cryptocurrency issued by a sovereign individual.", "Tokenizing diplomatic passports."], correctIndex: 1, insight: "Countries like Singapore, UAE, Switzerland, and Hong Kong are building frameworks for tokenized sovereign bonds and national asset registries. This represents a $100T+ opportunity as nations digitize their balance sheets for efficiency, transparency, and global capital access." },
    { id: "x3", question: "What is the 'institutional trilemma' that RWA platforms must solve?", options: ["Speed, security, and decentralization.", "Compliance, composability, and institutional-grade custody — achieving all three simultaneously.", "Scalability, privacy, and interoperability.", "Cost, speed, and regulatory approval."], correctIndex: 1, insight: "Institutions require regulatory compliance, DeFi composability (for liquidity/yield), and bank-grade custody — but most platforms only deliver two of three. Solving all three is the key to unlocking institutional capital flows into tokenized markets." },
    { id: "x4", question: "What is 'delivery versus payment' (DvP) and how does blockchain improve it?", options: ["A payment method for delivery services.", "A settlement mechanism ensuring simultaneous exchange of securities and payment, which blockchain makes atomic and near-instant.", "Paying for blockchain development in installments.", "A DeFi lending mechanism."], correctIndex: 1, insight: "Traditional DvP in securities takes T+1 or T+2 days and requires intermediaries (clearinghouses, custodians). Blockchain-native DvP settles atomically in seconds, eliminating counterparty risk and freeing the estimated $5-10 trillion currently locked in settlement processes." },
    { id: "x5", question: "What is a 'digital twin' of a financial instrument?", options: ["Two identical copies of a smart contract.", "An on-chain representation that mirrors the economic terms, cash flows, and lifecycle of a traditional financial instrument in real-time.", "A backup copy of a token on a different blockchain.", "A virtual simulation of market conditions."], correctIndex: 1, insight: "Digital twins of bonds, loans, and structured products enable real-time portfolio monitoring, automated coupon payments, and instant valuation — replacing the manual, spreadsheet-driven processes that still dominate institutional finance." },
    { id: "x6", question: "What role does 'zero-knowledge proof' technology play in institutional RWA markets?", options: ["Proving that a blockchain has zero bugs.", "Enabling verification of compliance, identity, or asset data without revealing the underlying sensitive information.", "A method to create tokens with no transaction fees.", "Encrypting all data on a blockchain permanently."], correctIndex: 1, insight: "ZK proofs let institutions prove regulatory compliance (accredited investor status, KYC completion, jurisdictional eligibility) without exposing private data — solving the fundamental tension between blockchain transparency and institutional privacy requirements." },
    { id: "x7", question: "What is 'tokenized carbon credit' infrastructure and why is it gaining institutional traction?", options: ["Creating NFTs of carbon molecules.", "On-chain verification, trading, and retirement of carbon credits with transparent provenance and prevention of double-counting.", "A carbon tax payment system on blockchain.", "Measuring blockchain energy consumption in carbon units."], correctIndex: 1, insight: "Tokenized carbon credits solve the voluntary carbon market's biggest problems: double-counting, opaque provenance, and illiquidity. With the carbon market projected to reach $50B+ by 2030, transparent on-chain infrastructure is attracting institutional capital." },
    { id: "x8", question: "What is the significance of JP Morgan's Onyx platform for institutional RWA adoption?", options: ["It's a gaming platform for bank employees.", "It provides institutional-grade blockchain infrastructure for tokenized repo agreements, collateral settlement, and cross-border payments.", "It's a cryptocurrency exchange for retail investors.", "It's a KYC verification service."], correctIndex: 1, insight: "Onyx has processed over $900B in tokenized repo transactions, proving institutional blockchain adoption at scale. Its Tokenized Collateral Network enables instant collateral transfers — a capability that would have been transformative during the 2008 crisis." },
    { id: "x9", question: "What is 'AI-driven asset valuation' in the context of tokenized RWA infrastructure?", options: ["Using AI to create digital art NFTs.", "Machine learning models that provide real-time, continuous valuation of tokenized assets by analyzing market data, comparable sales, and on-chain activity.", "Artificial intelligence that trades tokens automatically.", "AI chatbots that explain asset values to investors."], correctIndex: 1, insight: "AI-driven valuation replaces quarterly appraisals with continuous, data-driven pricing. For tokenized real estate and private credit, this enables real-time NAV calculations, dynamic collateral management, and automated risk assessment at institutional scale." },
    { id: "x10", question: "What is the projected total addressable market (TAM) for tokenized assets by 2030 according to McKinsey's most recent analysis?", options: ["$1 trillion.", "$2 trillion in a bear case, potentially $4 trillion in a bull case.", "Approximately $16 trillion.", "Over $100 trillion."], correctIndex: 1, insight: "McKinsey's 2024 analysis projects $2T (conservative) to $4T (optimistic) in tokenized assets by 2030, more conservative than BCG's $16T estimate. The first wave is dominated by cash deposits, bonds, and repos — less glamorous but higher volume than real estate or art tokenization." },
  ],
};

function shuffleOptions<T extends { options: string[]; correctIndex: number }>(q: T): T {
  const correctOption = q.options[q.correctIndex];
  const indices = q.options.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const shuffled = indices.map(i => q.options[i]);
  return { ...q, options: shuffled, correctIndex: shuffled.indexOf(correctOption) };
}

export function pickOrbitalQuestions(module: OrbitalModule, count: number = 10): OrbitalQuestion[] {
  const pool = [...ORBITAL_QUESTION_BANK[module]];
  const selected: OrbitalQuestion[] = [];
  const n = Math.min(count, pool.length);
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    selected.push(pool.splice(idx, 1)[0]);
  }
  return selected.map(shuffleOptions);
}

/* ------------------------------------------------------------------ */
/*  JOKE BANK — Blockchain, AI, VC, Startup                           */
/* ------------------------------------------------------------------ */

export const JOKE_BANK = [
  { setup: "Why did the blockchain developer break up with their partner?", punchline: "There was no consensus." },
  { setup: "How many VCs does it take to change a lightbulb?", punchline: "None. They wait for it to be 10x brighter, then fight over who saw it first." },
  { setup: "Why was the AI model feeling lonely?", punchline: "It kept overfitting to its training data and couldn't generalize to new relationships." },
  { setup: "What did the startup founder say to the VC who ghosted them?", punchline: "'I guess our Series A was a Series Nah.'" },
  { setup: "Why don't blockchain developers ever get lost?", punchline: "Because every transaction leaves a permanent, immutable trail." },
  { setup: "What's a VC's favorite workout?", punchline: "Running — from term sheets they signed in 2021." },
  { setup: "Why did the neural network go to therapy?", punchline: "It had too many layers of issues." },
  { setup: "How does a startup founder count sheep?", punchline: "One burn rate... two burn rates... oh no, we're out of runway." },
  { setup: "Why did the smart contract go to school?", punchline: "To get a little more execution." },
  { setup: "What's the difference between a startup and a pizza?", punchline: "A pizza can feed a family of four." },
  { setup: "Why are blockchain developers bad at dating?", punchline: "They can never commit without verification from at least 51% of the network." },
  { setup: "What did the AI say to the dataset?", punchline: "'You complete me... statistically.'" },
  { setup: "Why did the VC invest in a calendar company?", punchline: "Because its days were numbered and that's a feature, not a bug." },
  { setup: "What's a blockchain's favorite type of music?", punchline: "Heavy metal — specifically, cryptography." },
  { setup: "Why did the machine learning model fail its exam?", punchline: "It kept giving the same answer to different questions — classic overfitting." },
  { setup: "What did the Series B startup say to the Series A startup?", punchline: "'You think YOUR burn rate is scary?'" },
  { setup: "Why don't cryptocurrencies ever feel secure?", punchline: "Because even their KEYS are private." },
  { setup: "How do you know a startup has achieved product-market fit?", punchline: "The founder sleeps 5 hours a night instead of 3." },
  { setup: "Why was the GPT model a terrible comedian?", punchline: "It kept generating 'based on my training data' before every punchline." },
  { setup: "What's a Web3 developer's least favorite day?", punchline: "Gas day." },
  { setup: "Why did the founder pivot?", punchline: "Because the original idea didn't have enough TAM-tam." },
  { setup: "What do you call an AI that tells jokes?", punchline: "A pun-ctional language model." },
  { setup: "Why did Ethereum go to the doctor?", punchline: "It had gas problems." },
  { setup: "What's a VC's favorite Shakespeare play?", punchline: "Much Ado About Funding." },
  { setup: "Why did the startup founder cross the road?", punchline: "To pivot to the other side." },
];

export function getRandomJoke(): { setup: string; punchline: string } {
  return JOKE_BANK[0];
}
