<template>
  <div id="components-layout-demo-custom-trigger">
    <a-layout>
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
        <div class="logo" v-if="!collapsed">
          <a class="logo-a" @click="toHome" title="首页">SSO单点登录系统</a>
        </div>
        <div v-else style="text-align: center">
            <svg style="margin-top: 10px" t="1705562987471" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 p-id="4356" width="40" height="40"><path
                d="M313.344 569.2672c0 19.968-5.1456 37.888-15.4368 53.76-10.2656 15.9232-25.3184 28.3648-45.1072 37.376-19.7888 8.9856-43.264 13.4912-70.4256 13.4912-32.5376 0-59.392-6.144-80.5376-18.432a107.3152 107.3152 0 0 1-36.5824-35.456C55.8848 605.2352 51.2 590.8736 51.2 576.9216c0-8.0896 2.816-15.0272 8.448-20.8128 5.632-5.76 12.8-8.6528 21.4784-8.6528 7.04 0 13.0048 2.2528 17.8944 6.7328 4.864 4.5056 9.0368 11.1872 12.4672 20.0448 4.224 10.496 8.7552 19.2768 13.6192 26.3168s11.7504 12.8512 20.5824 17.4336c8.8576 4.5824 20.48 6.8608 34.8928 6.8608 19.7888 0 35.8912-4.608 48.256-13.824 12.3648-9.216 18.56-20.736 18.56-34.56 0-10.9312-3.328-19.8144-10.0096-26.624a64.5632 64.5632 0 0 0-25.856-15.6672c-10.5984-3.584-24.7296-7.424-42.4448-11.4688-23.68-5.5552-43.52-12.032-59.4944-19.456-15.9744-7.424-28.672-17.5616-38.0416-30.3872-9.3696-12.8-14.0544-28.7488-14.0544-47.7952 0-18.176 4.9408-34.304 14.848-48.384 9.9072-14.08 24.2176-24.9344 42.9824-32.512 18.7392-7.5776 40.8064-11.3664 66.1504-11.3664 20.224 0 37.76 2.5088 52.5312 7.5264 14.7712 5.0432 27.0336 11.6992 36.7872 20.0448 9.7536 8.32 16.896 17.0496 21.376 26.2144 4.5056 9.1392 6.7584 18.0736 6.7584 26.752 0 7.9616-2.816 15.104-8.448 21.504-5.632 6.3744-12.6208 9.5488-21.0432 9.5488-7.6288 0-13.44-1.8944-17.408-5.7344-3.9936-3.84-8.2944-10.0864-12.9536-18.7904-6.016-12.4416-13.2096-22.144-21.6064-29.1328-8.3968-6.9632-21.888-10.4704-40.4992-10.4704-17.2544 0-31.1552 3.7888-41.728 11.3664-10.5728 7.5776-15.872 16.6912-15.872 27.3408 0 6.6048 1.792 12.288 5.4016 17.1008 3.584 4.8128 8.5504 8.9344 14.848 12.3904 6.2976 3.4304 12.672 6.144 19.1232 8.0896 6.4512 1.9456 17.1008 4.7872 31.9488 8.5504 18.6112 4.352 35.4304 9.1392 50.5088 14.3872 15.104 5.2736 27.904 11.648 38.4768 19.1488 10.5728 7.5008 18.8416 16.9728 24.7552 28.4416 5.9392 11.4944 8.8832 25.5488 8.8832 42.1888z m307.328 0c0 19.968-5.12 37.888-15.4112 53.76-10.2656 15.9232-25.3184 28.3648-45.1072 37.376-19.8144 8.9856-43.264 13.4912-70.4256 13.4912-32.5632 0-59.392-6.144-80.5632-18.432a107.3152 107.3152 0 0 1-36.5568-35.456c-9.3696-14.7712-14.08-29.1328-14.08-43.0848 0-8.0896 2.816-15.0272 8.448-20.8128 5.632-5.76 12.8-8.6528 21.504-8.6528 7.04 0 13.0048 2.2528 17.8944 6.7328 4.864 4.5056 9.0368 11.1872 12.4672 20.0448 4.1984 10.496 8.7552 19.2768 13.6192 26.3168s11.7504 12.8512 20.5824 17.4336c8.8576 4.5824 20.48 6.8608 34.8928 6.8608 19.7888 0 35.8656-4.608 48.256-13.824 12.3648-9.216 18.56-20.736 18.56-34.56 0-10.9312-3.328-19.8144-10.0096-26.624a64.5632 64.5632 0 0 0-25.856-15.6672c-10.5984-3.584-24.7296-7.424-42.4448-11.4688-23.68-5.5552-43.52-12.032-59.4944-19.456-15.9744-7.424-28.672-17.5616-38.0416-30.3872-9.3696-12.8-14.0544-28.7488-14.0544-47.7952 0-18.176 4.9408-34.304 14.848-48.384 9.9072-14.08 24.2176-24.9344 42.9824-32.512 18.7392-7.5776 40.7808-11.3664 66.1504-11.3664 20.224 0 37.76 2.5088 52.5312 7.5264 14.7712 5.0432 27.0336 11.6992 36.7872 20.0448 9.728 8.32 16.896 17.0496 21.376 26.2144 4.5056 9.1392 6.7584 18.0736 6.7584 26.752 0 7.9616-2.816 15.104-8.448 21.504-5.632 6.3744-12.6464 9.5488-21.0432 9.5488-7.6544 0-13.4656-1.8944-17.408-5.7344-3.9936-3.84-8.32-10.0864-12.9536-18.7904-6.016-12.4416-13.2096-22.144-21.6064-29.1328-8.3968-6.9632-21.888-10.4704-40.4992-10.4704-17.2544 0-31.1552 3.7888-41.728 11.3664-10.5984 7.5776-15.872 16.6912-15.872 27.3408 0 6.6048 1.792 12.288 5.376 17.1008 3.6352 4.8128 8.576 8.9344 14.8736 12.3904 6.2976 3.4304 12.672 6.144 19.1232 8.0896 6.4512 1.9456 17.1008 4.7872 31.9488 8.5504 18.6112 4.352 35.4304 9.1392 50.5088 14.3872 15.104 5.2736 27.904 11.648 38.4768 19.1488 10.5728 7.5008 18.8416 16.9728 24.7552 28.4416 5.9136 11.4944 8.8832 25.5488 8.8832 42.1888zM822.528 332.8c34.2016 0 63.5648 6.9376 88.064 20.8128a134.912 134.912 0 0 1 55.7056 59.1872c12.5952 25.5744 18.8928 55.6032 18.8928 90.112 0 25.4976-3.4304 48.64-10.3424 69.504a150.4256 150.4256 0 0 1-31.0528 54.2464 135.6544 135.6544 0 0 1-50.8416 35.072c-20.096 8.1152-43.136 12.16-69.0688 12.16-25.8048 0-48.896-4.1472-69.2992-12.4928a137.472 137.472 0 0 1-51.0976-35.2c-13.6448-15.1552-23.9616-33.3824-30.9248-54.6816a220.7232 220.7232 0 0 1-10.4704-69.0688c0-25.344 3.6352-48.5888 10.9312-69.76 7.2704-21.1456 17.792-39.1424 31.5904-53.9904a136.704 136.704 0 0 1 50.432-34.0992c19.7888-7.8592 42.2912-11.8016 67.4816-11.8016z m94.9504 169.6512c0-24.1408-3.8912-45.056-11.6992-62.7712-7.808-17.7152-18.944-31.104-33.408-40.1664-14.4896-9.088-31.104-13.6192-49.8432-13.6192-13.3632 0-25.7024 2.5088-37.0176 7.552a81.3312 81.3312 0 0 0-29.2352 21.9392c-8.192 9.6-14.6432 21.8624-19.3536 36.7872-4.736 14.9248-7.0912 31.6672-7.0912 50.2784 0 18.7392 2.3552 35.6864 7.0912 50.8416 4.7104 15.1552 11.392 27.7248 20.0192 37.6832 8.6272 9.984 18.5344 17.4592 29.696 22.4 11.1872 4.9408 23.4496 7.424 36.7872 7.424 17.1008 0 32.8192-4.2752 47.1296-12.8256 14.336-8.5504 25.728-21.76 34.2016-39.6032 8.4736-17.8432 12.7232-39.8336 12.7232-65.92z"
                fill="#1296db" p-id="4357"></path></svg>
        </div>
        <Menu></Menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <menu-unfold-outlined
              v-if="collapsed"
              class="trigger"
              @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined
              v-else
              class="trigger"
              @click="() => (collapsed = !collapsed)"
          />
          <div style="float: right;margin-right: 30px">
            <user-outlined style="margin-right: 5px; font-size: 20px"/>
            <a>{{ store.userInfo.username }}</a>
          </div>
        </a-layout-header>
        <a-layout-content :style="{ margin: '0 16px' }">
          <a-spin v-show="store.spinning" class="nav-spin" tip="加载中..."></a-spin>
          <router-view v-if="isRouteActive"></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script lang="ts" setup>
