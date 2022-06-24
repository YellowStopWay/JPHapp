//对axios进行二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
//start 进度条开始 done 进度条结束
//引入进度条样式
import 'nprogress/nprogress.css'

//1、利用axios对象的create，去创建一个axios实例
//request就是axios，只不过稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径，发请求的时候自动带上
    baseURL:'/mock',
    //请求超时的时间设置为5秒
    timeout:5000
})

//请求拦截器：发请求之前，请求拦截器可以检测到，并且完成一些业务
requests.interceptors.request.use((config)=>{
    //进度条开始动
    nprogress.start()
    //config配置对象 里面有一个属性很重要，叫header请求头
    return config
})

//响应拦截器 参数为成功和失败两个回调
requests.interceptors.response.use((res)=>{
    //进度条结束
    nprogress.done()
    //成功的回调函数：服务器数据返回后，响应拦截器可以检测到，去执行回调
    return res.data
},(error)=>{
    //失败的回调
    return Promise.reject(new Error('failed'))
})

//对外暴露 
export default requests