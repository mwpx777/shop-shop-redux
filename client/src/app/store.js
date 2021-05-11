import {configureStore} from '@reduxjs/toolkit';

import {UPDATE_PRODUCTS_REDUCER} from "../features/updateProductsSlice"
import {UPDATE_CATEGORIES_REDUCER} from "../features/categorySlice"
import {UPDATE_CURRENT_CATEGORY_REDUCER} from "../features/currentCategorySlice"
import {ADD_TO_CART_REDUCER} from "../features/addToCartSlice"
import {ADD_MULTIPLE_TO_CART_REDUCER} from "../features/addMultipleSlice"
import {REMOVE_FROM_CART_REDUCER} from "../features/removeFromCartSlice"
import {UPDATE_CART_QUANTITY_REDUCER} from "../features/updateCartQuantitySlice"
import {CLEAR_CART_REDUCER} from "../features/clearCartSlice"
import {TOGGLE_CART_REDUCER} from "../features/toggleCartSlice"

export default configureStore({
    reducer: {
        updateProducts: UPDATE_PRODUCTS_REDUCER,
        updateCategories: UPDATE_CATEGORIES_REDUCER,
        updateCurrentCategory: UPDATE_CURRENT_CATEGORY_REDUCER,
        addToCart: ADD_TO_CART_REDUCER,
        addMuiltipleToCart: ADD_MULTIPLE_TO_CART_REDUCER,
        removeFromCart: REMOVE_FROM_CART_REDUCER,
        updateCartQuantity: UPDATE_CART_QUANTITY_REDUCER,
        clearCart: CLEAR_CART_REDUCER,
        toggleCart: TOGGLE_CART_REDUCER
    }
})