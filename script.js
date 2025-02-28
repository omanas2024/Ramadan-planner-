let count = 0;

document.getElementById('add-button').addEventListener('click', function() {
    count++;
    document.getElementById('count').textContent = count;
});

document.getElementById('reset-button').addEventListener('click', function() {
    count = 0;
    document.getElementById('count').textContent = count;
});

// وظائف المخطط
document.getElementById('add-task-button').addEventListener('click', function() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const li = document.createElement('li');
        li.textContent = taskText;
        document.getElementById('task-list').appendChild(li);
        taskInput.value = ''; // إعادة تعيين حقل الإدخال
    }
});
