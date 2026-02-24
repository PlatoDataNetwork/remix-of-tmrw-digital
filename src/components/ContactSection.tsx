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
    <section id="contact" className="py-32 lg:py-40 bg-card" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
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
              Whether you're exploring capital markets strategies or seeking investor relations expertise,
              we're here to help navigate your path forward.
            </p>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>info@rcafinancialpartners.com</p>
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
