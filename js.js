const btnAcident = document.querySelector('.hero__btn-acident')
const acidentPlashka = document.querySelector('.acident__plashka')
const plashkaClose = document.getElementById('plashkaClose')


btnAcident.addEventListener('click', function(){
    acidentPlashka.classList.add('acident-plashka_active')
})

plashkaClose.addEventListener('click', function () {
    acidentPlashka.classList.remove('acident-plashka_active')
})

acidentPlashka.addEventListener('click', function (e) {
    // закрываем, только если кликнули ИМЕННО по тёмному фону
    if (e.target === acidentPlashka) {
        acidentPlashka.classList.remove('acident-plashka_active')
    }
})


// Слайдер

const swiper1 = new Swiper('.my-slider', {
    loop: true,
    slidesPerView: 3.5,
    spaceBetween: 34,
    initialSlide:10,
    grabCursor: false,  
     navigation: {
        prevEl: '.my-slider .swiper-button-prev',
        nextEl: '.my-slider .swiper-button-next',
    },

    breakpoints: {
        // До 1024px (мобильные, планшеты, маленькие ноутбуки)
        0: {
            slidesPerView: 2.3,
            spaceBetween:10,
        },
        // От 1024px (ноутбуки и десктопы)
        1025: {
            slidesPerView: 3.5,
            spaceBetween: 34,
        },
    },
});


//ЖК по клику
const objectModal = document.getElementById('objectModal')
const plashkaCloseObjects = document.getElementById('plashkaCloseObjects')
const modalTitle   = document.getElementById('modalTitle')
const modalAddress = document.getElementById('modalAddress')
const modalStreet  = document.getElementById('modalStreet')
const modalArea    = document.getElementById('modalArea')
const modalFloors  = document.getElementById('modalFloors')
const modalFlats   = document.getElementById('modalFlats')
const modalImg1    = document.getElementById('modalImg1')
const modalImg2    = document.getElementById('modalImg2')
const modalImg3    = document.getElementById('modalImg3')


function openObjectModal(card) {
    const d = card.dataset
    const w = window.innerWidth

    // Заполняем текстовые поля
    modalTitle.textContent   = d.title
    modalAddress.textContent = d.address
    modalStreet.textContent  = d.street
    modalArea.textContent    = d.area
    modalFloors.textContent  = d.floors
    modalFlats.textContent   = d.flats

    // Выбираем картинки в зависимости от ширины экрана
    fillImage(modalImg1, getImgSrc(d, 'img1', w), d.title)
    fillImage(modalImg2, getImgSrc(d, 'img2', w), d.title)
    fillImage(modalImg3, getImgSrc(d, 'img3', w), d.title)

    objectModal.classList.add('objects__inform-active')
    document.body.style.overflow = 'hidden'
}


// Выбор картинки по ширине экрана
function getImgSrc(data, key, width) {
    if (width <= 450) {
        return data[key + 'Phone']      // data-img1-phone → dataset.img1Phone
    }
    if (width <= 868) {
        return data[key + 'Mobile']     // data-img1-mobile → dataset.img1Mobile
    }
    return data[key]                    // data-img1 → dataset.img1
}


// --- 3. Подставить картинку или скрыть ---
function fillImage(imgEl, src, alt) {
    if (src) {
        imgEl.src = src
        imgEl.alt = alt
        imgEl.style.display = ''
    } else {
        imgEl.src = ''
        imgEl.alt = ''
        imgEl.style.display = 'none'
    }
}


function closeObjectModal() {
    objectModal.classList.remove('objects__inform-active')
    document.body.style.overflow = ''
}

document.addEventListener('click', (e) => {
    const card = e.target.closest('.object__item')
    if (card && card.dataset.title) {
        openObjectModal(card)
    }
})

plashkaCloseObjects.addEventListener('click', closeObjectModal)
objectModal.addEventListener('click', (e) => {
    if (e.target === objectModal) {
        closeObjectModal()
    }
})
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && objectModal.classList.contains('objects__inform-active')) {
        closeObjectModal()
    }
})


//Лицензий
const btnLicence = document.querySelector('.privilege__btn')
const licencePlashka = document.querySelector('.privilege__plashka')
const closeLicence = document.getElementById('privilegePlashkaClose')

btnLicence.addEventListener('click', function(){
    licencePlashka.classList.add('privilege__plashka_active')
})

closeLicence.addEventListener('click', function(){
    licencePlashka.classList.remove('privilege__plashka_active')
})

licencePlashka.addEventListener('click', function (e) {
    if(e.target === licencePlashka){
        licencePlashka.classList.remove('privilege__plashka_active')
    }
    
})


// ====================================================
//  БУРГЕР-МЕНЮ
// ====================================================

const burgerBtn    = document.getElementById('burgerBtn')
const closeMenuBtn = document.getElementById('closeMenu')
const mobileMenu   = document.getElementById('mobileMenu')
const menuOverlay  = document.getElementById('menuOverlay')

function openMenu() {
    mobileMenu.classList.add('active')
    menuOverlay.classList.add('active')
    document.body.classList.add('menu-open')
    burgerBtn.setAttribute('aria-expanded', 'true')
}

function closeMenu() {
    mobileMenu.classList.remove('active')
    menuOverlay.classList.remove('active')
    document.body.classList.remove('menu-open')
    burgerBtn.setAttribute('aria-expanded', 'false')
}

burgerBtn.addEventListener('click', openMenu)
closeMenuBtn.addEventListener('click', closeMenu)
menuOverlay.addEventListener('click', closeMenu)

// Клик по ссылке — закрываем меню и переходим
const menuLinks = document.querySelectorAll('.header__menu-link')
menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu)
})

// Escape — закрыть
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMenu()
    }
})

// При разворачивании на десктоп — закрыть меню
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && mobileMenu.classList.contains('active')) {
        closeMenu()
    }
})



// ====================================================
//  АНИМАЦИЯ ПОЯВЛЕНИЯ ПО СКРОЛЛУ
// ====================================================

const animatedElements = document.querySelectorAll('.animate')

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible')
                observer.unobserve(entry.target)   // одноразовая анимация
            }
        })
    },
    {
        threshold: 0.15,                          // сработает, когда 15% блока видно
        rootMargin: '0px 0px -50px 0px'           // сработает чуть заранее
    }
)

animatedElements.forEach((el) => observer.observe(el))




// ====================================================
//  ЛОГИКА COOKIE-ПЛАШКИ
// ====================================================

document.addEventListener('DOMContentLoaded', () => {
    const cookiePlashka = document.getElementById('cookiePlashka');
    const cookieAccept = document.getElementById('cookieAccept');

    // Если согласия нет — показываем
    if (!localStorage.getItem('cookieConsent_Ostrog')) {
        setTimeout(() => {
            cookiePlashka.classList.add('active');
        }, 1500); // Появится через 1.5 секунды, чтобы не отвлекать сразу
    }

    // По клику — сохраняем и прячем
    cookieAccept.addEventListener('click', () => {
        localStorage.setItem('cookieConsent_Ostrog', 'true');
        cookiePlashka.classList.remove('active');
    });
});