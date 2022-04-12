import { addNewUser, getUser, getUsers } from "../api/user.js";
import { modalWarning } from "../scripts/global.js";


export default async function createNewUserJustDream() {
    var createNewSub = 0;
    let trying = 0;

    async function verifyNumber(n) {
        let users = await getUsers();
        return users.find(e => e.sub == n);
    }

    while (trying < 99) {
        let newSub = Math.random() * (999999 - 100000) + 100000;
        if (typeof await verifyNumber(Math.floor(newSub)) == 'undefined') {
            createNewSub = Math.floor(newSub);
            break;
        }
        trying++;
    }
    if (trying == 99) {
        modalWarning('Sistema de criação de contas indisponivel, entre em contato com suporte para relatar o problema', 1)
    }

    if (createNewSub != 0) {
        var newUser = {
            sub: createNewSub,
            nome: document.querySelector('.container-modals div.modal-form-register input#registerName').value,
            usuario: document.querySelector('.container-modals div.modal-form-register input#registerUser').value,
            senha: document.querySelector('.container-modals div.modal-form-register input#registerConfirmPass').value,
            compras: '',
            isAdm: 0,
            hasForm: 0,
            lastName: document.querySelector('.container-modals div.modal-form-register input#registerLastName').value,
            cep: document.querySelector('.container-modals div.modal-form-register input#registerCep').value,
            cellPhone: document.querySelector('.container-modals div.modal-form-register input#registerCellNumber').value,
            picture: ''
        }


        if (newUser.nome != '' && newUser.usuario != '' && newUser.senha != '') {
            addNewUser(newUser);
            localStorage.setItem("loggestusersectionvalue-5", JSON.stringify(['skininthenamofdoekdhn', '134345235235256', '2213443143433', newUser.sub, 'createAt', '5', 'true', 'false']))
            return true
        } else return false
    } else return false
}

export async function createNewUserGoogle(user) {
    async function verifyNumber(n) {
        let users = await getUsers();
        return users.find(e => e.sub == n);
    }
    if (typeof await verifyNumber(Math.floor(user.sub)) == 'undefined') {
        var newUser = {
            sub: user.sub,
            nome: user.given_name,
            usuario: user.email,
            senha: user.given_name,
            compras: '',
            isAdm: 0,
            hasForm: 0,
            lastName: user.family_name,
            cep: '',
            cellPhone: '',
            picture: user.picture
        }
        addNewUser(newUser);
        localStorage.setItem("loggestusersectionvalue-5", JSON.stringify(['skininthenamofdoekdhn', '134345235235256', '2213443143433', user.sub, 'createAt', '5', 'true', 'false']))
    } else {
        localStorage.setItem("loggestusersectionvalue-5", JSON.stringify(['skininthenamofdoekdhn', '134345235235256', '2213443143433', user.sub, 'createAt', '5', 'true', 'false']))
        window.location.reload()
    }

}

export async function loggedVerify(sub) {
    var user = await getUser(sub);
    if (user.length != 0) {
        function createPainelLogin() {
            let container = document.querySelector('header .nav-menu')
            let boxLogin = document.querySelector('header .nav-menu div.box-login')
            let logged = document.createElement('div');
            let h2 = document.createElement('h2');
            let img = document.createElement('img');
            let boxOptions = document.createElement('div');
            let li_profire = document.createElement('li');
            let li_adm = document.createElement('li');
            let li_myProduct = document.createElement('li');
            let li_notification = document.createElement('li');
            let li_ask = document.createElement('li');
            let li_out = document.createElement('li');

            logged.setAttribute('class', 'Logged');
            img.setAttribute('id', 'user-picture');
            boxOptions.setAttribute('id', 'box-options');
            boxOptions.setAttribute('class', 'box-options');
            li_adm.setAttribute('id', 'li_adm');
            li_profire.setAttribute('id', 'li_profire');
            li_myProduct.setAttribute('id', 'li_myProduct');
            li_notification.setAttribute('id', 'li_myNotification');
            li_ask.setAttribute('id', 'li_ask');
            li_out.setAttribute('id', 'li_out');

            h2.innerHTML = 'Bem vindo ' + user[0].nome + ' <i class="fa fa-angle-down"></i>'
            img.src = user[0].picture
            li_adm.innerHTML = '<i class="fa-solid fa-unlock-keyhole"></i>  Painel Just Dream';
            li_profire.innerHTML = '<i class="fa-solid fa-id-badge"></i>  Meus dados';
            li_myProduct.innerHTML = '<i class="fa-solid fa-gifts"></i>  Minhas compras';
            li_notification.innerHTML = '<i class="fa-solid fa-bell"></i> Notificações';
            li_ask.innerHTML = '<i class="fa-solid fa-chalkboard-user"></i>  Perguntas';
            li_out.innerHTML = '<i class="fa-solid fa-arrow-right-from-bracket"></i>  Sair';

            //events
            logged.addEventListener('click', () => {
                boxOptions.classList.toggle('show-box-options')
                optionsBoxOptions(boxOptions, user[0].sub);
            })

            container.removeChild(boxLogin)
            logged.appendChild(h2)
            logged.appendChild(img)
            if (user[0].isAdm == 1) boxOptions.appendChild(li_adm)
            boxOptions.appendChild(li_profire)
            boxOptions.appendChild(li_myProduct)
            boxOptions.appendChild(li_notification)
            boxOptions.appendChild(li_ask)
            boxOptions.appendChild(li_out)
            logged.appendChild(boxOptions);
            container.appendChild(logged)
        }
        createPainelLogin();
        return true
    } else {
        return false
    }
}
//Função chamada dentro da função loggedVerify
function optionsBoxOptions(boxOptions, sub) {
    let options = [...boxOptions.children]

    options.forEach(e => e.addEventListener('click', () => {
        switch (e.id) {
            case 'li_adm': { window.location.href = `/jd/admin.html?tokenID=3484623476284623&tryandtry=127365&text=${sub}&isAvalible=true`; break; }
            case 'li_profire': {window.location.href = '/profile.html?id-section=128254234246456456243434&action=my-profile&helper=13845723846234532462134234&id='+sub;break;}
            case 'li_myProduct':{window.location.href = '/profile.html?id-section=128254234246456456243434&action=my-buy&helper=13845723846234532462134234&id='+sub;break;}
            case 'li_ask':{window.location.href = '/profile.html?id-section=128254234246456456243434&action=my-question&helper=13845723846234532462134234&id='+sub;break;}
            case 'li_out': {
                localStorage.removeItem('loggestusersectionvalue-5')
                window.location.reload();
                break;
            }
            default: modalWarning("Serviço indisponivel no momento, tente novamente mais tarde", 1)
        }
    }))

}

