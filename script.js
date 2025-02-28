// إعداد المسبحة
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
