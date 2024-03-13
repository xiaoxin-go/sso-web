export interface VATransfer {
  url: Url,
  ID: number,
  params?: string//传参的参数
  size?: number, //默认获取多少条数据 不传默认all:true (获取所有)
  pagination?: boolean, //默认false
  showSearch?: boolean, //默认为true
  pageSize?: Number,//pagination为true  默认20一页
  query?: string | object,//传参参数名
  type: string,//传参的值
  render?: boolean,// render solt
  manual?: boolean //手动触发左边的数据
}

export interface Url {
  update: string, //更新接口
  targetList: string,//获取选中数据接口
  dataSource: string//获取所有数据接口
}
