// Ensure newsletter form submission works
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        console.log('Subscription email:', email);
        alert('Thanks for subscribing!');
        this.reset();
    });
}

// Video Selection
window.addEventListener("DOMContentLoaded", () => {
    const mainVideoIframe = document.getElementById("featured-video-iframe");
    const videoCards = document.querySelectorAll(".video-card");

    videoCards.forEach(card => {
        card.addEventListener("click", () => {
            const videoId = card.getAttribute("data-video-id");
            if (videoId) {
                mainVideoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            }
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Dynamic episode loading
const episodes = [
    { title: 'Episode 1', description: 'Discussion on current events.', link: 'episode1.html' },
    { title: 'Episode 2', description: 'Deep dive into finance.', link: 'episode2.html' },
    { title: 'Episode 3', description: 'Debate on technology trends.', link: 'episode3.html' }
];

const episodeGrid = document.querySelector('.episode-grid');
if (episodeGrid) {
    episodes.forEach(episode => {
        const card = document.createElement('div');
        card.className = 'episode-card';
        card.innerHTML = `
            <h3>${episode.title}</h3>
            <p>${episode.description}</p>
            <a href="${episode.link}" class="btn">Watch Now</a>
        `;
        episodeGrid.appendChild(card);
    });
}

// Carousel Navigation
const carouselTrack = document.querySelector(".carousel-track");
const prevButton = document.querySelector(".carousel-button.prev");
const nextButton = document.querySelector(".carousel-button.next");

if (prevButton && nextButton && carouselTrack) {
    prevButton.addEventListener("click", () => {
        carouselTrack.scrollBy({ left: -300, behavior: "smooth" });
    });

    nextButton.addEventListener("click", () => {
        carouselTrack.scrollBy({ left: 300, behavior: "smooth" });
    });
}