const searchMobile = () => {
    const searchField = document.getElementById('search-field');
    const searchFieldText = searchField.value;
    searchField.value = '';
    const errorMessage = document.getElementById('error-message');

    // Mobile url
    if(searchFieldText == ''){
        errorMessage.style.display = 'block';
    }
    else{
        errorMessage.textContent = '';
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displayResult(data.data))
    }
}

// display result
const displayResult = (mobiles) => {
    // console.log(mobiles)
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    // show more btn
    const showMore = document.getElementById('show-more');
    showMore.style.display = 'block';

    const phones = mobiles.slice(0, 20);
    phones.forEach(mobile => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div class="card shadow h-100">
                <img src="${mobile.image}" class="card-img-top p-4" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${mobile.phone_name}</h5>
                    <p class="card-text">${mobile.brand}</p>
                    <button onclick="loadMobileId('${mobile.slug}')" class="btn  btn-outline-info">More Details</button>
                </div>
            </div>
        `;
        searchResult.appendChild(div);
        const displayResult = (mobiles) => {
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
                            <button onclick="loadMobileId('${mobile.slug}')" class="btn  btn-outline-info">More Details</button>
                        </div>
                    </div>
                `;
                searchResult.appendChild(div);
            })
    }
    });
}

 // Mobile id url
const loadMobileId = mobileId => {
    console.log(mobileId)
    const url = `https://openapi.programming-hero.com/api/phone/${mobileId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayResultDetail(data.data))
};

// display mobile detail
const displayResultDetail = (mobileInfo) => {
    console.log(mobileInfo)
    const resultDetail = document.getElementById('rasult-detail');
    resultDetail.textContent = '';
    const resultCondition = condition =>{
        if(condition == ''){
            const noFound = 'Not found';
            return noFound;
        }
        else{
            return condition;
        }
    };
    const div = document.createElement('div');
    div.classList.add('card');
    div.classList.add('shadow');
    div.innerHTML = `
        <img src="${mobileInfo.image}" class="card-img-top p-5" alt="...">
        <div class="card-body">
        <h1 class="card-title fw-bold text-secondary">${mobileInfo.name}</h1>
        <span class="text-muted">Release : ${resultCondition(mobileInfo.releaseDate)}</span>
        <h4 class="card-title text-success mt-3">Main Features</h4>
        <p class="card-text"><span class="fw-bolder">Sensors :</span> ${resultCondition(mobileInfo.mainFeatures.sensors.slice( 0 , 10))}</p>
        <p class="card-text"><span class="fw-bolder">Storage :</span> ${resultCondition(mobileInfo.mainFeatures.storage)}</p>
        <p class="card-text"><span class="fw-bolder">Memory :</span> ${resultCondition(mobileInfo.mainFeatures.memory)}</p>
        <p class="card-text"><span class="fw-bolder">Storage :</span> ${resultCondition(mobileInfo.mainFeatures.storage)}</p>
        <p class="card-text"><span class="fw-bolder">Display :</span> ${resultCondition(mobileInfo.mainFeatures.displaySize)}</p>
        <h4 class="card-title text-success mt-5 mb-3">Other Features</h4>
        <p class="card-text"><span class="fw-bolder">WLAN :</span> ${resultCondition(mobileInfo.others.WLAN)}</p>
        <p class="card-text"><span class="fw-bolder">Bluetooth :</span> ${resultCondition(mobileInfo.others.Bluetooth)}</p>
        <p class="card-text"><span class="fw-bolder">GPS :</span> ${resultCondition(mobileInfo.others.GPS)}</p>
        <p class="card-text"><span class="fw-bolder">NFC :</span> ${resultCondition(mobileInfo.others.NFC)}</p>
        <p class="card-text"><span class="fw-bolder">Radio :</span> ${resultCondition(mobileInfo.others.Radio)}</p>
        <p class="card-text"><span class="fw-bolder">USB :</span> ${resultCondition(mobileInfo.others.USB)}</p>
        <a href="#" class="btn btn-info my-3">Add to Cart</a>
        </div>
    `;
    resultDetail.appendChild(div)
}