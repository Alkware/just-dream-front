import { showAllClients, showAllOrders } from '../Controller/painelController.js';
import getProducts from '../api/product.js';
import { addNewProduct, deleteProduct, countProduct, configProduct, updateProduct} from '../api/product.js';
import {addNewCategory, getCategories, configCategory, updateCategory } from '../api/category.js';

const container = document.querySelector('.container');
container.style.display = 'none'

async function init(){
    await getProducts()
}

init();

window.addEventListener('load', () => {
    const acess = localStorage.getItem('ailujohlavrac')
    if (acess === "sepolsuseje16035" || acess != null) {
        container.style.display = 'grid'
        localStorage.removeItem('ailujohlavrac')
        const containerModalProducts = document.querySelector(".container-modals.container-products")
        const containerModalCategory = document.querySelector(".container-modals.container-category")
        const buttonAddProduct = document.querySelector("button#add_product");
        const buttonAddCategory = document.querySelector("button#add_category");
        const nav = document.querySelectorAll('.nav ul li');
        const buttonNewProduct = document.querySelector('.container .content .modal-products button');
        const products = document.querySelector('.container .content .modal-products');
        const categories = document.querySelector('.container .content .modal-categories');
        const clients = document.querySelector('.container .content .modal-clients');
        const orders = document.querySelector('.container .content .modal-orders');
        const settings = document.querySelector('.container .content .modal-settings');
        const loading = document.querySelector('.container .content .loading');

        /*******
         *  Função de navegação para o usuario
         ***********/
        nav.forEach(e => {
            e.addEventListener('click', async (event) => {
                products.classList.remove('show-modal')
                categories.classList.remove('show-modal')
                clients.classList.remove('show-modal')
                orders.classList.remove('show-modal')
                settings.classList.remove('show-modal')
                switch (event.target.id) {
                    case "fire-products":
                        loading.style.display = 'block'
                        setTimeout(() => {
                            loading.style.display = 'none'
                            buttonNewProduct.style.visibility = 'hidden';
                            products.classList.add('show-modal');
                            listAllProducts(true);
                            defineProduct()
                        }, 1500);
                        break;
                    case "stock":
                        loading.style.display = 'block'
                        listAllProducts(false);
                        setTimeout(() => {
                            defineProduct();
                            setTimeout(() => {
                                loading.style.display = 'none'
                                buttonNewProduct.style.visibility = 'visible';
                                products.classList.add('show-modal')
                            }, 1800);
                        }, 1000);
                        break;
                    case "categories":
                        loading.style.display = 'block'
                        listAllCategories()
                        setTimeout(() => {
                            defineProduct();
                            setTimeout(() => {
                                loading.style.display = 'none'
                                buttonNewProduct.style.visibility = 'visible';
                                categories.classList.add('show-modal');
                            }, 1800);
                        }, 1000);
                        break;
                    case "clients":
                        clients.classList.add('show-modal');
                        event.target.innerHTML = "<i class=\"fa-solid fa-user-group\"></i> Clientes (" + await showAllClients() + ')';
                        break;
                    case "orders":
                        orders.classList.add('show-modal');
                        event.target.innerHTML = "<i class=\"fa-solid fa-arrow-up-wide-short\"></i> Pedidos (" + await showAllOrders() + ')';
                        break;
                    case "settings":
                        settings.classList.add('show-modal')
                        break;
                }
            })
        });

        //Abre a modal para adicionar um novo usuario
        new_product.addEventListener('click', () => {
            document.querySelector('input#idWoo').value = ''
            document.querySelector("input#nameProduct").value = ''
            document.querySelector("input#describeProduct").value = ''
            document.querySelector("input#oldPrice").value = ''
            document.querySelector("input#price").value = ''
            document.querySelector("input#video1").value = ''
            document.querySelector("input#video2").value = ''
            document.querySelector("input#img1").value = ''
            document.querySelector("input#img2").value = ''
            document.querySelector("input#img3").value = ''
            document.querySelector("input#img4").value = ''
            document.querySelector("input#offen").value = ''

            var select = document.querySelector(".box-modal form select");
            select.innerHTML = ''
            getCategories().then(res => {
                let data = res;
                for (let category of data) {
                    let option = document.createElement('option');
                    option.setAttribute('value', category.nome)
                    option.innerText = category.nome;
                    select.appendChild(option);
                }
            })

            containerModalProducts.style.display = 'grid'
        });
        // adiciona um novo produto na api
        buttonAddProduct.addEventListener('click', (ev) => {
            const newProduct = {
                idWoo: document.querySelector('input#idWoo').value,
                name_product: document.querySelector("input#nameProduct").value.toUpperCase(),
                describe_product: document.querySelector("input#describeProduct").value,
                old_price: parseFloat(document.querySelector("input#oldPrice").value),
                price: parseFloat(document.querySelector("input#price").value),
                category: document.querySelector(".box-modal form select").value,
                offen: document.querySelector("input#offen").value,
                video1: document.querySelector("input#video1").value,
                video2: document.querySelector("input#video2").value,
                src1: document.querySelector("input#img1").value,
                src2: document.querySelector("input#img2").value,
                src3: document.querySelector("input#img3").value,
                src4: document.querySelector("input#img4").value,
            }
            ev.preventDefault();
            if (ev.target.innerText != "Salvar") {
                addNewProduct(newProduct);
                loading.style.display = 'block'
                products.style.visibility = 'hidden'
                containerModalProducts.style.display = 'none'
                setTimeout(() => {
                    listAllProducts(false)
                    products.style.visibility = 'visible'
                    loading.style.display = 'none'
                }, 2000)
            } else {
                let idOcult = document.querySelector("span#idOcult").textContent
                updateProduct(idOcult, newProduct);
                listAllProducts(false);
                containerModalProducts.style.display = 'none'
                loading.style.display = 'block'
                products.style.display = 'none'
                setTimeout(() => {
                    loading.style.display = 'none'
                    products.style.display = 'block'
                }, 2000);
            }
        });
        new_category.addEventListener('click', () => {
            document.querySelector('input#idWoo').value = ''
            document.querySelector("input#nameProduct").value = ''
            document.querySelector("input#describeProduct").value = ''
            document.querySelector("input#oldPrice").value = ''
            document.querySelector("input#price").value = ''
            document.querySelector("input#video1").value = ''
            document.querySelector("input#video2").value = ''
            document.querySelector("input#img1").value = ''
            document.querySelector("input#img2").value = ''
            document.querySelector("input#img3").value = ''
            document.querySelector("input#img4").value = ''
            document.querySelector("input#offen").value = ''

            var select = document.querySelector(".box-modal form select");
            select.innerHTML = ''
            getCategories().then(res => {
                let data = res;
                for (let category of data) {
                    let option = document.createElement('option');
                    option.setAttribute('value', category.nome)
                    option.innerText = category.nome;
                    select.appendChild(option);
                }
            })

            containerModalCategory.style.display = 'grid'
        });
        buttonAddCategory.addEventListener('click', (ev) => {
            const newCategory = {
                nome: document.querySelector("input#nameCategory").value.toUpperCase(),
                nmr_Produtos: 0,
                background: document.querySelector("input#background").value,
                imgMain: document.querySelector("input#imgMain").value
            }
            ev.preventDefault();
            if (ev.target.innerText != "Salvar") {
                addNewCategory(newCategory);
                loading.style.display = 'block'
                categories.style.visibility = 'hidden'
                containerModalCategory.style.display = 'none'
                setTimeout(() => {
                    listAllCategories()
                    categories.style.visibility = 'visible'
                    loading.style.display = 'none'
                }, 2000)
            } else {
                let idOcult = document.querySelector("span#idOcultCategory").textContent
                updateCategory(idOcult, newCategory)
                listAllCategories();
                containerModalCategory.style.display = 'none'
                loading.style.display = 'block'
                categories.style.display = 'none'
                setTimeout(() => {
                    loading.style.display = 'none'
                    categories.style.display = 'block'
                }, 2000);
            }
        });


        /*******
         *  Função que usa qual icone o usuario clicou e define uma ação
         ***********/
        function defineProduct() {
            const iconProduct = document.querySelectorAll("i#iconConfig");
            const iconDelete = document.querySelectorAll("i.fa-trash");
            iconProduct.forEach(e => e.addEventListener('click', (ev) => executeAction(ev)));
            iconDelete.forEach(e => e.addEventListener('click', (ev) => executeAction(ev)))
            async function executeAction(e) {
                let deleteModal = document.querySelector('.modal-delete');
                let cancelaModal = document.querySelector('.modal-delete .box-delete a');
                let deleteProductModal = document.querySelector('.modal-delete .box-delete button');
                if (e.path[3].id == "tbody_products") {
                    if (e.target.id == "iconConfig") {
                        containerModalProducts.style.display = 'grid'
                        var option = document.createElement('option');
                        document.querySelector(".box-modal form select").appendChild(option);
                        const product = {
                            id: document.querySelector("span#idOcult"),
                            idWoo: document.querySelector('input#idWoo'),
                            nameProduct: document.querySelector("input#nameProduct"),
                            describeProduct: document.querySelector("input#describeProduct"),
                            oldPrice: document.querySelector("input#oldPrice"),
                            price: document.querySelector("input#price"),
                            category: document.querySelector(".box-modal form select option"),
                            offen: document.querySelector("input#offen"),
                            video1: document.querySelector("input#video1"),
                            video2: document.querySelector("input#video2"),
                            img1: document.querySelector("input#img1"),
                            img2: document.querySelector("input#img2"),
                            img3: document.querySelector("input#img3"),
                            img4: document.querySelector("input#img4"),
                            button: document.querySelector("button#add_product"),
                        }
                        configProduct(e.path[2].children[0].textContent, product)
                    } else {
                        deleteModal.style.display = 'flex';
                        cancelaModal.addEventListener('click', () => deleteModal.style.display = 'none')
                        deleteProductModal.addEventListener('click', () => {
                            deleteProduct(e.path[2].children[0].textContent)
                            products.style.visibility = 'hidden'
                            loading.style.display = 'block'
                            setTimeout(() => {
                                deleteModal.style.display = 'none'
                                products.style.visibility = 'visible'
                                loading.style.display = 'none'
                                listAllProducts(false)
                            }, 2000)
                        })
                    }
                } else {
                    if (e.target.id == "iconConfig") {
                        containerModalCategory.style.display = 'grid'
                        const data = await configCategory(e.path[2].children[0].textContent);
                        const category = {
                            id: document.querySelector("span#idOcultCategory").innerText = data.data[0].id,
                            nameProduct: document.querySelector("input#nameCategory").value = data.data[0].nome,
                            img1: document.querySelector("input#background").value = data.data[0].background,
                            img2: document.querySelector("input#imgMain").value = data.data[0].imgMain,
                            button: document.querySelector("button#add_category").innerText = "Salvar"
                        }
                    } else {
                        deleteModal.style.display = 'flex';
                        cancelaModal.addEventListener('click', () => deleteModal.style.display = 'none')
                        deleteProductModal.addEventListener('click', () => {
                            alert('Ainda não foi concluido essa função')
                        })
                    }

                }
            }
        }


        function listAllProducts(offen) {
            tbody_products.innerHTML = ''
            const data = getProducts(offen)
            data.then(res => {
                const data = res;
                for (let product of data) {
                    let tr = tbody_products.insertRow();
                    let td_id = tr.insertCell();
                    let td_name = tr.insertCell();
                    let td_category = tr.insertCell();
                    let td_price = tr.insertCell();
                    let td_buy = tr.insertCell();
                    let td_action = tr.insertCell();
                    td_id.innerText = product.id
                    td_name.innerText = product.name_product
                    td_category.innerText = product.category
                    td_price.innerText = product.price
                    td_buy.innerText = product.buy
                    td_action.innerHTML = '<i class="fa fa-wrench" value="product" id="iconConfig"></i><i class="fa fa-trash" id="iconDelete"></i>'
                }
            })
        }

        function listAllCategories() {
            tbody_categories.innerHTML = ''
            getCategories().then(async (res) => {
                const data = res
                for (let category of data) {
                    let tr = tbody_categories.insertRow();
                    let td_id = tr.insertCell();
                    let td_category = tr.insertCell();
                    let td_qntd = tr.insertCell();
                    let td_createAt = tr.insertCell();
                    let td_action = tr.insertCell();

                    td_id.innerText = category.id
                    td_category.innerText = category.nome
                    td_qntd.innerText = await countProducts(category.nome)
                    td_createAt.innerText = category.createdAt
                    td_action.innerHTML = '<i class="fa fa-wrench" id="iconConfig"></i><i class="fa fa-trash" id="iconDelete"></i>'
                }
            })
        }


        /** 
         * Função responsavel por contar quantos produtos tem em cada categoria;
         */

        async function countProducts(category) {
            const data = await countProduct(category);
            return data.data.length
        }

    } else {
        window.location.href = "/"
    }
});

