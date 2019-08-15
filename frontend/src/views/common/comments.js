import React, {useState} from 'react';
import { Comment, Header, Checkbox} from 'semantic-ui-react';

const Comments = ({ commentBlock }) => {
    const [collapsed, setCollapsed] = useState(true);
    const handleCheckbox = (e, { checked }) => setCollapsed(!collapsed);
    // let sortedComments = commentBlock.sort((a,b) => {
    //     a.createdAt - b.createdAt;
    // })

    return (
        <>

            <Checkbox defaultChecked label='Collapse comments' value={collapsed} onChange={handleCheckbox} />
            <Comment.Group collapsed={collapsed} threaded>
                <Header as='h3' dividing>
                    Comments
                </Header>
                {commentBlock.map(comment => (
                    <Comment>
                        <Comment.Content>
                            {/* <Comment.Author>{comment}</Comment.Author> */}
                            <Comment.Metadata>
                                <div>Commented on: {comment.createdAt}</div>
                            </Comment.Metadata>
                            <Comment.Text>{comment.comment}</Comment.Text>
                        </Comment.Content>
                    </Comment>
                ))}

            </Comment.Group>
        </>

    );

}

export default Comments;