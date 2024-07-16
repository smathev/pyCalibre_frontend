// fetch_shelves.js
var id = window.appData.id;

var book_id = window.appData.bookId;

function fetchShelves() {
    $.ajax({
        url: 'http://127.0.0.1:8000/shelves/fetch_shelves_and_books_on_shelves',
        method: 'GET',
        success: function(data) {
            $('#shelves-list').empty();
            data.forEach(function(shelf) {
                // Check if the book is already on this shelf
                var isBookOnShelf = shelf.books.some(function(book) {
                    return book.id === book_id;
                });

                // Create a link for each shelf name
                var link = $('<a>', {
                    href: '#',
                    text: shelf.shelf_name,
                    click: function(event) {
                        event.preventDefault(); // Prevent the default action of the link
                        addOrRemoveBookFromShelf(shelf.id, book_id, isBookOnShelf);
                    }
                });

                // Create the symbol based on whether the book is on the shelf or not
                var symbol = isBookOnShelf ? '✘' : '+';

                // Append the symbol and the link to the list
                $('#shelves-list').append($('<li>').append(symbol).append(' ').append(link));
            });
        },
        error: function(xhr, status, error) {
            console.error('Error fetching shelves:', error);
        }
    });
}

function addOrRemoveBookFromShelf(shelfId, bookId, isBookOnShelf) {
    $.ajax({
        url: isBookOnShelf ? 'http://127.0.0.1:8000/shelves/remove_book_from_shelf/' + shelfId : 'http://127.0.0.1:8000/shelves/add_book_to_shelf/' + shelfId,
        method: 'POST',
        contentType: 'application/json', // Set the content type to JSON
        data: JSON.stringify({
            book_id: bookId // Send book_id in the request body as JSON
        }),
        success: function(response) {
            fetchShelves(); // Refresh the shelf list after adding/removing the book 
        },
        error: function(xhr, status, error) {
            console.error('Error adding/removing book from shelf:', error);
        }        
    });
}

$(document).ready(function() {
    fetchShelves(); // Call the function when the document is ready
});
