import { showCart } from "./cart.js";
let productCart = {};
export function xHR(method, url, data) {
    try {
        let xhr = new XMLHttpRequest();
        xhr.open(method, "http://localhost:3000/" + url, true);
        xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xhr.send(data);
        return xhr;
    } catch (error) {
        console.log(error);
    }
}
export async function loadCart(showUser) {
    try {
        if(localStorage.getItem("product") == null){
            let product = {
                id: "1",
                cart: [
                ]
            }
            localStorage.setItem("product",JSON.stringify(product));

        }
        let product= JSON.parse(localStorage.getItem("product"));  
            let listPromise=[];
            for (const p of product.cart) {
                let promise = new Promise(resolve => {
                    let xhr = xHR("GET", `Product/${p.idCart}`, null);
                    xhr.onload = function() {
                        if (this.readyState == 4 && this.status == 200) {
                            resolve(JSON.parse(this.responseText));
                        }
                    };
                    
                })    
                listPromise.push(promise)
            }
            let carts = await Promise.all(listPromise);
            product.cart.forEach( item =>{
                item.__proto__ =  carts.find( x => x.id == item.idCart) 
            })
            productCart = product;
            showUser(product.cart);
            return product;
    } catch (error) {
        
    }
}
window.deleteProduct = function (id) {
    document.querySelector(".modal").classList.add("modal-active");
    let idCart = productCart.cart.findIndex(x => x.idCart == id);
    document.querySelector(
    ".modal .modal__body-box"
    ).innerHTML = `<p class="modal__body-name">${productCart.cart[idCart].Name}</p>
                    <img src="${productCart.cart[idCart].Img}" alt="" />`;

    document.querySelector(
    ".modal .modal__footer "
    ).innerHTML = `<button id="btnDeleteCart" onclick="removeProduct(${idCart})">Yes</button>
            <button onclick="closeModal()">No</button>`;
    
}
window.removeProduct = function (idCart) {
    productCart.cart.splice(idCart, 1);
    localStorage.setItem("product",JSON.stringify(productCart));
    document.querySelector("header .nav .nav__list").innerHTML = "";
    loadCart(showUser);
    closeModal();
    if( window.location.href == "http://127.0.0.1:5500/cart.html"){
        loadCart(showCart);
    }
    
};
window.closeModal= function () {  
    document.querySelector(".modal").classList.remove("modal-active");

}
export function showUser(data) {
    let amount=0;
    let product = data.map(pr => {
        amount += Number(pr.amount);
        return `<div class="nav__item">
                    <div class="nav__item-img"><img src=${pr.Img} alt="" /></div>
                    <p>${pr.Name}</p>
                    <div class="nav__item-info">
                        <p class="nav__item-price"> <i
                                class="fas fa-dollar-sign"></i><span>${pr.Price.toFixed(2)}</span><span>${pr.amount > 1 ? "X"+pr.amount : ""  }</span></p>
                        <button onclick = "deleteProduct(${pr.idCart})">Delete</button>
                    </div>
                </div>`;
    });
    let productList = document.querySelector("header .nav .nav__list");
    for (let index = 0; index < product.length; index++) {
        productList.innerHTML += product[index];
    }
    document.querySelector("header .nav .nav__sub .nav__sub-cart span").innerHTML = amount;
    if (amount == 0) {
    document.querySelector("header .nav .nav__list").innerHTML +=
    "<img class='nav__list-subimg' src='./images/not.png'> <p class='nav__bag-title '> No Product</p>";
    return;
    }
}
loadCart(showUser);