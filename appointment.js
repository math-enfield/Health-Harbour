// Get form and confirmation message elements
const form = document.getElementById('appointmentForm');
const confirmationMessage = document.getElementById('confirmationMessage');
const userName = document.getElementById('userName');
const selectedDoctor = document.getElementById('selectedDoctor');
const appointmentDate = document.getElementById('appointmentDate');
const appointmentTime = document.getElementById('appointmentTime');

// Handle form submission
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form from submitting

  // Get form values
  const name = document.getElementById('name').value;
  const doctor = document.getElementById('doctor').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;

  // Update confirmation message
  userName.textContent = name;
  selectedDoctor.textContent = doctor;
  appointmentDate.textContent = date;
  appointmentTime.textContent = time;

  // Show confirmation message and hide form
  confirmationMessage.style.display = 'block';
  form.classList.add('hidden');
});