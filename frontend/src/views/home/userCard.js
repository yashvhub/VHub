import React from 'react';
import {Card, Image} from 'semantic-ui-react';

class UserCard extends React.Component{
    constructor(props){
        super(props)
    }

    render(props){
        return(
            <Card
            image=''
            header='Nick Stone'
            meta='Software Engineer'
            description='Yash Technologies'
          />
        )
    }

}

export default UserCard;