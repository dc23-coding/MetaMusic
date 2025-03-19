// Show the navigation modal when the "Enter" button is clicked
document.getElementById('enter-btn').addEventListener('click', function() {
  document.getElementById('navigation-modal').style.display = 'block';
});

// Optionally, show the modal when the video ends
document.getElementById('landing-video').addEventListener('ended', function() {
  document.getElementById('navigation-modal').style.display = 'block';
});

// Handle navigation button clicks in the modal
document.querySelectorAll('.modal-btn').forEach(function(button) {
  button.addEventListener('click', function() {
    const targetPage = button.getAttribute('data-target');
    window.location.href = targetPage;
  });
});

// Close the modal when "Cancel" is clicked
document.getElementById('modal-close-btn').addEventListener('click', function() {
  document.getElementById('navigation-modal').style.display = 'none';
});
