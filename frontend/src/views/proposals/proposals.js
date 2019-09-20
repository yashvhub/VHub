import React, {useEffect, useState} from 'react';
import {Grid, Segment, Form, Button, Table, Loader, Header, Container, Message, Divider} from 'semantic-ui-react';
import ProposalsTable from './proposals-table';
import { Redirect } from 'react-router-dom';

function Proposals(
    {match: {params}, fetchResources, fetchProposalRequestEnvelope, fetchProposal, postProposal,
    proposal, proposalRequestEnvelope, resources, isFetching, hasError, vendor, fetchRequestEnvelope,clearResourceSubmitBanner,submitResourceSuccess, addResource, skillsOptions,fetchSkills}
    ) {
    // Component should redirect after submit
    const [fireRedirect, setFireRedirect] = useState(false);
    // Component should redirect if entity does not exist with given ID.
    const [requestEnvelopeShouldRedirect, setRequestEnvelopeShouldRedirect] = useState(false);
    const [proposalShouldRedirect, setProposalShouldRedirect] = useState(false);

    const [proposals, setProposals] = useState({resourceRequestId: params.resourceRequestId, resources: []});
    const [searchParams, setSearchParams] = useState({
        name: '',
        skill: ''
    })
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [hourlyRate, setHourlyRate] = useState('');
    const [vendorName, setVendorName] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [skills, setSkills] = useState([])

    useEffect( () => {
        setTimeout(() => {
            clearResourceSubmitBanner();
        }, 3000)
    },[submitResourceSuccess]);

    useEffect(() => {
        fetchSkills();
    }, [fetchSkills])

    useEffect(()=>{
        fetchProposalRequestEnvelope(params.id, "ProposalRequestEnvelope");
        setRequestEnvelopeShouldRedirect(true);
    }, [fetchProposalRequestEnvelope, params.id])
    useEffect(()=>{
        if(params.proposalId) {
            setProposalShouldRedirect(true);
            fetchProposal(params.proposalId);
        }
    }, [fetchProposal, params.proposalId]);
    // Set default proposal into state after fetch
    useEffect(()=>{
        if(proposal) {
            setProposals(proposal)
        }
    }, [proposal, setProposals])
    
    if(!isFetching.proposalRequestEnvelope && !proposalRequestEnvelope && requestEnvelopeShouldRedirect) {
        return <Redirect to='/home'/>
    }
    if(!isFetching.proposal && !proposal && params.proposalId && proposalShouldRedirect) {
        return <Redirect to={`/request/${params.id}/approve`}/>
    }
    if(fireRedirect) {
        return <Redirect to={`/request/${params.id}/approve`}/>
    }
    if (isFetching.proposalRequestEnvelope || isFetching.proposal){
        return <Loader active/>
    }

    const addProposal = (proposal) => (e, data) => {
        if (!proposals.resources.find(p => p.id === proposal.id)) {
            setProposals({...proposals, resources: [...proposals.resources, proposal]})
        }
    }

    const removeProposal = (proposal) => () => {
        setProposals({...proposals, resources: proposals.resources.filter(r => r.id !== proposal.id)});
    }

    console.log(submitResourceSuccess)
    const showSuccess = () => {
        return submitResourceSuccess ? <Grid.Column>
            <Grid.Row>
                <Message
                    success
                    header='Success!'
                    content="Resource Submitted"
                />
            </Grid.Row>
            <Divider/>
        </Grid.Column>: null
    };

    const handleSearchChange = (e, {name, value}) => {
        const newSearchParams = {
            ...searchParams,
            [e.target.name]: e.target.value
        };
        setSearchParams(newSearchParams);
    }

    const onSearchClick = (e) => {
        fetchResources({...searchParams, vendor});
    }

    const submitResource = () => {
        const obj ={
            name: name,
            email: email,
            vendor: vendorName,
            hourlyRate: hourlyRate,
            yearsOfExperience: yearsOfExperience
        };

        if((addResource(obj,skills))) {
            setName('');
            setVendorName('');
            setEmail('');
            setHourlyRate('');
            setYearsOfExperience('');
            setSkills(['']);
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleVendorChange = (e) => {
        setVendorName(e.target.value)

    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)

    }

    const handleHourlyRateChange = (e) => {
        setHourlyRate(e.target.value)

    }
    const handleYearsOfExpereinceChange = (e) => {
        setYearsOfExperience(e.target.value)

    };

    const handleSkillChange = (e, {value}) => {
        setSkills(value)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(params.proposalId) {
            const proposalBody = {
                id: params.proposalId,
                resourceRequestId: proposals.resourceRequestId,
                resources: proposals.resources
            }
            if (proposal.resourceRequestId === proposals.resourceRequestId) {
                delete proposalBody.resourceRequestId;
            }
            postProposal(proposalBody, params.id);
        } else {
            postProposal(proposals, params.id);
        }
        setFireRedirect(true);
    }

    const resourceMapper = (buttonProps) => (resource) => <Table.Row key={resource.id}>
        <Table.Cell>{resource.name}</Table.Cell>
        <Table.Cell>{resource.skills ? resource.skills.map(skill => skill.skill).join(", ") : 'No Skills'}</Table.Cell>
        <Table.Cell>{resource.vendor}</Table.Cell>
        <Table.Cell>{resource.email}</Table.Cell>
        <Table.Cell><a href={resource.resumeLink}>resume</a></Table.Cell>
        <Table.Cell>${resource.hourlyRate.toFixed(2)}</Table.Cell>
        <Table.Cell>{<Button {...buttonProps} disabled={buttonProps.disabled && buttonProps.disabled(resource)} onClick={buttonProps.onClick(resource)}/>}</Table.Cell>
    </Table.Row>

    const tableColumns = ['Name', 'Skills', 'Vendor', 'E-Mail', 'Resume Link', '$/hr', ''];
    return <Grid columns='16' textAlign='center' verticalAlign='top'>
        <Grid.Column width='10'>
            <Grid columns={2}>
                <Grid.Row>
                <Grid.Column>
                    <Form>
                    <Form.Group widths='equal'>
                <Form.Input
                  value={searchParams.name}
                  name='name'
                  onChange={handleSearchChange}
                  fluid
                  icon='search'
                  iconPosition='left'
                  placeholder='Name'
                  />
                <Form.Input
                  value={searchParams.skill}
                  name='skill'
                  onChange={handleSearchChange}
                  fluid
                  icon='search'
                  iconPosition='left'
                  placeholder='Skill'
                  />
                    </Form.Group>
                    </Form>
                  </Grid.Column>
                  <Grid.Column verticalAlign='bottom'>
                    <Button disabled={isFetching.resources} onClick={onSearchClick}>
                    {isFetching.resources ?
                        <Loader active inline='centered' size='tiny'/>
                        : 'Search'}
                    </Button>
                      <Button onClick={submitResource}>Add Resource</Button>
                  </Grid.Column>
                  </Grid.Row>
                  </Grid>
            <Message>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input
                            fluid
                            label='Name'
                            placeholder='Name'
                            name='name'
                            value={name}
                            onChange={handleNameChange}
                        />
                        <Form.Input
                            fluid
                            label='$/hr'
                            placeholder='$'
                            name='hourlyRate'
                            value={hourlyRate}
                            onChange={handleHourlyRateChange}

                        />
                        <Form.Input
                            fluid
                            label='Email'
                            placeholder='Email'
                            name='email'
                            value={email}
                            onChange={handleEmailChange}

                        />
                        <Form.Input
                            fluid
                            label='Years of experience'
                            placeholder='Years of experience'
                            name='yearsOfExperience'
                            value={yearsOfExperience}
                            onChange={handleYearsOfExpereinceChange}

                        />
                        <Form.Input
                            fluid
                            label='Vendor'
                            placeholder='Vendor'
                            name='vendorName'
                            value={vendorName}
                            onChange={handleVendorChange}
                        />
                        <Form.Dropdown
                            fluid
                            multiple selection
                            label='skills'
                            options={skillsOptions}
                            name='skills'
                            placeholder='Select'
                            value={skills}
                            onChange={handleSkillChange}
                        />
                    </Form.Group>
                </Form>
            </Message>
           <Grid.Row>
                {showSuccess()}
            </Grid.Row>
                <ProposalsTable
                label="Search Results"
                headers={tableColumns}
                    dataSize={resources.length}
                    emptyMessage={isFetching.resources ? "Loading" : "No resources found."}
                    displayNumberOfResults
                >{
                    isFetching.resources ? <Table.Row>
                        <Table.Cell colSpan={tableColumns.length}>
                        <Loader active inline='centered'/>
                        </Table.Cell>
                        </Table.Row> :
                    resources.map(resourceMapper({
                        disabled: (resource) => proposals.resources.find(p => p.id === resource.id) !== undefined,
                        icon: 'add',
                        title: 'Add to proposal.',
                        onClick: (resource) => addProposal(resource)
                    }))
                }</ProposalsTable>
                <ProposalsTable
                    label='Proposals'
                    headers={tableColumns}
                    dataSize={proposals.resources.length}
                    emptyMessage='Add a proposal from above.'
                >{
                    proposals.resources.map(resourceMapper({
                        icon: 'minus',
                        title: 'Remove from proposal.',
                        onClick: (resource) => removeProposal(resource)
                    }))
                }</ProposalsTable>
                <Form>
                    <Form.Group>
                        <Button icon='save' label='Save' onClick={onSubmit}/>
                    </Form.Group>
                </Form>
        </Grid.Column>
    </Grid>
}

export default Proposals;