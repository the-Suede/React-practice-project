import { ONE_CHOSEN, ALL_CHOSEN } from '../actions/cart';

let cart_data = localStorage.getItem("cart");
try {
    cart_data = JSON.parse(cart_data) || []
} catch (err) {
    cart_data = []
}

const initState = {
    cart_data,//cart_data:[{xxx},{xxx}]
}


const reducer = function (state = initState, action) {
    switch (action.type) {
        //单选
        case ONE_CHOSEN:
            let id = action.goods_id;
            state.cart_data.map(item => {
                if (item.goods_id == id) {
                    item.is_select = !item.is_select
                }
            })
            localStorage.setItem('cart', JSON.stringify(cart_data));
            return {
                cart_data
            }
        //全选
        case ALL_CHOSEN:

            state.cart_data.map(item => {
                item.is_select = !item.is_select
            })
            localStorage.setItem('cart', JSON.stringify(cart_data));
            return {
                cart_data
            }
        //修改数量
        // case NUM_CHANGE:
        //     let goods_id = action.goods_id;
        //     let newNum = action.goods_num;
        //     let username = action.username;
        //     // console.log('1111');
        //     myapi.post('/cart/numchange', {
        //         newNum,
        //         goods_id
        //     }).then(async ({ data }) => {
        //         console.log("num_change修改成功", data);
        //         if (data.code == 200) {
        //             let { data: { data } } = await myapi.get('/cart', { params: { username } })
        //             console.log("num_change修改后的数据", data);
        //             localStorage.setItem('cart', JSON.stringify(data));
        //         }
        //     })
        //     return {
        //         ...state
        //     }
        default:
            return state
    };

}

export default reducer;