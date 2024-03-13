<template>
  <div>
    <a @click="visible=!visible" title="点击选择">
      <svg-icon :icon="value || 'choice'" :width="width" :height="height"></svg-icon>
    </a>
    <div class="select-svg-icon" v-if="visible">
        <span class="icon-item" v-for="item in icons" @click="clickIcon(item.icon)" :key="item.icon">
          <svg-icon :icon="item.icon" :width="width" :height="height"></svg-icon>
        </span>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
    </div>
  </div>

</template>

<script lang="ts" setup>
import {defineEmits, defineProps, ref} from "vue";
import SvgIcon from "./SvgIcon.vue"
import {icons} from "./extends";

const emit = defineEmits(["update:value"])

defineProps({
  value: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    default: "30",
  },
  width: {
    type: String,
    default: "30"
  }
})

const visible = ref<boolean>(false)

const clickIcon = (icon: string) => {
  visible.value = false
  emit("update:value", icon)
}

</script>

<style scoped>
.select-svg-icon {
  margin-top: 10px;
  position: absolute;
  width: 400px;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow-y: auto;
  display: -webkit-flex; /* Safari */
  background-color: rgba(247, 245, 245, 0.98);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.08), 0 1px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.08);
  z-index: 999;
}

.icon-item {
  display: inline-block;
  margin: 10px;
  cursor: pointer;
}

.icon-item:hover {
  background-color: rgba(229, 226, 226, 0.77);
}

.select-svg-icon > i {
  width: 40px;
  padding: 10px;
}
</style>
