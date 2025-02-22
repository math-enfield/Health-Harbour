// Get form and confirmation message elements
const form = document.getElementById('contactForm');
const confirmationMessage = document.getElementById('confirmationMessage');

// Handle form submission
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form from submitting

  // Show confirmation message and hide form
  confirmationMessage.style.display = 'block';
  form.classList.add('hidden');

  // Optional: Clear form fields
  form.reset();
});