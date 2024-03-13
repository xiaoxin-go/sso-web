<template>
<div id="login">
  <div class="container">
    <div class="container-body">
      <div class="container-content">
        <div class="content-left">
          <div class="info">
            <div class="info-content">
              <div class="logo">
                <h1>欢迎登录</h1>
              </div>
              <p>SSO统一单点登录平台</p>
            </div>
          </div>
        </div>
        <div class="content-right">
          <div class="form">
            <div class="form-content">
                <div class="form-group">
                  <input id="username" :class="!checks.username.state?'invalid-input':''" v-model="data.username" type="text" placeholder="用户名">
                  <div class="invalid" v-if="!checks.username.state">{{checks.username.msg}}</div>
                </div>
                <div class="form-group">
                  <input id="password" :class="!checks.password.state?'invalid-input':''" v-model="data.password" type="password" placeholder="密码">
                  <div class="invalid" v-if="!checks.password.state">{{checks.password.msg}}</div>
                </div>
                <div class="form-group">
                  <input id="otp" :class="!checks.code.state?'invalid-input':''" v-model="data.code" type="text" placeholder="OTP">
                  <div class="invalid" v-if="!checks.code.state">{{checks.code.msg}}</div>
                </div>
                <button id="login-btn" type="submit" @click="submit">登录</button>
              <small>没有账号？</small>
              <a class="signup" @click="toRegister">&nbsp;注册</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">

import {useLogin} from "@/views/auth/extends/hooks";
import {useRouter} from "vue-router";

const router = useRouter()

const toHome = () =>{
  router.push({name: "Home"})
}

const {data, submit, checks} = useLogin(toHome)

const toRegister = () =>{
  router.push({name: "Register"})
}
const toRetrieve = () =>{
  router.push({name: "Retrieve"})
}
</script>

<style scoped>
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
