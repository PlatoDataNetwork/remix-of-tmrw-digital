import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { User } from "lucide-react";
import teamAstronauts from "@/assets/team-astronauts.jpeg";

const teamMembers = [
  {
    name: "Justin Hartzman",
    role: "Chairman",
    bio: "Serial Entrepreneur and Capital Market Veteran. Co-founded CoinSmart and WonderFi (recently acquired by Robinhood). Over a decade scaling fintech companies and executing go-public strategies.",
  },
  {
    name: "Paul Thomson",
    role: "CEO",
    bio: "Founder of Carbon Distributed Technologies. Independent Director at eXeBlock Technology. Former CCO at Numus Capital. Deep expertise in corporate governance, compliance, and capital markets.",
  },
  {
    name: "Bryan Feinberg",
    role: "COO / CTO",
    bio: "CEO of Zephyr Technology Ventures and Plato AI. Licensed Investment Banker (Series 7, 63, 79). Led startup from zero to $130M revenue and TASE public listing. Expert in AI, blockchain, and big data.",
  },
  {
    name: "Zach Goldenberg",
    role: "Advisor",
    bio: "Strategic advisor with deep expertise in capital markets, investor relations, and public company growth strategies.",
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-card border border-border rounded-2xl p-8 hover:border-foreground/20 transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6 group-hover:bg-foreground/10 transition-colors">
                <User className="h-7 w-7 text-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-1">{member.name}</h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">{member.role}</p>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
