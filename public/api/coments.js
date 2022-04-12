import { modalWarning } from "../scripts/global.js";

const baseUrl = "http://localhost:3001";
const url = `${baseUrl}/comments`

//get one comment
export async function getComments(id){
    const model = await axios.get(`${url}/${id}`).catch(err => console.err(err))
    return model.data
}
// //get one model
// export async function getUniqueComment(id, typeModel){
//     const model = await axios.get(`${url}/${id}`).catch(err => console.err(err))
//     return model.data
// }

//add model
export async function addComment(comment){
    await axios.post(url , comment).then(res =>{
        modalWarning("Comentario adicionado com sucesso!", 3)
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }).catch(err => console.error(err));
}