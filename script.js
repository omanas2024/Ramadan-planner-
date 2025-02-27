document.addEventListener("DOMContentLoaded", function () {
    let darkMode = localStorage.getItem("darkMode") === "enabled";
    let tasks = JSON.parse(localStorage.getItem("tasks")) || {};
    let selectedDay = null;

    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }

    function generateRamadanCalendar() {
        const calendarDiv = document.getElementById("ramadanCalendar");
        calendarDiv.innerHTML = "";

        const startDate = new Date("2025-03-01"); // أول يوم رمضان 1446 هـ (ميلادي)
        for (let i = 0; i < 30; i++) {
            let day = new Date(startDate);
            day.setDate(day.getDate() + i);

            let dayElement = document.createElement("button");
            dayElement.className = "calendar-day";
            dayElement.innerText = `يوم ${i + 1} - ${day.toLocaleDateString('ar-EG')}`;
            dayElement.onclick = function () { selectDay(i + 1, day.toLocaleDateString('ar-EG')); };

            calendarDiv.appendChild(dayElement);
        }
    }

    function selectDay(ramadanDay, date) {
        selectedDay = ramadanDay;
        document.getElementById("selectedDay").innerText = `📅 يوم ${ramadanDay} - ${date}`;
        document.getElementById("taskSection").style.display = "block";
        renderTasks();
    }

    function renderTasks() {
        if (!selectedDay) return;

        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";

        let dayTasks = tasks[selectedDay] || [];
        dayTasks.forEach((task, index) => {
            const taskItem = document.createElement("li");
            taskItem.innerHTML = `
                <span>${task.text} 🕒 ${task.time || "غير محدد"}</span>
                <button onclick="completeTask(${index})">🏆</button>
                <button onclick="deleteTask(${index})">🗑</button>
            `;
            taskList.appendChild(taskItem);
        });

        saveTasks();
        checkTaskNotifications();
    }

    window.addTask = function () {
        if (!selectedDay) return;

        const taskInput = document.getElementById("taskInput").value;
        const taskTime = document.getElementById("taskTime").value;

        if (taskInput.trim() !== "") {
            if (!tasks[selectedDay]) tasks[selectedDay] = [];
            tasks[selectedDay].push({ text: taskInput, time: taskTime, completed: false });
            document.getElementById("taskInput").value = "";
            renderTasks();
        }
    };

    window.completeTask = function (index) {
        tasks[selectedDay][index].completed = true;
        renderTasks();
    };

    window.deleteTask = function (index) {
        tasks[selectedDay].splice(index, 1);
        renderTasks();
    };

    window.resetAllTasks = function () {
        tasks = {};
        renderTasks();
    };

    window.toggleDarkMode = function () {
        darkMode = !darkMode;
        document.body.classList.toggle("dark-mode", darkMode);
        localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
    };

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function checkTaskNotifications() {
        setInterval(() => {
            const now = new Date();
            const currentTime = now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");

            Object.keys(tasks).forEach(day => {
                tasks[day].forEach(task => {
                    if (task.time === currentTime && !task.notified) {
                        sendNotification(task.text);
                        task.notified = true;
                        saveTasks();
                    }
                });
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

    generateRamadanCalendar();
});
