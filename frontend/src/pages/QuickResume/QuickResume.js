import React, { useState } from 'react';
import ResumeForm from '../../components/ResumeForm/ResumeForm';
import ResumePreview from '../../components/ResumePreview/ResumePreview';

const QuickResume = () => {
  const [resume, setResume] = useState({
    personal: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      location: 'New York, NY',
      summary: 'Experienced professional seeking new opportunities.'
    },
    experience: [
      {
        id: 1,
        title: 'Software Developer',
        company: 'Tech Company Inc.',
        startDate: '2020-01',
        endDate: '2023-12',
        description: 'Developed web applications using React and Node.js'
      }
    ],
    education: [
      {
        id: 1,
        school: 'University of Example',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        year: '2019'
      }
    ],
    skills: ['JavaScript', 'React', 'HTML', 'CSS', 'Node.js']
  });

  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h2>Edit Your Resume</h2>
          <ResumeForm onDataChange={setResume} resumeData={resume} />
        </div>
        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ margin: 0 }}>Preview</h2>
            <select 
              value={selectedTemplate} 
              onChange={(e) => setSelectedTemplate(e.target.value)}
              style={{ padding: '8px', border: '2px solid #e2e8f0', borderRadius: '4px' }}
            >
              <option value="modern">Modern</option>
              <option value="classic">Classic</option>
            </select>
          </div>
          <ResumePreview data={resume} template={selectedTemplate} />
        </div>
      </div>
    </div>
  );
};

export default QuickResume;