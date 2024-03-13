<template>
  <div class="main-content">
    <VAForm :data="source" :options="formItems"></VAForm>
  </div>
  <div>
    {{source}}
  </div>
</template>

<script setup lang="ts">
import {APIUri} from "../../src/api";
import {VAFormItem} from "../typing";
import {ref} from "vue";


const source = ref({})

const formItems: Array<VAFormItem> = [
  {label: '用户名', key: 'username', required: true, update: false},
  {label: '用户邮箱地址', key: 'email', required: true},
  {label: '用户中文名', key: 'name_cn', required: true},
  {
    label: '是否启用', key: 'enabled', tagType: 'switch', required: true, default: 1,
    options: {
      checked: {label: '是', value: 1},
      unChecked: {label: '否', value: 0},
    }
  },
  {
    label: '角色', key: 'role_id', tagType: 'select', required: true,
    options: {uri: APIUri.Role.restful.list, label: 'name', value: 'id'}
  }
]
</script>
