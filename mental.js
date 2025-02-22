// Optional: Add interactivity if needed
// For example, you can add a feature to expand/collapse details
const problemCards = document.querySelectorAll('.problem-card');

problemCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('expanded');
  });
});