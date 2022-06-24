// 表单验证插件
import Vue from "vue";
import VeeValidate from "vee-validate"; 
// 中文提示信息
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)

VeeValidate.Validator.localize('zh_CN', {
    messages: {
        ...zh_CN.messages,
        // 用于确认密码的提示信息，若两密码不同，则提示确认密码必须与密码相同
        is: (field) => `${field}必须与密码相同`,
    },
    attributes: {
        // 提示信息，无'手机号'，则是phone无效；有'手机号'，则是手机号无效
        phone: '手机号',
        code: '验证码',
        password: '密码',
        password1: '确认密码',
        agree: '协议'
    }
})

// 自定义校验规则
VeeValidate.Validator.extend("agree", {
    validate: (value) => {
        return value;
    },
    getMessage: (field) => field + "必须同意",
})
