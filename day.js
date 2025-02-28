// جزء المهام
document.getElementById('add-task-button').addEventListener('click', function() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value;

    if (taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;
        document.getElementById('tasks').appendChild(li);
        taskInput.value = '';
    }
});

// جزء المسبحة
let count = localStorage.getItem('count') ? parseInt(localStorage.getItem('count')) : 0;
document.getElementById('count').textContent = count;

document.getElementById('add-button').addEventListener('click', function() {
    count++;
    document.getElementById('count').textContent = count;
    localStorage.setItem('count', count);
});

document.getElementById('reset-button').addEventListener('click', function() {
    count = 0;
    document.getElementById('count').textContent = count;
    localStorage.setItem('count', count);
});
