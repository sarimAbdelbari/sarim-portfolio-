'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { SectionLayout } from '@/components/section-layout';

export function ContactSection() {
  return (
    <SectionLayout
      id="contact"
      title="Get in Touch"
      description="Have a project in mind or want to discuss opportunities? I'd love to hear from you!"
    >
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="p-6 h-full">
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
            <div className="space-y-4">
              <a
                href="mailto:sarimabdelbari@gmail.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-5 w-5" />
                sarimabdelbari@gmail.com
              </a>
              <a
                href="tel:+2130549022271"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="h-5 w-5" />
                +213-0549022271
              </a>
              <a
                href="https://github.com/SarimAbdelbari"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
                GitHub Profile
              </a>
              <a
                href="https://www.linkedin.com/in/kerroucha-abdelbari-sarim/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                LinkedIn Profile
              </a>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="p-6 h-full">
            <form className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Your Name"
                  className="w-full"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="w-full"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Your Message"
                  className="w-full min-h-[150px]"
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </SectionLayout>
  );
}