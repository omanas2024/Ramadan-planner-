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
    for (let i = daysInRamadan; i >= 1; i--) { // عد من 30 إلى 1
        const dayDiv = document.createElement('div');
        dayDiv.textContent = i + " (" + adjustToHijri(dayjs(`2023-03-${i}`)) + ")"; // استدعاء الدالة لعرض التاريخ الهجري
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

// الدالة لتحويل التاريخ الميلادي إلى هجري
function adjustToHijri(date) {
    const hijriDate = dayjs(date).locale('ar-SA').format('iD iMMMM iYYYY');
    return hijriDate;
}

// تنفيذ
createCalendar();

// تعيين المسبحة
let count = 0;
const tasbeehButton = document.getElementById('tasbeehButton');
const countDisplay = document.getElementById('count');

tasbeehButton.onclick = () => {
    count++;
    countDisplay.textContent = count;
};
