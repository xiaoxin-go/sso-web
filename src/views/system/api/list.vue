<template>
  <VARest :uris="uris"
      :search-options="searches"
      :table-columns="tableColumns"
      :breadcrumb-options="breadcrumbList"
      :form-options='formColumns'>
    <template #menu="{record}">
      <a-tag color="purple" v-for="item in record.menus || []" :key="item">{{ item }}</a-tag>
    </template>
  </VARest>
</template>
<script lang='ts' setup>
import {APIUri} from '@/api';
import {Auth} from "@/auth/common";
import {VABreadcrumbItem} from "modules/components/VABreadcrumb/typings";
import {VASearchItem} from "modules/components/VASearch/typings";
import {VATableColumn} from "modules/components/VATable/extends/typing";
import {VAFormItem} from "modules/components/VAForm/extends/typing";

const uris = APIUri.system.api.restful
// const uris = APIUri.Api.restful

const breadcrumbList: Array<VABreadcrumbItem> = [
  {label: "系统管理"},
  {label: "权限管理"},
]

const searches: Array<VASearchItem> = [
  {field: 'name', placeholder: '请输入名称'}
]

const tableColumns: Array<VATableColumn> = [
  {title: "权限名称", dataIndex: "name", slot: 'edit', width: 200},
  {title: "权限接口", dataIndex: "uri", width: 250},
  {title: "权限方法", dataIndex: "method", width: 160},
  {title: "菜单", dataIndex: "menu", slot: 'menu'},
  {
    title: "是否启用", dataIndex: "enabled", tagType: "tag", width: 90,
    options: {
      colors: {1: 'green', 0: 'red'},
      labels: {1: '是', 0: '否'}
    }
  },
  {title: "操作", dataIndex: "action", slot: 'action'}
]
const formColumns: Array<VAFormItem> = [
  {label: '权限名称', key: 'name', required: true},
  {label: '权限接口', key: 'uri', required: true},
  {label: '权限方法', key: 'method', required: true, tagType: 'radio-group', default: 'POST',
    options: [
      {label: 'GET', value: 'GET'},
      {label: 'POST', value: 'POST'},
      {label: 'PUT', value: 'PUT'},
      {label: 'DELETE', value: 'DELETE'},
    ]
  },
  {
    label: '所属菜单', key: 'menu_ids', tagType: 'select', required: true,
    options: {uri: APIUri.system.menu.restful.list, label: 'name', value: 'id', mode: 'multiple', defaultParams: {size: 100}}
  },
  {
    label: '是否启用', key: 'enabled', tagType: 'radio-group', required: true, default: 1,
    options: [{label: "是", value: 1}, {label: "否", value: 0}]
  },
]
</script>
