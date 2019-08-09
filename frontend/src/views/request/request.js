import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Form, Grid, Button, Message} from 'semantic-ui-react';
import ResourceForm from './resourceForm-connector';

const RequestForm = (props) => {
    const [interviewersError, setInterviewersError] = useState(false);
    const [approversError, setApproversError] = useState(false);
    const [businessCaseError, setBusinessCaseError] = useState(false);
    const [clientNameError, setClientNameError] = useState(false);
    const [teamError, setTeamError] = useState(false);
    const [managerError, setManagerError] = useState(false);
    const [locationPrefError, setLocationPrefError] = useState(false);
    const [resourcesError, setResourcesError] = useState(false);
    useEffect(()=>{
        props.initializeRequest(props.currentUser)
    },[])
    const {requestedBy, requestDate, interviewers, approvers, businessCase, clientName, team, manager, locationPref, requestedResources, comments} = props.request;
    const validateResources = () => {
        console.log(resourcesError)
        console.log('log', requestedResources.length)
       return requestedResources.length === 0 ? setResourcesError(true) : props.createNewRequest(props.request)
       

    }
    const resources = requestedResources.map((resource)=>{
        return <ResourceForm key={resource.index} id={resource.index}/>
    })
        return(
            <Grid columns='16' centered>
                <Grid.Column width='10'>
                <Form>
                    <Form.Group widths='equal'>
                            <Form.Input fluid type='text' label='Requested By' placeholder='Requested By' value={requestedBy} readOnly/>
                            <Form.Input fluid type='text' label='Requested Date' placeholder='Requested Date' value={requestDate} readOnly/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Dropdown fluid multiple selection label='Interviewer' options={props.interviewerOptions} name='interviewers'  placeholder='Select' onChange={props.handleChange} onBlur={interviewers.length===0 ? () => {setInterviewersError(true)} : null} error={interviewersError}/>
                        <Form.Dropdown fluid multiple selection label='Approvers' options={props.approverOptions} name='approvers' placeholder='Select' onChange={props.handleChange} onBlur={approvers.length===0 ? () => {setApproversError(true)} : null} error={approversError}/>
                    </Form.Group>
                        <Form.TextArea label='Business Case' placeholder='Describe Business Case' rows='6' name='businessCase' value={businessCase} onChange={props.handleChange} onBlur={businessCase === '' ? () => {setBusinessCaseError(true)} : null} error={businessCaseError}/>
                    <h4>Client Info</h4>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Client Name' placeholder='Client Name' value={clientName} name='client' onChange={props.handleChange} onBlur={clientName==='' ? () => {setClientNameError(true)} : null} error={clientNameError}/>
                        <Form.Input fluid label='Team' placeholder='Team' name='team' value={team} onChange={props.handleChange} onBlur={team === '' ? () => {setTeamError(true)} : null} error={teamError}/>
                        <Form.Input fluid label='Manager' placeholder='Manager' value={manager} name='manager' onChange={props.handleChange} onBlur={manager===''? () => {setManagerError(true)} : null} error={managerError}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Input fluid label='Location Preference' placeholder='Location' name='location' value={locationPref} onChange={props.handleChange} onBlur={locationPref === '' ? () => {setLocationPrefError(true)} : null} error={locationPrefError}/>
                    </Form.Group>
                        <Button icon='add' label='Add Resource' onClick={props.addResourceRequest}/>
                    {resources}
                    <Form.TextArea label='Comments' placeholder='Enter Comment'/>
                        <Form.Button onClick={validateResources} disabled={requestedResources.length === 0}>Submit</Form.Button>
                </Form>
                </Grid.Column>
            </Grid>
        );
};

export default RequestForm;