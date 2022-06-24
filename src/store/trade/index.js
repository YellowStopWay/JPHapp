import {reqAddressInfo,reqOrderInfo} from '@/api'

const state={
    addressInfo : [],
    orderInfo : {}
}
const mutations = {
    ADDRESSINFO(state,addressInfo){
        state.addressInfo = addressInfo
    },
    ORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo
    }
}
const actions = {
    async getAddressInfo({commit}){
        let result = await reqAddressInfo()
        if(result.code == 200){
            commit('ADDRESSINFO',result.data)
        }
    },
    async getOrderInfo({commit}){
        let result = await reqOrderInfo()
        if(result.code == 200){
            commit('ORDERINFO',result.data)
        }
    }
}

const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}