const xlsx = require('node-xlsx');

// Load the xlsx file directly
let workSheetsFromFile = xlsx.parse(`${__dirname}/file.xlsx`);

// Extract data from the parsed xlsx file
const rawData = workSheetsFromFile[0].data;

// Initialize the timetable object
const timetable = {};

// Initialize variables to store the current day and time slots
let currentDay;
let timeSlots;

// Iterate through the rawData to parse and structure the timetable
for (let i = 0; i < rawData.length; i++) {
    const row = rawData[i];
    // Check if it's a day row
    if (row.length === 1) {
        currentDay = row[0];
        timetable[currentDay] = {};
    }
    // Check if it's a time slot row
    else if (row.length > 1 && row[2]) {
        timeSlots = row.slice(2); // Extract time slots excluding 'Venue' and empty items
        // Remove 'Venue' from the timeSlots array
        timeSlots.shift();
    }
    // Check if it's a room row
    else if (row.length > 1 && row[0].startsWith('Room-')) {
        const roomName = row[0];
        for (let j = 2; j < row.length; j++) {
            const time = timeSlots[j - 2]; // Get the corresponding time slot
            if (!timetable[currentDay][time]) {
                timetable[currentDay][time] = {};
            }
            timetable[currentDay][time][roomName] = row[j]; // Assign subject to the room at the corresponding time
        }
    }
}

console.log(timetable);
