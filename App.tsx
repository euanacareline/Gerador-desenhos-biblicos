import React, { useState } from 'react';
import Header from './components/Header';
import ImageGenerator from './components/ImageGenerator';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  if (!isLoggedIn) {
    return <LandingPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 text-gray-100 font-sans">
      <Header onLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8">
        <ImageGenerator />
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>Criado com a API Gemini</p>
      </footer>
    </div>
  );
};

export default App;
