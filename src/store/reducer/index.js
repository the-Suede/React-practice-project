import { combineReducers } from 'redux';
import userReducer from './user';
import cartReducer from './cart';
import commonReducer from './common';

const allReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    common: commonReducer
})

export default allReducer;
