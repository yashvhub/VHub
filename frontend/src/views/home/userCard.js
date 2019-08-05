import React from 'react';
import {Card, Image} from 'semantic-ui-react';

class UserCard extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Card
            image=''
            header={`${this.props.user.firstName} ${this.props.user.lastName}`}
            meta={this.props.user.title}
            description={this.props.user.company}
          />
        )
    }

}

export default UserCard;