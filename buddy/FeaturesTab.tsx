import React from "react";
import "./FeaturesTab.css";

const features = [
  {
    title: "AI-powered Idea Analysis and Feedback",
    description: "Leverage advanced AI to analyze your ideas and receive actionable, intelligent feedback instantly."
  },
  {
    title: "Community-driven Collaboration and Networking",
    description: "Connect and collaborate with a vibrant community of innovators, entrepreneurs, and investors."
  },
  {
    title: "Mentor and Investor Matching",
    description: "Get matched with the right mentors and investors to accelerate your journey."
  },
  {
    title: "Progress Tracking and Analytics Dashboards",
    description: "Monitor your startup’s growth and milestones with intuitive analytics dashboards."
  },
  {
    title: "Resource Marketplaces and Support Services",
    description: "Access a curated marketplace for essential resources and professional support."
  },
  {
    title: "Secure, Scalable, and Customizable Environments",
    description: "Build and grow in a platform that is secure, scalable, and tailored to your needs."
  }
];

const FeaturesTab: React.FC = () => (
  <div className="features-tab">
    <h2>Platform Features</h2>
    <ul className="features-list">
      {features.map((feature, idx) => (
        <li key={idx} className="feature-item">
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default FeaturesTab;
