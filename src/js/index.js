/*==================== SHOW NAVBAR ====================*/
const showMenu = (headerToggle, navbarId) =>{
    const toggleBtn = document.getElementById(headerToggle),
    nav = document.getElementById(navbarId)
    
    // Validate that variables exist
    if(headerToggle && navbarId){
        toggleBtn.addEventListener('click', ()=>{
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu')
            // change icon
            toggleBtn.classList.toggle('bx-x')
        })
    }
}
showMenu('nav-toggle','navbar')

/*==================== LINK ACTIVE ====================*/
const linkColor = document.querySelectorAll('.nav__link')

function colorLink(){
    linkColor.forEach(l => l.classList.remove('active'))
    this.classList.add('active')
}

linkColor.forEach(l => l.addEventListener('click', colorLink))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav a[href*=' + sectionId + ']').classList.add('active')
        }else{
            document.querySelector('.nav a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
     reset: true
});

sr.reveal('.home__data ',{}); 
sr.reveal('.home__photo',{delay: 700}); 
sr.reveal('.home__title, home__subtitle',{ delay: 300}); 
sr.reveal(' .home__name',{ delay: 400}); 
sr.reveal(' .home__button',{delay: 500}); 


sr.reveal('.about__photo',{delay: 700}); 
sr.reveal('.about__title, about__subtitle',{ delay: 300}); 
sr.reveal('.about__info',{ delay: 400}); 
sr.reveal(' .home__button',{delay: 500}); 

sr.reveal('.contact__title',{delay: 700}); 
sr.reveal('.contact__input, about__subtitle',{ delay: 400}); 
sr.reveal('.contact__textarea',{ delay: 500}); 
sr.reveal(' .contact__button',{delay: 700}); 

