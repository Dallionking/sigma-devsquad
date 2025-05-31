
import React from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

const footerSections = {
  product: {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Documentation', href: '#docs' },
      { label: 'API Reference', href: '#api' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#about' },
      { label: 'Blog', href: '#blog' },
      { label: 'Careers', href: '#careers' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  support: {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#help' },
      { label: 'Community', href: '#community' },
      { label: 'Status', href: '#status' },
      { label: 'Security', href: '#security' },
    ],
  },
};

const socialLinks = [
  { icon: Github, href: '#github', label: 'GitHub' },
  { icon: Twitter, href: '#twitter', label: 'Twitter' },
  { icon: Linkedin, href: '#linkedin', label: 'LinkedIn' },
  { icon: Mail, href: '#email', label: 'Email' },
];

export const LandingFooter = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container-responsive py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 vibe-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">V</span>
              </div>
              <span className="vibe-heading-md text-foreground">
                Vibe <span className="vibe-gradient-text">DevSquad</span>
              </span>
            </div>
            <p className="vibe-body text-muted-foreground mb-6 max-w-md">
              Empowering developers with AI-driven collaboration tools that transform 
              how teams build, deploy, and scale applications.
            </p>
            
            {/* Social links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-muted hover:bg-vibe-primary/10 rounded-lg flex items-center justify-center 
                           text-muted-foreground hover:text-vibe-primary transition-all duration-200"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="vibe-body-sm text-muted-foreground hover:text-vibe-primary transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-border">
          <p className="vibe-body-sm text-muted-foreground mb-4 sm:mb-0">
            © 2024 Vibe DevSquad. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#privacy" className="vibe-body-sm text-muted-foreground hover:text-vibe-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="vibe-body-sm text-muted-foreground hover:text-vibe-primary transition-colors">
              Terms of Service
            </a>
            <a href="#cookies" className="vibe-body-sm text-muted-foreground hover:text-vibe-primary transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
