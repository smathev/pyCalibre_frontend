// lazyLoading.js

function lazyLoadBookCovers() {
    console.log("lazyLoadBookCovers function called");
    const observerOptions = {
        root: null,
        rootMargin: '700px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        console.log('Observer triggered', entries.length); // Check if the observer is triggered
        entries.forEach(entry => {
            console.log('Entry:', entry); // Log entry details
            if (entry.isIntersecting) {
                const bookUuid = entry.target.dataset.uuid;
                var coverUrl = "http://127.0.0.1:8000/book_cover/" + bookUuid;
                entry.target.src = coverUrl;  // Use entry.target directly
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Adding a delay before starting to observe
    setTimeout(() => {
        document.querySelectorAll('.lazy-load').forEach(card => {
            observer.observe(card);
        });
        console.log("Started observing lazy-load elements");
    });  // 1-second delay
}
