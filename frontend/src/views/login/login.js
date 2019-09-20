import React from 'react';
import LoginBox from './login-box';
import { Redirect } from 'react-router-dom';
import { Message } from 'semantic-ui-react';

function LoginPage(props){
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');
    const token = sessionStorage.getItem('token');
    const error = props.error
    const status = error ? ('statusText' in error) ? `${error.status}: ${error.statusText}` : error.status : undefined;
    const loginStoredUser = () => {if(email && token && password && !props.isPending){
            props.doLogin(email, password)
        }
    }

    if(props.login.authenticated){
        return <Redirect to='/'/>
    }else{
        loginStoredUser()
    }

    return (
            <LoginBox doLogin={props.doLogin} isPending={props.isPending} status={status} user={props.user}/>
    );
}

LoginPage.propTypes = {

};

export default LoginPage;