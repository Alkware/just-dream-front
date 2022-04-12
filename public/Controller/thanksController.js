import { addNewOrder } from "../api/order.js";
import { getProduct } from "../api/product.js";
const itens = JSON.parse(localStorage.getItem('laskhj798u32y42hidsa'));
const loggest = JSON.parse(localStorage.getItem('loggestusersectionvalue-5'));
const data = new Date();

// save purcharse
export async function savePurcharse(status){
    for(let item of itens){
        var product = await getProduct(item.id);
        const day = data.getDay() + product[0].delivery_time
        data.setDate(data.getDate() + day);

        const order = {
            id_product: product[0].id,
            sub_user: loggest != null? loggest[3]:0,
            name_product: product[0].name_product,
            model_product: '',
            qntd_product: item.q,
            price_product: Number(product[0].price),
            delivery_time: new Intl.DateTimeFormat("pt-BR", {day: 'numeric', month: 'long', year:'numeric'}).format(data),
            status: status
        }    
        await addNewOrder(order);
    }
}


