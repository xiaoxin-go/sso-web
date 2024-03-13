import { LabelValue, VASelectOptions } from "../../VASelect/typings";
import { VASelectCascadeOptions } from "../../VASelectCascade/typings";
import { VARadioOptions } from "../../VARadioGroup/typings";
import { VASwitchOptions } from "../../VASwitch/typings";
import {TimePickerOptions} from "../../VATimePicker/typings";
import {InputNumberOptions} from "../../VAInputNumber/typings";

export interface VAFormItem {
  label: string               // 表单label标签
  key: string                 // 绑定的key
  required?: boolean           // 是否必填
  placeholder?: string         // 文本框提示
  default?: string | number | boolean,      // 默认值
  disabled?: boolean          // 是否禁用
  update?: boolean,           // 是否可以修改，若表单title为修改并且 update=false, 则将disabled设置为True
  tagType?: VAFormTagType    // 标签类型
  options?: VAFormOptions             // 组件选项
  slot?: string
  width?: string
  help?:string              // 帮助文字
  size?: string             // 大小
  change?: (value: any, data: any) => void
}

export type VAFormTagType =
  'input'
  | 'input-password'
  | 'input-number'
  | 'select'
  | 'radio-group'
  | 'switch'
  | 'textarea'
  | 'cascader' | 'select-cascade' | 'json-editor' | 'ace-editor' | 'time-picker'
export type VAFormOptions =
  FormInputOptions
  | VASelectOptions
  | VASelectCascadeOptions
  | VARadioOptions
  | VASwitchOptions
  | Array<LabelValue> | TimePickerOptions | InputNumberOptions

export interface FormInputOptions {
  type?: 'text' | 'number' | 'password'           // 输入框类型 默认text
  prefix?: string          // 前缀
  suffix?: string          // 后缀
  addonAfter?: string | ""
  addonBefore?: string | ""
}
