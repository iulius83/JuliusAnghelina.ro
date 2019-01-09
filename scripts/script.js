// homepage functions
const panels = document.querySelectorAll('.panel');

function toggleOpen() {
    this.classList.toggle('open');
}

function toggleActive(e) {
    if (e.propertyName.includes('flex')) {
        this.classList.toggle('open-active');
    }
    setTimeout(() => {
        window.location.href = `${this.classList[1]}.php`;
    }, 1300);
}

panels.forEach(panel => panel.addEventListener('click', toggleOpen));
panels.forEach(panel => panel.addEventListener('transitionend', toggleActive));

// generate the header -------------
function whereAmI() {
    let header = document.getElementById('header');
    let id = window.location.toString().split('ro/')[1].split('.')[0];
    header.classList.add(id);

    if (id === 'design') {
        header.innerHTML = ` 
            <h2><a href="index.php">JuliusAnghelina.ro</a></h2>
            <h1>3D ${id}</h1>
        `;
    } else if (id === 'javascript') {
        header.innerHTML = ` 
            <h2><a href="index.php">JuliusAnghelina.ro</a></h2>
            <h1>Web Development&nbsp;</h1>
        `;
    } else if (id === 'photography') {
        header.innerHTML = ` 
            <h2><a href="index.php">JuliusAnghelina.ro</a></h2>
            <h1>${id}</h1>  
            <div class='slide1'></div>
            <div class='slide2'></div>
            <div class='slide3'></div>
        `;
    } else {
        header.innerHTML = ` 
            <h2><a href="index.php">JuliusAnghelina.ro</a></h2>
            <h1>${id}</h1>
        `;
    }
}

// navigation and content ----------------------------------------------
const nav = document.querySelector("#main");
const topOfNav = nav.offsetTop;
function fixNav() {
    if (window.scrollY >= topOfNav) {
        document.body.style.paddingTop = nav.offsetHeight + 'px';
        document.body.classList.add('fixed-nav');
    } else {
        document.body.style.paddingTop = 0;
        document.body.classList.remove('fixed-nav');
    }
}
window.addEventListener('scroll', fixNav);

function showHamburger() {
    var nav = document.getElementById("main");
    if (nav.className === "navigation") {
        nav.className += " responsive";
    } else {
        nav.className = "navigation";
    }
}



// portfolio links
let portfolioLink = document.querySelectorAll('.box').forEach(element => {
    element.addEventListener('mouseover', function () {
        element.addEventListener('mouseenter', function () {
            element.firstElementChild.firstElementChild.style.filter = "blur(6px)";
            element.firstElementChild.firstElementChild.style.transform = "scale(1.3)";
            element.lastElementChild.style.display = "block";
            element.lastElementChild.style.opacity = "0";
            setTimeout(() => element.lastElementChild.style.opacity = "100", 300);
        });
    });
    element.addEventListener('mouseleave', function () {
        element.firstElementChild.firstElementChild.style.transform = "scale(1)";
        element.lastElementChild.style.opacity = "0";
        element.lastElementChild.style.display = "none";
        element.firstElementChild.firstElementChild.style.filter = "none";
    });
});

// loop thorough photos and create the sliders
function generateImages(noOfImages, category) {
    let slider = document.getElementById(`${category}-slider`);
    let generatedBody = '';

    for (let i = 1; i <= noOfImages; i++) {
        generatedBody += `
        <div class="mySlides fade">
            <div class="numbertext">${category} - ${i} / ${noOfImages}</div>
            <img src="http://www.juliusanghelina.ro/images/photography/${category}/photographer-${category}-${i}.jpg">
            <div class="text">JuliusAnghelina.ro</div>
        </div>
        `;
    }
    generatedBody += `
        <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
        <a class="next" onclick="plusSlides(1)">&#10095;</a>`;

    slider.innerHTML = generatedBody;
}

// code for the slider ----------------
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");

    if (slides.length > 0) {
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        slides[slideIndex - 1].style.display = "block";

        if (dots.length > 0) {
            for (let i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
            }

            dots[slideIndex - 1].className += " active";
        }
    }
}

// image comparison slider --------
(function () {
    let elsH = document.querySelectorAll(".image-spliter .mover");
    let i = elsH.length;
    while (i--) {
        var moverWidth = elsH[i].getBoundingClientRect().width;
        var imgLeft = elsH[i].nextElementSibling;
        var width = imgLeft.getBoundingClientRect().width;
        var height = imgLeft.getBoundingClientRect().height;
        elsH[i].style.left = width / 2 - moverWidth / 2 + 'px';
        //imgLeft.style.clip = "rect(0px, " + width / 2 + "px, " + height + "px, 0px)";
        imgLeft.style.clip = "rect(0px, " + width / 2 + "px, 999px, 0px)";
        var mouseDownX = 0;
        var X;
        elsH[i].addEventListener("mousedown", function (e) {
            X = e.clientX;
            mouseDownX = 1;
        });
        elsH[i].addEventListener("mouseup", function (e) {
            mouseDownX = 0;
        });
        elsH[i].addEventListener("mouseout", function (e) {
            mouseDownX = 0;
        });

        elsH[i].addEventListener("touchstart", function (e) {
            X = e.touches[0].clientX;
            mouseDownX = 1;
        });
        elsH[i].addEventListener("touchend", function (e) {
            mouseDownX = 0;
        });

        elsH[i].addEventListener("mousemove", function (e) {
            if (mouseDownX) {
                this.style.left = parseInt(this.style.left) + (event.clientX - X) + "px";
                X = event.clientX;
                this.nextElementSibling.style.clip = "rect(0px, " + (this.getBoundingClientRect().width / 2 + parseInt(this.style.left)) + "px, " + this.getBoundingClientRect().height + "px, 0px)";
            }
        });

        elsH[i].addEventListener("touchmove", function (e) {
            if (mouseDownX) {
                this.style.left = parseInt(this.style.left) + (e.touches[0].clientX - X) + "px";
                X = e.touches[0].clientX;
                this.nextElementSibling.style.clip = "rect(0px, " + (this.getBoundingClientRect().width / 2 + parseInt(this.style.left)) + "px, " + this.getBoundingClientRect().height + "px, 0px)";
            }
        });

    }


    window.addEventListener("resize", function (f) {
        var elsHre = document.querySelectorAll(".image-spliter .mover");
        var ii = elsHre.length;
        while (ii--) {
            var moverWidth = elsHre[ii].getBoundingClientRect().width;
            var imgLeft = elsHre[ii].nextElementSibling;
            var width = imgLeft.getBoundingClientRect().width;
            var height = imgLeft.getBoundingClientRect().height;
            elsHre[ii].style.left = width / 2 - moverWidth / 2 + 'px';
            imgLeft.style.clip = "rect(0px, " + width / 2 + "px, " + height + "px, 0px)";
        }
    });

})();