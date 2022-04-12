const baseUrl = "http://localhost:3001";
const url_allProducts = `${baseUrl}/product`;
const urlProductsCategory = `${baseUrl}/product`;
const urlProduct = `${baseUrl}/product`;
const seachProducts = `${baseUrl}seach-products`;
const urladdProducts = `${baseUrl}addproducts`;
const urlProductsOffen = `${baseUrl}/product/offen`;
const urlDeleteProduct = `${baseUrl}delele-product`;
const urlUpdateProduct = `${baseUrl}update-product`;
const urlCountProducts = `${baseUrl}count-product`

// search all products or only offen products
export default async function getProducts(offen) {
    let url = url_allProducts;
    if (offen) url = urlProductsOffen;
    const resp = await axios.get(url).catch(err => console.error(err))
    return resp.data
}

// search a product
export async function getProduct(id) {
    const resp = await axios.get(`${urlProduct}/${id}`).catch(err => console.error(err))
    return resp.data
}
export async function searchProducts(product) {
    const resp = await axios.get(`${seachProducts}/${product}`).catch(err => console.error(err))
    return resp.data
}

export async function getProductsCategory(category, order){
    const res = await axios.get(`${urlProductsCategory}/${category}/${order}`).catch(err => console.log(err));
    return res.data
}

export function addNewProduct(newProduct) {
    axios.post(urladdProducts, newProduct).then(res => {
        return res.data.message
    }).catch(err => console.error(err))
}

export function deleteProduct(id){
    axios.delete(`${urlDeleteProduct}/${id}`).then(res =>{
        console.log("deletou" + res)
    }).catch(err => console.log(err));
};


export function configProduct(id, product){
    axios.get(`${urlProduct}/${id}`).then(response => {
        product.id.innerText = response.data[0].id
        product.idWoo.value = response.data[0].idWoo
        product.nameProduct.value = response.data[0].name_product
        product.describeProduct.value = response.data[0].describe_product
        product.oldPrice.value = response.data[0].old_price
        product.price.value = response.data[0].price
        product.category.textContent = response.data[0].category
        product.offen.value = response.data[0].offen
        product.video1.value = response.data[0].video1
        product.video2.value = response.data[0].video2
        product.img1.value = response.data[0].src1
        product.img2.value = response.data[0].src2
        product.img3.value = response.data[0].src3
        product.img4.value = response.data[0].src4
        product.button.textContent = "Salvar"
    }).catch(err => console.log(err));   
}

export async function countProduct(category){
    const res = await axios.get(`${urlCountProducts}/${category}`).catch(err => console.error(err));
    return res
}

export function updateProduct(id, productUpdated){
    axios.put(`${urlUpdateProduct}/${id}`, productUpdated).then(response =>{
        console.log(response.data)
    }).catch(error => console.log(error))
}