document.addEventListener("DOMContentLoaded", function () {
    let params = new URLSearchParams(window.location.search);
    let dayNumber = params.get("day") || 1;
    document.getElementById("day-title").innerText = `📅 يوم رمضان ${dayNumber}`;
    
    loadTasks(dayNumber);
});

function loadTasks(day) {
    let tasksContainer = document.getElementById("tasks");
    tasksContainer.innerHTML = ""; // تفريغ المحتوى

    let tasks = JSON.parse(localStorage.getItem(`tasks_day_${day}`)) || [
        { text: "📖 قراءة القرآن", completed: false },
        { text: "🕌 صلاة التراويح", completed: false },
        { text: "🍽️ تحضير وجبة الإفطار", completed: false }
    ];

    tasks.forEach((task, index) => {
        let taskItem = document.createElement("div");
        taskItem.classList.add("task-item");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.onchange = () => toggleTask(day, index);

        let taskText = document.createElement("span");
        taskText.innerText = task.text;
        if (task.completed) {
            taskText.style.textDecoration = "line-through";
        }

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskText);
        tasksContainer.appendChild(taskItem);
    });

    updateStatistics();
}

function addTask() {
    let newTaskText = prompt("📝 أدخل المهمة الجديدة:");
    if (newTaskText) {
        let day = new URLSearchParams(window.location.search).get("day") || 1;
        let tasks = JSON.parse(localStorage.getItem(`tasks_day_${day}`)) || [];
        tasks.push({ text: newTaskText, completed: false });
        localStorage.setItem(`tasks_day_${day}`, JSON.stringify(tasks));
        loadTasks(day);
    }
}

function toggleTask(day, index) {
    let tasks = JSON.parse(localStorage.getItem(`tasks_day_${day}`));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem(`tasks_day_${day}`, JSON.stringify(tasks));
    loadTasks(day);
}

function updateStatistics() {
    let completedTasks = document.querySelectorAll("input[type='checkbox']:checked").length;
    document.getElementById("completed-tasks").innerText = completedTasks;
}
