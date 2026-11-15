const registrationUrl = "https://docs.google.com/forms/d/e/1FAIpQLSd7iamIpcIhZv52VmESgM2xU_tsM7Idp--vh1YsZKgAQVNqVQ/viewform?pli=1";
const registrationOpens = new Date("2026-10-08T16:00:00+05:30");
const eventStarts = new Date("2026-11-15T06:00:00+05:30");

const countdownLabel = document.querySelector("#countdown-label");
const countdownTitle = document.querySelector("#countdown-title");
const registrationEyebrow = document.querySelector("#registration-eyebrow");
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
    registrationEyebrow.textContent = "Registrations are now open";
    countdownLabel.textContent = "The run begins in";
    countdownTitle.innerHTML = "Your coast-to-coast<br><em>morning awaits.</em>";
    registrationStatus.innerHTML = "Registration is now open<br><strong>Limited slots available</strong>";
    registerLinks.forEach((link) => {
      link.href = registrationUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.removeAttribute("aria-disabled");
      if (link.textContent.includes("Registration opens") || link.textContent.includes("Be the first")) {
        link.childNodes[0].textContent = "Register now ";
      }
    });
  }
}

function showRaceDayPhotoLink() {
  const photoUrl = "https://myphoto.snaptle.in/6GZINBBsSZts";
  const heroActions = document.querySelector(".hero-actions");
  const heroArt = document.querySelector(".hero-art");

  // Keep the requested changes confined to the hero; leave all other sections untouched.
  heroActions?.remove();

  if (!heroArt) return;

  heroArt.setAttribute("aria-label", "Animated face-scan illustration and link to HSR race day photos");
  heroArt.innerHTML = `
    <div class="race-photo-promo">
      <div class="race-photo-scan" aria-hidden="true">
        <span class="race-photo-scan-ring"></span>
        <span class="race-photo-face"><i></i><i></i><b></b></span>
        <span class="race-photo-beam"></span>
      </div>
      <p>Scan your face to find your race day photos</p>
      <a href="${photoUrl}" target="_blank" rel="noopener noreferrer">Get your photos <span aria-hidden="true">↗</span></a>
    </div>
  `;

  const styles = document.createElement("style");
  styles.textContent = `
    .race-photo-promo{width:min(100%,390px);min-height:390px;padding:34px 28px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;text-align:center;background:radial-gradient(circle at 50% 40%,#fffdf7 0,#f0e7d6 68%,#ead8b9 100%);border:1px solid rgba(21,59,59,.12);border-radius:22px;box-shadow:0 20px 45px rgba(13,48,48,.1)}
    .race-photo-scan{position:relative;width:178px;height:178px;display:grid;place-items:center;border:1px solid rgba(21,59,59,.22);border-radius:50%;background:rgba(255,255,255,.32);box-shadow:0 0 0 16px rgba(21,59,59,.035),0 0 0 34px rgba(21,59,59,.025);overflow:hidden}
    .race-photo-scan-ring{position:absolute;inset:18px;border:1px solid rgba(239,109,79,.32);border-radius:50%;animation:race-photo-pulse 2.4s ease-in-out infinite}
    .race-photo-face{position:relative;width:66px;height:83px;border-radius:48% 48% 45% 45%;background:var(--deep);box-shadow:0 16px 0 -5px var(--deep)}
    .race-photo-face i{position:absolute;top:34px;width:6px;height:6px;border-radius:50%;background:var(--cream)}
    .race-photo-face i:first-child{left:16px}.race-photo-face i:nth-child(2){right:16px}
    .race-photo-face b{position:absolute;left:50%;top:51px;width:18px;height:9px;border-bottom:1.5px solid var(--cream);border-radius:0 0 50% 50%;transform:translateX(-50%)}
    .race-photo-beam{position:absolute;left:12%;right:12%;top:18%;height:2px;background:var(--coral);box-shadow:0 0 12px rgba(239,109,79,.85),0 0 25px rgba(239,109,79,.45);animation:race-photo-sweep 2.5s ease-in-out infinite alternate}
    .race-photo-promo p{max-width:275px;margin:10px 0 0;color:var(--ink);font-size:15px;font-weight:600;line-height:1.4}
    .race-photo-promo a{display:inline-flex;align-items:center;gap:8px;color:var(--coral);font-size:13px;font-weight:800;text-decoration:underline;text-underline-offset:4px}
    .race-photo-promo a span{font-size:17px}
    @keyframes race-photo-sweep{from{top:18%;opacity:.65}to{top:78%;opacity:1}}
    @keyframes race-photo-pulse{0%,100%{transform:scale(.97);opacity:.7}50%{transform:scale(1.05);opacity:1}}
    @media(max-width:750px){.race-photo-promo{min-height:330px;width:min(100%,340px);margin:auto}.race-photo-scan{width:150px;height:150px}}
    @media(prefers-reduced-motion:reduce){.race-photo-scan-ring,.race-photo-beam{animation:none}.race-photo-beam{top:50%}}
  `;
  document.head.append(styles);
}

showRaceDayPhotoLink();
updateCountdown();
setInterval(updateCountdown, 1000);
