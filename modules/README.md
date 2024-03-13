### 项目说明
基于前端框架vue-antd-design封装的restful配套的动态前端组件

# 基于vue3+antd实现的restful组件

### 组件背景

在后台管理应用中，大多数前端页面和后端接口都是根据后端设计的表实现简单的增、删、改、查的页面，前端重复性开发量大，调试和copy修改代码量多，并且增加字段时修改地方较多，降低了前端开发效率。

后端python模型django-rest-framework和flask-admin都可以根据模型结构+简单配置，实现标准的增、删、改、查的标准接口。本组件则是取其想法，根据模型结构+简单配置，实现带有增、删、改、查的前端页面。

### 组件目标

基于vue3+ts+antd实现的restful组件，组件需要与后端接口格式对应，使用组件仅需要传入固定格式即可实现一个带有增、删、改、查的form表单和table搜索页面。

在很多组件中，都需要调用后端接口来获取数据。比如用的最多的下拉选择框、radio单选框、描述列表等。则需要对组件抽象，实现传入后端API即实现下拉选择框等。

### 组件

VARest为总组件，由其它的组件合成，可直接使用VARest组件，也可根据需求使用其它小组件，都可简化开发代码量。

在使用子组件时，比如下拉选择框，若需要从后端获取数据，则可以使用VASelect。若是静态数据，建议使用原生的antd组件。

#### VARest 标准接口组件

基于后面的子组件实现的带有增、删、改、查的标准restful接口组件

**用法示例**

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3BMqYZXgEZj8OwZL/img/2dd7af8a-ad71-485c-b3d1-0c5c62f372a2.png)

    <template>
      <VARest v-if="uris.list"
          :uris="uris"
          :search-options="searches"
          :table-columns="tableColumns"
          :breadcrumb-options="breadcrumbList"
          :form-options='formColumns'>
        <template #updatePermission="{ record }">
          <a style="margin-right: 10px" @click.prevent="clickEdit(record.id)">编辑权限</a>
        </template>
      </VARest>
    </template>
    <script lang="ts" setup>
    import {APIUri, list, update} from "@/api";
    import {reactive} from "vue";
    import {Auth} from "@/auth/common";
    import {VABreadcrumbItem} from "../../../modules/components/VABreadcrumb/typings";
    import {VASearchItem} from "../../../modules/components/VASearch/typings";
    import {VATableColumn} from "../../../modules/components/VATable/extends/typing";
    import {VAFormItem} from "../../../modules/components/VAForm/extends/typing";
    import {notify} from "@kyvg/vue3-notification";
    
    const auth = new Auth()
    const uris = APIUri.Role.restful
    const breadcrumbList: Array<VABreadcrumbItem> = [
      {label: "系统管理"},
      {label: "角色管理"},
    ]
    const searches: Array<VASearchItem> = [
      {field: 'name', placeholder: '请输入名称', paramsType: 'query'}
    ]
    const data = reactive({
      visible: false,
      rolePermission: [],
      activeId: 0,
    })
    const tableColumns: Array<VATableColumn> = [
      {title: "名称", dataIndex: "name", slot: "edit"},
      {title: "描述", dataIndex: "description"},
      {title: "更新时间", dataIndex: "updated_at"},
      {title: "操作", dataIndex: 'action', slot: 'action', options: {slots: ["updatePermission"]}},
    ]
    const formColumns: Array<VAFormItem> = [
      {label: 'Name', key: 'name', required: true, update: false},
      {label: 'Description', key: 'description'},
    ]
    const clickEdit = (roleId: number) => {
      getRolePermission(roleId)
      data.activeId = roleId
      data.visible = true
    }
    </script>


**Props**

|  属性  |  描述  |  类型  |  默认值  |
| --- | --- | --- | --- |
|  uris  |  增、删、改、查接口对象  |  RestfulUris   |  {}  |
|  tableColumns  |  表格字段的配置选项  |  Array<VATableColumn>  |  \[\]  |
|  searchOptions  |  搜索框的配置选项  |  Array<VASearchItem>  |  \[\]  |
|  searchDefaultParams  |  获取数据默认参数，查询时也会传入  |  Object  |  {}  |
|  formOptions  |  表单字段的配置选项  |  Array<VAFormItem>  |  \[\]  |
|  formDefaultParams  |  表单的默认值，添加和修改时会传入  |  Object  |  {}  |
|  breadcrumbOptions  |  面包屑导航栏选项  |  Array<VABreadcrumbItem>  |  \[\]  |
|  manual  |  是否手动调用后端接口  |  Boolean  |  false  |
|  selection  |  是否启用表格多选框  |  Boolean  |  false  |

**Event**

