import React from 'react';
import PropTypes from 'prop-types';
import { Form, Message, Grid, Button, FormGroup, Loader } from 'semantic-ui-react';
import ApproveResourceForm from './approve-resourceForm-connector';
import { Redirect } from 'react-router-dom';

class ApproveRequestForm extends React.Component {
    constructor(props) {
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

    render() {

        const approve = () => {
            this.setState({ formSuccess: true });
        }

        if (!this.props.requestEnvelope && this.state.shouldRedirect) {
            return <Redirect to='/request-list' />
        } else if (!this.props.requestEnvelope) {
            return <Loader />
        }

        console.log(this.props.requestEnvelope);

        const resources = this.props.requestEnvelope.resourceRequests.map((resource, index) => {
            return <ApproveResourceForm key={index} id={resource.id}/>
        })
        return (
            <Grid columns='16' centered>
                <Grid.Column width='10'>
                    <Form success={this.state.formSuccess}>
                        <Form.Group widths='equal'>
                            <Form.Input fluid label='Requested By' placeholder='Requested By' value={`${this.props.requestEnvelope.requester.firstName} ${this.props.requestEnvelope.requester.lastName}`} readOnly />
                            <Form.Input fluid label='Requested Date' placeholder='Requested Date' value={this.props.requestEnvelope.requestDate} readOnly />
                            <Form.Input fluid label='Job Posting ID' placeholder='ID' value={this.props.requestEnvelope.jobPosting} readOnly />
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Select fluid label='Interviewer' options={this.props.requestEnvelope.approvers.map(({ id, email }, index) => ({}))} placeholder='Select' value={`${this.props.requestEnvelope.interviewer.id}`}/>
                            <Form.Select fluid label='Approvers' options={this.props.requestEnvelope.approvers.map(({ id, email }, index) => ({key: index, text: email, value: id}))} placeholder='Select'/>
                        </Form.Group>
                        <Form.TextArea label='Business Case' placeholder='Describe Business Case' value={this.props.requestEnvelope.businessCase} rows='6' readOnly />
                        <h4>Client Info</h4>
                        <Form.Group widths='equal'>
                            <Form.Input fluid label='Client Name' placeholder='Client Name' value={this.props.requestEnvelope.clientName} readOnly />
                            <Form.Input fluid label='Team' placeholder='Team' value={this.props.requestEnvelope.team} readOnly />
                            <Form.Input fluid label='Manager' placeholder='Manager' value={this.props.requestEnvelope.manager} readOnly />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input fluid label='Location Preference' placeholder='Location' value={this.props.requestEnvelope.locationPreference.stateOrProvince} readOnly />
                        </Form.Group>

                        <br />
                        {resources}
                        <Form.TextArea label='Comments' placeholder='Comments...' rows='6' />

                        <Message success header='Form Completed' content="Request Approved Successfully" />

                        <FormGroup widths='equal'>
                            <Button>Save Request</Button>
                            <Button onClick={approve}>Save And Approve</Button>
                        </FormGroup>

                    </Form>
                </Grid.Column>
            </Grid>
        );
    };
};

export default ApproveRequestForm;