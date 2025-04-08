// JavaScript para a landing page

document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
        });
    }
    
    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const icon = otherItem.querySelector('.faq-toggle i');
                    icon.className = 'fas fa-plus';
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            const icon = item.querySelector('.faq-toggle i');
            
            if (item.classList.contains('active')) {
                icon.className = 'fas fa-minus';
            } else {
                icon.className = 'fas fa-plus';
            }
        });
    });
    
    // Curriculum toggle
    const curriculumToggle = document.getElementById('toggleCurriculum');
    const curriculumGrid = document.querySelector('.curriculum-grid');
    
    if (curriculumToggle && curriculumGrid) {
        let isExpanded = false;
        
        // Initially hide items beyond the first 6
        const curriculumItems = curriculumGrid.querySelectorAll('.curriculum-item');
        if (curriculumItems.length > 6) {
            for (let i = 6; i < curriculumItems.length; i++) {
                curriculumItems[i].style.display = 'none';
            }
        }
        
        curriculumToggle.addEventListener('click', function() {
            isExpanded = !isExpanded;
            
            if (isExpanded) {
                // Show all items
                curriculumItems.forEach(item => {
                    item.style.display = 'flex';
                });
                curriculumToggle.textContent = 'OCULTAR GRADE CURRICULAR';
            } else {
                // Hide items beyond the first 6
                for (let i = 6; i < curriculumItems.length; i++) {
                    curriculumItems[i].style.display = 'none';
                }
                curriculumToggle.textContent = 'VER GRADE CURRICULAR COMPLETA';
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                }
            }
        });
    });
    
    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.benefit-card, .curriculum-item, .testimonial-card, .bonus-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const elementsToAnimate = document.querySelectorAll('.benefit-card, .curriculum-item, .testimonial-card, .bonus-card');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Countdown timer for urgency
    function updateCountdown() {
        const now = new Date();
        const hours = 23 - now.getHours();
        const minutes = 59 - now.getMinutes();
        const seconds = 59 - now.getSeconds();
        
        const countdownElements = document.querySelectorAll('.countdown-timer');
        countdownElements.forEach(element => {
            element.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        });
    }
    
    // If countdown elements exist, start the timer
    if (document.querySelector('.countdown-timer')) {
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
});
