// fetchBooks.js
function fetchBooks(callback) {
    $.ajax({
        url: 'http://127.0.0.1:8000/serve_books',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            callback(data);
        },
        error: function (xhr, status, error) {
            console.error('Error fetching book data:', error);
        }
    });
}
