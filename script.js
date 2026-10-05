const registrationUrl = "https://docs.google.com/forms/d/e/1FAIpQLSd7iamIpcIhZv52VmESgM2xU_tsM7Idp--vh1YsZKgAQVNqVQ/viewform?pli=1";
const registrationOpens = new Date("2026-10-08T16:00:00+05:30");
const eventStarts = new Date("2026-11-15T06:00:00+05:30");

const countdownLabel = document.querySelector("#countdown-label");
const countdownTitle = document.querySelector("#countdown-title");
const registrationStatus = document.querySelector("#registration-status");
const registerLinks = document.querySelectorAll(".register-link");
const countdownParts = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
};
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-navigation");

menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "Close" : "Menu";
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "Menu";
  });
});

function updateCountdown() {
  const now = new Date();
  const registrationIsOpen = now >= registrationOpens;
  const target = registrationIsOpen ? eventStarts : registrationOpens;
  const remaining = Math.max(0, target.getTime() - now.getTime());
  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownParts.days.textContent = String(days).padStart(2, "0");
  countdownParts.hours.textContent = String(hours).padStart(2, "0");
  countdownParts.minutes.textContent = String(minutes).padStart(2, "0");
  countdownParts.seconds.textContent = String(seconds).padStart(2, "0");

  if (registrationIsOpen) {
    countdownLabel.textContent = "The run begins in";
    countdownTitle.innerHTML = "Your coast-to-coast<br><em>morning awaits.</em>";
    registrationStatus.innerHTML = "Registration is now open<br><strong>Limited slots available</strong>";
    registerLinks.forEach((link) => {
      link.href = registrationUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.removeAttribute("aria-disabled");
      if (link.textContent.includes("Registration opens")) {
        link.childNodes[0].textContent = "Register now ";
      }
    });
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);
