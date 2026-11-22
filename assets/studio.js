const vocabulary = [
  {
    level: 'B2 · Adjective',
    word: 'Resourceful',
    definition: 'Good at finding ways to solve problems.',
    example: '“When our supplier cancelled, Maya was resourceful and found a local alternative.”',
  },
  {
    level: 'B2 · Phrasal verb',
    word: 'Bring up',
    definition: 'To mention a topic in conversation.',
    example: '“Could you bring up the new schedule at tomorrow’s meeting?”',
  },
  {
    level: 'C1 · Adjective',
    word: 'Nuanced',
    definition: 'Showing an understanding of subtle differences.',
    example: '“Her review gave a nuanced account of what worked and where the app fell short.”',
  },
];

const preview = document.querySelector('[data-word-preview]');
const nextWord = preview.querySelector('.next-word');
const wordContent = preview.querySelector('.word-content');
const wordLevel = preview.querySelector('[data-word-level]');
const wordTitle = preview.querySelector('[data-word]');
const wordDefinition = preview.querySelector('[data-word-definition]');
const wordExample = preview.querySelector('[data-word-example]');
const motionAllowed = matchMedia('(prefers-reduced-motion: no-preference)');
let currentWord = 0;
let wordAnimation;

nextWord.hidden = false;
nextWord.addEventListener('click', () => {
  currentWord = (currentWord + 1) % vocabulary.length;
  const entry = vocabulary[currentWord];
  wordLevel.textContent = entry.level;
  wordTitle.textContent = entry.word;
  wordDefinition.textContent = entry.definition;
  wordExample.textContent = entry.example;

  wordAnimation?.cancel();
  if (motionAllowed.matches) {
    wordAnimation = wordContent.animate(
      [{ opacity: 0.4, transform: 'translateY(6px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 250, easing: 'ease-out' },
    );
  }
});

if (motionAllowed.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}
