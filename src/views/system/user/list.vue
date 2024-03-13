<template>
  <VARest :uris="uris"
          :search-options="searches"
          :table-columns="tableColumns"
          :breadcrumb-options="breadcrumbList"
          :form-options='formColumns'>
    <template #role="{record}">
      <a-tag color="purple" v-for="item in record.roles || []" :key="item">{{ item }}</a-tag>
    </template>
  </VARest>
</template>
<script lang='ts' setup>
import {APIUri} from '@/api';
import {VABreadcrumbItem} from "modules/components/VABreadcrumb/typings";
import {VASearchItem} from "modules/components/VASearch/typings";
import {VATableColumn} from "modules/components/VATable/extends/typing";
import {VAFormItem} from "modules/components/VAForm/extends/typing";
import {Auth} from "@/auth/common";

const uris = new Auth().useRestfulUris(APIUri.system.user.restful)

const breadcrumbList: Array<VABreadcrumbItem> = [
  {label: "系统管理"},
  {label: "用户管理"},
]

const searches: Array<VASearchItem> = [
  {field: 'username', placeholder: '请输入名称', paramsType: 'query', queryType: 'contains'}
]

const tableColumns: Array<VATableColumn> = [
  {title: "用户名", dataIndex: "username", slot: 'edit', width: 180},
  {title: "用户中文名", dataIndex: "name_cn", width: 200},
  {
    title: "是否启用", dataIndex: "enabled", tagType: "tag", width: 150,
    options: {
      colors: {1: 'green', 0: 'red'},
      labels: {1: '是', 0: '否'}
    }
  },
  {title: "用户角色", dataIndex: "role", slot: 'role'},
  {title: "操作", dataIndex: "action", slot: 'action'}]

const formColumns: Array<VAFormItem> = [
  {label: '用户名', key: 'username', required: true, update: false},
  {label: '用户中文名', key: 'name_cn', required: true},
  {
    label: '是否启用', key: 'enabled', tagType: 'radio-group', required: true, default: 1,
    options: [{label: "是", value: 1}, {label: "否", value: 0}]
  },
  {
    label: '用户角色', key: 'role_ids', required: true, tagType: 'select',
    options: {uri: APIUri.system.role.restful.list, label: 'name', value: 'id', mode: 'multiple', defaultParams: {size: 100}}
  },
]
</script>
