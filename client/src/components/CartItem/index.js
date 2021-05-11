// CART ITEM

import React from 'react';

import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

const CartItem = ({ item }) => {
    const [state, dispatch] = useStoreContext();

    const removeFromCart = item => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: item._id
        });
        // this will remove the item from indexedDB
        idbPromise('cart', 'delete', { ...item });
    };

    const onChange = (e) => {
        const value = e.target.value;

        // if number set to zero, remove item from cart
        if (value === '0') {
            dispatch({
                type: REMOVE_FROM_CART,
                _id: item._id
            });
            // update indexedDB if item value is set to '0'
            idbPromise('cart', 'delete', { ...item });
        } else {
            dispatch({
                type: UPDATE_CART_QUANTITY,
                _id: item._id,
                purchaseQuantity: parseInt(value)
            });
            // update indexedDB item value when value is other than '0'
            idbPromise('cart', 'put', {...item, purchaseQuantity: parseInt(value)});
        }
    };


    return (
        <div className="flex-row">
            <div>
                <img src={`/images/${item.image}`} alt="img" />
            </div>
            <div>
                <div> {item.name}, ${item.price}</div>
                <div>
                    <span>Qty:</span>
                    <input
                        type="number"
                        placeholder="1"
                        value={item.purchaseQuantity}
                        onChange={onChange} />
                    <span
                        onClick={() => removeFromCart(item)}
                        role="img"
                        aria-label="trash">
                        🗑️
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CartItem;