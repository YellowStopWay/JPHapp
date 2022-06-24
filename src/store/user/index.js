//用户登录和注册使用的仓库
import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout} from '@/api'
import { getToken, setToken,removeToken } from '@/utils/token'
//state：仓库存储数据的地方
const state = {
    code:'',
    token: getToken(),
    userInfo:{}
}
//mutations：修改state的唯一手段
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state, token){
        state.token = token;
    },
    GETUSERLOGIN(state,userInfo){
        state.userInfo = userInfo 
    },
    CLEAR(state){
        removeToken();
        state.token = ''
        state.userInfo = {}
    }
}
//actions：可以书写业务逻辑，也可以处理异步
const actions = {
    //获取验证码,正常应该直接让后台把验证码发到用户手机上，节省成本
    async getCode({commit},phone){
        let result = await reqGetCode(phone);
        if(result.code == 200){
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error(failed))
        }
    },
    //用户注册，这里不需要三连环，因为不存储数据
    async userRegister({commit},user){
        let result = await reqUserRegister(user);
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error(failed))
        }
    },
    //用户登录
    async userLogin({commit},data){
        let result = await reqUserLogin(data);
        if (result.code == 200) {
            // 客户端需要持久存储 token，以后客户端每次向服务端请求资源的时候需要带着服务端签发的 token。
            commit("USERLOGIN", result.data.token);
            // 持久化存储token，存储到本地
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'));
        }
    },
    //获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo()
        if (result.code == 200) {
            commit("GETUSERLOGIN", result.data);
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'));
        }
    },
    //退出登录
    async userLogout({commit}){
        // 向服务器发请求，清除服务器内的用户数据
        let result = await reqLogout()
        if (result.code == 200) {
            commit("CLEAR");
            return 'ok'
        } else {
            return Promise.reject(new Error('failed'));
        }
    }

}
//getters：理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {
   
}

//对外暴露store类的一个实例
export default {
    state,
    mutations,
    actions,
    getters
}