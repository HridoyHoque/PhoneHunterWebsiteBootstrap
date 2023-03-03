// console.log("paisee")

const loadPhones = async (Searchtext, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${Searchtext}`
    const res = await fetch(url)
    const data = await res.json()
    showPhone(data.data, dataLimit)
    console.log(data)
}

const showPhone = (phones, dataLimit) => {
    const phonesConatiner = document.getElementById("phones-container")
    phonesConatiner.innerHTML = '';
    /* Display Only 5 phones */
    const showAllBtn = document.getElementById('ShowAll-btn')
    if (dataLimit && phones.length > 5) {
        phones = phones.slice(0, 5)
        showAllBtn.classList.remove('d-none')
    }
    else {
        showAllBtn.classList.add('d-none')
    }
    /* No phone found message */
    const noPhones = document.getElementById('noPhone')
    if (phones.length === 0) {
        noPhones.classList.remove('d-none')
    }
    else {
        noPhones.classList.add('d-none')
    }
    /* Dsplay All phones */
    phones.forEach(phones => {
        const phonesDiv = document.createElement('div')
        phonesDiv.classList.add('col')
        phonesDiv.innerHTML = `
  <div class="card p-4">
  <img src="${phones.image}" class="card-img-top " alt="...">
  <div class="card-body">
    <h5 class="card-title">${phones.phone_name}</h5>
    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    <button onclick="loadPhoneDetails('${phones.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Show Details</button>
    </div>
</div>

  
  
  `
        phonesConatiner.appendChild(phonesDiv)
    });
    /* STOP Spinner */
    toggleSpinner(false);
}

const proccessSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('exampleFormControlInput1')
    const Searchtext = searchField.value;
    loadPhones(Searchtext, dataLimit)
    
}
document.getElementById('btn-Search').addEventListener('click', function () {
    /* Start Spinner */
    proccessSearch(3)
   
})

/* Search input field enter key handler */
document.getElementById('exampleFormControlInput1').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        proccessSearch(5)
    }
})
const toggleSpinner = isLoading => {
    const spinnerSection = document.getElementById('Spinner')
    if (isLoading) {
        spinnerSection.classList.remove('d-none')
    }
    else {
        spinnerSection.classList.add('d-none')
    }
}

// Not the best way to show all but let's do this dude for bad API
document.getElementById('show-all-btn').addEventListener('click', function () {
    proccessSearch()
})

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayphonesDetails(data.data)
}

const displayphonesDetails = phones => {
    console.log(phones)
    const modalTitle = document.getElementById("staticBackdropLabel")
    modalTitle.innerText = phones.name;
    const modalDescription = document.getElementById('modal-description')
    modalDescription.innerHTML = `
    <h4>${phones.releaseDate}</h4> 
    <h4>chipset ${phones.mainFeatures.chipSet}</h4>
       
    `

}
loadPhones('apple')