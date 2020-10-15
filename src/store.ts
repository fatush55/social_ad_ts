// Root
import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux"
import reduxThunk, {ThunkAction} from "redux-thunk"
import createSagaMiddleware from "redux-saga"
import from "redux"
import {logger} from 'redux-logger'
// Reducer
import {rootReducer} from './reducers/root-reducer'
// Saga
import {rootSaga} from './sagas/root-saga'


const sagaMiddleware = createSagaMiddleware()

type RootReducer = typeof rootReducer

export type RootState = ReturnType<RootReducer>

export type RootThunkCreatorType<A extends Action, P = void> = ThunkAction<P, RootState, undefined, A>

export type ActionsCreatorType<T> = T extends {[key: string]: (...args: any[]) => infer U } ? U : never

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware, reduxThunk)))

sagaMiddleware.run(rootSaga)
