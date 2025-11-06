import React, { useState, useEffect } from 'react';
import { generatePresentationAudio } from '../services/geminiService';
import { createWavBlob } from '../utils/audioUtils';
import Spinner from './Spinner';
import { SpeakerIcon } from './icons/SpeakerIcon';
import { SparklesIcon } from './icons/SparklesIcon';
import { UsersIcon } from './icons/UsersIcon';
import { MicIcon } from './icons/MicIcon';
import AdSenseUnit from './AdSenseUnit';


interface LandingPageProps {
  onLogin: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState<string | null>(null);

  // Cleanup object URL
  useEffect(() => {
    return () => {
        if (generatedAudioUrl) {
            URL.revokeObjectURL(generatedAudioUrl);
        }
    };
  }, [generatedAudioUrl]);

  const handleGenerateAudio = async () => {
    if (isAudioLoading) return;
    setIsAudioLoading(true);
    setAudioError(null);
    if (generatedAudioUrl) {
        URL.revokeObjectURL(generatedAudioUrl);
        setGeneratedAudioUrl(null);
    }

    try {
        const audioBase64 = await generatePresentationAudio();
        const audioBlob = createWavBlob(audioBase64);
        const url = URL.createObjectURL(audioBlob);
        setGeneratedAudioUrl(url);
    } catch (err: any) {
        setAudioError('Falha ao gerar o áudio da apresentação. Tente novamente.');
        console.error(err);
    } finally {
        setIsAudioLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 font-sans overflow-x-hidden">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div 
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80ffdb] to-[#2563eb] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" 
            style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
          />
        </div>

        {/* Hero Section */}
        <div className="mx-auto max-w-4xl py-24 sm:py-32">
          <div className="text-center">
             <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Dê Vida à Bíblia
             </h1>
             <p className="mt-6 text-lg leading-8 text-gray-300">
                Transforme qualquer versículo em arte cinematográfica no estilo Pixar e narrações cativantes com o poder da IA.
             </p>
             <div className="mt-10 flex items-center justify-center gap-x-6">
                <button
                  onClick={onLogin}
                  className="rounded-md bg-cyan-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 transition-transform duration-300 hover:scale-105"
                >
                  Teste Agora
                </button>
                <button 
                  onClick={handleGenerateAudio}
                  disabled={isAudioLoading}
                  className="text-base font-semibold leading-6 text-gray-300 flex items-center gap-2 group disabled:opacity-50"
                >
                   {isAudioLoading ? <Spinner /> : <SpeakerIcon className="w-6 h-6 group-hover:text-cyan-400 transition-colors" />} 
                   <span className="group-hover:text-white transition-colors">Ouvir Apresentação</span>
                </button>
             </div>
             {audioError && <p className="mt-4 text-red-400">{audioError}</p>}
             {generatedAudioUrl && (
                <div className="mt-8 flex justify-center">
                    <audio controls autoPlay src={generatedAudioUrl} className="w-full max-w-sm">
                        Seu navegador não suporta o elemento de áudio.
                    </audio>
                </div>
             )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-24">
            <div className="mx-auto max-w-2xl lg:text-center">
                <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Uma Ferramenta Criativa para Sua Fé</p>
                <p className="mt-6 text-lg leading-8 text-gray-400">
                    Explore as escrituras como nunca antes, com ferramentas que inspiram e educam.
                </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
                    <div className="relative pl-16">
                        <dt className="text-base font-semibold leading-7 text-white">
                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-600">
                                <SparklesIcon className="h-6 w-6 text-white" />
                            </div>
                            Visualização Fiel
                        </dt>
                        <dd className="mt-2 text-base leading-7 text-gray-400">Crie imagens com precisão histórica e teológica, trazendo os relatos bíblicos para mais perto da realidade.</dd>
                    </div>
                    <div className="relative pl-16">
                        <dt className="text-base font-semibold leading-7 text-white">
                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-600">
                                <UsersIcon className="h-6 w-6 text-white" />
                            </div>
                            Continuidade de Personagens
                        </dt>
                        <dd className="mt-2 text-base leading-7 text-gray-400">Mantenha a aparência dos personagens consistente através de múltiplos versículos para criar histórias sequenciais.</dd>
                    </div>
                    <div className="relative pl-16">
                        <dt className="text-base font-semibold leading-7 text-white">
                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-600">
                                <MicIcon className="h-6 w-6 text-white" />
                            </div>
                            Narrações com IA
                        </dt>
                        <dd className="mt-2 text-base leading-7 text-gray-400">Gere áudios do texto bíblico em múltiplos idiomas e vozes, perfeito para estudos e apresentações.</dd>
                    </div>
                </dl>
            </div>
        </div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <AdSenseUnit />
        </div>

        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
          <div 
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#2563eb] to-[#80ffdb] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" 
            style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
          />
        </div>
      </div>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Criado com a API Gemini</p>
      </footer>
    </div>
  );
};

export default LandingPage;