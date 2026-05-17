// server.js
import express from "express";
import courses from "./course.js";
import { loggerMiddleware } from "./Logger.js";
import { validateQueryMiddleware } from "./Validatequery.js";
const app = express();
const PORT = 3000;

app.use(loggerMiddleware);

app.get('/', (req, res) => {
    res.status(200).send("Get Data Home page from server");
});

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses', validateQueryMiddleware, (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;

    let filteredCourses = courses.filter(course => course.department === dept);

    if (level) {
        filteredCourses = filteredCourses.filter(course => course.level === level);
    }

    const minCreditsNum = minCredits ? Number(minCredits) : undefined;
    const maxCreditsNum = maxCredits ? Number(maxCredits) : undefined;

    if (minCreditsNum !== undefined && maxCreditsNum !== undefined && !isNaN(minCreditsNum) && !isNaN(maxCreditsNum)) {
        if (minCreditsNum > maxCreditsNum) {
            return res.status(400).json({ error: "Invalid credits range: minCredits cannot be greater than maxCredits" });
        }
    }

    if (minCreditsNum !== undefined && !isNaN(minCreditsNum)) {
        filteredCourses = filteredCourses.filter(course => course.credits >= minCreditsNum);
    }

    if (maxCreditsNum !== undefined && !isNaN(maxCreditsNum)) {
        filteredCourses = filteredCourses.filter(course => course.credits <= maxCreditsNum);
    }


    if (semester) {
        filteredCourses = filteredCourses.filter(course => course.semester === semester);
    }

    
    if (instructor) {
        filteredCourses = filteredCourses.filter(course => course.instructor.includes(instructor));
    }

    res.json({ result: filteredCourses, meta: { total: filteredCourses.length } });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});