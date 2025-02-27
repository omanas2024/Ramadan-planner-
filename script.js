document.addEventListener("DOMContentLoaded", function () {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let darkMode = localStorage.getItem("darkMode") === "enabled";

  // طلب إذن الإشعارات عند تحميل الصفحة
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
      const taskItem = document.createElement("li");
      taskItem.className = task.completed ? "completed" : "";
      taskItem.innerHTML = `
                <span>${task.text} 🕒 ${task.time || "غير محدد"}</span>
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

    if (taskText !== "" && !tasks.some((task) => task.text === taskText)) {
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
      const currentTime =
        now.getHours().toString().padStart(2, "0") +
        ":" +
        now.getMinutes().toString().padStart(2, "0");

      tasks.forEach((task) => {
        if (task.time === currentTime && !task.notified) {
          sendNotification(task.text);
          task.notified = true;
          saveTasks();
        }
      });
    }, 60000); // فحص كل دقيقة
  }

  function sendNotification(taskName) {
    if (Notification.permission === "granted") {
      new Notification("⏰ وقت المهمة!", {
        body: `حان الآن وقت: ${taskName}`,
        icon: "https://cdn-icons-png.flaticon.com/512/3906/3906567.png"
      });
    }
  }

  document.getElementById("taskSelect").addEventListener("change", function () {
    const customTaskInput = document.getElementById("customTaskInput");
    if (this.value === "✍️ مهمة أخرى") {
      customTaskInput.style.display = "block";
    } else {
      customTaskInput.style.display = "none";
    }
  });

  renderTasks();
});