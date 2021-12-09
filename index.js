let test

let basketItems = []
let total = 0

async function getProducts() {
    try {
        let productsJSON = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWIwYjA3YTRjZmY1ZjAwMTU5MGJkYjMiLCJpYXQiOjE2Mzg5NzI4NjUsImV4cCI6MTY0MDE4MjQ2NX0.nLnmXj2cSk_s7mU43hZR2pjgHFHPydHPZLzMi8WQfsM"
                ,
            }
        })
        let productsList = await productsJSON.json()
        productsList.shift()

        let brandList = getBrands(productsList)
        createSections(brandList)
        appendCards(productsList)

    } catch (e) {
        console.log(e)
        alert(e)
    }
}

window.onload = () => {
    getProducts()

}
function createSections(brands) {
    let hero = document.querySelector('.jumbotron.hero')
    brands.forEach(brand => {
        let newSection = document.createElement('section')
        newSection.classList.add('container', 'brandSection', 'px-0')

        let sectionTitle = document.createElement('h2')
        sectionTitle.classList.add('row', 'mx-0')
        sectionTitle.innerText = brand
        newSection.appendChild(sectionTitle)

        let productDeck = document.createElement('div')
        productDeck.classList.add('row', 'productsDeck')
        productDeck.id = brand.toLowerCase()
        newSection.insertAdjacentElement('beforeend', productDeck)

        hero.insertAdjacentElement('afterend', newSection)
    });

}

function getBrands(data) {
    let brands = []
    data.filter(product => {
        if (brands.includes(product.brand) === false)
            brands.push(product.brand)
    })
    return brands
}

function generateCards(product) {
    return `
            <div class="col-md-4">
                <div class="card mb-4">
                    <div>                    
                        <a>
                            <img id="main-page-img-url" src="${product.imageUrl}" class="card-img-top img-fluid" alt="...">
                            <span class="badge badge-warning mx-3">£ ${product.price}</span>
                        </a>
                        <div class="card-body p-0 mt-3 mx-3">
                                <h5 class="card-title text-truncate">Name: ${product.name}</h5>
                                <p class="card-text mb-3" id="description">Description:  ${product.description}</p>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between mx-3 mb-4">
                        <a class="text-white" href="product.html?userId=${product._id}"><button type="button" class="btn btn-success mb-1">View</button></a>
                        <a class="text-white" href="bak-office.html?userId=${product._id}"><button type="button" class="btn btn-secondary mb-1">Edit</button></a>
                        <button type="button" class="btn btn-danger mb-1">Delete</button>
                    </div>
                </div>
            </div>
    `
}


function appendCards(products) {
    products.forEach(product => {

        let sectionToInsert = document.querySelector(`#${product.brand.toLowerCase()}`)

        sectionToInsert.insertAdjacentHTML('beforeend', `${generateCards(product)}`)
    })
}

