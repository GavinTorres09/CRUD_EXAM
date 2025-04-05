// src/components/ParticlesBackground.js
import React, { useEffect } from 'react';

const ParticlesBackground = () => {
  useEffect(() => {
    // Dynamically load particles.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
    script.onload = () => {
      window.particlesJS('particles-js', {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#ffffff"
          },
          shape: {
            type: "circle"
          },
          opacity: {
            value: 0.5
          },
          size: {
            value: 3
          },
          move: {
            enable: true,
            speed: 2
          }
        },
        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: "repulse"
            }
          }
        },
        retina_detect: true
      });
    };
    document.body.appendChild(script);

    return () => {
      // Clean up script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return <div id="particles-js" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: '-1' }} />;
};

export default ParticlesBackground;
