function deleteHome(homeKey) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(`Home ${homeKey} deleted!`);
            location.reload();
            // document.body.removeChild(document.body.childNodes[childIndex])
        }
    }

    xhttp.open('DELETE', `/api/homes/${homeKey}`, true);
    xhttp.send();
}

function showHomes(homeSet, orderArray) {
    for (let homeKey of orderArray) {
        let home = homeSet[homeKey];
        let homeElem = document.createElement('div');

        let imgElem = document.createElement('img');
        imgElem.src = '/res/house.jpg';
        // imgElem.width = '30%';
        homeElem.appendChild(imgElem);

        let addrElem = document.createElement('h2');
        addrElem.innerHTML = home.address;
        homeElem.appendChild(addrElem);

        let nameElem = document.createElement('h4');
        nameElem.innerHTML = 'Listed by: ' + home.firstName + ' ' + home.lastName;
        homeElem.appendChild(nameElem);

        let deleteElem = document.createElement('button');
        deleteElem.innerHTML = 'Delete';
        deleteElem.onclick = function() {
            deleteHome(homeKey);
        }

        deleteElem.className = 'delete';
        homeElem.appendChild(deleteElem);

        let inquireElem = document.createElement('a');
        inquireElem.innerHTML = 'Inquire'
        inquireElem.href = '../contact/contact.html';
        inquireElem.className = 'inquire';
        homeElem.appendChild(inquireElem);

        homeElem.className = 'rent-item';
        document.body.appendChild(homeElem);
    }
}

function getOrderArray(homeSet, order) {
    let orderArray = [];
    for (let homeKey in homeSet) {
        orderArray.push(homeKey);
    }

    if (order == 0) { // Asc name
        orderArray.sort(function(a, b) {
            if (homeSet[a].lastName < homeSet[b].lastName) {
                return -1;
            }
            else if (homeSet[a].lastName > homeSet[b].lastName) {
                return 1;
            }
            else if (homeSet[a].firstName < homeSet[b].firstName) {
                return -1;
            }
            else if (homeSet[a].firstName > homeSet[b].firstName) {
                return 1;
            }
            else {
                return 0;
            }
        });

        console.log(orderArray);
    }
    else if (order == 1) { // Desc name
        orderArray.sort(function(a, b) {
            if (homeSet[a].lastName < homeSet[b].lastName) {
                return 1;
            }
            else if (homeSet[a].lastName > homeSet[b].lastName) {
                return -1;
            }
            else if (homeSet[a].firstName < homeSet[b].firstName) {
                return 1;
            }
            else if (homeSet[a].firstName > homeSet[b].firstName) {
                return -1;
            }
            else {
                return 0;
            }
        });
    }
    else if (order == 2) { // Asc addr
        orderArray.sort(function(a, b) {
            if (homeSet[a].address < homeSet[b].address) {
                return -1;
            }
            else if (homeSet[a].address > homeSet[b].address) {
                return 1;
            }
            else {
                return 0;
            }
        });
    }
    else if (order == 3) { // Desc addr
        orderArray.sort(function(a, b) {
            if (homeSet[a].address < homeSet[b].address) {
                return 1;
            }
            else if (homeSet[a].address > homeSet[b].address) {
                return -1;
            }
            else {
                return 0;
            }
        });
    }

    return orderArray;
}   

function getHomes(order) {
    console.log(order);
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log('Homes retrieved!');
            let homeSet = JSON.parse(xhttp.responseText).data;
            let orderArray = getOrderArray(homeSet, order);
            showHomes(homeSet, orderArray);
        }
    }

    xhttp.open('GET', '/api/homes', true);
    xhttp.send();
}

function getOrderVal() {
    let sortVal = document.getElementById('sort-sel').value;
    if (sortVal == 'asc-name') {
        return 0;
    }
    else if (sortVal == 'desc-name') {
        return 1;
    }
    else if (sortVal == 'asc-addr') {
        return 2;
    }
    else {
        return 3;
    }
}

window.addEventListener('load', function() {
    // order == 0 - asc name
    //          1 - desc name
    //          2 - asc address
    //          3 - desc address
    let order = getOrderVal();
    getHomes(order);
});