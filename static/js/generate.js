function generateLink() {
    event.preventDefault();

    let name = document.body.querySelector('#name').value;
    let email = document.body.querySelector('#email').value;

    if(name && email) {
        let btn = document.body.querySelector('#generate-button');
        btn.style.backgroundColor = '#FA9E8C';
        btn.innerHTML = 'msg.codes/y1Dz1g';
    } else {
        alert('not works');
    }
}