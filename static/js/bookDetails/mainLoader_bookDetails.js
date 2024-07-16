// JavaScript.js

var BookApp = {};

$(document).ready(function() {
    var id = $('script[data-id]').attr('data-id');  // Retrieve UUID from data- attribute
    console.log('JavaScript.js id:', id);

    // Set uuid in global appData object
    window.appData = {
        id: id
    };

    function loadScript(scriptUrl) {
        return new Promise(function(resolve, reject) {
            $.getScript(scriptUrl, resolve);
        });
    }

    loadScript('/static/js/bookDetails/fetchBookDetails.js')
        .then(function() {
            return loadScript('/static/js/bookDetails/editMode.js');
        })
        .then(function() {
            return loadScript('/static/js/bookDetails/imageUpload.js');
        })
        .then(function() {
            return loadScript('/static/js/bookDetails/fetch_metadata_via_isbn.js');
        })
        .then(function() {
            loadScript('/static/js/bookDetails/fetch_shelves.js');
        })
        .then(function() {
            return loadScript('/static/js/bookDetails/search_for_series.js');
        }) 
        .then(function() {
            BookApp.fetchBookDetails(id);
        })
        .then(function() {
            return loadScript('/static/js/bookDetails/search_for_author.js');
        }); 
});