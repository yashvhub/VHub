import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {Table, Grid, Form, Button, Loader, Pagination, Dropdown, Radio} from 'semantic-ui-react';

function RequestList({requestLists, requestListData, isFetching, page, onClose, onReOpen}) {
    const [search, setSearch] = useState('');
    const [number, setNumber] = useState('');
    const [toggle, setToggle] = useState(false);

    const options = [
        {key: '1', text: '5', value: 5 },
        {key: '2', text: '10', value: 10 },
        {key: '3', text: '15', value: 15 },
        {key: '4', text: '20', value: 20 }
    ];

    useEffect(() => {
        requestListData(undefined, undefined, toggle);
    }, [requestListData, toggle]);

    const handleSearchChange = (e, {value}) => {
        setSearch(value);
        if(value === ''){
            requestListData(undefined, undefined, toggle)
        }
    };

    const handleChange = (e, {value}) => {
        setNumber(value)
        if(value) {
            requestListData(search, {...page, size: value}, toggle)
        }
    };

    const onSearchClick = () => {
        requestListData(search, undefined, toggle);

    };

    const onPageChange = (e, {activePage}) => {
        requestListData(search, {...page, page: Number(activePage-1)}, toggle)
    };

    const closeRequest = (id) => () => {
        onClose(id,undefined, undefined, toggle );
    };

    const onToggle = () => {
        setToggle(!toggle);
        setSearch('');
    };

    const onReOpenRequest = (id) => () => {
        onReOpen(id,undefined, undefined, toggle );
    };

    const PaginationExamplePagination = () => <Pagination defaultActivePage={page.number+1} totalPages={page.totalPages} onPageChange={onPageChange}/>;

    const object = requestLists.map((requestList) => {
        return (
            <Table.Row key={requestList.id}>
                <Table.Cell>
                    <Link to={`/request/${requestList.id}/approve`}>{requestList.id}</Link>
                </Table.Cell>
                <Table.Cell>
                    {requestList.jobPosting}
                </Table.Cell>
                <Table.Cell>
                    {requestList.requestDate}
                </Table.Cell>
                <Table.Cell>
                    {`${requestList.requester.firstName} ${requestList.requester.lastName}`}
                </Table.Cell>
                <Table.Cell>
                    {requestList.numberOfRequestedResources}
                </Table.Cell>
                <Table.Cell>
                    {requestList.clientName}
                </Table.Cell>
                <Table.Cell>
                    {requestList.manager}
                </Table.Cell>
                <Table.Cell>
                    <Link to={`/confirm/${requestList.id}`}>{requestList.requestStatus.status}</Link>
                </Table.Cell>
                <Table.Cell>
                    {requestList.requestStatus.status === 'CONFIRMED' ? <Button onClick={closeRequest(requestList.id)}>Close Request</Button> : null}
                    {requestList.requestStatus.status === 'CLOSED' ? <Button onClick={onReOpenRequest(requestList.id)}>ReOpen Request</Button> : null}
                </Table.Cell>
            </Table.Row>
        )
    });

    return (
        <div>
            <Grid columns='6'>
                <Grid.Row>
                    <Grid.Column width='4'>
                        <Form.Input
                            value={search}
                            name='name'
                            onChange={handleSearchChange}
                            fluid
                            icon='search'
                            iconPosition='left'
                            placeholder='Name'
                        />
                    </Grid.Column>
                    <Grid.Column verticalAlign='bottom'>
                        <Button disabled={isFetching} onClick={onSearchClick}>{isFetching ? <Loader active inline='centered' size='tiny'/> : 'Search'}</Button>
                    </Grid.Column>
                    <Grid.Column>
                    <Dropdown clearable placeholder='Select Size' options={options} selection value={number} onChange={handleChange}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Table celled padded>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell singleLine>RequestID</Table.HeaderCell>
                        <Table.HeaderCell>Job Posting ID</Table.HeaderCell>
                        <Table.HeaderCell>Requested Date</Table.HeaderCell>
                        <Table.HeaderCell>Requestor</Table.HeaderCell>
                        <Table.HeaderCell>Number of Resources</Table.HeaderCell>
                        <Table.HeaderCell>Client</Table.HeaderCell>
                        <Table.HeaderCell>Manager</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>
                            <Grid.Column>
                                <Radio toggle onChange={onToggle}  />
                            </Grid.Column>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {object}
                </Table.Body>
            </Table>
            
            <PaginationExamplePagination/>

        </div>
    );
}

export default RequestList;