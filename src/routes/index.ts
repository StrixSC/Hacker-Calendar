import express from "express";
const router = express.Router();
const calendarSrc = process.env.CALENDAR_SRC

router.get("/", (req, res, next) => {
    res.render('index', { calendarSrc });
});

export default router;