import React from 'react';
import { Form, Button, Divider, Message } from 'semantic-ui-react';
import {Link } from 'react-router-dom';

export const ApproveProposal = ({proposal, index}) => {

    const resources = proposal.resources.map(((resource,index) => {
        return (
            <>
                <Message>
            <Form.Group widths='equal'>
                <Form.Input fluid label='Name' value={resource.name} readOnly />
                <Form.Input fluid label='Vendor' value={resource.vendor} readOnly />
            </Form.Group>
            <Form.Group>
            <Form.Input label='Email' value={resource.email} readOnly />
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Input fluid label='$/hr' value={resource.hourlyRate} readOnly />
                <Form.Input fluid label='Years of Experience' value={resource.yearsOfExperience} readOnly />
            </Form.Group>
            <Form.Group>
            <Button icon="paperclip" label="Resume" as={Link} to={resource.resumeLink}/>
            </Form.Group>
            <Divider section />
                </Message>
        </>
        )
    }))

    return (
        [resources]
    )
};