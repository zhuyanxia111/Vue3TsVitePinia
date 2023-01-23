import "element-plus/theme-chalk/index.css"
import { App } from "vue"
import { ElAside, ElButton, ElContainer, ElIcon, ElRadio, ElRadioGroup } from 'element-plus/lib/index'
const components = [
  ElButton,
  ElRadio,
  ElRadioGroup,
  ElContainer,
  ElAside,
  ElIcon
]
export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}

