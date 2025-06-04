document.addEventListener('DOMContentLoaded', function() {
    // AOS Initialization
    AOS.init({
        duration: 800, // values from 0 to 3000, with step 50ms
        once: true, // whether animation should happen only once - while scrolling down
    });

    // Modal Logic
    const modalBtns = document.querySelectorAll('.details-btn');
    const modals = document.querySelectorAll('.modal');
    const closeBtns = document.querySelectorAll('.close-btn');

    modalBtns.forEach(btn => {
        btn.onclick = function() {
            const modalId = this.getAttribute('data-modal-target');
            document.querySelector(modalId).style.display = "block";
        }
    });

    closeBtns.forEach(btn => {
        btn.onclick = function() {
            this.closest('.modal').style.display = "none";
        }
    });

    window.onclick = function(event) {
        modals.forEach(modal => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    }

    // Dynamic Year and Last Updated Date in Footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    const lastUpdatedSpan = document.getElementById('lastUpdated');
    if (lastUpdatedSpan) {
        // You can manually set this date string or use document.lastModified for a rough estimate
        // For a precise "Last Updated" for content, manual is often better.
        // Example: lastUpdatedSpan.textContent = "June 4, 2025"; 
        // Or using file's last modified date (might not be what you want for content changes)
        // lastUpdatedSpan.textContent = new Date(document.lastModified).toLocaleDateString();
        
        // Let's put a placeholder you can update or a dynamic date of access for now
        lastUpdatedSpan.textContent = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    // Update summary values in floating stats (example - you'd make these dynamic or update manually)
    // This is just to show where you *could* update them if they were calculated,
    // but for now, they are hardcoded in HTML. If you change HTML, these are not needed.
    /*
    document.getElementById('sfp-projects').textContent = "1"; // Update this based on latest
    document.getElementById('sfp-leetcode').textContent = "70+";
    document.getElementById('sfp-commits').textContent = "150+";
    document.getElementById('sfp-miles').textContent = "150+";
    document.getElementById('sfp-weight').textContent = "25";
    */
});