const express = require("express");
//const schedule = require("./records/schedule");
const scheduleRouter = require("./routes/timetable");
const profRouter = require("./routes/professor");
const courseRouter = require("./routes/courses");
const app = express();

app.use(express.json());

app.use("/api", scheduleRouter);
app.use("/api", profRouter);
app.use("/api", courseRouter);

app.listen(3000, () => {
  console.log("running on 3000");
});
