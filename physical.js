// You can add interactivity here if needed
// For example, a button to toggle visibility of health issues
document.addEventListener("DOMContentLoaded", function () {
    const healthIssues = document.querySelectorAll(".health-issue");
  
    healthIssues.forEach((issue) => {
      issue.addEventListener("click", () => {
        issue.classList.toggle("expanded");
      });
    });
  });