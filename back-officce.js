let test


function getProducts() {
    let product = {
        name: document.getElementById('prod_name').value,
        description: document.getElementById('prod_descr').value,
        brand: document.getElementById('prod_brand').value,
        imageUrl: document.getElementById('prod_img').value,
        price: document.getElementById('prod_price').value
    }
    let productStringified = JSON.stringify(product)
    return productStringified

}



async function insertProduct(e) {
    try {

        e.preventDefault()
        let product = getProducts()
        let serverRes = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
            method: "POST",
            body: product,
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWIwYjA3YTRjZmY1ZjAwMTU5MGJkYjMiLCJpYXQiOjE2Mzg5NzI4NjUsImV4cCI6MTY0MDE4MjQ2NX0.nLnmXj2cSk_s7mU43hZR2pjgHFHPydHPZLzMi8WQfsM",
                "Content-Type": "application/json",
            }
        })

        let serverData = await serverRes.json()
        console.log(serverData)
        document.querySelector('form').reset()
        alert(`${serverData.name} added successfully`)
    } catch (e) {
        alert(e)
    }

}