import React from 'react';
import PropTypes from 'prop-types';
import LoginBox from './login-box';
import { Redirect } from 'react-router-dom';
import { Message } from 'semantic-ui-react';

function LoginPage({doLogin, user, isPending, error}){
    if(user) {
        return <Redirect to='/home'/>
    }
    const status = error ? ('statusText' in error) ? `${error.status}: ${error.statusText}` : error.status : undefined;
    return (
        <div>
            <LoginBox doLogin={doLogin} isPending={isPending} status={status}/>
        </div>
    );
}

LoginPage.propTypes = {

};

export default LoginPage;