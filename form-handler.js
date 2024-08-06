/*$('form').on('submit', function(e) {
    e.preventDefault();

    const email = $('#email').val().trim();
    const subject = $('#subject').val().trim();
    const text = $('#text').val().trim();

    const data = {
        email,
        subject,
        text
    };

    $.ajax({
        url: '/email',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(response) {
            console.log('Server received our data');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error:', textStatus, errorThrown);
        }
    });
});
