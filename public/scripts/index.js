/******
 * Definindo os produtos na sessão ofertas do dia
 *****/
import getProducts from "../api/product.js";
import { getProduct } from "../api/product.js";
import { getCategories } from "../api/category.js";
import { getModel } from '../api/models.js'
import addWishList, { modalWarning, actionSearch, showWishList, navigationMenu, showQntdCart, initConfig } from "./global.js"
const urlparams = new URLSearchParams(window.location.search);
const containarCategories = document.querySelector(".categories .box-categories")
const offersDay = document.querySelector(".offers-day .offers");
const productsCart = JSON.parse(localStorage.getItem('laskhj798u32y42hidsa'));
const wishlistStorage = JSON.parse(localStorage.getItem('allcompusedwishlist2702'));


async function constructor() {
    navigationMenu()
    await showProducts();
    scrollingSectionProducts();
    await showCategories();
    sendUserAndSaveProductsHistoric();
    showProductHistoric();
    sendUserToCategory();
    addWishList();
    showWishList();
    showQntdCart()
    cart();
    actionSearch();
    initConfig()
}
constructor();


async function showProducts() {
    var products = await getProducts(true);
    var buttonNextRight = document.createElement('button')
    var buttonNextLeft = document.createElement('button')
    buttonNextRight.setAttribute('class', "button-next-right");
    buttonNextLeft.setAttribute('class', "button-next-left");
    buttonNextRight.innerHTML = '<i class="fa fa-arrow-right"></i>'
    buttonNextLeft.innerHTML = '<i class="fa fa-arrow-left"></i>'
    document.querySelector("section.offers-day").appendChild(buttonNextRight);
    document.querySelector("section.offers-day").appendChild(buttonNextLeft);

    for (let product of products) {
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

        offersDay.appendChild(div)
    }
}


// Função que possibilitará o scroll em produtos da sessão oferta do dia/historico
function scrollingSectionProducts() {
    const historico = document.querySelector("#historico .offers");
    const buttonNextRight = document.querySelectorAll('.offers-day > .button-next-right');
    const buttonNextLeft = document.querySelectorAll('.offers-day > .button-next-left');

    buttonNextRight.forEach(e => e.addEventListener('click', (ev) => {
        offersDay.scrollBy(300, 0);
        historico.scrollBy(300, 0);
    }))
    buttonNextLeft.forEach(e => e.addEventListener('click', () => {
        offersDay.scrollBy(-300, 0);
        historico.scrollBy(-300, 0);
    }))
}

/*** Define as categorias da loja ***/

async function showCategories() {
    const allData = await getCategories();
    const allProducts = await getProducts(false);

    for (let data of allData) {
        let div = document.createElement('div');

        let divBg = document.createElement('div');
        let divBgImg = document.createElement('img');
        let divImg = document.createElement('img');
        let divH2 = document.createElement('h2');
        let divImgStock = document.createElement('div');
        let imgStock = [
            document.createElement('img'),
            document.createElement('img'),
            document.createElement('img')
        ]
        let divA = document.createElement('a');

        div.setAttribute('class', "div-categories")
        divH2.setAttribute('id', data.id);
        divBg.setAttribute('class', "bg");
        divImgStock.setAttribute('class', "imgs-stock");

        divH2.innerText = data.nome;
        divBgImg.src = data.background;
        divImg.src = data.imgMain;

        var n = 0
        allProducts.forEach((e) => {
            if (n < 3) {
                if (data.nome == e.category) {
                    imgStock[n].src = e.src1
                    n++
                }
            }
        })

        div.appendChild(divBg);
        div.appendChild(divImg)
        div.appendChild(divH2)
        div.appendChild(divImgStock)
        divBg.appendChild(divBgImg)
        div.appendChild(divA)

        divImgStock.appendChild(imgStock[0])
        divImgStock.appendChild(imgStock[1])
        divImgStock.appendChild(imgStock[2])

        containarCategories.appendChild(div);
    }
}

/*** 
 *  Redireciona o usuario para a page product e
 *  salva os produtos visto pelo usuario no local store 
***/

