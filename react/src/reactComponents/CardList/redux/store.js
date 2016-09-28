import { createStore, applyMiddleware, compose } from "redux";
import Thunk from "redux-thunk";
import Reducer from"./reducers.js";


const logger = (store) => (next) => (action) => {
  console.log("dispatching:", action);
  return next(action);
}

// export default createStore(Reducer, applyMiddleware(logger, Thunk));
export default createStore(Reducer, compose(applyMiddleware(logger, Thunk), window.devToolsExtension ? window.devToolsExtension() : f => f ));
