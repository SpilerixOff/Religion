// Anagramme shuffle
function shuffleWord(word) {
  if (!word) return "";
  const arr = word.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const shuffled = arr.join("");
  return shuffled.toLowerCase() === word.toLowerCase() ? shuffleWord(word) : shuffled;
}

document.addEventListener("DOMContentLoaded", () => {
  const shuffleBtn = document.getElementById("shuffleBtn");
  const shuffleResult = document.getElementById("shuffleResult");
  const inputAnag = document.getElementById("inputAnag");

  if (shuffleBtn && shuffleResult && inputAnag) {
    shuffleBtn.addEventListener("click", () => {
      const word = inputAnag.value.trim();
      if (!word) {
        shuffleResult.textContent = "Écris d’abord un mot 😉";
        return;
      }
      shuffleResult.textContent = shuffleWord(word);
    });
  }

  // Scroll reveal
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".fade").forEach(el => observer.observe(el));

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const id = link.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: "smooth"
        });
      }
    });
  });
});
