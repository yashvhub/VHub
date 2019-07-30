import React, {useState} from 'react';
import {Form, Grid, Input, Label} from 'semantic-ui-react';

 class ResourceForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            newSkill:'',
        }
    }
    componentDidUpdate(nextProps, nextState){
        console.log(nextProps)
    }
    handleInput = (e) => {
        this.setState({newSkill: e.target.value})
    }
    addSkillToResource = () => {
        this.props.addNewSkill(this.state.newSkill, this.props.index)
    }
    render(){
        console.log('here state', this.state)
        console.log('here props', this.props)
        const skills = this.props.skills.map((skill)=>{
            return <Label key={skill} color='blue' tag>{skill}</Label>
        })
        return(
            <>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Number of Resources' placeholder='quantity'/>
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='$/hr' placeholder='$'/>
                    <Form.Input fluid label='Experience In Years Required' placeholder='years'/>
                </Form.Group>
                    <Input
                    icon='tags'
                    iconPosition='left'
                    label={{tag: true, content: 'Add Skill', onClick:this.addSkillToResource}}
                    labelPosition='right'
                    placeholder='Add Skills'
                    onChange={this.handleInput}
                    />
                <Form.Group>
                    {skills}
                </Form.Group>
            </>
        )
    }
}

export default ResourceForm;