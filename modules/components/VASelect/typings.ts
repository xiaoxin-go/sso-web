import {KeyValueType, QueryParams, QueryType} from "../../typing";

export interface LabelValue {
    label: string
    value: string | number | Array<string> | Array<number>
}


export interface VASelectOptions {
    data?: Array<LabelValue>
    uri?: string            // 如果要调用接口，则启用uri模式
    label?: string           // 通过url调用到接口数据，要展示的数据key名称 比如name
    value?: string           // 通过url调用到接口数据，要绑定的数据key名称 比如id
    manual?: boolean
    mode?: 'multiple' | 'tags'
    multipleValueType?: 'string' | 'list'  // 如果为多选框，则需要指定值的类型，如果是string则对list以逗号进行拼接，默认是list
    defaultParams?: KeyValueType | QueryParams           // 默认参数
    paramsType?: 'query'                    // 查询参数类型 默认是key value类型
    queryType?: QueryType,                  // 如果是query类型，默认queryType是eq
    labelFormat?: (item: KeyValueType)=>string
    valueFormat?: (item: KeyValueType)=>string
}
