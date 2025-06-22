console.warn('Developed by Grab Digital 2025')

window.addEventListener("DOMContentLoaded", () => {

    initMaskTel();
    initFancy();
    initScroll();
    filter()
    initProfitsSwiper()
    AOS.init()
    // initCustomSelect();
    // initMobileBurger();
    // initSelects()
    // initNouislider()

    function initScroll() {
        window.addEventListener('scroll', (e) => {
            if (pageYOffset > 70) {
                $('header').addClass('js-scroll')
            } else {
                $('header').removeClass('js-scroll')
            }
        })
    }

    function initCustomSelect() {
        $('select').select2({
            width: '100%',
        });
    };

    function initFancy() {
        Fancybox.bind("[data-fancybox]", {
            // Your custom options
        });
        Fancybox.defaults.autoFocus = false;
    }

    function initMaskTel() {
        // Маска для телефона
        $.fn.setCursorPosition = function (pos) {
            if ($(this).get(0).setSelectionRange) {
                $(this).get(0).setSelectionRange(pos, pos);
            } else if ($(this).get(0).createTextRange) {
                var range = $(this).get(0).createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };
        $.mask.definitions['~'] = '[49]';
        $("input[type='tel']").click(function () {
            $(this).setCursorPosition(4);
        }).mask("+7 (~99) 999-99-99", {
            placeholder: "_"
        });
    }

    function initMobileBurger() {
        const hamMenu = document.querySelector('.header-ham-menu')
        const hamMenuSpan = document.querySelectorAll('.header-ham-menu span')
        const navMenuMob = document.querySelector('.header-nav-menu-mob')
        const body = document.querySelector('body')
        const tel = document.querySelectorAll('.header-tel')
        const logo = document.querySelector('.header-logo')
        const main = document.querySelector('main')
        const headerBorderMob = document.querySelector('.header-nav-box')
        const headerBox = document.querySelector('.header-box')
        const nameTheme = document.querySelector('.header-logo').dataset.theme
        
        hamMenu.addEventListener('click', function () {
            hamMenu.classList.toggle('active')
            navMenuMob.classList.toggle('active')
            main.classList.toggle('blur')
            body.classList.toggle('overflow')
            // headerBorderMob.classList.toggle('js-border-none')
            tel.forEach(function (item) {
                item.classList.toggle('black')
            })
            if (hamMenu.classList.contains('active')) {
                // logo.setAttribute('src', `../themes/${nameTheme}/assets/img/svg/logo-black.svg`)
                logo.setAttribute('src', `./assets/img/svg/logo-black.svg`)
                headerBox.style.setProperty('background', '#fff')
        
                headerBorderMob.style.setProperty('border-bottom-color', '#000')
            } else {
                // logo.setAttribute('src', `../themes/${nameTheme}/assets/img/svg/logo.svg`)
                logo.setAttribute('src', `./assets/img/svg/logo.svg`)
                headerBox.style.setProperty('background', 'none')
                headerBorderMob.style.setProperty('border-bottom-color', 'rgba(246, 246, 246, 0.6)')
            }
        })
        
        main.addEventListener('click', function () {
            hamMenu.classList.remove('active')
            navMenuMob.classList.remove('active')
            main.classList.remove('blur')
            body.classList.remove('overflow')
            tel.forEach(function (item) {
                item.classList.remove('black')
            })
            // logo.setAttribute('src', `../themes/${nameTheme}/assets/img/svg/logo.svg`)
                logo.setAttribute('src', `./assets/img/svg/logo.svg`)
            headerBox.style.setProperty('background', 'none')
            headerBorderMob.style.setProperty('border-bottom-color', 'rgba(246, 246, 246, 0.6)')
        })
        
        const li = document.querySelectorAll('.js-nav-link')
        
        li.forEach(function (item) {
            item.addEventListener('click', function () {
                hamMenu.classList.toggle('active')
                navMenuMob.classList.toggle('active')
                main.classList.remove('blur')
                body.classList.toggle('overflow')
                // tel.classList.toggle('black')
                tel.forEach(function (item) {
                    item.classList.remove('black')
                })
                // logo.setAttribute('src', `../themes/${nameTheme}/assets/img/svg/logo.svg`)
                logo.setAttribute('src', `./assets/img/svg/logo.svg`)
                headerBox.style.setProperty('background', 'none')
                headerBorderMob.style.setProperty('border-bottom-color', 'rgba(246, 246, 246, 0.6)')
            })
        })
    }

    function initProfitsSwiper() {
        var swiper = new Swiper('.profits__list', {
            direction: 'horizontal',
            slidesPerView: 'auto',
            centeredSlides: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                991: {
                    enabled: false,
                },
            },
        })
    }
    
    function initSelects() {
        new SlimSelect({
            select: '#selectModel',
            settings: {
                placeholderText: 'Выберите модель',
            }
        })
        new SlimSelect({
            select: '#selectEquip',
            settings: {
                placeholderText: 'Выберите комплектацию',
            }
        })
        new SlimSelect({
            select: '#selectSort',
            settings: {
                placeholderText: 'Сортировка по цене',
            }
        })

    }

    function initNouislider() {
        var slider1 = document.getElementById('calc-range');
        const slider1Value = document.getElementById('calc-range-value')

        noUiSlider.create(slider1, {
            start: 40,
            step: 10,
            behaviour: 'snap',
            connect: [true, false],
            range: {
                'min': 0,
                'max': 100
            }
        });

        slider1.noUiSlider.on('update', function (values) {
            let number = parseFloat(values[0].replace(".00", ""))
            slider1Value.innerHTML = number + ' %'
        });
        var slider2 = document.getElementById('calc-range2');
        const slider2Value = document.getElementById('calc-range-value2')

        noUiSlider.create(slider2, {
            start: 40,
            step: 1,
            behaviour: 'snap',
            connect: [true, false],
            range: {
                'min': 6,
                'max': 84
            }
        });

        slider2.noUiSlider.on('update', function (values) {
            let number = parseFloat(values[0].replace(".00", ""))
            slider2Value.innerHTML = number + ' мес.'
        });
    }

    function filter() {
        const filterButtons = document.querySelectorAll('.projects__tabs-item');
        const portfolioItems = document.querySelectorAll('.projects__cards-item');
        const loadMoreBtn = document.querySelector('.projects__showmore');
        
        let visibleItems = 6;
        let currentFilter = 'all';

        function initPortfolio() {
            portfolioItems.forEach((item, index) => {
                if (index >= visibleItems) {
                    item.classList.add('projects__cards-item--hidden');
                }
            });
            
            updateLoadMoreButton();
        }

        function updateLoadMoreButton() {
            const filteredItems = Array.from(portfolioItems).filter(item => {
                const matchesFilter = currentFilter === 'all' || 
                                item.dataset.category === currentFilter;
                return matchesFilter && !item.classList.contains('projects__cards-item--filtered');
            });
            
            const hiddenItems = filteredItems.filter(item => {
                return item.classList.contains('projects__cards-item--hidden');
            }).length;

            if (loadMoreBtn) {
                loadMoreBtn.style.display = hiddenItems > 0 ? 'block' : 'none';
            }
        }

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Активируем текущую кнопку фильтра
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                currentFilter = this.dataset.filter;
                visibleItems = 6; // Сбрасываем счетчик
                
                // Применяем фильтр
                portfolioItems.forEach((item, index) => {
                    const matchesFilter = currentFilter === 'all' || 
                                    item.dataset.category === currentFilter;
                    
                    if (matchesFilter) {
                        item.classList.remove('projects__cards-item--filtered');
                        item.classList.toggle('projects__cards-item--hidden', index >= visibleItems);
                    } else {
                        item.classList.add('projects__cards-item--filtered');
                    }
                });
                
                updateLoadMoreButton();
            });
        });

        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function() {
                visibleItems += 6;
                
                portfolioItems.forEach((item, index) => {
                    const matchesFilter = currentFilter === 'all' || 
                                    item.dataset.category === currentFilter;
                    
                    if (matchesFilter && !item.classList.contains('projects__cards-item--filtered') && 
                        index < visibleItems) {
                        item.classList.remove('projects__cards-item--hidden');
                    }
                });
                
                updateLoadMoreButton();
            });
        }

        initPortfolio();
    }
})

