import { createStore, compose, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { locationSearchReducer } from "./locationSearch/reducers";
import { forecastReducer } from "./forecasts/reducers";
import { settingsReducer } from "./settings/reducers";

const rootReducer = combineReducers({
    locationSearch: locationSearchReducer,
    forecasts: forecastReducer,
    settings: settingsReducer,
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
