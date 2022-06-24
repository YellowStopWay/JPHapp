//路由配置信息
//配置路由的地方


//引入路由组件
import MyHome from '@/pages/Home/MyHome'
import MyLogin from '@/pages/Login'
import MyRegister from '@/pages/Register'
import SearchDetail from '@/pages/Detail'
import AddShopCar from '@/pages/addCarSuccess'
import ShopCart from '@/pages/ShopCart'
import CartTrade from '@/pages/Trade'
import MyPay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import MyCenter from '@/pages/Center'
//引进二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

//配置路由
export default [
        {
            path:"/home",
            // component:import('@/pages/Home/MyHome'),
            component:MyHome,
            meta:{
                //显示底部footer
                show:true
            }
        },
        {
            path:"/search/:keyword?",
            component:()=> import('@/pages/Search/MySearch'),
            meta:{
                show:true
            },
            name:'search',
            props:($route)=>{
                return {
                    keyword:$route.params.keyword,
                    k:$route.query.k
                }
            }
        },
        {
            path:"/login",
            component:MyLogin,
            meta:{
                show:false
            }
        },
        {
            path:"/register",
            component:MyRegister,
            meta:{
                show:false
            }
        },
        //详情页面
        {
            path:`/item/:skuId`,
            component:SearchDetail,
            meta:{
                show:true
            }
        },
        {
            path:`/addcartsuccess`,
            name:'addcartsuccess',
            component:AddShopCar,
            meta:{
                show:true
            }
        },
        //购物车
        {
            path:`/shopcart`,
            name:'shopcart',
            component:ShopCart,
            meta:{
                show:true
            },
            
        },
        //结算页面
        {
            path:`/trade`,
            name:'trade',
            component:CartTrade,
            meta:{
                show:true
            },
            //路由独享守卫
            beforeEnter:(to,from,next) =>{
                if(from.path == '/shopcart'){
                    next()
                }else{
                    next(false)
                }
            }
        },
        //支付页面
        {
            path:`/pay`,
            name:'pay',
            component:MyPay,
            meta:{
                show:true
            },
            //路由独享守卫
            beforeEnter:(to,from,next) =>{
                if(from.path == '/trade'){
                    next()
                }else{
                    next(false)
                }
            }
        },
        //支付成功页面
        {
            path:`/paysuccess`,
            name:'paysuccess',
            component:PaySuccess,
            meta:{
                show:true
            }
        },
        //个人中心
        {
            path:`/center`,
            name:'center',
            component:MyCenter,
            meta:{
                show:true
            },
            //二级路由组件
            children:[
                {
                    path:'myorder',
                    component:MyOrder,
                },
                {
                    path:'grouporder',
                    component:GroupOrder,
                },
                {
                    path:'/center',
                    redirect:'/center/myorder'
                },
            ]
        },


        //重定向，在项目跑起来的时候，访问/，立马让他定向到首页
        {
            path:'*',
            redirect:'/home'
        }

    ]
