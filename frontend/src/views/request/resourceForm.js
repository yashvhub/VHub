import React, {useState} from 'react';
import {Form, Grid, Input, Label, Divider, Icon} from 'semantic-ui-react';

function ResourceForm (props){
    const [newSkill, setNewSkill] = useState('');
    const [quantityError, setQuantityError] = useState(false);
    const [compensationError, setCompensationError] = useState(false);
    const [experienceError, setExperienceError] = useState(false);
    const [skillsError, setSkillsError] = useState(false);
    const {compensation, experience, index, number, skills} = props.requestedResource
    const handleInput = (e) => {
        setNewSkill(e.target.value)
    }
    const addSkillToResource = () => {
        props.addNewSkill(newSkill, index)
    }

    const handleDeleteClick = (id, item) => () => {
        return props.removeSkill(id, item)
    }

    const skillsLabels = skills.map((skill)=>{
        return <Label key={skill} color='blue' tag>{skill} <Icon name='delete' link onClick={handleDeleteClick(index,skill)}/></Label>
    })

    return(
        <>
            <h3>Resource {index+1}</h3>
            <Form.Group widths='equal'>
                <Form.Input 
                fluid 
                label='Number of Resources' 
                placeholder='quantity' 
                onBlur={number === '' ? () => {setQuantityError(true)}:null} 
                error={quantityError}
                />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input 
                fluid 
                label='$/hr' 
                placeholder='$' 
                onBlur={compensation === '' ? () => {setCompensationError(true)}:null} 
                error={compensationError}
                />
                <Form.Input 
                fluid 
                label='Experience In Years Required' 
                placeholder='years' 
                onBlur={experience === '' ? () => {setExperienceError(true)}:null} 
                error={experienceError}
                />
            </Form.Group>
                <Input
                icon='tags'
                iconPosition='left'
                label={{tag: true, content: 'Add Skill', onClick: addSkillToResource}}
                labelPosition='right'
                placeholder='Add Skills'
                onChange={handleInput}
                onBlur={skills.length === 0 ? () => {setSkillsError(true)}:null} 
                error={skillsError}
                />
            <Form.Group>
                {skillsLabels}
            </Form.Group>
            <Divider/>
        </>
    )
}

export default ResourceForm;