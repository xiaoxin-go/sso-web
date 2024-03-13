export interface VACardOptions{
    router?: VACardRouterOptions
    title?: string
    icon?: string
    label?: string
    labelFormat?: (item: any) => string
    content?: string
}
export interface VACardRouterOptions{
    name?: string               // 跳转的路由name 只支持此方式，不支持path方式
    field?: string              // path 后面传的参数名
    valueField?: string         // path 后面伟的参数值的字段名（从当前数据取的字段名）
    defaultParams?: object     // 默认参数
}
