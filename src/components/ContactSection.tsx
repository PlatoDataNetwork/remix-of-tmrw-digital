import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be under 255 characters"),
  company: z.string().trim().max(200, "Company must be under 200 characters").optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be under 2000 characters"),
});

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: result.data.name,
        email: result.data.email,
        company: result.data.company || null,
        message: result.data.message,
      });

      if (error) throw error;

      toast({
        title: "Message sent",
        description: "Thank you for your inquiry. We will be in touch shortly.",
      });
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 lg:py-24 bg-card overflow-hidden" ref={ref}>
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
              Whether you're exploring Web3AI strategies or seeking real world assets expertise,
              we're here to help navigate your path forward.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {[
              { name: "name", label: "Name", type: "text", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "company", label: "Company", type: "text", required: false },
            ].map((field) => (
              <div key={field.name}>
                <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
                  {field.label} {field.required && <span className="text-red-400">*</span>}
                </label>
                <input
                  type={field.type}
                  required={field.required}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={(e) => {
                    setFormData({ ...formData, [field.name]: e.target.value });
                    if (errors[field.name]) setErrors((prev) => ({ ...prev, [field.name]: "" }));
                  }}
                  className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors text-sm"
                />
                {errors[field.name] && (
                  <p className="text-xs text-red-400 mt-1">{errors[field.name]}</p>
                )}
              </div>
            ))}
            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2 block">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  if (errors.message) setErrors((prev) => ({ ...prev, message: "" }));
                }}
                className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground transition-colors text-sm resize-none"
              />
              {errors.message && (
                <p className="text-xs text-red-400 mt-1">{errors.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex h-12 px-8 items-center gap-2 justify-center rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {submitting ? "Sending..." : "Send Message"}
              <Send className="h-4 w-4" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
