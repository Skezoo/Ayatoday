const verses = [
    "لأَنِّي عَرَفْتُ ٱلْأَفْكَارَ ٱلَّتِي أَنَا مُفَكِّرٌ بِهَا عَنْكُمْ، يَقُولُ ٱلرَّبُّ، أَفْكَارَ سَلَامٍ لَا شَرٍّ، لِأُعْطِيَكُمْ آخِرَةً وَرَجَاءً. - إرميا 29:11",
    "ٱطْلُبُوا فَتُعْطَوْا، ٱقْرَعُوا فَيُفْتَحُ لَكُمْ. - متى 7:7",
    "ٱلرَّبُّ نُورِي وَخَلَاصِي، مِمَّنْ أَخَافُ؟ ٱلرَّبُّ حِصْنُ حَيَاتِي، مِمَّنْ أَرْتَعِبُ؟ - مزمور 27:1",
    "أَلْقِ عَلَى ٱلرَّبِّ هَمَّكَ فَهُوَ يَعُولُكَ. - مزمور 55:22",
    "كُلُّ ٱلْأَشْيَاءِ تَعْمَلُ مَعًا لِلْخَيْرِ لِلَّذِينَ يُحِبُّونَ ٱللهَ. - رومية 8:28"
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

    verseElement.style.opacity = 0;
    setTimeout(() => {
        verseElement.innerText = getRandomVerse();
        verseElement.style.opacity = 1;
    }, 300);
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

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.style.display = "block";
    setTimeout(() => toast.style.display = "none", 3000);
}

document.addEventListener("DOMContentLoaded", () => {
    updateVerse();
    document.getElementById("new-verse").addEventListener("click", updateVerse);
    document.getElementById("copy-verse").addEventListener("click", copyVerse);
    document.getElementById("share-verse").addEventListener("click", shareVerse);
    document.getElementById("save-verse").addEventListener("click", saveVerse);
});