//função que define qual modal será criada(login/criar conta) após o usuario clicar em uma das opções da modal login
export function createElementForModalLogin(isLogin) {
    const modalLogin = document.querySelector('.container-modals.container-login div.modal-login');
    modalLogin.innerHTML = ''
    if (!isLogin) {
        let spanCloseLogin = document.createElement('span')
        let pTitle = document.createElement('p');
        let h3Title = document.createElement('h3');
        let buttonCrearJD = document.createElement('button');
        let hrLine = document.createElement('hr');
        let divButtonGoogle = document.createElement('div');

        spanCloseLogin.setAttribute('id', 'closeLogin');
        buttonCrearJD.setAttribute('id', 'jd');
        buttonCrearJD.setAttribute('class', 'button');
        divButtonGoogle.setAttribute('id', 'buttonDiv');

        spanCloseLogin.innerText = "X";
        pTitle.innerText = 'Crie uma conta em nossa loja e tenha acesso a todas as opções que sua compra pode oferecer.'
        h3Title.innerText = 'Como deseja criar sua conta:'
        buttonCrearJD.innerText = 'Criar com a Just Dream'

        modalLogin.appendChild(spanCloseLogin);
        modalLogin.appendChild(pTitle)
        modalLogin.appendChild(h3Title)
        modalLogin.appendChild(buttonCrearJD)
        modalLogin.appendChild(hrLine)
        modalLogin.appendChild(divButtonGoogle)
    } else {
        let spanCloseLogin = document.createElement('span')
        let h3Title = document.createElement('h3');
        let inputUser = document.createElement('input');
        let inputPass = document.createElement('input');
        let buttonLogin = document.createElement('button');



        spanCloseLogin.setAttribute('id', 'closeLogin');
        inputUser.setAttribute('id', 'userLogin');
        inputPass.setAttribute('id', 'passLogin');
        buttonLogin.setAttribute('id', 'jdLogin');
        buttonLogin.setAttribute('class', 'button');
        inputPass.setAttribute('type', 'password')


        spanCloseLogin.innerText = "X";
        h3Title.innerText = 'Faça seu login'
        buttonLogin.innerText = 'Entrar'


        modalLogin.appendChild(spanCloseLogin);
        modalLogin.appendChild(h3Title)
        modalLogin.appendChild(inputUser)
        modalLogin.appendChild(inputPass)
        modalLogin.appendChild(buttonLogin)
    }
}

export async function doLogin() {
    let users = await getUsers();
    let user = document.querySelector('div.modal-login input#userLogin').value
    let pass = document.querySelector('div.modal-login input#passLogin').value
    users.forEach(e => {
        if (e.usuario == user && e.senha == pass) {
            localStorage.setItem("loggestusersectionvalue-5", JSON.stringify(['skininthenamofdoekdhn', '134345235235256', '2213443143433', e.sub, 'createAt', '5', 'true', 'false']))
            window.location.href = '/'
        }
    })
}