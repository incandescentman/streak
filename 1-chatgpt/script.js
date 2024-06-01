document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully loaded and parsed");

    const orgData = `
* DONE <2024-05-30 Thu>
* DONE <2024-05-31 Fri>
* MISSED <2024-06-01 Sat>
* TODO <2024-06-02 Sun>
* TODO <2024-06-03 Mon>
* TODO <2024-06-04 Tue>
* TODO <2024-06-05 Wed>
* TODO <2024-06-06 Thu>
* TODO <2024-06-07 Fri>
* TODO <2024-06-08 Sat>
* TODO <2024-06-09 Sun>
* TODO <2024-06-10 Mon>
* TODO <2024-06-11 Tue>
* TODO <2024-06-12 Wed>
* TODO <2024-06-13 Thu>
* TODO <2024-06-14 Fri>
* TODO <2024-06-15 Sat>
* TODO <2024-06-16 Sun>
* TODO <2024-06-17 Mon>
* TODO <2024-06-18 Tue>
* TODO <2024-06-19 Wed>
* TODO <2024-06-20 Thu>
* TODO <2024-06-21 Fri>
* TODO <2024-06-22 Sat>
* TODO <2024-06-23 Sun>
* TODO <2024-06-24 Mon>
* TODO <2024-06-25 Tue>
* TODO <2024-06-26 Wed>
* TODO <2024-06-27 Thu>
* TODO <2024-06-28 Fri>
* TODO <2024-06-29 Sat>
* TODO <2024-06-30 Sun>
* TODO <2024-07-01 Mon>
* TODO <2024-07-02 Tue>
* TODO <2024-07-03 Wed>
* TODO <2024-07-04 Thu>
* TODO <2024-07-05 Fri>
* TODO <2024-07-06 Sat>
* TODO <2024-07-07 Sun>
* TODO <2024-07-08 Mon>
* TODO <2024-07-09 Tue>
* TODO <2024-07-10 Wed>
* TODO <2024-07-11 Thu>
* TODO <2024-07-12 Fri>
* TODO <2024-07-13 Sat>
* TODO <2024-07-14 Sun>
* TODO <2024-07-15 Mon>
* TODO <2024-07-16 Tue>
* TODO <2024-07-17 Wed>
* TODO <2024-07-18 Thu>
* TODO <2024-07-19 Fri>
* TODO <2024-07-20 Sat>
* TODO <2024-07-21 Sun>
* TODO <2024-07-22 Mon>
* TODO <2024-07-23 Tue>
* TODO <2024-07-24 Wed>
* TODO <2024-07-25 Thu>
* TODO <2024-07-26 Fri>
* TODO <2024-07-27 Sat>
* TODO <2024-07-28 Sun>
* TODO <2024-07-29 Mon>
* TODO <2024-07-30 Tue>
* TODO <2024-07-31 Wed>
* TODO <2024-08-01 Thu>
* TODO <2024-08-02 Fri>
* TODO <2024-08-03 Sat>
* TODO <2024-08-04 Sun>
* TODO <2024-08-05 Mon>
* TODO <2024-08-06 Tue>
* TODO <2024-08-07 Wed>
* TODO <2024-08-08 Thu>
* TODO <2024-08-09 Fri>
* TODO <2024-08-10 Sat>
* TODO <2024-08-11 Sun>
* TODO <2024-08-12 Mon>
* TODO <2024-08-13 Tue>
* TODO <2024-08-14 Wed>
* TODO <2024-08-15 Thu>
* TODO <2024-08-16 Fri>
* TODO <2024-08-17 Sat>
* TODO <2024-08-18 Sun>
* TODO <2024-08-19 Mon>
* TODO <2024-08-20 Tue>
* TODO <2024-08-21 Wed>
* TODO <2024-08-22 Thu>
* TODO <2024-08-23 Fri>
* TODO <2024-08-24 Sat>
* TODO <2024-08-25 Sun>
* TODO <2024-08-26 Mon>
* TODO <2024-08-27 Tue>
* TODO <2024-08-28 Wed>
* TODO <2024-08-29 Thu>
* TODO <2024-08-30 Fri>
* TODO <2024-08-31 Sat>
* TODO <2024-09-01 Sun>
* TODO <2024-09-02 Mon>
* TODO <2024-09-03 Tue>
* TODO <2024-09-04 Wed>
* TODO <2024-09-05 Thu>
* TODO <2024-09-06 Fri>
    `;

    console.log("orgData loaded");

    const lines = orgData.trim().split('\n');
    const container = document.getElementById('daysContainer');
    let dayCount = 1;
    let currentMonth = '';

    lines.forEach(line => {
        const [status, dateInfo] = line.split(' ');
        const dateMatch = dateInfo.match(/<(\d{4}-\d{2}-\d{2}) (\w{3})>/);
        if (dateMatch) {
            console.log(`Processing line: ${line}`);
            const [fullMatch, date, day] = dateMatch;
            const dateObj = new Date(date);
            const month = dateObj.toLocaleString('default', { month: 'long' });

            if (currentMonth !== month) {
                currentMonth = month;
                const monthDiv = document.createElement('div');
                monthDiv.classList.add('month');
                monthDiv.textContent = month;
                container.appendChild(monthDiv);
            }

            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');
            dayDiv.setAttribute('data-date', date);

            if (status === 'DONE') {
                dayDiv.classList.add('completed');
                dayDiv.innerHTML = `<span class="checkmark">✔</span><p>Day ${dayCount}: ${day} ${month} ${dateObj.getDate()}</p>`;
            } else if (status === 'MISSED') {
                dayDiv.classList.add('missed');
                dayDiv.innerHTML = `<span class="empty-square">☒</span><p>Day ${dayCount}: ${day} ${month} ${dateObj.getDate()}</p>`;
            } else {
                dayDiv.innerHTML = `<span class="empty-square">☐</span><p>Day ${dayCount}: ${day} ${month} ${dateObj.getDate()}</p>`;
            }

            container.appendChild(dayDiv);
            dayCount++;
        }
    });
});
