// Get the container element where the calendar will be rendered
const container = document.getElementById('dayContainer');

// Display version number
const versionElement = document.getElementById('version');
const version = 'v0.90';

versionElement.textContent = version;

// Initialize variables to keep track of the current day count and month
let dayCount = 1;
let currentMonth = '';
let monthCounter = 0;

// Function to parse a date string in the format 'YYYY-MM-DD'
function parseDate(dateString) {
    // Split the date string into year, month, and day components
    const [year, month, day] = dateString.split('-');
    // Create a new Date object using the parsed components
    return new Date(year, month - 1, day);
}

// Function to process the org-mode data and generate the calendar
function processOrgModeData(orgModeData) {
    // Split the org-mode data into an array of lines
    const lines = orgModeData.trim().split('\n');
    // Create a container element for a row of days
    let monthRow = document.createElement('div');
    monthRow.classList.add('month-row');
    // Initialize a variable to keep track of the number of days in the current week
    let daysInWeek = 0;

    // Iterate over each line of the org-mode data
    lines.forEach((line, index) => {
        // Check if the line starts with an asterisk (indicating a task)
        if (line.startsWith('*')) {
            // Extract the status and date string from the line
            const [status, dateString] = line.slice(2).trim().split(' ');
            // Parse the date string into a Date object
            const date = parseDate(dateString.slice(1));
            // Get the month name, day of the week, and date of the month from the date
            const monthName = date.toLocaleString('en-US', { month: 'short' });
            const longMonthName = date.toLocaleString('en-US', { month: 'long' });
            const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' });
            const dateOfMonth = date.getDate();

            // Create a day element and add appropriate classes based on the task status
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');
            if (status === 'DONE') {
                dayElement.classList.add('completed');
                dayElement.innerHTML = `
                    <span class="checkmark">✔</span>
                    <p class="day-number">Day ${dayCount}</p>
                    <p class="date">${dayOfWeek} ${monthName} ${dateOfMonth}</p>
                `;
            } else if (status === 'MISSED') {
                dayElement.classList.add('missed');
                dayElement.innerHTML = `
                    <span class="cross">✘</span>
                    <p class="day-number">Day ${dayCount}</p>
                    <p class="date">${dayOfWeek} ${monthName} ${dateOfMonth}</p>
                `;
            } else {
                dayElement.classList.add('todo');
                dayElement.innerHTML = `
                    <span class="empty-square">☐</span>
                    <p class="day-number">Day ${dayCount}</p>
                    <p class="date">${dayOfWeek} ${monthName} ${dateOfMonth}</p>
                `;
            }

            // Append the day element to the month row
            monthRow.appendChild(dayElement);
            // Increment the day count and the number of days in the current week
            dayCount++;
            daysInWeek++;

            // Check if the current week is complete or if it's the last line of data
            if (daysInWeek === 7 || index === lines.length - 1) {
                // Create and append the month element at the end of the row
                const monthElement = document.createElement('div');
                monthElement.classList.add('month');
                monthElement.textContent = longMonthName;

                if (monthCounter > 0) {
                    monthElement.classList.add('invisible');
                }

                monthRow.appendChild(monthElement);

                // Append the month row to the container and reset the month row and days in week
                container.appendChild(monthRow);
                monthRow = document.createElement('div');
                monthRow.classList.add('month-row');
                daysInWeek = 0;
                monthCounter++;
            }

            // Reset monthCounter if a new month starts
            if (monthName !== currentMonth) {
                currentMonth = monthName;
                monthCounter = 0;
            }
        }
    });

    // Debugging: Log the entire generated HTML to the console
    console.log(container.outerHTML);
}

// Fetch the progress.org file
fetch('progress.org')
    .then(response => response.text())
    .then(data => {
        // Process the org-mode data and generate the calendar
        processOrgModeData(data);
    })
    .catch(error => {
        // Handle any errors that occur during the fetch
        console.error('Error fetching progress.org:', error);
    });
