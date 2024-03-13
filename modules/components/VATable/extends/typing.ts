export type VATableRecordBaseValue = string | number | boolean | Array<VATableRecordBaseValue>
export type VATableRecord = { [key in string]: VATableRecord | VATableRecordBaseValue | Array<VATableRecord> }

// table 表格每一列的选项
export interface VATableColumn {
  title: string           // 表格header标头
  dataIndex?: string       // 取数据加的key
  width?: number           // 列宽
  ellipsis?: boolean       // tooltip
  slot?: string           // 插槽名，若启用需要对应插槽名，建议以table开头，如tableName
  tagType?: VATableColumnTagType    // 标签类型
  options?: VATableColumnOptions    // 标签选项，对应标签使用对应选项
  valueFormat?: (item: VATableRecord) => string     // 获取值回调函数
  customCell?: (data: any, index: number) => any
}

export type VATableColumnTagType = 'a' | 'tag' | 'switch' | 'router' | 'time' | 'copy'
export type VATableColumnOptions =
  TableAOptions
  | TableTagOptions
  | TableTooltipOptions
  | TableRouterOptions
  | TableActionOptions
  | SwitchOptions

// action 操作类型选项
export interface TableActionOptions {
  slots: Array<string>        // 插槽数组
}

// a标签的选项
export interface TableAOptions {
  click?: (item: VATableRecord) => void
}

// tag标签的选项
export interface TableTagOptions {
  color?: string
  labels?: { [key in string | number]: string }
  colors?: { [key in string | number]: string }
}

// tooltip详情弹出
export interface TableTooltipOptions {
  placement?: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'
  trigger?: 'hover' | 'focus' | 'click' | 'contextmenu'
  color?: string
}

// router路由跳转到详情的选项
export interface TableRouterOptions {
  name: string                    // 跳转的vue router的name
  key?: string                    // 跳转时请求的url?key=value 如name=data[dataIndex]
  dataIndex?: string              // 取当前数据的dataIndex
  value?: string                  // 传入的定值
  query?: object,                 // 传入的默认参数
}

// switch 表格开关选项，一般用于修改某条数据的状态
export interface SwitchOptions {
  disabled?: boolean
  checkedValue?: string | number | boolean
  unCheckedValue?: string | number | boolean
  checkedChildren?: string | number | boolean
  unCheckedChildren?: string | number | boolean
}
