// anagramme shuffle
function shuffleWord(word){
  if(!word) return '';
  const arr = word.split('');
  for(let i = arr.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const shuffled = arr.join('');
  return shuffled.toLowerCase() === word.toLowerCase() ? shuffleWord(word) : shuffled;
}

document.addEventListener('DOMContentLoaded', ()=>{
  const shuffleBtn = document.getElementById('shuffleBtn');
  const shuffleResult = document.getElementById('shuffleResult');
  const inputAnag = document.getElementById('inputAnag');

  if(shuffleBtn){
    shuffleBtn.addEventListener('click', ()=>{
      const word = inputAnag.value.trim();
      if(!word){
        shuffleResult.textContent = 'Écris d’abord un mot 😉';
        return;
      }
      shuffleResult.textContent = shuffleWord(word);
    });
  }

  // animation des sections au scroll
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
      }
    });
  },{
    threshold:0.15
  });

  document.querySelectorAll('.fade-in').forEach(sec=>observer.observe(sec));

  // smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(link=>{
    link.addEventListener('click', (e)=>{
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if(target){
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior:'smooth'
        });
      }
    });
  });
});
