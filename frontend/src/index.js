import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Routing from "./views/routes/router";
import Router from './views/routes/route-connector';
import {createStore, applyMiddleware, compose} from "redux";
import vendorApp from './reducers/reducers';
import { Provider } from "react-redux";
import 'semantic-ui-css/semantic.min.css';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';


const logger = createLogger({
    log: (process.env.NODE_ENV || 'production') === 'development' ? 'log' : 'warn',
})

const store = createStore(vendorApp,compose(applyMiddleware(thunk),applyMiddleware(logger)));

const APP = (
    <Provider store={store}>
        <Router/>
    </Provider>
);

ReactDOM.render(APP, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
