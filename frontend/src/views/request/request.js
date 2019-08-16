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
    
    const addResourceRequest = () => {
        return( 
            setResourcesError(false),
            props.addResourceRequest()
        )
    }
    const validateResources = () => {
       return requestedResources.length === 0
        ? setResourcesError(true) : props.createNewRequest(props.request)
    }

    const validateString = (string, callback) => {
        return string === '' ? callback(true) : callback(false)
    }

    const validateArray = (array, callback) => {
        return array.length === 0 ? callback(true): callback(false)
    }

    const resources = requestedResources.map((resource)=>{
        return <ResourceForm key={resource.index} id={resource.index}/>
    })
        return(
            <Grid columns='16' centered>
                <Grid.Column width='10'>
                <Form error={resourcesError}>
                    <Form.Group widths='equal'>
                            <Form.Input 
                            fluid 
                            type='text' 
                            label='Requested By' 
                            placeholder='Requested By' 
                            value={requestedBy} 
                            readOnly
                            />
                            <Form.Input 
                            fluid 
                            type='text' 
                            label='Requested Date' 
                            placeholder='Requested Date' 
                            value={requestDate} 
                            readOnly
                            />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Dropdown 
                        fluid 
                        multiple selection 
                        label='Interviewer' 
                        options={props.interviewerOptions} 
                        name='interviewers'  
                        placeholder='Select' 
                        onChange={props.handleChange} 
                        onBlur={()=> validateArray(interviewers, setInterviewersError)} 
                        error={interviewersError}
                        />
                        <Form.Dropdown 
                        fluid 
                        multiple selection 
                        label='Approvers' 
                        options={props.approverOptions} 
                        name='approvers' 
                        placeholder='Select' 
                        onChange={props.handleChange} 
                        onBlur={()=> validateArray(approvers, setApproversError)} 
                        error={approversError}
                        />
                    </Form.Group>
                        <Form.TextArea 
                        label='Business Case' 
                        placeholder='Describe Business Case' 
                        rows='6' name='businessCase' 
                        value={businessCase} 
                        onChange={props.handleChange} 
                        onBlur={() => validateString(businessCase, setBusinessCaseError)} 
                        error={businessCaseError}
                        />
                    <h4>Client Info</h4>
                    <Form.Group widths='equal'>
                        <Form.Input 
                        fluid 
                        label='Client Name' 
                        placeholder='Client Name' 
                        value={clientName} 
                        name='client' 
                        onChange={props.handleChange} 
                        onBlur={() => validateString(clientName, setClientNameError)} 
                        error={clientNameError}
                        />
                        <Form.Input 
                        fluid 
                        label='Team' 
                        placeholder='Team' 
                        name='team' 
                        value={team} 
                        onChange={props.handleChange} 
                        onBlur={() => validateString(team, setTeamError)} 
                        error={teamError}
                        />
                        <Form.Input 
                        fluid 
                        label='Manager' 
                        placeholder='Manager' 
                        value={manager} 
                        name='manager' 
                        onChange={props.handleChange} 
                        onBlur={() => validateString(manager, setManagerError)} 
                        error={managerError}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input 
                        fluid 
                        label='Location Preference' 
                        placeholder='Location' 
                        name='location' 
                        value={locationPref} 
                        onChange={props.handleChange} 
                        onBlur={() => validateString(locationPref, setLocationPrefError)} 
                        error={locationPrefError}
                        />
                    </Form.Group>
                        <Button 
                        icon='add' 
                        label='Add Resource' 
                        onClick={addResourceRequest}
                        />
                            <Message
                            error
                            header='Action Forbidden'
                            content='Please Add Required Resources'
                            />
                    {resources}
                    <Form.TextArea label='Comments' placeholder='Enter Comment'/>
                        <Form.Button onClick={validateResources}>Submit</Form.Button>
                </Form>
                </Grid.Column>
            </Grid>
        );
};

export default RequestForm;