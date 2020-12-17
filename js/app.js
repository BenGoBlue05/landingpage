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
const sections = document.querySelectorAll('section')
const navBarList = document.getElementById('navbar__list')

let sectionMap = new Map()
let menuItemMap = new Map()

/**
 * End Global Variables
 * Start Helper Functions
 *
 *
 */
function menuListItemHtml(id, name) {
    return `<li ><a  class="menu__link" href="#${id}">${name}</a></li>`
}


function buildNav() {
    let html = ''
    sections.forEach(section => html += menuListItemHtml(section.id, section.dataset.nav))
    navBarList.insertAdjacentHTML('afterbegin', html)
}

function setUpMenuItemMap() {
    const menuItems = navBarList.querySelectorAll('a')
    menuItems.forEach(item => {
        const href = item.getAttribute('href')
        const id = href.slice(1)
        menuItemMap.set(id, item)
    })
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
buildNav()
setUpMenuItemMap()
sections.forEach(section => sectionMap.set(section.id, section))

// Add class 'active' to section when near top of viewport
const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const id = entry.target.id
        const section = sectionMap.get(id)
        const menuItem = menuItemMap.get(id)
        if (entry.isIntersecting) {
            section.classList.add('active')
            menuItem.classList.add('active')
        } else {
            section.classList.remove('active')
            menuItem.classList.remove('active')
        }
    })
}, {threshold: .6})

sections.forEach(section => intersectionObserver.observe(section))
// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active


