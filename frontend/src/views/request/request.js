import React from 'react';
import PropTypes from 'prop-types';
import {Form, Grid, Button, FormGroup} from 'semantic-ui-react';
import ResourceForm from './resourceForm-connector';

let emptyRequest = {
    requestor:"",
    requestedData: "",
    interviewer: "",
    approvers: "",
    businessCase: "",
    client: "",
    team: "",
    manager: "",
    locationPreference: ""
}

class RequestForm extends React.Component{
    constructor(props){
        super(props)

        this.state={
            request: emptyRequest
        }
    }

componentDidMount(){
    if(typeof this.props.defaultRequest === "undefined"){
        this.setState({
            request: emptyRequest
        })
    }else{
        this.setState({
            request: this.props.defaultRequest
        })
    }
}
    
    render(){
        console.log(this.state.request);

        const resources = this.props.request.requestedResources.map((resource)=>{
            return <ResourceForm key={resource.index} id={resource.index}/>
        })
        return(
            <Grid columns='16' centered>
                <Grid.Column width='10'>
                <Form>
                    <Form.Group widths='equal'>
                            <Form.Input fluid label='Requested By' placeholder='Requested By' value={this.state.request.requestor} readOnly/>
                            <Form.Input fluid label='Requested Date' placeholder='Requested Date' value={this.state.request.requestedData} readOnly/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Select fluid label='Interviewer' options={this.props.interviewers} placeholder='Select'/>
                        <Form.Select fluid label='Approvers' options={this.props.approvers} placeholder='Select'/>
                    </Form.Group>
                        <Form.TextArea label='Business Case' placeholder='Describe Business Case' rows='6'/>
                    <h4>Client Info</h4>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Client Name' placeholder='Client Name' value={this.state.request.client}/>
                        <Form.Input fluid label='Team' placeholder='Team'/>
                        <Form.Input fluid label='Manager' placeholder='Manager' value={this.state.request.manager}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Input fluid label='Location Preference' placeholder='Location'/>
                    </Form.Group>
                    {typeof this.props.defaultRequest === "undefined" && 
                        <Button icon='add' label='Add Resource' onClick={this.props.addResourceRequest}/>
                    }
                    
                    {resources}

                    {typeof this.props.defaultRequest != "undefined" ? (
                        <FormGroup widths='equal'>
                            <Button>Save Request</Button>
                            <Button>Save And Approve</Button>
                        </FormGroup>
                    ) : (
                        <Form.Button>Submit</Form.Button>
                    )}
                    
                </Form>
                </Grid.Column>
            </Grid>
        );
    };
};

export default RequestForm;