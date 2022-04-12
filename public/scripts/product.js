import { getComments } from '../api/coments.js';
import { getModel } from '../api/models.js';
import { getProduct } from '../api/product.js';
import { navigationMenu, showQntdCart, showWishList, modalWarning, actionSearch, initConfig } from './global.js';
import { createElementsComents, createComment } from '../Controller/productController.js';
import { getUser } from '../api/user.js';

const urlParams = new URLSearchParams(window.location.search);
const idProduct = urlParams.get('id');
const product = {
    orders: document.querySelector('.content .info #number-orders'),
    smallImgs: [{
        src1: document.querySelector('.content .small-imgs img#img1'),
        src2: document.querySelector('.content .small-imgs img#img2'),
        src3: document.querySelector('.content .small-imgs img#img3'),
        src4: document.querySelector('.content .small-imgs img#img4'),
    }],
    bigImg: document.querySelector('.content .big-img video'),
    name: document.querySelector('.content .info h1#name'),
    describe: document.querySelector('.content .info span#describe'),
    oldPrice: document.querySelector('.content .info div span#old_price'),
    price: document.querySelector('.content .info div > span#price'),
    model: document.querySelector('.content .info div#models')
}

async function init() {
    initConfig();
    fillPageProduct()
    await fillComentsPage();
    navigationMenu();
    buttonsEvents();
    showWishList();
    showQntdCart();
    actionSearch();
    crearComments();
}
init();

// fill product's data in the page
async function fillPageProduct() {
    const data = await getProduct(idProduct);
    const models = await getModel(data[0].id);

    product.orders.textContent = `Novo | ${Math.floor((data[0].buy * (data[0].price / 13) + (data[0].old_price / 5)))} Vendidos nos últimos 14 dias`
    product.smallImgs[0].src1.src = data[0].src1;
    product.smallImgs[0].src2.src = data[0].src2;
    product.smallImgs[0].src3.src = data[0].src3;
    product.smallImgs[0].src4.src = data[0].src4;
    product.bigImg.src = data[0].video1;
    product.name.textContent = data[0].name_product.charAt(0).toUpperCase() + data[0].name_product.slice(1).toLowerCase();
    product.describe.textContent = data[0].describe_product
    product.oldPrice.textContent = "R$" + (data[0].old_price).toFixed(2).replace(".", ",")
    product.price.textContent = "R$" + (data[0].price / 12).toFixed(2).replace(".", ",")

    //fill models
    for (let model of models) {
        let modelDiv = document.createElement('div');
        let img = document.createElement('img');
        let typeModel = document.createElement('span');

        // 
        //
        // CRIAR UM MODO DE SELECIONAR O MODELO QUE O USUARIO SELECIONOU.
        //
        //
        modelDiv.addEventListener('click', (e) => {
            let models_div = document.querySelectorAll('main .content .info #models div');
            models_div.forEach(e => e.classList.remove('active'));
            e.target.closest('div').classList.add('active')
            saveProductInCart(e.target.closest('div').querySelector('span').textContent)
        })

        img.src = model.url
        typeModel.innerText = model.model
        modelDiv.appendChild(img);
        modelDiv.appendChild(typeModel);
        product.model.appendChild(modelDiv);
    }

}
//fill all coments about product
async function fillComentsPage(){
    const containerFeedbacks = document.querySelector('.container-every-things .feedbacks .clients-feedbacks')
    const comments = await getComments(idProduct)
    for(let comment of comments){
        containerFeedbacks.appendChild(createElementsComents(comment));
    }
}

function buttonsEvents() {
    document.getElementById("buttonAddToCart").addEventListener('click', () => {
        saveProductInCart(null);
        document.getElementById("buttonAddToCart").disabled = true;
        document.getElementById("buttonAddToCart").style.opacity = '.5';
        document.getElementById("buttonAddToCart").style.cursor = 'default';
        window.scrollTo(0, 0)
    });
    document.querySelector(".content div.button button").addEventListener('click', () => {
        saveProductInCart(null);
        let models_div = [...document.querySelectorAll('main .content .info #models div')];
        var modelActive = models_div.filter(e => e.classList == 'active');
        if (modelActive.length == 1) window.location.href = '/checkout.html?p=mshdfj-jhisagd-jgsdajhsdg-hjsgduyhas-&q=2'
        else modalWarning("Selecione um modelo antes de efetuar a compra.", 2);
    });
}

function saveProductInCart(hasModel) {
    var products = JSON.parse(localStorage.getItem('laskhj798u32y42hidsa'));
    var cart = [];
    if (products != null) {
        for (let product of products) {
            cart.push({ id: product.id, q: product.q, model: product.model });
        }
    }
    //  VERIFICA SE TEM DOIS VALORES IGUAIS
    var id = urlParams.get('id')
    if (id != null) {
        if (cart.length != 0) {
            let isEqual = false;
            cart.find(e => {
                if (e.id == id) {
                    isEqual = true
                    return
                }
            })
            if (!isEqual) {
                cart.push({ id: id, q: 1, model: hasModel })
                modalWarning('Produto adicionado ao carrinho com sucesso!', 3);
            } else {
                var index = cart.findIndex(e => e.id == id)
                if (hasModel != null) cart[index].model = hasModel
            }
        } else {
            modalWarning('Produto adicionado ao carrinho com sucesso!', 3);
            cart.push({ id: id, q: 1, model: hasModel })
        }
    }
    localStorage.setItem('laskhj798u32y42hidsa', JSON.stringify(cart))
    showQntdCart()
}

function crearComments(){
    let textArea = document.querySelector('section.feedbacks div#your-feedback textarea#feedback');
    let btnFirstSend = document.querySelector('section.feedbacks div#your-feedback button.button');
    let btnLastSend = document.querySelector('section.feedbacks div.box-crear-feedback div.feedback button.button');
    let containerModalFeedback = document.querySelector('section.feedbacks div.box-crear-feedback');
    let stars = document.querySelectorAll('section.feedbacks div.box-crear-feedback div.feedback .notes i');
    var selectStar = 0
    btnFirstSend.addEventListener('click' , ()=> {
        if(textArea.value != ''){
            containerModalFeedback.style.display = 'flex'
            stars.forEach(star => star.addEventListener('click', ()=>{
                stars.forEach(s => {s.classList.remove('fas');s.classList.add('far');s.style.color = 'inherit'})
                selectStar = star.textContent;
                star.classList.add('fas')
                star.style.color = 'var(--AzulMain)'
            }))
            callModal();
        }else{
            modalWarning('Digite seu comentario', 2)
        }
    });
    function callModal(){
        btnLastSend.addEventListener('click' ,async ()=>{
            const subUser = JSON.parse(localStorage.getItem('loggestusersectionvalue-5'))
            const user = await getUser(subUser[3])
            let imgs = document.querySelectorAll('section.feedbacks div.box-crear-feedback div.feedback .imgs input[type=url]');
            let imgsHasValue = []
            if(imgs[0].value != '') imgsHasValue.push(imgs[0])
            if(imgs[1].value != '') imgsHasValue.push(imgs[1])
            if(imgs[2].value != '') imgsHasValue.push(imgs[2]);
            var infoComment = {
                id_product: urlParams.get('id'),
                stars: selectStar,
                name_client: user[0].nome,
                comment: textArea.value,
            }
            if(selectStar != 0) createComment(infoComment, imgsHasValue);
            else modalWarning("Selecione uma nota para o produto", 2)
        })
    }
    
}

