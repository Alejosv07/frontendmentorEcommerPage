const obProduct = {
    id: 0,
    title: "",
    price: 0.0,
    quantity: 0,
    total: 0,
};
let id = 0;
let List = [];
let laptop = window.innerWidth>768;


const paintNumberBasket = (d)=>{
    if(List.length>0){
        d.querySelector(".cart__quantity").style.opacity = 1;
        d.querySelector(".cart__quantity").textContent = List.length;
    }else{
        d.querySelector(".cart__quantity").style.opacity = 0;
    }
}
((d,w) => {
    //Rezise
    w.addEventListener("resize",(event)=>{
        //Modify screen
        laptop = window.innerWidth>768;
        console.log(w.innerWidth);
    },true);    


    //Start click event
    d.addEventListener("click", (event)=>{
        //Plus quantity
        if (event.target.matches(".quantity__minus") || event.target.matches(".quantity__plus")) {
            let quantity__number = d.querySelector(".quantity__number");
            try {
                let number = parseInt(quantity__number.textContent);
                
                if (number > 0 && event.target.matches(".quantity__minus")) {
                    number -= 1;
                    quantity__number.textContent = number;
                }else if(event.target.matches(".quantity__plus")){
                    number +=1;
                    quantity__number.textContent = number;
                }
            } catch (error) {
                console.log(error);
            }
        }else//Effect gray main gallery
        if(event.target.matches(".addCart") || event.target.matches(".addCart__img")){
            
            if (d.querySelector(".quantity__number").textContent != 0) {
                let product = Object.create(obProduct);
                id++;
                product.id = id;
                product.title = d.querySelector(".details__title").textContent;
                product.price = d.querySelector(".price__container__real").textContent.replace("$","");
                product.quantity = d.querySelector(".quantity__number").textContent;
                product.total = parseFloat(product.price)*parseFloat(product.quantity);
                List.push(product);
    
                const fragment = new DocumentFragment();
                List.forEach((e)=>{
                    let div = document.createElement("div");
                    div.classList.add("cartPanel__item");
                    div.innerHTML =
                    `<figure class="cartPanel__item__img">
                        <img src="images/image-product-1-thumbnail.jpg" alt="img_thumbnail">
                    </figure>
                    <div class="cartPanel__item__body">
                        <p class="cartPanel__item__body__title">${e.title}</p>
                        <div class="cartPanel__item__body__details">
                            <p class="cartPanel__item__body__details__price">$${e.price}</p>
                            <p class="cartPanel__item__body__details__quantity">x${e.quantity}</p>
                            <p class="cartPanel__item__body__details__total">$${e.total}</p>
                        </div>
                    </div>
                    <div class="cartPanel__item__op">
                        <figure class="cartPanel__item__op_container">
                            <img class="cartPanel__item__op__img" src="images/icon-delete.svg" value="${e.id}" alt="remove item" srcset="">
                        </figure>
                    </div>`;
                    div.setAttribute("value",e.id);
                    fragment.appendChild(div);
                });
    
                let cartPanel__body = d.querySelector(".cartPanel__body");
                cartPanel__body.innerHTML = "";
                cartPanel__body.appendChild(fragment);
                paintNumberBasket(d);
            }

        }
        else//remove item
        if(event.target.matches(".cartPanel__item__op_container")
        || event.target.matches(".cartPanel__item__op__img")){
            List = List.filter((e)=>{
                return e.id != event.target.getAttribute("value");
            });
            let cartPanel__body = d.querySelector(".cartPanel__body");
            let cartPanel__item = cartPanel__body.querySelector(`[value="${event.target.getAttribute("value")}"]`);
            cartPanel__body.removeChild(cartPanel__item);
            paintNumberBasket(d);
        }
        else//Effect gray main gallery
        if(event.target.matches(".efecct-mirror")){
            const imagePath = event.target.parentElement.querySelector(".product__carrusel__container__img").getAttribute("normal-size");
            let product__container__img = d.querySelector(".product__container__img");
            product__container__img.setAttribute("src",imagePath);
        }
        else//Effect gray details gallery
        if(event.target.matches(".modal__efecct-mirror")){
            const imagePath = event.target.parentElement.querySelector(".modal__product__carrusel__container__img").getAttribute("normal-size");
            let product__container__img = d.querySelector(".modal__product__container__img");
            product__container__img.setAttribute("src",imagePath);
        }
        else//cart popup
        if(event.target.matches(".cart__img")||event.target.matches(".cart__quantity")
        || event.target.matches(".cart")){
            let cartPanel = d.querySelector(".cartPanel");
            if (cartPanel.classList.contains("modal-animation-on")) {
                cartPanel.classList.add("modal-animation-off");
                cartPanel.classList.remove("modal-animation-on");
            }else{
                cartPanel.classList.add("modal-animation-on");
                if (cartPanel.classList.contains("modal-animation-off")) {
                    cartPanel.classList.remove("modal-animation-off");
                }
            }
        }
        else//image popup
        if(event.target.matches(".product__container__img") && laptop){
            let modal = d.querySelector(".modal");
            modal.classList.add("modal-animation-on");
            if (modal.classList.contains("modal-animation-off")) {
                modal.classList.remove("modal-animation-off");
            }
        }
        else//image popup
        if(event.target.matches(".modal__close") && laptop){
            let modal = d.querySelector(".modal");
            modal.classList.add("modal-animation-off");
            if (modal.classList.contains("modal-animation-on")) {
                modal.classList.remove("modal-animation-on");
            }
        }
        else//Controls details gallery
        if(event.target.matches(".modal__product__controls__spin") && laptop){
            let index = 0;
            let product__container__img = d.querySelector(".modal__product__container__img");
            let imagePath = "";
            let pass = false;
            d.querySelectorAll(".modal__product__carrusel__container__img").forEach((x)=>{
                if(x.getAttribute("normal-size") == product__container__img.getAttribute("src") && pass == false){
                    if(event.target.matches(".right-row")){
                        index++;
                    }else{
                        index--;
                    }
                    if(d.querySelectorAll(".modal__product__carrusel__container__img").item(index) != null){
                        pass = true;
                        imagePath = d.querySelectorAll(".modal__product__carrusel__container__img").item(index).getAttribute("normal-size");
                        product__container__img.setAttribute("src",imagePath);
                    }
                }
                index++;
            });
        }
        else//Controls details gallery mobile main
        if(event.target.matches(".product__controls__spin") && !laptop){
            let index = 0;
            let product__container__img = d.querySelector(".product__container__img");
            let imagePath = "";
            let pass = false;
            d.querySelectorAll(".product__carrusel__container__img").forEach((x)=>{
                console.log("entre");
                if(x.getAttribute("normal-size") == product__container__img.getAttribute("src") && pass == false){
                    console.log("entre al if");

                    if(event.target.matches(".right-row")){
                        index++;
                    }else{
                        index--;
                    }
                    if(d.querySelectorAll(".product__carrusel__container__img").item(index) != null){
                        pass = true;
                        imagePath = d.querySelectorAll(".product__carrusel__container__img").item(index).getAttribute("normal-size");
                        product__container__img.setAttribute("src",imagePath);
                    }
                }
                index++;
            });
        }
        else
        if(event.target.matches(".menuMobile") || event.target.matches(".menuMobile__image")){
            const menuMobile__container = d.querySelector(".menuMobile__container");
            const menu = d.querySelector(".menuMobile__container>.menu");
            if(menuMobile__container != null){
                menu.style.animationName = "animationMenuOn";
                menuMobile__container.style.animationName = "animationModalOn";
            }
        }
        if(event.target.matches(".menu__item--close") || event.target.matches(".menuMobile--close")
        || event.target.matches(".menuMobile--close__image")){
            const menuMobile__container = d.querySelector(".menuMobile__container");
            const menu = d.querySelector(".menuMobile__container>.menu");
            if(menuMobile__container != null){
                menu.style.animationName = "animationMenuOff";
                menuMobile__container.style.animationName = "animationModalOff";
            }
        }
        console.log(event.target);
    });
    //End click event
})(document,window);