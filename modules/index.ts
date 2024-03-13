import VARest from './components/VARest/VARest.vue'
import VATable from "./components/VATable/VATable.vue";
import VAFormDrawer from "./components/VAFormDrawer/VAFormDrawer.vue"
import VAFormModal from "./components/VAFormModal/VAFormModal.vue"
import VAFormTransfer from "./components/VAFormTransfer/VAFormTransfer.vue"
import VAForm from "./components/VAForm/VAForm.vue"
import VASelect from "./components/VASelect/VASelect.vue"
import VASelectCascade from "./components/VASelectCascade/VASelectCascade.vue"
import VACascader from "./components/VACascader/VACascader.vue"
import VATabs from "./components/VATabs/VATabs.vue"
import VATabsCascade from "./components/VATabsCascade/VATabsCascade.vue"
import VASearch from "./components/VASearch/VASearch.vue"
import VABreadcrumb from "./components/VABreadcrumb/VABreadcrumb.vue"
import VADescriptions from "./components/VADescriptions/VADescriptions.vue"
import VAIcon from "./components/VAIcon/VAIcon.vue"
import VAPopconfirm from "./components/VAPopconfirm/VAPopconfirm.vue"
import VACardRest from "./components/VACardRest/VACardRest.vue"
import SvgIcon from "./components/SvgIcon/SvgIcon.vue"
import SelectSvgIcon from "./components/SvgIcon/SelectIcon.vue"
import VACodemirror from "./components/VACodemirror/VACodemirror.vue"


export {
    VARest,
    VATable,
    VAForm,
    VASelect,
    VASelectCascade,
    VACascader,
    VATabs,
    VATabsCascade,
    VASearch,
    VADescriptions,
    VAIcon,
    VAPopconfirm,
    VACardRest,
    SvgIcon,
    SelectSvgIcon,
    VACodemirror,
}

export default {
    install(app: any) {
        app.component('VARest', VARest)
        app.component('VATable', VATable)
        app.component('VAFormDrawer', VAFormDrawer)
        app.component('VAFormModal', VAFormModal)
        app.component('VAFormTransfer', VAFormTransfer)
        app.component('VAForm', VAForm)
        app.component('VASelect', VASelect)
        app.component('VASelectCascade', VASelectCascade)
        app.component('VACascader', VACascader)
        app.component('VATabs', VATabs)
        app.component('VATabsCascade', VATabsCascade)
        app.component('VASearch', VASearch)
        app.component('VABreadcrumb', VABreadcrumb)
        app.component('VADescriptions', VADescriptions)
        app.component('VAIcon', VAIcon)
        app.component('VAPopconfirm', VAPopconfirm)
        app.component('VACardRest', VACardRest)
        app.component('SvgIcon', SvgIcon)
        app.component('SelectSvgIcon', SelectSvgIcon)
        app.component('VACodemirror', VACodemirror)
    }
}
