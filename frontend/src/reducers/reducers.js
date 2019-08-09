import {combineReducers} from "redux";
import app from "./app";
import login from "./login";
import proposal from './proposal';
import resources from './resources';
import requestLists from './request-list';
import request from './request';
import requestEnvelope from './request-envelope'

export default combineReducers({
    app,
    login,
    proposal,
    requestLists,
    resources,
    request,
    requestEnvelope
})