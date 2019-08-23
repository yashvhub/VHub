import React, { useState, useEffect } from 'react';
import { Form, Grid, Button, Message } from 'semantic-ui-react';
import ResourceForm from './resourceForm-connector';
import { Redirect } from 'react-router-dom';
import { equal } from 'assert';

const RequestForm = (props) => {
    const [interviewersError, setInterviewersError] = useState(false);
    const [approversError, setApproversError] = useState(false);
    const [businessCaseError, setBusinessCaseError] = useState(false);
    const [clientNameError, setClientNameError] = useState(false);
    const [teamError, setTeamError] = useState(false);
    const [managerError, setManagerError] = useState(false);
    const [locationPrefError, setLocationPrefError] = useState(false);
    const [resourcesError, setResourcesError] = useState(false);

    useEffect(() => {
        props.clearRequest()
        props.initializeRequest(props.currentUser)
        props.fetchApprovers("APPROVER");
        props.fetchInterviewers("INTERVIEWER");
    }, [])

    const { requestedBy, requestDate, interviewers, approvers, businessCase, clientName, team, manager, locationCityPref, locationStatePref, locationCountryPref, requestedResources, comments, submitSuccess } = props.request;

    const addResourceRequest = () => {
        return (
            setResourcesError(false),
            props.addResourceRequest()
        )
    }
    const validateResources = () => {
        validateArray(requestedResources, setResourcesError);
        validateArray(interviewers, setInterviewersError);
        validateArray(approvers, setApproversError);
        validateString(businessCase, setBusinessCaseError);
        validateString(clientName, setClientNameError);
        validateString(team, setTeamError);
        validateString(manager, setManagerError);
        validateString(locationCityPref, setLocationPrefError);
        validateString(locationStatePref, setLocationPrefError);
        validateString(locationCountryPref, setLocationPrefError);
        if (!interviewersError || !approversError || !businessCaseError || !clientNameError || !teamError || !managerError || !locationPrefError || !resourcesError) {
            props.createNewRequest(props.request, props.user)
            
        }

    }

    const validateString = (string, callback) => {
        return string === '' ? callback(true) : callback(false)
    }

    const validateArray = (array, callback) => {
        return array.length === 0 ? callback(true) : callback(false)
    }

    const resources = requestedResources.map((resource) => {
        return <ResourceForm key={resource.index} id={resource.index} />
    })

    return (
        submitSuccess ? <Redirect to={'/'}/> :
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
                            onBlur={() => validateArray(interviewers, setInterviewersError)}
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
                            onBlur={() => validateArray(approvers, setApproversError)}
                            error={approversError}
                        />
                    </Form.Group>
                    <Form.TextArea
                        label='Business Case'
                        placeholder='Describe Business Case'
                        rows='6' 
                        name='businessCase'
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
                            name='clientName'
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
                    <Form.Group widths='equal'>
                        <Form.Input
                            fluid
                            label='City Preference'
                            placeholder='City'
                            name='locationCityPref'
                            value={locationCityPref}
                            onChange={props.handleChange}
                            onBlur={() => validateString(locationCityPref, setLocationPrefError)}
                            error={locationPrefError}
                        />
                        <Form.Input
                            fluid
                            label='State Preference'
                            placeholder='State'
                            name='locationStatePref'
                            value={locationStatePref}
                            onChange={props.handleChange}
                            onBlur={() => validateString(locationStatePref, setLocationPrefError)}
                            error={locationPrefError}
                        />
                        <Form.Input
                            fluid
                            label='Country Preference'
                            placeholder='Country'
                            name='locationCountryPref'
                            value={locationCountryPref}
                            onChange={props.handleChange}
                            onBlur={() => validateString(locationCountryPref, setLocationPrefError)}
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
                    <Form.TextArea label='Comments' placeholder='Enter Comment' />
                    <Form.Button onClick={validateResources}>Submit</Form.Button>
                </Form>
            </Grid.Column>
        </Grid>
    );
};

export default RequestForm;