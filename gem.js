const xlsx = require('xlsx');

const workbook = xlsx.readFile(`${__dirname}/file.xlsx`);
const extractedTimetable = {};

const workbook_sheet = workbook.SheetNames; // Step 3
console.log(workbook_sheet)
const workbook_response = xlsx.utils.sheet_to_json(workbook.Sheets[workbook_sheet[0]]);

for (const element of workbook_response) {
  // Handle the first key being "(Tentative Time Table For Spring-2024)"
  const key = Object.keys(element)[0];
  if (key !== "(Tentative Time Table For Spring-2024)") {
    const day = key;
    const timeSlot = extractTimeSlot(element[key]["__EMPTY_1"]); // Assume "__EMPTY_1" holds the time slot

    if (!extractedTimetable[day]) {
      extractedTimetable[day] = {};
    }
    if (!extractedTimetable[day][timeSlot]) {
      extractedTimetable[day][timeSlot] = {};
    }

    // Extract and handle room and subject data (adjust based on actual field names)
    for (const roomKey in element) {
      if (roomKey.startsWith("Room-")) {
        const roomName = roomKey.slice(5);
        const subject = element[roomKey]["__EMPTY_1"]; // Assuming "__EMPTY_1" holds the subject

        // Handle empty values or adjust keys/values as needed
        if (subject) {
          extractedTimetable[day][timeSlot][roomName] = subject;
        }
      }
    }
  }
}

console.log(extractedTimetable);