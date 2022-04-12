const categoryID = new URLSearchParams(window.location.search).get('c');
const ID = new URLSearchParams(window.location.search).get('id');

import { createElementProducts } from "../Controller/categoryController.js";
import { configCategory } from "../api/category.js";
import { getProductsCategory } from "../api/product.js";
import { showWishList, showQntdCart , actionSearch, navigationMenu, init } from "./global.js"
import addWishList from "./global.js"

const sectionOffers = document.querySelector('.list-products section#section-offers');
const boxOffen = document.querySelector('section .offers');
const boxSeeMore = document.querySelector('section .see-more');
const boxBestSeller = document.querySelector('section .best-sellers');

const banner = document.querySelector('header .banners');


//CONSTRUTOR
async function constructor() {
    await stylePageCategory()
    await showProductsOffen();
    await allProductsInboxSeeMore();
    await showboxBestSellers();
    addWishList();
    showWishList()
    navigationMenu()
    showQntdCart();
    goToPageProduct();
    actionSearch();
    init();
}
constructor();


// FUNÇÕES


async function stylePageCategory() {
    let data = await configCategory(ID).then(res => res.data[0]);
    let messageH2 = document.createElement('h2');
    let titlePage = document.querySelector('title');

    banner.children[0].src = data.background
    messageH2.innerText = data.nome
    titlePage.innerText = data.nome+" JUST DREAM"
    messageH2.setAttribute("id", "title-category")

    banner.appendChild(messageH2)
}

async function showProductsOffen() {
    let allProducts = await getProductsCategory(categoryID, "ASC");
    var buttonNextRight = document.createElement('button')
    var buttonNextLeft = document.createElement('button')
    buttonNextRight.setAttribute('class', "button-next-right");
    buttonNextLeft.setAttribute('class', "button-next-left");
    buttonNextRight.innerHTML = '<i class="fa fa-arrow-right"></i>'
    buttonNextLeft.innerHTML = '<i class="fa fa-arrow-left"></i>'
    for (let product of allProducts) {
        if (product.offen) {
            var div = createElementProducts(product)
            boxOffen.appendChild(div)
        }
    }
    sectionOffers.appendChild(buttonNextLeft);
    sectionOffers.appendChild(buttonNextRight);
    scrollingSectionProducts(); // evento para dar scroll nos produtos em ofertas
}

function scrollingSectionProducts() {
    const buttonNextRight = sectionOffers.querySelector('.button-next-right');
    const buttonNextLeft = sectionOffers.querySelector('.button-next-left');

    buttonNextRight.addEventListener('click', () => {
        boxOffen.scrollBy(300, 0);
    })
    buttonNextLeft.addEventListener('click', () => {
        boxOffen.scrollBy(-300, 0);
    })
}

async function showboxBestSellers() {
    let allProducts = await getProductsCategory(categoryID, "DESC");
    var nmr = 1
    for (let product of allProducts) {
        if (nmr <= 6) {
            var div = createElementProducts(product)
            boxBestSeller.appendChild(div)
            nmr++
        }else{
            return
        }
    }
}

async function allProductsInboxSeeMore() {
    let allProducts = await getProductsCategory(categoryID, "ASC");
    for (let product of allProducts) {
        var div = createElementProducts(product)
        boxSeeMore.appendChild(div)
    }
}

function goToPageProduct() {
    var divProducts = [];
    for (let divs of boxOffen.children) divProducts.push(divs)
    for (let divs of boxBestSeller.children) divProducts.push(divs)
    for (let divs of boxSeeMore.children) divProducts.push(divs)

    divProducts.forEach(e => e.addEventListener('click', (e) => {
        let id = e.target.closest('div').querySelector('p#describe').attributes[1].value;
        let name = e.target.closest('div').querySelector('p#describe').innerText;
        e.target.classList.remove("fa")
        if (e.target.classList.value != 'far fa-heart') {
            //redireciona o usuario para a apginna de produto
            window.location.href = `/product.html?p=${name}&id=${id}`
        }
        e.target.classList.add("fa")
    }))
}
