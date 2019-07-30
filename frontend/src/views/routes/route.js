import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "../home/home-connector";
import LoginPage from "../login/login-connector";
import Header from '../common/header';
import RequestList from "../request-list/request-list-connector";
import Proposals from "../proposals/proposals-connector";
import Request from '../request/request-connector';
import ConfirmPage from '../confirm/confirm-connector';
import ApproveRequest from '../approve-request/approve-request-connector'

function Routing(){
    return (
        <div>
        <Header/>
        <Router>
            <Route path="/home" component={Home}/>
            <Route path="/" exact component={LoginPage}/>
            <Route path="/request-list" component={RequestList}/>
            <Route path='/confirm/:id' component={ConfirmPage}/>
            <Route path="/proposals" component={Proposals}/>
            <Route path='/request' exact component={Request}/>
            <Route path='/request/:id' component={ApproveRequest}/>
        </Router>
        </div>
    )
}

export default Routing;