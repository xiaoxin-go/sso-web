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
