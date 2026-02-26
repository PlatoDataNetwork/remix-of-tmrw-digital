import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import teamAstronauts from "@/assets/team-astronauts.jpeg";
import astronautHeadshot from "@/assets/astronaut-headshot.jpeg";
const teamMembers = [
  {
    name: "Justin Hartzman",
    role: "Chairman",
    bio: "Serial entrepreneur and capital markets veteran. Co-founded CoinSmart, leading it to a public listing and subsequent sale to WonderFi, recently acquired by Robinhood. Board director at WonderFi. Over a decade of experience scaling fintech companies and executing successful go-public strategies across North America.",
  },
  {
    name: "Paul Thomson",
    role: "CEO",
    bio: "Founder of Carbon Distributed Technologies AG. Independent Director at eXeBlock Technology Inc. Former Chief Compliance Officer at Numus Capital Corp. Brings deep expertise in corporate governance, regulatory compliance, capital markets strategy, and blockchain-based environmental asset infrastructure globally.",
  },
  {
    name: "Bryan Feinberg",
    role: "COO / CTO",
    bio: "CEO of Zephyr Technology Ventures and Plato AI. Licensed Investment Banker holding Series 7, 63 and 79 certifications. Led a startup from inception to $130M in revenue and a TASE public listing. Recognized expert in artificial intelligence, blockchain infrastructure, and big data analytics platforms.",
  },
  {
    name: "Zach Goldenberg",
    role: "Advisor",
    bio: "Principal at Liberty Venture Partners. Corporate securities lawyer with extensive experience structuring financing and go-public transactions on Canadian markets including TSXV, CSE and CBOE Canada. Holds JD/HBA from Western Law and Ivey Business School. ICD.D designate and TSXV Advisory Committee member.",
  },
  {
    name: "Josh Smith",
    role: "Chief Security Officer",
    bio: "Over 20 years of advanced deep-stack development specializing in cybersecurity and distributed systems. Full-stack architect delivering cross-chain, smart contract–backed solutions to enterprise and government clients. Proven expertise in securing complex infrastructure across Web3 and traditional environments.",
  },
  {
    name: "Amjad Khatri",
    role: "DevOps",
    bio: "Full-stack developer and DevOps engineer with deep expertise in AI-driven application architecture and modern UI/UX design. Specializes in building scalable cloud infrastructure, CI/CD pipelines, and intelligent automation workflows. Passionate about bridging cutting-edge AI capabilities with seamless user experiences.",
  },
];

const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="team" className="relative py-16 lg:py-24 bg-background overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none colorful-gradient opacity-0">
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full bg-[hsl(260,80%,60%,0.06)] blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Leadership Team</p>
          <h2 className="text-3xl md:text-5xl font-light text-foreground mb-6">
            Experienced Leadership
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-none mx-auto font-light whitespace-nowrap">
            Proven executives with track record in Fintech, AI, Blockchain, Gaming and Public Markets.
          </p>
          <div className="mt-10 max-w-4xl mx-auto rounded-2xl overflow-hidden relative">
            <img 
              src={teamAstronauts} 
              alt="Futuristic astronauts representing forward-thinking leadership" 
              className="w-full h-auto object-cover rounded-2xl"
              loading="lazy"
            />
            <div 
              className="absolute inset-0 rounded-2xl animated-gradient-icon-bright mix-blend-color opacity-70"
            />
          </div>
        </motion.div>

        {/* Horizontal card layout — 2 per row */}
        <div className="grid md:grid-cols-2 gap-5">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-card border border-border rounded-2xl p-6 hover:border-foreground/20 transition-all duration-300 hover:-translate-y-1 flex gap-5 items-start"
            >
              <div className="shrink-0">
                <div className="h-14 w-14 rounded-full overflow-hidden animated-gradient-icon">
                  <img src={astronautHeadshot} alt="Team member avatar" className="h-full w-full object-cover object-top" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3 mb-2">
                  <h3 className="text-base font-medium text-foreground">{member.name}</h3>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-primary/70">{member.role}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed font-light">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
