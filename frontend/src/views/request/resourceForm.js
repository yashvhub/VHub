import React, {useState, useEffect} from 'react';
import {Form, Grid, Input, Label, Divider, Icon} from 'semantic-ui-react';

function ResourceForm (props){
    const [newSkill, setNewSkill] = useState('');
    const [quantityError, setQuantityError] = useState(false);
    const [compensationError, setCompensationError] = useState(false);
    const [experienceError, setExperienceError] = useState(false);
    const [skillsError, setSkillsError] = useState(false);
    const {compensation, experience, index, number, skills} = props.requestedResource
    
    const {fetchSkills} = props;

    useEffect(() => {
        fetchSkills();
    }, [fetchSkills])

    const handleInput = (e) => {
        setNewSkill(e.target.value)
    }
    const addSkillToResource = () => {
        props.addNewSkill(newSkill, index)
    }

    const handleDeleteClick = (id, item) => () => {
        return props.removeSkill(id, item)
    }

    // const skillsLabels = skills.map((skill)=>{
    //     return <Label key={skill} color='blue' tag>{skill} <Icon name='delete' link onClick={handleDeleteClick(index,skill)}/></Label>
    // })

    const validateString = (string, callback) => {
        return string === '' ? callback(true) : callback(false)
    }
    const validateArray = (array, callback) => {
        return array.length === 0 ? callback(true): callback(false)
    }

    return(
        <>
            <h3>Resource {index+1}</h3>
            <Form.Group widths='equal'>
                <Form.Input 
                fluid 
                label='Number of Resources' 
                placeholder='quantity' 
                name='number'
                onChange={props.handleChange}
                onBlur={()=> validateString(number, setQuantityError)} 
                error={quantityError}
                />
                <Form.Input 
                fluid 
                label='$/hr' 
                placeholder='$'
                name='compensation'
                onChange={props.handleChange} 
                onBlur={()=> validateString(compensation, setCompensationError)} 
                error={compensationError}
                />
                <Form.Input 
                fluid 
                label='Experience In Years' 
                placeholder='years' 
                name='experience'
                onChange={props.handleChange}
                onBlur={()=> validateString(experience, setExperienceError)} 
                error={experienceError}
                />
            </Form.Group>
            <Form.Dropdown 
                        fluid 
                        multiple selection 
                        label='skills' 
                        options={props.skillsOptions} 
                        name='skills'  
                        placeholder='Select' 
                        onChange={props.handleChange} 
                        onBlur={()=> validateArray(skills, setSkillsError)} 
                        error={skillsError}
                        />
            {/* <Form.Group>
                {skillsLabels}
            </Form.Group> */}
            <Divider/>
        </>
    )
}

export default ResourceForm;