function sendUserAndSaveProductsHistoric() {
    const productSelected = document.querySelectorAll('.offers-day .offers div');
    productSelected.forEach(e => e.addEventListener('click', async (e) => {
        var products = [];
        var historic = JSON.parse(localStorage.getItem('codeoneproductselected'));
        if (historic != null) {
            for (let item of historic) {
                products.push(item)
            }
        }
        var tags = e.target.closest('div').childNodes;
        var index = e.target.closest('div').childNodes.length - 1;
        var id = tags[index].attributes.value.textContent;
        if (products.length != 0) {
            let isEqual = false;
            products.find(e => {
                if (e == id) {
                    isEqual = true
                    return
                }
            })
            if (!isEqual) products.push(id)
        } else {
            products.push(id)
        }
        localStorage.setItem('codeoneproductselected', JSON.stringify(products))
        e.target.classList.remove("fa-solid")
        if (e.target.classList.value != 'far fa-heart') {
            //redireciona o usuario para a apginna de produto
            var pr = await getProduct(id);
            window.location.href = `/product.html?p=${pr[0].name_product}&id=${pr[0].id}`
        }
        e.target.classList.add("fa-solid")
    }))
}
/*** exibe produtos do local store ns sessão historico ***/

async function showProductHistoric() {
    const historic = JSON.parse(localStorage.getItem('codeoneproductselected'));
    const divHistorico = document.querySelector('#historico .offers');
    if (historic != null) {
        for (let item of historic) {
            var products = await getProduct(item);
            for (let el of products) {
                var div = document.createElement('div');
                var divImg = document.createElement('div')
                var imgProduct = document.createElement('img');

                div.setAttribute('class', 'content-historic')
                divImg.setAttribute('class', 'div-img')
                imgProduct.setAttribute("src", el.src1)
                imgProduct.setAttribute("value", el.id)

                divImg.appendChild(imgProduct);
                div.appendChild(divImg)

                divHistorico.appendChild(div);
            }
        }
    } else {
        let span = document.createElement('span');
        span.setAttribute('id', 'noProductsHistoric');
        span.innerText = `Você ainda não viu nenhum produto em nossa loja.\nNavegue em nossas categorias e encontre o produto perfeito para você.`
        span.style.fontSize = "clamp(1.2rem, 1.5vw, 4rem)"
        span.style.width = "70%"
        span.style.opacity = ".7"
        divHistorico.appendChild(span)
    }
}

/*** envia o usuario para a categoria ***/
function sendUserToCategory() {
    let categories = containarCategories.children;
    for (let category of categories) {
        category.addEventListener('click', (e) => {
            let title = e.target.closest('div.div-categories').children[2];
            window.location.href = `/category.html?c=${title.innerText}&id=${title.id}`
        })
    }
}

