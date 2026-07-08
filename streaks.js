document.addEventListener('DOMContentLoaded', () => {
    const streakCountEl = document.getElementById('streak-count');
    const restoreBtn = document.getElementById('restore-btn');

    const getLocalDateString = (date) => date.toLocaleDateString('en-CA'); 
    const today = getLocalDateString(new Date());

    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = getLocalDateString(yesterdayDate);

    // Fetch data
    const lastVisitDate = localStorage.getItem('lastVisitDate');
    let currentStreak = parseInt(localStorage.getItem('currentStreak'), 10) || 0;
    let previousStreak = parseInt(localStorage.getItem('previousStreak'), 10) || 0;

    // --- Core Streak Logic ---
    if (lastVisitDate === today) {
        // Visited already today. Do nothing to data.
    } else if (lastVisitDate === yesterday) {
        // Streak maintained! Clear any old backups since they don't need them.
        currentStreak++;
        previousStreak = 0; 
    } else {
        // Streak broken. Save the old streak as a backup BEFORE resetting to 1.
        if (currentStreak > 1) {
            previousStreak = currentStreak;
        }
        currentStreak = 1;
    }

    // Save states
    localStorage.setItem('lastVisitDate', today);
    localStorage.setItem('currentStreak', currentStreak);
    localStorage.setItem('previousStreak', previousStreak);

    // --- UI Updates ---
    streakCountEl.textContent = currentStreak;

    // Show restore button if a backup streak exists
    if (previousStreak > 0) {
        restoreBtn.textContent = `Restore ${previousStreak} day streak`;
        restoreBtn.classList.remove('hidden');
    } else {
        restoreBtn.classList.add('hidden');
    }

    // --- Restore Button Click Event ---
    restoreBtn.addEventListener('click', () => {
        // Reclaim old streak + add 1 for today's current visit
        currentStreak = previousStreak + 1;
        previousStreak = 0; // Wipe backup so they can't double-restore

        // Save updated records
        localStorage.setItem('currentStreak', currentStreak);
        localStorage.setItem('previousStreak', previousStreak);

        // Update UI
        streakCountEl.textContent = currentStreak;
        restoreBtn.classList.add('hidden');
        
        alert("Streak successfully recovered!");
    });
});