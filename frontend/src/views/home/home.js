import React from 'react';
import UserCard from './userCard';
import RequestList from "../request-list/request-list-connector";
import {Grid, Loader, Button, Message} from 'semantic-ui-react';
import {Redirect, Link} from 'react-router-dom';

function Home(props){

    const showSuccess = () => {
        return props.submitSuccess ? <Message
        success
        header='Success!'
        content="Request Submitted"
        /> : null
    }

    return (
        <Grid columns={2} container>
            <Grid.Column width={4}>
                <UserCard user={props.user}/>
                <Grid.Row>
                    <Button primary as={Link} to={'/request'}>Create Request</Button>
                </Grid.Row>
            </Grid.Column>
            <Grid.Column width={12} >
                <Grid.Row>
                    {showSuccess()}
                </Grid.Row>
                <Grid.Row>
                    <RequestList/>
                </Grid.Row>
            </Grid.Column>
        </Grid>
    );
}

Home.propTypes = {

};

export default Home;