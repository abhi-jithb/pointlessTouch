const btn = document.getElementById('pointlessBtn');
const msg = document.getElementById('msg');
const stats = document.getElementById('stats');
const pressCountEl = document.querySelector('.press-count');
const moodIndicator = document.querySelector('.mood-indicator');

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
let buttonMood = 'neutral'; // neutral, happy, sad, angry, excited
let totalPresses = 0;

// Touch event support for mobile
const touchEvents = ['touchstart', 'touchend', 'touchmove'];
touchEvents.forEach(event => {
  btn.addEventListener(event, (e) => e.preventDefault());
});

btn.addEventListener('click', handleButtonClick);
btn.addEventListener('touchstart', handleButtonClick);

function handleButtonClick(e) {
  e.preventDefault();
  
  if (!isGameMode) {
    // Button Evolution Phase
    if (pressCount < buttonTexts.length) {
      // Add evolution animation and effects
      btn.classList.add('evolving');
      createConfetti();
      shakeScreen();
      addRippleEffect(e);
      
      setTimeout(() => {
        btn.classList.remove('evolving');
      }, 500);
      
      btn.textContent = buttonTexts[pressCount];
      
      // Button personality based on press count
      updateButtonPersonality();
      
      // Update stats
      totalPresses++;
      updateStats();
      
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
}

function createConfetti() {
  const colors = ['#ff5c5c', '#ff8c00', '#ffff00', '#00ff00', '#00ffff', '#ff00ff', '#ff69b4', '#4caf50'];
  
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDelay = Math.random() * 3 + 's';
    confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
    document.body.appendChild(confetti);
    
    // Remove confetti after animation
    setTimeout(() => {
      confetti.remove();
    }, 4000);
  }
}

function addRippleEffect(e) {
  const ripple = document.createElement('div');
  ripple.className = 'ripple';
  
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  
  btn.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

function shakeScreen() {
  document.body.classList.add('shake');
  setTimeout(() => {
    document.body.classList.remove('shake');
  }, 500);
}

function updateButtonPersonality() {
  const personalities = [
    { mood: 'neutral', text: 'Hmm...', color: '#ff5c5c', emoji: '😊' },
    { mood: 'sad', text: '😢 Why do you keep pressing?', color: '#4a90e2', emoji: '😢' },
    { mood: 'angry', text: '😠 STOP IT!', color: '#ff1f1f', emoji: '😠' },
    { mood: 'excited', text: '🎉 You\'re persistent!', color: '#ff8c00', emoji: '🎉' },
    { mood: 'happy', text: '😄 Fine, you win!', color: '#4caf50', emoji: '😄' }
  ];
  
  const personality = personalities[pressCount] || personalities[personalities.length - 1];
  buttonMood = personality.mood;
  
  // Update button appearance based on mood
  btn.style.background = personality.color;
  moodIndicator.textContent = `Mood: ${personality.emoji}`;
  
  // Add mood-specific animations
  btn.classList.remove('happy', 'sad', 'angry', 'excited');
  if (personality.mood !== 'neutral') {
    btn.classList.add(personality.mood);
  }
}

function updateStats() {
  pressCountEl.textContent = `Presses: ${totalPresses}`;
}

function startCatchMeGame() {
  isGameMode = true;
  btn.textContent = "Catch Me If You Can!";
  btn.classList.add('game-mode', 'excited');
  moodIndicator.textContent = 'Mood: 😈';
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
      
      // Change button text randomly with personality
      const gameTexts = [
        "Catch Me If You Can! 😈",
        "Too Slow! 🏃‍♂️",
        "Missed Me! 😝",
        "Try Again! 💪",
        "Not This Time! 🎯",
        "You'll Never Catch Me! 🏆",
        "Ha Ha Ha! 😂",
        "Still Trying? 🤔",
        "I'm Untouchable! ✨",
        "Give Up Already! 🏳️",
        "Nope! 🙅‍♂️",
        "Try Harder! 💪",
        "Impossible! 🚫",
        "You Can't Win! 🏆"
      ];
      btn.textContent = gameTexts[Math.floor(Math.random() * gameTexts.length)];
      
      // Add random visual effects
      if (Math.random() > 0.7) {
        createConfetti();
      }
      
      // Move again after a random delay
      setTimeout(moveButton, Math.random() * 2000 + 1000);
    }
  }
  
  // Start moving after a short delay
  setTimeout(moveButton, 1000);
  
  // Add hover effect to make it even harder
  btn.addEventListener('mouseenter', handleHover);
  btn.addEventListener('touchstart', handleHover);
}

function handleHover(e) {
  if (isGameMode) {
    e.preventDefault();
    const maxX = window.innerWidth - btn.offsetWidth;
    const maxY = window.innerHeight - btn.offsetHeight;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
    
    // Taunt the user
    btn.textContent = "Almost Got Me! 😏";
    createConfetti();
    
    // Update stats
    totalPresses++;
    updateStats();
  }
}

// Add ripple effect CSS dynamically
const style = document.createElement('style');
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
