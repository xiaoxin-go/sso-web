import {reactive, Ref, ref} from "vue";
import {APIUri, get, post} from "@/api";
import {notify} from "@kyvg/vue3-notification";
import {Encrypt, GeneOperateId} from "@/utils/encrypt";
import {LoginRequest, ValidEmailRequest, ValidOtpRequest} from "@/views/auth/extends/typings";
import {useOperate} from "@/utils/hooks";
import {store} from "@/store";
import {initAuths} from "@/auth/hooks";

export const useLogin = (finish: () => void) => {
    const data = reactive<LoginRequest>({
        username: '',
        password: '',
        code: '',
        operate_id: '',
    })
    const checks = reactive({
        username: {
            state: true, msg: ''
        },
        password: {
            state: true, msg: ''
        },
        code: {
            state: true, msg: ''
        }
    })
    const validate = (): boolean => {
        let flag = true
        if (data.username === '') {
            checks.username.state = false
            checks.username.msg = '用户名不能为空'
            flag = false
        }else{
            checks.username.state = true
        }
        if (data.password === '') {
            checks.password.state = false
            checks.password.msg = '密码不能为空'
            flag = false
        }else{
            checks.password.state = true
        }
        if(data.code === ''){
            checks.code.state = false
            checks.code.msg = 'OTP不能为空'
            flag = false
        }else if(data.code.length < 6){
            checks.code.state = false
            checks.code.msg = 'OTP不能小于6位'
            flag = false
        }else{
            checks.code.state = true
        }
        return flag
    }
    const getMenu = async () =>{
        const res = await get(APIUri.auth.getMenu, {})
        if (res.data.code === 0) {
            store.menuList = res.data.data
            initAuths(store.menuList)
        }
    }
    const submit = async () => {
        console.log("submit-------->")
        if(!validate()){
            console.log(checks)
            return
        }
        const res = await get(APIUri.auth.getPublicKey, {operate_id: data.operate_id})
        if(res.data.code !== 0){
            notify({type: 'error', text: res.data.msg})
            return
        }
        // 3. 使用公钥加密密码
        const publicKey = res.data.data
        const enPwd = Encrypt(publicKey, data.password)

        // 4. 调用登录接口
        const params = {...data, password: enPwd}
        const loginRes = await post(APIUri.auth.login, params)
        if(loginRes.data.code === 0){
            notify({type: 'success', text: '登录成功, 跳转到平台首页'})
            // 设置用户信息
            store.userInfo = loginRes.data.data
            // 获取菜单信息
            await getMenu()
            finish()
        }else{
            notify({type: 'error', text: loginRes.data.msg})
        }
    }
    const init = () =>{
        data.operate_id = GeneOperateId()
    }
    init()
    return {data, submit, checks}
}


