const fs = require('fs');
const Excel = require('exceljs');

const workbook = new Excel.Workbook();
const file = fs.readFileSync(`${__dirname}/file.xlsx`);

const schedule = async () => {
  try {
    await workbook.xlsx.load(file);
    const worksheet = workbook.getWorksheet('Spring-2024')
    let scheduleArray = [];
    
    for(let a = 0; a<6; a++) {
      let rows = worksheet.getRows(2+a*28, 28);
      let tempObj = {
        subject : '',
        venue: '',
        slot: '',
        day: '',
      };
      let slotMap = [];
      let rowIndex = 0;
      tempObj.day = rows[0].values[1];
      rowIndex++;
      for(let i = 3; i<6; i++) {
        slotMap.push(rows[1].values[i]);
      }
      rowIndex++;

      for(let i = rowIndex; i< rows.length ; i++) {
        tempObj.venue = rows[i].values[1];
        for(let j = 3; j<6; j++) {
          if(rows[i].values[j] && rows[i].values[j].length > 1) {
            tempObj.subject = rows[i].values[j];
            tempObj.slot = slotMap[j-3];
            scheduleArray.push({...tempObj});
          } else {
            tempObj.subject = '';
            tempObj.slot = '';
          }
        }
      }
    }
    return scheduleArray;
  } catch (error) {
    console.log(error);
  }
}

module.exports = schedule;

