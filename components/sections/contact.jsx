"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { usePerformanceMode } from "@/components/hooks/usePerformanceMode";
import { Send } from "lucide-react";

const INITIAL_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/sarimAbdelbari",
    color: "#E6EDF3",
    hoverBg: "rgba(230, 237, 243, 0.12)",
    iconSrc: "/assets/svg/github.svg",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/kerroucha-abdelbari-sarim/",
    color: "#0A66C2",
    hoverBg: "rgba(10, 102, 194, 0.12)",
    iconSrc: "/assets/svg/linkedin-svgrepo-com.svg",
  },
  {
    name: "Dev.to",
    url: "https://dev.to/sarimkerroucha",
    color: "#FFFFFF",
    hoverBg: "rgba(255, 255, 255, 0.1)",
    iconSrc: "/assets/svg/dev-to-svgrepo-com.svg",
  },
  {
    name: "X",
    url: "https://x.com/SarimAbdelbari",
    color: "#E7E9EA",
    hoverBg: "rgba(231, 233, 234, 0.12)",
    iconSrc: "/assets/svg/X_logo_2023.svg",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/sarimabdelbari/",
    color: "#E4405F",
    hoverBg: "rgba(228, 64, 95, 0.12)",
    iconSrc: "/assets/svg/instagram-2016-logo-svgrepo-com.svg",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/SarimAbdelbari",
    color: "#1877F2",
    hoverBg: "rgba(24, 119, 242, 0.12)",
    iconSrc: "/assets/svg/facebook-network-communication-internet-interaction-svgrepo-com.svg",
  },
];

