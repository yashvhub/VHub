import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {Table, Grid, Form, Button, Loader, Pagination} from 'semantic-ui-react';

function RequestList({requestLists, requestListData, isFetching, page}) {
    const [search, setSearch] = useState('');

    useEffect(() => {
        requestListData()
    }, [requestListData]);

    const handleSearchChange = (e, {value}) => {
        setSearch(value);
        if(value === ''){
            requestListData()
        }
    };

    const onSearchClick = () => {
        requestListData(search);

    };

    //   const PaginationExamplePagination = () => <Pagination defaultActivePage={page.number+1} totalPages={page.totalPages} />;

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
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {object}
                </Table.Body>
            </Table>
            {/*
            <PaginationExamplePagination/>
*/}
        </div>
    );
}

export default RequestList;