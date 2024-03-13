<template>
  <Nav></Nav>
  <notifications position="top center" style="margin-top: 10px"/>
</template>

<script lang="ts" setup>
import Nav from "@/components/nav/Nav.vue";
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
html,
body,
#app {
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
}
ul li {
  list-style: none;
}
#components-layout-demo-custom-trigger{
  flex: 1;
}
.ant-drawer-body>.ant-form>.ant-form-item{
  font-size: 12px;
  margin-bottom: 16px;
}
.ant-drawer-body>.ant-form>.ant-form-item .ant-form-item-label > label{
  /*font-size: 12px;*/
}
.flex{
  display: flex;
}
.justify-center{
  justify-content: center;
}
.items-center{
 align-items: center;
}
.text-shadow{
  text-shadow: 2px 2px 50px rgb(0,0,0)
}
.main{
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.main-body{
  flex: 1;
  display: flex;
  min-height: 0;
  flex-direction: column;
  background-color: #fff;
  padding: 20px 20px 0 20px;
  margin-bottom: 10px;
}
.ant-table.ant-table-small {
  font-size: 13px !important;
}
.ant-switch-checked {
  background-color: rgb(19, 206, 102) !important;
}
.ant-btn-sm {
  font-size: 12px !important;
}
.search-select {
  display: inline-block;
  width: 120px;
  margin-right: 20px;
}
.search-keyword-input {
  float: right;
}
.ant-select:hover {
  cursor: pointer;
}
.ant-table-wrapper.ant-table-striped{
  height: 100%;
}
.ant-spin-nested-loading{
  height: 100%;
}
.ant-spin-container{
  display: flex;
  height: 100%;
  flex-direction: column;
  min-height: 0;
}
.ant-table.ant-table-small{
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}
.ant-layout-sider-children{
  overflow-y: auto;
}
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  width: 6px;
  background: rgba(#101F1C, 0.1);
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(144,147,153,.5);
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
  transition: background-color .3s;
  cursor: pointer;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(144,147,153,.3);
}
.main-body .ant-tabs-content-holder{
  flex: 1;
  overflow-y: auto;
}
.main-body .va-rest-main{
  padding: 20px 0 0 0;
}
.main-body .va-rest{
  flex: 1;
  min-height: 0;
}
</style>
