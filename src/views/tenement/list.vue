<template>
  <VARest :uris="uris"
          :search-options="searches"
          :table-columns="tableColumns"
          :breadcrumb-options="breadcrumbList"
          :form-options='formColumns'
          ref="restRef"
  >
    <template #platforms="{record}">
      <relation title="关联平台"
                :names="record.platforms"
                :get-uri="APIUri.tenement.getPlatforms"
                :update-uri="APIUri.tenement.updatePlatforms"
                :data-uri="APIUri.platform.restful.list"
                :tenement-id="record.id"
                @reload="reload"
                update-key="platform_ids"
      ></relation>
    </template>
    <template #users="{record}">
      <relation title="关联用户"
                :names="record.users"
                :get-uri="APIUri.tenement.getUsers"
                :update-uri="APIUri.tenement.updateUsers"
                :data-uri="APIUri.system.user.restful.list"
                :tenement-id="record.id"
                @reload="reload"
                label="username"
                update-key="user_ids"
      ></relation>
    </template>
  </VARest>
</template>
<script lang='ts' setup>
import { APIUri } from "@/api";
import {VABreadcrumbItem} from "modules/components/VABreadcrumb/typings";
import {VASearchItem} from "modules/components/VASearch/typings";
import {VATableColumn} from "modules/components/VATable/extends/typing";
import {VAFormItem} from "modules/components/VAForm/extends/typing";
import {Auth} from "@/auth/common";
import Relation from './components/Relation.vue'
import {ref} from "vue";

const restRef = ref<any>()
const uris = new Auth().useRestfulUris(APIUri.tenement.restful)

const reload = () =>{
  restRef.value.onSearch()
}

const breadcrumbList: Array<VABreadcrumbItem> = [
  {label: "租户管理"},
]

const searches: Array<VASearchItem> = [
  {field: 'name__contains', placeholder: '请输入名称'}
]

const tableColumns: Array<VATableColumn> = [
  { title: "租户名", dataIndex: "name", slot: 'edit'},
  { title: "关联平台", dataIndex: "platform", slot: 'platforms'},
  { title: "关联用户", dataIndex: "user", slot: 'users'},
  { title: "描述", dataIndex: "description"},
  { title: "操作", dataIndex: "action", slot: "action"}
]
const formColumns: Array<VAFormItem> = [
  { label: '租户名', key: 'name', required: true },
  { label: '描述', key: 'description', required: true },
]
</script>
