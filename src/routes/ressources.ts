import express from "express";
const router = express.Router();

router.get("/ressources", (req, res, next) => {
    res.redirect('https://clist.by/resources/');
});

export default router;