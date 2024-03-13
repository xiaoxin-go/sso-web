<template>
  <VACardRest :uris="APIUri.HorusEye.Model.restful"
              :breadcrumb-options="breadcrumbList"
              :search-options="searches"
              :card-options="cardOptions"
              :form-options="formColumns">
  </VACardRest>
</template>

<script setup lang="ts">
import {APIUri} from "@/api";
import {VABreadcrumbItem} from "modules/components/VABreadcrumb/typings";
import {VASearchItem} from "modules/components/VASearch/typings";
import {VAFormItem} from "modules/components/VAForm/extends/typing";
import {VACardOptions} from "../components/VACard/typings";

const breadcrumbList: Array<VABreadcrumbItem> = [
  {label: "模型管理"},
  {label: "数据集"},
]

const searches: Array<VASearchItem> = [
  {field: 'name', paramsType: 'query', queryType: 'contains', placeholder: '请输入名称'}
]

const cardOptions: VACardOptions = {
  title: "查看属性",
  icon: 'fire-filled',
  content: 'description',
  labelFormat: (item: any): string =>{
    return `${item.name}(${item.label})`
  },
  router: {
    name: 'HorusDatasetProperty',
    field: 'id',
    valueField: 'id'
  }
}

const formColumns: Array<VAFormItem> = [
  {label: '名称', key: 'name', required: true, update: false},
  {label: '主标签', key: 'label', required: true, update: false},
  {label: '副标签', key: 'sub_label'},
  {label: '描述信息', key: 'description'},
]
</script>

<style scoped>
</style>
