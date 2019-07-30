import React from 'react';
import { Table, Label, Header } from 'semantic-ui-react';

function ProposalsTable({label, headers, children, dataSize, emptyMessage='No results found', displayNumberOfResults}) {
    return <Table>
            <Table.Header>
                {label && <Table.Row>
                    <Table.HeaderCell colSpan={headers.length} textAlign='center'>{label}</Table.HeaderCell>
                </Table.Row>}
                <Table.Row>{
                    headers.map(header => <Table.HeaderCell key={header}>{header}</Table.HeaderCell>)
                }</Table.Row>
            </Table.Header>
            <Table.Body>
                {
                    children
                }
                {(displayNumberOfResults || !dataSize) && <Table.Row>
                    <Table.Cell colSpan={headers.length} textAlign='center'>
                        <Header>{
                            dataSize ? `${dataSize} result${dataSize === 1 ? '' : 's'} found.`
                            : emptyMessage
                        }</Header>
                    </Table.Cell>
                </Table.Row>}
            </Table.Body>
        </Table>
}

export default ProposalsTable;