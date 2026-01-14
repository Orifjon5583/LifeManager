// --- 1. DARK MODE & LANGUAGE SETUP ---
document.addEventListener('DOMContentLoaded', () => {
    let myChart; // Chart instance variable


    // --- Dark Mode ---
    const darkModeToggle = document.getElementById('darkModeToggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Initialize state
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.checked = true;
    }

    // --- 3. CHART.JS SETUP (Reports) ---
    initChart();

    // Toggle event
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'true');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'false');
            }
            initChart(); // Re-render chart with new colors
        });
    }

    // --- Language ---
    const langSelect = document.getElementById('languageSelect');
    const currentLang = localStorage.getItem('language') || 'uz';

    // ... (rest of code)




    function initChart() {
        const ctx = document.getElementById('financeChart');
        if (!ctx) return;

        // Detect Dark Mode from Body Class
        const isDark = document.body.classList.contains('dark-mode');

        // Theme Colors
        const textColor = isDark ? '#e2e8f0' : '#1e293b'; // Slate-200 vs Slate-800
        const gridColor = isDark ? '#334155' : '#e2e8f0'; // Slate-700 vs Slate-200

        // Destroy existing to re-render
        if (myChart) myChart.destroy();

        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun'],
                datasets: [{
                    label: 'Kirim (In)',
                    data: [1200000, 1900000, 3000000, 5000000, 4200000, 5450000],
                    borderColor: '#2563eb', // Primary Blue
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Chiqim (Out)',
                    data: [800000, 1200000, 2000000, 3500000, 3000000, 4000000],
                    borderColor: '#f97316', // Orange
                    backgroundColor: 'rgba(249, 115, 22, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: textColor }
                    }
                },
                scales: {
                    y: {
                        grid: { color: gridColor },
                        ticks: { color: textColor }
                    },
                    x: {
                        grid: { color: gridColor },
                        ticks: { color: textColor }
                    }
                }
            }
        });
    }

    // Initialize state
    updateLanguage(currentLang);
    if (langSelect) {
        langSelect.value = currentLang;
        langSelect.addEventListener('change', (e) => {
            const newLang = e.target.value;
            localStorage.setItem('language', newLang);
            updateLanguage(newLang);
        });
    }

    // --- Email Simulation (Auth Flow) ---
    const forgotForm = document.getElementById('forgotForm');
    if (forgotForm) {
        forgotForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = document.getElementById('email');
            const btn = this.querySelector('button');
            const originalText = btn.innerText;

            // Loading Sim
            btn.disabled = true;
            btn.innerText = 'YUBORILMOQDA...'; // "Sending..."

            setTimeout(() => {
                const code = Math.floor(100000 + Math.random() * 900000); // 6 digit code
                console.log(`%c[SIMULATION] Email sent to ${emailInput.value}. Code: ${code}`, 'color: #2563eb; font-size: 16px; font-weight: bold;');

                alert(`SIMULYASIYA: Kod emailingizga yuborildi!\n(Konsolda ko'rishingiz mumkin: F12 -> Console)\nKod: ${code}`);

                // Save for verification step
                localStorage.setItem('resetEmail', emailInput.value);
                localStorage.setItem('verificationCode', code);

                window.location.href = 'verify-code.html';
            }, 1500);
        });
    }

    const verifyForm = document.getElementById('verifyForm');
    if (verifyForm) {
        // Code auto-focus logic is already in HTML, but we can verify here
        verifyForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Collect code
            let enteredCode = '';
            document.querySelectorAll('.code-input').forEach(input => enteredCode += input.value);

            const realCode = localStorage.getItem('verificationCode');

            if (enteredCode === realCode || enteredCode === '111111') { // 111111 master code
                window.location.href = 'new-password.html';
            } else {
                alert('Xato kod! Qaytadan urinib ko\'ring. (Hint: Check Console)');
            }
        });
    }

    // --- 4. INTERACTIVE FEATURES (Tasks & Finance) ---

    // A. DASHBOARD BALANCE
    const balanceDisplay = document.getElementById('totalBalance');
    let currentBalance = parseInt(localStorage.getItem('balance')) || 5450000;

    if (balanceDisplay) {
        balanceDisplay.innerText = currentBalance.toLocaleString();
    }

    // B. FINANCE MANAGER
    const financeAddBtn = document.getElementById('financeAddBtn');
    if (financeAddBtn) {
        financeAddBtn.addEventListener('click', () => {
            const amount = parseInt(document.getElementById('financeAmount').value);
            const type = document.getElementById('financeType').value;
            const desc = document.getElementById('financeDesc').value;

            if (!amount || isNaN(amount)) {
                alert('Iltimos, summani to\'g\'ri kiriting!');
                return;
            }

            if (type === 'income') {
                currentBalance += amount;
            } else {
                currentBalance -= amount;
            }

            localStorage.setItem('balance', currentBalance);
            alert(`Muvaffaqiyatli saqlandi! \n yangi balans: ${currentBalance.toLocaleString()} UZS`);

            // Clear inputs
            document.getElementById('financeAmount').value = '';
            document.getElementById('financeDesc').value = '';
        });
    }

    // C. TASK MANAGER
    const taskAddBtn = document.getElementById('taskAddBtn');
    const taskList = document.getElementById('taskList');

    // Load Tasks
    if (taskList) {
        loadTasks();
    }

    if (taskAddBtn) {
        taskAddBtn.addEventListener('click', () => {
            const name = document.getElementById('taskName').value;
            const date = document.getElementById('taskDate').value;
            const priority = document.getElementById('taskPriority').value;

            if (!name) {
                alert('Vazifa nomini kiriting!');
                return;
            }

            const task = {
                id: Date.now(),
                name,
                date,
                priority,
                done: false
            };

            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));

            renderTask(task); // Add to UI immediately

            // Reset form
            document.getElementById('taskName').value = '';
            document.getElementById('taskDate').value = '';
        });
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        if (tasks.length > 0) taskList.innerHTML = '<h4 class="font-bold text-slate-600 mb-2">Mening Vazifalarim</h4>';
        tasks.forEach(task => renderTask(task));
    }

    function renderTask(task) {
        const div = document.createElement('div');
        div.className = 'bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition group mb-3';
        div.innerHTML = `
            <div class="flex items-center gap-4">
                <button onclick="toggleTask(${task.id})" class="w-6 h-6 rounded-full border-2 ${task.done ? 'bg-blue-500 border-blue-500' : 'border-slate-300'} hover:border-blue-500 transition"></button>
                <div class="${task.done ? 'opacity-50 line-through' : ''}">
                    <h4 class="font-bold group-hover:text-blue-600 transition">${task.name}</h4>
                    <p class="text-xs text-slate-500 flex items-center gap-2">
                        <i class="far fa-clock"></i> ${task.date ? new Date(task.date).toLocaleDateString() : 'Vaqt yo\'q'}
                        <span class="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">${task.priority}</span>
                    </p>
                </div>
            </div>
            <button onclick="deleteTask(${task.id})" class="text-slate-300 hover:text-red-500 transition"><i class="fas fa-trash"></i></button>
        `;
        taskList.appendChild(div);
    }

    // Helper functions for global access (attached to window)
    window.deleteTask = function (id) {
        if (!confirm('O\'chirilsinmi?')) return;
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(t => t.id !== id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        location.reload(); // Simple reload to refresh list
    };

    window.toggleTask = function (id) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.done = !task.done;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            location.reload();
        }
    };

});


// Function to update text based on attributes
function updateLanguage(lang) {
    if (typeof translations === 'undefined') return; // Safety check

    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            // Handle input placeholders vs text content
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translations[lang][key];
            } else {
                el.innerText = translations[lang][key];
            }
        }
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;
}