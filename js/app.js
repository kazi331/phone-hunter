// focus on search input 
const query = document.getElementById('query');
query.focus();
document.addEventListener('keyup', (e) => {
    if (e.ctrlKey && e.key == '/') {
        query.focus();
    }
});

const searchValue = query.value;

// fetch phone from api 
function loadPhones() {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data));
}

// display data on ui 
function displayPhone(phones) {
    console.log(phones);
}

loadPhones();


// enable spinner 
function enableSpinner() {
    countryContainer.innerHTML = `
    <div id="spinner" class="mx-auto">
        <div class="sk-chase">
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
            <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
    </div>
    </div>
    `;
};