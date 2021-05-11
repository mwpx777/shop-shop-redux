// GLOBAL STATE


// createContext instantiate new Context object (create container for global state date and functionality)
// useContext is react Hook that allows us to use state created from createContext function
import React, {createContext, useContext} from 'react';
import { useProductReducer } from './reducers';

// createContext creates new Context object
const StoreContext = createContext();
// 
const {Provider} = StoreContext;

// this function  will instantiate our global state with the useProductReducer() function
const StoreProvider = ({ value = [], ...props}) => {
    // state is most up to date version of global state object
    // dispatch is method we execute to update our state
    const [state, dispatch] = useProductReducer ({
        products: [],
        cart: [],
        cartOpen: false,
        categories: [],
        currentCategory: '',
    });
    // use this to confirm it works
    console.log(state);
    return <Provider value = {[state, dispatch]} {...props} />;
};

// when this function runs from within a component, we will receive the [state, dispatch] data the StoreProvider manages for us
const useStoreContext = () => {
    return useContext(StoreContext);
};

export {StoreProvider, useStoreContext};