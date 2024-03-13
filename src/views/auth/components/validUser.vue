<template>
  <form action="" class="valid-email-form" title="验证邮箱">
    <div class="form-group">
      <input id="username" autocomplete="off" :class="!checks.username.state?'invalid-input':''" v-model="data.username"
             type="text" placeholder="用户名">
      <div class="invalid" v-if="!checks.username.state">{{ checks.username.msg }}</div>
    </div>
    <div class="form-group">
      <input id="name_cn" :class="!checks.name_cn.state?'invalid-input':''" v-model="data.name_cn" type="text"
             placeholder="中文名">
      <div class="invalid" v-if="!checks.name_cn.state">{{ checks.name_cn.msg }}</div>
    </div>
    <div class="form-group">
      <span style="display: inline-block; width: 48%">
              <input id="password"
                     :class="!checks.password.state?'invalid-input':''"
                     autocomplete="new-password"
                     v-model="data.password"
                     type="password" placeholder="密码">
      <div class="invalid" v-if="!checks.password.state">{{ checks.password.msg }}</div>
      </span>
      <span style="display: inline-block; width: 48%">
              <input id="re_password" :class="!checks.re_password.state?'invalid-input':''" v-model="data.re_password"
                     type="password" placeholder="重复密码">
      <div class="invalid" v-if="!checks.re_password.state">{{ checks.re_password.msg }}</div>
      </span>
    </div>
    <button id="login-btn" type="submit" @click="submit">注册</button>
  </form>
</template>

<script lang="ts" setup>
import {computed, defineEmits, defineProps} from "vue";
import {useRegister} from "@/views/auth/extends/hooks";

const props = defineProps({
  operateId: {
    type: String,
    required: true
  }
})

const operateId = computed(() => props.operateId)

const emit = defineEmits(['finish'])

const {data, submit, checks} = useRegister(operateId, () => emit('finish'))


</script>

<style scoped>
.valid-email-form #code {
  width: 80%;
}

.send-code-btn {
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

.send-code-btn:hover {
  cursor: pointer;
  background: #0d7adf;
}

.send-code-btn.wait-second {
  background: rgba(13, 122, 223, 0.73);
}

.send-code-btn.wait-second:hover {
  background: rgba(13, 122, 223, 0.73);
  cursor: no-drop;
}
</style>
