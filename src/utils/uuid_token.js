import {v4 as uuidv4} from 'uuid'
//生成一个随机字符串
export const getUUID = ()=>{
    //先从本地存储获取uuid，看看本地存储是否有
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    //如果没有，则生成
    if(!uuid_token){
        uuid_token = uuidv4();
        localStorage.setItem('UUIDTOKEN',uuid_token)
    }
    return uuid_token;
}