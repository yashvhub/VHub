import React from 'react';
import { Header, Segment } from 'semantic-ui-react'

function AppHeader() {
    return (
        <Segment clearing size='huge' inverted color='blue'>
            <Header as='h2' floated='left'>
                <a href={'/home'} style={{color: 'inherit'}}>Yash VHub</a>
            </Header>
        </Segment>
    )
}

export default AppHeader;