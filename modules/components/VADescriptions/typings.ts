export interface VADescriptionsItem{
    label: string               // 描述列表的label
    key?: string                 // 绑定的数据key
    tagType?: 'tag' | 'a'              // 标签类型
    style?: string                  // 样式
    slot?: string                  // 插槽名
    colors?: object,                // 颜色，对应tag的颜色
    values?: object,                // 转换的values
    span?: number                   // 占用宽度
}
