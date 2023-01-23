import { App } from "vue"
import registerElement from "./register-element"
import registerIcon from "./register-icon"
export function globalRegister(app: App): void {
  registerElement(app)
  registerIcon(app)
}