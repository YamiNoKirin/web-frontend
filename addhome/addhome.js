function submitHome() {
    let firstName = document.getElementById('fname').value;
    let lastName = document.getElementById('lname').value;
    let address = document.getElementById('addr').value;
    let home = {
      'address': address,
      'firstName': firstName,
      'lastName': lastName
    };

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert('Your home has been submitted!');
        }
    }

    xhttp.open('POST', '/api/homes', true);
    xhttp.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhttp.send(JSON.stringify(home));
}