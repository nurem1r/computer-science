// admission.js - Admission page interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all cards and important elements
    const elementsToAnimate = document.querySelectorAll(
        '.info-card, .contact-card, .scholarship-item, .aid-category, .important-notice'
    );
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });

    // Add interactive effects to table rows
    const tableRows = document.querySelectorAll('.admission-table tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--accent-transparent)';
            this.style.transition = 'background-color 0.3s ease';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });

    // Add pulse animation to important dates
    const timelineMarkers = document.querySelectorAll('.timeline-marker');
    timelineMarkers.forEach(marker => {
        marker.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 1s infinite';
        });
        
        marker.addEventListener('mouseleave', function() {
            this.style.animation = '';
        });
    });

    // Scholarship items hover effects
    const scholarshipItems = document.querySelectorAll('.scholarship-item');
    scholarshipItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const medal = this.querySelector('.scholarship-medal');
            if (medal) {
                medal.style.transform = 'scale(1.1) rotate(5deg)';
                medal.style.transition = 'transform 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const medal = this.querySelector('.scholarship-medal');
            if (medal) {
                medal.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Document list items interactive effects
    const docItems = document.querySelectorAll('.documents-list li');
    docItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.doc-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.doc-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    // GRT items counter animation
    const grtItems = document.querySelectorAll('.grt-item');
    grtItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.classList.add('animate-in');
    });

    // Add print functionality
    const printButton = document.createElement('button');
    printButton.innerHTML = `
        <i class="fas fa-print"></i>
        <span>Print Admission Information</span>
    `;
    printButton.className = 'accent-button';
    printButton.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 1rem 2rem;
        background: var(--accent-transparent);
        border: 1px solid var(--accent-blue);
        border-radius: 6px;
        color: var(--accent-blue);
        font-family: 'JetBrains Mono', monospace;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin: 2rem auto;
        cursor: pointer;
        transition: all 0.3s ease;
    `;

    printButton.addEventListener('mouseenter', function() {
        this.style.background = 'var(--accent-blue)';
        this.style.color = 'var(--bg-primary)';
        this.style.transform = 'translateY(-2px)';
    });

    printButton.addEventListener('mouseleave', function() {
        this.style.background = 'var(--accent-transparent)';
        this.style.color = 'var(--accent-blue)';
        this.style.transform = 'translateY(0)';
    });

    printButton.addEventListener('click', function() {
        window.print();
    });

    document.querySelector('.admission-content').appendChild(printButton);

    // Terminal typing effect
    const terminalText = document.querySelector('.prompt-text');
    const originalText = terminalText.textContent;
    terminalText.textContent = '';

    let charIndex = 0;
    const typeWriter = () => {
        if (charIndex < originalText.length) {
            terminalText.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50);
        }
    };

    // Start typing after a short delay
    setTimeout(typeWriter, 1000);
});

// Pulse animation for CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);