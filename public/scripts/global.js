import { getProduct } from "../api/product.js";
import { getCategories } from "../api/category.js";
import createNewUserJustDream, { createElementForModalLogin, createNewUserGoogle, doLogin, loggedVerify } from "../Controller/LoginController.js";

const btnMenuMobile = document.querySelector('header .secondHeader .info-buy .menu-mobile');
const menuMobile = document.querySelector('header .nav-menu');
const openMoreInfo = document.querySelector('.more-info legend');
const boxInfos = document.querySelector('.more-info .box-infos');
const offersDay = document.querySelector("section .offers");
const CategoryListProducts = document.querySelectorAll("main .list-products section div");
const heartWishList = document.querySelector('.secondHeader .info-buy i:nth-child(1)')
const iconCart = document.querySelector('.secondHeader .info-buy i:nth-child(2)')
const container = document.querySelector('.container-modals')
const containerLogin = document.querySelector('.container-modals.container-login')
const tbody = document.getElementById('tbody_wishlist')
const closeContainer = document.querySelector('.container-modals .box-wishlist span:first-of-type')
const containerAboutUs = document.querySelector('.container-modals.container-about-us')
const wishList = JSON.parse(localStorage.getItem("allcompusedwishlist2702"))
const cart = JSON.parse(localStorage.getItem("laskhj798u32y42hidsa"));

var qntdWishList;
var qntdCart;

// // fuinção para ab
// btnMenuMobile.addEventListener('click', () => {
//     btnMenuMobile.classList.toggle('open')
//     menuMobile.classList.toggle('showMenu')
// });


export function initConfig(){
    //verificar se o usuario está logado.
    async function sectionLogged() {
        let boxLogin = document.querySelector('header div.box-login')
        boxLogin.style.display = 'none'
        var logged = JSON.parse(localStorage.getItem('loggestusersectionvalue-5'));
        if (logged != null) {
            if (logged[5] == 5) {
                var hasUser = await loggedVerify(logged[3])
                if (!hasUser) { modalLogin(); boxLogin.style.display = 'flex' }
            } else { modalLogin(); boxLogin.style.display = 'flex' }
        } else { modalLogin(); boxLogin.style.display = 'flex' }
    }
    //redireciona a pagina principal ao clicar na logo
    function redirectPageMainLogo() {
        let logo = document.querySelector('header .secondHeader div#logo');
        logo.addEventListener('click', () => {
            window.location.href = '/'
        })
    }
    //abre o info do rodapé
    function openInfo() {
        openMoreInfo.addEventListener('click', () => {
            boxInfos.classList.toggle('show-infos');
            setTimeout(() => {
                scrollTo(0, document.body.scrollHeight);
            }, 200)
        })
    }
    sectionLogged();
    redirectPageMainLogo();
    openInfo();
}


