import {RouteRecordRaw} from "vue-router";

export const routers: Array<RouteRecordRaw> = [
    { path: '/test/rest', name: 'TestRest', component: () => import('./test/RestTest.vue') },
    { path: '/test/search', name: 'TestSearch', component: () => import('./test/Search.vue') },
    { path: '/test/tabs_cascade', name: 'TestCascade', component: () => import('./test/TabsCascade.vue') },
    { path: '/test/select', name: 'TestSelect', component: () => import('./test/Select.vue') },
    { path: '/test/select_cascade', name: 'TestSelectCascade', component: () => import('./test/SelectCascade.vue') },
    { path: '/test/form', name: 'TestForm', component: () => import('./test/Form.vue') },
    { path: '/test/table', name: 'TestTable', component: () => import('./test/Table.vue') },
    { path: '/test/json-editor', name: 'TestJsonEditor', component: () => import('./test/JsonEditor.vue') },
    { path: '/test/card-rest', name: 'TestRestCard', component: () => import('./test/CardRest.vue') },
    { path: '/test/select-svg-icon', name: 'SelectSvgIcon', component: () => import('./test/SelectSvgIcon.vue') },
    { path: '/test/description', name: 'Description', component: () => import('./test/Description.vue') },
    { path: '/test/tabs', name: 'Tabs', component: () => import('./test/Tabs.vue') },
]
