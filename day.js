function adjustToHijri(date) {
    // تحويل التاريخ الميلادي إلى هجري (تقدير تقريبي، يمكن استخدام مكتبة أخرى دقيقة لهذا)
    const hijriDate = dayjs(date).locale('ar-SA').format('iD iMMMM iYYYY');
    return hijriDate;
}

// استخدام اليوم الحالي
const today = dayjs();
console.log('التاريخ اليوم: ' + today.format('YYYY-MM-DD'));
console.log('التاريخ هجري اليوم: ' + adjustToHijri(today));
