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
let userId = new URLSearchParams(window.location.search).get('userId')
const url = userId ? "https://striveschool-api.herokuapp.com/api/product/" + userId : "https://striveschool-api.herokuapp.com/api/product/"
const method = userId ? "PUT" : "POST"


window.onload = async () => {
    console.log("URL", url)
    console.log("METHOD", method)

    const submitBtn = document.querySelector("button[type='submit']")

    if (userId) {
        document.getElementById("subtitle").innerText = "Edit Event"
        try {
            const response = await fetch(url, {
                headers: {
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWIwYjA3YTRjZmY1ZjAwMTU5MGJkYjMiLCJpYXQiOjE2Mzg5NzI4NjUsImV4cCI6MTY0MDE4MjQ2NX0.nLnmXj2cSk_s7mU43hZR2pjgHFHPydHPZLzMi8WQfsM",
                    "Content-Type": "application/json",
                }
            })
            if (response.ok) {
                const userDetails = await response.json()
                console.log(userDetails)

                const { imageUrl, description, price, name, brand } = userDetails

                document.getElementById("prod_name").value = name
                document.getElementById("prod_price").value = price
                document.getElementById("prod_brand").value = brand
                document.getElementById("prod_img").value = imageUrl
                document.getElementById("prod_descr").value = description

                submitBtn.innerText = "Edit Event"
                submitBtn.classList.add("btn-success")
            }
        } catch (err) {
            showAlert(err)
        }
    } else {
        document.getElementById("subtitle").innerText = "Create an Event"
        submitBtn.innerText = "Submit Event"
        submitBtn.classList.add("btn-primary")
    }

}