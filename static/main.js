function generateLink() {
    event.preventDefault();

    let name = document.body.querySelector('#name');
    let email = document.body.querySelector('#email');

    if(name.value && email.value) {
        let btn = document.body.querySelector('#generate-button');

        // Change button's background color
        btn.style.backgroundColor = '#FA9E8C';

        // Disable inputs
        name.disabled = true;
        email.disabled = true;

        // Generate new link
        fetch('/link', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name.value, email: email.value})
        })
        .then(resp => resp.json())
        .then(resp => {
            // Change button's text to a new link
            btn.innerHTML = 'msg.codes/' + resp.link_id;
            btn.onclick = function() {event.preventDefault();};
        });

    } else {
        alert('not works');
    }
}

function sendMessage() {
    event.preventDefault();

    let name = document.body.querySelector('#name');
    let email = document.body.querySelector('#email');
    let message = document.body.querySelector('#message');

    if(name.value && email.value && message.value) {
        let btn = document.body.querySelector('#send-button');

        // Change button's background color
        btn.style.backgroundColor = '#FA9E8C';

        // Disable inputs
        name.disabled = true;
        email.disabled = true;
        message.disabled = true;

        fetch('/' + linkId + '/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name.value, email: email.value, message: message.vaue})
        })
        .then(resp => resp.json())
        .then(resp => {
            // Change button's text to a new link
            btn.innerHTML = 'Message sent!';
            btn.onclick = function() {event.preventDefault();};
            alert('Your message has been sent!')
        });
    } else {

    }
}