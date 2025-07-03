
export function initializeMobileMenu() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  mobileToggle?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('active');
  });

  // Close mobile menu when clicking on links
  const mobileLinks = document.querySelectorAll('.mobile-menu-content a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.remove('active');
    });
  });
}

export function initializeSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href')?.substring(1);
      const targetElement = document.getElementById(targetId || '');
      
      if (targetElement) {
        const navHeight = document.querySelector('.navbar')?.clientHeight || 0;
        const targetPosition = targetElement.offsetTop - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
