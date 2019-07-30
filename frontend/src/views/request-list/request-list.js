import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import Modal from 'react-responsive-modal';


class RequestList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }

    componentDidMount() {
        this.props.requestListData();
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    render() {
        const object = this.props.requestLists.map((requestList) => {
            return (
                <Table.Row key={requestList.id}>
                    <Table.Cell>
                        <Link to={`/request/${requestList.id}`}>{requestList.requestID}</Link>
                    </Table.Cell>
                    <Table.Cell>
                        {requestList.jobPostingID}
                    </Table.Cell>
                    <Table.Cell>
                        {requestList.requestedData}
                    </Table.Cell>
                    <Table.Cell>
                        {requestList.requestor}
                    </Table.Cell>
                    <Table.Cell>
                        {requestList.numberOfResources}
                    </Table.Cell>
                    <Table.Cell>
                        {requestList.client}
                    </Table.Cell>
                    <Table.Cell>
                        {requestList.manager}
                    </Table.Cell>
                    <Table.Cell>
                        <Link to={`/confirm/${requestList.requestID}`}>{requestList.status}</Link>
                    </Table.Cell>
                    <Table.Cell>
                        <a  style={{textDecoration:'none', cursor:'pointer'}} key={requestList.id}  onClick={this.onOpenModal}>Details</a>
                        <Modal open={this.state.open} onClose={this.onCloseModal} little>
                            <h2>{requestList.jobPostingID}</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                                pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
                                hendrerit risus, sed porttitor quam.
                            </p>
                        </Modal>
                    </Table.Cell>
                </Table.Row>
            )
        });
        return(
            <Table celled padded>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell singleLine>RequestID</Table.HeaderCell>
                        <Table.HeaderCell>Job Posting ID</Table.HeaderCell>
                        <Table.HeaderCell>Requested Date</Table.HeaderCell>
                        <Table.HeaderCell>Requestor</Table.HeaderCell>
                        <Table.HeaderCell>Number of Resources</Table.HeaderCell>
                        <Table.HeaderCell>Client</Table.HeaderCell>
                        <Table.HeaderCell>Manager</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell> </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {object}
                </Table.Body>
            </Table>
        );
    }
}

export default RequestList;