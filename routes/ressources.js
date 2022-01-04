const express = require("express");
const router = express.Router();

router.get("/ressources", (req, res, next) => {
    res.render('ressources');
});

module.exports = router;