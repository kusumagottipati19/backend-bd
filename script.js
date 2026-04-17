// ==================== Secret Authentication ====================
const SECRET_CREDENTIALS = {
    email: 'yakasiri3033@gmail.com',
    password: 'sanju26'
};

let isSecretUnlocked = false;
let secretTimer = null;

// ==================== Smooth Scrolling Navigation ====================
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active section on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.wishes-section');
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});

// ==================== Send Wish Functionality ====================
const sendWishButtons = document.querySelectorAll('.send-wish-btn');

sendWishButtons.forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.wish-card');
        const category = card.dataset.category;
        const title = card.querySelector('.card-title').textContent;
        
        // Show toast notification
        showToast(`🎉 Birthday wish sent to ${title}!`);
        
        // Add animation to button
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);

        // Log to console (in production, this would send to backend)
        console.log(`Wish sent - Category: ${category}, Recipient: ${title}`);
    });
});

// ==================== Toast Notification ====================
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ==================== Interactive Blow & Cut Cake ====================
const blowCandlesBtn = document.getElementById('blowCandlesBtn');
const cutCakeBtn = document.getElementById('cutCakeBtn');
const candles = document.getElementById('candles');
const cakeContainer = document.getElementById('cakeContainer');
const cakeInstructions = document.getElementById('cakeInstructions');
const birthdayMessage = document.getElementById('birthdayMessage');

let candlesBlown = false;
let cakeCut = false;

blowCandlesBtn.addEventListener('click', function() {
    if (!candlesBlown) {
        // Blow out candles animation
        const flames = document.querySelectorAll('.flame');
        flames.forEach((flame, index) => {
            setTimeout(() => {
                flame.style.opacity = '0';
                flame.style.transform = 'translateY(-20px)';
            }, index * 200);
        });
        
        setTimeout(() => {
            candles.style.display = 'none';
            candlesBlown = true;
            blowCandlesBtn.style.display = 'none';
            cutCakeBtn.style.display = 'inline-block';
            cakeInstructions.innerHTML = '<p>✨ <strong>Great!</strong> Now cut the cake to celebrate!</p>';
            showToast('🎉 Candles blown! Now cut the cake!');
        }, 800);
    }
});

cutCakeBtn.addEventListener('click', function() {
    if (!cakeCut && candlesBlown) {
        // Cut cake animation
        const cake = document.querySelector('.cake');
        cake.style.transform = 'scale(0.8)';
        cake.style.opacity = '0.5';
        
        setTimeout(() => {
            cakeContainer.style.display = 'none';
            cutCakeBtn.style.display = 'none';
            cakeInstructions.style.display = 'none';
            birthdayMessage.style.display = 'block';
            cakeCut = true;
            
            // Trigger confetti
            createConfetti();
            showToast('🎂 Happy Birthday Sanjay Varma! 🎉');
        }, 500);
    }
});

// ==================== Card Hover Effects ====================
const wishCards = document.querySelectorAll('.wish-card');

wishCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.card-icon');
        icon.style.transform = 'scale(1.2) rotate(10deg)';
        icon.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.card-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ==================== Entrance Animations ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for entrance animations
document.querySelectorAll('.wishes-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// ==================== Confetti Effect on Wish Send ====================
function createConfetti() {
    const confettiCount = 50;
    const colors = ['#ff6b9d', '#c44569', '#ffa502', '#4834d4', '#6c5ce7'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
        confetti.style.pointerEvents = 'none';
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '9999';
        
        document.body.appendChild(confetti);
        
        const fallDuration = Math.random() * 3 + 2;
        const fallDistance = window.innerHeight + 100;
        
        confetti.animate([
            { 
                top: '-10px',
                opacity: 1,
                transform: 'rotate(0deg) translateX(0)'
            },
            { 
                top: fallDistance + 'px',
                opacity: 0,
                transform: 'rotate(' + (Math.random() * 720) + 'deg) translateX(' + (Math.random() * 200 - 100) + 'px)'
            }
        ], {
            duration: fallDuration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        setTimeout(() => {
            confetti.remove();
        }, fallDuration * 1000);
    }
}

// Add confetti to wish buttons
sendWishButtons.forEach(button => {
    button.addEventListener('click', createConfetti);
});

// ==================== Secret Section Handler ====================
const secretLink = document.querySelector('.secret-link');
const secretModal = document.getElementById('secretModal');
const closeModal = document.getElementById('closeModal');
const secretLoginForm = document.getElementById('secretLoginForm');
const loginError = document.getElementById('loginError');
const secretSection = document.getElementById('secret');

// Open modal when Secret link is clicked
secretLink.addEventListener('click', function(e) {
    e.preventDefault();
    
    if (isSecretUnlocked) {
        // Already unlocked, scroll to section
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = secretSection.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    } else {
        // Show login modal
        secretModal.classList.add('active');
    }
});

// Close modal
closeModal.addEventListener('click', function() {
    secretModal.classList.remove('active');
    loginError.style.display = 'none';
    secretLoginForm.reset();
});

// Close modal on overlay click
secretModal.addEventListener('click', function(e) {
    if (e.target === secretModal) {
        secretModal.classList.remove('active');
        loginError.style.display = 'none';
        secretLoginForm.reset();
    }
});

// Handle login form submission
secretLoginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('secretEmail').value.trim();
    const password = document.getElementById('secretPassword').value;
    
    // Validate credentials
    if (email === SECRET_CREDENTIALS.email && password === SECRET_CREDENTIALS.password) {
        // Success!
        isSecretUnlocked = true;
        
        // Hide modal
        secretModal.classList.remove('active');
        
        // Show secret section
        secretSection.classList.add('unlocked');
        secretSection.style.display = 'block';
        
        // Update secret link appearance
        secretLink.innerHTML = 'Secret 🔓';
        secretLink.style.background = 'linear-gradient(145deg, #FFD700, #FFA500)';
        
        // Show success toast
        showToast('🎉 Secret Unlocked! Welcome to exclusive content!');
        
        // Scroll to secret section
        setTimeout(() => {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = secretSection.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            secretLink.classList.add('active');
        }, 500);
        
        // Start timer
        startSecretTimer();
        
        // Trigger confetti
        createConfetti();
        
        // Reset form
        secretLoginForm.reset();
        loginError.style.display = 'none';
    } else {
        // Failed authentication
        loginError.style.display = 'block';
        
        // Shake the form
        secretLoginForm.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            secretLoginForm.style.animation = '';
        }, 500);
    }
});

