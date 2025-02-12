const verses = [
    { text: "لأني أنا عارف الأفكار التي أنا مفتكر بها عنكم يقول الرب أفكار سلام لا شر", reference: "إرميا 29: 11", explanation: "الله يعلن عن محبته ورعايته لشعبه" },
    { text: "اَلْمَحَبَّةُ تَتَأَنَّى وَتَرْفُقُ. اَلْمَحَبَّةُ لَا تَحْسِدُ. اَلْمَحَبَّةُ لَا تَتَفَاخَرُ وَلَا تَنْتَفِخُ", reference: "1 كورنثوس 13:4", explanation: "وصف لطبيعة المحبة الحقيقية" },
    { text: "فَأَيُّهَا الإِخْوَةُ، إِذَا كَانَ اللّهُ قَدْ أَحَبَّنَا هَذَا الْمَحَبَّةَ فَلْنَحْنُ أَيْضًا نَحِبُّ بَعْضَنَا", reference: "1 يوحنا 4:11", explanation: "التأكيد على المحبة المتبادلة بين المؤمنين" },
    { text: "وَلَا تَجْتَازُوا فِي أَرْضِ الأُمَمِ وَلَا تَدْخُلُوا فِي مَدِينَةٍ سَمَرِيَّةٍ، بَلِ اذْهَبُوا بِالْحَرِيِّ إِلَى خِرَافِ بَيْتِ إِسْرَائِيلَ الضَّالَّةِ", reference: "متى 10: 5-6", explanation: "رسالة السلام والرحمة للآخرين" },
    { text: "هكذا أحب الله العالم حتى بذل ابنه الوحيد لكي لا يهلك كل من يؤمن به بل تكون له الحياة الأبدية", reference: "يوحنا 3: 16", explanation: "حب الله الذي يضمن الحياة الأبدية للمؤمنين" },
    { text: "إِذَا أَحَبَّ أَحَدٌ أَخَاهُ، فَإِنَّهُ يَفِي بِالشَّرِيعَةِ", reference: "رومية 13:10", explanation: "المحبة كأحد أساسيات الشريعة" },
    { text: "وَحَقًّا مَا تَفْعَلُونَهُ لِوَاحِدٍ مِنْ هَؤُلاَءِ الإِخْوَةِ الصِّغَارِ فَإِنَّكُمْ تَفْعَلُونَهُ لِي", reference: "متى 25: 40", explanation: "الاهتمام بالآخرين كأنما هو فعل لله" },
    { text: "لِيُحْسِنْ إِلَى جَمِيعِ النَّاسِ، وَلَكِنَّ خَاصَّةً إِلَى أَهْلِ الإِيمَانِ", reference: "غلاطية 6:10", explanation: "العمل بالخير والمحبة لجميع الناس، خاصة المؤمنين" },
    { text: "وَلَا تَفَاخُرُوا وَلَا تَحَسَّدُوا بَعْضُكُمْ بَعْضًا، وَفِي كُلِّ شَيْءٍ تَحْتَسُوا فِي حُبِّكُمْ"، reference: "1 كورنثوس 13:5", explanation: "التحلي بالحب والتواضع" },
    { text: "هَذَا هُوَ التَّحْتَاجِ فِي حُبِّ اللَّهِ", reference: "يوحنا 15:13", explanation: "الحب الأعظم هو الحب الذي لا يسقط أبدًا" },
    // ... (أضف المزيد من الآيات هنا حتى 50+)
];

let currentVerse = null;
let notificationsEnabled = false;

// ======== إصلاح مشكلة تحميل الآية ========
function getRandomVerse() {
    if (verses.length === 0) {
        console.error("لا توجد آيات متاحة");
        return null;
    }

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * verses.length);
    } while (verses.length > 1 && verses[randomIndex] === currentVerse);

    return verses[randomIndex];
}

function updateVerseDisplay() {
    const verse = getRandomVerse();
    const verseElement = document.getElementById('verse');
    
    if (!verse || !verseElement) {
        console.error("خطأ في تحميل الآية");
        verseElement.textContent = "عذرًا، حدث خطأ في تحميل الآية";
        return;
    }
    
    currentVerse = verse;
    verseElement.innerHTML = `
        <p>${verse.text}</p>
        <p class="verse-reference">${verse.reference}</p>
    `;
    verseElement.classList.add('animate__fadeIn');
    setTimeout(() => verseElement.classList.remove('animate__fadeIn'), 500);
}

// ======== إصلاح مشكلة التذكارات ========
function getFormattedDate() {
    const date = new Date();
    return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function showTodaysRemembrance() {
    const today = getFormattedDate();
    const remembrance = remembrances[today] || `لا يوجد تذكار مسجل لـ ${today}`;
    
    console.log("تاريخ اليوم:", today); // للمساعدة في التشخيص
    showToast(remembrance);
}

// ======== نظام الأساسي ========
document.addEventListener('DOMContentLoaded', () => {
    // التحميل الأولي للآية
    updateVerseDisplay();
    
    // تهيئة الأزرار
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
        const exists = saved.some(v => v.reference === currentVerse.reference);
        
        if (!exists) {
            saved.push(currentVerse);
            localStorage.setItem('savedVerses', JSON.stringify(saved));
            showToast("تم حفظ الآية في المفضلة");
        } else {
            showToast("الآية محفوظة مسبقًا");
        }
    });
    document.getElementById('remembrance-button').addEventListener('click', showTodaysRemembrance);
});

function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, duration);
}
