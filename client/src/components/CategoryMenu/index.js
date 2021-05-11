// CATEGORY MENU

import React, { useEffect } from "react";
// import { useQuery } from '@apollo/react-hooks';
// import { QUERY_CATEGORIES } from "../../utils/queries";
// import {UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY} from '../../utils/actions';
// import {useStoreContext} from '../../utils/GlobalState';

import { idbPromise } from '../../utils/helpers';

import { allReducers } from '../../reducers';

import { useSelector, useDispatch } from 'react-redux';

function CategoryMenu({ setCategory }) {
  // const store = createStore(
  //   allReducers,
  //   // need this to use redux dev tools in Chrome
  //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // );
  const categories = useSelector(state => state.categories)
  const dispatch = useDispatch();

  // retreieve the state from global state object and dispatch method to update the state
  // const [state, dispatch] = useStoreContext();
  // destructure categories out of global state
  // const {categories} = state;
  // const {loading, data: categoryData } = useQuery(QUERY_CATEGORIES);


  // useEffect will run on component load, and when state changes in the component
  useEffect(() => {
    // if categoryData exists or has changed from the response of useQuery, then run dispatch
    if (categoryData) {
      // execute dispatch function wiht our action object indicating the type of action and the data to set our state for categories to
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories
      });
      // this will store categories in indexedDB with idbPromise helper function
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories
        });
      });
    }
  }, [loading, categoryData, dispatch]);

  const handleClick = id => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map(item => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
