const baseUrl = "http://localhost:3001";
const url = baseUrl+"/order/"

//search all orders
export async function getOrders(){
    const orders = await axios.get(url).catch(err => console.error({message: err}))
    return orders
}

//search one order
export async function getOrder(sub){
    const orders = await axios.get(url+"/"+sub).catch(err => console.error({message: err}))
    return orders
}

// add new order
export async function addNewOrder(order){
    await axios.post(url, order).then(()=>{})
    .catch(err => console.error({message: err}))
}