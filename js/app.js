// focus on search input 
const query = document.getElementById('query');
query.focus();
document.addEventListener('keyup', (e) => {
    if (e.ctrlKey && e.key == '/') {
        query.focus();
    }
});



// load spinner 
const spinner = document.getElementById('spinner');
function spinnerAction(isLoading) {
    if (isLoading) {
        spinner.style.display = 'flex';
    } else {
        spinner.style.display = 'none';
    }
}

// Enter Key search action 
query.addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {
        console.log(query.value);
        loadPhones();
        query.value = '';
        spinnerAction(true);
    }
});


// load phones from api 
function loadPhones() {
    const url = `https://openapi.programming-hero.com/api/phones?search=${query.value}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhones(data.data));
    console.log(url);
}

// No result found 
function empty(isEmpty) {
    const warning = document.querySelector('.empty');
    if (isEmpty) {
        warning.style.display = 'block';
    } else {
        warning.style.display = 'none';
    }
};

// Display phones on the ui 
function displayPhones(phones) {
    if (phones.length < 1) {
        empty(true);
        spinnerAction(false);
    } else {
        empty(false);
    }
    console.log(phones.length);
    const resultContainer = document.getElementById('search-result');
    resultContainer.innerHTML = ''; // remove previous items 
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('text-dark', 'col');
        div.innerHTML = `
        <div class="card">
                <img src="${phone.image}" class="card-img-top" alt="${phone.phone_name}">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <div class="brand-detail"> <p class="brand card-text">Brand: <span> ${phone.brand} </span> </p> <button onclick="details()">Details</button> </div>
                </div>
            </div>
        `;
        resultContainer.appendChild(div);
        spinnerAction(false);

        /* const id = phone.slug;
        const url2 = `https://openapi.programming-hero.com/api/phone/${id}`;
        console.log(url2);
        return url2; */
    });
}

// Show Details on the ui 

function loadDetails() {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
}
