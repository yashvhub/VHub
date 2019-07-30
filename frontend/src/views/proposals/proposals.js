import React, {useEffect, useState} from 'react';
import { Grid, Segment, Form, Button, Table, Loader, Header } from 'semantic-ui-react';
import ProposalsTable from './proposals-table';

const COMMENTS = [
    {
        id: 1,
        proposalId: 1,
        author: {
            id: 1,
            email: "caleb.reiter@yash.com",
            firstName: "Caleb",
            lastName: "Reiter",
            title: "Software Engineer",
            company: "YASH",
        },
        comment: "This is an example Comment.",
        createdAt: new Date(),
        lastUpdated: null
    }
]

function Proposals({fetchResources, resources, isFetching, vendor}) {

    const [searchParams, setSearchParams] = useState({
        name: '',
        skill: ''
    })

    const [proposals, setProposals] = useState([]);

    const addProposal = (proposal) => (e, data) => {
        if (!proposals.find(p => p.id === proposal.id)) {
            setProposals([...proposals, proposal])
        }
    }

    const removeProposal = (proposal) => () => {
        setProposals(proposals.filter(p => p.id !== proposal.id));
    }

    const handleSearchChange = (e, {name, value}) => {
        const newSearchParams = {
            ...searchParams,
            [e.target.name]: e.target.value
        };
        setSearchParams(newSearchParams);
    }

    const onSearchClick = (e) => {
        fetchResources(searchParams);

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
    const vendorResources = resources.filter(f => f.vendor === vendor);
    const openMarketResources = resources.filter(f => f.vendor !== vendor);

    return <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='top'>
        <Grid.Column style={{ maxWidth: 900 }}>
            <Grid columns={2}>
                <Grid.Row>
                <Grid.Column>
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
                  </Grid.Column>
                  <Grid.Column verticalAlign='bottom'>
                <Button disabled={isFetching} onClick={onSearchClick}>{isFetching ? <Loader active inline='centered' size='tiny'/> : 'Search'}</Button>
                  </Grid.Column>
                  </Grid.Row>
                  </Grid>
                <ProposalsTable
                label="Search Results"
                headers={tableColumns}
                    dataSize={vendorResources.length}
                    emptyMessage={isFetching ? "Loading" : "No resources found."}
                    displayNumberOfResults
                >{
                    isFetching ? <Table.Row>
                        <Table.Cell colSpan={tableColumns.length}>
                        <Loader active inline='centered'/>
                        </Table.Cell>
                        </Table.Row> :
                    vendorResources.map(resourceMapper({
                        disabled: (resource) => proposals.find(p => p.id === resource.id) !== undefined,
                        icon: 'add',
                        title: 'Add to proposal.',
                        onClick: (resource) => addProposal(resource)
                    }))
                }</ProposalsTable>
                <ProposalsTable
                    label='Add From Open Market'
                    headers={tableColumns}
                    dataSize={openMarketResources.length}
                    emptyMessage={isFetching ? 'Loading' : 'No resources found.'}
                    displayNumberOfResults
                >{
                    isFetching ? <Table.Row>
                        <Table.Cell colSpan={tableColumns.length}>
                        <Loader active inline='centered'/>
                        </Table.Cell>
                        </Table.Row> :
                    openMarketResources.map(resourceMapper({
                        disabled: (resource) => proposals.find(p => p.id === resource.id) !== undefined,
                        icon: 'add',
                        title: 'Add to proposal.',
                        onClick: (resource) => addProposal(resource)
                    }))
                }</ProposalsTable>
                <ProposalsTable
                    label='Proposals'
                    headers={tableColumns}
                    dataSize={proposals.length}
                    emptyMessage='Add a proposal from above.'
                >{
                    proposals.map(resourceMapper({
                        icon: 'minus',
                        title: 'Remove from proposal.',
                        onClick: (resource) => removeProposal(resource)
                    }))
                }</ProposalsTable>
        </Grid.Column>
    </Grid>
}

export default Proposals;