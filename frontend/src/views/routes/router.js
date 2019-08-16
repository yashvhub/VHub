import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from '../common/header';
import Home from "../home/home-connector";
import LoginPage from "../login/login-connector";
import Proposals from "../proposals/proposals-connector";
import Request from '../request/request-connector';
import ConfirmPage from '../confirm/confirm-connector';
import ApproveRequest from '../approve-request/approve-request-connector';
import PrivateRoute from './PrivateRoute';

function AuthRouter(props){
    
    
    return (
        <div>
        <Router>
        <Header/>
            <PrivateRoute authed={props.authed} path='/' exact component={Home}/>
            <Route path='/login' component={LoginPage}/>  
            <PrivateRoute authed={props.authed} path='/confirm/:id' component={ConfirmPage}/>
            <PrivateRoute authed={props.authed} path='/request' exact component={Request}/>
            <PrivateRoute authed={props.authed} path='/request/:id/approve' component={ApproveRequest}/>
            <PrivateRoute authed={props.authed} path="/request/:id/resource-request/:resourceRequestId/proposals" exact component={Proposals}/>
            <PrivateRoute authed={props.authed} path="/request/:id/resource-request/:resourceRequestId/proposals/:proposalId" component={Proposals}/>
        </Router>
        </div>
    )
}

export default AuthRouter;