import express from "express";
const router = express.Router();

router.get("/ressources", (req, res, next) => {
    res.render('ressources');
});

export default router;