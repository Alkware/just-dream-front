import { getProduct } from "../api/product.js";

var valueFinal = 0;
var n = 0
export default async function createListProducts(productsCart) {
    let product = await getProduct(productsCart.id);
    let container = document.querySelector('.product-description');
    
    let remove = document.createElement('span')
    let divProduct = document.createElement('div');
    let divContainerImg = document.createElement('div')
    let imgProduct = document.createElement('img')
    let nameProduct = document.createElement('h2')
    let modalProduct = document.createElement('p')
    let quantify = document.createElement('p')
    let hr1 = document.createElement('hr')
    let price = document.createElement('p')
    let hr2 = document.createElement('hr')

    remove.setAttribute('class', 'remove')
    divProduct.setAttribute('class', 'product')
    divContainerImg.setAttribute('class', 'container-img')
    nameProduct.setAttribute('class', 'name-product-descripton')
    modalProduct.setAttribute('class', 'product-modals')
    quantify.setAttribute('class', 'quantify')
    price.setAttribute('class', 'price')

    remove.innerText = "X"
    imgProduct.src = product[0].src1
    nameProduct.innerText = product[0].name_product
    modalProduct.innerText = "Modelo: "+productsCart.model
    quantify.innerText = "Quantidade: " + productsCart.q
    price.innerText = "R$" + product[0].price.toFixed(2).replace('.', ",");
    
    remove.addEventListener('click', () => {
        let products = JSON.parse(localStorage.getItem('laskhj798u32y42hidsa'));
        if (products.length == 2) {
            document.querySelector('section div.product-description i.fa-solid.fa-arrow-right').style.display = 'none'
            document.querySelectorAll('section div.product-description .product span.remove')
            .forEach(e => e.style.display = 'none')
        }
        
        products.filter((e, i) => {
            if (e.id == product[0].id) {
                products.splice(i, 1);
                localStorage.setItem('laskhj798u32y42hidsa', JSON.stringify(products))
                container.removeChild(divProduct);
                valueFinal -= Number(product[0].price * e.q)
            }
        })

        updateValueFinal(valueFinal)
    })
    
    //calculo para o valor final
    valueFinal += Number(product[0].price * productsCart.q)
    function updateValueFinal(valueFinal){
        document.querySelector("section div.total span#total").innerText = "R$"+valueFinal.toFixed(2).replace('.',',')
    }
    updateValueFinal(valueFinal);
    //fim do calculo para o valor final


    divContainerImg.appendChild(imgProduct);
    divProduct.appendChild(remove)
    divProduct.appendChild(divContainerImg);
    divProduct.appendChild(nameProduct)
    divProduct.appendChild(modalProduct)
    divProduct.appendChild(quantify)
    divProduct.appendChild(hr1)
    divProduct.appendChild(price)
    divProduct.appendChild(hr2)
    container.appendChild(divProduct);
    n++
}


