import { getUsers } from "../api/user.js";
import { getOrders } from "../api/order.js"
import { createRowTableClient, createRowTableOrder } from "./helpers/painelHelper.js";

export async function showAllClients() {
    var tBody = document.querySelector('div.content div.modal-clients div.table table tbody')
    var users = await getUsers();
    tBody.innerHTML = ''
    let clientNumbers = 0
    for (let user of users) {
        createRowTableClient(user);
        clientNumbers++
    };
    return clientNumbers
}
export async function showAllOrders() {
    var tBody = document.querySelector('div.content div.modal-orders div.table table tbody')
    var orders = await getOrders();
    tBody.innerHTML = ''
    let clientNumbers = 0
    for (let order of orders.data) {
        createRowTableOrder(order);
        clientNumbers++
    };
    return clientNumbers
}