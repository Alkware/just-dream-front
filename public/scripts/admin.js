import { getUser } from '../api/user.js'
const loading = document.querySelector('.loading');
const container = document.querySelector('.container');
const urlParams = new URLSearchParams(window.location.search)

window.addEventListener('load', () => {
    setTimeout(() => {
        loading.style.display = 'none';
        container.style.display = 'flex';
    }, 2000)
})


// FUNÇÃO DE LOGIN OU SENHA ERRADA!
const boxLogin = document.querySelector('input[type="text"]')
const boxPassword = document.querySelector('input[type="password"]')
const errorMessage = document.querySelector('#errorMessage')
const button = document.querySelector('input[type="submit"]')

button.addEventListener('click', async (e) => {
    e.preventDefault()
    let user = await getUser(urlParams.get('text'))
    if (user.length != 0) {
        if (user.isAdm == 0) {
            window.location.href = '/'
        } else {
            if (boxLogin.value == user[0].usuario && boxPassword.value == user[0].senha) {
                localStorage.setItem('ailujohlavrac', 'sepolsuseje16035')
                window.location.href = '/jd/painel.html'
            } else {
                errorMessage.style.display = 'block'
            }
        }
    } else {
        window.location.href = '/'
    }
})


