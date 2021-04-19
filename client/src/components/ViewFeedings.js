import React, { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import { Table, Container, Row, Col, Form, Button } from 'react-bootstrap';
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
                    return [...state.sort((a,b) => a.numberOfDucks - b.numberOfDucks)];
                case "feedingLocation":
                    return [...state.sort((a,b) => a.feedingLocation.localeCompare(b.feedingLocation))];
                case "feedingTime":
                    return [...state.sort((a,b) => a.feedingTime.localeCompare(b.feedingTime))];
                case "food":
                    return [...state.sort((a,b) => a.food.localeCompare(b.food))];
                case "foodQuantity":
                    return [...state.sort((a,b) => a.foodQuantity - b.foodQuantity)];
                default:
                    return state;
            }
        }
        case 'desc': {
            switch(action.payload) {
                case "numberOfDucks":
                    return [...state.sort((a, b) => b.numberOfDucks - a.numberOfDucks)];
                case "feedingLocation":
                    return [...state.sort((a, b) => b.feedingLocation.localeCompare(a.feedingLocation))];
                case "feedingTime":
                    return [...state.sort((a, b) => b.feedingTime.localeCompare(a.feedingTime))];
                case "food":
                    return [...state.sort((a, b) => b.food.localeCompare(a.food))];
                case "foodQuantity":
                    return [...state.sort((a, b) => b.foodQuantity - a.foodQuantity)];
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
    const [locationFilter, setLocationFilter] = useState("");
    const [feedTimeFilter, setFeedTimeFilter] = useState("");
    const [foodFilter, setFoodFilter] = useState("");

    // let test = React.createRef();

    useEffect(() => {
        getAllFeedings();
    }, []);

    useEffect(() => {
        const updateFilteredFeedings = (unfilteredFeedings) => {            
            if (locationFilter.trim() !== "") {
                unfilteredFeedings = unfilteredFeedings.filter(feeding => feeding.feedingLocation.toLowerCase().includes(locationFilter.toLowerCase().trim()));
            }

            if (feedTimeFilter !== "") {
                unfilteredFeedings = unfilteredFeedings.filter(feeding => {
                    let d = new Date(feeding.feedingTime);
                    let targetDate = feedTimeFilter.split("-"); // year, month, date

                    if (isNaN(targetDate[0]) || isNaN(targetDate[1]) || isNaN(targetDate[2])) {
                        return false;
                    }

                    if (d.getFullYear() !== parseInt(targetDate[0])) {
                        return false;
                    }
                    if (d.getMonth() + 1 !== parseInt(targetDate[1])) {
                        return false;
                    }
                    if (d.getDate() !== parseInt(targetDate[2])) {
                        return false;
                    }

                    return true;
                });
            }

            if (foodFilter.trim() !== "") {
                unfilteredFeedings = unfilteredFeedings.filter(feeding => feeding.food.toLowerCase().includes(foodFilter.toLowerCase().trim()));
            }

            setFilteredFeedings(unfilteredFeedings);
        }

        updateFilteredFeedings([...feedings]);

    }, [locationFilter, feedTimeFilter, foodFilter, feedings]);

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
    const updateLocationFilter = (e) => {
        setLocationFilter(e.target.value);
    }
    const updateFeedTimeFilter = (e) => {
        setFeedTimeFilter(e.target.value);
    }
    const updateFoodFilter = (e) => {
        setFoodFilter(e.target.value);
    }
    const resetFeedTimeFilter = (e) => {
        setFeedTimeFilter("");
        e.target.blur();
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
            <h3 className="mt-4">Filter Results by the following fields:</h3>
            <hr />

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
            <hr />
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