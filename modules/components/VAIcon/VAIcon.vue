<template>
  <span>
    <component :is="component"></component>
  </span>
</template>

<script lang="ts" setup>
import {
  FireFilled,
  SnippetsFilled,
  HddFilled,
  SettingFilled,
  RedditCircleFilled,
  BoxPlotFilled,
  UserOutlined,
  GoldFilled,
  FallOutlined,
  RiseOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  BarChartOutlined,
  PieChartOutlined,
  SyncOutlined,
  BuildOutlined,
  DeploymentUnitOutlined,
  AppstoreAddOutlined,
  GoldOutlined,
  TeamOutlined,
  MenuOutlined,
  ApiOutlined,
  CopyOutlined,
  MoreOutlined,
  RedoOutlined,
  EditOutlined,
  DeleteOutlined,
  CloseOutlined,
  AreaChartOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  ProfileOutlined,
  SnippetsOutlined,
  FileOutlined,
  CheckOutlined,
} from '@ant-design/icons-vue';
import { computed, defineProps } from 'vue';
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
});

const components = {
  'fire-filled': FireFilled,
  'snippets-filled': SnippetsFilled,
  'hdd-filled': HddFilled,
  'setting-filled': SettingFilled,
  'reddit-circle-filled': RedditCircleFilled,
  'box-plot-filled': BoxPlotFilled,
  'user-outlined': UserOutlined,
  'gold-filled': GoldFilled,
  'fall-outlined': FallOutlined,
  'rise-outlined': RiseOutlined,
  'fullscreen-exit-outlined': FullscreenExitOutlined,
  'fullscreen-outlined': FullscreenOutlined,
  'barChart-outlined': BarChartOutlined,
  'pie-chart-outlined': PieChartOutlined,
  'sync-outlined': SyncOutlined,
  'build-outlined': BuildOutlined,
  'deployment-unit-outlined': DeploymentUnitOutlined,
  'appstore-add-outlined': AppstoreAddOutlined,
  'gold-outlined': GoldOutlined,
  'team-outlined': TeamOutlined,
  'menu-outlined': MenuOutlined,
  'api-outlined': ApiOutlined,
  'copy-outlined': CopyOutlined,
  'more-outlined': MoreOutlined,
  'redo-outlined': RedoOutlined,
  'edit-outlined': EditOutlined,
  'delete-outlined': DeleteOutlined,
  'close-outlined': CloseOutlined,
  'area-chart-outlined': AreaChartOutlined,
  'caret-up-outlined': CaretUpOutlined,
  'caret-down-outlined': CaretDownOutlined,
  'profile-outlined': ProfileOutlined,
  'snippets-outlined': SnippetsOutlined,
  'file-outlined': FileOutlined,
  'check-outlined': CheckOutlined,
} as any;

const component = computed(() => {
  return components[props.type];
});
</script>
