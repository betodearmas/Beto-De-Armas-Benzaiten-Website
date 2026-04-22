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

    // Handle form submit
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;

        fetch("https://script.google.com/macros/s/AKfycbzA3YgAJEQtO2hoFEi7G5JOxHM26N_exjo6kkJMUBiB3UfaP9EELBCI5rxKD65RwkNQvg/exec", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: "email=" + encodeURIComponent(email)
        })
        .then(res => res.text())
        .then(data => {
            if (data.includes("Success")) {
                alert("Subscribed!");
                form.reset();
                popup.style.display = "none";
            } else {
                alert("Error. Try again.");
            }
        })
        .catch(() => {
            alert("Submission failed.");
        });
    });
});