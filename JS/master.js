/* Start Settings */
/* To create and get the elements */
let settingsBox = document.querySelector(".settings-box")
let toggleSettings = document.querySelector(".settings-box .toggle-settings");
let toggleSettingsIcon = document.querySelector(".settings-box .toggle-settings i");
let colorsOptions = document.querySelectorAll(".settings-box .settings-container .option ul li");
let backgroundOptions = document.querySelectorAll(".settings-box .settings-container .option .backgrounds-option span");
let bulletsOptions = document.querySelectorAll(".settings-box .settings-container .option .bullets-option span");
let resetOptions = document.querySelector(".settings-box .settings-container .reset");
/* To open the settings when clicking the icon */
toggleSettings.onclick = function () {
    if (settingsBox.classList.contains("opened")) {
        settingsBox.classList.remove("opened");
        toggleSettingsIcon.style.removeProperty("animation");
        settingsBox.style.setProperty("left", "-200px", "important");
        toggleSettings.style.setProperty("left", "0", "important");
    } else {
        settingsBox.classList.add("opened");
        toggleSettingsIcon.style.setProperty("animation", "spinner infinite linear 1.5s");
        settingsBox.style.setProperty("left", "0", "important");
        toggleSettings.style.setProperty("left", "200px", "important");
    }
}
/* To make a background color for the lis */
colorsOptions.forEach((li) => {
    li.style.setProperty("background", `${li.getAttribute("data-color")}`);
})
/* Save the main color at root And remove active class from element to add it at the active element */
if (localStorage.getItem("color")) {
    document.documentElement.style.setProperty("--main-color", `${window.localStorage.getItem("color")}`);
    colorsOptions.forEach(li => {
        li.classList.remove("active");
    });
    document.querySelector(`[data-color="${window.localStorage.getItem("color")}"]`).classList.add("active");
} else {
    document.documentElement.style.setProperty("--main-color", "#FF9800");
}
/* To use the color at the page */
colorsOptions.forEach((li) => {
    li.addEventListener("click", (e) => {
        colorsOptions.forEach(li => {
            li.classList.remove("active");
        });
        e.currentTarget.classList.add("active");
        window.localStorage.setItem("color", e.currentTarget.dataset.color);
        document.documentElement.style.setProperty("--main-color", `${e.currentTarget.dataset.color}`);
    });
});
/* To change backgrounds or no */
let backgroundOption = true;
if (localStorage.getItem("random")) {
    backgroundOptions.forEach(li => {
        li.classList.remove("active");
    });
    document.querySelector(`[data-random="${window.localStorage.getItem("random")}"]`).classList.add("active");   
} else {
    document.querySelector(`[data-random="true"]`).classList.add("active");
}
if (localStorage.getItem("random") !== null) {
    if (localStorage.getItem("random") === "true") {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }
}
backgroundOptions.forEach(span => {
    span.addEventListener("click", e => {
        backgroundOptions.forEach(span => {
            span.classList.remove("active");
        });
        e.currentTarget.classList.add("active");
        window.localStorage.setItem("random", e.currentTarget.dataset.random);
        if (e.currentTarget.dataset.random === "true") {
            backgroundOption = true;
            randomImages();
            localStorage.setItem("random", true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("random", false);
        }
    });
});
/* To return the default settings of the page */
resetOptions.onclick = function () {
    localStorage.clear();
    window.location.reload();
}
/* End Settings */
/* Start Bullets */
/* To create and get the bullets and links which in it */
let fixedBullets = document.querySelector(".fixed-bullets");
let fixedLinks = document.querySelectorAll(".fixed-bullets li");
/* To show bullets or hide it */
if (localStorage.getItem("display")) {
    fixedBullets.style.setProperty("display", `${localStorage.getItem("display")}`);
    bulletsOptions.forEach(li => {
        li.classList.remove("active");
    });
    document.querySelector(`[data-display="${window.localStorage.getItem("display")}"]`).classList.add("active");;
} else {
    document.querySelector(`[data-display="flex"]`).classList.add("active");
}
bulletsOptions.forEach(span => {
    span.addEventListener("click", (e) => {
        bulletsOptions.forEach(span => {
            span.classList.remove("active");
        });
        e.currentTarget.classList.add("active");
        window.localStorage.setItem("display", e.currentTarget.dataset.display);
        fixedBullets.style.setProperty("display", `${e.currentTarget.dataset.display}`)
    });
});
/* End Bullets */
/* Start Header */
/* To create and get the lis */
let linksBar = document.querySelector(".overlay header .container i");
let headerul = document.querySelector(".overlay header .container ul")
let headerLink = document.querySelectorAll(".overlay header .container ul li a");
linksBar.onclick = function () {
    if (!headerul.classList.contains("display")) {
        headerul.classList.add("display");
        headerul.style.setProperty("z-index", "1000");
        headerul.style.setProperty("opacity", "1");
        headerul.style.setProperty("top", "78px");
    } else {
        headerul.classList.remove("display");
        headerul.style.setProperty("opacity", "0");
        headerul.style.setProperty("top", "-215px");
        headerul.style.setProperty("z-index", "-1");
    }
}
/* Function that scroll to the section when click its link */
function scrollToSomewhere(elements) {
elements.forEach(ele => {
    ele.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: 'smooth'
    });
    });
});
}
/* To operate the function */
scrollToSomewhere(fixedLinks);
scrollToSomewhere(headerLink);
/* End Header */
/* Start Overlay */
/* To create and get the overlay */
let overlay = document.querySelector(".overlay");
/* To create a array has the images */
let randomBackground = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
/* To turn on or off the random backgrounds */
let backgroundInterval;
function randomImages() {
    if (backgroundOption) {
        backgroundInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * randomBackground.length);
            overlay.style.backgroundImage = 'url("imgs/' + randomBackground[randomNumber] + '")'
        }, 10000);
    }
}
randomImages();
/* End Overlay */
/* Start Skills */
let skills = document.querySelector(".our-skills");
let progress = document.querySelectorAll(".our-skills .skills .skill .progress .inside-progress");
window.onscroll = function () {
    if (window.scrollY >= skills.offsetTop - 600) {
        progress.forEach(div => {
            div.style.width = div.dataset.width;
        });
    }
}
/* End Skills */
/* Start Gallery */
let galleryImg = document.querySelectorAll(".our-gallery .container .gallery img");
/* To create the element when click on the image */
galleryImg.forEach(img => {
    img.addEventListener("click", (e) => {
        /* Create overlay and add it to body */
        let popupOverlay = document.createElement("div");
        popupOverlay.className = "popup-overlay";
        document.body.appendChild(popupOverlay);
        /* Create the element to put the in it and add it to body */
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";
        document.body.appendChild(popupBox);
        /* To create heading from the alternate of the image */
        let imageHeading = document.createElement("h3");
        let imageHeadingText = document.createTextNode(img.alt);
        imageHeading.appendChild(imageHeadingText);
        popupBox.appendChild(imageHeading);
        /* To create the image and put it in the box */
        let popupImage = document.createElement("img");
        popupImage.src = img.src;
        popupBox.appendChild(popupImage);
        /* Create span to close the popup */
        let close = document.createElement("span");
        close.className = "close-button";
        let closeText = document.createTextNode("X");
        close.appendChild(closeText);
        popupBox.appendChild(close);
        /* Function that close and remove the popup */
        close.onclick = function () {
            popupBox.remove();
            popupOverlay.remove();
        }
    });
});
/* End Gallery */