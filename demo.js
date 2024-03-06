const fs = require('fs');
const Excel = require('exceljs');

const workbook = new Excel.Workbook();
const file = fs.readFileSync(`${__dirname}/file.xlsx`);

const schedule = async () => {
  try {
    await workbook.xlsx.load(file);
    const worksheet = workbook.getWorksheet('Spring-2024');
    let scheduleArray = [];
    
    for (let a = 0; a < 6; a++) {
      let rows = worksheet.getRows(2 + a * 28, 28);
      let day = rows[0].values[1]; // Get the day
      
      console.log(`Processing day: ${day}`);
      
      for (let i = 1; i < rows.length; i++) { // Start from index 1 since index 0 is for the day
        let venue = rows[i].values[1]; // Get the venue
        
        for (let j = 3; j < 6; j++) {
          let slotValue = rows[i].values[j];
          console.log(`Processing slot value: ${slotValue}`);
          
          if (slotValue && slotValue.length > 1) {
            console.log(`Slot value is not empty`);
            
            if (/\d{1,2}:\d{2}(AM|PM)\s*-\s*\d{1,2}:\d{2}(AM|PM)/.test(slotValue)) {
              console.log(`Slot value matches time format`);
              
              // Extracting only the time if it's in the format "start_time - end_time"
              const timeMatch = slotValue.match(/\d{1,2}:\d{2}(AM|PM)\s*-\s*\d{1,2}:\d{2}(AM|PM)/);
              if (timeMatch) {
                let slot = timeMatch[0];
                console.log(`Extracted slot: ${slot}`);
                
                scheduleArray.push({ day, venue, slot });
                console.log(`Added entry to scheduleArray: ${JSON.stringify(scheduleArray)}`);
              }
            }
          }
        }
      }
    }
    console.log(scheduleArray);
  } catch (error) {
    console.log(error);
  }
}

schedule();
