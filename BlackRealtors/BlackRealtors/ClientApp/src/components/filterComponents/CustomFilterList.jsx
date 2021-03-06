import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Row,
    Col,
    Card,
    CardTitle,
    CardBody,
    Input,
    Button,
    Alert,
    CardFooter
} from 'reactstrap';
import CustomFilterItem from './CustomFilterItem';
import {
    addCustomPoint,
    addCustomPointAction,
    deleteCustomPoint
} from '../../actions/actions';
import '../../styles/filterStyles.css';

class CustomFilterList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            coordinates: []
        };
    }

    addFilter = () => {
        var address = document.getElementById('address').value;

        this.props.addPoint(`${address}, Беларусь, Гродно`);

        this.setState({
            items: this.state.items.concat([{ address: address }])
        });
    };

    deleteFilter = item => {
        this.setState({
            items: this.state.items.filter(filterItem => filterItem !== item)
        });

        //this.props.deletePoint(item.coordinates);
    };

    render() {
        return (
            <Card>
                <CardTitle>
                    <Alert color='primary'>
                        <h4>Custom Addresses</h4>
                    </Alert>
                </CardTitle>
                <CardBody>
                    {this.state.items.length !== 0 ? (
                        this.state.items.map((item, index) => (
                            <CustomFilterItem
                                key={index}
                                item={item}
                                deleteItem={this.deleteFilter}
                            />
                        ))
                    ) : (
                        <p>No items...</p>
                    )}
                </CardBody>
                <CardFooter>
                    <Row>
                        <Col xs='8'>
                            <Input id='address' />
                        </Col>
                        <Col xs='4'>
                            <Button
                                outline
                                color='success'
                                onClick={this.addFilter}
                            >
                                Add Address
                            </Button>
                        </Col>
                    </Row>
                </CardFooter>
            </Card>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            addPoint: address => addCustomPoint(address),
            addPointAction: point => addCustomPointAction(point),
            deletePoint: point => deleteCustomPoint(point)
        },
        dispatch
    );
};

export default connect(
    null,
    mapDispatchToProps
)(CustomFilterList);