|  事件名  |  描述  |  参数  |
| --- | --- | --- |
|  beforeCreate  |  表单点击提交时调用接口前触发，用于处理参数，使用callback传回  |  (data, callback) => void  |
|  afterCreate  |  表单点击提交时调用接口后触发，一般用于后续事件  |  (data) => void  |
|  beforeUpdate  |  表单点击提交时调用接口前触发，用于处理参数，使用callback传回  |  (data, callback) => void  |
|  afterUpdate  |  表单点击提交时调用接口后触发，一般用于后续事件  |  (data) => void  |
|  beforeDelete  |  点击删除按钮调用接口前触发  |   |
|  afterDelete  |  点击删除按钮调用接口后触发  |   |

**Expose**

|  事件名  |  描述  |  参数  |
| --- | --- | --- |
|  onSearch  |  触发查询按钮，重新渲染列表  |  (value: any) => void  |
|  selectedRowKeys  |  启用表格selection后，选中的列  |  () => Array<any>  |
|  data  |  当前表单填写的数据，用于主动获取表单当前数据  |  () => Object  |
|  visible  |  当前表单的visible，用于主动打开模态框  |  () => visible  |
|  reload  |  清除查询条件，重载当前表格数据  |  (value: any) => void  |

**typings**

    interface RestfulUris {
        list: string      // 查询调用的后端接口
        get?: string      // 单个查询调用的接口
        create?: string   // 创建接口
        update?: string   // 更新接口
        delete?: string   // 删除接口
    }

#### VASearch 搜索组件

restful中的搜索组件，根据配置项，渲染出输入框或者下拉选择框。

**用法示例**

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3BMqYZXgEZj8OwZL/img/555cec38-737d-46bf-8b8b-151bd925e85a.png)

    <template>
      <VASearch :options="options" @on-search="onSearch" size="small"></VASearch>
    </template>
    
    <script setup lang="ts">
    import {APIUri} from "../../src/api";
    import {ref} from "vue";
    import {VASearch} from "../index"
    import {VASearchItem} from "../components/VASearch/typings";
    import {VASelectCascadeOptions} from "../components/VASelectCascade/typings";
    
    const options: Array<VASearchItem> = [
      {
        field: 'region_id', placeholder: '选择属地', paramsType: "query", tagType: 'select', width: '130px', isSearch: true,
        options: {uri: APIUri.Region.restful.list, label: 'name', value: 'id'},
      },
      {
        field: 'jira_status', placeholder: '工单状态', paramsType: "query", tagType: 'select', width: '130px', isSearch: true, queryType: 'in',
        options: [
          {label: "编写方案", value: "编写方案"},
          {label: "网络运维实施", value: "网络运维实施"},
          {label: "安全中心审批", value: "安全中心审批"},
          {label: "验收中", value: "验收中"},
          {label: "驳回", value: "驳回"},
        ],
      },
      {
        field: 'status', placeholder: '任务状态', paramsType: "query", tagType: 'select', width: '130px', isSearch: true, queryType: 'in',
        options: [
          {label: "待批准", value: "ready,init"},
          {label: "待实施", value: "review"},
          {label: "已实施", value: "success"},
          {label: "实施失败", value: "failed"},
        ],
      },
      {field: 'jira_key', placeholder: '请输入工单号', paramsType: "query", width: '110px', queryType: 'contains'},
      {field: 'description', placeholder: '请输入标题', paramsType: "query", width: '130px', queryType: 'contains'},
      {field: 'ip', placeholder: '请输入地址', width: '130px'},
    ]
    
    const onSearch = (value: any) =>{
      source.value = value
    }
    </script>

**Props**

|  属性  |  描述  |  类型  |  默认值  |
| --- | --- | --- | --- |
|  options  |  搜索栏配置选项  |  Array<VASearchItem>  |  \[\]  |
|  size  |  搜索栏大小  |  String  |  small  |

**Event**

|  事件  |  描述  |  参数  |
| --- | --- | --- |
|  on-search  |  搜索事件  |  () => value  |

**Typings**

    import {QueryType} from "../../typing";
    import {LabelValue, VASelectOptions} from "../VASelect/typings";
    import {VATabsOptions} from "../VATabs/typings";
    import {VATabsCascadeOptions} from "../VATabsCascade/typings";
    
    export interface VASearchItem{
        tagType?: 'tabs' | 'select' | 'select-cascade' | 'tabs-cascade' | 'input' | 'date'  // 搜索框的tag类型 默认为input
        field: string,                // 搜索绑定的字段名
        placeholder?: string,         // 输入框中的提示
        paramsType?: "query",         // 参数类型，如果是query 参数会转换为 [{key: field, val: '', type: 'eq'}] 用于高级查询
        queryType?: QueryType,        // 高级查询类型，有eq | contains | lt | gt | in | not in
        options?: VASearchItemOptions,// 下拉选择框和标签栏对应的高级选项，具体可参见对应的props
        width?: string,               // 搜索框的宽度
        slot?: string,                // 定义插槽名
        isSearch?: boolean          // 切换是否触发搜索事件，下拉选择框是下拉即搜索
    }
    
    export type VASearchItemOptions = VASelectOptions | VATabsOptions | VATabsCascadeOptions | Array<LabelValue>

