document.addEventListener('DOMContentLoaded', () => {
    const streakCountEl = document.getElementById('streak-count');
    const restoreBtn = document.getElementById('restore-btn');
    const streakTrigger = document.getElementById('streak-trigger');
    
    // Modals
    const badgeModal = document.getElementById('badge-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const badgeCards = document.querySelectorAll('.badge-card');
    
    const celebrationModal = document.getElementById('celebration-modal');
    const celebrationTitle = document.getElementById('celebration-title');
    const celebrationBtn = document.getElementById('celebration-btn');

    const getLocalDateString = (date) => date.toLocaleDateString('en-CA'); 
    
    const todayDate = new Date();
    const today = getLocalDateString(todayDate);

    const yesterdayDate = new Date(todayDate);
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = getLocalDateString(yesterdayDate);

    const dayBeforeYesterdayDate = new Date(todayDate);
    dayBeforeYesterdayDate.setDate(dayBeforeYesterdayDate.getDate() - 2);
    const dayBeforeYesterday = getLocalDateString(dayBeforeYesterdayDate);

    const lastVisitDate = localStorage.getItem('lastVisitDate');
    let currentStreak = parseInt(localStorage.getItem('currentStreak'), 10) || 0;
    let previousStreak = parseInt(localStorage.getItem('previousStreak'), 10) || 0;

    let isNewDayVisit = false;

    // --- Date Logic ---
    if (lastVisitDate === today) {
        // Same day visit -> No celebration popup
    } else if (lastVisitDate === yesterday) {
        currentStreak++;
        previousStreak = 0; 
        isNewDayVisit = true;
    } else if (lastVisitDate === dayBeforeYesterday) {
        if (currentStreak > 1) previousStreak = currentStreak;
        currentStreak = 1;
        isNewDayVisit = true;
    } else {
        currentStreak = 1;
        previousStreak = 0;
        isNewDayVisit = true;
    }

    // Save State
    localStorage.setItem('lastVisitDate', today);
    localStorage.setItem('currentStreak', currentStreak);
    localStorage.setItem('previousStreak', previousStreak);

    // Milestone Verification
    const checkMilestones = (streak) => {
        badgeCards.forEach(card => {
            const milestone = parseInt(card.getAttribute('data-milestone'), 10);
            const statusText = card.querySelector('.badge-status');

            if (streak >= milestone) {
                card.classList.remove('locked');
                statusText.textContent = "Unlocked! 🎉";
            } else {
                card.classList.add('locked');
                statusText.textContent = "Locked";
            }
        });
    };

    const refreshUI = () => {
        streakCountEl.textContent = currentStreak;
        checkMilestones(currentStreak);

        if (previousStreak > 0) {
            restoreBtn.textContent = `Restore ${previousStreak}-day streak?`;
            restoreBtn.classList.remove('hidden');
        } else {
            restoreBtn.classList.add('hidden');
        }
    };
    restoreBtn.addEventListener('click', () => {
        currentStreak = previousStreak;
        previousStreak = 0;
        localStorage.setItem('currentStreak', currentStreak);
        localStorage.setItem('previousStreak', previousStreak);

        streakCountEl.textContent = currentStreak;
        restoreBtn.classList.add('hidden');
        
        alert("Streak recovered!");
    });

let celebrationTimer = null;

const dismissCelebration = () => {
    if (celebrationTimer) clearTimeout(celebrationTimer);
    celebrationModal.classList.remove('show'); // Triggers CSS fade & shrink automatically
};

const launchCelebration = (streak) => {
    celebrationTitle.textContent = `${streak}-day streak`;
    celebrationModal.classList.add('show');

    if (celebrationTimer) clearTimeout(celebrationTimer);

    celebrationTimer = setTimeout(() => {
        celebrationModal.classList.add('hidden');
    }, 6000);
};
    refreshUI();

    if (isNewDayVisit && currentStreak >= 2) {
    launchCelebration(currentStreak);
}

    streakTrigger.addEventListener('click', () => badgeModal.classList.remove('hidden'));
    closeModalBtn.addEventListener('click', () => badgeModal.classList.add('hidden'));

    restoreBtn.addEventListener('click', () => {
        currentStreak = previousStreak + 1;
        previousStreak = 0;
        localStorage.setItem('currentStreak', currentStreak);
        localStorage.setItem('previousStreak', previousStreak);
        
        refreshUI();
        launchCelebration(currentStreak);
    });
});