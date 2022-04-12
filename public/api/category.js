const baseUrl = "http://localhost:3001";
const urlCategories = `${baseUrl}/category`
const urlCategory = `${baseUrl}/category`
const urlAddCategories = `${baseUrl}/addCategory`
const urlUpdateCategory = `${baseUrl}/update-category`
const urlDeleteCategory = `${baseUrl}/delete-category`

export async function getCategories(){
    const data = await axios.get(urlCategories).catch(err => console.error(err))
    return data.data
}

export function addNewCategory(newProduct) {
    axios.post(urlAddCategories, newProduct).then(res => {
        return res.data.message
    }).catch(err => console.error(err))
}

export async function configCategory(id){
    const res = await axios.get(`${urlCategory}/${id}`).catch(err =>{
        return res.data.message
    });
    return res;
}

export function updateCategory(id, category){
    axios.put(`${urlUpdateCategory}/${id}`, category).then(res =>{
        return res.data
    }).catch(err =>{
        return console.error(err)
    })
}

export function deleteCategory(id){
    axios.delete(`${urlDeleteCategory}/${id}`).then(res =>{
        console.log(res)
    }).catch(err => console.log(err));
};
