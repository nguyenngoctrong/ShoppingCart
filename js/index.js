
import { xHR, loadCart, showUser  } from "./style.js";
const getProduct =  function () {
    try {
            let xhr = xHR("GET","Product",null);
            xhr.onload = function () {
                if(this.readyState == 4 && this.status == 200){
                    showProduct(JSON.parse(this.responseText));
                }  
            }
        
    } catch (error) {
        console.log(error)
    }
}
function showProduct(data) {
    let product = data.map( pr => {

        return `<div class="product__item">
                <div class="product__item-img">
                <img src=${pr.Img} alt="" />
                </div>
                <div class="product__item-info">
                    <p>${pr.Name}</p>
                    <p>
                        <i class="fas fa-dollar-sign"></i>
                    <span>${pr.Price.toFixed(2)}</span>
                    </p>
                    <button onClick="addToCart(${pr.id})">add to cart</button>
                </div>
            </div>`;
        
    })
    let productList = document.querySelector(".product .product__list");
    for (let index = 0; index < product.length; index++) {
        productList.innerHTML += product[index];
        
    }
}
window.addToCart = function (id){

    let product = JSON.parse(localStorage.getItem('product'))
    let check = false;
    for (let index = 0; index < product.cart.length; index++) {
        if(id == product.cart[index].idCart){
            product.cart[index].amount = Number(product.cart[index].amount) + 1;
            check = true;
            break;
        }
        
    }
    if(!check){
        product.cart.push({"idCart":id, "amount":1});
    }
    localStorage.setItem("product", JSON.stringify(product));
    document.querySelector("header .nav .nav__list").innerHTML = "";
    loadCart(showUser);
}
function main() {  
    getProduct();


};
main();