// State variables
let currentProgress = 0;
let starsEarned = 0;
let clicksPerStar = getClicksPerStarFromURL();

// Parse clicks per star from URL query parameter
function getClicksPerStarFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const queryValue = urlParams.get('') || window.location.search.slice(1); // Handle ?10 format

    if (queryValue) {
        const parsed = parseInt(queryValue, 10);
        if (!isNaN(parsed) && parsed > 0) {
            return parsed;
        }
    }

    return 10; // Default value
}

// DOM elements
let progressBar, progressFill, progressText, starsContainer, starsCounter, plusButton, minusButton;

// Prevent rapid clicking
let isProcessing = false;
const CLICK_DEBOUNCE_MS = 100;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    updateUI();
});

function initializeElements() {
    progressBar = document.getElementById('progressBar');
    progressFill = document.getElementById('progressFill');
    progressText = document.getElementById('progressText');
    starsContainer = document.getElementById('starsContainer');
    starsCounter = document.getElementById('starsCounter');
    plusButton = document.getElementById('plusButton');
    minusButton = document.getElementById('minusButton');

    if (!progressBar || !progressFill || !progressText || !starsContainer || !starsCounter || !plusButton || !minusButton) {
        console.error('Required DOM elements not found');
        return;
    }
}

function setupEventListeners() {
    plusButton.addEventListener('click', handlePlusClick);
    minusButton.addEventListener('click', handleMinusClick);

    // Add keyboard support
    plusButton.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handlePlusClick();
        }
    });

    minusButton.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleMinusClick();
        }
    });

    // Add visual feedback for button presses
    [plusButton, minusButton].forEach(button => {
        button.addEventListener('mousedown', function() {
            this.classList.add('pressed');
        });

        button.addEventListener('mouseup', function() {
            this.classList.remove('pressed');
        });

        button.addEventListener('mouseleave', function() {
            this.classList.remove('pressed');
        });

        // Touch events for mobile
        button.addEventListener('touchstart', function() {
            this.classList.add('pressed');
        });

        button.addEventListener('touchend', function() {
            this.classList.remove('pressed');
        });
    });
}

function handlePlusClick() {
    if (isProcessing) return;

    isProcessing = true;
    increaseProgress();

    setTimeout(() => {
        isProcessing = false;
    }, CLICK_DEBOUNCE_MS);
}

function handleMinusClick() {
    if (isProcessing) return;

    isProcessing = true;
    decreaseProgress();

    setTimeout(() => {
        isProcessing = false;
    }, CLICK_DEBOUNCE_MS);
}

function increaseProgress() {
    currentProgress++;

    if (currentProgress >= clicksPerStar) {
        awardStar();
    } else {
        updateUI();
    }
}

function decreaseProgress() {
    if (currentProgress > 0) {
        currentProgress--;
        updateUI();
    } else if (starsEarned > 0) {
        // Remove a star and set progress to full
        starsEarned--;
        currentProgress = clicksPerStar - 1;
        updateUI();
    }
}

function awardStar() {
    starsEarned++;
    currentProgress = 0;

    // Update everything except stars first
    updateProgressBar();
    updateProgressText();
    updateStarsCounter();
    updateButtonStates();

    // Add the new star with animation
    addNewStarWithAnimation();
}

function updateUI() {
    updateProgressBar();
    updateProgressText();
    updateStarsDisplayNoAnimation();
    updateStarsCounter();
    updateButtonStates();
}

function updateProgressBar() {
    const progressPercentage = (currentProgress / clicksPerStar) * 100;
    progressFill.style.width = `${progressPercentage}%`;

    // Update ARIA attributes
    progressBar.setAttribute('aria-valuenow', currentProgress);
    progressBar.setAttribute('aria-valuetext', `${currentProgress} out of ${clicksPerStar} clicks to earn a star`);
}

function updateProgressText() {
    progressText.textContent = `${currentProgress} / ${clicksPerStar} clicks`;
}

function updateStarsDisplay() {
    starsContainer.innerHTML = '';

    for (let i = 0; i < starsEarned; i++) {
        const star = document.createElement('span');
        star.className = 'star earned';
        star.textContent = '⭐';
        star.setAttribute('aria-hidden', 'true');
        starsContainer.appendChild(star);
    }
}

function updateStarsDisplayNoAnimation() {
    starsContainer.innerHTML = '';

    for (let i = 0; i < starsEarned; i++) {
        const star = document.createElement('span');
        star.className = 'star earned';
        star.style.animation = 'none'; // Disable animation
        star.textContent = '⭐';
        star.setAttribute('aria-hidden', 'true');
        starsContainer.appendChild(star);
    }
}

function addNewStarWithAnimation() {
    // Clear and rebuild all stars, but only animate the new one
    starsContainer.innerHTML = '';

    for (let i = 0; i < starsEarned; i++) {
        const star = document.createElement('span');
        star.textContent = '⭐';
        star.setAttribute('aria-hidden', 'true');

        if (i === starsEarned - 1) {
            // This is the new star - add animation
            star.className = 'star earned';
        } else {
            // Existing stars - no animation
            star.className = 'star earned';
            star.style.animation = 'none';
        }

        starsContainer.appendChild(star);
    }
}

function updateStarsCounter() {
    starsCounter.textContent = `${starsEarned} Stars`;
    starsCounter.setAttribute('aria-label', `${starsEarned} stars earned`);
}

function updateButtonStates() {
    // Plus button is always enabled
    plusButton.disabled = false;
    plusButton.setAttribute('aria-label', 'Add progress towards earning a star');
    plusButton.style.opacity = '1';
    plusButton.style.cursor = 'pointer';

    // Update minus button state
    if (starsEarned === 0 && currentProgress === 0) {
        minusButton.disabled = true;
        minusButton.setAttribute('aria-label', 'No progress to remove');
        minusButton.style.opacity = '0.6';
        minusButton.style.cursor = 'not-allowed';
    } else {
        minusButton.disabled = false;
        minusButton.setAttribute('aria-label', 'Remove progress or stars');
        minusButton.style.opacity = '1';
        minusButton.style.cursor = 'pointer';
    }
}

function validateInput() {
    // Ensure values stay within valid bounds
    currentProgress = Math.max(0, Math.min(currentProgress, clicksPerStar - 1));
    starsEarned = Math.max(0, starsEarned);
}

// Configuration functions for easy customization
function setClicksPerStar(newValue) {
    if (typeof newValue === 'number' && newValue > 0) {
        clicksPerStar = newValue;
        progressBar.setAttribute('aria-valuemax', clicksPerStar);

        // Reset progress if it exceeds new threshold
        if (currentProgress >= clicksPerStar) {
            currentProgress = clicksPerStar - 1;
        }

        updateUI();
    }
}

function resetProgress() {
    currentProgress = 0;
    starsEarned = 0;
    updateUI();
}

// Export functions for external use (if needed)
window.starRewardSystem = {
    setClicksPerStar,
    resetProgress,
    getCurrentProgress: () => currentProgress,
    getStarsEarned: () => starsEarned
};

// Periodic validation to ensure state consistency
setInterval(validateInput, 5000);