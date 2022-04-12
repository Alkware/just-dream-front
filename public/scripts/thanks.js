import { savePurcharse } from "../Controller/thanksController.js";
const urlparams = new URLSearchParams(window.location.search)

function construtor() {
    backParamsPayment();
}
construtor();


async function backParamsPayment() {
    let payment = urlparams.get('status');
    if (payment != null) {
        var h1 = document.createElement('h1');
        if (payment == 'approved') {
            h1.innerText = "A just dream agradece por sua compra"
            await savePurcharse(2);
        } else if (payment == 'failure') {
            h1.innerText = "infelizmente não conseguimos concluir sua compra. \n Verifique todos os dados e tente novamente."
        } else if(payment == 'pending') {
            h1.innerText = "Estamos aguardando o pagamento do seu produto"
            await savePurcharse(1);
        }
        document.querySelector('body').appendChild(h1);
    }else{
        window.location.href = '/'
    }
    window.history.pushState('http://localhost:5501', 'remove params' , '/thanks.html?')
}