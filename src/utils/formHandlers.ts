
import { addRequestToFeed } from './requestUtils';

export function handleHelpRequest(e: Event) {
  e.preventDefault();
  
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const studentName = formData.get('studentName') as string;
  const subject = formData.get('subject') as string;
  const description = formData.get('description') as string;

  const request = {
    id: Date.now(),
    name: studentName,
    subject: subject,
    description: description,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  addRequestToFeed(request);
  form.reset();

  // Show success animation
  const submitBtn = form.querySelector('.submit-btn') as HTMLButtonElement;
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<span>Request Submitted!</span> <i class="ph ph-check-circle"></i>';
  submitBtn.style.background = 'linear-gradient(135deg, #06ffa5, #00d9ff)';
  
  setTimeout(() => {
    submitBtn.innerHTML = originalText;
    submitBtn.style.background = '';
  }, 2000);
}

export function handleContactForm(e: Event) {
  e.preventDefault();
  
  const form = e.target as HTMLFormElement;
  const submitBtn = form.querySelector('.submit-btn') as HTMLButtonElement;
  const originalText = submitBtn.innerHTML;
  
  submitBtn.innerHTML = '<span>Sent!</span> <i class="ph ph-check-circle"></i>';
  submitBtn.style.background = 'linear-gradient(135deg, #06ffa5, #00d9ff)';
  
  setTimeout(() => {
    form.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.style.background = '';
  }, 2000);
}
