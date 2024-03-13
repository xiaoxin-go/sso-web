<template>
<div class="main-body">
  <VATabs v-model:value="value"
          :options="options"
          @on-change="change"></VATabs>
</div>
</template>

<script setup lang="ts">
import {VATabs} from "../index"
import {TabsItem, VATabsOptions} from "../components/VATabs/typings";
import {APIUri} from "../../src/api";
import {ref} from "vue";

// 调用后端数据
const options: VATabsOptions = {
  uri: APIUri.Region.restful.list,
  label: "name",
  value: "id"
}

// 静态数据
const staticOptions: Array<TabsItem> = [
    {label: '上海', value: '上海'},
    {label: '南京', value: '南京'},
    {label: '贵州', value: '贵州'},
    {label: '广州', value: '广州'},
]

const value = ref("")

const change = (value: any) =>{
  console.log(value)
}
</script>