#### VASelect 下拉选择框

基于原生的antd select之上增加了调用远程接口的下拉选择框

**用法示例**

    <template>
        <VASelect :options="selectOptions"
                  v-model:value="value"
                  placeholder="请选择用户"
                  width="120px"
                  size="small">
        </VASelect>
    </template>
    
    <script setup lang="ts">
    import {VASelect} from "../index";
    import {ref} from "vue";
    import {VASelectOptions} from "../components/VASelect/typings";
    import {KeyValueType} from "../typing";
    
    const value = ref(null)
    
    const selectOptions: VASelectOptions = {
      uri: '/user/list',
      label: 'name',
      value: 'id',
      labelFormat: (item: KeyValueType): string => {    // 如果format函数存在时，优先级最高
        return `${item.name}(${item.name_cn})`
      }
    }
    </script>

**Props**

|  属性  |  描述  |  类型  |  默认值  |
| --- | --- | --- | --- |
|  value  |  绑定的值  |  \[String, Number, Boolean, Array\]  |  null  |
|  options  |  选项，传入静态的值或者从远程获取  |  VASelectOptions \| Array<LabelValue>  |  null  |
|  size  |  下拉选项框大小  |  'small' \| 'default' \| 'large'  |  default  |
|  mode  |  模式，与antd的一样  |  multiple \| tags  |  null  |
|  placeholder  |  提示信息  |  string  |  ''  |
|  disabled  |  是否禁用  |  boolean  |  false  |
|  width  |  宽度  |  string  |  100%  |

**Events**

|  事件  |  描述  |  参数  |
| --- | --- | --- |
|  on-change  |  选中事件  |  () => value  |

**Typings**

    import {KeyValueType, QueryParams, QueryType} from "../../typing";
    
    export interface LabelValue {
        label: string
        value: string | number | Array<string> | Array<number>
    }
    export interface VASelectOptions {
        data?: Array<LabelValue>
        uri?: string             // 如果要调用接口，则启用uri模式
        label?: string           // 通过url调用到接口数据，要展示的数据key名称 比如name
        value?: string           // 通过url调用到接口数据，要绑定的数据key名称 比如id
        manual?: boolean         // 是否手动调用接口，默认上来就加载数据
        mode?: 'multiple' | 'tags'   // 多选或者标签选择
        multipleValueType?: 'string' | 'list'  // 如果为多选框，则需要指定值的类型，如果是string则对list以逗号进行拼接，默认是list
        defaultParams?: KeyValueType | QueryParams           // 默认参数
        paramsType?: 'query'                    // 查询参数类型 默认是key value类型
        queryType?: QueryType,                  // 如果是query类型，默认queryType是eq
        labelFormat?: (item: KeyValueType)=>string    // 格式化label的值
        valueFormat?: (item: KeyValueType)=>string    // 格式化value的值
    }

#### VARadioGrouo 单选框

基于原生的antd radio之上增加了调用远程接口的单选框

主要用于表单项tagType:radio-group

**用法示例**

    <template>
        <VARadioGroup :options="options"
                  v-model:value="value"
                  placeholder="请选择用户"
                  width="120px"
                  size="small">
        </VASelect>
    </template>
    
    <script setup lang="ts">
    import {VARadioGroup} from "../index";
    import {ref} from "vue";
    import {VARadioOptions} from "../components/VARadioGroup/typings";
    import {KeyValueType} from "../typing";
    
    const value = ref(null)
    
    const options: VARadioOptions = {
      uri: '/user/list',
      label: 'name',
      value: 'id',
    }
    </script>

**Props**

|  属性  |  描述  |  类型  |  默认值  |
| --- | --- | --- | --- |
|  value  |  绑定的值  |  \[String, Number, Boolean\]  |  null  |
|  options  |  选项，传入静态的值或者从远程获取  |  VARadioOptions \| string\[\] \| number\[\] \| Array<RadioItem>  |  null  |
|  size  |  下拉选项框大小  |  'small' \| 'default' \| 'large'  |  default  |
|  disabled  |  是否禁用  |  boolean  |  false  |

