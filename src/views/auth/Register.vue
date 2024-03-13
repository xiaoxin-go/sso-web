<template>
<div id="login">
  <div class="container">
    <div class="container-body">
      <div class="container-content">
        <div class="content-left">
          <div class="info">
            <div class="info-content">
              <div class="logo">
                <h1>欢迎注册</h1>
              </div>
              <p>SSO统一单点登录平台</p>
            </div>
          </div>
        </div>
        <div class="content-right">
          <div class="register-title">
            <span :class="'register-step' + `${current===1?' active':''}`">验证邮箱</span>
            <span class="register-step-to">></span>
            <span :class="'register-step' + `${current===2?' active':''}`">绑定OTP</span>
            <span class="register-step-to">></span>
            <span :class="'register-step' + `${current===3?' active':''}`">完成注册</span>
          </div>
          <div class="form">
            <div class="form-content">
              <valid-email :operate-id="operateId" v-if="current===1" @finish="current=2"></valid-email>
              <valid-otp :operate-id="operateId" v-if="current===2" @finish="current=3"></valid-otp>
              <valid-user :operate-id="operateId" v-if="current===3" @finish="toLogin"></valid-user>
              <small>已有账号？</small>
              <a class="signup" @click="toLogin">&nbsp;登录</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {GeneOperateId} from "@/utils/encrypt";
import ValidEmail from './components/validEmail.vue'
import ValidOtp from './components/validOtp.vue'
import ValidUser from './components/validUser.vue'

const router = useRouter()
const operateId = ref("test")


onMounted(()=>{
  operateId.value = GeneOperateId()
})
const current = ref(1)

const toLogin = () =>{
  router.push({name: "Login"})
}
</script>

<style>
.register-title{
  position: absolute;
  margin-left: 40px;
  margin-top: 30px;
  font-size: 14px;
}
.register-step{
  color: #8e8c8c;
}
.register-step.active{
  color: #1890ff;
}
.register-step-to{
  margin: 0 10px;
}
#login{
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  overflow-x: hidden;
  background: #EEF5F9;
  text-align: center;
}
#login:before{
  content: '';
  width: 100%;
  height: 100%;
  display: block;
  background: url(@/assets/p_big3.jpg);
  background-size: cover;
  -webkit-filter: blur(10px);
  filter: blur(10px);
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
}
#login .container{
  min-height: 100vh;
  z-index: 999;
  padding: 20px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  display: flex;
}
.container-body{
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
}
.container-content{
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
.container-content>div{
  flex: 0 0 50%;
  max-width: 50%;
}
.info{
  display: flex;
  align-items: center;
  min-height: 50vh;
  padding: 40px;
  background: rgba(121, 106, 238, 0.9);
  color: #fff;
}
.logo>h1{
  font-size: 2.5em;
  font-weight: 600;
}
.content-right{
  background: #fff;
}
.form{
  min-height: 50vh;
  padding: 40px;
  display: flex;
  align-items: center;
  text-align: left;
}
.form-content{
  width: 100%;
}
.form-content form{
  width: 100%;
  max-width: 400px;
}
.form small{
  color: #aaa;
}
.invalid{
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}

#login-btn{
  margin-bottom: 10px;
  cursor: pointer;
  background-color: #796AEE;
  color: #fff;
  font-family: inherit;
  border-color: #796AEE;
  font-weight: 400;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  -webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
}
#login-btn:hover{
  background-color: #584db7;
}
.signup{
  font-size: 0.9em;
  color: #85b4f2;
  text-decoration: none;
}
.signup:hover{
  cursor: pointer;
  color: #5e5ee0;
}
.form-group{
  position: relative;
  margin-bottom: 30px;
}
.form-group input{
  width: 100%;
  border: none;
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  outline: none !important;
  outline-color: #5e5ee0;
  overflow: visible;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}
.form-group>.invalid-input{
  border-bottom: 1px solid #dc3545;
}
.form-group>input:focus{
  border-color: #796AEE;
}


@media (min-width: 768px){
  .container {
    max-width: 720px;
  }
}
@media (min-width: 992px){
  .container {
    max-width: 960px;
  }
}
@media (min-width: 1200px){
  .container {
    max-width: 1140px;
  }
}


</style>
