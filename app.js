document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Dark/Light Theme Switcher
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check local storage or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const theme = htmlElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const moonIcon = themeToggle.querySelector('.fa-moon');
        const sunIcon = themeToggle.querySelector('.fa-sun');
        if (theme === 'light') {
            moonIcon.style.transform = 'translateY(0)';
            sunIcon.style.transform = 'translateY(40px)';
        } else {
            moonIcon.style.transform = 'translateY(-40px)';
            sunIcon.style.transform = 'translateY(0)';
        }
    }

    // ==========================================
    // 2. Typing Effect (Hero Section)
    // ==========================================
    const typingSpan = document.getElementById('typing');
    const words = [
        "IT Systems Support",
        "Business Systems Analysis",
        "VMware & Server Admin",
        "Network & Security Audits"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // faster deleting
        } else {
            typingSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // standard typing
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 1500; // pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // pause before typing next word
        }

        setTimeout(type, typeSpeed);
    }
    
    // Start typing animation if element exists
    if (typingSpan) {
        type();
    }

    // ==========================================
    // 3. Mobile Navigation Menu Toggle
    // ==========================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ==========================================
    // 4. Scroll Spy (Active Section Highlighting)
    // ==========================================
    const sections = document.querySelectorAll('section');
    
    function scrollSpy() {
        const scrollPosition = window.scrollY + 100;

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
    }

    window.addEventListener('scroll', scrollSpy);

    // ==========================================
    // 5. Scroll Animations (Fade-in & Skill Bars)
    // ==========================================
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // If it's the skills section, animate progress bars
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                
                // Unobserve once animated
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    sections.forEach(section => {
        animationObserver.observe(section);
    });

    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        skillBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width = targetWidth;
        });
    }

    // ==========================================
    // 6. Interactive Contact Form Handler
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show sending state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending Message...';
            
            // Send the request using Fetch API
            fetch("https://formsubmit.co/ajax/varghesejohn.inbox@gmail.com", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: document.getElementById("form-name").value,
                    email: document.getElementById("form-email").value,
                    subject: document.getElementById("form-subject").value,
                    message: document.getElementById("form-message").value
                })
            })
            .then(response => response.json())
            .then(data => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                if (data.success === "true" || data.success === true) {
                    formFeedback.textContent = "Thank you! Your message has been sent successfully. (Note: If this is the first submission, check your email inbox to verify/activate the form).";
                    formFeedback.className = "form-message success";
                    formFeedback.style.display = 'block';
                    contactForm.reset();
                } else {
                    formFeedback.textContent = "Oops! Something went wrong: " + (data.message || "Please try again later.");
                    formFeedback.className = "form-message error";
                    formFeedback.style.display = 'block';
                }
                
                // Hide message after 8 seconds
                setTimeout(() => {
                    formFeedback.style.display = 'none';
                }, 8000);
            })
            .catch(error => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                formFeedback.textContent = "Oops! There was a network error. Please check your internet connection and try again.";
                formFeedback.className = "form-message error";
                formFeedback.style.display = 'block';
                
                setTimeout(() => {
                    formFeedback.style.display = 'none';
                }, 8000);
            });
        });
    }
});