**Typings**

    export interface VARadioOptions{
        type?: 'default' | 'button'    // 单选框类型，可以是按钮
        uri?: string,                  // 后端数据接口
        label?: string,                // 后端数据列表中展示的label
        value?: string,                // 绑定的值
    }
    export interface RadioItem{        // 静态数据时使用的配置
        label: string
        value: string
        disabled?: boolean
    }

#### VACascader 树型组件

从后端接口调用数据的树型组件

**用法示例**

    <template>
        <VACascader :options="options"
                  v-model:value="value"
                  placeholder="请选择菜单"
                  width="120px"
                  size="small">
        </VACascader>
    </template>
    
    <script setup lang="ts">
    import {VACascaderOptions} from "../index";
    import {ref} from "vue";
    import {VACascaderOptions} from "../components/VACascader/typings";
    import {KeyValueType} from "../typing";
    
    const value = ref(null)
    
    const options: VACascaderOptions = {
      uri: '/menu/tree',
      label: 'name',
      value: 'id',
      labelFormat: (item: KeyValueType): string => {    // 如果format函数存在时，优先级最高
        return `${item.name}(${item.name_cn})`
      }
    }
    </script>

**Props**

|  属性  |  描述  |  类型  |  默认值  |
| --- | --- | --- | --- |
|  value  |  绑定的值  |  \[String, Number, Boolean, Array\]  |  null  |
|  options  |  选项，传入静态的值或者从远程获取  |  VACascaderOptions \| Array<CascaderItem>  |  null  |
|  size  |  下拉选项框大小  |  'small' \| 'default' \| 'large'  |  default  |
|  placeholder  |  提示信息  |  string  |  ''  |
|  disabled  |  是否禁用  |  boolean  |  false  |
|  width  |  宽度  |  string  |  100%  |

**Events**

|  事件  |  描述  |  参数  |
| --- | --- | --- |
|  on-change  |  选中事件  |  () => (value, selectedOptions)  |

**Typings**

    import {KeyValueType, QueryType} from "../../typing";
    
    export interface CascaderItem{
        label: string
        value: string | number
        children?: Array<CascaderItem>
    }
    
    export interface VACascaderOptions {
        uri?: string            // 如果要调用接口，则启用uri模式
        label?: string           // 通过url调用到接口数据，要展示的数据key名称 比如name
        value?: string           // 通过url调用到接口数据，要绑定的数据key名称 比如id
        manual?: boolean
        mode?: 'multiple' | 'tags'
        multipleValueType?: 'string' | 'list'  // 如果为多选框，则需要指定值的类型，如果是string则对list以逗号进行拼接，默认是list
        defaultParams?: KeyValueType // 默认参数
        paramsType?: 'query'
        queryType?: QueryType,
        labelFormat?: (item: KeyValueType)=>string
        valueFormat?: (item: KeyValueType)=>string,
        fieldNames?: {
            label: string
            value: string
            children: string
        }
    }

#### VAForm 动态表单

基于原生antd form封装的动态表单，表单项支持input、select、radio、switch、json等类型

**用法示例**

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3BMqYZXgEZj8OwZL/img/5f28b258-4dd8-43b5-b6bc-3f9a083de5e4.png)

    <template>
      <div class="main-content">
        <VAForm :data="source" :options="formItems"></VAForm>
      </div>
    </template>
    
    <script setup lang="ts">
    import {APIUri} from "../../src/api";
    import {VAFormItem} from "../typing";
    import {ref} from "vue";
    
    
    const source = ref({})
    // 表单配置
    const formItems: Array<VAFormItem> = [
      {label: '用户名', key: 'username', required: true, update: false},
      {label: '用户邮箱地址', key: 'email', required: true},
      {label: '用户中文名', key: 'name_cn', required: true},
      {
        label: '是否启用', key: 'enabled', tagType: 'switch', required: true, default: 1,
        options: {
          checked: {label: '是', value: 1},
          unChecked: {label: '否', value: 0},
        }
      },
      {
        label: '角色', key: 'role_id', tagType: 'select', required: true,
        options: {uri: APIUri.Role.restful.list, label: 'name', value: 'id'}
      }
    ]
    </script>

**Props**

|  属性  |  描述  |  类型  |  默认值  |
| --- | --- | --- | --- |
|  data  |  表单绑定的数据  |  Ref  |  {}  |
|  options  |  表单项配置数组  |  Array<VAFormItem>  |  null  |

**VAFormItem**

