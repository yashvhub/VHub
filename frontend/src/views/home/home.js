import React from 'react';
import UserCard from './userCard';
import RequestList from "../request-list/request-list-connector";
import {Grid, Loader, Button} from 'semantic-ui-react';
import {Redirect, Link} from 'react-router-dom';

function Home({user, isPending}){

    if(!sessionStorage.getItem('email') && !sessionStorage.getItem('token') && !isPending) {
        return <Redirect to='/'/>
    } else if (!sessionStorage.getItem('email') || !sessionStorage.getItem('token')) {
        return <Loader active/>
    }

    return (
        <Grid columns={2} container>
            <Grid.Column width={4}>
                <UserCard user={user}/>
                <Grid.Row>
                    <Button primary as={Link} to={'/request'}>Create Request</Button>
                </Grid.Row>
            </Grid.Column>
            <Grid.Column width={12}>
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