// Start timer in secret section
function startSecretTimer() {
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    let totalSeconds = 0;
    
    secretTimer = setInterval(() => {
        totalSeconds++;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }, 1000);
}

// ==================== Photo Lightbox Gallery ====================
const photoLightbox = document.getElementById('photoLightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCounter = document.getElementById('lightboxCounter');
const closeLightbox = document.getElementById('closeLightbox');
const prevPhoto = document.getElementById('prevPhoto');
const nextPhoto = document.getElementById('nextPhoto');

const photoSources = [
    '/pic/1.jpeg',
    '/pic/3.jpeg',
    '/pic/4.jpeg',
    '/pic/5.jpeg',
    '/pic/6.jpeg',
    '/pic/7.jpeg',
    '/pic/8.jpeg',
    '/pic/9.jpeg',
    '/pic/10.jpeg',
    '/pic/11.jpeg',
    '/pic/12.jpeg',
    '/pic/15.jpeg',
    '/pic/113.jpeg',
    '/pic/WhatsApp%20Image%202026-04-16%20at%208.27.34%20AM.jpeg'
];

let currentPhotoIndex = 0;

// Add click event to all photo items
document.addEventListener('click', function(e) {
    const photoItem = e.target.closest('.photo-item');
    if (photoItem) {
        const img = photoItem.querySelector('img');
        if (img) {
            const imgSrc = img.getAttribute('src');
            currentPhotoIndex = photoSources.indexOf(imgSrc);
            if (currentPhotoIndex !== -1) {
                openLightbox(currentPhotoIndex);
            }
        }
    }
});

function openLightbox(index) {
    currentPhotoIndex = index;
    lightboxImage.src = photoSources[currentPhotoIndex];
    lightboxCounter.textContent = `${currentPhotoIndex + 1} / ${photoSources.length}`;
    photoLightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function closeLightboxFunc() {
    photoLightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
}

function showNextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photoSources.length;
    lightboxImage.src = photoSources[currentPhotoIndex];
    lightboxCounter.textContent = `${currentPhotoIndex + 1} / ${photoSources.length}`;
    
    // Add animation
    lightboxImage.style.animation = 'none';
    setTimeout(() => {
        lightboxImage.style.animation = 'zoomIn 0.4s ease';
    }, 10);
}

function showPrevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photoSources.length) % photoSources.length;
    lightboxImage.src = photoSources[currentPhotoIndex];
    lightboxCounter.textContent = `${currentPhotoIndex + 1} / ${photoSources.length}`;
    
    // Add animation
    lightboxImage.style.animation = 'none';
    setTimeout(() => {
        lightboxImage.style.animation = 'zoomIn 0.4s ease';
    }, 10);
}

// Event listeners for lightbox
closeLightbox.addEventListener('click', closeLightboxFunc);
nextPhoto.addEventListener('click', showNextPhoto);
prevPhoto.addEventListener('click', showPrevPhoto);

// Close on background click
photoLightbox.addEventListener('click', function(e) {
    if (e.target === photoLightbox) {
        closeLightboxFunc();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (photoLightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightboxFunc();
        } else if (e.key === 'ArrowRight') {
            showNextPhoto();
        } else if (e.key === 'ArrowLeft') {
            showPrevPhoto();
        }
    }
});

// ==================== Console Art ====================
console.log('%c🎂 Happy Birthday Sanjay Varma! 🎂', 'color: #FFD700; font-size: 24px; font-weight: bold;');
console.log('%cMade with ❤️ for celebrations!', 'color: #C0C0C0; font-size: 14px;');
console.log('%cEnjoy the interactive features!', 'color: #808080; font-size: 12px;');
console.log('%c🔒 Secret section requires authentication', 'color: #DC143C; font-size: 12px; font-weight: bold;');

