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

router.get("/schedule/:day", async (req, res) => {
 try {
  const day = req.params.day;
  const result = Search(day, scheduleArray);
  res.status(200).json(result)
 } catch (error) {
    console.log(error)
 }
});

router.get("/schedule/:day/:venue", (req, res) => {
  try {
    const day = req.params.day;
    const venue = req.params.venue;
    const searchQuery = (day, venue, data) => {
      let filteredData = data.filter((item) => {
        return (
          item.day.toString().toLowerCase() === day.toLowerCase() &&
          item.venue.toString().toLowerCase() === venue.toLowerCase()
        );
      });
    
      return filteredData;
    };
    
    const result = searchQuery(day,venue, scheduleArray);

    if (result.length > 0) {
      res.status(200).json({
        day: day,
        venue: venue,
        schedule: result
      });
    } else {
      res.status(404).json({ message: "No schedule found for the specified day and venue" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/schedule/:venue", (req,res)=>{
  try {
    const venue = req.params.id;
    const result = Search(venue, scheduleArray);
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
  } 
})
module.exports = router;