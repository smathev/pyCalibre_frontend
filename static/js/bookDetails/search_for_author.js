document.addEventListener('DOMContentLoaded', function() {
    const authorInput = document.getElementById('book-author-input');
    const authorSuggestionsContainer = document.getElementById('author-suggestions-container');

    if (authorInput) {
        authorInput.addEventListener('input', function() {
            const authorQuery = authorInput.value.trim();

            // Clear author suggestions if query is empty or less than 3 characters
            if (authorQuery.length < 3) {
                authorSuggestionsContainer.innerHTML = '';
                return;
            }

            console.log("Search for author has started: ", authorQuery);

            fetch(`http://127.0.0.1:8000/search/search_for_authors?query=${authorQuery}`)
                .then(response => response.json())
                .then(data => {
                    let html = '';
                    data.forEach(author => {
                        html += `
                        <div class="container-fluid">
                            <a href="/author_details/${author.uuid}" class="search-result-item">
                                <div class="row align-items-center">
                                    <div class="col-auto">
                                        <img src="/author_photo/${author.uuid}" alt="Author Photo" class="img-fluid" style="max-height: 3.25rem;">
                                    </div>
                                    <div class="col">
                                        ${author.name}
                                    </div>
                                </div>
                            </a>
                        </div>
                        `;
                    });
                    authorSuggestionsContainer.innerHTML = html;
                })
                .catch(error => {
                    console.error('Error fetching author suggestions:', error);
                });
        });
    } else {
        console.log("Author input element not found.");
    }
});