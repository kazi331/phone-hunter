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
    // console.log(url);
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

// load details 
function details(id) {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
    .then(res=>res.json())
    .then(data=>showDetails(data.data));
    // console.log(url);


}
function showDetails(phone){
    // console.log(phone.mainFeatures);
    const entities = Object.entries(phone.mainFeatures);
    delete entities.memory;
    console.log(entities);
    const detailContainer = document.getElementById('detail-container');
    detailContainer.classList.add('card');
    detailContainer.innerHTML = `
    
    <div class="row g-0">
          <div class="col-md-4">
            <img src="${phone.image}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body text-dark">
              <h5 class="card-title">${phone.name}</h5>
              <p class="card-text">Release: <small>${phone.releaseDate ? phone.releaseDate : 'No release date found!'} </small></p>
              <div>
              Main Features: ${entities}
              </div>
            </div>
          </div>
        </div>
    
    `;
}




// Display phones on the ui 
function displayPhones(phones) {
    if (phones.length < 1) {
        empty(true);
        spinnerAction(false);
    } else {
        empty(false);
    }
    // console.log(phones.length);
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
                    <div class="brand-detail"> <p class="brand card-text">Brand: <span> ${phone.brand} </span> </p> <button onclick="details('${phone.slug}')">Details</button> </div>
                </div>
            </div>
        `;
        resultContainer.appendChild(div);
        spinnerAction(false);
    });
}

// Show Details on the ui 

