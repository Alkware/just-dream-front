import { updateUser, getUser } from '../api/user.js'
import { modalWarning } from '../scripts/global.js';

export async function updateProfile(sub) {
    const oldUser = await getUser(sub)

    const user = {
        nome: document.querySelector('main section .box-header-profile input').value,
        usuario: document.querySelector('main section .info-profile input#email').value,
        senha: oldUser[0].senha,
        lastName: document.querySelector('main section .info-profile input#complete-name').value.replace(oldUser[0].nome + " ", ""),
        cep: document.querySelector('main section .info-profile input#cep').value,
        cellPhone: document.querySelector('main section .info-profile input#cell-number').value,
        picture: oldUser[0].picture
    }
    await updateUser(sub, user);
    window.location.reload();
};


export function eventsModalPassword(sub) {
    const button = document.querySelector('.container-modals .modal-password button')
    const inputOldPassword = document.querySelector('.container-modals .modal-password input#old-password')
    const inputNewPassword = document.querySelector('.container-modals .modal-password input#new-password')
    const inputconfirmPassword = document.querySelector('.container-modals .modal-password input#confirm-password')
    button.addEventListener('click' , async ()=> {
        const user = await getUser(sub);
        if(button.textContent != 'Salvar'){
            if(user[0].senha === inputOldPassword.value){
                inputOldPassword.style.display = 'none'
                inputNewPassword.style.display = 'block'
                inputconfirmPassword.style.display = 'block'
                button.textContent = 'Salvar'
            }else{
                modalWarning("Senha inválida" , 1)
            }
        }else{
            if(inputNewPassword.value == inputconfirmPassword.value){
                await updateUser(sub , {senha: inputconfirmPassword.value});
                document.querySelector('.container-modals.container-password').style.display = 'none'
                modalWarning("Senha alterada com sucesso!" , 3)
            }else{
                modalWarning("As senhas não se conhecidem" , 1)
            }
        }
    })
}

export function createModalCancelOrder(nmr){
    let container = document.querySelector('.container-modals.container-cancel-order');
    let text = document.querySelector('.container-modals.container-cancel-order .modal-cancel-order textarea');
    let button = document.querySelector('.container-modals.container-cancel-order .modal-cancel-order button');
    container.style.display = 'flex'
    button.addEventListener('click' , ()=>{
        if(text.value != ''){
            const mensage = `Olá, quero cancelar meu pedido de numero ${nmr}, pelo seguinte motivo: ${text.value}`
            window.location.href = 'https://api.whatsapp.com/send?phone=553592051754&text='+mensage
            text.value = ''
        }else{
            modalWarning("Digite o motivo antes de cancelar sua compra." , 2)
        }
    })
}