export const setToken = (token)=>{
    localStorage.setItem('TOKEN',token)
}
export const getToken = (token)=>{
    return localStorage.getItem('TOKEN')
}
export const removeToken = (token)=>{
     localStorage.removeItem('TOKEN')
}
