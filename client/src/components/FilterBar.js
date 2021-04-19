import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const FilterBar = ({
    locationFilter, updateLocationFilter, 
    feedTimeFilter, updateFeedTimeFilter, resetFeedTimeFilter, 
    foodFilter, updateFoodFilter
}) => {
    return (
        <Container id="tableFilters">
                <Form>
                    <Form.Row id="filterInputs" className="w-100 justify-content-center mb-1">
                        <Col xs="1" className="text-right">
                            <Form.Label className="mt-1">Location:</Form.Label>
                        </Col>
                        <Col xs="3">
                            <Form.Control className="w-75" type="text" value={locationFilter} onChange={updateLocationFilter} />
                        </Col>

                        <Col xs="1" className="text-right">
                            <Form.Label className="mt-1">Feed Time:</Form.Label>
                        </Col>
                        <Col xs="4">
                            <Row className="pl-3">
                                <Form.Control className="w-75" type="date" value={feedTimeFilter} onChange={updateFeedTimeFilter} style={{ minWidth: "260px"}} />
                                <Button variant="link" className="pl-1" onClick={resetFeedTimeFilter}>reset?</Button>
                            </Row>
                        </Col>

                        <Col xs="1" className="text-right">
                            <Form.Label className="mt-1">Food:</Form.Label>
                        </Col>
                        <Col xs="2">
                            <Form.Control className="w-100" type="text" value={foodFilter} onChange={updateFoodFilter} />
                        </Col>
                    </Form.Row>
                </Form>
            </Container>
    );
};

export default FilterBar;