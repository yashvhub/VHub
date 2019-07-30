import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

class ConfirmTable extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name of Resource</Table.HeaderCell>
                        <Table.HeaderCell>Resume</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>John Lilki</Table.Cell>
                        <Table.Cell><Link to='#'>JL.Resume</Link></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Jamie Harington</Table.Cell>
                        <Table.Cell><Link to='#'>JH.Resume</Link></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Jill Mooney</Table.Cell>
                        <Table.Cell><Link to='#'>JM.Resume</Link></Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        );
    };
};

export default ConfirmTable;