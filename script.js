const verses = [
    "لأَنِّي عَرَفْتُ ٱلْأَفْكَارَ ٱلَّتِي أَنَا مُفَكِّرٌ بِهَا عَنْكُمْ، يَقُولُ ٱلرَّبُّ، أَفْكَارَ سَلَامٍ لَا شَرٍّ، لِأُعْطِيَكُمْ آخِرَةً وَرَجَاءً. - إرميا 29:11",
    "ٱطْلُبُوا فَتُعْطَوْا، ٱقْرَعُوا فَيُفْتَحُ لَكُمْ. - متى 7:7",
    "ٱلرَّبُّ نُورِي وَخَلَاصِي، مِمَّنْ أَخَافُ؟ ٱلرَّبُّ حِصْنُ حَيَاتِي، مِمَّنْ أَرْتَعِبُ؟ - مزمور 27:1",
    "أَلْقِ عَلَى ٱلرَّبِّ هَمَّكَ فَهُوَ يَعُولُكَ. - مزمور 55:22",
    "كُلُّ ٱلْأَشْيَاءِ تَعْمَلُ مَعًا لِلْخَيْرِ لِلَّذِينَ يُحِبُّونَ ٱللهَ. - رومية 8:28"
];

function getRandomVerse() {
    const randomIndex = Math.floor(Math.random() * verses.length);
    return verses[randomIndex];
}

function updateVerse() {
    const verseElement = document.getElementById("verse");

    // قم بتغيير النص مباشرة دون التأثيرات
    verseElement.style.opacity = 0;
    setTimeout(() => {
        verseElement.innerText = getRandomVerse();
        verseElement.style.opacity = 1; // اجعل النص يظهر ببطء
    }, 300); // التأخير هنا لضمان تطبيق التغييرات بشكل صحيح
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.style.display = "block";
    setTimeout(() => toast.style.display = "none", 3000);
}

function copyVerse() {
    const verseText = document.getElementById("verse").innerText;
    navigator.clipboard.writeText(verseText).then(() => {
        showToast("تم نسخ الآية 📋");
    });
}

function shareVerse() {
    const verseText = document.getElementById("verse").innerText;
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
    const verseText = document.getElementById("verse").innerText;
    let savedVerses = JSON.parse(localStorage.getItem("savedVerses")) || [];
    if (!savedVerses.includes(verseText)) {
        savedVerses.push(verseText);
        localStorage.setItem("savedVerses", JSON.stringify(savedVerses));
        showToast("تم حفظ الآية بنجاح! ❤️");
    } else {
        showToast("الآية محفوظة مسبقًا!");
    }
}

const explanations = {
    "إرميا 29:11": "هذه الآية تذكرنا بأن الله لديه خطط لسلامنا ورجائنا، وليس للشر.",
    "متى 7:7": "تشجعنا هذه الآية على الصلاة وطلب العون من الله بثقة.",
    "مزمور 27:1": "تؤكد هذه الآية أن الله هو مصدر قوتنا وحمايتنا.",
    "مزمور 55:22": "تدعونا هذه الآية إلى إلقاء همومنا على الله لأنه يعتني بنا.",
    "رومية 8:28": "تذكرنا هذه الآية أن كل الأشياء تعمل معًا لخير الذين يحبون الله."
};

function showExplanation() {
    const verseText = document.getElementById("verse").innerText;
    const verseKey = verseText.split(" - ")[1];
    const explanation = explanations[verseKey] || "لا يوجد تفسير متاح حاليًا لهذه الآية.";
    alert(explanation);
}

function requestNotificationPermission() {
    if (Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                alert("تم تفعيل التنبيهات اليومية! ستتلقى آية جديدة كل يوم.");
            }
        });
    } else {
        alert("التنبيهات مفعلة بالفعل!");
    }
}

function searchVerse() {
    const searchTerm = document.getElementById("search-input").value.toLowerCase();
    const foundVerse = verses.find(verse => verse.toLowerCase().includes(searchTerm));
    if (foundVerse) {
        document.getElementById("verse").innerText = foundVerse;
    } else {
        document.getElementById("verse").innerText = "لم يتم العثور على آية.";
    }
}

document.getElementById("new-verse").addEventListener("click", updateVerse);
document.getElementById("copy-verse").addEventListener("click", copyVerse);
document.getElementById("share-verse").addEventListener("click", shareVerse);
document.getElementById("save-verse").addEventListener("click", saveVerse);
document.getElementById("explain-verse").addEventListener("click", showExplanation);
document.getElementById("notification-button").addEventListener("click", requestNotificationPermission);
document.getElementById("search-button").addEventListener("click", searchVerse);

// Initialize with a random verse
updateVerse();
