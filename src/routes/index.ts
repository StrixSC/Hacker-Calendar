import express from "express";
const router = express.Router();
let calendarSrc = process.env.CALENDAR_SRC

if (!calendarSrc) {
    console.error("Calendar Source not found...");
    process.exit(1);
} else {
    calendarSrc = Buffer.from(calendarSrc, "base64").toString();
}

router.get("/", (req, res, next) => {
    res.render('index', { calendarSrc });
});

export default router;