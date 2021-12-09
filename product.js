window.onload = () => {
    let userId = new URLSearchParams(window.location.search).get('userId')
    getData(userId)

}


async function getData(userId) {
    let getPromise = await fetch("https://striveschool-api.herokuapp.com/api/product/" + userId, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWIwYjA3YTRjZmY1ZjAwMTU5MGJkYjMiLCJpYXQiOjE2Mzg5NzI4NjUsImV4cCI6MTY0MDE4MjQ2NX0.nLnmXj2cSk_s7mU43hZR2pjgHFHPydHPZLzMi8WQfsM"
            ,
        }
    })
    let data = await getPromise.json()
    let userDeck = document.querySelector('.userDeck')


    userDeck.insertAdjacentHTML('beforeend',
        `<div class="col-md-4 d-flex">
            <div class="card mb-4">
                <div>                    
                    <a>
                        <img id="product-page-img-url" src="${data.imageUrl}" class="card-img-top img-fluid" alt="...">
                        <span class="badge badge-warning mx-3">£ ${data.price}</span>
                    </a>
                    <div class="card-body p-0 mt-3 mx-3">
                            <p class="card-text mb-3">Brand:  <strong>${data.brand}</strong></p>
                            <h5 class="card-title text-truncate">Name: ${data.name}</h5>
                            <p class="card-text mb-3" id="description">Description:  ${data.description}</p>
                    </div>
                </div>
                <div class="d-flex justify-content-between mx-3 mb-4">
                    <a class="text-white" href="bak-office.html?userId=${data._id}"><button type="button" class="btn btn-secondary mb-1">Edit</button></a>
                    <button type="button" class="btn btn-danger mb-1" onclick="handleDelete()">Delete</button>
                </div>
            </div>
        </div>`
        // "&nbsp;&nbsp;" adds 2 free spaces
    )


}



const handleDelete = async () => {
    const hasAccepted = confirm("Are you sure?")

    if (hasAccepted) {
        try {
            const response = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
                method: "DELETE"
            })
            if (response.ok) {
                const deletedObj = await response.json()
                showAlert("Event " + deletedObj.name + " got deleted successfully", "success")
                setTimeout(() => { window.location.assign("/") }, 3000)
            }
        } catch (err) {
            showAlert(err)
        }
    }
}