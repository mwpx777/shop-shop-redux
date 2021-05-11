// IMPORT ALL REDUCERS

import cartReducer from './cart';
import categoriesReducer from './categories';
import productsReducer from './products';

import { combineReducers } from 'redux';

const allReducers = combineReducers({
   cart: cartReducer,
   categories: categoriesReducer,
   products: productsReducer

})

export default allReducers;