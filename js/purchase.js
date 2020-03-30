
let count = 1;
window.purchaseNext = function ( ) {
    

    if (count == 1) {        
        let input = document.querySelectorAll(
            ".content .content__form input[ type = 'text'] "
        );
        for(let i of input){
            if(i.value == ""){
                document
                .getElementById("erroForm")
                .innerHTML = "Error : Input not empty";
                return;
            }
        }
        let phoneRGEX = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
        let phoneNumber = document.getElementById("phoneNumber").value;
        let bankNumber = document.getElementById("bankNumber");
        if(bankNumber){
            bankNumber=bankNumber.value;
        }else{
            bankNumber="0123456789";
        }
        if( !phoneRGEX.test(phoneNumber) || !phoneRGEX.test(bankNumber) ){
            document
            .getElementById("erroForm")
            .innerHTML = "Error : is not Number";
            return;
        }
        document.getElementById("erroForm").innerHTML = "";  

        
    }else if (count == 2) {
        
        let check = document.querySelector(".content .content__pay-check > input").checked;
        if (!check) {
        document.getElementById("erroForm").innerHTML = "Please confirm !!!";
        return;
        }
        document.getElementById("erroForm").innerHTML = "";        
    }
    count++;
    if (count > 1) {
        document.querySelector(".change .change__back").style.display = "block";
    }
    
    document
    .querySelectorAll(".purchase .purchase__step-box")
    [count].classList.add("-active");
    checkCount();
    if (count >= 4) {
        count = 3;
    }
    
    
}
function checkCount() {
    if (count == 1) {
        document.querySelector(".content .container").style.marginLeft =
        "0";
    } else if (count == 2) {
        document.querySelector(".content .container").style.marginLeft =
        "-1080px";
    } else if (count == 3) {
        document.querySelector(".content .container").style.marginLeft =
        "-2220px";
        document.querySelector(".change").style.display="none   "
        setTimeout(() => {
            let product = JSON.parse(localStorage.getItem("product"));
            product.cart=[];
            localStorage.setItem("product", JSON.stringify(product));
            document.getElementById("psNext").click();

        }, 3000);
        
        
    } else if (count == 4) {
        document.querySelector(".content .container").style.marginLeft =
        "-3550px";
    }
    
}
window.purchaseBack = function() {
    --count;    
        document
        .querySelectorAll(".purchase .purchase__step-box")
        [count + 1].classList.remove("-active");

    
    if (count == 1) {
        document.querySelector(".change .change__back").style.display = "none";
    }

    checkCount();
    
};

function main() {
    let money = localStorage.getItem("money");
    document.querySelector(
    ".content .content__pay-price"
    ).innerHTML = `<i class="fas fa-dollar-sign "> ${parseInt(money).toFixed(2)}</i>`;
    

    
}
window.inputCheck = function (event) {
    document.querySelector(
    ".content .content__form-group.-bank"
    ).innerHTML = `<span>Bank number : </span><input id="bankNumber" type="text"
                    placeholder=" Your bank account number" />`;
}
document.getElementById("recive").onclick = function () {
    document.querySelector(
    ".content .content__form-group.-bank"
    ).innerHTML = "";
    
}
main();