|  属性  |  描述  |  类型  |  默认值  |
| --- | --- | --- | --- |
|  label  |  表单项标签  |  string  |   |
|  key  |  表单项绑定的data里的key  |  string  |   |
|  requierd  |  是否必填  |  boolean  |  false  |
|  placeholder  |  填写提示信息  |  string  |   |
|  default  |  表单默认值  |  string \| number \| boolean  |   |
|  update  |  是否允许修改，为false不允许修改  |  boolean  |  null  |
|  tagType  |  表单项标签类型  |  VAFormTagType  |  input  |
|  options  |  复杂表单项配置  |  VAFormOptions  |   |
|  slot  |  插槽名  |  string  |   |
|  width  |  表单项宽度  |  string  |   |
|  change  |  select等选中事件回调  |  (value: any, data: any) => void  |   |

**Expose**

|  事件名  |  描述  |  参数  |
| --- | --- | --- |
|  source  |  表单数据  |   |
|  formRef  |  antd表单的ref，若按钮操作放到外面，则需要调用此来校验表单格式  |   |

**Typings**

    import {LabelValue, VASelectOptions} from "../../VASelect/typings";
    import {VASelectCascadeOptions} from "../../VASelectCascade/typings";
    import {VARadioOptions} from "../../VARadioGroup/typings";
    import {VASwitchOptions} from "../../VASwitch/typings";
    
    export interface VAFormItem {
        label: string               // 表单label标签
        key: string                 // 绑定的key
        required?: boolean           // 是否必填
        placeholder?: string         // 文本框提示
        default?: string | number | boolean      // 默认值
        disabled?: boolean          // 是否禁用
        update?: boolean,           // 是否可以修改，若表单title为修改并且 update=false, 则将disabled设置为True
        tagType?: VAFormTagType    // 标签类型
        options?: VAFormOptions             // 组件选项
        slot?: string
        width?: string
        change?: (value: any, data: any)=>void
    }
    
    export type VAFormTagType =
        'input'
        | 'input-password'
        | 'input-number'
        | 'select'
        | 'radio-group'
        | 'switch'
        | 'textarea'
        | 'ace-editor'
        | 'cascader' | 'select-cascade' | 'json-editor'
    export type VAFormOptions =
        FormInputOptions
        | VASelectOptions
        | VASelectCascadeOptions
        | VARadioOptions
        | VASwitchOptions
        | Array<LabelValue>
    
    export interface FormInputOptions {
        type?: 'text' | 'number' | 'password'           // 输入框类型 默认text
        prefix: string          // 前缀
        suffix: string          // 后缀
    }

#### VADescription 描述列表

基于原生antd description封装的根据json结构体渲染多样式描述列表

**用法示例**

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3BMqYZXgEZj8OwZL/img/76c423b8-e537-4f21-a5b7-4bbc9509a29a.png)

    <template>
         <VADescriptions title="工单信息"
                       :column="4"
                       :options="descriptions"
                       :data="data.taskData">
         <template #extra>
           <a-popconfirm title="执行任务？"
                         ok-text="确定"
                         cancel-text="取消"
                         @confirm="exec">
             <a-button type="success" class="exec-btn"
                       size="small">执行任务
             </a-button>
           </a-popconfirm>
         </template>
         <template #jiraKeyDescription>
           <a :href="'https://jira.xiaoxin.com/browse/' + data.taskData.jira_key"
              target="_blank">{{ data.taskData.jira_key }}</a>
         </template>
         <template #jiraStatusDescription>
           <template v-if="authSyncJiraStatus">
             <a-tag :color="jiraStatusColors[data.taskData.jira_status]">{{ data.taskData.jira_status }}</a-tag>
             <a title="同步jira状态">
               <VAIcon @click="asyncJiraStatus" type="reload-outlined"></VAIcon>
             </a>
           </template>
         </template>
       </VADescriptions>
    </template>
    
    <script setup lang="ts">
    import {APIUri} from "../../src/api";
    import {VAFormItem} from "../typing";
    import {ref} from "vue";
    
    
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
      {label: "任务状态", key: "status", slot: "statusDescription"},
      {label: "描述", key: "summary"}
    ]
    </script>

**Props**

|  属性  |  描述  |  类型  |  默认值  |
| --- | --- | --- | --- |
|  title  |  描述列表的标题  |  string  |   |
|  options  |  描述列表项配置  |  Array<VADescriptionsItem>  |   |
|  column  |  每行显示的列数  |  number  |  3  |
|  data  |  描述列表数据  |  Object  |  {}  |

**VADescriptionsItem**

|  属性  |  描述  |  类型  |  默认值  |
| --- | --- | --- | --- |
|  label  |  描述项的label  |  string  |   |
|  key  |  对应数据的key  |  string  |   |
|  tagType  |  标签类型  |  'tag' \| 'a'  |   |
|  style  |  样式  |  string  |   |
|  slot  |  自定义插槽  |  string  |   |
|  colors  |  如果是tag，对应值的颜色对象  |  Object  |   |
|  values  |  如果是tag，对应值展示的值  |  Object  |   |
|  span  |  占用宽度  |   |   |

