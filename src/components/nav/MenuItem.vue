<template>
  <template v-for="menu in data" :key="menu.path">
    <template v-if="menu.select">
      <a-sub-menu v-if="menu.children && menu.children.length > 0" :key="menu.path">
        <template #icon>
          <svg-icon :icon="menu.icon" width="18" height="18" color="#ccc"></svg-icon>
        </template>
        <template #title>{{ menu.name }}</template>
        <MenuItem :data="menu.children"></MenuItem>
      </a-sub-menu>
      <a-menu-item v-else :key="menu.path">
        <template #icon>
          <svg-icon :icon="menu.icon" width="18" height="18" color="#ccc"></svg-icon>
        </template>
        <span>{{ menu.name }}</span>
      </a-menu-item>
    </template>
  </template>
</template>

<script lang="ts" setup>
import {defineProps, PropType} from "vue";
import {Menu} from './extends/typings'

defineProps({
  data: {
    type: Object as PropType<Menu[]>,
  },
})
</script>

<style scoped>

</style>
