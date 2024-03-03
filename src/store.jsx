import { createStore } from "redux";
import { thunk, } from "redux-thunk";
import { applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from './reducers'
const middleware = [thunk]
const initialState = {}

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))

)

export default store