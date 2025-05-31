
import React, { useState, useEffect } from 'react';
import { FeatureCard } from './features/FeatureCard';
import { FeaturesHeader } from './features/FeaturesHeader';
import { FeaturesCallToAction } from './features/FeaturesCallToAction';
import { features } from './features/featuresData';

export const LandingFeaturesSection = () => {
  const [expandedFeatures, setExpandedFeatures] = useState<Set<string>>(new Set());
  const [visibleFeatures, setVisibleFeatures] = useState<Set<string>>(new Set());

  const toggleFeature = (featureId: string) => {
    const newExpanded = new Set(expandedFeatures);
    if (newExpanded.has(featureId)) {
      newExpanded.delete(featureId);
    } else {
      newExpanded.add(featureId);
    }
    setExpandedFeatures(newExpanded);
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const featureId = entry.target.getAttribute('data-feature-id');
          if (featureId) {
            setVisibleFeatures(prev => new Set([...prev, featureId]));
          }
        }
      });
    }, observerOptions);

    const featureElements = document.querySelectorAll('[data-feature-id]');
    featureElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="section-padding bg-gradient-to-b from-background to-muted/10 relative overflow-hidden">
      {/* Background Enhancement */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-vibe-primary/3 via-transparent to-vibe-secondary/3" />
      </div>

      <div className="container-responsive relative z-10">
        {/* Section Header */}
        <FeaturesHeader />

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              index={index}
              isVisible={visibleFeatures.has(feature.id)}
              isExpanded={expandedFeatures.has(feature.id)}
              onToggle={() => toggleFeature(feature.id)}
            />
          ))}
        </div>

        {/* Call to Action */}
        <FeaturesCallToAction />
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-vibe-primary/5 rounded-full blur-3xl" />
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-vibe-secondary/5 rounded-full blur-3xl" />
    </section>
  );
};
