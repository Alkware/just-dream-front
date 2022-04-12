const baseUrl = "http://localhost:3001";
const url = `${baseUrl}/models`


//get one model
export async function getModel(id){
    const model = await axios.get(`${url}/${id}`).catch(err => console.err(err))
    return model.data
}
//get one model
export async function getUniqueModel(id, typeModel){
    const model = await axios.get(`${url}/${id}`).catch(err => console.err(err))
    return model.data
}

//add model
export async function addModel(model){
    await axios.post(url , model).catch(err => console.error(err));
}