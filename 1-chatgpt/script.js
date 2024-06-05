document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('dayContainer');
    const outlines = document.querySelectorAll('.outline-2');
    let row, monthCell;

    outlines.forEach((outline, index) => {
        const timestamp = outline.querySelector('.timestamp-wrapper .timestamp').textContent;
        const status = outline.querySelector('.done') ? 'DONE' : (outline.querySelector('.todo') ? 'TODO' : '');
        const date = new Date(timestamp);
        const day = date.getDate();
        const dayName = date.toLocaleString('en-US', { weekday: 'short' });
        const monthName = date.toLocaleString('en-US', { month: 'short' });

        if (index % 7 === 0) {
            if (row) container.appendChild(row);
            row = document.createElement('div');
            row.classList.add('flex', 'items-center');

            monthCell = document.createElement('div');
            monthCell.classList.add('flex', 'items-center', 'justify-center', 'p-4', 'bg-blue-100', 'font-bold');
            monthCell.textContent = monthName;
            row.appendChild(monthCell);
        }

        const dayCell = document.createElement('div');
        dayCell.classList.add('flex', 'items-center', 'justify-center', 'p-4', 'bg-gray-200');
        if (status) {
            dayCell.classList.add(status === 'DONE' ? 'bg-green-200' : 'bg-yellow-200');
        }
        dayCell.textContent = `${dayName} ${day}`;
        row.appendChild(dayCell);
    });

    if (row) container.appendChild(row);
});
