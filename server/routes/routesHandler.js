const router = require('express').Router();
const Feeding = require('../models/feeding.model');

router.route("/view").get((req, res) => {
    Feeding.find()
        .then(feedings => res.json(feedings))
        .catch(err => {
            // can log error message here if logging is setup
            res.status(400).json("Error - Could not access feedings.");
        });
});

router.route("/add").post((req, res) => {
    // handle form submits to update db
    let numberOfDucks = req.body.numberOfDucks;
    let feedingLocation = req.body.feedingLocation;
    let feedingTime = req.body.feedingTime;
    let food = req.body.food;
    let foodQuantity = req.body.foodQuantity;

    let newFeeding = new Feeding({
        numberOfDucks, feedingLocation, feedingTime, food, foodQuantity
    });

    newFeeding.save()
        .then(() => res.json("Feeding submitted!"))
        .catch(err => {
            // can log error message here if logging is setup
            res.status(400).json("Error - Could not add new feeding record.");
        });
});

module.exports = router;