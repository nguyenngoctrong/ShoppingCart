import { loadCart, showUser } from "./style.js";
let productCart;
loadCart(showCart).then(data => {
    productCart = data;
});
export function showCart(data) {
    let amount = 0;
    let product = data.map(pr => {
        amount += (pr.Price*pr.amount);
        return `<tr>
                    <td> <img src="${pr.Img}" />
                        <p>${pr.Name}</p>
                    </td>
                    <td> <i class="fas fa-dollar-sign"></i><span>${pr.Price.toFixed(2)}</span></td>
                    <td>${pr.amount}</td>
                    <td> <i class="fas fa-dollar-sign"></i><span>${(pr.Price*pr.amount).toFixed(2)}</span></td>
                    <td><button onclick = "removeCart(${pr.idCart})">Delete</button></td>
                </tr>`;
    });
    let stringCart = `<tr>
                    <td>Products</td>
                    <td>Price</td>
                    <td>Amount</td>
                    <td>Total money</td>
                    <td>Delete</td>
                </tr>`;
    for (let index = 0; index < product.length; index++) {
        stringCart += product[index];
    }
    document.querySelector(".bag .bag__table").innerHTML=stringCart;
    document.querySelector(".bag .bag__pay i").innerHTML = amount.toFixed(2);
    localStorage.setItem("money",amount.toString());
    if (amount == 0) {
        document.querySelector(".bag .bag__table").innerHTML =""
        
    }
}
window.removeCart = function(idCart) {

    let index = productCart.cart.findIndex(x => x.idCart == idCart);
    productCart.cart.splice(index, 1);
    localStorage.setItem("product", JSON.stringify(productCart));
    document.querySelector("header .nav .nav__list").innerHTML = "";
    loadCart(showCart);
    loadCart(showUser);
};