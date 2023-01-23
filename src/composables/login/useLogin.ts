import { getCurrentInstance } from 'vue'
import { useUserStore,useMenuStore} from '@/store';
import { LoginParm } from "@/api/user/UserModel";
import { useRouter } from 'vue-router';
export default function useLogin(loginModel: LoginParm) {
    const { proxy } = getCurrentInstance() as any;
    const store = useUserStore()
    const router = useRouter()
    //登录提交
    const login = () => {
        proxy.$refs.loginFormRef.validate(async (valid: boolean) => {
            if (valid) {
                store.login(loginModel).then(res => {
                    if (res.data.code == 200) {
                        store.getInfo()
                        //跳转首页
                        router.push({ path: '/' })
                    }
                })
            }
        })
    }
    return {
        login
    }
}