async function cart() {
    const html = {
        benefits: document.querySelector('section.benefits'),
        tabLink: document.querySelector('section.benefits #tabs .tab-links'),
        tabContent: document.querySelector('section.benefits #tabs .tab-content')
    }

    //VERIFICA SE A PAGINA PRINCIPAL PRECISA TRANSFORMAR EM CARRINHO
    if (urlparams.get('CART') != null) {
        html.benefits.innerHTML = ''
        html.benefits.classList.add("cart")
        document.querySelector('header .banners').style.display = 'none'
        document.querySelector('header').classList.add('cart')
        document.querySelector('header .firstHeader').classList.add('cart-first-header')
        document.querySelector('header .secondHeader').classList.add('cart-second-header')
        document.querySelector('header .nav-menu').classList.add('cart-nav-menu')

        // CREATE CART!
        let tabs = document.createElement('div');
        let titleCart = document.createElement('h2');
        let tabContent = document.createElement('div');
        let tabFinalizeBuy = document.createElement('div');
        let titleValueFrete = document.createElement('p')
        let valueFrete = document.createElement('p')
        let titleTotal = document.createElement('p')
        let total = document.createElement('p')
        let div_finalizeBuy = document.createElement('div')
        let buttonFinalizeBuy = document.createElement('button')
        let table = document.createElement('table')
        let tBody = document.createElement('tbody')


        tabs.setAttribute('id', 'tabs')
        titleCart.setAttribute('data-id', 'cart')
        tabContent.setAttribute('class', 'tab-content')
        tabFinalizeBuy.setAttribute('class', 'tabFinalizeBuy');
        titleValueFrete.setAttribute('id', 'id_titleValueFrete');
        valueFrete.setAttribute('id', 'id_valueFrete');
        titleTotal.setAttribute('id', "id_titleTotal");
        total.setAttribute('id', 'id_total');
        div_finalizeBuy.setAttribute('class', 'div_finalizeBuy')
        buttonFinalizeBuy.setAttribute('class', 'button')

        titleCart.innerText = `carrinho (${productsCart != null ? productsCart.length : 0})`;
        titleValueFrete.innerText = "Envio: ";
        valueFrete.innerText = "Frete Grátis";
        titleTotal.innerText = 'Total com frete: ';
        buttonFinalizeBuy.innerText = "Finalizar compra";

        var finalValue = 0;
        async function fillTableCart(product, qntdProduct, n) {
            let tr = document.createElement('tr')
            let td_img = document.createElement('td');
            let img = document.createElement('img')
            let td_name = document.createElement('td');
            let p_name = document.createElement('p');
            let a_addWishList = document.createElement('span')
            let a_excluir = document.createElement('span')
            let a_comprar = document.createElement('span')
            let td_model = document.createElement('td');
            let select_model = document.createElement('select');
            let option_model = []
            let option = document.createElement('option');
            let td_qntd = document.createElement('td');
            let qntd = document.createElement('input');
            let td_price = document.createElement('td');
            let porcent = document.createElement('span');
            let old_price = document.createElement('span');
            let price = document.createElement('p');
            let td_remove = document.createElement('td');
            let remove = document.createElement('span');

            let models = await getModel(product[0].id);
            option.innerText = ''
            option_model.push(option)
            for (let model of models) {
                let option = document.createElement('option');
                option.setAttribute('id', product[0].id)
                option.innerText = model.model
                option_model.push(option)
            }

            qntd.setAttribute('type', "number")
            qntd.setAttribute("min", "1");
            qntd.setAttribute('max', '99');
            qntd.setAttribute('value', qntdProduct)
            qntd.setAttribute('id', product[0].id)
            remove.setAttribute('id', "removeCart")
            remove.setAttribute('value', product[0].id)
            porcent.setAttribute('id', "porcentCart")
            old_price.setAttribute('id', "old_priceCart")
            price.setAttribute('id', "priceCart")
            a_addWishList.setAttribute('id', product[0].id)
            a_excluir.setAttribute('id', product[0].id)
            a_comprar.setAttribute('id', product[0].id)

            a_addWishList.innerText = "Adicionar a lista de desejos"
            a_excluir.innerText = "Excluir"
            a_comprar.innerText = "Comprar agora"
            p_name.innerText = product[0].name_product
            img.src = product[0].src1
            porcent.innerText = Math.floor(Number(product[0].price - product[0].old_price)) + "% "
            old_price.innerText = Number(product[0].old_price).toFixed(2).replace('.', ',')
            price.innerText = Number(product[0].price).toFixed(2).replace('.', ',')
            remove.innerHTML = '<i id="closeCart" class="fa fa-trash"></i>';
            finalValue = Number(finalValue + (product[0].price * productsCart[n].q));
            total.innerText = 'R$' + finalValue.toFixed(2).replace('.', ',');

            function events() {
                var products = JSON.parse(localStorage.getItem('laskhj798u32y42hidsa'));
                for (let n = 0; n < option_model.length; n++) {
                    select_model.appendChild(option_model[n])
                }
                let models = JSON.parse(localStorage.getItem('laskhj798u32y42hidsa'));
                let model = models.filter(e => e.id == product[0].id);
                let option = option_model.filter(e => e.innerText == model[0].model);
                if(option.length != 0) select_model.selectedIndex = option[0].index
                
                
                select_model.addEventListener('change', (ele) => {
                    var products = JSON.parse(localStorage.getItem('laskhj798u32y42hidsa'));
                    var cart = [];
                    var optionSelected = select_model.options[select_model.selectedIndex].text
                    if (products != null) {
                        for (let product of products) {
                            cart.push({ id: product.id, q: product.q, model: product.model });
                        }
                    }
                    var index = cart.findIndex(e => e.id == ele.target.children[1].id)
                    if(optionSelected != '') cart[index].model = optionSelected
                    else cart[index].model = null
                    localStorage.setItem('laskhj798u32y42hidsa', JSON.stringify(cart))
                })



                var qntdOld = 1
                qntd.addEventListener('change', (e) => {
                    let qntdNew = Number(e.target.value)
                    if (qntdNew > qntdOld) finalValue = Number(finalValue) + Number(product[0].price);
                    else if (qntdNew < qntdOld) finalValue = Number(finalValue) - Number(product[0].price);
                    qntdOld = qntdNew;
                    total.innerText = 'R$' + finalValue.toFixed(2).replace('.', ',');
                    //Salva quantidade de produtos

                    productsCart.forEach(product => {
                        if (product.q != qntdNew && product.id == Number(qntd.id)) {
                            product.q = qntdNew
                        }
                        localStorage.setItem('laskhj798u32y42hidsa', JSON.stringify(productsCart))
                    })

                })
                //remover o produto do carrinho
                remove.addEventListener('click', () => {
                    productsCart.filter((e, i) => {
                        if (e.id == remove.attributes.value.value) {
                            productsCart.splice(i, 1);
                            localStorage.setItem('laskhj798u32y42hidsa', JSON.stringify(productsCart))
                            finalValue -= parseFloat(price.innerText.replace("R$", '').replace(",", "."))
                            total.innerText = 'R$' + finalValue.toFixed(2).replace('.', ',');
                            tBody.removeChild(tr);
                            showQntdCart()
                        }
                    })
                })

                buttonFinalizeBuy.addEventListener('click', () => {
                    var test = false
                    var n= 0
                    for(let product of products){
                        if(product.model == null) test = true
                        if(!test && n == (products.length -1)) window.location.href = `/checkout.html?p=mshdfj-jhisagd-jgsdajhsdg-hjsgduyhas-&q=2`
                        if(test) modalWarning("Escolha o modelo do seu produto", 2)
                        n++
                    }
                    
                });
            }
            events()


            td_price.appendChild(porcent)
            td_price.appendChild(old_price)
            td_price.appendChild(price)
            td_model.appendChild(select_model)
            td_qntd.appendChild(qntd)
            td_img.appendChild(img)
            td_remove.appendChild(remove)
            td_name.appendChild(p_name)
            td_name.appendChild(a_addWishList)
            td_name.appendChild(a_excluir)
            td_name.appendChild(a_comprar)
            tr.appendChild(td_img)
            tr.appendChild(td_name);
            tr.appendChild(td_model);
            tr.appendChild(td_qntd);
            tr.appendChild(td_price)
            tr.appendChild(td_remove);
            tBody.appendChild(tr);
        }

        if (productsCart != null) {
            var n = 0
            productsCart.forEach(async (ele) => {
                let product = await getProduct(Number(ele.id));
                fillTableCart(product, ele.q, n);
                n++
                actionsLinksCart(); // adicionando eventos nos links
            })
        } else {
            window.location.href = "/"
        }

        table.appendChild(tBody)
        tabFinalizeBuy.appendChild(titleValueFrete)
        tabFinalizeBuy.appendChild(valueFrete)
        tabFinalizeBuy.appendChild(titleTotal)
        tabFinalizeBuy.appendChild(total)
        div_finalizeBuy.appendChild(buttonFinalizeBuy);
        tabFinalizeBuy.appendChild(div_finalizeBuy);
        tabContent.appendChild(titleCart)
        tabContent.appendChild(table)
        tabContent.appendChild(tabFinalizeBuy)
        tabs.appendChild(tabContent)
        html.benefits.appendChild(tabs)
    }

}

