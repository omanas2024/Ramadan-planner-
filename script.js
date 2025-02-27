document.addEventListener("DOMContentLoaded", function () {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let darkMode = localStorage.getItem("darkMode") === "enabled";

    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }

    function displayCurrentDate() {
        let today = new Date();
        let options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
        document.getElementById("current-date").innerText = "📅 اليوم: " + today.toLocaleDateString('ar-EG', options);
    }

    function renderTasks() {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";

        tasks.forEach((task, index) => {
            const taskItem = document.createElement("li");
            taskItem.className = task.completed ? "completed" : "";
            taskItem.innerHTML = `
                <span>${task.text} 📅 ${task.date || "غير محدد"} 🕒 ${task.time || "غير محدد"}</span>
                <div class="task-buttons">
                    <button onclick="completeTask(${index})">🏆</button>
                    <button onclick="deleteTask(${index})">🗑</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });

        saveTasks();
        checkTaskNotifications();
    }

    window.addTask = function () {
        const taskSelect = document.getElementById("taskSelect");
        const customTaskInput = document.getElementById("customTaskInput");
        const taskDate = document.getElementById("taskDate").value;
        const taskTime = document.getElementById("taskTime").value;
        let taskText = "";

        if (taskSelect.value === "✍️ مهمة أخرى") {
            taskText = customTaskInput.value.trim();
            if (taskText === "") {
                alert("يرجى إدخال اسم المهمة.");
                return;
            }
        } else {
            taskText = taskSelect.value;
        }

        if (taskText !== "" && !tasks.some(task => task.text === taskText && task.date === taskDate)) {
            tasks.push({ text: taskText, date: taskDate, time: taskTime, completed: false });
            renderTasks();
        }
    };

    function checkTaskNotifications() {
        setInterval(() => {
            let now = new Date();
            let currentDate = now.toISOString().split("T")[0];
            let currentTime = now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");

            tasks.forEach(task => {
                if (task.date === currentDate && task.time === currentTime && !task.notified) {
                    sendNotification(task.text);
                    task.notified = true;
                    saveTasks();
                }
            });
        }, 60000);
    }

    function sendNotification(taskName) {
        if (Notification.permission === "granted") {
            new Notification("⏰ وقت المهمة!", {
                body: `حان الآن وقت: ${taskName}`,
                icon: "https://cdn-icons-png.flaticon.com/512/3906/3906567.png"
            });
        }
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    displayCurrentDate();
    renderTasks();
});
