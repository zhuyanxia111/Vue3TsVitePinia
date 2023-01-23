export interface Obj {
  [key: string]: any
}
export default function objCoppy(obj1: Obj, obj2: Obj) {
  Object.keys(obj2).forEach(key => {
    obj2[key] = obj1[key]
  })
}