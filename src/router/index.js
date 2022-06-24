//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
//使用插件
Vue.use(VueRouter)
// 先把VueRouter原型对象的push,先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push|replace
// 第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
// 第二个参数：成功的回调
// 第三个参数：失败的回调
//  call || apply区别
//  相同点，都可以调用函数一次，都可以篡改函数的上下文一次
//  不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => {
    }, () => {
    })
  }
}
VueRouter.prototype.replace = function (location, resole, reject) {
  if (resole && reject) {
    originReplace.call(this, location, resole, reject);
  } else {
    originReplace.call(this, location, () => {
    }, () => {
    })
  }
}

//配置路由
let router =  new VueRouter({
    //配置路由
    routes,
    //滚动行为
    scrollBehavior (to,from,savedPosition) {
        //回到最上方
        return {y:0}
    }
})

//全局前置守卫（路由跳转之前进行判断） to去哪里 from从哪里来 next为放行
//next(path)放行到指定路由
router.beforeEach(async(to,from,next)=>{
  //用户登录成功后才有token
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  if(token){
    //用户已经登录了还想去login
    if(to.path=='/login' || to.path=='/register'){
      next('/home')
    }else{
      //如果去的不是login，则直接放行
      //如果用户名已有
      if(name){       
        next()
      }else{
        //如果没有用户信息
        //在这里获取用户信息
        try {
          await store.dispatch('getUserInfo')
          //获取用户信息成功后放行
          next()
        } catch (error) {
          //token过期了，服务器已经没有该用户的token，我们需要清理用户本地的过期token
            await store.dispatch('userLogout')
            next('/login')
        }  
      }
    }
  }else{
    //如果还没登录,不能去交易相关（/trade）的。比如支付页面（/pay）、支付成功（/paysuccess）
    let toPath = to.path
    if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
      next('/login?redirect=' + toPath)
    }else{
      //如果去的不是交易相关，则放行
      next()
    }
    }
    
})
export default router