function actionsLinksCart() {
    let allLinks = document.querySelectorAll('.benefits.cart #tabs table tbody tr td:nth-child(2) span');
    allLinks.forEach(e => {
        e.addEventListener('click', () => {
            if (e.textContent == "Adicionar ao carrinho") {
                if (wishlistStorage.length != 0) {
                    let isEqual = false;
                    wishlistStorage.find(ele => {
                        console.log(ele, e)
                        if (ele == e.id) {
                            isEqual = true
                            return
                        }
                    })
                    if (!isEqual) {
                        wishlistStorage.push(e.id);
                        modalWarning('Produto adicionado com sucesso!', 3)
                    } else {
                        modalWarning('Você ja tem esse produto na lista de desejos', 2)
                    }
                } else {
                    wishlistStorage.push(e.id)
                }
                localStorage.setItem('allcompusedwishlist2702', JSON.stringify(wishlistStorage))
            } else if (e.textContent == "Excluir") {
                e.addEventListener('click', () => {
                    productsCart.filter((ele, i) => {
                        if (e.id == ele.id) {
                            productsCart.splice(i, 1);
                            localStorage.setItem('laskhj798u32y42hidsa', JSON.stringify(productsCart))
                            window.location.reload()
                        }
                    })
                })
            } else {
                window.location.href = '/checkout.html?p=mshdfj-jhisagd-jgsdajhsdg-hjsgduyhas-&q=2'
            }
        })
    });
}




