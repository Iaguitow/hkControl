import { createStore, applyMiddleware } from "redux";
//import { configureStore } from "@reduxjs/toolkit"
import { default as ReduxThunk } from 'redux-thunk';
import { logger } from 'redux-logger';
import { reducers } from "./src/reducers";

//With logger it shows in console.log all actions and result for all reducers.
//const middlewares = applyMiddleware(ReduxThunk,logger);

const middlewares = applyMiddleware(ReduxThunk);

const store = createStore(reducers, middlewares);

export { store };