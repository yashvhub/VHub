import React from 'react';
import {Redirect} from 'react-router';
import {Form, Grid, Button, Loader, List, Segment, Divider, Header, Message} from 'semantic-ui-react';
import ConfirmTable from './confirmTable';

class ConfirmPage extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            shouldRedirect: false,
            formSuccess: false,
            selectedResources: [],
            selectedBooleans: [],
        }
    }

    async componentWillMount() {
        await this.props.fetchRequestEnvelope(Number(this.props.match.params.id));
    }

    componentDidUpdate(prevProps){
        if(this.props.requestEnvelope && (prevProps.requestEnvelope !== this.props.requestEnvelope)){
            let selectedResourcesIds = []
            let selectedResourcesSet = new Set(this.props.requestEnvelope.selectedResources.map((id) => id.id));
            let selectedResourcesBooleans = this.props.requestEnvelope.resourceRequests[0].proposals.map(proposal => {
                return(proposal.resources.map(resource => {
                    return{
                    id:resource.id,
                    checked: selectedResourcesSet.has(resource.id)
                }

                }))
            })

            let actualBooleans = selectedResourcesBooleans.flat();
            this.props.requestEnvelope.selectedResources.forEach((resource) => {
                selectedResourcesIds.push(resource.id)
            })
            this.setState({selectedResources: selectedResourcesIds, selectedBooleans: actualBooleans})
        }
    }

    render(){
        if (!this.props.requestEnvelope && this.state.shouldRedirect) {
            return <Redirect to='/' />
        } else if (!this.props.requestEnvelope) {
            return <Loader />
        }

        const checkboxChange = (e, data) => {
            let contains = this.state.selectedResources.includes(data.value)
            if(!contains && data.checked){
                let newArray = this.state.selectedResources;
                newArray.push(data.value)
                this.setState({selectedResources: newArray})
            }else{
                if(!data.checked){
                    let smallerArray = this.state.selectedResources;
                    smallerArray.splice(smallerArray.indexOf(data.value),1)
                    this.setState({selectedResources: smallerArray})
                }
            }
        }

        const confirmButton = async () => {
            let response = await this.props.confirmInterview(this.state.selectedResources, this.props.requestEnvelope.id)
            if(response){
                this.setState({formSuccess:true})
            }
        }

        const value = this.props.requestEnvelope.proposalType.type.toLowerCase();
        return(
            <Grid columns='16' centered>
                <Grid.Column width='10'>
                <Form success={this.state.formSuccess}>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Requested By' value={`${this.props.requestEnvelope.requester.firstName} ${this.props.requestEnvelope.requester.lastName}`} readOnly/>
                        <Form.Input fluid label='Requested Date' placeholder='Requested Date' value={this.props.requestEnvelope.requestDate} readOnly/>
                        <Form.Input fluid label='Job Posting ID' value={this.props.requestEnvelope.jobPosting} readOnly/>
                    </Form.Group>
                    <Divider horizontal>
                        <Header as='h3'>
                            Approvers
                        </Header>
                    </Divider>
                        <br/>
                        <Form.Group widths='equal'>
                            <Segment>
                                <List divided horizontal>
                                    {this.props.requestEnvelope.approvers.map(approvers => (
                                        <List.Item>
                                            <List.Content>
                                                <List.Header>{approvers.firstName} {approvers.lastName}</List.Header>
                                            </List.Content>
                                        </List.Item>
                                    ))}
                                </List>
                            </Segment>                     
                        </Form.Group>
                    <Form.TextArea label='Business Case' value={this.props.requestEnvelope.businessCase} rows='6' readOnly/>
                    <br/>
                    <Divider horizontal>
                        <Header as='h3'>
                            Client Info
                        </Header>
                    </Divider>
                    <br/>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Client Name' value={this.props.requestEnvelope.clientName} readOnly/>
                        <Form.Input fluid label='Team' value={this.props.requestEnvelope.team} readOnly/>
                        <Form.Input fluid label='Manager' value={this.props.requestEnvelope.manager} readOnly/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='City Preference' placeholder='Location' value={this.props.requestEnvelope.locationPreference.city} readOnly/>
                        <Form.Input fluid label='State Preference' placeholder='Location' value={this.props.requestEnvelope.locationPreference.stateOrProvince} readOnly/>
                        <Form.Input fluid label='Country Preference' placeholder='Location' value={this.props.requestEnvelope.locationPreference.country} readOnly/>
                    </Form.Group>
                    <br/>
                    <Divider horizontal>
                        <Header as='h3'>
                            Resource Info
                        </Header>
                    </Divider>
                    <br/>                    
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

                    <h4>Selected Resources</h4>
                    {this.state.selectedBooleans.length > 0 && 
                                            <Form.Group>
                                            <ConfirmTable onChange={checkboxChange} selectedBooleans={this.state.selectedBooleans} resources={this.props.requestEnvelope.resourceRequests[0].proposals}/>
                                    </Form.Group>
                    }

                    <br/>
                    <Form.TextArea label='Comments' placeholder='Comments...' rows='6'/>
                    <Message success header='Form Completed' content="Request Confirmed Successfully" />
                    <Form.Group widths='equal'>
                        <Button icon='check' label='Confirm Selection' onClick={confirmButton}/>
                    </Form.Group>
                </Form>
                </Grid.Column>
            </Grid>
        );
    };
};

export default ConfirmPage;