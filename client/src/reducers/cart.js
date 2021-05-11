// CART

const cartReducer = (state, action) => {
    switch(action.type){
       
        case ADD_TO_CART:
            return {
                ...state,
                // this will open the cart if it isn't already open
                cartOpen: true,
                // this will add new product to end of cart array
                cart: [...state.cart, action.product]
            };

        case ADD_MULTIPLE_TO_CART:
            return {
                ...state,
                cart: [...state.cart, ...action.products],
            };

        case REMOVE_FROM_CART:
            let newState = state.cart.filter(product => {
                // return all items in cart that are not the action._id
                return product._id !== action._id;
            });

            return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState
            };

        case UPDATE_CART_QUANTITY:
            return{
                ...state,
                cartOpen: true,
                cart: state.cart.map(product => {
                    if(action._id === product._id){
                        product.purchaseQuantity = action.purchaseQuantity;
                    }
                    return product;
                })
            };

        case CLEAR_CART:
            return{
                ...state,
                cartOpen: false,
                cart: []
            };

        case TOGGLE_CART:
            return{
                ...state,
                cartOpen: !state.cartOpen
            };

            default: 
            return state;
    }
};

export default cartReducer;