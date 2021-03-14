import axios from 'axios';

// export const baseURL = process.env.NODE_ENV=== 'development' ? 
// 'http://localhost:21212/api' :   // 开发环境
// 'http://120.76.247.5:21212/api'; // 生产环境，测试环境（本地测试环境，UAT测试环境...）
export const baseURL = 'http://47.112.240.136:5555'

// 创建一个axios实例
export const request = axios.create({
    baseURL: baseURL + '/api'
})

export const myapi = axios.create({
    baseURL: baseURL + '/api'
})

export default request;