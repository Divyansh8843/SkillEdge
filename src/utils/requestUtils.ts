
export interface HelpRequest {
  id: number;
  name: string;
  subject: string;
  description: string;
  timestamp: string;
}

export function addRequestToFeed(request: HelpRequest) {
  const requestsList = document.getElementById('requestsList');
  if (!requestsList) return;

  const requestCard = document.createElement('div');
  requestCard.className = 'request-card';
  requestCard.style.opacity = '0';
  requestCard.style.transform = 'translateY(50px)';
  
  requestCard.innerHTML = `
    <div class="request-header">
      <div>
        <div class="request-subject">${request.subject}</div>
        <div class="request-name">by ${request.name}</div>
      </div>
      <div class="request-time">${request.timestamp}</div>
    </div>
    <div class="request-description">${request.description}</div>
    <button class="accept-btn" onclick="acceptRequest('${request.name}', '${request.subject}')">
      <i class="ph ph-handshake"></i>
      <span>Accept & Help</span>
    </button>
  `;

  requestsList.insertBefore(requestCard, requestsList.firstChild);

  // Animate the new card
  (window as any).gsap.to(requestCard, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out'
  });
}

export function initializeSampleRequests() {
  const sampleRequests: HelpRequest[] = [
    {
      id: 1,
      name: 'Sarah Chen',
      subject: 'Calculus Integration',
      description: 'Need help understanding integration by parts. Working on homework problems and getting stuck on the method.',
      timestamp: '2:30 PM'
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      subject: 'JavaScript Promises',
      description: 'Having trouble with async/await and promise chaining in my web development project. Could use some guidance!',
      timestamp: '1:45 PM'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      subject: 'Organic Chemistry',
      description: 'Struggling with reaction mechanisms and stereochemistry concepts. Exam is coming up next week.',
      timestamp: '12:15 PM'
    },
    {
      id: 4,
      name: 'David Kim',
      subject: 'Data Structures',
      description: 'Need help implementing binary search trees in Python. Understanding the logic but having issues with the code.',
      timestamp: '11:30 AM'
    }
  ];

  const requestsList = document.getElementById('requestsList');
  if (!requestsList) return;

  sampleRequests.forEach(request => {
    const requestCard = document.createElement('div');
    requestCard.className = 'request-card';
    
    requestCard.innerHTML = `
      <div class="request-header">
        <div>
          <div class="request-subject">${request.subject}</div>
          <div class="request-name">by ${request.name}</div>
        </div>
        <div class="request-time">${request.timestamp}</div>
      </div>
      <div class="request-description">${request.description}</div>
      <button class="accept-btn" onclick="acceptRequest('${request.name}', '${request.subject}')">
        <i class="ph ph-handshake"></i>
        <span>Accept & Help</span>
      </button>
    `;

    requestsList.appendChild(requestCard);
  });
}

// Global function for accepting requests
export function setupAcceptRequestHandler() {
  (window as any).acceptRequest = function(helperName: string, subject: string) {
    const modal = document.getElementById('contactModal');
    const helperNameEl = document.getElementById('helperName');
    const helperEmailEl = document.getElementById('helperEmail');
    
    if (helperNameEl && helperEmailEl && modal) {
      helperNameEl.textContent = helperName;
      helperEmailEl.textContent = `${helperName.toLowerCase().replace(' ', '.')}@college.edu`;
      modal.classList.add('active');
      
      // Add success animation
      (window as any).gsap.from('.modal-content', {
        scale: 0.8,
        rotation: 5,
        duration: 0.5,
        ease: 'back.out(1.7)'
      });
    }
  };
}
