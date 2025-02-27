document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const dayNumber = urlParams.get("day");

    if (dayNumber) {
        document.getElementById("dayTitle").innerText = `📅 يوم رمضان ${dayNumber}`;
    }

    let tasks = JSON.parse(localStorage.getItem(`tasks_${dayNumber}`)) || [];

    function renderTasks() {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";

        tasks.forEach((task, index) => {
            const taskItem = document.createElement("li");
            taskItem.className = task.completed ? "completed" : "";
            taskItem.innerHTML = `
                <span>${task.text} 🕒 ${task.time || "غير محدد"}</span>
                <button onclick="completeTask(${index})">🏆</button>
                <button onclick="deleteTask(${index})">🗑</button>
            `;
            taskList.appendChild(taskItem);
        });

        saveTasks();
    }

    window.addTask = function () {
        const taskSelect = document.getElementById("taskSelect");
        const customTaskInput = document.getElementById("customTaskInput");
        const taskTime = document.getElementById("taskTime").value;
        let taskText = "";

        if (taskSelect.value === "✍️ مهمة أخرى") {
            if (customTaskInput.value.trim() !== "") {
                taskText = customTaskInput.value;
                customTaskInput.value = "";
            } else {
                alert("يرجى إدخال اسم المهمة.");
                return;
            }
        } else {
            taskText = taskSelect.value;
        }

        if (taskText !== "") {
            tasks.push({ text: taskText, time: taskTime, completed: false });
            renderTasks();
        }
    };

    window.completeTask = function (index) {
        tasks[index].completed = true;
        renderTasks();
    };

    window.deleteTask = function (index) {
        tasks.splice(index, 1);
        renderTasks();
    };

    window.resetAllTasks = function () {
        tasks = [];
        renderTasks();
    };

    function saveTasks() {
        localStorage.setItem(`tasks_${dayNumber}`, JSON.stringify(tasks));
    }

    window.goBack = function () {
        window.location.href = "index.html";
    };

    renderTasks();
});
