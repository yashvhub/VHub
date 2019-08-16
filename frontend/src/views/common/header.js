import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import {Link} from 'react-router-dom'

function AppHeader() {
    return (
        <Segment clearing size='huge' inverted color='blue'>
            <Header as='h2' floated='left'>
                <Link to={'/'} style={{color: 'inherit'}}>Yash VHub</Link>
            </Header>
        </Segment>
    )
}

export default AppHeader;