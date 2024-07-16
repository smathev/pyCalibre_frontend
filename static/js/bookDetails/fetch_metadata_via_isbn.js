// fetch_metadata_via_isbn.js

$(document).ready(function() {
    var id = window.appData.id;
    adjustDescriptionHeight();
$('#fetch-isbn-metadata').click(function() {
    var isbn = $('#book-isbn').val();
    if (!isbn) {
        alert('Please enter an ISBN number.');
        return;
    }
    $.ajax({
        url: '/fetch_metadata_via_ISNB/' + isbn,
        method: 'POST',
        contentType: 'application/json',
        success: function(metadata) {
            if (metadata.error) {
                alert('Error: ' + metadata.error);
            } else {
                populateMetadataModal(metadata);
                $('#metadata-modal').modal('show');  // Show the modal
            }
        },
        error: function() {
            alert('Failed to fetch ISBN metadata.');
        }
    });
});

    // Function to adjust the description input height
    function adjustDescriptionHeight() {
        var lineHeight = 20; // Adjust this based on your CSS
        var numberOfLines = 10;
        $('#metadata-description').height(lineHeight * numberOfLines);
    }

$('#save-isbn-metadata-button').click(function() {
    var titleChecked = $('#metadata-title-checkbox').prop('checked');
    var authorChecked = $('#metadata-author-checkbox').prop('checked');
    var genreChecked = $('#metadata-genre-checkbox').prop('checked');
    var descriptionChecked = $('#metadata-description-checkbox').prop('checked');
    var isbnChecked = $('#metadata-isbn-checkbox').prop('checked');

    var data = {};

    // Check if input fields are empty before adding them to the data object
    if (titleChecked) {
        var titleValue = $('#metadata-title').val().trim();
        if (titleValue === '') {
            alert('Please enter a title.');
            return;
        }
        data.title = titleValue;
    }
    if (authorChecked) {
        var authorValue = $('#metadata-author').val().trim();
        if (authorValue === '') {
            alert('Please enter an author.');
            return;
        }
        data.author = authorValue;
    }
    if (genreChecked) {
        var genreValue = $('#metadata-genre').val().trim();
        if (genreValue === '') {
            alert('Please enter a genre.');
            return;
        }
        data.genre = genreValue;
    }
    if (descriptionChecked) {
        var descriptionValue = $('#metadata-description').val().trim();
        if (descriptionValue === '') {
            alert('Please enter a description.');
            return;
        }
        data.description = descriptionValue;
    }
    if (isbnChecked) {
        var isbnValue = $('#metadata-isbn').val().trim();
        if (isbnValue === '') {
            alert('Please enter an ISBN.');
            return;
        }
        data.isbn = isbnValue;
    }

    // Check if the data object is empty
    if (Object.keys(data).length === 0) {
        console.log('No data to save.');
        return; // Exit the function if no data to save
    }

    console.log(data);

    $.ajax({
        url: '/save_book_details/' + id,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(response) {
            BookApp.fetchBookDetails(id);
            console.log('Saved metadata details.');
        },
        error: function() {
            console.log('Failed to save metadata details.');
        }
    });
});

function populateMetadataModal(metadata) {
    $('#existing-title').text($('#book-title').val() || '');
    $('#existing-author').text($('#book-author').val() || '');
    $('#existing-genre').text($('#book-genre').val() || '');
    $('#existing-description').text($('#book-description').val() || '');
    $('#existing-isbn').text($('#book-isbn').val() || '');
    

    // Populate the metadata fields
    $('#metadata-title').val(metadata.Title || '');
    $('#metadata-author').val(metadata.Authors ? metadata.Authors.join(', ') : '');
    $('#metadata-genre').val(metadata.Genre || '');
    $('#metadata-description').val(metadata.Description || '');
    $('#metadata-isbn').val(metadata.Isbn || '');
};
});
