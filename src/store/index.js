import { createStore } from 'redux';
import reducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

// const initState = {
//     userInfo: {
//         username: 'ling',
//         age: 14,
//         gender: "girl"
//     },
//     token: "qwertyaaabbbccc",
//     level: 1
// };

// const reducer = function (state = initState, action) {
//     console.log("a", Math.random());

//     switch (action.type) {
//         case 'changename':
//             return {
//                 ...state,
//                 userInfo: {
//                     ...state.userInfo,
//                     username: action.username
//                 }
//             }
//         case 'changeage':
//             return {
//                 ...state,
//                 userInfo: {
//                     ...state.userInfo,
//                     age: action.age
//                 }
//             }
//         case 'changelevel':
//             return {
//                 ...state,
//                 userInfo: {
//                     ...state.userInfo
//                 },
//                 level: action.level
//             }
//     };
//     return state;
// }

const store = createStore(reducer, composeWithDevTools());


export default store;