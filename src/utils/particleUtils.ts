
export function createParticles(selector: string, count: number) {
  const container = document.querySelector(selector);
  if (!container) return;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = 'rgba(0, 217, 255, 0.6)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animation = `particleFloat ${Math.random() * 3 + 2}s linear infinite`;
    particle.style.animationDelay = Math.random() * 2 + 's';
    
    container.appendChild(particle);
  }

  // Add particle animation keyframes
  if (!document.querySelector('#particle-styles')) {
    const style = document.createElement('style');
    style.id = 'particle-styles';
    style.textContent = `
      @keyframes particleFloat {
        0% {
          transform: translateY(0px) rotate(0deg);
          opacity: 1;
        }
        100% {
          transform: translateY(-100px) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}
