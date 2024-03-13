<template>
  <div class="main-body">
    <VADescriptions title="工单信息"
                    :column="4"
                    :options="descriptions"
                    :data="data">
      <template #extra>
        <a-popconfirm title="执行任务？"
                      ok-text="确定"
                      cancel-text="取消"
                      @confirm="exec">
          <a-button type="primary" size="small">执行任务</a-button>
        </a-popconfirm>
      </template>
      <template #jiraKeyDescription>
        <a :href="'https://jira.xiaoxin.com/browse/' + data.jira_key"
           target="_blank">{{ data.jira_key }}</a>
      </template>
      <template #jiraStatusDescription>
          <a-tag color="success">{{ data.jira_status }}</a-tag>
          <a title="同步状态">
            <VAIcon @click="asyncStatus" type="reload-outlined"></VAIcon>
          </a>
        </template>
    </VADescriptions>
  </div>
</template>

<script setup lang="ts">
import {VADescriptionsItem} from "../components/VADescriptions/typings";


const data = {
  jira_key: 'YWX-XXX',
  jira_region: '南京',
  jira_environment: '生产',
  implement_type: '公网',
  creator: 'lisi',
  jira_status: '验收中',
  status: '执行成功',
  summary: '测试工单',
}

const descriptions: Array<VADescriptionsItem> = [
  {label: "工单号", key: "jira_key", slot: 'jiraKeyDescription'},
  {label: "属地", key: "jira_region"},
  {label: "环境", key: "jira_environment"},
  {label: "策略类型", key: "implement_type"},
  {label: "创建人", key: "creator"},
  {
    label: "工单状态",
    key: "jira_status",
    slot: 'jiraStatusDescription'
  },
  {label: "任务状态", key: "status"},
  {label: "描述", key: "summary"}
]

const exec = () =>{
  console.log("exec")
}
const asyncStatus = () =>{
  console.log("async status")
}
</script>
