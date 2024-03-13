<template>
  <form action="" class="valid-email-form" title="验证邮箱">
    <div class="form-group">
      <input id="email" :class="!checks.email.state?'invalid-input':''" v-model="data.email" type="text" placeholder="邮箱">
      <div class="invalid" v-if="!checks.email.state">{{checks.email.msg}}</div>
    </div>
    <div class="form-group">
      <input id="code" :class="!checks.code.state?'invalid-input':''" v-model="data.code" type="text" placeholder="验证码">
      <button :disabled="waitSecond>0" @click.prevent="sendCode" :class="'send-code-btn'+ `${waitSecond>0?' wait-second':''}`">
        <template v-if="waitSecond > 0">
          {{waitSecond}}s后重试
        </template>
        <template v-else>
          发送验证码
        </template>
      </button>
      <div class="invalid" v-if="!checks.code.state">{{checks.code.msg}}</div>
    </div>
    <button id="login-btn" type="submit" @click="submit">下一步</button>
  </form>
</template>

<script lang="ts" setup>
import {computed, defineEmits, defineProps} from "vue";
import {useValidEmail} from "@/views/auth/extends/hooks";

const props = defineProps({
  operateId: {
    type: String,
    required: true
  }
})

const operateId = computed(()=>props.operateId)

const emit = defineEmits(['finish'])

const {data, submit, checks, sendCode, waitSecond} = useValidEmail(operateId, ()=>emit('finish'))


</script>

<style scoped>
.valid-email-form #code{
  width: 80%;
}
.send-code-btn{
  border: none;
  padding: 5px;
  display: inline-block;
  background: #1890ff;
  color: #fff;
  height: 28px;
  width: 80px;
  border-radius: 3px;
  font-size: 13px;
}
.send-code-btn:hover{
  cursor: pointer;
  background: #0d7adf;
}
.send-code-btn.wait-second{
  background: rgba(13, 122, 223, 0.73);
}
.send-code-btn.wait-second:hover{
  background: rgba(13, 122, 223, 0.73);
  cursor: no-drop;
}
</style>
