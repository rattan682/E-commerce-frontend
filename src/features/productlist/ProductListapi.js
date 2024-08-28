import axios from "axios"

export const fetchProducts=async(filter,sort,pagination)=>

    {let queryString=''
        for(let key in filter){
            const categoryvalues=filter[key]
            if(categoryvalues.length){
                const lastcategoryvalue=categoryvalues[categoryvalues.length-1]
                queryString+=`${key}=${lastcategoryvalue}&`
            }
        }
        for(let key in sort){
            queryString+=`${key}=${sort[key]}&`
        }
        for(let key in pagination){
            queryString+=`${key}=${pagination[key]}&`
        }
        return await axios.get(`/products?`+queryString)}
export const fetchcategories=async()=>{
    return await axios.get('/category')
}
export const fetchproductsByid=async(id)=>{
    return await axios.get('/products/'+id)
}