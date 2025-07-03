
export function initPreloaderAnimation() {
  // Check if GSAP is available
  if (!(window as any).gsap) {
    console.warn('GSAP not loaded, using fallback animation');
    fallbackPreloaderAnimation();
    return;
  }

  const tl = (window as any).gsap.timeline();
  
  tl.to('.progress-bar', {
    width: '100%',
    duration: 3,
    ease: 'power2.out',
  })
  .to('.preloader', {
    opacity: 0,
    scale: 0.9,
    duration: 1,
    delay: 0.5,
    onComplete: () => {
      hidePreloaderAndShowContent();
    }
  });
}

function fallbackPreloaderAnimation() {
  const progressBar = document.querySelector('.progress-bar') as HTMLElement;
  const preloader = document.querySelector('.preloader') as HTMLElement;
  
  if (progressBar) {
    // Animate progress bar with CSS
    progressBar.style.transition = 'width 3s ease-out';
    progressBar.style.width = '100%';
  }
  
  // Hide preloader after animation
  setTimeout(() => {
    hidePreloaderAndShowContent();
  }, 4000);
}

function hidePreloaderAndShowContent() {
  const preloader = document.querySelector('.preloader') as HTMLElement;
  const mainContent = document.querySelector('.main-content') as HTMLElement;
  
  if (preloader) {
    preloader.style.display = 'none';
  }
  
  if (mainContent) {
    mainContent.style.opacity = '1';
    // Initialize main animations if GSAP is available
    if ((window as any).gsap) {
      initMainAnimations();
    }
  }
}

export function initMainAnimations() {
  // Check if GSAP is available
  if (!(window as any).gsap) {
    console.warn('GSAP not loaded, skipping main animations');
    return;
  }

  // Hero animations
  const heroTl = (window as any).gsap.timeline();
  heroTl.from('.hero-title .line', {
    y: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out'
  })
  .from('.hero-subtitle', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  }, '-=0.3')
  .from('.cta-button', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    ease: 'back.out(1.7)'
  }, '-=0.2');

  // Floating orb animations
  (window as any).gsap.to('.orb-1', {
    y: -30,
    x: 20,
    rotation: 360,
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  (window as any).gsap.to('.orb-2', {
    y: 25,
    x: -15,
    rotation: -180,
    duration: 10,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  (window as any).gsap.to('.orb-3', {
    y: -20,
    x: 10,
    rotation: 270,
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });

  initScrollTriggerAnimations();
}

function initScrollTriggerAnimations() {
  // Check if GSAP and ScrollTrigger are available
  if (!(window as any).gsap || !(window as any).ScrollTrigger) {
    console.warn('GSAP or ScrollTrigger not loaded, skipping scroll animations');
    return;
  }

  // ScrollTrigger animations
  (window as any).gsap.registerPlugin((window as any).ScrollTrigger);

  // Step cards animation
  (window as any).gsap.from('.step-card', {
    scrollTrigger: {
      trigger: '.steps-grid',
      start: 'top 80%',
    },
    y: 100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out'
  });

  // Section titles
  (window as any).gsap.from('.section-title', {
    scrollTrigger: {
      trigger: '.section-title',
      start: 'top 90%',
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power2.out'
  });

  // Request cards stagger animation
  const requestCards = document.querySelectorAll('.request-card');
  if (requestCards.length > 0) {
    (window as any).gsap.from('.request-card', {
      scrollTrigger: {
        trigger: '.requests-grid',
        start: 'top 80%',
      },
      y: 80,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    });
  }
}
