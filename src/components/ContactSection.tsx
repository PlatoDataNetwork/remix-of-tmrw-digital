import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // placeholder
    alert("Thank you for your inquiry. We will be in touch shortly.");
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  return (
    <section id="contact" className="relative py-32 lg:py-40 bg-card overflow-hidden" ref={ref}>
      {/* Colorful theme gradient */}
      <div className="absolute inset-0 pointer-events-none colorful-gradient opacity-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[hsl(250,80%,60%,0.08)] blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full bg-[hsl(330,80%,55%,0.06)] blur-[100px]" />
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Contact</p>
            <h2 className="text-3xl md:text-5xl font-light text-foreground mb-6">
              Let's Start a Conversation
            </h2>
            <p className="text-muted-foreground leading-relaxed font-light mb-10">
              Whether you're exploring Web3 AI strategies or seeking real world assets expertise,
              we're here to help navigate your path forward.
            </p>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>info@thetomorrowcompany.com</p>
              <p>New York, NY</p>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {[
              { name: "name", label: "Name", type: "text" },
              { name: "email", label: "Email", type: "email" },
              { name: "company", label: "Company", type: "text" },
            ].map((field) => (
              <div key={field.name}>
                <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  required
                  value={formData[field.name as keyof typeof formData]}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors text-sm"
                />
              </div>
            ))}
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
                Message
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors text-sm resize-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-12 px-8 items-center gap-2 justify-center rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Send Message
              <Send className="h-4 w-4" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
