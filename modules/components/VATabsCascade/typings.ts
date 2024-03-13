import {VASelectOptions} from "../VASelect/typings";
import {VATabsOptions} from "../VATabs/typings";
import {QueryType} from "../../typing";

export interface VATabsCascadeOptions extends VATabsOptions{
    child: VATabsCascadeChildOptions                             // tabs级联select
}
export interface VATabsCascadeChildOptions extends VASelectOptions{
    params: {
        field: string               // 级联查询子接口时，调用的参数名
        type?: 'query'              // 级联调用子接口时传参类型
        queryType?: QueryType       // 级联调用子接口时query的类型
    }
    placeholder?: string,
    size?: string,
    width?:string
}
