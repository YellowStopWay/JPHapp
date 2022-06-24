import Vue from 'vue'
import App from './App.vue'
//注册全局组件
import TypeNav from '@/components/TypeNav'
//注册轮播图
import MyCarousel from '@/components/Carousel'
//注册分页器
import MyPagination from '@/components/Pagination'

//按需引入elementUI
import {Button,MessageBox} from 'element-ui'

import jiaran from '@/assets/jiaran.gif'
// 引入懒加载插件
import VueLazyload from 'vue-lazyload'
//配置懒加载
Vue.use(VueLazyload, {
  loading: jiaran,

})
//使用方法进行注册，第一个参数为全局组件的名字，第二个参数是哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(MyCarousel.name,MyCarousel)
Vue.component(MyPagination.name,MyPagination)

//注册为全局组件
Vue.component(Button.name,Button)
//element组件在注册的时候，还有一种写法，就是挂载在原型上。
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
//引入mockServer
import '@/mock/mockServer'
//引入路由
import router from '@/router/index'
//引入swiper的css
import 'swiper/css/swiper.css'

//引入仓库
import store from '@/store'
Vue.config.productionTip = false

//统一引入api中的所有请求
import * as API from '@/api'
import ElementUI from 'element-ui'

//引入自定义插件
import myPlugins from "@/plugins/myPlugins";
Vue.use(myPlugins,{
  name:'upper'
})
// 引入表单验证插件
import '@/plugins/validate'

new Vue({
  render: h => h(App),
  //配置全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  //注册路由
  router,
  //注册仓库：组件实例身上会多一个属性：$store
  store,
}).$mount('#app')
