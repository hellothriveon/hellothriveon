import React, { useState, useRef, useEffect } from 'react';

interface Scene {
  id: string;
  active: boolean;
}

export const HeroVideoPlayer = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const floatingWordsContainerRef = useRef<HTMLDivElement>(null);

  const burdenWords = [
    "I miss who we were.", "Am I a bad person?", "Running on empty.", "Did they eat?",
    "The silence is loudest.", "When did I last sleep?", "Lost myself.", "Is this my life now?",
    "Another fall.", "Paperwork never ends.", "Just five minutes of peace.", "I can't do this.", "So alone."
  ];

  const [demoState, setDemoState] = useState({
    mythriActive: false,
    logisticsActive: false,
    connectionActive: false,
    mythriStatus: ''
  });

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const addTimeout = (callback: () => void, delay: number) => {
    const timeout = setTimeout(callback, delay);
    timeoutRefs.current.push(timeout);
  };

  const clearAllTimeouts = () => {
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    timeoutRefs.current = [];
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const switchScene = (index: number) => {
    console.log('Switching to scene:', index);
    setCurrentScene(index);
  };

  const createFloatingWord = () => {
    if (!floatingWordsContainerRef.current || !containerRef.current) return;
    
    console.log('Creating floating word...');
    
    const word = document.createElement('div');
    word.className = 'floating-word';
    word.textContent = burdenWords[Math.floor(Math.random() * burdenWords.length)];
    
    const containerWidth = containerRef.current.offsetWidth;
    const fromLeft = Math.random() > 0.5;
    const startX = fromLeft ? -300 : containerWidth + 300;
    const endX = fromLeft ? containerWidth + 300 : -300;

    word.style.setProperty('--start-x', `${startX}px`);
    word.style.setProperty('--end-x', `${endX}px`);
    word.style.top = `${Math.random() * 80 + 10}%`;
    word.style.left = '0px';
    word.style.animation = `float-across ${Math.random() * 6 + 8}s linear forwards`;
    word.style.fontSize = `${Math.random() * 0.5 + 1.25}rem`;
    word.style.zIndex = '20';

    floatingWordsContainerRef.current.appendChild(word);
    
    addTimeout(() => {
      if (word && word.parentNode) {
        word.parentNode.removeChild(word);
      }
    }, 14000);
  };

  const runFullSequence = () => {
    console.log('Running full sequence...');
    setIsPlaying(true);
    clearAllTimeouts();
    
    // Reset states
    if (floatingWordsContainerRef.current) {
      floatingWordsContainerRef.current.innerHTML = '';
    }
    setDemoState({
      mythriActive: false,
      logisticsActive: false,
      connectionActive: false,
      mythriStatus: ''
    });

    // Scene 1: Burdens
    switchScene(1);
    intervalRef.current = setInterval(createFloatingWord, 1300);
    
    // Scene 2: MyThri Arrives
    addTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      switchScene(2);
    }, 12000);

    // Scene 3: Demo
    addTimeout(() => {
      switchScene(3);
      // Demo sub-sequence
      addTimeout(() => setDemoState(prev => ({ ...prev, mythriActive: true })), 500);
      addTimeout(() => setDemoState(prev => ({ ...prev, mythriStatus: "Processing..." })), 1000);
      addTimeout(() => setDemoState(prev => ({ ...prev, logisticsActive: true })), 2000);
      addTimeout(() => setDemoState(prev => ({ ...prev, connectionActive: true })), 3000);
      addTimeout(() => setDemoState(prev => ({ ...prev, mythriStatus: "Delegating..." })), 3500);
    }, 15000);

    // Scene 4: Transformation
    addTimeout(() => {
      switchScene(4);
    }, 20000);

    // Scene 5: Final CTA
    addTimeout(() => {
      switchScene(5);
    }, 24000);
    
    // Loop
    addTimeout(() => {
      runFullSequence();
    }, 28000);
  };

  const handlePlayClick = () => {
    console.log('Play button clicked! Current scene:', currentScene);
    runFullSequence();
  };

  console.log('HeroVideoPlayer rendering, currentScene:', currentScene);
  
  return (
    <div className="relative w-full max-w-6xl mx-auto px-2 sm:px-0">
      <div 
        ref={containerRef}
        className="video-container w-full h-[250px] sm:h-[350px] md:h-[400px] lg:aspect-video rounded-xl overflow-hidden shadow-2xl bg-background relative"
      >
        {/* Scene 0: Play Button */}
        {currentScene === 0 && (
          <div 
            className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/30 z-10"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=1920&auto=format&fit=crop")',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            onClick={(e) => {
              console.log('Play button clicked!', e);
              handlePlayClick();
            }}
          >
            <div className="w-24 h-24 bg-black/40 rounded-full flex items-center justify-center hover:bg-black/60 transition-colors">
              <div className="w-0 h-0 border-t-[25px] border-t-transparent border-b-[25px] border-b-transparent border-l-[40px] border-l-white ml-2" />
            </div>
          </div>
        )}

        {/* Scene 1: The Burdens */}
        <div className={`scene absolute inset-0 ${currentScene === 1 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
             style={{
               backgroundImage: 'url("https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=1920&auto=format&fit=crop")',
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               filter: 'grayscale(100%) brightness(0.6)'
             }}>
          <div ref={floatingWordsContainerRef} className="relative w-full h-full" />
        </div>
        
        {/* Scene 2: MyThri Arrives */}
        <div className={`scene absolute inset-0 bg-gray-900 flex flex-col items-center justify-center px-4 ${currentScene === 2 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
          <div className="text-5xl sm:text-6xl lg:text-7xl mb-4 text-cyan-300 font-mono">(★‿★)</div>
          <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold text-center">This is Mynoo.</h2>
          <p className="text-gray-300 text-base sm:text-lg text-center">Your personal AI agent for caregiving.</p>
        </div>

        {/* Scene 3: The Demo Dashboard */}
        <div className={`scene absolute inset-0 p-4 sm:p-6 lg:p-8 flex flex-col justify-center ${currentScene === 3 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
          <div className="text-center mb-4">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold" style={{ color: 'hsl(var(--dark-blue))' }}>It works by delegating tasks...</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
            <div className={`agent-card bg-gray-800 text-white p-3 sm:p-4 rounded-lg text-center border-2 transition-all duration-500 ${
              demoState.mythriActive ? 'border-[#2D7A74] shadow-lg scale-105' : 'border-transparent'
            }`}>
              <div className="text-cyan-300 text-3xl sm:text-4xl lg:text-5xl font-mono">(★‿★)</div>
              <h3 className="font-bold text-sm sm:text-base lg:text-lg">Mynoo</h3>
              <p className="text-xs sm:text-sm text-cyan-300 h-4 sm:h-5">{demoState.mythriStatus}</p>
            </div>
            <div className="hidden sm:flex flex-col justify-center items-center text-white text-2xl sm:text-3xl lg:text-4xl font-bold">→</div>
            <div className="space-y-1 sm:space-y-2">
              <div className={`agent-card bg-blue-100 p-2 rounded-lg flex items-center space-x-1 sm:space-x-2 border-2 transition-all duration-500 ${
                demoState.logisticsActive ? 'border-[#2D7A74] shadow-lg scale-105' : 'border-transparent'
              }`}>
                <div className="text-blue-800 text-lg sm:text-xl lg:text-2xl font-mono">[-_-]</div>
                <p className="text-xs sm:text-sm text-blue-800">Handles logistics.</p>
              </div>
              <div className={`agent-card bg-teal-100 p-2 rounded-lg flex items-center space-x-1 sm:space-x-2 border-2 transition-all duration-500 ${
                demoState.connectionActive ? 'border-[#2D7A74] shadow-lg scale-105' : 'border-transparent'
              }`}>
                <div className="text-teal-800 text-lg sm:text-xl lg:text-2xl font-mono">(◡‿◡)</div>
                <p className="text-xs sm:text-sm text-teal-800">Finds connection moments.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scene 4: The Transformation */}
        <div className={`scene absolute inset-0 ${currentScene === 4 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
             style={{
               backgroundImage: 'url("https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=1920&auto=format&fit=crop")',
               backgroundSize: 'cover',
               backgroundPosition: 'center'
             }}>
          <div className="w-full h-full flex items-center justify-center bg-black/40 px-4">
            <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold text-center">Bringing the hues of life back.</h2>
          </div>
        </div>
        
        {/* Scene 5: Final CTA */}
        <div className={`scene absolute inset-0 flex flex-col items-center justify-center bg-teal-700 px-4 ${currentScene === 5 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center">Nuvori</h2>
          <p className="text-white text-lg sm:text-xl mt-2 text-center">Stop managing. Start connecting.</p>
        </div>
      </div>
    </div>
  );
};
