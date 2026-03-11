import { useSearchParams } from 'react-router-dom';
import ChatAgent from '../components/ChatAgent';

function MainScreen() {
  const [searchParams] = useSearchParams();
  const standId = searchParams.get('stand') || 'A';

  const handleComplete = (data) => {
    console.log('✅ Conversación completada en Stand', standId, '- Datos guardados en Firebase');
    // No hacemos nada aquí, la pantalla de display escucha los cambios automáticamente
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
            <div className="flex items-center space-x-4">
              <img 
                src="/logotipo.png" 
                alt="Claro Media" 
                className="h-12 w-auto object-contain"
              />
              <div className="hidden md:block h-8 w-px bg-white/20"></div>
              <div className="bg-claro-red/20 border border-claro-red/50 px-4 py-2 rounded-lg">
                <span className="text-white font-semibold">Stand {standId}</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-white/80 text-sm">
              <span>Powered by ChatGPT</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-stretch justify-center">
          <div className="w-full max-w-7xl mx-auto px-4 py-8 flex items-stretch">
            <div className="w-full bg-black/30 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden flex flex-col">
              {/* Chat Container */}
              <div className="flex-1 flex flex-col">
                <ChatAgent onComplete={handleComplete} standId={standId} />
              </div>
            </div>
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

export default MainScreen;
