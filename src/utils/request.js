import axios from 'axios'
import baseURL from './baseUrl'
import { getLocal } from '../utils'
import { authChangeAction } from '../store/actionCreator'
import store from '../store'

//创建axios实例
const service = axios.create({
    baseURL: baseURL, // api的base_url
    timeout: 200000, // 请求超时时间
    withCredentials: true // 选项表明了是否是跨域请求
})
// 这个拦截器会在你发送请求之前运行
// 我的这个请求拦截器的功能是为我每一次请求去判断是否有token，如果token存在则在请求头加上这个token。后台会判断我这个token是否过期。
service.interceptors.request.use(config => {
    // 请求头添加token
    if (getLocal('authed')) {
        config.headers.Authorization = `Bearer ${getLocal('authed')}`
    }
    const flag = (config.data && config.data.loading !==false) || (config.params && config.params.loading !== false)
    if(flag){
        let loading
        loading = document.getElementById('ajaxLoading')
        loading.style.display = 'block'
    }
    return config;
}, err => {
    console.log('请求失败')
    return Promise.reject(err)
})



//拦截响应
//请求中 显示lodding状态 
service.interceptors.response.use(config => {
    if(config.data && config.data.loading !==false){
        let loading
        loading = document.getElementById('ajaxLoading')
        loading.style.display = 'none'
    }
    return config;
}, err => {
    console.log('响应失败')
    return Promise.reject(err)
})



// respone拦截器

//成功返回数据
//error
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code !== 1) {
            res.code = res.data.code
            res.message = res.response.data.msg
            return Promise.reject('error')
        } else {
            return response.data
        }
    },
    error => {
        const { status } = error.response
        switch (status) {
            case 401:
            store.dispatch(authChangeAction(null))
                break;
        
            default:
                break;
        }
        return Promise.reject(error)
    }
)
export default service