**Typings**

    export interface VADescriptionsItem{
        label: string               // 描述列表的label
        key: string                 // 绑定的数据key
        tagType?: 'tag' | 'a'              // 标签类型
        style?: string                  // 样式
        slot?: string                  // 插槽名
        colors?: object,                // 颜色，对应tag的颜色
        values?: object,                // 转换的values
        span?: number                   // 占用宽度
    }

#### VASelectCascade 级联下拉选择框

基于原生select + VAselect做出的级联选择器，用于联动调用后端接口的级联选择框

**用法示例**

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3BMqYZXgEZj8OwZL/img/e5e5038b-548f-4780-aea3-6c35e0f7ab85.png)

    <template>
      <div class="main-body">
        <div style="margin: 30px">
          <VASelectCascade :data="source"
                           field="region_id"
                           :options="options"
                           placeholder="请选择属地"
                           width="130px"
                           size="small"
          >
          </VASelectCascade>
        </div>
      </div>
    </template>
    
    <script setup lang="ts">
    import {ref} from "vue";
    import {VASelectCascadeOptions} from "../components/VASelectCascade/typings";
    import {APIUri} from "../../src/api";
    
    const options: VASelectCascadeOptions = {
      uri: APIUri.Region.restful.list,
      label: 'name', value: 'id',
      child: {
        params: {
          type: 'query',
          field: 'region_id'
        },
        placeholder: '选择设备',
        width: '150px',
        uri: APIUri.Device.restful.list,
        label: "name",
        value: "id",
      },
    }
    
    const source = ref({})
    </script>

**Props**

|  属性  |  描述  |  类型  |  默认值  |
| --- | --- | --- | --- |
|  value  |  绑定的值  |  \[String, Number, Boolean, Array\]  |  null  |
|  options  |  选项，传入静态的值或者从远程获取  |  VASelectCascadeOptions  |  null  |
|  size  |  下拉选项框大小  |  'small' \| 'default' \| 'large'  |  default  |
|  placeholder  |  提示信息  |  string  |  ''  |
|  disabled  |  是否禁用  |  boolean  |  false  |
|  width  |  宽度  |  string  |  100%  |

**Events**

|  事件  |  描述  |  参数  |
| --- | --- | --- |
|  on-change  |  选中事件  |  () => (value, selectedOptions)  |

**Typings**

    import {KeyValueType, QueryParams, QueryType} from "../../typing";
    import {VASelectOptions} from "../VASelect/typings";
    
    export interface LabelValue {
        label: string
        value: string | number
    }
    
    export interface VASelectCascadeOptions {
        data?: Array<LabelValue>                // 如果是静态选项，则传data = [{label: "", value: ""}]
        uri?: string            // 如果要调用接口，则启用uri模式
        label?: string           // 通过url调用到接口数据，要展示的数据key名称 比如name
        value?: string           // 通过url调用到接口数据，要绑定的数据key名称 比如id
        manual?: boolean
        defaultParams?: KeyValueType | QueryParams // 默认参数
        labelFormat?: (item: KeyValueType)=>string
        valueFormat?: (item: KeyValueType)=>string
        child: VASelectCascadeChildOptions
    }
    export interface VASelectCascadeChildOptions extends VASelectOptions{
        // 父的change事件调用子元素参数配置
        params: {
            field: string               // 级联查询子接口时，调用的参数名
            type?: 'query'              // 级联调用子接口时传参类型
            queryType?: QueryType       // 级联调用子接口时query的类型
        }
        placeholder?: string
        width?: string
    }

#### VATable 表格

动态表格，声明好column，调用后端API，自动渲染出表格

**用法示例**

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3BMqYZXgEZj8OwZL/img/5be34399-f8c4-4f3f-ac87-521e58aba02b.png)

    <template>
      <div class="main-body">
        <VATable :uri="uris.list" :columns="tableColumns">
          <template #edit="{record}">
            <a>{{record.name}}</a>
          </template>
          <template #action="{ record }">
            <a style="margin-right: 10px" @click.prevent="clickEdit(record.id)">编辑权限</a>
            <a @click="onDelete(record)" style="color: #DC143C">删除</a>
          </template>
        </VATable>
      </div>
    </template>
    
    <script setup lang="ts">
    import {VATable} from "../index"
    import {APIUri} from "../../src/api";
    import {VATableColumn} from "../typing";
    
    const uris = APIUri.Role.restful
    
    const tableColumns: Array<VATableColumn> = [
      {title: "名称", dataIndex: "name", slot: "edit"},
      {title: "描述", dataIndex: "description"},
      {title: "更新时间", dataIndex: "updated_at"},
      {title: "操作", dataIndex: 'action', slot: 'action'},
    ]
    const clickEdit = (id: number) =>{
      console.log(id)
    }
    const onDelete = (id: number) =>{
      console.log(id)
    }
    </script>


