import React from 'react';
import PropTypes from 'prop-types';
import LoginBox from './login-box';
import { Redirect } from 'react-router-dom';
import { Message } from 'semantic-ui-react';

function LoginPage({doLogin, user, isPending, error}){
    if(user) {
        sessionStorage.setItem('token', user.id);
        sessionStorage.setItem('email', user.email);
        sessionStorage.setItem('firstName', user.firstName);
        sessionStorage.setItem('lastName', user.lastName);
        sessionStorage.setItem('title', user.title);
        sessionStorage.setItem('company', user.company);
        console.log(sessionStorage)
        return <Redirect to='/home'/>
    }
    const status = error ? ('statusText' in error) ? `${error.status}: ${error.statusText}` : error.status : undefined;
    return (
        <div>
            <LoginBox doLogin={doLogin} isPending={isPending} status={status} user={user}/>
        </div>
    );
}

LoginPage.propTypes = {

};

export default LoginPage;