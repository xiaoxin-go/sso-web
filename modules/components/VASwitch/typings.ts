export interface VASwitchOptions{
    checked: SwitchChecked          // 激活状态下对应显示的label和要传入后台的value
    unChecked: SwitchChecked        // 未激活状态下对应显示的label和要传入后台的value
}
export interface SwitchChecked {       //  {label: "on", value: 1}
    label: string | number | boolean,
    value: string | number | boolean
}
