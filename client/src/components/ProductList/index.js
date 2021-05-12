import React, {useEffect} from "react";
import { useQuery } from '@apollo/react-hooks';

import ProductItem from "../ProductItem";
import {useSelector, useDispatch} from 'react-redux';
import { UPDATE_PRODUCTS} from '../../utils/actions';
import { QUERY_PRODUCTS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif"
import {idbPromise} from '../../utils/helpers';



function ProductList() {
 
    const state = useSelector((state) => {
      return state;
    })

    const dispatch = useDispatch();
    const { currentCategory } = state;
    const {loading, data} = useQuery(QUERY_PRODUCTS);

    useEffect(() => {
      // if there is data to be stored
      if(data){
        // store data to the globalState object
        dispatch({
          type: UPDATE_PRODUCTS,
          products: data.products
        });

        // also take each product and save it to IndexedDB using idbPromise helper function for offline 
        data.products.forEach((product) => {
          idbPromise('products', 'put', product);
        });
        // add else if to check if `loading` is undefined in `useQuery()` hook
      } else if (!loading){
        // since we are offline, get all of the data from `products` store
        idbPromise('products', 'get').then((products) => {
          // use retrieved data to set globalState for offline browsing
          dispatch({
            type: UPDATE_PRODUCTS,
            products: products
          });
        });
            }
    }, [data, loading, dispatch]);

    function filterProducts(){
      if(!currentCategory){
        return state.products;
      }
      return state.products.filter(product => product.category._id === currentCategory);
    }
  

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length ? (
        <div className="flex-row">
            {filterProducts().map(product => (
                <ProductItem
                  key= {product._id}
                  _id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                />
            ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      { loading ? 
      <img src={spinner} alt="loading" />: null}
    </div>
  );
}

export default ProductList;
