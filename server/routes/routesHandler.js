const router = require('express').Router();

router.route("/view").get((req, res) => {
    res.json({"msg": "View Feedings (from backend)"});
});

router.route("/add").get((req, res) => {
    res.json({"msg": "Add a Feeding (from backend)"});
});

router.route("/add").post((req, res) => {
    // handle form submits to update db
});

module.exports = router;