const Contact = () => {
  // Performance mode for mobile devices
  const { shouldReduceMotion } = usePerformanceMode();
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setFeedback("");

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setStatus("error");
      setFeedback("Contact form is not configured.");
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.subject.trim(),
          message: form.message.trim(),
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        setStatus("error");
        setFeedback(
          result?.message || "Failed to send message. Please try again."
        );
        return;
      }

      setStatus("success");
      setFeedback("Message sent successfully. I'll get back to you soon!");
      setForm(INITIAL_FORM);
    } catch {
      setStatus("error");
      setFeedback("Something went wrong. Please try again.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const zigzagVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 1.5, ease: "easeInOut" }
    }
  };

  return (
    <section className="min-h-screen py-16 px-3 lg:px-10 relative overflow-hidden">
      {/* Enhanced Background Effects - Disabled on mobile for performance */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Large animated gradient orbs */}
          <motion.div
            className="absolute top-10 left-5 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary/12 via-primary/6 to-transparent blur-3xl"
            animate={{
              x: [0, 60, 0],
              y: [0, -40, 0],
              scale: [1, 1.3, 1],
              rotate: [0, 120, 240, 360]
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute bottom-10 right-5 w-[400px] h-[400px] rounded-full bg-gradient-to-l from-primary/10 via-primary/5 to-transparent blur-3xl"
            animate={{
              x: [0, -50, 0],
              y: [0, 30, 0],
              scale: [1, 0.7, 1],
              rotate: [0, -120, -240, -360]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          />

          {/* Medium orbs */}
          <motion.div
            className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-primary/8 to-transparent blur-2xl"
            animate={{
              x: [0, 40, 0],
              y: [0, -25, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />

        {/* Floating geometric shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${i % 2 === 0 ? 'w-3 h-3 rounded-full bg-primary/15' : 'w-2 h-2 rotate-45 bg-primary/20'}`}
            style={{
              left: `${15 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.3, 1],
              rotate: i % 2 === 0 ? [0, 360] : [45, 405]
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8
            }}
          />
        ))}

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-primary/[0.01] to-primary/[0.03] opacity-50" />

        {/* Subtle mesh pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="h-full w-full" style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, currentColor 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, currentColor 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px, 40px 40px'
          }} />
        </div>

        {/* Animated light rays */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-1 h-32 bg-gradient-to-b from-primary/20 to-transparent blur-sm"
          animate={{
            rotate: [0, 360],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ transformOrigin: 'center bottom' }}
        />
        
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-1 h-24 bg-gradient-to-t from-primary/15 to-transparent blur-sm"
          animate={{
            rotate: [180, 540],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 5
          }}
          style={{ transformOrigin: 'center top' }}
        />
      </div>
      )}

      <motion.div
        className="max-w-6xl mx-auto relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Section Header */}
        <motion.div 
          className="mb-16"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            <span className="border-b-4 border-primary pb-2">Contact</span>
          </h2>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="space-y-12"
          variants={itemVariants}
        >
          {/* Hero Message */}
          <motion.div
            className="space-y-6"
            variants={itemVariants}
          >
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              Let's be awesome together!
            </h3>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              As a dev, I am driven by my love for coding and my desire for new challenges. 
              If you have opportunities for collaboration or want to build something amazing, don't hesitate to contact me!
            </p>
          </motion.div>

          {/* Form + Socials: stacked on mobile, two columns on desktop */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12 lg:items-start text-left">
            {/* Contact Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="w-full space-y-4"
              variants={itemVariants}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    maxLength={100}
                    value={form.name}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    autoComplete="name"
                    className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30 disabled:opacity-60"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={254}
                    value={form.email}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    autoComplete="email"
                    className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30 disabled:opacity-60"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-foreground">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  maxLength={200}
                  value={form.subject}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30 disabled:opacity-60"
                  placeholder="What is this about?"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  maxLength={5000}
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  className="w-full resize-y rounded-xl border border-border bg-background/60 px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30 disabled:opacity-60"
                  placeholder="Tell me about your project or idea..."
                />
              </div>

              {feedback && (
                <p
                  role="status"
                  className={`text-sm ${
                    status === "success" ? "text-emerald-500" : "text-destructive"
                  }`}
                >
                  {feedback}
                </p>
              )}

              <motion.div
                className="pt-2 flex justify-center lg:justify-start"
                whileHover={{ scale: status === "loading" ? 1 : 1.05 }}
                whileTap={{ scale: status === "loading" ? 1 : 0.95 }}
              >
                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "loading"}
                  className="relative rounded-full px-8 md:px-12 py-4 md:py-6 text-lg md:text-xl font-medium cursor-pointer bg-gradient-to-r from-[#1a5fb8] via-[#1e70ca] to-[#3a85d9] text-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1a5fb8] via-[#1e70ca] to-[#3a85d9] opacity-75 blur-xl group-hover:opacity-100 transition-all duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
                  <span className="relative z-10 flex items-center gap-3">
                    {status === "loading" ? "Sending..." : "Get in touch!"}
                    <motion.div
                      className="group-hover:translate-x-1 transition-transform duration-300"
                      animate={{ x: [0, 3, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Send size={24} />
                    </motion.div>
                  </span>
                </Button>
              </motion.div>
            </motion.form>

            {/* Social Media Links */}
            <motion.div
              className="space-y-5"
              variants={itemVariants}
            >
              <h4 className="text-lg font-semibold text-foreground text-center lg:text-left">
                Find me on
              </h4>

              {/* Mobile: centered icon wrap */}
              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-5 lg:hidden">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="relative w-14 h-14 backdrop-blur-sm border border-border rounded-full flex items-center justify-center bg-background/50 transition-all duration-300 group shadow-lg hover:shadow-xl"
                    style={{
                      borderColor:
                        hoveredSocial === social.name
                          ? `${social.color}80`
                          : undefined,
                      backgroundColor:
                        hoveredSocial === social.name
                          ? social.hoverBg
                          : undefined,
                    }}
                    onHoverStart={() => setHoveredSocial(social.name)}
                    onHoverEnd={() => setHoveredSocial(null)}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <Image
                      src={social.iconSrc}
                      alt={social.name}
                      width={28}
                      height={28}
                      className="h-7 w-7 object-contain"
                    />
                    {hoveredSocial === social.name && (
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-8 text-xs font-medium whitespace-nowrap"
                        style={{ color: social.color }}
                      >
                        {social.name}
                      </motion.span>
                    )}
                  </motion.a>
                ))}
              </div>

              {/* Desktop: vertical list with icon + label */}
              <div className="hidden lg:flex flex-col gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-xl border border-border bg-background/50 backdrop-blur-sm px-4 py-3 transition-all duration-300 group shadow-md hover:shadow-lg"
                    whileHover={{
                      x: 4,
                      backgroundColor: social.hoverBg,
                      borderColor: `${social.color}80`,
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background/60">
                      <Image
                        src={social.iconSrc}
                        alt=""
                        width={24}
                        height={24}
                        className="h-6 w-6 object-contain"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                      {social.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer Message */}
          <motion.div
            className="pt-8"
            variants={itemVariants}
          >
            <motion.div
              animate={{ rotate: [0, 10, 0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-6xl mb-4"
            >
              💻
            </motion.div>
            <p className="text-foreground font-medium text-base md:text-lg mb-2">
              Coded with ❤️ by Sarim Kerroucha
            </p>
            <p className="text-sm md:text-base text-muted-foreground">
              Ready to build something amazing together!
            </p>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-8 opacity-20">
          <motion.div
            className="flex items-center space-x-4"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-2 h-2 bg-primary rounded-full" />
            <div className="w-4 h-4 border-2 border-primary rotate-45" />
            <div className="w-2 h-2 bg-primary rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;