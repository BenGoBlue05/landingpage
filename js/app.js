/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 */

const sections = document.querySelectorAll('section')
const navBarList = document.getElementById('navbar__list')

// map of section id to section
let sectionMap = new Map()

// map of section id to menu item
let menuItemMap = new Map()

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

function menuListItemHtml(id, name) {
    return `<li ><a  class="menu__link" href="#${id}">${name}</a></li>`
}

function buildNav() {
    // create html for menu list items that correspond to section for navigating to on click
    let html = ''
    sections.forEach(section => html += menuListItemHtml(section.id, section.dataset.nav))
    navBarList.insertAdjacentHTML('afterbegin', html)

    populateSectionMap()
    setUpMenuItems()
}

function setUpMenuItems() {
    const menuItems = navBarList.querySelectorAll('a')
    menuItems.forEach(item => {
        const href = item.getAttribute('href')

        // remove the '#' from href
        const sectionId = href.slice(1)

        // populate map of section id to corresponding menu item
        menuItemMap.set(sectionId, item)
        item.addEventListener('click', e => {
            e.preventDefault()
            const target = e.target
            if (target instanceof HTMLElement && target.hasAttribute('href')) {
                const sectionId = target.getAttribute('href').slice(1)
                sectionMap.get(sectionId).scrollIntoView({behavior: "smooth"})
            }
        })
    })
}

// populates map of section id to section
function populateSectionMap() {
    sections.forEach(section => sectionMap.set(section.id, section))
}

function observeInteractions() {
    sections.forEach(section => intersectionObserver.observe(section))
}

buildNav()
observeInteractions()

