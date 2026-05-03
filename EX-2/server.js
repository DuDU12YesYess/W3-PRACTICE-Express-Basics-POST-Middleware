// server.js
import express from "express";
import courses from "./course.js";

const app = express();
const PORT = 3000;

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses', (req, res) => {
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;
  
    let filteredCourses = courses.filter(course => course.department === dept);
    if (level) {
        filteredCourses = filteredCourses.filter(course => course.level === level);
    }

    if(minCredits > maxCredits){
        res.status(400).json({ error: "Invalid credits range" });
        return;
    }

    res.json(filteredCourses);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
