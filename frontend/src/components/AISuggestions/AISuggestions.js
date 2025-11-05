import React, { useState } from 'react';
import './AISuggestions.css';

const AISuggestions = ({ text, section, context, onSuggestionSelect }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const fetchSuggestions = async () => {
    if (!text.trim()) return;
    
    setIsLoading(true);
    try {
      // This would call your actual AI service
      const response = await aiService.getSuggestions(text, section, context);
      setSuggestions(response.suggestions);
      setIsOpen(true);
    } catch (error) {
      console.error('Error fetching AI suggestions:', error);
      // For demo purposes, we'll use mock data
      setTimeout(() => {
        setSuggestions(generateMockSuggestions(text, section));
        setIsOpen(true);
        setIsLoading(false);
      }, 1000);
    }
  };

  // Generate mock suggestions for demonstration
  const generateMockSuggestions = (text, section) => {
    const mockSuggestions = {
      summary: [
        "Experienced professional with a proven track record of success in delivering high-quality results. Skilled in problem-solving and team collaboration.",
        "Dynamic and results-driven individual with extensive experience in driving growth and innovation. Excellent communication and leadership abilities.",
        "Detail-oriented professional with a strong background in achieving operational excellence. Committed to continuous improvement and exceeding expectations."
      ],
      experience: [
        "Implemented new processes that increased efficiency by 25% and reduced costs by 15%.",
        "Led a cross-functional team of 10 to deliver projects on time and under budget.",
        "Developed and executed strategic initiatives that resulted in a 30% increase in customer satisfaction."
      ],
      default: [
        "Enhanced performance through strategic planning and effective implementation of best practices.",
        "Demonstrated exceptional ability to adapt to changing environments and overcome challenges.",
        "Consistently recognized for excellence and dedication to achieving organizational goals."
      ]
    };

    return mockSuggestions[section] || mockSuggestions.default;
  };

  const handleSuggestionSelect = (suggestion) => {
    onSuggestionSelect(suggestion);
    setIsOpen(false);
  };

  return (
    <div className="ai-suggestions">
      <button 
        className="ai-suggestion-btn"
        onClick={fetchSuggestions}
        disabled={isLoading || !text.trim()}
        type="button"
      >
        {isLoading ? (
          <>
            <span className="spinner"></span>
            Generating AI Suggestions...
          </>
        ) : (
          'Get AI Suggestions'
        )}
      </button>

      {isOpen && suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          <div className="suggestions-header">
            <h4>AI Suggestions</h4>
            <button 
              onClick={() => setIsOpen(false)}
              className="close-btn"
              aria-label="Close suggestions"
            >
              ×
            </button>
          </div>
          <div className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <div 
                key={index} 
                className="suggestion-item"
              >
                <p>{suggestion}</p>
                <button 
                  onClick={() => handleSuggestionSelect(suggestion)}
                  className="use-suggestion-btn"
                >
                  Use This
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AISuggestions;