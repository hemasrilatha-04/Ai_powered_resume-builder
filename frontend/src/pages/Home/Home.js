import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/Authcontext';
import './Home.css';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Create Professional Resumes with AI</h1>
            <p>Let our AI help you build a resume that stands out to employers and passes ATS screening</p>
            <div className="hero-actions">
              {currentUser ? (
                <Link to="/dashboard" className="btn btn-primary btn-large">
                  Go to Dashboard
                </Link>
              ) : (
                <Link to="/login" className="btn btn-primary btn-large">
                  Get Started Free
                </Link>
              )}
              <Link to="/examples" className="btn btn-outline btn-large">
                View Examples
              </Link>
            </div>
          </div>
          <div className="hero-image">
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
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose Our AI Resume Builder</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI-Powered Suggestions</h3>
              <p>Get intelligent recommendations to improve your resume content and make it more impactful</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Professional Templates</h3>
              <p>Choose from multiple ATS-friendly templates designed by career experts</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Easy Customization</h3>
              <p>Easily customize every section of your resume with our intuitive editor</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>ATS Optimization</h3>
              <p>Ensure your resume gets past Applicant Tracking Systems and seen by recruiters</p>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat">
              <h3>10,000+</h3>
              <p>Resumes Created</p>
            </div>
            <div className="stat">
              <h3>98%</h3>
              <p>User Satisfaction</p>
            </div>
            <div className="stat">
              <h3>50+</h3>
              <p>Professional Templates</p>
            </div>
            <div className="stat">
              <h3>24/7</h3>
              <p>AI Assistance</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Ready to Create Your Perfect Resume?</h2>
          <p>Join thousands of users who landed their dream jobs with our AI Resume Builder</p>
          <Link to={currentUser ? "/dashboard" : "/login"} className="btn btn-primary btn-large">
            Start Building Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;