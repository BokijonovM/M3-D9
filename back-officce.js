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
const eventId = new URLSearchParams(location.search).get("eventId")
const url = eventId ? "https://striveschool-api.herokuapp.com/api/product/" + eventId : "https://striveschool-api.herokuapp.com/api/product/"
const method = eventId ? "PUT" : "POST"


window.onload = async () => {
    console.log("URL", url)
    console.log("METHOD", method)

    const submitBtn = document.querySelector("button[type='submit']")

    if (eventId) {
        document.getElementById("subtitle").innerText = " — Edit Event"
        const response = await fetch(url)
        if (response.ok) {
            const eventDetails = await response.json() // {}
            console.log(eventDetails)

            const { imageUrl, description, price, name, brand } = eventDetails

            // DOM MANIP - PREFILLING THE DATA INTO EVERY FIELD
            document.getElementById("prod_name").value = name
            document.getElementById("description").value = description
            document.getElementById("prod_price").value = price
            document.getElementById("prod_brand").value = brand
            document.getElementById("prod_img").value = imageUrl


            submitBtn.innerText = "Edit Event"
            submitBtn.classList.add("btn-success")
        }
    }

}