"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const calculateRotation = (x: number, y: number) => {
    if (typeof window === "undefined") return { x: 0, y: 0 };
  
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
  
    const deltaX = ((x - centerX) / centerX) * 5;
    const deltaY = ((y - centerY) / centerY) * 5;
  
    return { x: -deltaY, y: deltaX };
  };
  
  
  const rotation = calculateRotation(mousePosition.x, mousePosition.y);

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-amber-50 via-amber-100 to-amber-50 flex items-center justify-center px-4 relative">
      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          {Array.from({ length: 20 }).map((_, index) => (
            <div 
              key={index}
              className="absolute rounded-full bg-amber-500"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                opacity: Math.random() * 0.5,
                filter: `blur(${Math.random() * 50 + 20}px)`,
                animation: `float ${Math.random() * 20 + 10}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Golden sparkles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, index) => (
          <div 
            key={`sparkle-${index}`}
            className="absolute bg-yellow-300 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 1}px`,
              height: `${Math.random() * 6 + 1}px`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${Math.random() * 5 + 2}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      <div 
        className={`max-w-4xl mx-auto text-center relative transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
        }}
      >
        {/* Floating ornaments */}
        <div className="absolute -top-32 right-0 text-6xl animate-float-slow">💍</div>
        <div className="absolute -bottom-20 left-0 text-6xl animate-float-slow-reverse">👑</div>
        <div className="absolute top-1/4 -left-16 text-5xl animate-float-medium">💎</div>
        <div className="absolute bottom-1/3 -right-16 text-5xl animate-float-medium-reverse">✨</div>
        
        {/* Layered diamond shapes with glow */}
        <div className="absolute -top-10 left-1/4 transform rotate-45 w-16 h-16 bg-gradient-to-br from-amber-300 to-yellow-500 opacity-70 animate-pulse-slow shadow-lg"></div>
        <div className="absolute -bottom-20 right-1/4 transform rotate-45 w-24 h-24 bg-gradient-to-br from-yellow-400 to-amber-600 opacity-60 animate-pulse-slow-reverse shadow-xl"></div>
        
        {/* Glowing orbs */}
        <div className="absolute top-1/2 -translate-y-1/2 -left-40 w-64 h-64 rounded-full bg-gradient-to-br from-amber-200 to-yellow-400 opacity-30 blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 -translate-y-1/2 -right-40 w-64 h-64 rounded-full bg-gradient-to-br from-yellow-300 to-amber-500 opacity-30 blur-3xl animate-pulse-slow-reverse"></div>
        
        {/* Main content with glass morphism */}
        <div className="relative z-10 bg-white bg-opacity-40 backdrop-blur-xl p-12 rounded-3xl shadow-2xl border border-white border-opacity-40">
          <div className="mb-8 relative">
            <div className="flex justify-center items-center relative">
              <div className="text-8xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500 font-serif font-bold filter drop-shadow-lg">4</div>
              
              {/* Diamond in the middle with reflective effect */}
              <div className="relative mx-4 group animate-float">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-300 to-yellow-500 rounded-lg transform rotate-45 opacity-70 group-hover:opacity-100 transition-all duration-500 shadow-xl"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-400 to-yellow-300 rounded-lg transform rotate-45 opacity-0 group-hover:opacity-70 blur-sm transition-all duration-500"></div>
                <div className="absolute inset-3 bg-white bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-lg transform rotate-45 flex items-center justify-center">
                  <span className="text-amber-600 text-4xl md:text-5xl transform -rotate-45">💎</span>
                </div>
                
                {/* Light reflections */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-lg transform rotate-45">
                  <div className="absolute -top-10 -left-10 w-20 h-1 bg-white opacity-70 blur-sm transform rotate-45"></div>
                  <div className="absolute bottom-2 right-2 w-12 h-1 bg-white opacity-50 blur-sm transform rotate-45"></div>
                </div>
              </div>
              
              <div className="text-8xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500 font-serif font-bold filter drop-shadow-lg">4</div>
            </div>
            
            {/* Subtle golden sparkles around the 404 */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 20 }).map((_, index) => (
                <div 
                  key={`inner-sparkle-${index}`}
                  className="absolute bg-yellow-300 rounded-full animate-ping-slow"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 4 + 1}px`,
                    height: `${Math.random() * 4 + 1}px`,
                    opacity: Math.random() * 0.7,
                    animationDuration: `${Math.random() * 3 + 1}s`
                  }}
                />
              ))}
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-800 to-amber-600 mb-6 filter drop-shadow-sm">
            Page Not Found
          </h1>
          
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10 leading-relaxed">
            We couldn&apos;t find the treasure you&apos;re looking for. Like a rare gem, 
            the page you requested seems to be out of our collection.
          </p>
          
          <Link href="/" className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium transition-all bg-amber-500 rounded-lg hover:bg-amber-600">
            <span className="relative z-10 text-white font-semibold group-hover:text-white">Oops..!</span>
            <span className="absolute bottom-0 right-0 -mb-8 -mr-5 h-20 w-20 rounded-full bg-white opacity-10 transition-all duration-300 ease-out group-hover:scale-150"></span>
            <span className="absolute top-0 left-0 -mt-1 -ml-12 h-8 w-20 rounded-full bg-white opacity-10 transform -rotate-45 transition-all duration-300 ease-out group-hover:scale-150"></span>
          </Link>
        </div>
        
        {/* Animated jewelry icons at the bottom */}
        <div className="mt-12 flex justify-center space-x-8 opacity-70">
          {['💍', '💎', '👑', '⚜️', '✨'].map((icon, i) => (
            <div 
              key={i} 
              className="text-3xl text-amber-700 transform hover:scale-125 transition-transform duration-300 animate-float"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
      
      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .animate-float-slow {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow-reverse {
          animation: float 6s ease-in-out infinite reverse;
        }
        .animate-float-medium {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-medium-reverse {
          animation: float 4s ease-in-out infinite reverse;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse 6s ease-in-out infinite;
        }
        .animate-pulse-slow-reverse {
          animation: pulse 6s ease-in-out infinite reverse;
        }
        .animate-ping-slow {
          animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.9; }
        }
        @keyframes ping {
          0% { transform: scale(0.2); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}