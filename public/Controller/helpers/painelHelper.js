import { updateUser, getUser } from "../../api/user.js";

export function createRowTableClient(user) {
    var tBody = document.querySelector('div.content div.modal-clients div.table table tbody')
    let tr = tBody.insertRow();

    let td_id = tr.insertCell();
    let td_name = tr.insertCell();
    let td_email = tr.insertCell();
    let td_buy = tr.insertCell();
    let td_dcc = tr.insertCell();
    let td_config = tr.insertCell();

    if(user.isAdm == true) {
        td_id.setAttribute('style', 'color: blue; font-weight:700')
        td_name.setAttribute('style', 'color: blue;font-weight:700')
        td_email.setAttribute('style', 'color: blue;font-weight:700')
        td_buy.setAttribute('style', 'color: blue;font-weight:700')
        td_dcc.setAttribute('style', 'color: blue;font-weight:700')
    }
    td_id.innerText = user.id
    td_name.innerText = user.nome
    td_email.innerText = user.usuario
    td_buy.innerText = user.compras
    td_dcc.innerText = user.createdAt
    td_config.innerHTML = '<i class="fa fa-wrench" value="product" id="iconConfig"></i>'
    td_config.addEventListener('click', () => createEventRowTableClient(user));
}
export async function createRowTableOrder(order) {
    var tBody = document.querySelector('div.content div.modal-orders div.table table tbody');
    var clientName = await getUser(order.sub_user);
    let tr = tBody.insertRow();

    let td_id = tr.insertCell();
    let td_client = tr.insertCell();
    let td_product = tr.insertCell();
    let td_qntd = tr.insertCell();
    let td_price = tr.insertCell();
    let td_date = tr.insertCell();
    let td_delivery = tr.insertCell();
    let td_status = tr.insertCell();
    let td_action = tr.insertCell();

    td_id.innerText = order.id
    td_client.innerText = clientName.length != 0?clientName[0].nome : "Sem Registro"
    td_product.innerText = order.name_product
    td_qntd.innerText = order.qntd_product
    td_price.innerText = order.price_product //"2022-04-05T12:14:15
    td_date.innerText = order.createdAt.replace('T', ' \n (').replace('.000Z', ')')
    td_delivery.innerText = order.delivery_time
    td_status.innerText = order.status == 1? "Pendente":"Aprovado"
    td_action.innerHTML = '<i class="fa fa-wrench" value="product" id="iconConfig"></i>'
    td_action.addEventListener('click', () => createEventRowTableClient(user));
}

export function createEventRowTableClient(user) {
    var containerModalForm = document.querySelector('.container-modals.container-products')
    containerModalForm.style.display = 'grid'
    var boxModal = containerModalForm.querySelector('div.box-modal');
    boxModal.innerHTML = ''

    //create the elements
    let fieldset = document.createElement('fieldset')
    let span_close = document.createElement('span');
    let span_sub = document.createElement('span');
    let input_name = document.createElement('input');
    let input_lasName = document.createElement('input');
    let input_usuario = document.createElement('input');
    let input_senha = document.createElement('input');
    let input_adm = document.createElement('input');
    let input_cep = document.createElement('input');
    let input_cell = document.createElement('input');
    let input_photo = document.createElement('input');

    span_close.setAttribute('id', 'span_close');
    span_sub.setAttribute('id', 'span_sub');
    input_name.setAttribute('id', 'input_name');
    input_usuario.setAttribute('id', 'input_usuario');
    input_senha.setAttribute('id', 'input_senha');
    input_adm.setAttribute('id', 'input_adm');
    input_lasName.setAttribute('id', 'input_lasName');
    input_cep.setAttribute('id', 'input_cep');
    input_cell.setAttribute('id', 'input_cell');
    input_photo.setAttribute('id', 'input_photo');

    span_close.innerText = 'X'
    span_sub.innerText = "ID identificação: " + user.sub
    input_name.value = user.nome
    input_usuario.value = user.usuario
    input_senha.value = user.senha.substr(0,3)+"*****"
    input_adm.value = user.isAdm
    input_lasName.value = user.lastName
    input_cep.value = user.cep
    input_cell.value = user.cellPhone
    input_photo.value = user.picture

    //events
    
    fieldset.appendChild(span_close);
    fieldset.appendChild(span_sub);
    fieldset.appendChild(input_name);
    fieldset.appendChild(input_lasName);
    fieldset.appendChild(input_usuario);
    fieldset.appendChild(input_senha);
    fieldset.appendChild(input_adm);
    fieldset.appendChild(input_lasName);
    fieldset.appendChild(input_cep);
    fieldset.appendChild(input_cell);
    fieldset.appendChild(input_photo);

    span_close.addEventListener('click', () => {containerModalForm.style.display = 'none';saveDataUser(fieldset)})
    
    boxModal.appendChild(fieldset);
}

async function saveDataUser(fieldset){
    const userUpdate = {
        sub: fieldset.querySelector('span#span_sub').innerText.replace('ID identificação: ',''),
        nome: fieldset.querySelector('input#input_name').value,
        usuario: fieldset.querySelector('input#input_usuario').value,
        isAdm: fieldset.querySelector('input#input_adm').value,
        lastName: fieldset.querySelector('input#input_lasName').value,
        cep: fieldset.querySelector('input#input_cep').value,
        cellPhone: fieldset.querySelector('input#input_cell').value,
        picture: fieldset.querySelector('input#input_photo').value,
    }
    await updateUser(userUpdate.sub, userUpdate)
}