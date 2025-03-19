document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById("landing-video");
    const enterBtn = document.getElementById("enter-btn");
  
    // Transition when the user clicks the button
    enterBtn.addEventListener("click", function() {
      window.location.href = "home.html";
    });
  
    // Alternatively, if you want to auto-transition after video ends:
    video.addEventListener("ended", function() {
      window.location.href = "home.html";
    });
  });
  