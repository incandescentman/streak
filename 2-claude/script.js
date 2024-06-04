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

    for (const line of lines) {
        const dateMatch = line.match(/<(\d{4}-\d{2}-\d{2})/);
        if (!dateMatch) continue;

        const dateString = dateMatch[1];
        const date = new Date(dateString);
        const targetWeekDay = date.getDay(); // Day of the week for the current line

        // If it's a new week and the week row is not empty, append the week row to the container
        if (targetWeekDay === 1 && weekRow.children.length > 0) {
            container.appendChild(weekRow);
            weekRow = document.createElement('div');
            weekRow.classList.add('week-row');
        }

        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.innerHTML = `<p class="full-date">${date.toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</p>`;

        const status = line.split(' ')[1];
        if (status === 'DONE' || status === 'MISSED' || status === 'TODO') {
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
    }

    if (weekRow.children.length > 0) {
        container.appendChild(weekRow);
    }
}
