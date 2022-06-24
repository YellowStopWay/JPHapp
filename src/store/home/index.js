//search模块的小仓库
//引入
import { reqCategoryList,reqGetBannerList,reqFloorList } from "@/api"

//state：仓库存储数据的地方
const state = {
    //state的数据的默认初始值不能乱写，服务器返回的是数组，那就写成数组，返回的是对象，就得写对象
    categoryList:[],
    bannerList:[],
    floorList:[]
}
//mutations：修改state的唯一手段
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
}
//actions：可以书写业务逻辑，也可以处理异步
const actions = {
    async categoryList({commit}){
        let result = await reqCategoryList ()
        if(result.code === 200){
            //提交mutation
            commit('CATEGORYLIST',result.data)
        }
    },
    async getBannerList({commit}){
        let result = await reqGetBannerList()
        if(result.code === 200){
            commit('GETBANNERLIST',result.data)
        }
    },
    async getFloorList({commit}){
        let result = await reqFloorList()
        if(result.code === 200){
            commit('GETFLOORLIST',result.data)
        }
    }
}
//getters：理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
const getters = {}

//对外暴露store类的一个实例
export default {
    state,
    mutations,
    actions,
    getters
}