// bookManager.js

let bookData = [];
let currentSort = 'title'; // Default sort by title
let currentDirection = 'asc';

function fetchBooks(callback) {
    $.ajax({
        url: '/serve_books',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            bookData = data;
            callback(data);
        },
        error: function (xhr, status, error) {
            console.error('Error fetching book data:', error);
        }
    });
}

function lazyLoadBookCovers() {
    console.log("lazyLoadBookCovers function called");
    const observerOptions = {
        root: null,
        rootMargin: '400px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        console.log('Observer triggered', entries.length);
        entries.forEach(entry => {
            console.log('Entry:', entry);
            if (entry.isIntersecting) {
                const bookUuid = entry.target.dataset.uuid;
                console.log('Book UUID:', bookUuid);
                
                // Create image element and set source
                const imgElement = document.createElement('img');
                imgElement.src = `/book_cover/${bookUuid}`;
                imgElement.classList.add('d-none');
                
                // Replace skeleton loader with the image
                entry.target.appendChild(imgElement);

                // Remove skeleton loader
                entry.target.querySelector('.skeleton-loader').remove();
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    setTimeout(() => {
        document.querySelectorAll('.embed-responsive').forEach(card => {
            observer.observe(card);
        });
        console.log("Started observing embed-responsive elements");
    }, 150);  // 150ms delay
}



function updateBookList(data) {
    const bookList = $('#book-list');
    bookList.empty();

    data.forEach(function (book) {
        const cardHtml = `
        <div class="col-6 col-sm-4 col-md-3 col-lg-2 mb-4">
        <div class="card h-100 position-relative">
            <a href="/book_details/${book.uuid}" class="d-block h-100">
                <div class="embed-responsive embed-responsive-4by6 bg-light position-relative" data-uuid="${book.uuid}">
                    <div class="skeleton-loader position-absolute top-0 start-0 end-0"></div>
                </div>
                <div class="card-body position-absolute bottom-0 start-0 end-0 text-center" style="background-color: rgba(0, 0, 0, 0.7);">
                    <h6 class="card-title text-sm text-light">${book.title}</h6>
                    <p class="card-text text-sm text-light">by ${book.author}</p>
                </div>
            </a>
        </div>
    </div>
        `;
        bookList.append(cardHtml);

        $('.card-body').hide();

        $('.card').hover(
            function() {
                $(this).find('.card-body').fadeIn();
            }, 
            function() {
                $(this).find('.card-body').fadeOut();
            }
        );
    });
}

function sortAndRenderBooks() {
    const sortedData = sortBooks(bookData.slice(), currentSort, currentDirection);
    updateBookList(sortedData);
    lazyLoadBookCovers();
}

function updateSort(sortCriteria, newDirection) {
    currentSort = sortCriteria;
    currentDirection = newDirection;
    sortAndRenderBooks();
}

export { fetchBooks, sortAndRenderBooks, updateSort };
