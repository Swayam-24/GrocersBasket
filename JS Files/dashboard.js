document.addEventListener('DOMContentLoaded', function () {

    // === 1. BAR CHART: GRAPHICAL REPORTS ===
    const ctxBar = document.getElementById('barChart');

    const barData = {
        labels: ['Total Orders', 'Cancelled', 'Returned', 'Defective'],
        datasets: [
            {
                label: 'Today',
                data: [400, 50, 50, 10],
                backgroundColor: '#FFC300',
                barPercentage: 0.8, categoryPercentage: 0.7, borderRadius: 4,
            },
            {
                label: 'This Month',
                data: [450, 20, 20, 10],
                backgroundColor: '#38B35A',
                barPercentage: 0.8, categoryPercentage: 0.7, borderRadius: 4,
            },
            {
                label: 'All Time',
                data: [420, 110, 20, 20],
                backgroundColor: '#FF5733',
                barPercentage: 0.8, categoryPercentage: 0.7, borderRadius: 4,
            }
        ]
    };

    new Chart(ctxBar, {
        type: 'bar',
        data: barData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: { top: 25, bottom: 10 } },
            plugins: {
                legend: { display: false },
                tooltip: { enabled: true },
                datalabels: {
                    display: true, color: '#000', anchor: 'end', align: 'top', offset: 4,
                    formatter: (value) => value > 0 ? value : '',
                    font: { weight: 'bold', size: 10 }
                }
            },
            scales: {
                y: {
                    beginAtZero: true, max: 500,
                    ticks: { stepSize: 100, color: '#555', font: { size: 10 } },
                    title: { display: true, text: 'Count', color: '#555', font: { size: 12, weight: 'bold' } },
                    grid: { color: 'transparent', drawBorder: false }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#555', font: { size: 10 } },
                    title: { display: true, text: 'Orders', color: '#555', font: { size: 12, weight: 'bold' } }
                }
            }
        },
        plugins: [ChartDataLabels]
    });


    // --- 2. CATEGORY SALES PIE CHART: ROW 1, COLUMN 2 ---

    const initialCategorySalesData = {
        labels: ['Vegetable', 'Fruits', 'Dairy', 'Bakery', 'Beverages'],
        datasets: [{
            data: [19.65, 15.49, 27.77, 12.55, 25.00],
            backgroundColor: [
                '#FF8C42',
                '#6BA340',
                '#A9FFFF',
                '#FFEB3B',
                '#805AD5'
            ],
            hoverOffset: 4,
            borderWidth: 0,
            spacing: 0
        }]
    };

    const ctxCategoryPie = document.getElementById('categorySalesPie');
    const categorySalesChart = new Chart(ctxCategoryPie, {
        type: 'pie',
        data: initialCategorySalesData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: { top: 0, bottom: 0 } },
            plugins: {
                legend: { display: false },
                tooltip: { enabled: true },
                datalabels: {
                    display: true,
                    color: '#000',
                    textAlign: 'center',
                    font: { weight: 'bold', size: 10 },
                    formatter: (value, context) => {
                        const label = context.chart.data.labels[context.dataIndex];
                        return label + '\n' + value.toFixed(2) + '%';
                    },
                    anchor: 'center',
                    align: 'center',
                    offset: 0
                }
            },
            elements: { arc: { borderWidth: 0 } }
        },
        plugins: [ChartDataLabels]
    });

    // Category Sales Filter Logic
    const categoryThisWeekData = [15.00, 20.00, 30.00, 10.00, 25.00];
    const categoryTodayData = [15.00, 15.00, 35.00, 10.00, 35.00];

    const categoryPieButtons = document.querySelectorAll('.chart-container-large-pie .pie-btn');
    const categoryDatasets = [initialCategorySalesData.datasets[0].data, categoryThisWeekData, categoryTodayData];

    categoryPieButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            categoryPieButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            categorySalesChart.data.datasets[0].data = categoryDatasets[index];
            categorySalesChart.update();
        });
    });
    document.querySelector('.chart-container-large-pie .pie-btn:first-child').classList.add('active');


    // --- 3. HIGHLY REORDERED PRODUCTS PIE CHART: ROW 2, COLUMN 1 ---

    const initialReorderData = {
        labels: ['Onions', 'Dettol Soap Pack', 'MANGO RICE', 'VIM BAR', 'Amul Milk'],
        datasets: [{
            data: [25, 12.5, 25, 15.54, 21.96],
            backgroundColor: [
                '#E57373',
                '#FFEB3B',
                '#B2EBF2',
                '#FF8C42',
                '#8BC34A'
            ],
            hoverOffset: 4,
            borderWidth: 0,
            spacing: 0
        }]
    };

    let currentActiveFilter = 'All Time';

    const ctxReorderPie = document.getElementById('reorderedProductsPie');
    const reorderedProductsChart = new Chart(ctxReorderPie, {
        type: 'pie',
        data: initialReorderData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            rotation: -45, // Center Onions at the top
            layout: { padding: { top: 0, bottom: 0 } },
            plugins: {
                legend: { display: false },
                tooltip: { enabled: true },
                datalabels: {
                    display: true,
                    color: '#000',
                    textAlign: 'center',
                    rotation: (context) => {
                        const label = context.chart.data.labels[context.dataIndex];
                        if (currentActiveFilter !== 'Today') {
                            if (label === 'Onions' || label === 'Amul Milk') {
                                return 0;
                            }
                            if (label === 'Dettol Soap Pack') return 320; // Tilt left (counter-clockwise)
                            if (label === 'MANGO RICE') return -45;        // Tilt right (clockwise)
                            if (label === 'VIM BAR') return 20;          // Tilt left (counter-clockwise)
                            return 0;
                        } else {
                            if (label === 'Onions' || label === 'Amul Milk') {
                                return 0;
                            }
                            if (label === 'Dettol Pack') return -35;     // Tilt left (counter-clockwise)
                            if (label === 'MANGO RICE') return 35;       // Tilt right (clockwise)
                            if (label === 'Vim Bar') return -40;         // Tilt left (counter-clockwise)
                            return 0;
                        }
                    },
                    font: {
                        family: 'Outfit, sans-serif',
                        weight: (context) => {
                            return currentActiveFilter === 'Today' ? 800 : 800;
                        },
                        size: 13,
                        lineHeight: 1.1
                    },
                    clamp: true,
                    formatter: (value, context) => {
                        const label = context.chart.data.labels[context.dataIndex];
                        const formattedValue = value % 1 === 0
                            ? value
                            : (value * 10 % 1 === 0 ? value.toFixed(1) : value.toFixed(2));

                        if (currentActiveFilter === 'Today' && label === 'Dettol Pack') {
                            return 'Dettol\nPack\n' + formattedValue + '%';
                        }
                        if (currentActiveFilter !== 'Today' && label === 'Dettol Soap Pack') {
                            return 'Dettol Soap\nPack\n' + formattedValue + '%';
                        }
                        return label + '\n' + formattedValue + '%';
                    },
                    anchor: 'center',
                    align: 'center',
                    offset: 0
                }
            },
            elements: { arc: { borderWidth: 0 } }
        },
        plugins: [ChartDataLabels]
    });

    // Reordered Products Filter Logic
    const reorderDataAllTime = {
        labels: ['Onions', 'Dettol Soap Pack', 'MANGO RICE', 'VIM BAR', 'Amul Milk'],
        data: [25, 12.5, 25, 15.54, 21.96]
    };
    const reorderDataThisWeek = {
        labels: ['Amul Milk', 'Dettol Soap Pack', 'MANGO RICE', 'VIM BAR', 'Onions'],
        data: [25, 12.5, 25, 15.54, 21.96]
    };
    const reorderDataToday = {
        labels: ['Amul Milk', 'Vim Bar', 'MANGO RICE', 'Dettol Pack', 'Onions'],
        data: [25, 12.5, 25, 15.54, 21.96]
    };

    const reorderPieButtons = document.querySelectorAll('.chart-container-large-pie-reorder .pie-btn');
    const reorderConfigs = [reorderDataAllTime, reorderDataThisWeek, reorderDataToday];

    reorderPieButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            reorderPieButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            if (index === 0) currentActiveFilter = 'All Time';
            else if (index === 1) currentActiveFilter = 'This Week';
            else if (index === 2) currentActiveFilter = 'Today';
            
            reorderedProductsChart.data.labels = reorderConfigs[index].labels;
            reorderedProductsChart.data.datasets[0].data = reorderConfigs[index].data;
            reorderedProductsChart.update();
        });
    });
    document.querySelector('.chart-container-large-pie-reorder .pie-btn:first-child').classList.add('active');


    // --- 4. LINE CHART: ORDER VOLUME TREND: ROW 2, COLUMN 2 ---

    const ctxLine = document.getElementById('orderVolumeTrend');

    const lineData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Total Orders',
                data: [50, 65, 75, 60, 80, 90, 95],
                borderColor: '#1e88e5',
                backgroundColor: 'rgba(30, 136, 229, 0.1)',
                fill: false,
                tension: 0.4,
                pointRadius: 4,
            },
            {
                label: 'Delivered Orders',
                data: [40, 55, 60, 50, 70, 75, 85],
                borderColor: '#43a047',
                backgroundColor: 'rgba(67, 160, 71, 0.1)',
                fill: false,
                tension: 0.4,
                pointRadius: 4,
            },
            {
                label: 'Cancelled Orders',
                data: [10, 10, 15, 10, 10, 15, 10],
                borderColor: '#e53935',
                backgroundColor: 'rgba(229, 57, 53, 0.1)',
                fill: false,
                tension: 0.4,
                pointRadius: 4,
            },
        ]
    };

    new Chart(ctxLine, {
        type: 'line',
        data: lineData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { boxWidth: 10, padding: 15, font: { size: 10 } }
                },
                tooltip: { mode: 'index', intersect: false },
                datalabels: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true, max: 100,
                    title: { display: true, text: 'Orders' },
                    ticks: { stepSize: 20 },
                    grid: { drawBorder: false }
                },
                x: {
                    grid: { display: false }
                }
            }
        },
        plugins: [ChartDataLabels]
    });

});