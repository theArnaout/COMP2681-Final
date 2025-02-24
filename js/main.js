//=========================================================
// Main.js
//
// Contains the scripts that are shared among all webpages.
//=========================================================

//============================
// Navbar Background on Scroll
//============================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.main-nav');
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled'); // Add class when scrolled
    } else {
        navbar.classList.remove('scrolled'); // Remove class when at the top
    }
});

//===========================
// Updates last modified date
//===========================
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('lastModified').textContent = document.lastModified;
});

//============
// Time Clock
//============

// Creates a clock that displays the current time
function updateLocalClock() {
    const clockElement = document.getElementById('localTimeClock');

    // Formats the time to be displayed
    function formatTime(date) {
        const hour = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        
        // Ternary operator to convert 24hr to 12hr format
        const formattedHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        // Ternary operator for AM/PM
        const period = hour >= 12 ? 'PM' : 'AM';
        
        return `${formattedHour}:${minutes}:${seconds} ${period}`;
    }
    // Checks if the store is open (12pm-9pm)
    function isStoreOpen(hour) {
        return hour >= 12 && hour < 21;
    }
    // Updates the time display
    function updateDisplay() {
        const now = new Date();
        const currentHour = now.getHours();
        
        // Set the time
        clockElement.textContent = formatTime(now);

        // Add status classes
        if (isStoreOpen(currentHour)) {
            clockElement.className = 'nav-clock open';
            clockElement.textContent += ' Open';
        } else {
            clockElement.className = 'nav-clock closed';
            clockElement.textContent += ' Closed';
        }
    }

    // Initial call to display time immediately
    updateDisplay();

    // Update it every second
    setInterval(updateDisplay, 1000);
}

// Loads the clock when the page is loaded
document.addEventListener('DOMContentLoaded', updateLocalClock);
