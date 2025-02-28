document.addEventListener("DOMContentLoaded", () => {
    const addTaskBtn = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");
    const dailyCompleted = document.getElementById("daily-completed");
    const monthlyCompleted = document.getElementById("monthly-completed");

    let completedTasks = 0;

    // إضافة مهمة جديدة
    addTaskBtn.addEventListener("click", () => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        taskDiv.innerHTML = `
            <input type="time">
            <span>📝 مهمة جديدة</span>
            <input type="checkbox">
        `;
        taskList.appendChild(taskDiv);
    });

    // حساب عدد المهام المكتملة
    taskList.addEventListener("change", (event) => {
        if (event.target.type === "checkbox") {
            if (event.target.checked) {
                completedTasks++;
            } else {
                completedTasks--;
            }
            dailyCompleted.textContent = completedTasks;
            monthlyCompleted.textContent = completedTasks; // يمكنك تحسين الحساب لليوم فقط
        }
    });
});
