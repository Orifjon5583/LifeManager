document.addEventListener('DOMContentLoaded', () => {
    // Grafikni yaratish
    const ctx = document.getElementById('financeChart');
    
    if (ctx) {
        // Avvalgi grafik ob'ektini tozalash (xatolik bermasligi uchun)
        let chartStatus = Chart.getChart("financeChart");
        if (chartStatus != undefined) {
          chartStatus.destroy();
        }

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sha', 'Yak'],
                datasets: [{
                    label: 'Daromad (mln so\'m)',
                    data: [1.2, 0.8, 1.5, 2.1, 1.3, 2.5, 1.9],
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    fill: true,
                    tension: 0.4, // Chiziqlarni yumshatish
                    borderWidth: 3,
                    pointRadius: 4,
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false, // Konteyner hajmini to'g'ri olishi uchun
                plugins: {
                    legend: {
                        display: false // Tepasidagi ortiqcha yozuvni o'chirish
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: '#0f172a',
                        padding: 12
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
});