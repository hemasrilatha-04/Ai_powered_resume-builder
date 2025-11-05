import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/Authcontext';
import './Pricing.css';

const Pricing = () => {
  const { currentUser } = useAuth();
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Get started with basic resume building',
      features: [
        '1 Resume Template',
        'Basic AI Suggestions',
        'PDF Download',
        'Limited Export Options',
        'Community Support'
      ],
      cta: currentUser ? 'Current Plan' : 'Get Started',
      highlighted: false
    },
    {
      name: 'Pro',
      price: { monthly: 9, yearly: 90 },
      description: 'Perfect for job seekers who want more options',
      features: [
        'All Resume Templates',
        'Advanced AI Suggestions',
        'Unlimited PDF Downloads',
        'Multiple Export Formats',
        'Priority Support',
        'Cover Letter Builder',
        'Resume Analytics',
        'Custom Domains'
      ],
      cta: 'Upgrade to Pro',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: { monthly: 29, yearly: 290 },
      description: 'For career coaches and organizations',
      features: [
        'Everything in Pro',
        'Team Management',
        'White-label Options',
        'API Access',
        'Custom Template Design',
        'Dedicated Account Manager',
        'Training Sessions',
        'SLA Guarantee'
      ],
      cta: 'Contact Sales',
      highlighted: false
    }
  ];

  const toggleBillingPeriod = () => {
    setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly');
  };

  const calculateYearlySavings = (monthlyPrice) => {
    return monthlyPrice * 12 - monthlyPrice * 10; // 2 months free
  };

  return (
    <div className="pricing">
      <div className="container">
        <div className="pricing-header">
          <h1>Simple, Transparent Pricing</h1>
          <p>Choose the plan that works best for your job search needs</p>
          
          <div className="billing-toggle">
            <span className={billingPeriod === 'monthly' ? 'active' : ''}>Monthly</span>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={billingPeriod === 'yearly'}
                onChange={toggleBillingPeriod}
              />
              <span className="slider"></span>
            </label>
            <span className={billingPeriod === 'yearly' ? 'active' : ''}>
              Yearly <span className="save-badge">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card ${plan.highlighted ? 'highlighted' : ''}`}>
              {plan.highlighted && <div className="popular-badge">Most Popular</div>}
              
              <div className="plan-header">
                <h3>{plan.name}</h3>
                <div className="price">
                  <span className="amount">${billingPeriod === 'yearly' ? plan.price.yearly : plan.price.monthly}</span>
                  <span className="period">
                    {plan.price.monthly > 0 ? `/${billingPeriod === 'yearly' ? 'year' : 'month'}` : 'Forever'}
                  </span>
                </div>
                {plan.price.monthly > 0 && billingPeriod === 'yearly' && (
                  <p className="yearly-saving">
                    Save ${calculateYearlySavings(plan.price.monthly)} annually
                  </p>
                )}
                <p className="plan-description">{plan.description}</p>
              </div>

              <ul className="plan-features">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>{feature}</li>
                ))}
              </ul>

              <div className="plan-actions">
                {plan.name === 'Free' && currentUser ? (
                  <button className="btn btn-outline" disabled>{plan.cta}</button>
                ) : (
                  <Link 
                    to={plan.name === 'Enterprise' ? '/contact' : (currentUser ? '/dashboard' : '/login')} 
                    className={`btn ${plan.highlighted ? 'btn-primary' : 'btn-outline'}`}
                  >
                    {plan.cta}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="pricing-faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>Can I change plans anytime?</h4>
              <p>Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
            </div>
            <div className="faq-item">
              <h4>Is there a free trial?</h4>
              <p>Our Free plan is always free. For paid plans, we offer a 14-day money-back guarantee.</p>
            </div>
            <div className="faq-item">
              <h4>What payment methods do you accept?</h4>
              <p>We accept all major credit cards, PayPal, and bank transfers for annual plans.</p>
            </div>
            <div className="faq-item">
              <h4>Can I cancel my subscription?</h4>
              <p>Yes, you can cancel anytime. You'll continue to have access until the end of your billing period.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;