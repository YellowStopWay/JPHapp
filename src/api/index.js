//当前模块：api进行统一管理
import request from "./request";
import mockRequest from './mockRequest'
//三级联动接口 是get请求 且没有参数

//对外暴露一个函数，被调用时发送请求
export const reqCategoryList = () =>{
    //发请求:axios发请求返回结果是promise对象
    return request({
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}
//获取banner 轮播图接口
export const reqGetBannerList = () =>{
    return mockRequest({
        url:'/banner',
        method:'get'
    })
}
//获取floor数据
export const reqFloorList = () =>{
    return mockRequest({
        url:'/floor',
        method:'get'
    })
}

//获取搜索模块数据 请求方式为POST 需要携带参数
/* 参数格式如下
{   
  "category1Id": "61",
  "category2Id": "61",
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
//当前接口给服务器传递的参数params，至少是一个空对象
export const reqGetSearchList = (params) =>{
    return request({
        url:'/list',
        method:'post',
        data:params
    })
}

//获取detail数据
export const reqGoodsInfo = (skuId) =>{
    return request({
        url:`/item/${skuId}`,
        method:'get',
    })
}

// 将产品添加到购物车（把产品数量和产品ID传给服务器）
export const reqAddOrUpdateShopCar = (skuId,skuNum) =>{
    return request({
        url:`/cart/addToCart/${skuId}/${skuNum}`,
        method:'post',
    })
}

// 购物车路由,获取购物车列表数据接口
export const reqShopCartList = () =>{
    return request({
        url:'/cart/cartList',
        method:'get',
    })
}

//删除购物车产品的接口
export const reqDeleteCartById = (skuId) =>{
    return request({
        url:`/cart/deleteCart/${skuId}`,
        method:'delete',
    })
}

//修改购物车状态接口
export const reqUpdateCheckedById = (skuId,isChecked) =>{
    return request({
        url:`/cart/checkCart/${skuId}/${isChecked}`,
        method:'get',
    })
}

//获取验证码接口
export const reqGetCode = (phone) =>{
    return request({
        url:`/user/passport/sendCode/${phone}`,
        method:'get',
    })
}

//注册,需要带用户的手机、密码、验证码等参数，因为路径本身没有参数，得额外传
export const reqUserRegister = (data) =>{
    return request({
        url:`/user/passport/register`,
        data,
        method:'post',
    })
}

//登录，需要带传输
export const reqUserLogin = (data) =>{
    return request({
        url:`/user/passport/login`,
        data,
        method:'post',
    })
}

//登录成功跳转首页后，带着token向服务器获取用户信息进行展示
export const reqUserInfo = () =>{
    return request({
        url:`/user/passport/auth/getUserInfo`,
        method:'get',
    })
}

//退出登录
export const reqLogout = () =>{
    return request({
        url:`/user/passport/logout`,
        method:'get',
    })
}

//获取用户地址信息
export const reqAddressInfo = () =>{
    return request({
        url:`/user/userAddress/auth/findUserAddressList`,
        method:'get',
    })
}

//获取商品清单
export const reqOrderInfo = () =>{
    return request({
        url:`/order/auth/trade`,
        method:'get',
    })
}

//提交订单的接口
export const reqSubmitOrder = (tradeNo,data) =>{
    return request({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data,
        method:'post',
    })
}

//支付时获取订单数据的接口
export const reqPayInfo = (orderId) =>{
    return request({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'get',
    })
}

//获取订单支付状态
export const reqPayStatus = (orderId) =>{
    return request({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'get',
    })
}

//获取个人中心的数据 page为页码 limit是每页显示数量
export const reqMyOrderList = (page,limit) =>{
    return request({
        url:`/order/auth/${page}/${limit}`,
        method:'get',
    })
}