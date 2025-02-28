// ملف script.js

const calendar = document.getElementById('calendar');
const taskModal = document.getElementById('taskModal');
const closeModal = document.getElementById('closeModal');
const taskList = document.getElementById('taskList');
const newTaskInput = document.getElementById('newTask');
const addTaskButton = document.getElementById('addTask');

// عدد أيام رمضان
const daysInRamadan = 30;

// مصفوفة لتخزين المهام لكل يوم
let tasks = Array.from({ length: daysInRamadan }, () => []);

// إنشاء تقويم
function createCalendar() {
    for (let i = 1; i <= daysInRamadan; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = `اليوم ${i}`;
        dayDiv.onclick = () => openModal(i);
        calendar.appendChild(dayDiv);
    }
}

// فتح نافذة المهام
function openModal(day) {
    taskModal.setAttribute('data-day', day);
    taskList.innerHTML = ''; 
    tasks[day - 1].forEach((task) => {
        const li = document.createElement('li');
        li.textContent = task;
        taskList.appendChild(li);
    });
    taskModal.style.display = "block";
}

// إضافة مهمة
addTaskButton.onclick = () => {
    const day = parseInt(taskModal.getAttribute('data-day')) - 1; 
    const newTask = newTaskInput.value;
    if (newTask) {
        tasks[day].push(newTask);
        newTaskInput.value = '';
        openModal(day + 1);
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

// تعيين المسبحة
let count = 0;
const tasbeehButton = document.getElementById('tasbeehButton');
const countDisplay = document.getElementById('count');
const resetCountButton = document.getElementById('resetCount');

tasbeehButton.onclick = () => {
    count++;
    countDisplay.textContent = count;
};

resetCountButton.onclick = () => {
    count = 0;
    countDisplay.textContent = count;
};
