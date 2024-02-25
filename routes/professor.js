const router = require("express").Router();
const schedule = require("../records/schedule");
//const searchQuery = require("../search");
const Search = require("../records/search");
let scheduleArray = [];
async function getSchedule() {
  scheduleArray = await schedule();
}

getSchedule().then();

router.get("/prof/:id", (req, res) => {
  const prof = req.params.id;
  const result = Search(prof, scheduleArray);

  res.status(200).json({ [prof]: result});
});

router.get("/profs", (req, res) => {
  const data = scheduleArray;
  let professorNamesSet = new Set();

  data.forEach((item) => {
    const subject = item.subject;

    const regex =
      /(Mr\.|Ms\.|Dr\.|Prof\.|Mrs\.?)\s+([A-Za-z]+(?: [A-Za-z]+)?)/g;
    const matches = subject.match(regex);

    if (matches) {
      matches.forEach((match) => {
        professorNamesSet.add(match);
      });
    }
  });
  const professorNames = Array.from(professorNamesSet);

  let professors = {};
  professorNames.forEach((prof) => {
    let searchedData = Search(prof, scheduleArray);
    professors[prof] = searchedData;
  });

  res.status(200).json(professors);
});

module.exports = router;
