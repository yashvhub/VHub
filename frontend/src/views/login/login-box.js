import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import {Link} from 'react-router-dom';


class LoginBox extends React.Component{
    constructor(props){
        super(props)
    }

    redirect = () => {

    }
    render(){
        return(
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='top'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='blue' textAlign='center'>
                Log-in to your account
              </Header>
              <Form size='large'>
                <Segment stacked>
                  <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                  />
        
                  <Button as={Link} to='/home' color='blue' fluid size='large'>
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                New to us? <a href='/signup'>Sign Up</a>
              </Message>
            </Grid.Column>
          </Grid>
        )
    }
};

export default LoginBox;