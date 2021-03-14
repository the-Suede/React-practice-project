//reducer文件和actions文件统一type名
export const LOGIN = 'login';
export const LOGOUT = 'logout';
export const CHANGE_USERNAME = 'CHANGE_USERNAME';
export const CHANGE_USERLEVEL = 'CHANGE_USERLEVEL';

//用函数的形式，帮助调用dispatch者代理type
export function login(userInfo) {
    return {
        type: LOGIN,
        userInfo
    }
}

export function logout() {
    return {
        type: LOGOUT
    }
}

export function changename(username) {
    return {
        type: CHANGE_USERNAME,
        username
    }
}

// export function changelevel(level) {
//     return {
//         type: CHANGE_USERLEVEL,
//         level
//     }
// }

export default {
    login, logout, changename
}


