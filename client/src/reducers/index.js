// IMPORT ALL REDUCERS

// import the reducers here



import newReducer from './newReducers'

import {combineReducers} from 'redux';

const allReducers = combineReducers({
   newReducer: newReducer
   
})

export default allReducers;