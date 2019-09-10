import React from 'react';
import { Link } from 'react-router-dom';
import {Grid, Form, Button, Divider, Header,} from 'semantic-ui-react';

export default function FullFillMent() {
    return (
        <Grid.Column>
            <Grid.Row>
                <Divider horizontal>
                    <Header as='h3'>
                        Add Proposals
                    </Header>
                </Divider>
            </Grid.Row>
        </Grid.Column>
    );
}