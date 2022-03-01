const searchMobile = () => {
    const searchField = document.getElementById('search-field');
    const searchFieldText = searchField.value;
    // searchField.value = '';

    // Mobile url
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayResult(data.data))
}

// display result
const displayResult = (mobiles) => {
    console.log(mobiles)
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    mobiles.forEach(mobile => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card shadow h-100">
                <img src="${mobile.image}" class="card-img-top p-4" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${mobile.phone_name}</h5>
                    <p class="card-text">${mobile.brand}</p>
                    <button onclick="loadMobileId('${mobile.slug}')" class="btn btn-info text-white">More Details</button>
                </div>
            </div>
        `
        searchResult.appendChild(div)
    })
}

 // Mobile id url
const loadMobileId = mobileId => {
    console.log(mobileId)
    const url = `https://openapi.programming-hero.com/api/phone/${mobileId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayResultDetail(data))
};

const displayResultDetail = (mobileDetail) => {
    console.log(mobileDetail)
    const resultDetail = document.getElementById('rasult-detail');
    resultDetail.textContent = '';

    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${mobileDetail.image}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${mobileDetail.name}</h5>
        <p class="card-text">${mobileDetail.releaseDate}</p>
        </div>
        <ul class="list-group list-group-flush">
        <li class="list-group-item">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
        </ul>
        <div class="card-body">
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
        </div>
    `;
    resultDetail.appendChild(div)
}