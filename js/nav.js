// ============================================================
// Responsive Navigation Menus
//
// This is the script for both the header and footer navigation
// menus of the website for all devices.
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    // ====================
    // Mobile Navigation
    // ====================
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    // Menu toggle functions
    const toggleMenuState = () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
    };

    // Closes the menu
    const closeMenu = () => {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
    };

    // Menu related handlers
    const handleMenuClick = (event) => {
        const isLinkClick = event.target.tagName === 'A';
        const isSubmenuClick = event.target.closest('.has-submenu');

        if (isLinkClick && !isSubmenuClick) {
            closeMenu();
        }
    };

    // Event listeners
    mobileMenu.addEventListener('click', toggleMenuState);
    navLinks.addEventListener('click', handleMenuClick);
    document.addEventListener('click', handleMenuClick);

    // =========================
    // Footer - Accordion System
    // =========================
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    const submenuItems = document.querySelectorAll('.nav-item.has-submenu > a');

    // Closes other accordions
    const closeOtherAccordions = (currentContent) => {
        document.querySelectorAll('.accordion-content').forEach(item => {
            if (item !== currentContent) {
                item.classList.remove('active');
                item.previousElementSibling
                    .querySelector('.toggle-icon')
                    .classList.remove('active');
            }
        });
    };

    // Toggles the accordion (FIXED VERSION)
const toggleAccordion = (header) => { // Receive header as parameter
    const content = header.nextElementSibling;
    const icon = header.querySelector('.toggle-icon');
    
    closeOtherAccordions(content);
    content.classList.toggle('active');
    icon.classList.toggle('active');
    };

    // Toggles the submenu (FIXED VERSION)
    const toggleSubmenu = (event) => {
        event.preventDefault();
        event.currentTarget.closest('.has-submenu').classList.toggle('active');
    };

    // Event listeners (Keep this structure)
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => toggleAccordion(header));
    });

    submenuItems.forEach(item => {
        item.addEventListener('click', toggleSubmenu);
    });
});