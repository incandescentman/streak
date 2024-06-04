document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('dayContainer');
    if (!container) {
        console.error("Container element not found!");
        return;
    }

    fetch('progress.org')
        .then(response => response.text())
        .then(data => processOrgModeData(data, container))
        .catch(error => console.error('Error fetching progress.org:', error));
});



function processOrgModeData(orgModeData, container) {
    const lines = orgModeData.trim().split('\n').filter(line => line.startsWith('*'));
    let weekRow = document.createElement('div');
    weekRow.classList.add('week-row');

    let dayCount = 0;
    let currentWeekDay = 0;

    for (const line of lines) {
        const dateMatch = line.match(/<(\d{4}-\d{2}-\d{2})/);
        if (!dateMatch) continue;

        const dateString = dateMatch[1];
        const date = new Date(dateString);
        const targetWeekDay = date.getDay();

        // Reset week row if it's the start of a new week
        if (currentWeekDay === 0 && targetWeekDay !== 0) {
            container.appendChild(weekRow);
            weekRow = document.createElement('div');
            weekRow.classList.add('week-row');
        }

        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.innerHTML = `<p class="full-date">${date.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</p>`;

        // Only add "DONE", "MISSED", or "TODO" if present in the line
        if (line.includes("DONE") || line.includes("MISSED") || line.includes("TODO")) {
            const status = line.split(' ')[1];
            dayCount++;
            dayElement.innerHTML += `<p class="day-number">Day ${dayCount}</p>`;

            if (status === 'DONE') {
                dayElement.classList.add('completed');
                dayElement.innerHTML = `<span class="checkmark">✔</span>` + dayElement.innerHTML;
            } else if (status === 'MISSED') {
                dayElement.classList.add('missed');
                dayElement.innerHTML = `<span class="cross">✘</span>` + dayElement.innerHTML;
            } else if (status === 'TODO') {
                dayElement.classList.add('todo');
                dayElement.innerHTML = `<span class="empty-square">☐</span>` + dayElement.innerHTML;
            }
        }

        weekRow.appendChild(dayElement);
        currentWeekDay = (targetWeekDay + 1) % 7; // Update the current day based on the target day

        // If we reach Sunday, start a new week row on the next iteration
        if (currentWeekDay === 0) {
            container.appendChild(weekRow);
            weekRow = document.createElement('div');
            weekRow.classList.add('week-row');
        }
    }

    // Append any remaining days in the last week
    if (weekRow.children.length > 0) {
        container.appendChild(weekRow);
    }
}
