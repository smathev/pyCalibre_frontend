$(document).ready(function() {
    const searchInput = $('#book-series-input-field');
    const suggestionsList = $('#series-suggestions');
    let selectedSuggestionIndex = -1; // Initialize the selected suggestion index

    // Function to fetch suggestions based on query
    function fetchSuggestions(query) {
        // Make AJAX request to get suggestions based on query
        $.ajax({
            url: 'http://127.0.0.1:8000/series/search_for_series',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ search_query: query }),
            success: function(response) {
                // Clear previous suggestions
                suggestionsList.empty();
                console.log('Search results:', response);
                // Check if response is an array
                if (!Array.isArray(response)) {
                    console.error('Response data is not an array');
                    return;
                }
                // Show suggestions in the suggestionsList
                if (response.length > 0) {
                    response.forEach(function(item, index) {
                        // Append each suggestion to the suggestionsList
                        suggestionsList.append('<li class="list-group-item">' + item.series + '</li>');
                    });
                    suggestionsList.show(); // Show the suggestions list
                    selectedSuggestionIndex = -1; // Reset selected suggestion index
                    // Focus on the suggestions list
                    suggestionsList.focus();
                } else {
                    suggestionsList.hide(); // Hide the suggestions list if no suggestions
                }
            },
            error: function(xhr, status, error) {
                console.error('Error searching series:', error);
            }
        });
    }

    // Event listener for input changes
    searchInput.on('input', function() {
        const query = this.value.trim();
        if (query.length < 3) {
            suggestionsList.innerHTML = '';
            return;
        }
        fetchSuggestions(query);
    });

    // Event listener for clicking on a suggestion
    suggestionsList.on('click', 'li', function() {
        searchInput.val($(this).text());
        suggestionsList.hide(); // Hide the suggestions list
        selectedSuggestionIndex = -1; // Reset selected suggestion index
    });

});
