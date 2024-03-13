<template>
  <a-popconfirm cancel-text="取消" v-model:open="visible">
    <template #title>
      <span style="display: block">{{ title }}</span>
      <div v-if="value !== ''">
        <a-input v-model:value="confirmValue" :placeholder="placeholder" size="small"></a-input>
      </div>
    </template>
    <template #okButton>
      <a-button type="primary" size="small" @click="onOk">{{ okText }}</a-button>
    </template>
    <span style="margin-right: 10px;">
          <a v-if="type === 'a'" :style="'color: ' + labelColor">{{ label }}</a>
    <a-button v-else :size="size" :type="buttonType">
      {{ label }}
    </a-button>
    </span>
  </a-popconfirm>
</template>

<script lang="ts" setup>
import {defineEmits, defineProps, ref} from "vue";
import {notify} from "@kyvg/vue3-notification";

const props = defineProps({
  // 确定消息值，比如要删除，输入删除才能操作
  value: {
    type: String,
    default: ""
  },
  label: {
    type: String,
    required: true,
  },
  labelColor: {
    type: String,
  },
  placeholder: {
    type: String,
    default: "确定操作吗?"
  },
  title: {
    type: String,
    default: "操作"
  },
  okText: {
    type: String,
    default: "确定"
  },
  size: {
    type: String,
    default: "small"
  },
  type: {
    type: String,
    default: "a"
  },
  buttonType: {
    type: String,
  }
})

const emit = defineEmits(["on-ok"])

const visible = ref(false)
const confirmValue = ref("")

const onOk = () => {
  if (confirmValue.value !== props.value) {
    notify({type: 'warn', text: `请输入${props.value}删除`})
    return
  }
  emit("on-ok")
  visible.value = false
  confirmValue.value = ""
}
</script>

<style scoped>

</style>
