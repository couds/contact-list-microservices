import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import asyncMiddleware from 'flux/middlewares/async';
import { reducers, INITIAL_STATE } from 'flux';

export function createStore(initialState) {
  return reduxCreateStore(reducers, initialState || INITIAL_STATE, applyMiddleware(asyncMiddleware));
}