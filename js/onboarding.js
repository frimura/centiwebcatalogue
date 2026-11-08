
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('onboardingOverlay');
  if (!overlay) return;

  const slides = [...overlay.querySelectorAll('.onboarding-slide')];
  const dots = [...overlay.querySelectorAll('.onboarding-dot')];

  const prev = document.getElementById('onboardingPrev');
  const next = document.getElementById('onboardingNext');
  const close = document.getElementById('onboardingClose');

  let current = 0;

  function showSlide(index) {
    current = Math.max(0, Math.min(index, slides.length - 1));

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === current);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });

    prev.style.visibility = current === 0 ? 'hidden' : 'visible';
    next.textContent =
      current === slides.length - 1 ? 'Mengerti' : 'Selanjutnya';
  }

  function closeOnboarding() {
    overlay.classList.add('hidden');
  }

  next.addEventListener('click', () => {
    if (current === slides.length - 1) {
      closeOnboarding();
    } else {
      showSlide(current + 1);
    }
  });

  prev.addEventListener('click', () => {
    showSlide(current - 1);
  });

  close.addEventListener('click', closeOnboarding);

  // Always show the onboarding when the page loads.
  overlay.classList.remove('hidden');

  showSlide(0);
});
