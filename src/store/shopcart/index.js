//shopcart模块的小仓库
import {reqShopCartList,reqDeleteCartById,reqUpdateCheckedById} from '@/api'
//state：仓库存储数据的地方
const state = {
    ShopCarList:{}
}
//mutations：修改state的唯一手段
const mutations = {
    GETSHOPCARTLIST(state,ShopCarList){
        state.ShopCarList = ShopCarList
    }
}
//actions：可以书写业务逻辑，也可以处理异步
const actions = {
    //获取search模块数据
    async getShopCartList({commit},skuId){
        let result = await reqShopCartList(skuId)
        if(result.code == 200){
            commit('GETSHOPCARTLIST',result.data)
        }
    },
    //删除购物车的某一个商品
    async deleteCartListBySkuId({commit},skuId){
        //这个函数在获取服务器数据时，至少需要传递一个参数（空对象）
        let result = await reqDeleteCartById(skuId)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    //修改购物车商品的选中状态
    async updateCheckedById({commit},{skuId,isChecked}){
        //这个函数在获取服务器数据时，至少需要传递一个参数（空对象）
        let result = await reqUpdateCheckedById(skuId,isChecked)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('failed'))
        }
    },
    //删除购物车里全部已被选中的商品
    deleteAllCheckedCart({dispatch,getters}){
        //context就是小仓库，里面有commit和dispatch
        let cartInfoList = getters.ShopCarList.cartInfoList
        let PromiseAll = []
        cartInfoList.forEach(item => {
            //每执行一次，都会返回一个promise
            let promise = item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):''
            //将每一次返回的promise添加到数组中
            PromiseAll.push(promise)
        });
        //如果全部都成功，则返回的结果也是成功。有一个不成功，则返回失败。
        return Promise.all(PromiseAll)
    },
    //修改全部产品的勾选状态
    updateAllCartIsChecked({dispatch,getters},isChecked){
        let PromiseAll = []
        getters.ShopCarList.cartInfoList.forEach(item =>{
           let promise =  dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
           PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }
}
//getters：理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {
    ShopCarList(state){
        return state.ShopCarList[0] || {}
    },
    
}

//对外暴露store类的一个实例
export default {
    state,
    mutations,
    actions,
    getters
}