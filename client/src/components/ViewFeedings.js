import React, { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import { Table, Container, Row, Col } from 'react-bootstrap';
import UpArrow from '../images/up.png';
import DownArrow from '../images/down.png';
import classNames from 'classnames';

const feedingsReducer = (state, action) => {
    switch(action.type) {
        case "populate":
            return action.payload;
        case 'asc': {
            switch(action.payload) {
                case "numberOfDucks":
                    return [...state.sort((a,b) => a.numberOfDucks.toString().localeCompare(b.numberOfDucks.toString()))];
                case "feedingLocation":
                    return [...state.sort((a,b) => a.feedingLocation.localeCompare(b.feedingLocation))];
                case "feedingTime":
                    return [...state.sort((a,b) => a.feedingTime.toString().localeCompare(b.feedingTime.toString()))];
                case "food":
                    return [...state.sort((a,b) => a.food.localeCompare(b.food))];
                case "foodQuantity":
                    return [...state.sort((a,b) => a.foodQuantity.toString().localeCompare(b.foodQuantity.toString()))];
                default:
                    return state;
            }
        }
        case 'desc': {
            switch(action.payload) {
                case "numberOfDucks":
                    return [...state.sort((a, b) => b.numberOfDucks.toString().localeCompare(a.numberOfDucks.toString()))];
                case "feedingLocation":
                    return [...state.sort((a, b) => b.feedingLocation.localeCompare(a.feedingLocation))];
                case "feedingTime":
                    return [...state.sort((a, b) => b.feedingTime.toString().localeCompare(a.feedingTime.toString()))];
                case "food":
                    return [...state.sort((a, b) => b.food.localeCompare(a.food))];
                case "foodQuantity":
                    return [...state.sort((a, b) => b.foodQuantity.toString().localeCompare(a.foodQuantity.toString()))];
                default:
                    return state;
            }
        }
        default:
            return state;
    }
}

const ViewFeedings = () => {
    const [filteredFeedings, setFilteredFeedings] = useState([]);
    const [feedings, dispatch] = useReducer(feedingsReducer, []);
    const [sortingBy, setSortingBy] = useState("");
    // let test = React.createRef();

    useEffect(() => {
        getAllFeedings();
    }, []);

    const getAllFeedings = async() => {
        axios.get("http://localhost:4000/view")
            .then(res => {
                console.log(res.data);
                dispatch({ type: "populate", payload: res.data });
                setFilteredFeedings(res.data);
            });
    }

    const formatTime = (rawTime) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        var tempDate = new Date(rawTime);

        return tempDate.toLocaleDateString(undefined, options) + " @ " + tempDate.toLocaleTimeString('en-US');
    }

    const setSortOrder = (field, order) => {
        setSortingBy(field + "_" + order);
        dispatch({ type: order, payload: field });
        setFilteredFeedings(feedings);
    }
    
    const tableBody = filteredFeedings.map(feeding => {
        return (
            <tr key={feeding._id} style={{ fontSize: "1.3em" }}>
                <td className="align-middle"><div><p>{ feeding.numberOfDucks }</p></div></td>
                <td className="align-middle"><div><p>{ feeding.feedingLocation }</p></div></td>
                <td className="align-middle"><div><p>{ formatTime(feeding.feedingTime) }</p></div></td>
                <td className="align-middle"><div><p>{ feeding.food }</p></div></td>
                <td className="align-middle"><div><p>{ feeding.foodQuantity + " grams" }</p></div></td>
            </tr>            
        );
    });

    return (
        <div>
            <h3 className="mt-4">View feedings</h3>
            <hr />

            <Container id="tableFilters">
                
            </Container>
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
                    <tbody>
                        { tableBody }
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default ViewFeedings;