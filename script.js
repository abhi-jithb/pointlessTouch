const btn = document.getElementById('pointlessBtn');
const msg = document.getElementById('msg');

// Button evolution texts
const buttonTexts = [
  "Do Not Press!",
  "I Said Don't Press!",
  "Why Are You Still Pressing?",
  "Fine, Press Away!",
  "You Win, I Give Up!"
];

let pressCount = 0;
let isGameMode = false;

btn.addEventListener('click', () => {
  if (!isGameMode) {
    // Button Evolution Phase
    if (pressCount < buttonTexts.length) {
      // Add evolution animation
      btn.classList.add('evolving');
      setTimeout(() => {
        btn.classList.remove('evolving');
      }, 500);
      
      btn.textContent = buttonTexts[pressCount];
      msg.textContent = `You pressed it ${pressCount + 1} times!`;
      msg.classList.add('visible');
      setTimeout(() => {
        msg.classList.remove('visible');
      }, 2000);
      pressCount++;
    } else {
      // Start the "catch me if you can" game
      startCatchMeGame();
    }
  }
});

function startCatchMeGame() {
  isGameMode = true;
  btn.textContent = "Catch Me If You Can!";
  btn.classList.add('game-mode');
  msg.textContent = "The button is now playing hide and seek! Try to catch it!";
  msg.classList.add('visible');
  
  // Make button move around randomly
  btn.style.position = 'absolute';
  btn.style.transition = 'all 0.3s ease';
  
  function moveButton() {
    if (isGameMode) {
      const maxX = window.innerWidth - btn.offsetWidth;
      const maxY = window.innerHeight - btn.offsetHeight;
      
      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;
      
      btn.style.left = randomX + 'px';
      btn.style.top = randomY + 'px';
      
      // Change button text randomly
      const gameTexts = [
        "Catch Me If You Can!",
        "Too Slow!",
        "Missed Me!",
        "Try Again!",
        "Not This Time!",
        "You'll Never Catch Me!",
        "Ha Ha Ha!",
        "Still Trying?"
      ];
      btn.textContent = gameTexts[Math.floor(Math.random() * gameTexts.length)];
      
      // Move again after a random delay
      setTimeout(moveButton, Math.random() * 2000 + 1000);
    }
  }
  
  // Start moving after a short delay
  setTimeout(moveButton, 1000);
  
  // Add hover effect to make it even harder
  btn.addEventListener('mouseenter', () => {
    if (isGameMode) {
      const maxX = window.innerWidth - btn.offsetWidth;
      const maxY = window.innerHeight - btn.offsetHeight;
      
      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;
      
      btn.style.left = randomX + 'px';
      btn.style.top = randomY + 'px';
    }
  });
}
