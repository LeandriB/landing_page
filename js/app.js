

/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const navigation = document.querySelector('#navbar_list');
const sections = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function getActiveSection() {
    activeSection = sections[0];
    min = 10000;
    for (section of sections) {
        let position = section.getBoundingClientRect();
        if (position.top > -300 & position.top < min) {
            min = position.top;
            activeSection = section;
        };
    };
    return activeSection;
};


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Build the navigation menu
function buildNav() {
    for(let i = 1; i <= 4; i++) { 
        let navLi = document.createElement('li')
        navLi.className = 'nav_link';
        navLi.dataset.nav = `#section${i}`;
        const navAnchor = document.createElement('a'); 
        const navAnchorTag = `#section${i}`;
        navAnchor.innerHTML = "Section " + i; 
        // Adding the a tag inside the li tag
        navLi.appendChild(navAnchor); 
    
        navAnchor.setAttribute('href', navAnchorTag);

        // Adding the li tag inside the ul tag
        navigation.appendChild(navLi);
        
    }; 
    

};


// Add class 'active' to section when near top of viewport
function active() {
    window.addEventListener('scroll', function () {
        let section = getActiveSection();
        section.classList.add('your-active-class');
        // remove active from other section
        for (let i of sections) {
            if (i.id != section.id & i.classList.contains('your-active-class')) {
                i.classList.remove('your-active-class');
            }
        }
    });
};


// Scroll to anchor ID using scrollTO event
function scroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                block: 'center', behavior: 'smooth'
            });

        });

    });
};


// Scroll to Top by clicking the button in the footer
function scrollToTop() {
    const scrollTop = document.querySelector('.page_footer');
    const button = document.createElement('button');
    
    button.innerHTML = 'Scroll To Top';
    button.setAttribute('type', 'button');
    scrollTop.appendChild(button);

    button.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.main_hero').scrollIntoView({
            block: 'center', behavior: 'smooth'
        })
    })
};

// Function to hide/show navigation bar on scroll 
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
    document.querySelector('header').style.top = '0';
    } else {
        document.querySelector('header').style.top = '-100px';
        // reset the header top style after a short delay
        setTimeout(function() {
            document.querySelector('header').style.top = '0';
        }, 1500);
    }
    prevScrollpos = currentScrollPos;
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();
// Scroll to section on link click
scroll();
// Set sections as active
active();

scrollToTop();

