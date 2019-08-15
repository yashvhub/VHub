import React, {useState} from 'react';
import {Form, Grid, Input, Label, Divider} from 'semantic-ui-react';

 class ApproveResourceForm extends React.Component{
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
    render(){
        const skills = this.props.skills.map((skill)=>{
            return <Label key={skill} color='blue' tag>{skill}</Label>
        })
        return(
            <>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='Number of Resources' placeholder='quantity' value={this.props.count} readOnly/>
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='$/hr' placeholder='$' value={this.props.hourlyRate} readOnly/>
                    <Form.Input fluid label='Experience In Years Required' placeholder='years' value={this.props.yearsOfExperience} readOnly/>
                </Form.Group>
                <Form.Group>
                    {skills}
                </Form.Group>
                <Divider section/>
            </>
        )
    }
}

export default ApproveResourceForm;