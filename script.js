const verses = [
    { text: "اَلْمَحَبَّةُ تَتَأَنَّى وَتَرْفُقُ...", reference: "1 كورنثوس 13:4", explanation: "المحبة الحقيقية" },
    { text: "لأنكم بالنعمة مخلصون بالإيمان...", reference: "أفسس 2: 8", explanation: "الخلاص بالنعمة" },
    { text: "مغبوط هو العطاء أكثر من الأخذ...", reference: "أعمال 20:35", explanation: "أهمية العطاء" },
    { text: "اِحْمِلُوا بَعْضُكُمْ أَثْقَالَ بَعْضٍ...", reference: "غلاطية 6:2", explanation: "مساعدة الآخرين" },
    { text: "فَإِنْ غَفَرْتُمْ لِلنَّاسِ زَلاَتِهِمْ...", reference: "متى 6:14", explanation: "قوة المغفرة" },
    { text: "اِصْنَعُوا لأَنْفُسِكُمْ كُنُوزًا فِي السَّمَاءِ...", reference: "متى 6:20", explanation: "الكنوز السماوية" },
    { text: "اَللَّهُ مَحَبَّةٌ، وَمَنْ يَثْبُتْ فِي الْمَحَبَّةِ...", reference: "1 يوحنا 4:16", explanation: "الله هو المحبة" },
    { text: "يَا بَنِي، لَا نُحِبَّ بِالْكَلَامِ وَاللِّسَانِ...", reference: "1 يوحنا 3:18", explanation: "المحبة بالأفعال" },
    { text: "إِنْ كَانَ مُمْكِنًا فَبِمَا تَسْتَطِيعُونَ...", reference: "رومية 12:18", explanation: "السلام مع الآخرين" },
    { text: "مَنْ يَغْفِرُ لِلْبَشَرِ زَلاَتِهِمْ...", reference: "متى 6:15", explanation: "الغفران المتبادل" }
];

const remembrances = {
    "01-01": "تذكار استشهاد القديس مارمينا العجايبي",
    "02-01": "نياحة البابا كيرلس السادس",
    "03-01": "استشهاد القديسة دميانة",
    "04-01": "نياحة الأنبا أنطونيوس أب الرهبان",
    "12-02": "تذكار القديس بطرس خاتم الشهداء",
    "15-02": "تذكار دخول العائلة المقدسة إلى مصر",
    "25-03": "عيد البشارة المجيد",
    "07-04": "تذكار استشهاد القديس مارمرقس الرسول",
    "15-10": "تذكار اختباري" // مثال
};

// ======== دالة اختيار آية عشوائية ========
function getRandomVerse() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * verses.length);
    } while (verses.length > 1 && verses[randomIndex] === currentVerse);

    return verses[randomIndex];
}

// ======== تحديث عرض الآية ========
function updateVerseDisplay() {
    const verse = getRandomVerse();
    const verseElement = document.getElementById('verse');

    if (!verseElement) return;

    currentVerse = verse;
    verseElement.innerHTML = `<p>${verse.text}</p><p class="verse-reference">${verse.reference}</p>`;
    verseElement.classList.add('animate__fadeIn');
    setTimeout(() => verseElement.classList.remove('animate__fadeIn'), 500);
}

// ======== دالة التذكارات اليومية (إصلاح الخطأ) ========
function getFormattedDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}-${month}`;
}

function showTodaysRemembrance() {
    const today = getFormattedDate();
    const remembrance = remembrances[today] || `لا يوجد تذكار لهذا اليوم (${today})`;

    console.log("تذكار اليوم:", remembrance);
    showToast(remembrance);
}

// ======== تنفيذ الوظائف عند تحميل الصفحة ========
document.addEventListener('DOMContentLoaded', () => {
    updateVerseDisplay();

    document.getElementById('new-verse').addEventListener('click', updateVerseDisplay);
    document.getElementById('copy-verse').addEventListener('click', () => {
        navigator.clipboard.writeText(`${currentVerse.text} - ${currentVerse.reference}`);
        showToast("تم نسخ الآية");
    });

    document.getElementById('share-verse').addEventListener('click', async () => {
        try {
            await navigator.share({
                title: `آية اليوم - ${currentVerse.reference}`,
                text: `${currentVerse.text}\n\n${currentVerse.reference}`,
                url: window.location.href
            });
        } catch (err) {
            showToast("تم إلغاء المشاركة");
        }
    });

    document.getElementById('save-verse').addEventListener('click', () => {
        const saved = JSON.parse(localStorage.getItem('savedVerses') || '[]');
        if (!saved.some(v => v.reference === currentVerse.reference)) {
            saved.push(currentVerse);
            localStorage.setItem('savedVerses', JSON.stringify(saved));
            showToast("تم حفظ الآية في المفضلة");
        } else {
            showToast("الآية محفوظة مسبقًا");
        }
    });

    document.getElementById('remembrance-button').addEventListener('click', showTodaysRemembrance);
});

// ======== عرض إشعار عند تنفيذ الأحداث ========
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, duration);
}
