/* PAGE TRANSITION FADE-IN */
if (sessionStorage.getItem('pt') && document.documentElement.style.opacity === '0') {
    sessionStorage.removeItem('pt');
    requestAnimationFrame(function () {
        document.documentElement.style.transition = 'opacity 0.4s ease';
        document.documentElement.style.opacity = '1';
    });
}

/*HAM MENU*/

document.addEventListener('DOMContentLoaded', function() {
    const hamMenu = document.querySelector('.ham-menu');
    const offScreenMenu = document.querySelector('.off-screen-menu');

    hamMenu.addEventListener('click', () => {
        hamMenu.classList.toggle('active');
        offScreenMenu.classList.toggle('active');
    });

    const scrollThreshold = 450;
    
    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
});


/*POP-UP*/
document.addEventListener("DOMContentLoaded", function () {
    const popup = document.getElementById("popup");
    const close = document.getElementById("close");
    const form = document.getElementById("subscriptionForm");

    // Hide initially
    popup.style.display = "none";

    // Show after 5s (once per session)
    if (!sessionStorage.getItem("popupShown")) {
        setTimeout(() => {
            popup.style.display = "flex";
            sessionStorage.setItem("popupShown", "true");
        }, 5000);
    }

    // Close popup
    close.addEventListener("click", () => {
        popup.style.display = "none";
    });

});