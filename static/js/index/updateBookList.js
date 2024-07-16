function updateBookList(data) {
    var bookList = $('#book-list');
    bookList.empty();

    data.forEach(function (book) {
        // Join the authors array into a single string separated by commas
        var authorsList = book.authors.join(', ');

        var cardHtml = `
            <div class="col-6 col-sm-4 col-md-3 col-lg-2 mb-4">
                <div class="card h-100 position-relative">
                    <a href="/book_details/${book.id}" class="d-block h-100">
                        <img src="/static/loading_cover.jpg" data-uuid="${book.id}" class="card-img-top img-fluid h-100 lazy-load" alt="${book.title} Cover">
                        <div class="card-body position-absolute bottom-0 start-0 end-0 text-center" style="background-color: rgba(0, 0, 0, 0.7);">
                            <h6 class="card-title text-sm text-light">${book.title}</h6>
                            <p class="card-text text-sm text-light">by ${authorsList}</p>
                        </div>
                    </a>
                </div>
            </div>
        `;
        bookList.append(cardHtml);

        // Hide the card-body initially
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
