import { getOrder } from '../api/order.js';
import { getUser } from '../api/user.js';
import { eventsModalPassword, updateProfile, createModalCancelOrder } from '../Controller/profilecontroller.js';
const urlParams = new URLSearchParams(window.location.search);
const loggest = JSON.parse(localStorage.getItem('loggestusersectionvalue-5'))
var boxProfile = document.querySelector('div.secondHeader div.box-profile');
var boxMyProfile = document.querySelector('main section#my-profile')


async function init() {
    await fillProfile().init();
    tabNavigation();
    selectAction();
    cancelOrder();
}
init();

function fillProfile() {
    var sub = urlParams.get('id');
    if (sub != null) {
        async function fillMyProfile() {
            var user = await getUser(sub);
            var imgProfile = boxProfile.querySelector('img');
            var name = boxProfile.querySelector('span#name-user');
            name.textContent = user[0].nome + " " + user[0].lastName
            imgProfile.src = user[0].picture
            boxMyProfile.querySelector('.box-header-profile #user-name').value = user[0].nome
            boxMyProfile.querySelector('.box-header-profile img').src = user[0].picture
            boxMyProfile.querySelector('.info-profile #email').value = user[0].usuario
            boxMyProfile.querySelector('.info-profile #complete-name').value = user[0].nome + " " + user[0].lastName
            boxMyProfile.querySelector('.info-profile #cep').value = user[0].cep
            boxMyProfile.querySelector('.info-profile #cell-number').value = user[0].cellPhone
            //fill my ask
            showProfileAndEvents();
        }

        async function fillBuy() {
            let tbody = document.querySelector('div.box-my-buy table tbody');
            let orders = await getOrder(loggest[3]);
            tbody.innerHTML = ''
            for (let order of orders.data) {
                let tr = document.createElement('tr');
                let td_order = tr.insertCell();
                let td_qntd = tr.insertCell();
                let td_product = tr.insertCell();
                let td_price = tr.insertCell();
                let td_dateDelivery = tr.insertCell();
                let td_status = tr.insertCell();
                let td_action = tr.insertCell();

                //fill data
                td_order.innerText = order.id
                td_qntd.innerText = order.qntd_product
                td_product.innerText = order.name_product
                td_price.innerText = order.price_product
                td_dateDelivery.innerText = order.delivery_time
                td_status.innerText = order.status == 1 ? "aguardando pagamento" : "Produto a caminho"
                td_action.innerHTML = '<button id="cancel-order">Cancelar compra</button>'
                tbody.appendChild(tr)
            }
        }


        async function init() {
            await fillMyProfile();
            await fillBuy();
        }
        return { init }
    } else {
        localStorage.removeItem('loggestusersectionvalue-5')
        window.location.href = '/'
    }

}


function showProfileAndEvents() {
    var inputs = boxMyProfile.querySelectorAll('input');
    var buttonEdit = boxMyProfile.querySelector('button#edit-profile');
    var buttonChangePassword = boxMyProfile.querySelector('button#edit-password');
    var img = boxMyProfile.querySelector('.box-header-profile img');

    boxProfile.addEventListener('click', () => { boxProfile.querySelector('div#out').classList.toggle('show-profile') });
    //events
    var buttons = boxProfile.querySelectorAll('div#out button');
    buttons[0].addEventListener('click', () => window.location.href = '/');

    buttonEdit.addEventListener('click', async () => {
        if (buttonEdit.textContent == "Salvar") {
            await updateProfile(urlParams.get("id"));
            inputs.forEach(e => { e.disabled = true; e.style.border = 'none' })
            buttonEdit.textContent = "Editar perfil"
        } else {
            inputs.forEach(e => { e.disabled = false; e.style.border = '1px solid #24242450' })
            buttonEdit.textContent = "Salvar"
        }
    });

    buttonChangePassword.addEventListener('click', () => {
        document.querySelector('.container-modals.container-password').style.display = 'flex'
        eventsModalPassword(urlParams.get("id"));
    })
}

// tab navigation profile 
function tabNavigation() {
    // Variables
    const html = {
        links: [...document.querySelector('main div#links').children],
        sections: document.querySelectorAll('main section')
    }

    function hideAllSection() {
        html.sections.forEach(e => e.style.display = 'none')
    }

    function showCurrentSection(ev) {
        hideAllSection();
        const target = ev.currentTarget;
        const id = target.dataset.id
        const section = document.querySelector('section#' + id)
        section.style.display = 'flex'
    }

    function listenTheChange() {
        html.links.forEach(e => e.addEventListener('click', showCurrentSection))
    }


    function init() {
        hideAllSection();
        listenTheChange();
    }

    init();
}

//select what tab navigation will open when the user go to page profile
function selectAction() {
    const links = document.querySelectorAll('main div#links button');
    const action = urlParams.get('action');
    const section = document.querySelector('section#' + action);
    section.style.display = 'flex'
    for (let link of links) {
        if (link.dataset.id == action) {
            link.focus();
        }
    }
}

//function when the user wanna to cancel your order
function cancelOrder() {
    let button = document.querySelectorAll('section#my-buy .box-my-buy tbody td button');
    button.forEach(btn => btn.addEventListener('click' , (e)=>{
        createModalCancelOrder(btn.closest('tr').querySelector('td:first-child').textContent);
    }))
}