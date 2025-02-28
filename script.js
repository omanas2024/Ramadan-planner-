const calendar = document.getElementById('calendar');
const taskModal = document.getElementById('taskModal');
const closeModal = document.getElementById('closeModal');
const taskList = document.getElementById('taskList');
const newTaskInput = document.getElementById('newTask');
const addTaskButton = document.getElementById('addTask');

const daysInRamadan = 30; // تغيير العدد وفقاً للشهر

// إنشاء تقويم
function createCalendar() {
    for (let i = 1; i <= daysInRamadan; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = i;
        dayDiv.onclick = () => openModal(i);
        calendar.appendChild(dayDiv);
    }
}

// فتح نافذة المهام
function openModal(day) {
    taskList.innerHTML = ''; // أفرغ قائمة المهام
    tasks[day].forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task;
        taskList.appendChild(li);
    });
    taskModal.style.display = "block";
}

// إضافة مهمة
let tasks = Array.from({ length: daysInRamadan }, () => []);
addTaskButton.onclick = () => {
    const day = parseInt(taskModal.getAttribute('data-day')); // استخدام اليوم الموجود في المودال
    const newTask = newTaskInput.value;
    if (newTask) {
        tasks[day].push(newTask);
        newTaskInput.value = '';
        openModal(day); // تحديث قائمة المهام
    }
};

// إغلاق المودال
closeModal.onclick = () => {
    taskModal.style.display = "none";
};

window.onclick = (event) => {
    if (event.target === taskModal) {
        taskModal.style.display = "none";
    }
};

// تنفيذ
createCalendar();
