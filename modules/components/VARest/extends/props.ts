import { PropType } from "vue";
import { RestfulUris } from '../../../typing'
import { VATableColumn } from "../../VATable/extends/typing";
import { VAFormItem } from "../../VAForm/extends/typing";
import { VASearchItem } from "../../VASearch/typings";
import { VABreadcrumbItem } from "../../VABreadcrumb/typings";

export default {
    uris: {
        type: Object as PropType<RestfulUris>,
        required: true,
        default: () =>{
            return {}
        }
    },
    tableColumns: {
        type: Object as PropType<Array<VATableColumn>>,
        required: true,
        default: () =>{
            return [] as Array<VATableColumn>
        }
    },
    searchOptions: {
      type: Object as PropType<Array<VASearchItem>>
    },
    searchDefaultParams: {
      type: Object,
      default: () =>{
          return {}
      }
    },
    formOptions: {
        type: Object as PropType<Array<VAFormItem>>,
        default: () =>{
            return [] as Array<VAFormItem>
        }
    },
    formDefaultParams: {
        type: Object,
        default: () =>{
            return {}
        }
    },
    formWidth: {
        type: String,
        default: () =>{
            return "calc(50%)"
        }
    },
    breadcrumbOptions:{
        type: Object as PropType<Array<VABreadcrumbItem>>,
        default: ()=>{
            return []
        }
    },
    // 是否进入就调用API
    manual: {
        type: Boolean,
        default: false
    },
    selection:{
        type: Boolean,
    },
    tableExpand: {
        type: Boolean
    },
    tableFormat: {
        type: Function
    },
    tableBordered: Boolean,
}
