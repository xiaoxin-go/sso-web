<template>
  <a-menu
    id="menu"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    theme="dark"
    @click="handleClick"
  >
    <menu-item :data="store.menuList"></menu-item>
  </a-menu>
</template>
<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import { RouteLocationRaw, useRouter } from 'vue-router'
import {GetMenu} from "./service";
import {store} from "@/store";
import MenuItem from "./MenuItem.vue"
import {initAuths} from "@/auth/hooks";

onMounted(() => {
  initMenu();
});
// 初始化获取菜单，先从浏览器内存中获取，若内存中没有则调用接口
const initMenu = async () => {
  if (!store.menuList || store.menuList.length == 0) {
    await GetMenu();
  }
  initAuths(store.menuList)
};

const router = useRouter()
const selectedKeys = ref(['1'])
const openKeys = ref(['sub1'])
// const {data: menuList} = GetMenu()
// const menuList = [
//   {
//     name: '我的平台',
//     url: '/platform/self',
//     image: 'fire-filled',
//     type: 'parent',
//   },
//   {
//     name: '我的平台账号',
//     url: '/platformuser',
//     image: 'snippets-filled',
//     type: 'parent',
//   }
// ]
const handleClick = (e: { key: RouteLocationRaw }) => {
  router.push(e.key)
}
</script>
<style>
</style>
