import React, { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import FilterBar from './FilterBar';
import FeedingsTable from './FeedingsTable';

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
                dispatch({ type: "populate", payload: res.data });
                setFilteredFeedings(res.data);
            });
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

    return (
        <div>
            <h3 className="mt-4">Filter Results by the following fields:</h3>
            <hr />
            <FilterBar locationFilter={locationFilter} updateLocationFilter={updateLocationFilter} 
                feedTimeFilter={feedTimeFilter} updateFeedTimeFilter={updateFeedTimeFilter} resetFeedTimeFilter={resetFeedTimeFilter}
                foodFilter={foodFilter} updateFoodFilter={updateFoodFilter} />
            <hr />
            <FeedingsTable filteredFeedings={filteredFeedings} setSortOrder={setSortOrder} sortingBy={sortingBy} />
        </div>
    );
};

export default ViewFeedings;