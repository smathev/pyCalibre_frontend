$(document).ready(function() {
    var id = window.appData.id;

    // Function to show book details and hide spinner
    function showBookDetails() {
        $('#spinner-container').addClass('d-none'); // Hide the spinner
        $('#book-details').removeClass('d-none');  // Show the book details
    }

    // Function to adjust the description input height
    function adjustDescriptionHeight() {
        var lineHeight = 20; // Adjust this based on your CSS
        var numberOfLines = 6;
        $('#book-description').height(lineHeight * numberOfLines);
    }

    // Function to fetch book details
    BookApp.fetchBookDetails = function(id) {
        
        $.ajax({
            url: 'http://127.0.0.1:8000/fetch_book_details_by_id/' + id,
            method: 'GET',
            success: function(response) {
                // Storing additional book details globally
                if (response.id) {
                    window.appData.bookId = response.id; // Save the book id globally for later use;
                }
                if (response.title) {
                    $('#book-title-display').text(response.title);
                    $('#book-title').val(response.title);
                }
                // if (response.authors) {
                //     var authorsList = response.authors.join(', '); // Join the authors array into a string
                //     $('#book-author-display').text(authorsList);
                //     $('#book-author').val(authorsList);
                // }
                if (response.authors && response.authors.length > 0) {
                    // Map over the authors array and join the names into a string
                    var authorsList = response.authors.map(function(author) {
                        return author.author_name; // Extract just the name from each author object
                    }).join(', ');
                    $('#book-author-display').text(authorsList);
                    window.appData.authors = response.authors;  // Store the full authors data for later use
                } else {
                    $('#authors-container').text('No authors listed.');
                }
                if (response.isbn) {
                    $('#book-isbn-display').text(response.isbn);
                    $('#book-isbn').val(response.isbn);
                }
                if (response.genre) {
                    $('#book-genre-display').text(response.genre);
                    $('#book-genre').val(response.genre);
                }
                if (response.description) {
                    $('#book-description-display').html(response.description.replace(/\n/g, '<br>')); // Replace newlines with <br> for display
                    $('#book-description').val(response.description); // Textarea takes the value as is
                }
                if (response.series_info && response.series_info.length > 0) {
                    var seriesTable = $('<table>').addClass('table');
                    var seriesThead = $('<thead>').append('<tr><th>Title</th><th>Number in Series</th><th class="action-column">Action</th></tr>');
                    
                    seriesTable.append(seriesThead);

                    var seriesTbody = $('<tbody>');
                    response.series_info.forEach(function(series) {
                        var seriesRow = $('<tr>')
                            .append($('<td>').text(series.series_title))
                            .append($('<td>').text(series.number_in_series))
                            .append($('<td>').html('<button class="btn btn-danger btn-sm delete-series-btn d-none">Delete</button>').addClass('action-column'));
                        seriesTbody.append(seriesRow);
                    });
                    seriesTable.append(seriesTbody);

                    // Clear any existing series information and append new
                    $('#series-container').empty().append(seriesTable);
                } else {
                    //$('#series-container').empty().append($('<p>').text('No series information available.'));
                }
                if (response.relative_base_path) {
                    var coverUrl = "http://127.0.0.1:8000/book_cover/" + response.id;
                    console.log("coverURL: ", coverUrl);
                    // Bind the load event to the image inside the image-container
                    $('#image-container img').on('load', function() {
                        showBookDetails();  // Show book details after image is loaded
                        adjustDescriptionHeight(); // Adjust the height of the description field
                    }).attr('src', coverUrl); // Set the image source for the image inside the image-container

                    // Show the image container
                    $('#image-container').show();
                }

                // Add click event listener to the cover image link
                $('#cover-trigger').click(function(e) {
                    e.preventDefault();
                    var currentImageUrl = $('#book-cover').attr('src');
                    $('#current-book-cover').attr('src', currentImageUrl);
                    $('#new-book-cover').attr('src', '').addClass('d-none');  // Reset new image
                    $('#save-image-button').addClass('disabled').attr('disabled', 'disabled');  // Disable save button
                    if (dropzone) {
                        dropzone.removeAllFiles(true);  // Remove all files from dropzone
                    }
                    $('#image-upload-modal').modal('show');
                });

                // Hide the action column if not in edit mode
                if (!$('#edit-button').hasClass('d-none')) {
                    $('.action-column').addClass('d-none');
                }
            },
            error: function() {
                console.log('Failed to fetch book details.');
            },
            complete: function() {
                // Hide placeholders
            }
        });
    };

    // Initialize
    BookApp.fetchBookDetails(id);

    console.log('bookDetails.js loaded');
});