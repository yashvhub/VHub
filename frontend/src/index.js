import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Routing from "./views/routes/route";
import {createStore, applyMiddleware} from "redux";
import vendorApp from './reducers/reducers';
import { Provider } from "react-redux";
import 'semantic-ui-css/semantic.min.css';
import thunk from 'redux-thunk';

const store = createStore(vendorApp,applyMiddleware(thunk));

const APP = (
    <Provider store={store}>
        <Routing/>
    </Provider>
);

ReactDOM.render(APP, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
