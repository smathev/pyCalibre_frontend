$(document).ready(function() {
    
    // Load modules in sequence
    loadScripts([
        '/static/js/index/fetchBooks.js',
        '/static/js/index/sortBooks.js',
        '/static/js/index/updateBookList.js',
        '/static/js/index/updateSortButtons.js',
        '/static/js/index/lazyLoading.js'
    ]).then(initializeApp);

    function loadScripts(scriptUrls) {
        const promises = scriptUrls.map(url => {
            return new Promise((resolve, reject) => {
                $.getScript(url)
                    .done(() => {
                        console.log(`${url} loaded successfully`);
                        resolve();
                    })
                    .fail((jqxhr, settings, exception) => {
                        console.error(`Failed to load ${url}:`, exception);
                        reject(exception);
                    });
            });
        });
        return Promise.all(promises);
    }

    function initializeApp() {
        let bookData = [];
        let currentSort = 'title'; // Default sort by title
        let currentDirection = 'asc';

        // Fetch and initialize book data
        fetchAndRenderBooks(function (data) {
            bookData = data;
            sortAndRenderBooks();
            updateSortButtonsAppearance(currentSort, currentDirection);
            lazyLoadBookCovers();
        });

        function fetchAndRenderBooks(callback) {
            fetchBooks(function (data) {
                callback(data);
            });
        }

        function sortAndRenderBooks() {
            const sortedData = sortBooks(bookData.slice(), currentSort, currentDirection);
            updateBookList(sortedData);
            lazyLoadBookCovers();
        }

        // Sorting buttons click event
        $('#sort-author-btn, #sort-title-btn, #sort-date_added-btn, #sort-date_updated-btn').click(function () {
            let sortCriteria = $(this).data('sort');
            let newDirection;
            let defaultSortCriteria = 'title';

            console.log("Clicked button:", sortCriteria); // Debug

            if (sortCriteria === currentSort && currentDirection === 'asc') {
                newDirection = 'desc';
            } else if (sortCriteria == defaultSortCriteria && currentDirection === 'desc') {
                newDirection = 'asc';
            } else if (sortCriteria != currentSort ) {
                newDirection = 'asc';
            } else {
                sortCriteria = defaultSortCriteria;
                newDirection = 'desc';
            }

            currentSort = sortCriteria;
            currentDirection = newDirection;

            sortAndRenderBooks();
            updateSortButtonsAppearance(currentSort, currentDirection);
        });
    }
});
