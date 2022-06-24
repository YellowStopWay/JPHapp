//search模块的小仓库
import {reqGetSearchList} from '@/api'

//state：仓库存储数据的地方
const state = {
    searchList:{}
}
//mutations：修改state的唯一手段
const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}
//actions：可以书写业务逻辑，也可以处理异步
const actions = {
    //获取search模块数据
    async reqSearchList({commit},params={}){
        //这个函数在获取服务器数据时，至少需要传递一个参数（空对象）
        //params形参：用户派发action时，第二个传递过来的参数，至少是一个空对象
        let result = await reqGetSearchList(params)
        if(result.code == 200){
            console.log(result);
            commit('GETSEARCHLIST',result.data)
        }
    }
}
//getters：理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {
    goodsList(state){
        return state.searchList.goodsList || []
    },
    attrsList(state){
        return state.searchList.attrsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    }
}

//对外暴露store类的一个实例
export default {
    state,
    mutations,
    actions,
    getters
}