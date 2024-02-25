const router = require("express").Router();
const schedule = require("../records/schedule");
//const searchQuery = require("../search");
const Search = require("../records/search");
let scheduleArray = [];
async function getSchedule() {
  scheduleArray = await schedule();
}

getSchedule().then();

router.get("/schedule", async (req, res) => {
  try {
    res.status(200).json({
      schedule: scheduleArray,
    });
  } catch (error) {
    console.log("error");
  }
});

router.get("/schedule/:id", async (req, res) => {
 try {
  const day = req.params.id;
  const result = Search(day, scheduleArray);
  res.status(200).json(result)
 } catch (error) {
    console.log(error)
 }
});
module.exports = router;