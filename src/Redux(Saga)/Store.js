import {configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { combineReducers } from 'redux';
import postReducer from './Reducers/PostReducer';
import userReducer from './Reducers/UserReducer';
import { rootSaga } from './Saga/rootSaga';

// combining Reducers
const rootReducer = combineReducers({
    postReducer,
    userReducer
})


// creating Saga Middleware
const sagaMiddleware = createSagaMiddleware();


// Creating main store
const Store = configureStore({
    reducer:rootReducer,
    middleware:[sagaMiddleware],
    devTools:false
});

// running rootSaga
sagaMiddleware.run(rootSaga);

export default Store;