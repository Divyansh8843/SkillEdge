
export function initializeModal() {
  const modal = document.getElementById('contactModal');
  const modalClose = document.querySelector('.modal-close');
  
  modalClose?.addEventListener('click', () => {
    modal?.classList.remove('active');
  });

  // Close modal when clicking outside
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}
