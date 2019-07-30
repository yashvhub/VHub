import React from 'react';
import PropTypes from 'prop-types';
import {Form, Grid, Button, FormGroup, Loader} from 'semantic-ui-react';
import ResourceForm from '../request/resourceForm-connector';
import {Redirect} from 'react-router-dom';

class ApproveRequestForm extends React.Component{
    constructor(props){
        super(props)

        this.state={
            requestEnvelope: this.props.requestEnvelope,
            shouldRedirect: false,
        }
    }

async componentWillMount(){
   await this.props.fetchRequestEnvelope(Number(this.props.match.params.id))
   this.setState({shouldRedirect:true});
}
    
    render(){

        if(!this.props.requestEnvelope && this.state.shouldRedirect){
            return <Redirect to='/request-list'/>
        } else if(!this.props.requestEnvelope) {
            return <Loader />
        }

        console.log(this.props.requestEnvelope);

        const resources = this.props.requestEnvelope.resourceRequests.map((resource, index)=>{
            return <ResourceForm key={index} id={index}/>
        })
        return(
            <Grid columns='16' centered>
                <Grid.Column width='10'>
                <Form>
                    <Form.Group widths='equal'>
                            <Form.Input fluid label='Requested By' placeholder='Requested By' value={`${this.props.requestEnvelope.requester.firstName} ${this.props.requestEnvelope.requester.lastName}`} readOnly/>
                            <Form.Input fluid label='Requested Date' placeholder='Requested Date' value={this.props.requestEnvelope.requestDate}  readOnly/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Select fluid label='Interviewer' options={this.props.interviewers} placeholder='Select' value={`${this.props.requestEnvelope.interviewer.firstName} ${this.props.requestEnvelope.interviewer.lastName}`}/>
                        <Form.Select fluid label='Approvers' options={this.props.requestEnvelope.approvers.map(({email}) => email)} placeholder='Select'/>
                    </Form.Group>
                        <Form.TextArea label='Business Case' placeholder='Describe Business Case' value={this.props.requestEnvelope.businessCase} rows='6' readOnly/>
                    <h4>Client Info</h4>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Client Name' placeholder='Client Name' value={this.props.requestEnvelope.clientName} readOnly/>
                        <Form.Input fluid label='Team' placeholder='Team' value={this.props.requestEnvelope.team} readOnly/>
                        <Form.Input fluid label='Manager' placeholder='Manager' value={this.props.requestEnvelope.manager} readOnly/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Input fluid label='Location Preference' placeholder='Location' value={this.props.requestEnvelope.locationPreference.stateOrProvince} readOnly/>
                    </Form.Group>
                    
                    {resources}
                        <FormGroup widths='equal'>
                            <Button>Save Request</Button>
                            <Button>Save And Approve</Button>
                        </FormGroup>
                    
                </Form>
                </Grid.Column>
            </Grid>
        );
    };
};

export default ApproveRequestForm;