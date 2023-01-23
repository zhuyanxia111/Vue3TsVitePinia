// formRef: 表单的ref属性  obj表单的数据域
import type { FormInstance } from 'element-plus'
interface obj {
  [key: string]: any
}
export default function resetForm(formRef: FormInstance | undefined, obj: obj) {
  //清空数据域
  Object.keys(obj).forEach(key => {
    obj[key] = '';
  })
  //清空表单
  if (!formRef) return
  //先清空校验再清空数据，否则会触发校验
  formRef.clearValidate();
  formRef.resetFields();
}