import React, { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import { Table, Container } from 'react-bootstrap';

const feedingsReducer = (state, action) => {
    switch(action.type) {
        case "populate":
            return action.payload;
        case 'asc': {
            switch(action.payload) {
                case "numberOfDucks":
                    return state;
                case "feedingLocation":
                    return state;
                case "feedingTime":
                    return state;
                case "food":
                    return state;
                case "foodQuantity":
                    return state;
                default:
                    return state;
            }
        }
        case 'desc': {
            switch(action.payload) {
                case "numberOfDucks":
                    return state;
                case "feedingLocation":
                    return state;
                case "feedingTime":
                    return state;
                case "food":
                    return state;
                case "foodQuantity":
                    return state;
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
    
    const tableBody = filteredFeedings.map(feeding => {
        return (
            <tr id={feeding._id} style={{ fontSize: "1.3em" }}>
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
            <Container id="tableResults">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className="text-center" >Ducks Fed</th>
                            <th className="text-center" >Where?</th>
                            <th className="text-center when" >When? (M/D/Y)</th>
                            <th className="text-center" >Food Given</th>
                            <th className="text-center" >Food Quantity</th>
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