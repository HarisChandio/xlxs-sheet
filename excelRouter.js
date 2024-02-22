
const xlsx = require('xlsx');             // Step 1

module.exports = {
  readExcelController: (req, res) => {
    const workSheetsFromFile = xlsx.readFile(`${__dirname}/file.xlsx`)  // Step 2               // Step 3
    const output = {};

// Iterate through the sheets and structure the data
workSheetsFromFile.forEach(sheet => {
    const data = sheet.data;

    let currentDay;
    let currentVenue;
    let currentTimeSlot;

    data.forEach(row => {
        if (row.length === 1) {
            if (row[0] !== '') {
                currentDay = row[0];
            }
        } else if (row.length > 1) {
            const header = row[0];
            if (header === 'Venue') {
                currentTimeSlot = row[1];
            } else {
                for (let i = 1; i < row.length; i++) {
                    const room = `Room-${i}`;
                    const subject = row[i];
                    if (!output[currentTimeSlot]) {
                        output[currentTimeSlot] = {};
                    }
                    if (!output[currentTimeSlot][room]) {
                        output[currentTimeSlot][room] = {};
                    }
                    output[currentTimeSlot][room][header] = subject;
                }
            }
        }
    });
});

    res.status(200).send({                                   // Step 5
      message: workbook_response,
    });
  },
};