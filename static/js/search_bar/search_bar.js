document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    searchInput.addEventListener('input', function() {
        const query = searchInput.value.trim();

        // Clear search results if query is empty or less than 3 characters
        if (query.length < 3) {
            searchResults.innerHTML = '';
            return;
        }

        console.log("search has started with query: ", query);
        fetch(`http://127.0.0.1:8000/search/search_for_books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Include other headers as necessary
            },
            body: JSON.stringify({ search_query: query })
        })
        .then(response => {
            // Check if response is successful
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Parse response as JSON
            return response.json();
        })
        .then(data => {
            console.log('Search results:', data);
            // Check if data.results is an array
            if (!Array.isArray(data.results)) {
                throw new Error('Response data.results is not an array');
            }
            let html = '';
            data.results.forEach(item => {
                const imageUrl = `http://127.0.0.1:8000/book_cover/${item.id}`;
                console.log("imageUrl: ", imageUrl);
                html += `
                <div class="container-fluid mb-3">
                    <a href="/book_details/${item.id}" class="search-result-item">
                        <div class="row align-items-center">
                            <div class="col-auto">
                                <img src="${imageUrl}" alt="Book Cover" class="img-fluid" style="max-height: 3.25rem;">
                            </div>
                            <div class="col">
                                ${item.title} - ${item.authors}
                            </div>
                        </div>
                    </a>
                </div>
                `;
            });
            searchResults.innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
        });
    });
});
