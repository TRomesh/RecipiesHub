import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from '../reducers/RootReducer';

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default() => {
    return createStore(RootReducer,
      compose(applyMiddleware(thunk))
  );
}
