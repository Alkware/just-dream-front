export function createElementProducts(el) {
    var div = document.createElement('div');
    var divProducts = document.createElement('div');
    var iconHeart = document.createElement('i');
    var divContainerImg = document.createElement('div');
    var imgProduct = document.createElement('img');
    var oldPrice = document.createElement('span');
    var parceledPrice = document.createElement('span');
    var valueParceledPrice = document.createElement('span');
    var noValue = document.createElement('span');
    var price = document.createElement('p');
    var free = document.createElement('span');
    var iconFree = document.createElement('i')
    var describe = document.createElement('p');


    divContainerImg.setAttribute("class", "div-container-img");
    divProducts.setAttribute("class", "div-main-products");
    iconHeart.setAttribute("class", "far fa-heart");
    imgProduct.setAttribute("src", el.src1)
    imgProduct.setAttribute("value", el.id)
    oldPrice.setAttribute("id", "oldprice");
    parceledPrice.setAttribute("class", "parceled");
    valueParceledPrice.setAttribute("id", "valueParceled");
    noValue.setAttribute("class", "parceled");
    price.setAttribute("id", "price");
    free.setAttribute("id", "free");
    iconFree.setAttribute("class", "fas fa-bolt");
    describe.setAttribute("id", "describe");
    describe.setAttribute("value", el.id);

    oldPrice.innerText = "R$" + el.old_price
    parceledPrice.innerText = "12x ";
    valueParceledPrice.innerText = "R$" + (el.price / 12).toFixed(2).replace(".", ",")
    noValue.innerText += " sem juros";
    price.innerText = "R$ " + el.price.toFixed(2).replace(".", ",");
    free.innerText = "Frete Grátis";
    describe.innerText = el.name_product;

    free.appendChild(iconFree);
    parceledPrice.appendChild(valueParceledPrice);
    parceledPrice.appendChild(noValue);
    divContainerImg.appendChild(imgProduct);
    divProducts.appendChild(iconHeart);
    divProducts.appendChild(divContainerImg);
    divProducts.appendChild(oldPrice);
    divProducts.appendChild(parceledPrice);
    divProducts.appendChild(price);
    divProducts.appendChild(free);
    divProducts.appendChild(describe);
    div.appendChild(divProducts);

    return div
}