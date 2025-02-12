const verses = [
    { text: "المحبة لا تسقط أبدًا", reference: "1 كورنثوس 13:8" },
    { text: "الله محبة، ومن يثبت في المحبة يثبت في الله والله فيه", reference: "1 يوحنا 4:16" },
    { text: "لأني أنا عارف الأفكار التي أنا مفتكر بها عنكم يقول الرب أفكار سلام لا شر", reference: "إرميا 29:11" },
    { text: "اَلْمَحَبَّةُ تَتَأَنَّى وَتَرْفُقُ", reference: "1 كورنثوس 13:4" },
    { text: "كل شيء مستطاع للمؤمن", reference: "مرقس 9:23" },
    { text: "السلام أترك لكم، سلامي أعطيكم", reference: "يوحنا 14:27" }
];

const remembrances = {
    "12-02": "تذكار استشهاد القديس مارمينا",
    "13-02": "تذكار نياحة القديس البابا كيرلس السادس"
};

let lastVerseIndex = -1;

function getRandomVerse() {
    let index;
    do {
        index = Math.floor(Math.random() * verses.length);
    } while (index === lastVerseIndex);
    lastVerseIndex = index;
    return verses[index];
}

function updateVerseDisplay() {
    const verse = getRandomVerse();
    const verseElement = document.getElementById('verse');
    
    if (verseElement) {
        verseElement.innerHTML = `<p>${verse.text}</p><p class="verse-reference">${verse.reference}</p>`;
    } else {
        console.error("لم يتم العثور على عنصر عرض الآية");
    }
}

function getFormattedDate() {
    const date = new Date();
    return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function showTodaysRemembrance() {
    const today = getFormattedDate();
    const remembrance = remembrances[today] || "لا يوجد تذكار لهذا اليوم";
    showToast(remembrance);
}

document.addEventListener('DOMContentLoaded', () => {
    updateVerseDisplay();
    document.getElementById('new-verse').addEventListener('click', updateVerseDisplay);
    document.getElementById('remembrance-button').addEventListener('click', showTodaysRemembrance);
});

function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, duration);
}
