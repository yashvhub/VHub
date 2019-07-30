import React from 'react';
import {Item, Container } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

function VendorList(){
    const items = [{
        as: Link,
        childKey: 0,
        image: '',
        header: 'Vendor Name',
        description: 'Description',
        meta: 'Metadata',
        extra: 'Extra',
        to: '/vendor'
    },
    {
        as: Link,
        childKey: 1,
        image: '',
        header: 'Vendor Name',
        description: 'Description',
        meta: 'Metadata',
        extra: 'Extra',
        to: '/vendor'
      }
]
    
    return(
    <Container>
        <Item.Group
            link={true}
            divided={true}
            items={items}
        />
    </Container>
    )
}

export default VendorList;