import React from 'react';
import { Header, Segment } from 'semantic-ui-react'

function AppHeader() {
    return (
        <Segment clearing size='huge' inverted color='blue'>
            <Header as='h2' floated='left'>
                Yash VHub
            </Header>
        </Segment>
    )
}

export default AppHeader;