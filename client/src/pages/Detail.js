// DETAIL

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';

import { QUERY_PRODUCTS } from "../utils/queries";
import spinner from '../assets/spinner.gif'

import { useStoreContext } from '../utils/GlobalState';

import Cart from '../components/Cart'
import { idbPromise } from '../utils/helpers';

import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS
} from '../utils/actions';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  // ADD TO CART
  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);

    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });

      // if updating cart quantity, use existing item data and increment purchaseQuantity value by 1
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      })
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 }
      });
      // if item isn't in cart, add it to current shopping cart in indexedDB
      idbPromise('cart', 'put', {...currentProduct, purchaseQuantity: 1});
    };
  };

  // REMOVE FROM CART
  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id
    });

    // upon removal from cart, delete the item from indexedDB using the `currentProduct._id` to locate item to remove
    idbPromise('cart', 'delete', {...currentProduct});
  };

  useEffect(() => {
    // products already in globalStore
    if (products.length) {
      setCurrentProduct(products.find(product => product._id === id));

      // retrieved from server
    } else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });

      data.products.forEach(product => {
        idbPromise('products', 'put', product);
      });


      // get cache from idb
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products
        });
      });
    }
  }, [products, data, loading, dispatch, id]);


  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">
            ← Back to Products
          </Link>

          <h2>{currentProduct.name}</h2>

          <p>
            {currentProduct.description}
          </p>

          <p>
            <strong>Price:</strong>
            ${currentProduct.price}
            {" "}
            <button onClick={addToCart}>
              Add to Cart
            </button>
            <button
              disables={!cart.find(p => p._id === currentProduct.id)}
              onClick={removeFromCart}>
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {
        loading ? <img src={spinner} alt="loading" /> : null
      }
      <Cart />
    </>
  );
};

export default Detail;
