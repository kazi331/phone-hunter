// focus on search input 
const query = document.getElementById('query');
query.focus();
document.addEventListener('keyup', (e) => {
    if (e.ctrlKey && e.key == '/') {
        query.focus();
    }
});




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