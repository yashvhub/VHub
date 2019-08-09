import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Table , Checkbox, Icon} from 'semantic-ui-react';

class ConfirmTable extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        let skillArray = [];

        this.props.resources.map((resources) => {
            {resources.skills.map(skills => (
                skillArray.includes(skills.skill) ? null : skillArray.push(skills.skill)
            ))}
        })

        return(
            <Table celled structured>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell rowSpan='2'>Approve?</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Name</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Resume</Table.HeaderCell>
                        <Table.HeaderCell rowSpan='2'>Years of Exp</Table.HeaderCell>
                        <Table.HeaderCell colSpan={skillArray.length}>Languages</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                    {skillArray.map(skills => (
                        <Table.HeaderCell>{skills}</Table.HeaderCell>
                    ))}
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.props.resources.map(resource => (
                        <Table.Row>
                            <Table.Cell collapsing>
                            <Checkbox checkbox />
                            </Table.Cell>
                            <Table.Cell>{resource.name}</Table.Cell>
                            <Table.Cell><Link to='#'>{resource.resumeLink}</Link></Table.Cell>
                            <Table.Cell>{resource.yearsOfExperience}</Table.Cell>
                            {skillArray.map(skill => ( 
                                    <Table.Cell textAlign='center'>
                                        {resource.skills.filter(s => s.skill === skill).length ? 
                                        <Icon color='green' name='checkmark' size='large' /> : null
                                        }
                                    </Table.Cell>
                                    
                            ))}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        );
    };
};

export default ConfirmTable;