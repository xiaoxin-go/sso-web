import {QueryType} from "../../typing";
import {LabelValue, VASelectOptions} from "../VASelect/typings";
import {VATabsOptions} from "../VATabs/typings";
import {VATabsCascadeOptions} from "../VATabsCascade/typings";

export interface VASearchItem{
    tagType?: 'tabs' | 'select' | 'select-cascade' | 'tabs-cascade' | 'input' | 'date'   // 搜索框的tag类型 默认为input
    field: string,
    placeholder?: string,
    paramsType?: "query",
    queryType?: QueryType,
    options?: VASearchItemOptions,
    width?: string,
    slot?: string,
    isSearch?: boolean          // 切换是否触发搜索事件
}

export type VASearchItemOptions = VASelectOptions | VATabsOptions | VATabsCascadeOptions | Array<LabelValue>
