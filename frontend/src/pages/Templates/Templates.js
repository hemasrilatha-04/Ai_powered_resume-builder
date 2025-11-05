import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Templates.css';

const Templates = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const templateCategories = [
    { id: 'all', name: 'All Templates' },
    { id: 'professional', name: 'Professional' },
    { id: 'modern', name: 'Modern' },
    { id: 'creative', name: 'Creative' },
    { id: 'simple', name: 'Simple' },
  ];

  const templates = [
    {
      id: 1,
      name: 'Executive',
      category: 'professional',
      description: 'Clean and professional design for corporate roles',
      popular: true
    },
    {
      id: 2,
      name: 'Modernist',
      category: 'modern',
      description: 'Contemporary design with a focus on typography',
      popular: false
    },
    {
      id: 3,
      name: 'Innovator',
      category: 'creative',
      description: 'Creative layout for design and marketing professionals',
      popular: true
    },
    {
      id: 4,
      name: 'Minimalist',
      category: 'simple',
      description: 'Simple and clean design that focuses on content',
      popular: false
    },
    {
      id: 5,
      name: 'Corporate',
      category: 'professional',
      description: 'Traditional format preferred by conservative industries',
      popular: false
    },
    {
      id: 6,
      name: 'Contemporary',
      category: 'modern',
      description: 'Balanced design with modern elements',
      popular: true
    },
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  return (
    <div className="templates">
      <div className="container">
        <div className="templates-header">
          <h1>Choose Your Resume Template</h1>
          <p>Select from professionally designed templates that are ATS-friendly and recruiter-approved</p>
        </div>

        <div className="template-categories">
          {templateCategories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="templates-grid">
          {filteredTemplates.map(template => (
            <div key={template.id} className="template-card">
              {template.popular && <div className="popular-badge">Most Popular</div>}
              <div className="template-preview">
                <div className="template-mockup">
                  <div className="mockup-header"></div>
                  <div className="mockup-content">
                    <div className="mockup-line short"></div>
                    <div className="mockup-line medium"></div>
                    <div className="mockup-line long"></div>
                    <div className="mockup-line short"></div>
                  </div>
                </div>
              </div>
              <div className="template-info">
                <h3>{template.name}</h3>
                <p>{template.description}</p>
                <div className="template-actions">
                  <button className="btn btn-outline">Preview</button>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate('/create-resume', { state: { templateId: template.id, templateName: template.name } })}
                  >
                    Use This Template
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="templates-features">
          <h2>All Templates Include</h2>
          <div className="features-list">
            <div className="feature-item">
              <h4>✅ ATS Optimized</h4>
              <p>Designed to pass through Applicant Tracking Systems</p>
            </div>
            <div className="feature-item">
              <h4>✅ Fully Customizable</h4>
              <p>Change colors, fonts, and layouts to match your style</p>
            </div>
            <div className="feature-item">
              <h4>✅ Mobile Responsive</h4>
              <p>Looks great on any device and in print</p>
            </div>
            <div className="feature-item">
              <h4>✅ Expert-Designed</h4>
              <p>Created by professional resume writers and designers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;