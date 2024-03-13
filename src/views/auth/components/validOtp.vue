<template>
  <form action="" class="valid-otp-form" title="绑定otp">
    <div class="form-group">
      <div style="vertical-align: top">
        <img class="otp-img" :src="imgStr" alt="扫描二维码">
        <span class="otp-help">
          <p>1. 安装宁盾令牌或Google Authenticator软件</p>
          <p>2. 使用app扫描二维码</p>
          <p>3. 输入手机上的动态口令</p>
        </span>
      </div>
      <input id="otp" :class="!checks.code.state?'invalid-input':''" v-model="data.code" type="number" placeholder="OTP">
      <div class="invalid" v-if="!checks.code.state">{{checks.code.msg}}</div>
    </div>
    <button id="login-btn" type="submit" @click="submit">下一步</button>
  </form>
</template>

<script lang="ts" setup>
import {computed, defineEmits, defineProps, onMounted} from "vue";
import {useValidOtp} from "@/views/auth/extends/hooks";

const props = defineProps({
  operateId: {
    type: String,
    required: true
  }
})

const operateId = computed(()=>props.operateId)

onMounted(()=>{
  console.log("operate_id: ", operateId)
  getOtpQrCode()
})

const emit = defineEmits(['finish'])
const {data, imgStr, getOtpQrCode, submit, checks} = useValidOtp(operateId, ()=>emit('finish'))


</script>

<style scoped>
.valid-email-form #otp{
  width: 20%;
}
.otp-img{
  margin-left: -15px;
  width: 120px;
  height: 120px;
}
.otp-help{
  font-size: 12px;
  color: #959393;
  display: inline-block;
  position: relative;
  top: 20px;
}
</style>
