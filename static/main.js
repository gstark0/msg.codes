function generateLink() {
    event.preventDefault();

    let name = document.body.querySelector('#name');
    let email = document.body.querySelector('#email');

    if(name.value && email.value && email.value.includes('@')) {
        let btn = document.body.querySelector('#generate-button');
        let generated_link_btn = document.body.querySelector('#generated-link');

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
            btn.style.display = 'none';
            generated_link_btn.style.display = 'block';
            generated_link_btn.value = 'msg.gstark.me/' + resp.link_id;
            btn.onclick = function() {event.preventDefault();};
        });

    } else {
        if(!email.value.incldues('@')) {
            alert('Email is incorrect!');
        } else {
            alert('All fields are required!');
        }
    }
}

function copyLink() {
    let linkInput = document.body.querySelector('#generated-link');
    linkInput.select();
    linkInput.setSelectionRange(0, 99999);
    document.execCommand('copy');

    let tooltip = document.body.querySelector('#link-tooltip');
    tooltip.innerHTML = 'Copied';
}

function sendMessage() {
    event.preventDefault();

    let name = document.body.querySelector('#name');
    let email = document.body.querySelector('#email');
    let message = document.body.querySelector('#message');

    if(name.value && email.value && message.value && email.value.includes('@')) {
        let btn = document.body.querySelector('#send-button');

        // Change button's background color
        btn.style.backgroundColor = '#FA9E8C';
        // Change button's text to a new link
        btn.innerHTML = 'Message has been delivered!';

        // Disable inputs
        name.disabled = true;
        email.disabled = true;
        message.disabled = true;

        grecaptcha.execute('6Ld44cMUAAAAALUTNRNGAUqagitYS5MQPqZ49Lb4', {action: 'homepage'}).then(function(token) {
            fetch('/' + linkId + '/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name: name.value, email: email.value, message: message.value, captcha: token})
            })
            .then(resp => resp.json())
            .then(resp => {
                btn.onclick = function() {event.preventDefault();};
            });
        });
    } else {
        if(message.value.length < 10) {
            alert('Your message must have at least 10 characters!')
        } else if(!email.value.includes('@')) {
            alert('Email is incorrect!')
         } else {
            alert('All fields are required!')
         }
    }
}