<template>
  <VARest :uris="uris"
      :search-options="searches"
      :table-columns="tableColumns"
      :breadcrumb-options="breadcrumbList"
      :form-options='formColumns'>
    <template #updatePermission="{ record }">
      <a style="margin-right: 10px" @click.prevent="clickEdit(record.id)">编辑权限</a>
    </template>
  </VARest>
  <template>
    <a-drawer :maskClosable="false"
              width="1000px"
              v-model:visible="data.visible"
              title="修改角色权限">
      <template v-for="item in data.rolePermission" :key="item.name">
        <template v-if="item.path">
          <div class="parent-menu">
            <a-checkbox v-model:checked="item.select" @change="changeParent(item)">
              {{ item.name }}
            </a-checkbox>
          </div>
          <div class="parent-api" v-if="item.apis">
          <span class="parent-api-item" v-for="api in item.apis" :key="api.id">
            <a-checkbox @change="changePermission(item, api)" v-model:checked="api.select">
              {{ api.name }}
            </a-checkbox>
          </span>
          </div>
          <template v-else-if="item.children">
            <template v-for="child in item.children" :key="child">
              <div class="child-menu">
                <a-checkbox @change="changeChild(item, child)" v-model:checked="child.select">
                  {{ child.name }}
                </a-checkbox>
              </div>
              <div class="child-author" v-if="child.apis">
                <span class="child-author-item" v-for="api in child.apis" :key="api.id">
                  <a-checkbox @change="changeChildPermission(item, child, api)" v-model:checked="api.select">
                    {{ api.name }}
                  </a-checkbox>
                </span>
              </div>
            </template>
          </template>
        </template>
      </template>
      <template #footer>
        <a-button style="margin-right: 8px" @click="data.visible=false">取消</a-button>
        <a-button type="primary" @click="save">提交</a-button>
      </template>
    </a-drawer>
  </template>
</template>
<script lang="ts" setup>
import {APIUri, get, put} from "@/api";
import {reactive} from "vue";
import {VABreadcrumbItem} from "modules/components/VABreadcrumb/typings";
import {VASearchItem} from "modules/components/VASearch/typings";
import {VATableColumn} from "modules/components/VATable/extends/typing";
import {VAFormItem} from "modules/components/VAForm/extends/typing";
import {notify} from "@kyvg/vue3-notification";

const uris = APIUri.system.role.restful

interface Menu {
  id: number
  name: string,
  select: boolean
  children: Child[],
  apis: Api[]
}
interface Child extends Menu {
  name: string
}
interface Api {
  id: number
  name: string,
  method: string,
  select: boolean
}
const breadcrumbList: Array<VABreadcrumbItem> = [
  {label: "系统管理"},
  {label: "角色管理"},
]
const searches: Array<VASearchItem> = [
  {field: 'name', placeholder: '请输入名称', paramsType: 'query'}
]
const data = reactive({
  visible: false,
  rolePermission: [],
  activeId: 0,
})
const tableColumns: Array<VATableColumn> = [
  {title: "名称", dataIndex: "name", slot: "edit"},
  {title: "描述", dataIndex: "description"},
  {title: "更新时间", dataIndex: "updated_at"},
  {title: "操作", dataIndex: 'action', slot: 'action', options: {slots: ["updatePermission"]}},
]
const formColumns: Array<VAFormItem> = [
  {label: 'Name', key: 'name', required: true, update: false},
  {label: 'Description', key: 'description'},
]
const clickEdit = (roleId: number) => {
  getRolePermission(roleId)
  data.activeId = roleId
  data.visible = true
}
const getRolePermission = async (roleId: number) => {
  let res = await get(APIUri.system.role.getPermission, {id: roleId})
  if (res.data.code === 0) {
    data.rolePermission = res.data.data
  }
}
// 更新角色权限
const save = async () => {
  // 获取用户选中的菜单ID和权限ID
  const menuIds: number[] = []
  const apiIds: number[] = []
  data.rolePermission.forEach((parent: Menu) => {
    if (!parent.select) {
      return
    }
    menuIds.push(parent.id)
    if (parent.apis) {
      parent.apis.forEach((item: Api) => {
        if (item.select) {
          apiIds.push(item.id)
        }
      })
    }
    if (parent.children) {
      parent.children.forEach((child: Menu) => {
        if (!child.select) {
          return
        }
        menuIds.push(child.id)
        if (!child.apis) {
          return
        }
        child.apis.forEach((item: Api) => {
          if (item.select) {
            apiIds.push(item.id)
          }
        })
      })
    }
  })
  console.log(menuIds, apiIds)
  const res = await put(APIUri.system.role.updatePermission,{
    role_id: data.activeId,
    menu_ids: menuIds,
    api_ids: apiIds
  })
  if (res.data.code === 0) {
    notify({type: 'success', text: res.data.msg})
    data.visible = false
  }
}

// 改变父菜单的状态, 将父菜单中的子菜单和权限都设置为相应的
const changeParent = (parent: Menu) => {
  if (parent.apis) {
    parent.apis.forEach((item: Api) => {
      item.select = parent.select
    })
  }
  if (parent.children) {
    parent.children.forEach((child: Child) => {
      child.select = parent.select
      if (child.apis) {
        child.apis.forEach((item: Api) => {
          item.select = parent.select
        })
      }
    })
  }
}
const changeParentSelect = (parent: Menu, key: "apis" | "children", select: boolean) => {
  for (let i = 0; i < parent[key].length; i++) {
    if (parent[key][i].select) {
      return
    }
  }
  parent.select = select
}

const changeChild = (parent: Menu, child: Child) => {
  if (child.apis) {
    child.apis.forEach((item: Api) => {
      item.select = child.select
    })
  }
  // 如果为false, 循环父的子, 如果子都为false, 则把父设置为false
  if (!child.select) {
    changeParentSelect(parent, "children", child.select)
  } else {
    if (!parent.select) {
      parent.select = child.select
    }
  }
}
const changePermission = (parent: Menu, api: Api) => {
  if (!api.select) {
    changeParentSelect(parent, "apis", api.select)
  } else {
    if (!parent.select) {
      parent.select = api.select
    }
  }
}
const changeChildPermission = (parent: Menu, child: Child, api: Api) => {
  // 如果取消选中
  if (!api.select) {
    // 循环权限的子菜单, 若子菜单没有一个选择的， 则设置为false
    changeParentSelect(child, "apis", api.select)
    // 循环权限的主菜单, 若主菜单的子菜单都为false, 则设置为false
    changeParentSelect(parent, "children", api.select)
  } else {
    // 判断子菜单, 如果子菜单未选中, 则选中
    if (!child.select) {
      child.select = api.select
    }
    if (!parent.select) {
      parent.select = api.select
    }
  }
}
</script>
<style scoped>
.parent-menu {
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}

.parent-api {
  margin: 10px 0 20px 30px;
}

.parent-api-item, .child-author-item {
  display: inline-block;
  width: 25%;
}

.child-menu {
  margin-left: 30px;
  margin-top: 5px;
}

.child-author {
  margin: 5px 0 10px 60px;
}

.save-btn {
  position: absolute;
  right: 40px;
  top: 10px;
}
</style>
