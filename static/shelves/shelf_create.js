// Function to create a new shelf
function createNewShelf(shelfName) {
    $.ajax({
        url: '/create_shelf',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ shelf_name: shelfName }),
        success: function(response) {
            if (response.shelf_uuid) {
                console.log('Shelf created:', response.message);
                fetchShelves();  // Refresh the shelf list
            } else {
                console.error('Error creating shelf:', response.error);
                alert('Failed to create shelf: ' + response.error);  // Display error message to the user
            }
        },
        error: function(xhr, status, error) {
            console.error('Error creating shelf:', error);
            try {
                var responseJson = JSON.parse(xhr.responseText);
                alert('Failed to create shelf: ' + responseJson.error);  // Display error message to the user
            } catch (e) {
                alert('Failed to create shelf: ' + xhr.responseText);  // Display raw response if parsing fails
            }
        }
    });
}

// Function to handle input field key press event
function handleKeyPress(event) {
    if (event.key === 'Enter') { // Check if the pressed key is 'Enter'
        var inputValue = event.target.value.trim(); // Get the value of the input field and remove leading/trailing whitespace
        if (inputValue !== '') { // Check if the input value is not empty
            createNewShelf(inputValue); // Call the createNewShelf function with the input value
            event.target.value = ''; // Clear the input field after creating the shelf
        }
    }
}

// Attach event listener to the input field for key press events
$('#search-shelves').on('keypress', handleKeyPress);

