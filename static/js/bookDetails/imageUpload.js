// imageUpload.js

var dropzone

$(document).ready(function() {
    var id = window.appData.id;
    // Check if Dropzone is already attached
    if (Dropzone.instances.length > 0) {
        // Remove existing Dropzone instances
        Dropzone.instances.forEach(function(instance) {
            instance.destroy();
        });
    }
    // Initialize Dropzone
    var dropzone = new Dropzone("#image-dropzone-container", {
        url: '/upload_image_temp/' + id,
        paramName: 'file',
        acceptedFiles: 'image/*',
        addRemoveLinks: false,
        autoProcessQueue: true,
        init: function() {
            this.on("success", function(file, response) {
                if (response.success) {
                    var timestamp = new Date().getTime();
                    var imageUrl = '/temp_image/' + response.tempPath + '?timestamp=' + timestamp;
                    $('#new-book-cover').attr('src', imageUrl);
                    this.removeFile(file);
                    $('#new-book-cover').removeClass('d-none');
                    $('#save-image-button').removeClass('disabled').removeAttr('disabled');
                } else {
                    console.error('Error uploading image:', response.error);
                }
            });
            this.on("error", function(file, errorMessage) {
                console.error('Error uploading image:', errorMessage);
                this.removeFile(file);
            });
            this.on("addedfile", function(file) {
                if (this.files.length > 1) {
                    this.removeFile(this.files[0]);
                }
                if (this.files.length > 0) {
                    $('#save-image-button').removeClass('disabled').removeAttr('disabled');
                } else {
                    $('#save-image-button').addClass('disabled').attr('disabled', 'disabled');
                }
            });
        }
    });

    // Remove temporary image on modal close
    $('#image-upload-modal').on('hidden.bs.modal', function () {
      $('#save-image-button').addClass('disabled').attr('disabled', 'disabled');
        $.ajax({
            url: '/remove_temp_image/' + id,
            method: 'POST',
            success: function(response) {
                if (!response.success) {
                    console.error('Failed to remove image:', response.error);
                }
            },
            error: function(xhr, status, error) {
                console.error('Request failed:', error);
            }
        });
    });


    // Save image permanently
    $('#save-image-button').click(function() {
        $.ajax({
            url: '/upload_image_permanent/' + id,
            method: 'POST',
            success: function(response) {
                if (response.success) {
                    var currentImageUrl = $('#book-cover').attr('src');
                    $('#current-book-cover').attr('src', currentImageUrl);
                    $('#image-upload-modal').modal('hide');
                    location.reload();
                } else {
                    console.error('Failed to save image permanently:', response.error);
                }
            },
            error: function(xhr, status, error) {
                console.error('Request failed:', error);
            }
        });
    });
        // Function to enable or disable the "Save Changes" button
        function toggleSaveButton() {
            var anyCheckboxChecked = $('input[type="checkbox"]:checked').length > 0;
            $('#save-isbn-metadata-button').prop('disabled', !anyCheckboxChecked);
        }
    
        // Call the function on page load
        toggleSaveButton();
    
        // Bind the function to the change event of the checkboxes
        $('input[type="checkbox"]').change(function() {
            toggleSaveButton();
        });

    console.log('imageUpload.js loaded');
});
