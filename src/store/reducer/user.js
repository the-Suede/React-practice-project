import { LOGIN, LOGOUT, CHANGE_USERNAME, CHANGE_USERLEVEL } from '../actions/user'

let userInfo = localStorage.getItem("userInfo");
try {
    userInfo = JSON.parse(userInfo) || {}
} catch (err) {
    userInfo = {}
}

const initState = {
    userInfo,
}


const reducer = function (state = initState, action) {
    switch (action.type) {
        case CHANGE_USERNAME:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    username: action.username
                }
            }
        case CHANGE_USERLEVEL:
            return {
                ...state,
                userInfo: { ...state.userInfo },
                level: action.level
            }
        case LOGIN:
            //存store和存本例同步
            localStorage.setItem('userInfo', JSON.stringify(action.userInfo));
            return {
                ...state,
                userInfo: action.userInfo
            }
        case LOGOUT:
            //改变store和删除本地同步
            localStorage.removeItem("userInfo");
            return {
                ...state,
                userInfo: {}
            }
        default:
            return state
    };

}

export default reducer;