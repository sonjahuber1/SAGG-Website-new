// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Enhanced counter animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

const startCounting = (counter) => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        requestAnimationFrame(() => startCounting(counter));
    } else {
        counter.innerText = target;
        if (target === 100) {
            counter.innerText = target + '%';
        }
    }
};

// Improved intersection observer
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            counters.forEach(counter => startCounting(counter));
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const impactSection = document.querySelector('.impact');
observer.observe(impactSection);

// Donation button handler with improved UX
const donateBtn = document.querySelector('.donate-btn');
donateBtn.addEventListener('click', () => {
    const donationForm = document.createElement('div');
    donationForm.className = 'donation-modal';
    donationForm.innerHTML = `
        <div class="modal-content">
            <h2>Choose Your Donation Amount</h2>
            <div class="donation-options">
                <button data-amount="10">£10/month</button>
                <button data-amount="25">£25/month</button>
                <button data-amount="50">£50/month</button>
                <button class="custom-amount">Custom Amount</button>
            </div>
            <p class="impact-message">Your donation will directly support girls' education in The Gambia</p>
        </div>
    `;
    document.body.appendChild(donationForm);
});

// Add form submission handler for newsletter
const newsletterForm = document.querySelector('.subscribe-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        // Add newsletter subscription logic here
        alert('Thank you for subscribing! We will keep you updated on our mission.');
    });
}

// Add Chart.js library in your HTML
// <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

// Interactive Charts
document.addEventListener('DOMContentLoaded', function() {
    // Girls Supported Chart
    const girlsCtx = document.getElementById('girlsChart').getContext('2d');
    new Chart(girlsCtx, {
        type: 'line',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023'],
            datasets: [{
                label: 'Girls Supported',
                data: [20, 50, 100, 150, 200],
                borderColor: '#C15B5B',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Communities Chart
    const communityCtx = document.getElementById('communityChart').getContext('2d');
    new Chart(communityCtx, {
        type: 'doughnut',
        data: {
            labels: ['Urban', 'Rural', 'Remote'],
            datasets: [{
                data: [30, 45, 25],
                backgroundColor: ['#C15B5B', '#E17777', '#F19999']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    initProgressRings();
    initGauge();
});

function initProgressRings() {
    const circles = document.querySelectorAll('.progress-ring__circle');
    const stats = document.querySelectorAll('.counter');
    
    stats.forEach((stat, index) => {
        const target = stat.getAttribute('data-target');
        const circle = circles[index];
        const circumference = circle.getTotalLength();
        
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;
        
        const percentage = (target <= 100) ? target : (target / 10);
        const offset = circumference - (percentage / 100 * circumference);
        
        setTimeout(() => {
            circle.style.strokeDashoffset = offset;
        }, 100);
    });
}

function initGauge() {
    const gauge = document.querySelector('.gauge');
    if (gauge) {
        // Reset to starting position
        gauge.classList.remove('animate');
        const needle = gauge.querySelector('.gauge-needle');
        if (needle) {
            needle.style.transform = 'rotate(-90deg)'; // Ensure starting at 0%
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add small delay for better visual effect
                    setTimeout(() => {
                        gauge.classList.add('animate');
                    }, 300);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(gauge);
    }
} 