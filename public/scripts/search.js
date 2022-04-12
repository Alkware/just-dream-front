import { searchProducts } from '../api/product.js'
import { actionSearch, navigationMenu, showQntdCart, showWishList } from './global.js';
const urlparams = new URLSearchParams(window.location.search);

const container = document.querySelector('.container-all-products .all-products')

async function initAll() {
    await showProducts();
    receiveActionSearchAndComplete();
    navigationMenu();
    showQntdCart();
    showWishList();
    eventOpenProduct();
}
initAll()

async function showProducts() {
    let products = await searchProducts(urlparams.get('p'));
    function createAllElement() {
        if(products.length != 0){
            products.forEach(product => {
                var div = document.createElement('div');
                var secondDiv = document.createElement('div');
                var divImg = document.createElement('div')
                var iconHeart = document.createElement('i');
                var imgProduct = document.createElement('img');
                var oldPrice = document.createElement('span');
                var parceledPrice = document.createElement('span');
                var valueParceledPrice = document.createElement('span');
                var noValue = document.createElement('span');
                var price = document.createElement('p');
                var free = document.createElement('span');
                var iconFree = document.createElement('i')
                var describe = document.createElement('p');
    
                divImg.setAttribute('class', 'div-img')
                secondDiv.setAttribute('class', 'second-div')
                iconHeart.setAttribute("class", "far fa-heart");
                imgProduct.setAttribute("src", product.src1)
                imgProduct.setAttribute("value", product.id)
                oldPrice.setAttribute("id", "oldprice");
                parceledPrice.setAttribute("class", "parceled");
                valueParceledPrice.setAttribute("id", "valueParceled");
                noValue.setAttribute("class", "parceled");
                price.setAttribute("id", "price");
                free.setAttribute("id", "free");
                iconFree.setAttribute("class", "fas fa-bolt");
                describe.setAttribute("id", "describe");
                describe.setAttribute("value", product.id);
    
                oldPrice.innerText = "R$" + product.old_price
                parceledPrice.innerText = "12x ";
                valueParceledPrice.innerText = "R$" + (product.price / 12).toFixed(2).replace(".", ",")
                noValue.innerText += " sem juros";
                price.innerText = "R$ " + product.price.toFixed(2).replace(".", ",");
                free.innerText = "Frete Grátis";
                describe.innerText = product.name_product;
    
    
                div.appendChild(secondDiv)
                free.appendChild(iconFree);
                parceledPrice.appendChild(valueParceledPrice);
                parceledPrice.appendChild(noValue);
                secondDiv.appendChild(iconHeart);
                divImg.appendChild(imgProduct);
                secondDiv.appendChild(divImg);
                secondDiv.appendChild(oldPrice);
                secondDiv.appendChild(parceledPrice);
                secondDiv.appendChild(price);
                secondDiv.appendChild(free);
                secondDiv.appendChild(describe)
    
                container.appendChild(div)
            });
        }else{
            var msgForNotFould = document.createElement('p');
            msgForNotFould.setAttribute('id', 'not-fould')
            msgForNotFould.innerText = "Infelizmente não encontramos nada :( \n Tente usar outra palavra chave";
            container.appendChild(msgForNotFould);
        }
        
    }
    createAllElement()
}

function receiveActionSearchAndComplete(){
    actionSearch();
    let inputSearch = document.querySelector('header .secondHeader .search input');
    let text = urlparams.get('p');
    inputSearch.value = text
    inputSearch.focus()
}

function eventOpenProduct(){
    let products = [...container.children]
    if(!products[0].id == 'not-fould'){
        products.forEach(e =>{
            let p = e.children[0].lastChild.textContent;
            let id = e.children[0].lastChild.attributes.value.value;
            e.addEventListener('click', ()=>[
                window.location.href = `/product.html?p=${p}&id=${id}` 
            ])
        })
    }
}