// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const contentSections = document.querySelectorAll('.content-section');
const currentTopicElement = document.getElementById('current-topic');

// GSAP Timeline Initialization
const tl = gsap.timeline();

// Initial Animation (Sidebar animation removed)
window.addEventListener('DOMContentLoaded', () => {
    // Animate the content container
    tl.from('.content-container', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Animate the active content section
    tl.from('#content-a .content-wrapper', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.6');
});

// Content Switching Logic
navItems.forEach(item => {
    item.addEventListener('click', () => {
        const topic = item.getAttribute('data-topic');
        
        // Update active nav item
        navItems.forEach(navItem => navItem.classList.remove('active'));
        item.classList.add('active');
        
        // Update current topic display
        currentTopicElement.textContent = topic;
        
        // Hide all content sections
        contentSections.forEach(section => section.classList.remove('active'));
        
        // Show the selected content section with animation
        const selectedSection = document.getElementById(`content-${topic}`);
        selectedSection.classList.add('active');
        
        // GSAP animation for content switching
        gsap.fromTo(
            `#content-${topic} .content-wrapper`,
            { 
                y: 30, 
                opacity: 0 
            },
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.7, 
                ease: 'power2.out' 
            }
        );
    });
});

// Real-time simulation (for demonstration)
function simulateRealTimeUpdates() {
    setInterval(() => {
        const activeSection = document.querySelector('.content-section.active');
        if (activeSection) {
            const contentWrapper = activeSection.querySelector('.content-wrapper');
            
            // Simple animation to simulate data update
            gsap.to(contentWrapper, {
                duration: 0.3,
                opacity: 0.8,
                yoyo: true,
                repeat: 1,
                onComplete: () => {
                    const timestamp = new Date().toLocaleTimeString();
                    const paragraphs = contentWrapper.querySelectorAll('p');
                    
                    if (paragraphs.length > 1) {
                        paragraphs[1].textContent = `Real-time data updated at ${timestamp}`;
                    }
                }
            });
        }
    }, 8000);
}

// Start the real-time simulation
simulateRealTimeUpdates();

// Helper function to add smooth hover effects
function initializeHoverEffects() {
    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (!item.classList.contains('active')) {
                gsap.to(item, {
                    duration: 0.3,
                    x: 5,
                    ease: 'power1.out'
                });
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (!item.classList.contains('active')) {
                gsap.to(item, {
                    duration: 0.3,
                    x: 0,
                    ease: 'power1.out'
                });
            }
        });
    });
}

// Initialize hover effects
initializeHoverEffects();
