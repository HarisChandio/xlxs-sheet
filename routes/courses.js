const router = require("express").Router();
const schedule = require("../records/schedule");
const Search = require("../records/search")
let scheduleArray = [];
async function getSchedule() {
  scheduleArray = await schedule();
}

getSchedule().then();


router.get("/course/:id", (req, res) => {
  const course = req.params.id;
  const result = Search(course, scheduleArray);
  res.status(200).json({
    course: result,
  });
});

router.get("/courses", (req, res) => {
  const data = scheduleArray;
  let courseNames = [];
  data.forEach((item) => {
    const subject = item.subject;

    if (typeof subject === "object" && subject.richText) {
      const text = subject.richText.map((textObj) => textObj.text).join("");

      const regex = /([A-Z]{3,4}-\d+[A-Z]?)/g;
      const matches = text.match(regex);
      if (matches) {
        courseNames = courseNames.concat(matches);
      }
    } else if (typeof subject === "string") {
      const regex = /([A-Z]{3,4}-\d+[A-Z]?)/g;
      const matches = subject.match(regex);
      if (matches) {
        courseNames = courseNames.concat(matches);
      }
    }
  });

  courseNames = [...new Set(courseNames)];

  let courses = {};
  courseNames.forEach((course) => {
    let searchData = Search(course, scheduleArray);
    courses[course] = searchData;
  });

  res.status(200).json(courses);
});


module.exports = router;