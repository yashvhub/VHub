import React from 'react';
import { Link } from 'react-router-dom';
import { Table , Checkbox, Icon} from 'semantic-ui-react';

class ConfirmTable extends React.Component{
    constructor(props){
        super(props)

    }
    
    render(){
        let skillArray = [];

    function getIndex(value, arr, prop) {
        for(var i = 0; i < arr.length; i++) {
            if(arr[i][prop] === value) {
                return i;
            }
        }
        return -1; //to handle the case where the value doesn't exist
    }


        this.props.resources[0].resources.map((resources) => {
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
                {this.props.selectedBooleans &&
                    
                    this.props.resources.map(resource => {                 
                        return (resource.resources.map(proposal => {
                            let checkedIndex = getIndex(proposal.id, this.props.selectedBooleans, 'id')
                        
                        return(<Table.Row>
                            <Table.Cell collapsing>
                            <Checkbox checkbox defaultChecked={this.props.selectedBooleans[checkedIndex].checked} onChange={this.props.onChange} value={proposal.id}/>
                            </Table.Cell>
                            <Table.Cell>{proposal.name}</Table.Cell>
                            <Table.Cell><Link to='#'>{proposal.resumeLink}</Link></Table.Cell>
                            <Table.Cell>{proposal.yearsOfExperience}</Table.Cell>
                            {skillArray.map(skill => ( 
                                    <Table.Cell textAlign='center'>
                                        {proposal.skills.filter(s => s.skill === skill).length ? 
                                        <Icon color='green' name='checkmark' size='large' /> : null
                                        }
                                    </Table.Cell>
                                    
                            ))}
                        </Table.Row>)
                    }))}
 
                                    )
                }
                
                </Table.Body>
            </Table>
        );
    };
};

export default ConfirmTable;