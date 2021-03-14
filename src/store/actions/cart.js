//reducer文件和actions文件统一type名
export const ONE_CHOSEN = 'ONE_CHOSEN';
export const ALL_CHOSEN = 'ALL_CHOSEN';
// export const NUM_CHANGE = 'NUM_CHANGE';

//用函数的形式，帮助调用dispatch者代理type
export function one_chosen(goods_id) {
    return {
        type: ONE_CHOSEN,
        goods_id
    }
}
export function all_chosen() {
    return {
        type: ALL_CHOSEN,
    }
}
// export function num_change(goods_num, goods_id) {
//     return {
//         type: NUM_CHANGE,
//         goods_num,
//         goods_id,
//     }
// }
export default {
    one_chosen, all_chosen
}


