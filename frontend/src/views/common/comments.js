import React, { useState } from 'react';
import { Comment, Header, Checkbox, Button, Form } from 'semantic-ui-react';

const Comments = ({ commentBlock }) => {
    const [collapsed, setCollapsed] = useState(true);
    const handleCheckbox = (e, { checked }) => setCollapsed(!collapsed);
    let sortedComments = commentBlock.sort((a,b) => {
        return new Date(a.createdAt) - new Date(b.createdAt)
    })

    return (
        <>

            <Checkbox defaultChecked label='Collapse comments' value={collapsed} onChange={handleCheckbox} />
            <Comment.Group collapsed={collapsed} threaded>
                <Header as='h3' dividing>
                    Comments
                </Header>
                {sortedComments.map(comment => (
                    <Comment>
                        <Comment.Content>
                            <Comment.Author>{`${comment.author.firstName} ${comment.author.lastName}`}</Comment.Author>
                            <Comment.Metadata>
                                <div>Commented on: {comment.createdAt}</div>
                            </Comment.Metadata>
                            <Comment.Text>{comment.comment}</Comment.Text>
                        </Comment.Content>
                    </Comment>
                ))}


                <Form reply>
                    <Form.TextArea />
                    <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                </Form>

            </Comment.Group>
        </>

    );

}

export default Comments;