export const useValidEmail = (operateId: Ref, finish: () => void) => {
    const waitSecond = ref(0)
    const data = reactive<ValidEmailRequest>({
        email: '',
        code: null,
        operate_id: '',
    })
    const checks = reactive({
        email: {
            state: true, msg: ''
        },
        code: {
            state: true, msg: ''
        }
    })
    const validateEmail = (): boolean => {
        console.log("checks----->", checks)
        if (data.email === '') {
            checks.email.state = false
            checks.email.msg = '邮箱地址不能为空'
        }else{
            checks.email.state = true
        }
        return checks.email.state
    }
    const validateCode = (): boolean => {
        console.log("checks----->", checks)
        if(data.code === null){
            checks.code.state = false
            checks.code.msg = '验证码不能为空'
        }else{
            checks.code.state = true
        }
        return checks.code.state
    }
    const validate = (): boolean => {
        return validateEmail() && validateCode();
    }

    const sendCode = async () => {
        if (!validateEmail()) {
            return
        }
        // const res = {data: {code: 0, msg: "ok"}}
        const res = await post(APIUri.auth.sendEmailCode, {email: data.email, operate_id: operateId.value})
        if (res.data.code === 0) {
            notify({type: 'success', title: res.data.msg})
            waitSecond.value = 60
            countdown()
        }else{
            notify({type: 'error', title: res.data.msg})
        }
    }

    const countdown = () => {
        if (waitSecond.value > 0) {
            waitSecond.value--
            setTimeout(countdown, 1000)
        }
    }
    const submit = async () => {
        if(!validate()){
            console.log(checks)
            return
        }
        const res = await post(APIUri.auth.verifyEmailCode, {...data, operate_id: operateId.value})
        console.log("res------>", res)
        if(res.data.code === 0){
            finish()
        }else{
            notify({type: 'error', title: res.data.msg})
        }
    }
    return {data, submit, checks, sendCode, waitSecond}
}
export const useValidOtp = (operateId: Ref, finish: () => void) => {
    const imgStr = ref("")
    const data = reactive<ValidOtpRequest>({
        code: null,
        operate_id: '',
    })
    const checks = reactive({
        code: {
            state: true, msg: ''
        }
    })
    const validate = (): boolean => {
        if (!data.code) {
            checks.code.state = false
            checks.code.msg = 'otp不能为空'
            if (data.code && data.code.toString().length != 6){
                checks.code.msg = 'otp长度必须是6位'
            }
        }else{
            checks.code.state = true
        }
        return checks.code.state
    }
    const getOtpQrCode = async () => {
        const res = await get(APIUri.auth.getOtpQrCode, {operate_id: operateId.value}, {responseType: 'blob'})
        imgStr.value = window.URL.createObjectURL(new Blob([res.data]))   // 转换图片为blob
    }

    const submit = async () => {
        if(!validate()){
            return
        }
        const res = await post(APIUri.auth.verifyOtpCode, {...data, operate_id: operateId.value})
        if (res.data.code === 0) {
            notify({type: 'success', title: res.data.msg})
            finish()
        }else{
            notify({type: 'error', title: res.data.msg})
        }
    }
    return {data, imgStr, getOtpQrCode, submit, checks}
}
export const useRegister = (operateId: Ref, finish: () => void) => {
    const data = reactive({
        username: '',
        name_cn: '',
        password: '',
        re_password: '',
    })
    const checks = reactive({
        username: {state: true, msg: ''},
        name_cn: {state: true, msg: ''},
        password: {state: true, msg: ''},
        re_password: {state: true, msg: ''},
    })
    const validateUsername = (): boolean => {
        if (data.username === '') {
            checks.username.state = false
            checks.username.msg = '用户名不能为空'
        }else{
            checks.username.state = true
        }
        return checks.username.state
    }
    const validateNameCn = (): boolean => {
        if (data.name_cn === '') {
            checks.name_cn.state = false
            checks.name_cn.msg = '中文名不能为空'
        }else{
            checks.name_cn.state = true
        }
        return checks.name_cn.state
    }
    const validatePassword = (): boolean => {
        if (data.password === '') {
            checks.password.state = false
            checks.password.msg = '密码不能为空'
        }else{
            checks.password.state = true
        }
        return checks.password.state
    }
    const validateRePassword = (): boolean => {
        if (data.re_password === '') {
            checks.re_password.state = false
            checks.re_password.msg = '重复密码不能为空'
            if (data.re_password && data.re_password !== data.password){
                checks.re_password.msg = '两次输入的密码不一致'
            }
        }else{
            checks.re_password.state = true
        }
        return checks.re_password.state
    }
    const validate = (): boolean => {
        return validateUsername() && validateNameCn() && validatePassword() && validateRePassword();
    }

    const submit = async () => {
        if (!validate()) {
            return
        }
        // 1. 获取公钥
        const res = await get(APIUri.auth.getPublicKey, {operate_id: operateId.value})
        if(res.data.code !== 0){
            notify({type: 'error', text: res.data.msg})
            return
        }
        // 2. 获取公钥，使用公钥加密密码，再提交注册信息
        const publicKey = res.data.data
        const enPwd = Encrypt(publicKey, data.password)
        const res1 = await post(APIUri.auth.register, {...data, password: enPwd, operate_id: operateId.value})
        if (res1.data.code === 0) {
            notify({type: 'success', title: res.data.msg})
            finish()
        }
    }
    return {data, submit, checks}
}
