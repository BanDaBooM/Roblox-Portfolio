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

  const floppaFacts = [
    "Floppa was first spotted near neon biomes.",
    "Floppa hums at low frequencies when happy.",
    "A playful floppa can cheer up a whole build team.",
    "Floppa likes small shiny objects and colorful pelmeni.",
    "Some floppa are collectors of tiny model parts."
  ];

  const floppaFactElement = document.getElementById("floppaFact");
  const floppaMemeLineElement = document.getElementById("floppaMemeLine");
  const newFloppaBtn = document.getElementById("newFloppaBtn");
  const floppaMemeBtn = document.getElementById("floppaMemeBtn");
  const easterEgg = document.getElementById("easterEgg");

  function randomFact() {
    return floppaFacts[Math.floor(Math.random() * floppaFacts.length)];
  }

  function showToast(message) {
    if (!easterEgg) return;
    easterEgg.textContent = message;
    easterEgg.classList.add("show");
    window.setTimeout(function () {
      easterEgg.classList.remove("show");
    }, 1800);
  }

  if (floppaFactElement) {
    floppaFactElement.textContent = randomFact();
  }

  if (newFloppaBtn && floppaFactElement) {
    newFloppaBtn.addEventListener("click", function () {
      floppaFactElement.textContent = randomFact();
      showToast("Fresh floppa fact loaded.");
    });
  }

  const floppaMemes = [
    "Floppa mode: ON. Builds: POG.",
    "Model review approved by the Council of Floppa.",
    "If it renders, the floppa nods.",
    "Pelmeni + floppa playlist = +20 modeling speed.",
    "Export first, panic never."
  ];

  if (floppaMemeLineElement) {
    floppaMemeLineElement.textContent = floppaMemes[0];
  }

  if (floppaMemeBtn && floppaMemeLineElement) {
    floppaMemeBtn.addEventListener("click", function () {
      const randomIndex = Math.floor(Math.random() * floppaMemes.length);
      floppaMemeLineElement.textContent = floppaMemes[randomIndex];
      showToast("New meme line delivered.");
    });
  }

  // Deep mode removed — no persistent state or toggle

  let keyBuffer = "";
  window.addEventListener("keydown", function (event) {
    keyBuffer = (keyBuffer + event.key.toLowerCase()).slice(-6);
    if (keyBuffer === "floppa") {
      showToast("Floppa combo unlocked.");
    }
  });
})();
