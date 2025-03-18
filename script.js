const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

const muteToggle = document.querySelector('.mute-toggle');
const muteIcon = document.getElementById('mute-icon');
let isMuted = false; // Track mute state

body.setAttribute('data-theme', 'dark');
themeIcon.classList.add('fa-sun');

themeToggle.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeIcon.classList.toggle('fa-sun', !isDark);
    themeIcon.classList.toggle('fa-moon', isDark);
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

muteToggle.addEventListener('click', () => {
    isMuted = !isMuted; // Toggle mute state
    muteIcon.classList.toggle('fa-volume-up', !isMuted);
    muteIcon.classList.toggle('fa-volume-mute', isMuted);
    localStorage.setItem('isMuted', isMuted);
});

const mobileMenu = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');

mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('active');
});

document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        navList.classList.remove('active');
    });
});

const typingText = document.getElementById('typing-text');
const text = "Hi, I'm Suhas B S";
let index = 2; 
let isDeleting = false;

function playSoundEffect(url) {
    if (isMuted) return; 
    const audio = new Audio(url);
    audio.play().catch(error => {
        console.error('Failed to play sound:', error);
    });
}

function type() {
    if (!isDeleting && index < text.length) {
        typingText.textContent = text.substring(0, index + 1); 
        index++;

        playSoundEffect('https://assets.mixkit.co/active_storage/sfx/2852/2852-preview.mp3');

        setTimeout(type, 100); 
    } else if (isDeleting && index > 1) {
        typingText.textContent = text.substring(0, index ); 
        index--;

        playSoundEffect('https://assets.mixkit.co/active_storage/sfx/2852/2852-preview.mp3');

        setTimeout(type, 50); 
    } else {
        isDeleting = !isDeleting;

        if (!isDeleting) {
            setTimeout(type, 1000); 
        } else {
            setTimeout(type, 1000); 
        }
    }
}

document.addEventListener('click', () => {
    typingText.textContent = 'H'; 
    type();
}, { once: true });

const savedMuteState = localStorage.getItem('isMuted');
if (savedMuteState === 'true') {
    isMuted = true;
    muteIcon.classList.remove('fa-volume-up');
    muteIcon.classList.add('fa-volume-mute');
}