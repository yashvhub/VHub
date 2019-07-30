import React from 'react';
import PropTypes from 'prop-types';
import UserCard from './userCard';
import VendorList from './vendorList';
import {Grid} from 'semantic-ui-react';

function Home(){
    return (
        <Grid columns={2} container>
            <Grid.Column width={6}>
                <UserCard/>
            </Grid.Column>
            <Grid.Column width={10}>
                <VendorList/>
            </Grid.Column>
        </Grid>
    );
}

Home.propTypes = {

};

export default Home;