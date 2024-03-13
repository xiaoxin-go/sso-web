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
