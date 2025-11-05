import React, { useState } from 'react';
import './Examples.css';

const Examples = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  const industries = [
    { id: 'all', name: 'All Industries' },
    { id: 'tech', name: 'Technology' },
    { id: 'finance', name: 'Finance' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'education', name: 'Education' },
    { id: 'marketing', name: 'Marketing' },
  ];

  const resumeExamples = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      industry: 'tech',
      experience: '8+ years',
      template: 'Modernist',
      image: 'tech-resume'
    },
    {
      id: 2,
      title: 'Financial Analyst',
      industry: 'finance',
      experience: '3-5 years',
      template: 'Executive',
      image: 'finance-resume'
    },
    {
      id: 3,
      title: 'Registered Nurse',
      industry: 'healthcare',
      experience: '2-4 years',
      template: 'Professional',
      image: 'healthcare-resume'
    },
    {
      id: 4,
      title: 'Marketing Manager',
      industry: 'marketing',
      experience: '6+ years',
      template: 'Innovator',
      image: 'marketing-resume'
    },
    {
      id: 5,
      title: 'Data Scientist',
      industry: 'tech',
      experience: '4-6 years',
      template: 'Contemporary',
      image: 'data-science-resume'
    },
    {
      id: 6,
      title: 'Teacher',
      industry: 'education',
      experience: '3-5 years',
      template: 'Minimalist',
      image: 'education-resume'
    },
  ];

  const filteredExamples = selectedIndustry === 'all' 
    ? resumeExamples 
    : resumeExamples.filter(example => example.industry === selectedIndustry);

  return (
    <div className="examples">
      <div className="container">
        <div className="examples-header">
          <h1>Resume Examples & Inspiration</h1>
          <p>Browse professionally designed resume examples for different industries and experience levels</p>
        </div>

        <div className="industry-filters">
          {industries.map(industry => (
            <button
              key={industry.id}
              className={`industry-btn ${selectedIndustry === industry.id ? 'active' : ''}`}
              onClick={() => setSelectedIndustry(industry.id)}
            >
              {industry.name}
            </button>
          ))}
        </div>

        <div className="examples-grid">
          {filteredExamples.map(example => (
            <div key={example.id} className="example-card">
              <div className="example-image">
                <div className="resume-mockup">
                  <div className="mockup-header"></div>
                  <div className="mockup-content">
                    <div className="mockup-line short"></div>
                    <div className="mockup-line medium"></div>
                    <div className="mockup-line long"></div>
                    <div className="mockup-line short"></div>
                  </div>
                </div>
              </div>
              <div className="example-info">
                <h3>{example.title}</h3>
                <div className="example-meta">
                  <span className="industry">{example.industry}</span>
                  <span className="experience">{example.experience} experience</span>
                  <span className="template">{example.template} Template</span>
                </div>
                <div className="example-actions">
                  <button className="btn btn-outline">Preview</button>
                  <button className="btn btn-primary">Use This Example</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="examples-cta">
          <h2>Ready to Create Your Own Professional Resume?</h2>
          <p>Start with one of our templates and customize it to match your unique experience</p>
          <button className="btn btn-primary btn-large">Get Started Now</button>
        </div>

        <div className="success-stories">
          <h2>Success Stories</h2>
          <div className="stories-grid">
            <div className="story-card">
              <div className="story-content">
                <p>"The AI suggestions helped me transform my resume. I got 3 interview calls within a week!"</p>
                <div className="story-author">
                  <strong>Sarah M.</strong>
                  <span>Software Developer at Google</span>
                </div>
              </div>
            </div>
            <div className="story-card">
              <div className="story-content">
                <p>"The templates are professional and ATS-friendly. Landed my dream job in healthcare!"</p>
                <div className="story-author">
                  <strong>Michael T.</strong>
                  <span>Nurse Practitioner</span>
                </div>
              </div>
            </div>
            <div className="story-card">
              <div className="story-content">
                <p>"The resume builder was incredibly easy to use. I appreciated the AI-powered suggestions."</p>
                <div className="story-author">
                  <strong>Jessica L.</strong>
                  <span>Marketing Director</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Examples;