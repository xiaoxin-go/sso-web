<template>
    <VARest
        :uris="uris"
        :table-columns="tableColumns"
        :search-options="selectOptions"
        :form-options="formItems">
    </VARest>
</template>

<script setup lang="ts">
import {APIUri} from "../../src/api";
import {VAFormItem, VATableColumn} from "../typing";
import {VASearchItem} from "../components/VASearch/typings";
import {VASelectCascadeOptions} from "../components/VASelectCascade/typings";



const init = () =>{
  const l = [
    {name: 'yops', id: 1, next: [2]},
    {name: 'netops', id: 2, next: [3, 4]},
    {name: 'task', id: 3, next: [5, 6]},
    {name: 'device', id: 4, next: [7, 8, 9]},
    {name: 'task/firewall', id: 5},
    {name: 'task/nlb', id: 6},
    {name: 'device/firewall', id: 7},
    {name: 'device/nlb', id: 8},
    {name: 'device/switch', id: 9},
  ]
  const child = {}
  l.map((item: { name: string, id: number, next: number[] })=>{
    if (!item.next)
      return
    item.next.map((n: number)=>{
      child[n] = {}
    })
  })

}





const selectOptions: Array<VASearchItem> = [
  {
    field: 'region_tab_id',
    tagType: 'tabs',
    options: {uri: APIUri.Region.restful.list, label: 'name', value:'id'}
  },
  {
    field: 'role_id',
    tagType: 'select',
    placeholder: '选择角色',
    width: '120px',
    options: {uri: APIUri.Role.restful.list, label: 'name', value: 'id'}
  },
  {
    field: 'name',
    placeholder: '输入用户名',
    paramsType: 'query',
    width: '120px'
  },
  {
    field: 'region_id',
    tagType: 'select-cascade',
    width: '150px',
    placeholder: '请选择属地',
    options: {
      uri: APIUri.Region.restful.list, label: 'name', value: 'id',
      child: {
        field: 'device_id',
        uri: APIUri.Device.restful.list, label: 'name', value: 'id',
        placeholder: '请选择设备',
        width: '120px',
        paramsType: 'query',
      }
    } as VASelectCascadeOptions,
  }
]


const uris = APIUri.User.restful

const tableColumns: Array<VATableColumn> = [
  {title: "用户名", dataIndex: "username", slot: 'edit'},
  {title: "用户邮箱地址", dataIndex: "email"},
  {title: "用户中文名", dataIndex: "name_cn"},
  {title: "用户角色", dataIndex: "role_name"},
  {title: "是否启用", dataIndex: "enabled"},
  {title: "添加时间", dataIndex: "created_at"},
  {title: "操作", slot: "action"}
]


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
