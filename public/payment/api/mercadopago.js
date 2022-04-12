const baseUrl = "http://localhost:3001";
const urlPayment = baseUrl+'/payment'

export default async function createPayment(preference){
     await axios.post(urlPayment, preference)
    .then((res) => {
        window.location.href = res.data.init_point;
    })
    .catch((error) =>{
        console.log(error);
    })
}