**Props**

|  属性  |  描述  |  类型  |  默认值  |
| --- | --- | --- | --- |
|  uri  |  数据列表的接口  |  string  |   |
|  columns  |  表格每一列的配置  |  VATableColumn  |  \[\]  |
|  pagination  |  是否启用分页  |  boolean  |  true  |
|  bordered  |  是否开启边框  |  boolean  |  false  |
|  defaultParams  |  获取数据默认参数  |  Object  |  {}  |
|  manual  |  是否手动调用接口数据  |  boolean  |  false  |
|  selection  |  是否启用表格多选框  |  boolean  |  false  |
|  rowKey  |  启用多选框选中表格项返回的key  |  string  |   |

**Typings**

    export type VATableRecordBaseValue = string | number | boolean | Array<VATableRecordBaseValue>
    export type VATableRecord = { [key in string]: VATableRecord | VATableRecordBaseValue | Array<VATableRecord> }
    
    // table 表格每一列的选项
    export interface VATableColumn {
        title: string           // 表格header标头
        dataIndex?: string       // 取数据加的key
        width?: number           // 列宽
        ellipsis?:boolean       // tooltip
        slot?: string           // 插槽名，若启用需要对应插槽名，建议以table开头，如tableName
        tagType?: VATableColumnTagType    // 标签类型
        options?: VATableColumnOptions    // 标签选项，对应标签使用对应选项
        valueFormat?: (item: VATableRecord) => string     // 获取值回调函数
    }
    
    export type VATableColumnTagType = 'a' | 'tag' | 'switch' | 'router' | 'time'
    export type VATableColumnOptions =
        TableAOptions
        | TableTagOptions
        | TableTooltipOptions
        | TableRouterOptions
        | TableActionOptions
        | SwitchOptions
    
    // action 操作类型选项
    export interface TableActionOptions {
        slots: Array<string>        // 插槽数组
    }
    
    // a标签的选项
    export interface TableAOptions {
        click?: (item: VATableRecord) => void
    }
    
    // tag标签的选项
    export interface TableTagOptions {
        labels?: { [key in string | number]: string }
        colors?: { [key in string | number]: string }
    }
    
    // tooltip详情弹出
    export interface TableTooltipOptions {
        placement?: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'
        trigger?: 'hover' | 'focus' | 'click' | 'contextmenu'
        color?: string
    }
    
    // router路由跳转到详情的选项
    export interface TableRouterOptions {
        name: string                    // 跳转的vue router的name
        key?: string                    // 跳转时请求的url?key=value 如name=data[dataIndex]
        dataIndex?: string              // 取当前数据的dataIndex
        value?: string                  // 传入的定值
        query?: object,                 // 传入的默认参数
    }
    
    // switch 表格开关选项，一般用于修改某条数据的状态
    export interface SwitchOptions {
        disabled?: boolean
        checkedValue?: string | number | boolean
        unCheckedValue?: string | number | boolean
        checkedChildren?: string | number | boolean
        unCheckedChildren?: string | number | boolean
    }


**Expose**

|  属性  |  描述  |  参数  |
| --- | --- | --- |
|  reload  |  重载表格数据  |  params: object  |
|  selectedRowKeys  |  多选框选中的值  |   |

#### VATabs 标签栏

根据结构化数据生成标签栏，可调用接口获取远程数据

**用法示例**

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3BMqYZXgEZj8OwZL/img/f98be993-713d-480b-9073-7daeafab20a6.png)

    <template>
    <div class="main-body">
      <VATabs v-model:value="value"
              :options="options"
              @on-change="change"></VATabs>
    </div>
    </template>
    
    <script setup lang="ts">
    import {VATabs} from "../index"
    import {TabsItem, VATabsOptions} from "../components/VATabs/typings";
    import {APIUri} from "../../src/api";
    import {ref} from "vue";
    
    // 调用后端数据
    const options: VATabsOptions = {
      uri: APIUri.Region.restful.list,
      label: "name",
      value: "id"
    }
    
    // 静态数据结构
    const staticOptions: Array<TabsItem> = [
        {label: '上海', value: '上海'},
        {label: '南京', value: '南京'},
        {label: '贵州', value: '贵州'},
        {label: '广州', value: '广州'},
    ]
    
    const value = ref("")
    
    const change = (value: any) =>{
      console.log(value)
    }
    </script>


