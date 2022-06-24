//search模块的小仓库
import {reqGoodsInfo,reqAddOrUpdateShopCar} from '@/api'
import {getUUID} from '@/utils/uuid_token'
//state：仓库存储数据的地方
const state = {
    detailInfo:{},
    //游客临时身份
    uuid_token:getUUID()
}
//mutations：修改state的唯一手段
const mutations = {
    GETDETAILLIST(state,detailInfo){
        state.detailInfo = detailInfo
    }
}
//actions：可以书写业务逻辑，也可以处理异步
const actions = {
    //获取search模块数据
    async getDetailList({commit},skuId){
        //这个函数在获取服务器数据时，至少需要传递一个参数（空对象）
        //params形参：用户派发action时，第二个传递过来的参数，至少是一个空对象
        let result = await reqGoodsInfo(skuId)
        if(result.code == 200){
            console.log(result);
            commit('GETDETAILLIST',result.data)
        }
    },
    async addOrUpdateShopCar({commit},{skuId,skuNum}){
        let result = await reqAddOrUpdateShopCar(skuId,skuNum)
        if(result.code == 200){
            return 'ok'           
        }else{
            return Promise.reject(new Error('failed'))
        }
    }
}
//getters：理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {
    categoryView(state){
        return state.detailInfo.categoryView || {}
    },
    skuInfo(state){
        return state.detailInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.detailInfo.spuSaleAttrList || []
    },
}

//对外暴露store类的一个实例
export default {
    state,
    mutations,
    actions,
    getters
}