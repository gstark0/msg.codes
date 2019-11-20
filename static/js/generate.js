function generateLink() {
    event.preventDefault();

    let name = document.body.querySelector('#name').value;
    let email = document.body.querySelector('#email').value;

    if(name && email) {
        let btn = document.body.querySelector('#generate-button');
        btn.style.backgroundColor = '#FA9E8C';

        // Generate new link
        fetch('/link', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: name, email: email})
        }).then(resp => resp.json())
        .then(resp => {
            // Change button's text to a new link
            console.log(resp);
            btn.innerHTML = 'msg.codes/' + resp.link_id;
            btn.onclick = function() {event.preventDefault();};
        });
    } else {
        alert('not works');
    }
}