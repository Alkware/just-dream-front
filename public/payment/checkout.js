import createPayment from "../payment/api/mercadopago.js";
import { getProduct } from '../api/product.js'
import createListProducts from "../Controller/checkoutController.js";

const products = JSON.parse(localStorage.getItem('laskhj798u32y42hidsa'));
const urlparams = new URLSearchParams(window.location.search)

const mp = new MercadoPago('TEST-3a82a295-34b6-4adc-a27d-d1ee6ab50a2b', {
  locale: 'pt-BR'
});

function construtor() {
  showDateProduct();
  scroolingProduct();
  executePaymentProduct();
}

construtor();

function scroolingProduct() {
  const containerScroll = document.querySelector('section div.product-description')
  var value = containerScroll.scrollLeft
  document.querySelector('section div.product-description i.fa-solid.fa-arrow-right')
    .addEventListener('click', () => {
      value = value + 200
      if (value > containerScroll.scrollWidth) {
        containerScroll.scrollBy(-containerScroll.scrollWidth, 0);
        value = 0
      }
      else containerScroll.scrollBy(300, 0);
    })

}

function showDateProduct() {
  products.forEach(async (product) => {
    createListProducts(product);
    if (products.length == 1) {
      document.querySelector('section div.product-description i.fa-solid.fa-arrow-right').style.display = 'none'
      document.querySelector('section div.product-description .product span.remove').style.display = 'none'
    }
  });
}


function executePaymentProduct() {
  document.querySelector(".button-payment").addEventListener("click", async function (e) {
    var orderData = {
      items: [],
      client: {
        first_name: document.querySelector('form input[data-checkout="first-name"]').value,
        last_name: document.querySelector('form input[data-checkout="last-name"]').value,
        phone: {
          area_code: Number(document.querySelector('form input[data-checkout="cell-number"]').value),
          number: Number(document.querySelector('form input[data-checkout="cell-number"]').value),
        },
        address: {}
      },
      shipments: {
        receiver_address: {
          zip_code: document.querySelector('form input[data-checkout="cep"]').value,
          state_name: document.querySelector('form input[data-checkout="state"]').value,
          city_name: document.querySelector('form input[data-checkout="city"]').value,
          street_name: document.querySelector('form input[data-checkout="street"]').value,
          street_number: Number(document.querySelector('form input[data-checkout="number-house"]').value),
        }
      },
      barcode: {},
      description: "Pagamento em processamento Just Dream: ",
      external_reference: "JD-2021",
      installments: 1,
      metadata: {},
      order: {
        type: "mercadolibre"
      },
      payer: {
        entity_type: "individual",
        type: "customer",
        identification: {
          type: "cpf",
          number: "1234567-89"
        }
      },
      payment_method_id: "visa",
      transaction_amount: 0,
      back_urls: {
        success: "http://localhost:5501/thanks.html?",
        failure: "http://localhost:5501/thanks.html?",
        pending: "http://localhost:5501/thanks.html?"
      },
    };

    // orderData.items.splice(0 , 1)

    var count = 0
    products.forEach(async (item) => {
      var product = await getProduct(item.id);
      orderData.items.push({
        id: product[0].id,
        title: product[0].name_product,
        description: product[0].describe_product,
        picture_url: product[0].src1,
        category_id: product[0].category,
        quantity: item.q,
        unit_price: Number(product[0].price)
      });
      count++
      if (products.length == count) createPayment(orderData)
    });



    // orderData.transaction_amount = Number(product[0].price * item.q)



  });
}

