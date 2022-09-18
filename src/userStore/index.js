import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools} from 'redux-devtools-extension';
import { userReducer } from './userReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  setUser: userReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));