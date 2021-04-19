import React from 'react';
import { Table, Container, Row, Col } from 'react-bootstrap';
import UpArrow from '../images/up.png';
import DownArrow from '../images/down.png';
import classNames from 'classnames';
import { TransitionGroup } from 'react-transition-group/';
import AnimationWrapper from './AnimationWrapper';

const FeedingsTable = ({
    filteredFeedings, setSortOrder, sortingBy
}) => {
    const formatTime = (rawTime) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        var tempDate = new Date(rawTime);

        return tempDate.toLocaleDateString(undefined, options) + " @ " + tempDate.toLocaleTimeString('en-US');
    }

    const tableBody = filteredFeedings.map(feeding => {
        return (
            <AnimationWrapper key={feeding._id} >
                <td className="align-middle"><div><p>{ feeding.numberOfDucks }</p></div></td>
                <td className="align-middle"><div><p>{ feeding.feedingLocation }</p></div></td>
                <td className="align-middle"><div><p>{ formatTime(feeding.feedingTime) }</p></div></td>
                <td className="align-middle"><div><p>{ feeding.food }</p></div></td>
                <td className="align-middle"><div><p>{ feeding.foodQuantity + " grams" }</p></div></td>
            </AnimationWrapper>           
        );
    });

    return (
        <Container id="tableBody">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="text-center">
                            <Container>
                                <Row>
                                    <Col xs="8">
                                        <div className="tableHeaderText">Ducks Fed</div>
                                    </Col>
                                    <Col xs="4">
                                        <div className="tableHeaderSortArrows">
                                            <img src={UpArrow} alt="up arrow" onClick={() => setSortOrder("numberOfDucks", "asc")} 
                                                className={classNames('sortArrow', {'currentSort': sortingBy === "numberOfDucks_asc"})}/>
                                            <br />
                                            <img src={DownArrow} alt="up arrow" onClick={() => setSortOrder("numberOfDucks", "desc")} 
                                                className={classNames('sortArrow', {'currentSort': sortingBy === "numberOfDucks_desc"})}/>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </th>
                        <th className="text-center">
                            <Container>
                                <Row>
                                    <Col xs="8">
                                        <div className="tableHeaderText">Where?</div>
                                    </Col>
                                    <Col xs="4">
                                        <div className="tableHeaderSortArrows">
                                            <img src={UpArrow} alt="up arrow" onClick={() => setSortOrder("feedingLocation", "asc")} 
                                                className={classNames('sortArrow', {'currentSort': sortingBy === "feedingLocation_asc"})}/>
                                            <br />
                                            <img src={DownArrow} alt="up arrow" onClick={() => setSortOrder("feedingLocation", "desc")} 
                                                className={classNames('sortArrow', {'currentSort': sortingBy === "feedingLocation_desc"})}/>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </th>
                        <th className="text-center when">
                            <Container>
                                <Row>
                                    <Col xs="8">
                                        <div className="tableHeaderText">When? (M/D/Y)</div>
                                    </Col>
                                    <Col xs="4">
                                        <div className="tableHeaderSortArrows">
                                            <img src={UpArrow} alt="up arrow" onClick={() => setSortOrder("feedingTime", "asc")} 
                                                className={classNames('sortArrow', {'currentSort': sortingBy === "feedingTime_asc"})}/>
                                            <br />
                                            <img src={DownArrow} alt="up arrow" onClick={() => setSortOrder("feedingTime", "desc")} 
                                                className={classNames('sortArrow', {'currentSort': sortingBy === "feedingTime_desc"})}/>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </th>
                        <th className="text-center">
                            <Container>
                                <Row>
                                    <Col xs="8">
                                        <div className="tableHeaderText">Food Given</div>
                                    </Col>
                                    <Col xs="4">
                                        <div className="tableHeaderSortArrows">
                                            <img src={UpArrow} alt="up arrow" onClick={() => setSortOrder("food", "asc")} 
                                                className={classNames('sortArrow', {'currentSort': sortingBy === "food_asc"})}/>
                                            <br />
                                            <img src={DownArrow} alt="up arrow" onClick={() => setSortOrder("food", "desc")} 
                                                className={classNames('sortArrow', {'currentSort': sortingBy === "food_desc"})}/>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </th>
                        <th className="text-center">
                            <Container>
                                <Row>
                                    <Col xs="8">
                                        <div className="tableHeaderText">Food Quantity</div>
                                    </Col>
                                    <Col xs="4">
                                        <div className="tableHeaderSortArrows">
                                            <img src={UpArrow} alt="up arrow" onClick={() => setSortOrder("foodQuantity", "asc")} 
                                                className={classNames('sortArrow', {'currentSort': sortingBy === "foodQuantity_asc"})}/>
                                            <br />
                                            <img src={DownArrow} alt="up arrow" onClick={() => setSortOrder("foodQuantity", "desc")} 
                                                className={classNames('sortArrow', {'currentSort': sortingBy === "foodQuantity_desc"})} />
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </th>
                    </tr>
                </thead>
                <TransitionGroup component="tbody">
                    { tableBody }
                </TransitionGroup>
            </Table>
        </Container>
    );
};

export default FeedingsTable;