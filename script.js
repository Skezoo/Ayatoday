const verses = [
    "اَلْمَحَبَّةُ تَتَأَنَّى وَتَرْفُقُ. اَلْمَحَبَّةُ لَا تَحْسِدُ. اَلْمَحَبَّةُ لَا تَتَفَاخَرُ وَلَا تَنْتَفِخُ. - 1 كورنثوس 13:4",
    "وَأَمَّا ثَمَرُ ٱلرُّوحِ فَهُوَ: مَحَبَّةٌ، فَرَحٌ، سَلَامٌ، طُولُ أَنَاةٍ، لُطْفٌ، صَلَاحٌ، إِيمَانٌ. - غلاطية 5:22",
    "اَللَّهُ مَحَبَّةٌ، وَمَنْ يَثْبُتْ فِي ٱلْمَحَبَّةِ، يَثْبُتْ فِي ٱللَّهِ وَٱللَّهُ فِيهِ. - 1 يوحنا 4:16",
    "فَوْقَ كُلِّ ٱلْأَشْيَاءِ ٱلْبَسُوا ٱلْمَحَبَّةَ، ٱلَّتِي هِيَ رِبَاطُ ٱلْكَمَالِ. - كولوسي 3:14",
    "لَيْسَ لِأَحَدٍ حُبٌّ أَعْظَمُ مِنْ هَذَا: أَنْ يَضَعَ أَحَدٌ نَفْسَهُ لِأَجْلِ أَحِبَّائِهِ. - يوحنا 15:13",
    "لِيَكُنْ كُلُّ شَيْءٍ عِنْدَكُمْ بِمَحَبَّةٍ. - 1 كورنثوس 16:14",
    "وَأَمَّا ٱلْمَحَبَّةُ فَلْتَكُنْ بِلاَ رِيَاءٍ. كُونُوا كَارِهِينَ ٱلشَّرَّ، مُلْتَصِقِينَ بِٱلْخَيْرِ. - رومية 12:9",
    "وَٱلْمَحَبَّةُ تَسْتُرُ كَثِيرًا مِنَ ٱلْخَطَايَا. - 1 بطرس 4:8"
];

let lastVerse = "";

function getRandomVerse() {
    let randomIndex;
    let newVerse;

    do {
        randomIndex = Math.floor(Math.random() * verses.length);
        newVerse = verses[randomIndex];
    } while (newVerse === lastVerse);

    lastVerse = newVerse;
    return newVerse;
}

function updateVerse() {
    const verseElement = document.getElementById("verse");
    if (!verseElement) return;

    verseElement.style.opacity = 0; // بداية تأثير الإظهار

    setTimeout(() => {
        const newVerse = getRandomVerse();
        verseElement.textContent = newVerse;
        verseElement.style.opacity = 1; // إظهار النص بسلاسة
    }, 300); // تأخير بسيط لإظهار التأثير
}

function copyVerse() {
    const verseText = document.getElementById("verse").textContent;
    navigator.clipboard.writeText(verseText).then(() => {
        showToast("تم نسخ الآية 📋");
    });
}

function shareVerse() {
    const verseText = document.getElementById("verse").textContent;
    if (navigator.share) {
        navigator.share({
            title: "آية اليوم",
            text: verseText,
            url: window.location.href
        }).catch(err => console.log("خطأ في المشاركة:", err));
    } else {
        alert("المشاركة غير مدعومة في هذا المتصفح.");
    }
}

function saveVerse() {
    const verseText = document.getElementById("verse").textContent;
    let savedVerses = JSON.parse(localStorage.getItem("savedVerses")) || [];
    if (!savedVerses.includes(verseText)) {
        savedVerses.push(verseText);
        localStorage.setItem("savedVerses", JSON.stringify(savedVerses));
        showToast("تم حفظ الآية بنجاح! ❤");
    } else {
        showToast("الآية محفوظة مسبقًا!");
    }
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.style.display = "block";
    setTimeout(() => toast.style.display = "none", 3000);
}

function enableNotifications() {
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            localStorage.setItem("notificationsEnabled", "true");
            showToast("تم تفعيل التنبيهات اليومية! 🔔");
        } else {
            showToast("لم يتم تفعيل التنبيهات!");
        }
    });
}

function sendDailyNotification() {
    if (localStorage.getItem("notificationsEnabled") === "true") {
        const verseText = getRandomVerse();
        new Notification("آية اليوم", { body: verseText });
    }
}

function explainVerse() {
    const verseText = document.getElementById("verse").textContent;
    showToast(`تفسير الآية: ${verseText}`);
}

// قائمة بالتذكارات مرتبطة بتواريخ محددة
const remembrances = [
    { date: "01-01", text: "اليوم هو تذكار استشهاد القديس مارمينا العجايبي." },
    { date: "02-01", text: "اليوم هو تذكار نياحة البابا كيرلس السادس." },
    { date: "03-01", text: "اليوم هو تذكار استشهاد القديسة دميانة." },
    { date: "04-01", text: "اليوم هو تذكار نياحة الأنبا أنطونيوس أب الرهبان." },
    { date: "05-01", text: "اليوم هو تذكار استشهاد القديس جرجس الروماني." },
    // يمكنك إضافة المزيد من التذكارات هنا
];

// دالة للحصول على تذكار اليوم الفعلي
function getTodaysRemembrance() {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // الشهر (01-12)
    const day = String(today.getDate()).padStart(2, "0"); // اليوم (01-31)
    const todayDate = `${month}-${day}`;

    const remembrance = remembrances.find(r => r.date === todayDate);
    return remembrance ? remembrance.text : "لا يوجد تذكار لهذا اليوم.";
}

// دالة لعرض تذكار اليوم
function showRemembrance() {
    const remembrance = getTodaysRemembrance();
    showToast(remembrance); // عرض التذكار كإشعار
}

// تهيئة الصفحة عند التحميل
document.addEventListener("DOMContentLoaded", () => {
    const verseElement = document.getElementById("verse");
    if (verseElement) {
        verseElement.textContent = "جاري تحميل الآية..."; // رسالة تحميل مؤقتة
        updateVerse(); // تحديث الآية مباشرة
    }

    // ربط الأزرار بالدوال
    document.getElementById("new-verse").addEventListener("click", updateVerse);
    document.getElementById("copy-verse").addEventListener("click", copyVerse);
    document.getElementById("share-verse").addEventListener("click", shareVerse);
    document.getElementById("save-verse").addEventListener("click", saveVerse);
    document.getElementById("explain-verse").addEventListener("click", explainVerse);
    document.getElementById("notification-button").addEventListener("click", enableNotifications);
    document.getElementById("remembrance-button").addEventListener("click", showRemembrance); // ربط الزر الجديد

    setInterval(sendDailyNotification, 86400000); // إرسال إشعار يومي كل 24 ساعة
});
