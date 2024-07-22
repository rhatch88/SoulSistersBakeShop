const contactForm = document.querySelector('.contact-form');
let userName = document.getElementById('name');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let message = document.getElementById('message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let formData = {
        name: userName.value,
        email: email.value,
        phone: phone.value,
        message: message.value
    };

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            if (response.message === 'success') {
                alert('Email sent');
                userName.value = '';
                email.value = '';
                phone.value = '';
                message.value = '';
            } else {
                alert('Oops! Something went wrong.');
            }
        } else {
            alert('Oops! Something went wrong.');
        }
    };

    xhr.send(JSON.stringify(formData));
});
