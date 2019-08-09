import React from 'react';
import PropTypes from 'prop-types';
import UserCard from './userCard';
import {Grid, Loader, Button} from 'semantic-ui-react';
import {Redirect, Link} from 'react-router-dom';
import RequestList from "../request-list/request-list-connector";


function Home({user, isPending}){
    if(!user && !isPending) {
        return <Redirect to='/'/>
    } else if (!user) {
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