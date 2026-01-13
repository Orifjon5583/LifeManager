document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('financeChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sha', 'Yak'],
                datasets: [{
                    data: [1.2, 0.8, 1.5, 2.1, 1.3, 2.5, 1.9],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 6,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#3b82f6',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }
});