document.addEventListener('DOMContentLoaded', () => {
    // Tab Navigation Logic
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('.page-section');

    function switchTab(targetId) {
        // Remove active class from all links and sections
        navLinks.forEach(link => {
            link.classList.remove('active');
            // If this is the button we clicked, add active back
            if (link.dataset.target === targetId) {
                link.classList.add('active');
            }
        });

        pageSections.forEach(section => {
            section.classList.remove('active');
            // Reset animation by triggering reflow
            void section.offsetWidth; 
            
            if (section.id === targetId) {
                section.classList.add('active');
            }
        });

        // Close mobile menu if open
        if (navLinksContainer.classList.contains('show')) {
            toggleMobileMenu();
        }

        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Update URL hash without breaking history back button easily
        history.replaceState(null, null, `#${targetId}`);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.dataset.target;
            switchTab(target);
        });
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    function toggleMobileMenu() {
        mobileMenuBtn.classList.toggle('active');
        navLinksContainer.classList.toggle('show');
    }

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Initial check for URL hash to open correct tab based on links sharing
    const hash = window.location.hash.replace('#', '');
    if (hash && ['home', 'privacy', 'terms'].includes(hash)) {
        switchTab(hash);
    }
});
