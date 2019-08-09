import React from 'react';
import {Card} from 'semantic-ui-react';

class UserCard extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Card
            image=''
            header={`${sessionStorage.getItem('firstName')} ${sessionStorage.getItem('lastName')}`}
            meta={sessionStorage.getItem('title')}
            description={sessionStorage.getItem('company')}
          />
        )
    }

}

export default UserCard;