import {MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined} from '@ant-design/icons-vue'
import {store} from "@/store";
import {onMounted, ref, nextTick, provide} from 'vue'
import Menu from '@/components/nav/Menu.vue'
import {GetUserInfo} from "@/components/nav/service";
import {GetLocalStorageUserInfo} from "@/utils/storage";
import router from "@/router";

const collapsed = ref(false)
const isRouteActive = ref(true)
onMounted(() => {
  initUser()
})

const initUser = () => {
  if (store.userInfo.username && store.userInfo.username !== '') {
    return;
  }
  let user = GetLocalStorageUserInfo();
  if (user?.username && user.username !== '') {
    store.userInfo = user;
  } else {
    GetUserInfo()
  }
};
const reload = () => {
  isRouteActive.value = false;
  nextTick(() => {
    isRouteActive.value = true;
  })
}
const toHome = () =>{
  router.push({name: "Home"})
}
provide('reload', reload)

</script>
<style>
.logo-a{
  color: #fff;
}
.logo-a:hover{
  color: #c4c2c2;
}
#components-layout-demo-custom-trigger {
  display: flex;
  min-height: 100vh;
}

.ant-layout-header {
  height: 56px !important;
  line-height: 56px !important;
}

/*.ant-menu {*/
/*  !*background: #0655be !important;*!*/
/*  color: #ffffff !important;*/
/*}*/
.ant-layout-sider {
  /*background: #0655be !important;*/
}

.ant-menu-item:hover,
.ant-menu-submenu:hover,
.ant-menu-submenu-inline:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  color: #ffffff !important;
}

.ant-menu-inline {
  border: none !important;
}

.ant-menu-submenu-arrow {
  /*color: #ffffff !important;*/
}

.ant-menu-submenu-title {
  /*color: #ffffff !important;*/
}

.ant-menu-submenu-selected {
  /*color: #ffffff !important;*/
}

.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
  background: rgba(255, 255, 255, 0.2) !important;
  /*color: #ffffff !important;*/
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  line-height: 32px;
  margin: 16px;
  text-align: center;
  font-size: 16px;
  color: white;
}

.site-layout .site-layout-background {
  background: #fff;
}

.nav-spin {
  height: 100%;
  width: 100%;
  position: absolute !important;
  display: inline-block;
  opacity: 0.6 !important;
  z-index: 999;
  padding-top: 200px !important;
  background: #fff;
}
</style>
