import "element-plus/theme-chalk/index.css"
import { App } from "vue"
import { ElAside, ElBreadcrumb, ElBreadcrumbItem, ElButton, ElContainer, ElIcon, ElRadio, ElRadioGroup, ElTabPane, ElTabs } from 'element-plus/lib/index'
const components = [
  ElButton,
  ElRadio,
  ElRadioGroup,
  ElContainer,
  ElAside,
  ElIcon,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElTabs,
  ElTabPane,
]
export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}

