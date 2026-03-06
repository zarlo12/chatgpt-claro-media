import { useState } from 'react';
import ChatAgent from './components/ChatAgent';
import ResultsView from './components/ResultsView';

function App() {
  const [propuesta, setPropuesta] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleComplete = (data) => {
    setPropuesta(data);
    setShowResults(true);
  };

  const handleReset = () => {
    setPropuesta(null);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/Fondo.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="px-6 py-6 border-b border-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="/logotipo.png" 
                alt="Claro Media" 
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="hidden md:flex items-center space-x-2 text-white/80 text-sm">
              
              <span>Powered by ChatGPT</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-stretch justify-center">
          <div className="w-full max-w-7xl mx-auto px-4 py-8 flex items-stretch">
            {!showResults ? (
              <div className="w-full bg-black/30 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden flex flex-col">
                {/* Chat Container */}
                <div className="flex-1 flex flex-col">
                  <ChatAgent onComplete={handleComplete} />
                </div>
              </div>
            ) : (
              <div className="w-full bg-black/30 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                <ResultsView propuesta={propuesta} onReset={handleReset} />
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="px-6 py-4 border-t border-white/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-sm text-white/60">
            <p>© 2026 Claro Media. Todos los derechos reservados.</p>
            <p className="hidden md:block">
              Integra insights en tiempo real para propuestas estratégicas personalizadas
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
