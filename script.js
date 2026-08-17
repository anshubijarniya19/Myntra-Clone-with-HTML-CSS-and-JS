const cards=document.querySelector(".cards")

async function getProducts() {
    const response = await fetch("https://dummyjson.com/products?limit=50");
    const data = await response.json();

    displayProducts(data.products);
}

getProducts();

function displayProducts(products) {

    cards.innerHTML = "";

    products.forEach(product => {

        const discountPrice = Math.round(
            product.price * (1 - product.discountPercentage / 100)
        );

        cards.innerHTML += `
        <div class="card">

            <div class="card-img">
                <img src="${product.thumbnail}" alt="">
            </div>

            <div class="rating-review">
                ${product.rating} ⭐ | ${Math.floor(product.rating * 250)}
            </div>

            <div class="company-name">
                ${product.brand}
            </div>

            <div class="desc">
                ${product.title}
            </div>

            <div class="price-section">
                <div class="price">₹${discountPrice}</div>

                <div class="original-price">
                    ₹${product.price}
                </div>

                <div class="discount">
                    (${Math.round(product.discountPercentage)}% OFF)
                </div>
            </div>

            <button class="add-bag">
                Add to Bag
            </button>

        </div>
        `;
    });

}

const search = document.querySelector(".search input");

search.addEventListener("input", async (e) => {

    const value = e.target.value;

    const response = await fetch(
        `https://dummyjson.com/products/search?q=${value}`
    );

    const data = await response.json();

    displayProducts(data.products);

});

    //Bag
let count = 0;

const badge = document.querySelector(".badge");

if(count==0){
    badge.style.display="none";
}
cards.addEventListener("click", (e) => {

    if (e.target.classList.contains("add-bag")) {

        count++;
        if(count!=0){
        badge.style.display="block";
}
        badge.innerText = count;
    
    }

});