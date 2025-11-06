import React from 'react';

interface HeaderProps {
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="bg-slate-900/50 backdrop-blur-sm shadow-lg shadow-cyan-500/10 border-b border-slate-700 relative">
      <div className="container mx-auto px-4 py-5 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          Gerador de Cenas Bíblicas
        </h1>
        <p className="text-gray-400 mt-2 text-sm md:text-base">
          Transforme capítulos da Bíblia em arte no estilo Pixar
        </p>
      </div>
      <button 
        onClick={onLogout}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 text-sm"
      >
        Sair
      </button>
    </header>
  );
};

export default Header;