export function modalLogin() {
    //abrir modal login
    var modalCreateAccount = document.querySelector('header .nav-menu .box-login ul:first-of-type a');
    var modalLogin = document.querySelector('header .nav-menu .box-login ul:last-of-type a');
    function closeModal() {
        let close = containerLogin.querySelector('div.modal-login span#closeLogin')
        close.addEventListener('click', () => containerLogin.style.display = 'none');
    }

    modalCreateAccount.addEventListener('click', () => {
        containerLogin.style.display = 'flex'
        createElementForModalLogin(false);
        closeModal();
        //definições modal login
        let back = containerLogin.querySelector('span.fa-solid')
        let buttonLoginJD = containerLogin.querySelector('button#jd')
        let modalFormRegister = containerLogin.querySelector('.modal-form-register');
        let linkAddInfoOption = containerLogin.querySelector('.modal-form-register a');
        let addInfoOption = containerLogin.querySelector('.container-modals.container-login .modal-form-register .form-add-info');
        let buttonCreateAccount = containerLogin.querySelector('.container-modals.container-login .modal-form-register button.button');

        // //events
        back.addEventListener('click', () => {
            modalFormRegister.style.display = 'none';
            containerLogin.querySelector('.modal-login').style.display = 'flex'
        })
        buttonLoginJD.addEventListener('click', () => {
            modalFormRegister.style.display = 'flex';
            containerLogin.querySelector('.modal-login').style.display = 'none'
        });
        linkAddInfoOption.addEventListener('click', () => {
            if (addInfoOption.classList[1] != undefined) addInfoOption.style.display = 'none'
            else addInfoOption.style.display = 'flex'
            addInfoOption.classList.toggle('form-open')
        })

        buttonCreateAccount.addEventListener('click', async () => {
            if (await createNewUserJustDream()) {
                modalFormRegister.style.display = 'none'
                modalWarning("Conta criada com sucesso!", 3)
                setTimeout(() => { window.location.reload(); }, 2000);
            }
            else modalWarning('Não foi possivel realizar seu cadastro', 1)
        })

        //função disparada pelo google
        function handleCredentialResponse(response) {
            createNewUserGoogle(jwt_decode(response.credential))
            // window.location.reload();
        };

        google.accounts.id.initialize({
            client_id: "280960552530-gd84krtg1d3q48gnorapbm5gpit4blsq.apps.googleusercontent.com",
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" }  // customization attributes
        );
        google.accounts.id.prompt(); // also display the One Tap dialog

    });

    
    modalLogin.addEventListener('click', () => {
        containerLogin.style.display = 'flex'
        createElementForModalLogin(true);
        closeModal();
        let buttonLogin = containerLogin.querySelector('button#jdLogin')

        buttonLogin.addEventListener('click' , ()=>{
            doLogin();
        })

    })
}

export async function navigationMenu() {
    let categories = await getCategories();
    let navCategory = document.querySelector('header .nav-menu nav ul:first-of-type .combo-box-categories')
    let wishList = document.querySelectorAll('header .nav-menu nav ul li a');
    let boxInfos = document.getElementById('box-infos');

    heartWishList.addEventListener('click', () => openWishList())
    iconCart.addEventListener('click', () => openCart())

    wishList.forEach(e => e.addEventListener('click', (ev) => {
        switch (ev.target.id) {
            case "ul-category": {
                navCategory.innerHTML = ''
                for (let category of categories) {
                    let li = document.createElement('li');
                    li.setAttribute('id', "li-" + category.nome)
                    li.setAttribute('value', category.id)
                    li.innerText = category.nome
                    navCategory.appendChild(li);
                }
                eventNavigationMenu()
                navCategory.classList.toggle("show-combo-box");
                break;
            }
            case "ul-aboutus": {
                containerAboutUs.style.display = 'flex';
                closeModalAboutUs();
                break
            }
                ;
            case "ul-contact":
                boxInfos.classList.add('show-infos')
                setTimeout(() => {
                    window.location.href = "#box-infos"
                }, 300);
                break;
            case "ul-wishlist": openWishList(); break;
        }
    }))

    function eventNavigationMenu() {
        for (let lis of navCategory.children) {
            lis.addEventListener('click', () => {
                let category = lis.attributes.id.textContent.replace("li-", '');
                let id = lis.attributes.value.value
                window.location.href = `/category.html?c=${category}&id=${id}`
            })
        }
    }
}

export default function addWishList() {
    // PAGINA PRINCIPAL
    for (let div of offersDay.children) {
        div.querySelector('i.far').addEventListener('click', (e) => {
            var wishList = [];
            var products = JSON.parse(localStorage.getItem('allcompusedwishlist2702'));
            if (products != null) {
                for (let product of products) {
                    wishList.push(product)
                }
            }
            var tags = e.target.closest('div').childNodes;
            var index = e.target.closest('div').childNodes.length - 1;
            var id = tags[index].attributes.value.textContent;
            if (wishList.length != 0) {
                let isEqual = false;
                wishList.find(e => {
                    if (e == id) {
                        isEqual = true
                        return
                    }
                })
                if (!isEqual) wishList.push(id)
            } else {
                wishList.push(id)
            }
            localStorage.setItem('allcompusedwishlist2702', JSON.stringify(wishList))
        })
    }
    //PAGINA CATEGORIAS
    for (let divs of CategoryListProducts) {
        for (let div of divs.children) {
            div.querySelector('i.far').addEventListener('click', (e) => {
                var wishList = [];
                var products = JSON.parse(localStorage.getItem('allcompusedwishlist2702'));
                if (products != null) {
                    for (let product of products) {
                        wishList.push(product)
                    }
                }
                var tags = e.target.closest('div').childNodes;
                var index = e.target.closest('div').childNodes.length - 1;
                var id = tags[index].attributes.value.textContent;
                if (wishList.length != 0) {
                    let isEqual = false;
                    wishList.find(e => {
                        if (e == id) {
                            isEqual = true
                            return
                        }
                    })
                    if (!isEqual) wishList.push(id)
                } else {
                    wishList.push(id)
                }
                localStorage.setItem('allcompusedwishlist2702', JSON.stringify(wishList))
            })
        }
    }
}

export async function showWishList() {
    updateNumberCartAndWishlist()
    //PAGINA PRINCIPAL
    if (offersDay != null) {
        for (let div of offersDay.children) {
            var heartIcon = div.querySelector('i.far')
            let id = div.querySelector("p#describe").attributes.value.value
            if (wishList != null) {
                heartWishList.children[0].innerText = qntdWishList
                let value = wishList.filter((value) => { return value == id })
                if (value == id) {
                    heartIcon.classList.add("fa-solid")
                    heartIcon.style.display = 'block'
                    heartIcon.style.opacity = '1'
                    heartIcon.style.fontSize = 'clamp(1rem, 2vw,3rem)'
                }
            }
            else heartWishList.children[0].innerText = 0;

            offersDay.querySelectorAll('div').forEach((e) => e.addEventListener('click', (e) => {
                heartWishList.children[0].innerText = JSON.parse(localStorage.getItem("allcompusedwishlist2702")).length
                e.target.classList.add("fa-solid");
                e.target.style.display = 'block';
                e.target.style.opacity = '1';
                e.target.style.fontSize = 'clamp(1rem, 2vw,3rem)';
            }))
        }
    }

    //CATEGORIAS
    for (let divs of CategoryListProducts) {
        for (let div of divs.children) {
            var heartIcon = div.querySelector('i.far')
            let id = div.querySelector("p#describe").attributes.value.value
            if (wishList != null) {
                heartWishList.children[0].innerText = qntdWishList
                let value = wishList.filter((value) => { return value == id })
                if (value == id) {
                    heartIcon.classList.add("fa-solid")
                    heartIcon.style.display = 'block'
                    heartIcon.style.opacity = '1'
                    heartIcon.style.fontSize = 'clamp(1rem, 2vw,3rem)'
                }
            }
            else heartWishList.children[0].innerText = 0;
            for (let divs of CategoryListProducts) {
                divs.querySelectorAll('div').forEach((e) => e.addEventListener('click', (e) => {
                    heartWishList.children[0].innerText = JSON.parse(localStorage.getItem("allcompusedwishlist2702")).length
                    e.target.classList.add("fa-solid")
                    e.target.style.display = 'block';
                    e.target.style.opacity = '1';
                    e.target.style.fontSize = 'clamp(1rem, 2vw,3rem)';
                }))
            }
        }
    }
}

export async function openWishList() {
    heartWishList.children[0].innerText = qntdWishList
    // ABRIR A BOX PARA EXIBIR A LISTA DE PRODUTOS.
    var wishList = JSON.parse(localStorage.getItem("allcompusedwishlist2702"));
    //CRIAR A LISTA DE DESEJOS
    if (wishList != null && wishList.length != 0) {
        container.style.display = 'flex'
        document.querySelector('.container-modals .box-wishlist .table ').style.display = 'block'
        document.querySelector("#messageWishList").style.display = 'none'
        document.querySelector(".totalWishList").style.display = 'flex'
        document.querySelector('.container-modals .box-wishlist button').style.display = 'block'
        tbody.innerText = ''
        var total = 0; // valor total da box lista de desejos 
        for (let wish of wishList) {
            var product = await getProduct(wish);
            total += product[0].price;

            let tr = document.createElement('tr');
            let td_img = document.createElement('td')
            let img = document.createElement('img')
            let td_name = document.createElement('td')
            let td_price = document.createElement('td')
            let td_remove = document.createElement('td')

            img.setAttribute("style", "width:100%")

            img.src = product[0].src1
            td_name.innerText = product[0].name_product
            td_price.innerText = "R$" + product[0].price.toFixed(2).replace(".", ",")
            td_remove.innerHTML = `<i id="${product[0].id}" style="cursor: pointer; color: darkred"class="fa fa-trash"></i>`

            td_remove.addEventListener('click', () => {
                wishList.filter((e, i) => {
                    if (e == td_remove.children[0].id) {
                        wishList.splice(i, 1);
                        tbody.removeChild(tr);
                        total -= parseFloat(td_price.innerText.replace("R$", '').replace(",", "."))
                        localStorage.setItem('allcompusedwishlist2702', JSON.stringify(wishList))
                    }
                    document.getElementById("totalWishList").innerText = " R$" + total.toFixed(2).replace(".", ",")
                })
            })

            td_img.appendChild(img)
            tr.appendChild(td_img)
            tr.appendChild(td_name)
            tr.appendChild(td_price)
            tr.appendChild(td_remove)
            tbody.appendChild(tr)
        }
        document.getElementById("totalWishList").innerText = " R$" + total.toFixed(2).replace(".", ",")
    } else {
        modalWarning("Você ainda não adicionou nenhum produto a sua lista de desejos.", 2)
    }
    closeContainer.addEventListener("click", () => {
        container.style.display = 'none'
        window.location.reload()
    })
}

export async function showQntdCart() {
    updateNumberCartAndWishlist();
    if (cart != null) {
        iconCart.children[0].innerText = qntdCart
    } else iconCart.children[0].innerText = 0;

    if (wishList != null) heartWishList.children[0].innerText = qntdWishList
    else heartWishList.children[0].innerText = 0
}

function updateNumberCartAndWishlist() {
    var wishList = JSON.parse(localStorage.getItem("allcompusedwishlist2702"))
    var cart = JSON.parse(localStorage.getItem("laskhj798u32y42hidsa"))
    if (wishList != null) qntdWishList = wishList.length;
    else qntdWishList = 0;

    if (cart != null) qntdCart = cart.length;
    else qntdCart = 0;
}


export async function openCart() {
    iconCart.children[0].innerText = qntdCart
    // ABRIR A BOX PARA EXIBIR A LISTA DE PRODUTOS.
    var cart = JSON.parse(localStorage.getItem("laskhj798u32y42hidsa"));
    //CRIAR A LISTA DE DESEJOS
    if (cart != null && cart.length != 0) {
        window.location.href = '/index.html?p=NEVE%ASD%C3%81TADSCO%20PASADDASRA%S&CART=ON&id=124'
    } else {
        modalWarning("Você ainda não adicionou produtos ao carrinho", 2)
    }
    closeContainer.addEventListener("click", () => {
        container.style.display = 'none'
        window.location.reload()
    })
}

export function actionSearch() {
    let buttonSearch = document.querySelector('header .secondHeader .search i');
    let inputSearch = document.querySelector('header .secondHeader .search input');
    buttonSearch.addEventListener('click', action);

    inputSearch.addEventListener('keypress', (e) => {
        if (e.which == 13) {
            action()
        }
    })


    function action() {
        if (inputSearch.value != '') {
            window.location.href = `/search.html?p=${inputSearch.value}`
        } else {
            modalWarning('Digite um nome de um produto para realizar uma busca.', 1)
        }
    }
}


export function modalWarning(message, type) {
    const body = document.querySelector('body')

    let container = document.createElement('div');
    let box = document.createElement('div');
    let typeIcon = document.createElement('i');
    let span = document.createElement('span')

    let classIcon;
    let color;
    if (type == 3) {
        classIcon = 'fa fa-plus';
        color = "#009ee3"
    }
    else if (type == 2) {
        classIcon = 'fa fa-exclamation'
        color = "orange"
    }
    else {
        classIcon = 'fa fa-ban';
        color = 'darkred'
    }

    //style
    container.setAttribute('style', "width: 100vw;height: 100vh;background-color: #24242440;display: grid;place-items:center;position:fixed;z-index:999;top:0;opacity: 0;transition: .3s;")
    box.setAttribute('style', `width: 30%;height: 15%;padding:1rem;display:flex;align-items:center;background: white;border: 1px solid ${color};box-shadow: 1px 1px 10px ${color}`)
    span.setAttribute('style', `color: #242424;font-size:clamp(1rem,1.2vw,4rem);font-weight:bold`)
    typeIcon.setAttribute('style', `color:${color};font-size:clamp(1rem,3vw,4rem);margin: 0 2rem`)
    typeIcon.setAttribute('class', classIcon)

    span.innerText = message

    container.style.opacity = '1'
    setTimeout(() => {
        container.style.opacity = '0'
        setTimeout(() => {
            container.style.display = 'none'
        }, 500)
    }, 2000);

    box.appendChild(typeIcon)
    box.appendChild(span)
    container.appendChild(box)
    body.appendChild(container)
}


export function closeModalAboutUs() {
    let close = document.querySelector('span#close-modal-about-us');
    close.addEventListener('click', () => containerAboutUs.style.display = 'none')
}

