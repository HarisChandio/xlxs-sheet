const fs = require("fs");
const Excel = require("exceljs");

const workbook = new Excel.Workbook();
const file = fs.readFileSync(`${__dirname}/file.xlsx`);

const read = async () => {
  try {
    await workbook.xlsx.load(file);
    const worksheet = workbook.getWorksheet("Spring-2024");
    let scheduleArray = [];

    for (let a = 0; a < 6; a++) {
        let rows = worksheet.getRows(2 + a * 28, (a + 1) * 28);
        let tempObj = {
          subject: "",
          venue: "",
          slot: "",
          day: "",
        };
        let slotMap = [];
        let rowIndex = 0;
        tempObj.day = rows[0].values[1];
        rowIndex++;
        for (let i = 3; i < 6; i++) {
          slotMap.push(rows[1].values[i]);
        }
        rowIndex++;
  
        for (let i = rowIndex; i < rows.length; i++) {
          tempObj.venue = rows[i].values[1];
          for (let j = 3; j < 6; j++) {
            if (rows[i].values[j]) {
              let subject = rows[i].values[j];
      
              let teacherNames = [];
              if (typeof subject === "string") {
                const regex = /(Mr\.|Ms\.|Mrs\.|Dr\.)\s[A-Z][a-z]+(\s[A-Z][a-z]+)?/g;
                const matches = subject.match(regex);
                if (matches) {
                  teacherNames = matches;
                  subject = subject.replace(matches[0], '').trim(); 
                }
              }
        
              tempObj.subject = subject;
              tempObj.slot = slotMap[j - 3];
              tempObj.teacher = teacherNames.length > 0 ? teacherNames[0] : ''; 
              scheduleArray.push({ ...tempObj });
            }
          }
        }
    }
    

    //console.log(JSON.stringify(scheduleArray, null, 2));

    const data = scheduleArray;
    let classNames = [];
    data.forEach((item) => {
      const subject = item.subject;

      if (typeof subject === "object" && subject.richText) {
        const text = subject.richText.map((textObj) => textObj.text).join("");

        const regex = /([A-Z]{3,4}-\d+[A-Z]?)/g;
        const matches = text.match(regex);
        if (matches) {
          classNames = classNames.concat(matches);

        }
      } else if (typeof subject === "string") {
        const regex = /([A-Z]{3,4}-\d+[A-Z]?)/g;
        const matches = subject.match(regex);
        if (matches) {
          classNames = classNames.concat(matches);
        }
      }
    });

    classNames = [...new Set(classNames)];

//     let teacherNames = [];
//     data.forEach((item) => {
//       const subject = item.subject;

//       if (typeof subject === "object" && subject.richText) {
//         const text = subject.richText.map((textObj) => textObj.text).join("");

//         const regex = /(Mr\.|Ms\.|Mrs\.|Dr\.)\s[A-Z][a-z]+(\s[A-Z][a-z]+)?/g;
//         const matches = text.match(regex);
//         if (matches) {
//           teacherNames = teacherNames.concat(matches);
//         }
//       } else if (typeof subject === "string") {
//         const regex = /(Mr\.|Ms\.|Mrs\.|Dr\.)\s[A-Z][a-z]+(\s[A-Z][a-z]+)?/g;
//         const matches = subject.match(regex);
//         if (matches) {
//           teacherNames = teacherNames.concat(matches);
//         }
//       }
//     });
// l
//     teacherNames = [...new Set(teacherNames)];

    //console.log(teacherNames);
    // const result = searchQuery("BBA-4A", scheduleArray);
    // console.log(result);
    const demo = {};
    classNames.forEach((course) => {
      let searchData = searchQuery(course, scheduleArray);
      demo[course] = searchData;
    });

    fs.writeFile(`${__dirname}/demo.json`, JSON.stringify(demo), () => {
      console.log("done");
    });
  } catch (error) {
    console.log(error);
  }
};


const searchQuery = (query, data) => {
  let filteredData = data.filter((item) => {
    return item.subject.toString().toLowerCase().includes(query.toLowerCase());
  });
  let queryResult = {};
  filteredData.forEach((item) => {
    if (item.day in queryResult) {
      queryResult[item.day].push(item);
    } else {
      queryResult[item.day] = [item];
    }
  });
  return queryResult;
};
read();
