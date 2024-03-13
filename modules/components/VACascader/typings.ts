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

