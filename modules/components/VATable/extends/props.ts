import { PropType } from "vue";
import { VATableColumn } from "./typing";

export default {
    // 请求的uri
    uri: {
        type: String,
        required: true,
        default: ""
    },
    // 表格行属性
    columns: {
        type: Array as PropType<Array<VATableColumn>>,
        required: true,
        default: () => []
    },
    // 是否启用分页，默认启用
    pagination: {
        type: Boolean,
        default: true
    },
    // 默认没有边框
    bordered: {
        type: Boolean,
        default: false
    },
    // 调用uri时传入的默认参数，{name: 'test'}
    defaultParams: {
        type: Object,
        default: () => {
            return {}
        }
    },
    // 是否进入就调用API
    manual: {
        type: Boolean,
        default: false
    },
    selection:{
        type: Boolean,
        default: false
    },
    rowKey:{
        type: String,
        default: "id"
    },
    expand: {
        type: Boolean,
        default: false,
    },
    format: {
        type: Function,
    },
}