**Props**

|  属性  |  描述  |  类型  |  默认值  |
| --- | --- | --- | --- |
|  options  |  选项，传入静态的值或者从远程获取  |  VATabsOptions \| Array<TabsItem>  |   |
|  v-model:value  |  绑定的值  |  \[String, Number, Boolean\]  |   |

**Events**

|  事件  |  描述  |  参数  |
| --- | --- | --- |
|  on-change  |  下拉选择框的选中事件  |  () => (value)  |

**Typings**

    import {KeyValueType} from "../../typing";
    
    export interface VATabsOptions{
        uri?: string,           // 远程接口uri
        label?: string,         // 调用接口展示的属性
        value?: string,         // 返回接口数据选中的值
        labelFormat?: (item: KeyValueType) => string
        valueFormat?: (item: KeyValueType) => string
        position?: 'top' | 'right' | 'bottom' | 'left'      // 标签页的方向
        size?: 'large' | 'default' | 'small'                // 标签页的大小
        barGutter?: number                                  // 标签页的间隔
        type?: 'line' | 'card' | 'editable-card'            // tabs的样式类型，默认为line
        params?: object
    }
    
    export interface TabsItem{
        label: string,
        value: string | number
        slot?: string
        disabled?: boolean
    }

#### VATabsCascade 标签栏级联下拉框

标签栏带一个下拉选择框的级联，标签栏和下拉选择框数据级联，可以使用静态数据，也可以从后端调用数据

**用法示例**

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3BMqYZXgEZj8OwZL/img/ea15b01a-6349-4e5f-bd87-5d6f5f9b9a00.png)

    <template>
        <div>
          <VABreadcrumb :options="breadcrumbList"></VABreadcrumb>
        </div>
      <div class="main-body">
      </div>
    </template>
    
    <script setup lang="ts">
    import {VABreadcrumbItem} from "../components/VABreadcrumbItem/typings";
    
    const breadcrumbList: Array<VABreadcrumbItem> = [
      {label: "工单任务"},
      {label: "防火墙工单", name: "TaskFirewall"},
      {label: "工单详情"},
    ]
    </script>

**Props**

|  属性  |  描述  |  类型  |  默认值  |
| --- | --- | --- | --- |
|  options  |  选项，传入静态的值或者从远程获取  |  Array<VABreadcrumbItem>  |  null  |
|  v-model:value  |  绑定的值  |  \[String, Number, Boolean\]  |   |

**Events**

|  事件  |  描述  |  参数  |
| --- | --- | --- |
|  on-change  |  下拉选择框的选中事件  |  () => (value)  |

**Typings**

    import {VASelectOptions} from "../VASelect/typings";
    import {VATabsOptions} from "../VATabs/typings";
    import {QueryType} from "../../typing";
    
    export interface VATabsCascadeOptions extends VATabsOptions{
        child: VATabsCascadeChildOptions                             // tabs级联select
    }
    export interface VATabsCascadeChildOptions extends VASelectOptions{
        params: {
            field: string               // 级联查询子接口时，调用的参数名
            type?: 'query'              // 级联调用子接口时传参类型
            queryType?: QueryType       // 级联调用子接口时query的类型
        }
        placeholder?: string,
        size?: string,
        width?:string
    }


#### VABreadcrumb 面包屑导航

根据结构化数据渲染出导航栏，基于antd的面包屑导航栏封装。支持传入颜色和跳转

**用法示例**

![image](https://alidocs.oss-cn-zhangjiakou.aliyuncs.com/res/3BMqYZXgEZj8OwZL/img/46989eb8-5d67-4967-ab17-ac034c09029f.png)

    <template>
        <div>
          <VABreadcrumb :options="breadcrumbList"></VABreadcrumb>
        </div>
      <div class="main-body">
      </div>
    </template>
    
    <script setup lang="ts">
    import {VABreadcrumbItem} from "../components/VABreadcrumbItem/typings";
    
    const breadcrumbList: Array<VABreadcrumbItem> = [
      {label: "工单任务"},
      {label: "防火墙工单", name: "TaskFirewall"},
      {label: "工单详情"},
    ]
    </script>

**Props**

|  属性  |  描述  |  类型  |  默认值  |
| --- | --- | --- | --- |
|  options  |  选项，传入静态的值或者从远程获取  |  Array<VABreadcrumbItem>  |  null  |

**Typings**

    export interface VABreadcrumbItem{
        label: string       // 显示标签
        name?: string       // 跳转的路由名称
        color?: string      // 颜色
        slot?: boolean      // 插槽名
        query?: object      // 路由跳转参数
    }
