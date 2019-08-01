import React from 'react';
import {Redirect} from 'react-router';
import PropTypes from 'prop-types';
import {Form, Grid, Button, Loader} from 'semantic-ui-react';
import ConfirmTable from './confirmTable';

class ConfirmPage extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            requestEnvelope: this.props.requestEnvelope,
            shouldRedirect: false,
            formSuccess: false,
        }
    }

    async componentWillMount() {
        await this.props.fetchRequestEnvelope(Number(this.props.match.params.id))
        this.setState({ shouldRedirect: true });
    }

    render(){

        if (!this.props.requestEnvelope && this.state.shouldRedirect) {
            return <Redirect to='/request-list' />
        } else if (!this.props.requestEnvelope) {
            return <Loader />
        }

        const value = this.props.requestEnvelope.proposalType.type.toLowerCase();

        return(
            <Grid columns='16' centered>
                <Grid.Column width='10'>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Requested By' value={`${this.props.requestEnvelope.requester.firstName} ${this.props.requestEnvelope.requester.lastName}`} readOnly/>
                        <Form.Input fluid label='Requested Date' placeholder='Requested Date' value={this.props.requestEnvelope.requestDate} readOnly/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Job Posting ID' value={this.props.requestEnvelope.jobPosting} readOnly/>
                        <Form.Input fluid label='Approver' value={"O"} readOnly/>
                    </Form.Group>
                    <Form.TextArea label='Business Case' value={this.props.requestEnvelope.businessCase} rows='6' readOnly/>
                    <br/>
                    <h4>Client Info</h4>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Client Name' value={this.props.requestEnvelope.clientName} readOnly/>
                        <Form.Input fluid label='Team' value={this.props.requestEnvelope.team} readOnly/>
                        <Form.Input fluid label='Manager' value={this.props.requestEnvelope.manager} readOnly/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Input fluid label='Location Preference' placeholder='Location' value={this.props.requestEnvelope.locationPreference.stateOrProvince} readOnly/>
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
                        <Form.Input fluid label='Number of Resources' value={this.props.requestEnvelope.selectedResources.length} readOnly/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Experience In Years Required' placeholder='years' readOnly/>
                    </Form.Group>
                    <Form.Group>
                        <h4>Selected Resources</h4>
                            <ConfirmTable resources={this.props.requestEnvelope.selectedResources}/>
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