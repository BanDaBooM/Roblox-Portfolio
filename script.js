(function () {
  const birthDate = new Date(2009, 6, 1);
  const now = new Date();

  let age = now.getFullYear() - birthDate.getFullYear();
  const hasBirthdayPassed =
    now.getMonth() > birthDate.getMonth() ||
    (now.getMonth() === birthDate.getMonth() && now.getDate() >= birthDate.getDate());

  if (!hasBirthdayPassed) {
    age -= 1;
  }

  const ageElement = document.getElementById("currentAge");
  const ageDetailsElement = document.getElementById("ageDetails");
  if (ageElement) {
    ageElement.textContent = String(age);
  }

  if (ageDetailsElement) {
    const nextBirthdayYear = hasBirthdayPassed ? now.getFullYear() + 1 : now.getFullYear();
    const nextBirthday = new Date(nextBirthdayYear, birthDate.getMonth(), birthDate.getDate());
    const oneDay = 24 * 60 * 60 * 1000;
    const daysLeft = Math.ceil((nextBirthday - now) / oneDay);
    ageDetailsElement.textContent =
      daysLeft === 0 ? "Birthday is today. Level up!" : "Next birthday in " + daysLeft + " days";
  }

  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = String(now.getFullYear());
  }

  const avatarImage = document.getElementById("avatarImage");
  const avatarFallback = document.getElementById("avatarFallback");

  function showFallback() {
    if (avatarImage) avatarImage.style.display = "none";
    if (avatarFallback) avatarFallback.style.display = "grid";
  }

  function showImage() {
    if (avatarImage) avatarImage.style.display = "block";
    if (avatarFallback) avatarFallback.style.display = "none";
  }

  if (avatarImage) {
    avatarImage.addEventListener("error", showFallback);
    avatarImage.addEventListener("load", showImage);

    if (!avatarImage.complete || avatarImage.naturalWidth === 0) {
      showFallback();
    } else {
      showImage();
    }
  }

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  const floopaFacts = [
    "Floopa was first spotted near neon biomes.",
    "Floopa hums at low frequencies when happy.",
    "A playful floopa can cheer up a whole build team.",
    "Floopa likes small shiny objects and colorful pelmeni.",
    "Some floopa are collectors of tiny model parts."
  ];

  const floopaFactElement = document.getElementById("floopaFact");
  const floopaMemeLineElement = document.getElementById("floopaMemeLine");
  const newFloopaBtn = document.getElementById("newFloopaBtn");
  const floopaMemeBtn = document.getElementById("floopaMemeBtn");
  const seaModeBtn = document.getElementById("seaModeBtn");
  const easterEgg = document.getElementById("easterEgg");

  function randomFact() {
    return floopaFacts[Math.floor(Math.random() * floopaFacts.length)];
  }

  function showToast(message) {
    if (!easterEgg) return;
    easterEgg.textContent = message;
    easterEgg.classList.add("show");
    window.setTimeout(function () {
      easterEgg.classList.remove("show");
    }, 1800);
  }

  if (floopaFactElement) {
    floopaFactElement.textContent = randomFact();
  }

  if (newFloopaBtn && floopaFactElement) {
    newFloopaBtn.addEventListener("click", function () {
      floopaFactElement.textContent = randomFact();
      showToast("Fresh floopa fact loaded.");
    });
  }

  const floopaMemes = [
    "Floopa mode: ON. Builds: POG.",
    "Model review approved by the Council of Floopa.",
    "If it renders, the floopa nods.",
    "Pelmeni + floopa playlist = +20 modeling speed.",
    "Export first, panic never."
  ];

  if (floopaMemeLineElement) {
    floopaMemeLineElement.textContent = floopaMemes[0];
  }

  if (floopaMemeBtn && floopaMemeLineElement) {
    floopaMemeBtn.addEventListener("click", function () {
      const randomIndex = Math.floor(Math.random() * floopaMemes.length);
      floopaMemeLineElement.textContent = floopaMemes[randomIndex];
      showToast("New meme line delivered.");
    });
  }

  const storedSeaMode = window.localStorage.getItem("deepSeaMode") === "1";
  if (storedSeaMode) {
    document.body.classList.add("deep-mode");
  }

  if (seaModeBtn) {
    seaModeBtn.addEventListener("click", function () {
      const enabled = document.body.classList.toggle("deep-mode");
      window.localStorage.setItem("deepSeaMode", enabled ? "1" : "0");
      showToast(enabled ? "Deep Sea Mode enabled." : "Deep Sea Mode disabled.");
    });
  }

  let keyBuffer = "";
  window.addEventListener("keydown", function (event) {
    keyBuffer = (keyBuffer + event.key.toLowerCase()).slice(-6);
    if (keyBuffer === "floopa") {
      showToast("Floopa combo unlocked.");
    }
  });
})();
