<template>
  <div class="main-body">
    请选择：<select-svg-icon v-model:value="value"></select-svg-icon>
    {{value}}
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
import SelectSvgIcon from "../components/SvgIcon/SelectIcon.vue"

const value = ref("")

</script>
<style scoped>

</style>