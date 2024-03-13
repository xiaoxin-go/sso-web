import {VATableRecord, VATableColumn} from "./components/VATable/extends/typing";
import {VAFormItem, VAFormOptions} from "./components/VAForm/extends/typing";

export {VATableRecord, VATableColumn, VAFormItem, VAFormOptions}

export type KeyValueType = {[key in string]: string | number | boolean}
export type QueryType = 'contains' | 'eq' | 'neq' | 'lt' | 'gt' | 'lte' | 'gte' | 'in' | 'not_in'
export interface QueryParams{
    query: Array<QueryParamsItem>
}
export interface QueryParamsItem{
    key: string
    val: string
    type?: QueryType
}

export type APIResult = {
    code: number,
    msg: string,
    page: number,
    no: number,
    per: number,
    encrypt: boolean,
    data: any
}
export interface RestfulUris {
    list: string
    get?: string
    create?: string
    update?: string
    delete?: string
}
