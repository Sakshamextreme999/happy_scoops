// Contact form validation
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const msg = document.getElementById("formMessage");

  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (name === "" || email === "" || message === "") {
        msg.textContent = "⚠️ Please fill out all fields!";
        msg.style.color = "red";
      } else if (!email.includes("@")) {
        msg.textContent = "⚠️ Enter a valid email!";
        msg.style.color = "red";
      } else {
        msg.textContent = "✅ Message sent successfully!";
        msg.style.color = "green";
        form.reset();
      }
    });
  }
});
