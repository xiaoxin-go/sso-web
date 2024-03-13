import {PropType} from "vue";
import {VASearchItem} from "../VASearch/typings";
import {VABreadcrumbItem} from "../VABreadcrumb/typings";
import {RestfulUris} from "../../typing";
import {VAFormItem} from "../VAForm/extends/typing";
import {VACardRestOptions} from "./typings";

export default {
    uris: {
        type: Object as PropType<RestfulUris>,
        required: true,
        default: () =>{
            return {}
        }
    },
    cardOptions: {
        type: Object as PropType<VACardRestOptions>,
        required: true,
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
    breadcrumbOptions:{
        type: Object as PropType<Array<VABreadcrumbItem>>,
        default: ()=>{
            return []
        }
    }
}
