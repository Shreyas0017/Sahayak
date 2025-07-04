import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import AuthWrapper from './components/Auth/AuthWrapper';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ContentGenerator from './components/ContentGenerator';
import DifferentiatedMaterials from './components/DifferentiatedMaterials';
import KnowledgeBase from './components/KnowledgeBase';
import VisualAids from './components/VisualAids';
import LessonPlanner from './components/LessonPlanner';
import EducationalGames from './components/EducationalGames';
import AudioAssessment from './components/AudioAssessment';

function App() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleModuleChange = (module: string) => {
    setActiveModule(module);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard onModuleChange={handleModuleChange} />;
      case 'content':
        return <ContentGenerator />;
      case 'materials':
        return <DifferentiatedMaterials />;
      case 'knowledge':
        return <KnowledgeBase />;
      case 'visual':
        return <VisualAids />;
      case 'planner':
        return <LessonPlanner />;
      case 'games':
        return <EducationalGames />;
      case 'assessment':
        return <AudioAssessment />;
      default:
        return <Dashboard onModuleChange={handleModuleChange} />;
    }
  };

  return (
    <AuthProvider>
      <AuthWrapper>
        <div className="min-h-screen bg-gray-50">
          <Header onMenuClick={handleSidebarToggle} />
          <div className="flex">
            <Sidebar
              activeModule={activeModule}
              onModuleChange={handleModuleChange}
              isOpen={sidebarOpen}
              onClose={handleSidebarClose}
            />
            <main className="flex-1 min-w-0">
              {renderActiveModule()}
            </main>
          </div>
        </div>
      </AuthWrapper>
    </AuthProvider>
  );
}

export default App;