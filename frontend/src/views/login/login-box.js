import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Loader } from 'semantic-ui-react';
import {Link} from 'react-router-dom';


class LoginBox extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          email: '',
          password: ''
        }
    }

    onClick = (e) => {
      e.preventDefault();
      this.props.doLogin(this.state.email, this.state.password);
    }

    onChange = (e, data) => {
      this.setState({
        [e.target.name]: e.target.value
      })
    }

    render(){
        return(
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='top'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='blue' textAlign='center'>
                Log-in to your account
              </Header>
              {
                this.props.status && <Message error>
                  {this.props.status}
                </Message>
              }
              <Form size='large'>
                <Segment stacked>
                  <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' name='email' value={this.state.email} onChange={this.onChange}/>
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    name='password'
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  <Button disabled={this.props.isPending} color='blue' fluid size='large' onClick={this.onClick}>{
                    this.props.isPending ? <Loader active inverted inline='centered' size='tiny'/> : 'Login'
                  }</Button>
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