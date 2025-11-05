import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/Authcontext';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Templates from './pages/Templates/Templates';
import Examples from './pages/Examples/Examples';
import Pricing from './pages/Pricing/Pricing';
import CreateResume from './pages/CreateResume/CreateResume';
import ResumeEditor from './pages/ResumeEditor/ResumeEditor';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/templates" element={<Templates />} />
              <Route path="/examples" element={<Examples />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/create-resume" element={<CreateResume />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/resume-editor/:id"
                element={
                  <ProtectedRoute>
                    <ResumeEditor />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
