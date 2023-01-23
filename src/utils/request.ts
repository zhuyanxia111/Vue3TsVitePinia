import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise, AxiosResponse, ParamsSerializerOptions, RawAxiosRequestHeaders } from "axios"
import { getToken } from "@/utils/auth";
import { ElMessage } from "element-plus";
import qs from "qs"
export enum StatusCode {
  NoAuth = 600,
  Success = 200
}
//返回值的类型
export interface Result<T = any> {
  code: number,
  msg: string,
  data: T
}

class request {
  private instance: AxiosInstance;//aixos实例
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors()
  }
  //拦截器
  private interceptors() {
    //请求拦截
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      let token = getToken() || '';
      if (token) {
        config.headers = {
          ...config.headers as RawAxiosRequestHeaders,
          token: token,
        };
      }
      return config
    }, (error) => {
      // 错误抛到业务代码
      error.data = {}
      error.data.msg = '服务器异常，请联系管理员！'
      return error
    })
    //响应拦截
    this.instance.interceptors.response.use((res: AxiosResponse): any => {
      if (res && res.data) {
        const data = res.data as any;
        if (data.code == StatusCode.NoAuth) {
          //清空sessionStorage数据
          sessionStorage.clear();
          //跳到登录
          window.location.href = "/login";
        } else if (data.code == StatusCode.Success || res.config.responseType === "arraybuffer") {
          return res;
        } else { // 这里我们在服务端将正确返回的状态码标为200
          ElMessage.error(data.msg || '服务器出错!')
          return res || null // 返回数据
        }
      }
    }, (error: any) => {
      error.data = {};
      if (error && error.response) {
        switch (error.response.status) {
          case 400:
            error.data.msg = '错误请求';
            ElMessage.error(error.data.msg)
            break
          case 401:
            error.data.msg = '未授权，请重新登录';
            ElMessage.error(error.data.msg)
            break
          case 403:
            error.data.msg = '拒绝访问';
            ElMessage.error(error.data.msg)
            break
          case 404:
            error.data.msg = '请求错误,未找到该资源';
            ElMessage.error(error.data.msg)
            break
          case 405:
            error.data.msg = '请求方法未允许';
            ElMessage.error(error.data.msg)
            break
          case 408:
            error.data.msg = '请求超时';
            ElMessage.error(error.data.msg)
            break
          case 500:
            error.data.msg = '服务器端出错';
            ElMessage.error(error.data.msg)
            break
          case 501:
            error.data.msg = '网络未实现';
            ElMessage.error(error.data.msg)
            break
          case 502:
            error.data.msg = '网络错误';
            ElMessage.error(error.data.msg)
            break
          case 503:
            error.data.msg = '服务不可用';
            ElMessage.error(error.data.msg)
            break
          case 504:
            error.data.msg = '网络超时';
            ElMessage.error(error.data.msg)
            break
          case 505:
            error.data.msg = 'http版本不支持该请求';
            ElMessage.error(error.data.msg)
            break
          default:
            error.data.msg = `连接错误${error.response.status}`;
            ElMessage.error(error.data.msg)
        }
      } else {
        error.data.msg = "连接到服务器失败";
        ElMessage.error(error.data.msg)
      }
      return error
    })
  }
  //get请求?拼接数据
  get<T = any>(url: string, parms?: any): Promise<Result<T>> {
    return new Promise((resolve, reject) => {
      this.instance.get<T>(url, {
        params: parms,
        paramsSerializer: {
          serialize: (parms) => {
            return qs.stringify(parms)
          }
        }
      }).then((res) => {
        resolve(res.data as any)
      }).catch((error) => {
        reject(error)
      })
    })
  }
  //参数处理
  getParms(parms: any) {
    let _parms = ''
    if (!Object.is(parms, undefined || null)) {
      for (const key in parms) {
        if (parms.hasOwnProperty(key) && parms[key]) {
          _parms += `${parms[key]}/`
        }
      }
    }
    if (_parms) _parms = _parms.substring(0, _parms.length - 1)
    return _parms
  }
  getRestApi<T = any>(url: string, parms?: any): Promise<Result<T>> {
    return new Promise((resolve, reject) => {
      this.instance.get<T>(`${url}/${this.getParms(parms) || ''}`).then((res) => {
        resolve(res.data as any)
      }).catch((error) => {
        reject(error)
      })
    })
  }
  delete<T = any>(url: string, parms?: any): Promise<Result<T>> {
    return new Promise((resolve, reject) => {
      this.instance.delete<T>(`${url}/${this.getParms(parms) || ''}`).then((res) => {
        resolve(res.data as any)
      }).catch((error) => {
        reject(error)
      })
    })
  }
  post<T = any>(url: string, parms?: any, config?: AxiosRequestConfig<any> | undefined): Promise<Result<T>> {
    return new Promise((resolve, reject) => {
      this.instance.post<T>(url, parms, {
        transformRequest: [
          (params) => {
            return JSON.stringify(params)
          }
        ],
        headers: {
          "Content-Type": 'application/json'
        },
        ...config
      }).then((res) => {
        resolve(res.data as any)
      }).catch((error) => {
        reject(error)
      })
    })
  }
  put<T = any>(url: string, parms?: any): Promise<Result<T>> {
    return new Promise((resolve, reject) => {
      this.instance.put<T>(url, parms, {
        transformRequest: [
          (params) => {
            return JSON.stringify(params)
          }
        ],
        headers: {
          "Content-Type": 'application/json'
        }
      }).then((res) => {
        resolve(res.data as any)
      }).catch((error) => {
        reject(error)
      })
    })
  }
  getImage(url: string) {
    return this.instance.post(url, null, {
      responseType: 'arraybuffer'
    })
  }
  login<T = any>(url: string, params?: any): Promise<Result<T>> {
    return new Promise((resolve, reject) => {
      this.instance.post<T>(url, params, {
        transformRequest: [
          (params) => {
            return qs.stringify(params)
          }
        ],
        headers: {
          "Content-Type": 'application/x-www-form-urlencoded'
        }
      }).then((res) => {
        resolve(res as any)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}
export default request;