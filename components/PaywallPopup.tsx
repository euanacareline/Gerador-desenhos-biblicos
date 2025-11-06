import React, { useState } from 'react';

interface PaywallPopupProps {
  onUnlock: () => void;
}

const PaywallPopup: React.FC<PaywallPopupProps> = ({ onUnlock }) => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleUnlock = () => {
        if (code.trim() === '#jesusecaminhoaverdadeeavida#') {
            onUnlock();
        } else {
            setError('Código de acesso inválido. Por favor, verifique e tente novamente.');
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            aria-modal="true"
            role="dialog"
        >
            <div className="bg-slate-800 border border-cyan-500/50 rounded-2xl shadow-2xl shadow-cyan-500/20 max-w-lg w-full p-8 text-center animate-fade-in-up">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
                    Acesso Gratuito Esgotado
                </h2>
                <p className="text-gray-300 mb-6">
                    Você utilizou suas 3 gerações de imagem gratuitas. Para continuar criando cenas incríveis, adquira seu acesso vitalício.
                </p>
                <a
                    href="https://portifoliosocialmedia.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition duration-300 transform hover:scale-105 mb-6"
                >
                    Compre a Ferramenta por R$7,00 (Acesso Vitalício)
                </a>
                <p className="text-gray-400 mb-4 text-sm">
                    Após a compra, você receberá um código de acesso. Insira-o abaixo para desbloquear o gerador.
                </p>
                <div className="flex flex-col gap-2">
                     <input
                        type="text"
                        value={code}
                        onChange={(e) => {
                            setCode(e.target.value);
                            setError('');
                        }}
                        placeholder="Insira seu código de acesso aqui"
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition duration-300"
                    />
                    <button
                        onClick={handleUnlock}
                        className="w-full bg-slate-600 text-white font-bold py-3 px-5 rounded-lg hover:bg-slate-700 transition duration-300"
                    >
                        Desbloquear
                    </button>
                </div>
                {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}
            </div>
             <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default PaywallPopup;
