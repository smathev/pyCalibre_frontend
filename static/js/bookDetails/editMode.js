// editMode.js

$(document).ready(function() {
    const searchInput = $('#book-series-input-field');
    const suggestionsList = $('#series-suggestions');
    var id = window.appData.id;
        // Function to clear input and suggestions
        function clearInputAndSuggestions() {
            searchInput.val(''); // Clear the input field
            suggestionsList.empty().hide(); // Clear and hide the suggestions list
        }
        $('#edit-button').click(function() {
            // Toggle display and input fields
            $('.card-title > input, .card-subtitle > input, .card-text > input, .card-text > textarea').toggleClass('d-none');
            $('.card-text-input-header > input').toggleClass('d-none');
            $('.card-title span, .card-subtitle span, .card-text span').toggleClass('d-none');
            $('.card-text-input-header').toggleClass('d-none');
            $('.btn').toggleClass('d-none');
            $('.action-column').toggleClass('d-none');
    
            // Check if entering edit mode
            if (!$('.action-column').hasClass('d-none')) {
                // Construct authors table if it doesn't exist
                if ($('#authors-table-container').find('table').length === 0) {
                    var authorsTable = $('<table>').addClass('table table-striped');
                    var authorsThead = $('<thead>').append('<tr><th>Author</th><th class="action-column">Action</th></tr>');
                    authorsTable.append(authorsThead);
                    var authorsTbody = $('<tbody>');
    
                    window.appData.authors.forEach(function(author) {
                        var authorsRow = $('<tr>')
                            .append($('<td>').text(author.author_name))
                            .append($('<td>').html('<button class="btn btn-danger btn-sm delete-author-btn" data-author-id="'+ author.author_id +'">Delete</button>'));
                        authorsTbody.append(authorsRow);
                    });
                    authorsTable.append(authorsTbody);
                    $('#authors-table-container').empty().append(authorsTable);
                }
            } else {
                // Clear the table when exiting edit mode
                $('#authors-table-container').empty();
            }
        });
    // Save changes
    $('#save-button').click(function() {
        var title = $('#book-title').val();
        //var author = $('#book-author').val();
        var isbn = $('#book-isbn').val();
        var genre = $('#book-genre').val();
        var description = $('#book-description').val();
        var series_titles = $('#book-series-input-field').val();
        var number_in_series = $('#book-number_in_series').val();

        var data = {
            title: title,
            //author: author,
            isbn: isbn,
            genre: genre,
            description: description,
            series_titles: series_titles,          
            number_in_series: number_in_series  
        };

        $.ajax({
            url: `http://127.0.0.1:8000/edit_book/${id}/save_all_details`, // Make sure the port number and base path are correct
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(response) {
                // After successfully saving, fetch the updated details
                BookApp.fetchBookDetails(id);
                location.reload();
            },
            error: function() {
                console.log('Failed to save book details.');
            }
        });

        // Toggle back to display mode
        $('#edit-button').trigger('click');    
        clearInputAndSuggestions();   
    });
    // Handling the deletion of an author
    $(document).on('click', '.delete-author-btn', function() {
        var bookId = window.appData.bookId; // Assuming book ID is stored globally
        var $button = $(this); // Save the button that was clicked
        var authorId = $(this).data('author-id'); // Get the author ID from button data attribute
        console.log('Deleting author:', authorId, 'from book:', bookId)
        
        $.ajax({
            url: 'http://127.0.0.1:8000/edit_book/' + bookId + '/delete_author_from_book/' + authorId,
            method: 'POST',
            success: function(response) {
                // Successfully removed the author, now remove the row
                if (response.status === 'success') {
                    console.log('Author deleted successfully;');
                    $button.closest('tr').remove(); // Use $button to refer to the clicked button in the context
                } else {
                    console.error(response.message);
                    alert('Failed to delete author: ' + response.message);
                }
            },
            error: function(xhr) {
                console.error('Error deleting author.');
                alert('Error deleting author.');
            }
        });
    });
    // Cancel editing
    $('#cancel-button').click(function() {
        location.reload();
        clearInputAndSuggestions();
    });
    console.log('editMode.js loaded');
});
