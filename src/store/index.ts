import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import { locationSearchReducer } from "./locationSearch/reducers";
import thunk from 'redux-thunk';
import { forecastReducer } from "./forecasts/reducers";

const rootReducer = combineReducers({
    locationSearch: locationSearchReducer,
    forecasts: forecastReducer
});

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const initialState = {}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(thunk),
        composeEnhancers()
    )
);

export type AppState = ReturnType<typeof rootReducer>
