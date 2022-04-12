const baseUrl = "http://localhost:3001";
const url = `${baseUrl}/user`;


export function addNewUser(user) {
    axios.post(url, user).then(() => {
        console.log({message:"create success"})
    }).catch(error => console.log(error));
}
export async function getUsers() {
    const data = await axios.get(url).catch(error =>{console.err(error)})
    return data.data
}
export async function getUser(sub) {
    const data = await axios.get(url+"/"+sub).catch(error => console.error(`error in getData: ${error}`))
    return data.data
}
export async function updateUser(sub, user){
    axios.put(`${url}/${sub}`, user).then(res =>{
        return res.data
    }).catch(err =>{
        return console.error(err)
    })
}