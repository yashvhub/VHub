import React from 'react';
import {Redirect} from 'react-router';
import PropTypes from 'prop-types';
import {Form, Grid, Button} from 'semantic-ui-react';
import ConfirmTable from './confirmTable';

class ConfirmPage extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        if(!this.props.requestLists){
            return <Redirect to='/request-list'/>
        }

        const value = this.props.requestLists.proposalType;

        return(
            <Grid columns='16' centered>
                <Grid.Column width='10'>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Requested By' value={this.props.requestLists.requestor} readOnly/>
                        <Form.Input fluid label='Requested Date' placeholder='Requested Date' readOnly/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Job Posting ID' value={this.props.requestLists.id} readOnly/>
                        <Form.Input fluid label='Approver' value={this.props.requestLists.jobPostingID} readOnly/>
                    </Form.Group>
                    <Form.TextArea label='Business Case' value={this.props.requestLists.requestedData} rows='6' readOnly/>
                    <br/>
                    <h4>Client Info</h4>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Client Name' value={this.props.requestLists.client} readOnly/>
                        <Form.Input fluid label='Team' value={this.props.requestLists.team} readOnly/>
                        <Form.Input fluid label='Manager' value={this.props.requestLists.manager} readOnly/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Input fluid label='Location Preference' placeholder='Location' readOnly/>
                    </Form.Group>
                    <br/>
                    <h4>Resource Info</h4>
                    <Form.Group widths='equal'>
                        <Form.Group inline>
                            <label>Proposal Type</label>
                                <Form.Radio
                                    label='Internal'
                                    checked={value === 'internal'}
                                    readOnly
                                />
                                <Form.Radio
                                    label='External'
                                    checked={value === 'external'}
                                    readOnly
                                />
                        </Form.Group>
                        <Form.Input fluid label='Number of Resources' value={this.props.requestLists.numberOfResources} readOnly/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Experience In Years Required' placeholder='years' readOnly/>
                    </Form.Group>
                    <Form.Group>
                        <h4>Selected Resources</h4>
                            <ConfirmTable />
                    </Form.Group>
                    <br/>
                    <Form.TextArea label='Comments' placeholder='Comments...' rows='6'/>
                    <Form.Group widths='equal'>
                        <Button icon='save' label='Save' onClick={this.props.saveInterviewRequest}/>
                        <Button icon='check' label='Confirm Selection' onClick={this.props.confirmInterviewRequest}/>
                    </Form.Group>
                </Form>
                </Grid.Column>
            </Grid>
        );
    };
};

export default ConfirmPage;