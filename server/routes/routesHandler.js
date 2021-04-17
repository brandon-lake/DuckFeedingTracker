const router = require('express').Router();
let Feeding = require('../models/feeding.model');

router.route("/view").get((req, res) => {
    Feeding.find()
        .then(feedings => res.json(feedings))
        .catch(err => {
            // can log error message here if logging is setup
            res.status(400).json("Error - Could not access feedings.");
        });
});

router.route("/add").get((req, res) => {
    res.json({"msg": "Add a Feeding (from backend)"});
});

router.route("/add").post((req, res) => {
    // handle form submits to update db
});

module.exports = router;