export interface VABreadcrumbItem{
    label: string       // 显示标签
    name?: string       // 跳转的路由名称
    color?: string      // 颜色
    slot?: boolean      // 插槽名
    query?: object      // 路由跳转参数
}
