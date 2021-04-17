import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

const AddFeeding = () => {
    const [numberOfDucks, setNumberOFDucks] = useState("");
    const [feedingLocation, setFeedingLocation] = useState("");
    const [feedingTime, setFeedingTime] = useState("");
    const [food, setFood] = useState("");
    const [foodQuantity, setFoodQuantity] = useState(""); 
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccessMsg("");
        }, 3000);

        return () => clearTimeout(timer);
    }, [successMsg]);

    const updateNumberOfDucks = (e) => {
        setNumberOFDucks(e.target.value);
    }
    const updateFeedingLocation = (e) => {
        setFeedingLocation(e.target.value);
    }
    const updateFeedingTime = (e) => {
        setFeedingTime(e.target.value);
    }
    const updateFood = (e) => {
        setFood(e.target.value);
    }
    const updateFoodQuantity = (e) => {
        setFoodQuantity(e.target.value);
    }

    const validateInputs = () => {
        if (numberOfDucks.trim() === "") {
            setErrorMsg("Must provide a number of ducks fed");
            return false;
        }

        if (feedingLocation.trim() === "") {
            setErrorMsg("Must provide a feeding location");
            return false;
        }

        if (feedingTime === "") {
            setErrorMsg("Must provide a feeding time");
            // could set this up to use current time if left blank, if that was a desired feature
            return false;
        }

        if (food === "") {
            setErrorMsg("Must provide the food given");
            return false;
        }

        if (foodQuantity === "" || foodQuantity <= 0) {
            setErrorMsg("Must provide a food quantity greater than 0");
            return false;
        }

        return true;
    }

    const submitForm = (e) => {
        e.preventDefault();
        setErrorMsg("");

        if (validateInputs()) {
            let feeding = {
                numberOfDucks: numberOfDucks,
                feedingLocation: feedingLocation,
                feedingTime: feedingTime,
                food: food,
                foodQuantity: foodQuantity,
            }

            axios.post("http://localhost:4000/add", feeding)
                .then(res => {
                    if (res.status === 200) {
                        clearForm(res.data);
                    } else {
                        setErrorMsg("Could not insert feeding into database, please try again later.");
                    }
                });
        }
    }

    const clearForm = (response) => {
        setNumberOFDucks("");
        setFeedingLocation("");
        setFeedingTime("");
        setFood("");
        setFoodQuantity("");
        setSuccessMsg(response);
    }

    return (
        <div>
            <h3 className="mt-5">Please fill in all fields regarding your duck feeding:</h3>

            <Form className="mt-4">
                <Form.Row id="numDucks" className="w-100 justify-content-center mb-1">
                    <Col xs="2" className="text-right">
                        <Form.Label className="mt-1">Number of ducks:</Form.Label>
                    </Col>
                    <Col xs="3">
                        <Form.Control className="w-50" type="number" value={numberOfDucks} onChange={updateNumberOfDucks} required />
                    </Col>
                </Form.Row>

                <Form.Row id="feedLocation" className="w-100 justify-content-center mb-1">
                    <Col xs="3" className="text-right">
                        <Form.Label className="mt-1">Feeding Location:</Form.Label>
                    </Col>
                    <Col xs="4">
                        <Form.Control className="w-75" type="text" value={feedingLocation} onChange={updateFeedingLocation} required />
                    </Col>
                </Form.Row>

                <Form.Row id="feedTime" className="w-100 justify-content-center mb-1">
                    <Col xs="2" className="text-right">
                        <Form.Label className="mt-1">Feeding Time:</Form.Label>
                    </Col>
                    <Col xs="3">
                        <Form.Control className="w-50" type="datetime-local" value={feedingTime} onChange={updateFeedingTime} required />
                    </Col>
                </Form.Row>

                <Form.Row id="food" className="w-100 justify-content-center mb-1">
                    <Col xs="2" className="text-right">
                        <Form.Label className="mt-1">Food Given:</Form.Label>
                    </Col>
                    <Col xs="3">
                        <Form.Control className="w-50" type="text" value={food} onChange={updateFood} required />
                    </Col>
                </Form.Row>

                <Form.Row id="foodQuantity" className="w-100 justify-content-center mb-4">
                    <Col xs="2" className="text-right">
                        <Form.Label className="mt-1">Amount of food (grams):</Form.Label>
                    </Col>
                    <Col xs="3">
                        <Form.Control className="w-50" type="number" value={foodQuantity} onChange={updateFoodQuantity} required />
                    </Col>
                </Form.Row>

                <Form.Row id="buttonRow" className="w-100 justify-content-center">
                    <Button className="w-10" type="submit" onClick={submitForm}>Add Feeding!</Button>
                </Form.Row>
            </Form>

            {successMsg.length > 0 && 
                <div className="text-success text-center mt-5 w-100">
                    <h3>{successMsg}</h3>
                </div>
            }
            {errorMsg.length > 0 &&
                <div className="container mt-5 text-danger w-100">
                    <div className="row justify-content-center">
                        <h3>{ errorMsg }</h3>
                    </div>
                </div>
            }
        </div>
    );
};

export default AddFeeding;