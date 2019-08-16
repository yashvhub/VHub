import React from 'react';
import {Card} from 'semantic-ui-react';

function UserCard(props){
        return(
            <Card
            image=''
            header={`${props.user.firstName} ${props.user.lastName}`}
            meta={props.user.title}
            description={props.user.company}
          />
        )
}

export default UserCard;