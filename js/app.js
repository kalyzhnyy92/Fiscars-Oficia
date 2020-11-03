'use strict';

jQuery($ => {

    //Responsive hamburger menu
    $(document).ready(function () {
        $(".mobile__btn-open").click(function (e) {
            $(".mobile__overlay").addClass("show-menu");
            e.preventDefault();
        });
        $(".mobile__btn-close").click(function (e) {
            $(".mobile__overlay").removeClass("show-menu");
            e.preventDefault();
        });
    });

    // open mobile menu
    $(document).ready(function () {
        $('.js-toggle-menu').click(function (e) {
            e.preventDefault();
            $('.mobile__menu').slideToggle();
            $(this).toggleClass('open');
        });
    });

    // Mobile filters
    $(document).ready(function () {
        var filters = $('.js-filters'),
            wrapper = filters.find('.js-filters-wrapper'),
            bg = filters.find('.js-filters-bg'),
            back = filters.find('.js-filters-back'),
            open = $('.js-filters-open'),
            html = $('html'),
            body = $('body');

        // button open
        open.on('click', function () {
            wrapper.addClass('visible');
            bg.addClass('visible');
            html.addClass('no-scroll');
            body.addClass('no-scroll');
        });

        // button back
        back.on('click', function () {
            wrapper.removeClass('visible');
            bg.removeClass('visible');
            html.removeClass('no-scroll');
            body.removeClass('no-scroll');
        });

        // overlay
        bg.on('click', function () {
            wrapper.removeClass('visible');
            bg.removeClass('visible');
            html.removeClass('no-scroll');
            body.removeClass('no-scroll');
        });
    });

    // mobile accordion menu
    var accordion = function () {
        var $accordion = $('.js-accordion');
        var $accordion_header = $accordion.find('.js-accordion-header');
        var $accordion_item = $('.js-accordion-item'); // default settings 

        var settings = {
            // animation speed
            speed: 400,
            // close all other accordion items if true
            oneOpen: false
        };
        return {
            // pass configurable object literal
            init: function ($settings) {
                $accordion_header.on('click', function () {
                    accordion.toggle($(this));
                });
                $.extend(settings, $settings); // ensure only one accordion is active if oneOpen is true

                if (settings.oneOpen && $('.js-accordion-item.active').length > 1) {
                    $('.js-accordion-item.active:not(:first)').removeClass('active');
                }

                // reveal the active accordion bodies
                $('.js-accordion-item.active').find('> .js-accordion-body').show();
            },
            toggle: function ($this) {
                if (settings.oneOpen && $this[0] != $this.closest('.js-accordion').find('> .js-accordion-item.active > .js-accordion-header')[0]) {
                    $this.closest('.js-accordion').find('> .js-accordion-item').removeClass('active').find('.js-accordion-body').slideUp();
                }

                // show/hide the clicked accordion item
                $this.closest('.js-accordion-item').toggleClass('active');
                $this.next().stop().slideToggle(settings.speed);
            }
        };
    }();

    $(document).ready(function () {
        accordion.init({
            speed: 300,
            oneOpen: true
        });
    });

    // Переключение языков ukr/rus
    $('.header__language').click(function () {
        $('.header__link-tongue').toggle();
    });

    // Слайдер slider
    const initBasketSlider = () => {
        $('.minimum__slider').slick({
            arrows: true, // показать стрелки
            dots: false,// не показывать точки
            slidesToShow: 3,// показывать по 3 слайда
            slidesToScroll: 1,
            // autoplay: true, // автоматическое проигрывание слайдов
            // speed:1000,
            // autoplaySpeed:800,
            rows: 0,
            adaptiveHeight: false,
            infinite: true,
            appendArrows: $('.minimum__button'),
            prevArrow: "<button class='minimum__prev'><svg class='minimum__icon' width='70' height='24' viewBox='0 0 70 24'><use xlink:href='img/svg/button-left-arrow.svg#button-left'></use></svg></button>",
            nextArrow: "<button class='minimum__next'><svg class='minimum__icon' width='70' height='24' viewBox='0 0 70 24'><use xlink:href='img/svg/button-right-arrow.svg#button-right'></use></svg></button>",
            responsive: [{
                breakpoint: 830,
                settings: {
                    slidesToShow: 2
                }
            }, {
                breakpoint: 520,
                settings: {
                    slidesToShow: 1
                }
            }]
        });
    }

    const destroyBasketSlider = () => $('.minimum__slider').slick('unslick');

    const showPopupPreloader = (popup) => {
        const preloader = popup.querySelector('.popup-preloader')
        const content = popup.querySelector('.popup-content')

        if (preloader && content) {
            preloader.style.display = ''
            content.style.display = 'none'
        }
    }

    const hidePopupPreloader = (popup) => {
        const preloader = popup.querySelector('.popup-preloader')
        const content = popup.querySelector('.popup-content')

        if (preloader && content) {
            preloader.style.display = 'none'
            content.style.display = ''
        }
    }

    let contentPreloaderTimer;


    // Вход в личный кабинет и Регистрация
    $(document).ready(function () {
        const commonOptions = {
            type: 'inline',
            preloader: false,
            focus: '#name',
            // When elemened is focused, some mobile browsers in some cases zoom in
            // It looks not nice, so we disable it:
            callbacks: {
                beforeOpen: function () {
                    if ($(window).width() < 700) {
                        this.st.focus = false;
                    } else {
                        this.st.focus = '#name';
                    }
                    console.log('sdfsdfsdfs')
                },
                open: function () {
                    const popup = this.content[0];
                    showPopupPreloader(popup);
                    contentPreloaderTimer = setTimeout(() => {
                        hidePopupPreloader(popup);
                    }, 1000)
                },
                close: () => {
                    clearTimeout(contentPreloaderTimer)
                }
            }
        }
        $('.popup-with-form').magnificPopup(commonOptions);
        $('.basket-popup').magnificPopup({
            ...commonOptions,
            callbacks: {
                ...commonOptions.callbacks,
                open: function () {
                    const popup = this.content[0];
                    showPopupPreloader(popup);
                    contentPreloaderTimer = setTimeout(() => {
                        hidePopupPreloader(popup);
                        initBasketSlider();
                    }, 1000)
                },
                close: () => {
                    destroyBasketSlider();
                    clearTimeout(contentPreloaderTimer)
                }
            },
        });
    });

    // При нажатии на кнопку - появляется меню, при последующем нажатии - закрывается.
    $(document).ready(function () {
        $(".header__btn").on("click", function () {
            $(".hide__menu").toggle();
            $(".header__btn").toggleClass('active');
        });
    });

    // Форма для поиска
    $(document).ready(function () {
        ['.header__primary', '.header__secondary'].forEach(selector => {
            const header = document.querySelector(selector);
            const searchForm = header.querySelector('.search__form'); // Форма

            const searchInput = header.querySelector('.search__input'); // Фильтр поиск (одно поле)

            const searchResetButton = header.querySelector('.search__reset'); // Очистка фильтра

            searchForm.addEventListener('submit', e => {
                e.preventDefault();
            });

            searchInput.addEventListener('input', e => {
                const val = e.target.value.trim();

                if (val) {
                    searchResetButton.classList.add('active');
                } else {
                    searchResetButton.classList.remove('active');
                }
            });

            // Очистка фильтра searchResetButton
            searchResetButton.addEventListener('click', () => {
                searchInput.value = '';
                searchResetButton.classList.remove('active');
            });
        })

    });

    // Слайдер slider
    $(document).ready(function () {
        $('.slider__slick').slick({
            arrows: false,
            dots: true,
            autoplay: true,
            autoplaySpeed: 2000
        });
    });

    // Слайдер slick Product goods
    $(document).ready(function () {
        $('.product__slider').slick({
            arrows: true,// показать стрелки
            dots: false,// не показывать точки
            slidesToShow: 4,// показывать по 4 слайда
            slidesToScroll: 1,
            // autoplay: true, // автоматическое проигрывание слайдов
            speed: 1000,
            // autoplaySpeed:800,
            // variableWidth: false,
            rows: 0,
            adaptiveHeight: true,
            infinite: true,
            appendArrows: $('.product__button'),
            prevArrow: "<button class='product__prev'><svg class='product__icon' width='70' height='24' viewBox='0 0 70 24'><use xlink:href='img/svg/button-left-arrow.svg#button-left'></use></svg></button>",
            nextArrow: "<button class='product__next'><svg class='product__icon' width='70' height='24' viewBox='0 0 70 24'><use xlink:href='img/svg/button-right-arrow.svg#button-right'></use></svg></button>",
            responsive: [{
                breakpoint: 1150,
                settings: {
                    slidesToShow: 3
                }
            }, {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2
                }
            }, {
                breakpoint: 540,
                settings: {
                    slidesToShow: 1
                }
            }]
        });
    });

    // button icon chosen
    $(document).ready(function () {
        $(".js-btn__chosen").click(function (e) {
            e.preventDefault();
            $(this).toggleClass("active");
        });
    });

    // Слайдер slick Stock
    $(document).ready(function () {
        $('.stock__slider').slick({
            arrows: true,// показать стрелки
            dots: false,// не показывать точки
            slidesToShow: 2,// показывать по 2 слайда
            slidesToScroll: 1,
            // autoplay: true, // автоматическое проигрывание слайдов
            // speed:1000,
            // autoplaySpeed:800,
            // variableWidth: false,
            rows: 0,
            adaptiveHeight: true,
            infinite: true,
            responsive: [{
                breakpoint: 1605,
                settings: {
                    slidesToShow: 2
                }
            }, {
                breakpoint: 1320,
                settings: {
                    slidesToShow: 2
                }
            }, {
                breakpoint: 620,
                settings: {
                    slidesToShow: 1
                }
            }]
        });
    });

    // Слайдер slick Stock
    $(document).ready(function () {
        var $status = $('.popular__count');
        var $slickElement = $('.popular__slider');
        $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
            //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
            var i = (currentSlide ? currentSlide : 0) + 1;
            $status.html('<span class="status__number">' + i + '</span>' + ' / ' + slick.slideCount);
        });
        $slickElement.slick({
            arrows: true,// показать стрелки
            dots: false,// не показывать точки
            slidesToShow: 1,// показывать по 1 слайда
            slidesToScroll: 1,
            rows: 0,
            adaptiveHeight: true,
            infinite: true,
            appendArrows: $('.popular__button'),
            prevArrow: "<button class='popular__prev'><svg class='popular__icon' width='70' height='24' viewBox='0 0 70 24'><use xlink:href='img/svg/button-left-arrow.svg#button-left'></use></svg></button>",
            nextArrow: "<button class='popular__next'><svg class='popular__icon' width='70' height='24' viewBox='0 0 70 24'><use xlink:href='img/svg/button-right-arrow.svg#button-right'></use></svg></button>"
        });
    });

    // Прокручивает страницу вверх при нажатии на кнопку
    $(window).scroll(function () {
        var height = $(window).scrollTop();

        if (height > 100) {
            $('.js-btn-top').fadeIn();
        } else {
            $('.js-btn-top').fadeOut();
        }
    });
    $(document).ready(function () {
        $(".js-btn-top").click(function (event) {
            event.preventDefault();
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
            return false;
        });
    });

    // $('.checkbox__link').on('change', function () {
    //     $('.checkbox__link').not(this).prop('checked', false);
    // });


    // Слайдер slick
    $(document).ready(function () {

        // Слайдер slick справа превью
        $('.product-resume__slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.product-resume__slider-nav',
            rows: 0,
            adaptiveHeight: true,
            infinite: true,
            responsive: [{
                breakpoint: 720,
                settings: {
                    slidesToShow: 1,
                    dots: true
                }
            }]
        });

        // Слайдер slick слева слайдер
        $('.product-resume__slider-nav').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: '.product-resume__slider-for',
            dots: false, // не показывать точки
            arrows: false, // не показывать стрелки
            focusOnSelect: true,
            verticalSwiping: true,
            vertical: true,
            rows: 0,
            adaptiveHeight: true,
            infinite: true,
        });

        $('a[data-slide]').click(function (e) {
            e.preventDefault();
            var slideno = $(this).data('slide');
            $('.product-resume__slider-nav').slick('slickGoTo', slideno - 1);
        });

        $('.product-resume__picture').zoom({
            magnify: 2
        });

    });

    // plus/minus input counter
    $(document).ready(function () {
        $('.counter__minus').click(function () {
            var $input = $(this).parent().find('input');
            var count = parseInt($input.val()) - 1;
            count = count < 1 ? 1 : count;
            $input.val(count);
            $input.change();
            return false;
        });
        $('.counter__plus').click(function () {
            var $input = $(this).parent().find('input');
            $input.val(parseInt($input.val()) + 1);
            $input.change();
            return false;
        });
    });

    // Показать все характеристики и Свернуть характеристики
    $(document).ready(function () {
        var el = $('.js-characteristics'),
            curHeight = el.height(),
            autoHeight = el.css('height', 'auto').height();
        el.height(curHeight);
        $(".js-characteristics__more").click(function (e) {
            var link = document.querySelector('.characteristics__more');
            e.preventDefault();

            if (el.height() == 246) {
                el.height(curHeight).animate({
                    height: autoHeight
                }, 600);
                link.innerText = link.getAttribute('data-text-hide');
            } else {
                el.height(autoHeight).animate({
                    height: curHeight
                }, 600);
                link.innerText = link.getAttribute('data-text-show');
            }
        });
    });

    // Сортировать
    $(document).ready(function () {
        $(".catalog__link").click(function () {
            $(".catalog__link").removeClass("active");
            $(this).addClass("active");
        });
    });

    //validation форм name и email
    $(document).ready(function () {
        $.validator.addMethod("firstname", function (value, element) {
            return this.optional(element) || /^[А-Яа-яіA-Za-z\s-]*$/.test(value);
        }, "Имя должно состоять только с букв, пробелов или дефисов");
        $.validator.addMethod("checkMask", function (value, element) {
            return this.optional(element) || /\+\d{2}\(\d{3}\)\s\d{3}-\d{2}-\d{2}/g.test(value);
        });
        $.validator.addMethod("email", function (value, element) {
            return this.optional(element) || /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
        }, "Некорректный Email");
        $('form').each(function () {
            $(this).validate({
                rules: {
                    name: {
                        required: true,
                        firstname: true,
                        rangelength: [2, 20]
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    phone: {
                        required: true,
                        checkMask: true,
                    },
                    comment: {
                        required: true
                    },
                    text: {
                        required: true
                    },
                    surname: {
                        required: true
                    }
                },
                messages: {
                    name: {
                        required: "Введите имя",
                        rangelength: "Имя должно быть от {0} до {1} символов"
                    },
                    email: {
                        required: "Введите Email",
                        email: "Некорректный Email"
                    },
                    phone: {
                        required: "Введите телефон",
                        checkMask: "Введите корректный телефон"
                    },
                    comment: {
                        required: "Напишите ваш отзыв про товар"
                    },
                    text: {
                        required: "Введите ваш вопрос"
                    },
                    surname: {
                        required: "Ваши фамилия, имя, отчество"
                    }
                }
            });
        });

        // Номер телефона - ввод цифр по маске
        $('.js-phone').mask("+38(999) 999-99-99", {
            autoclear: false
        });

    });

});

// Map
// function initMap() {
//     var coordinates = { lat: 50.453010, lng: 30.520324 },
//         markerImage = 'img/svg/icon-fiskars-map.svg',
//         map = new google.maps.Map(document.getElementById('map'), {
//             center: { lat: 50.453010, lng: 30.520324 }
//         }),
//         marker = new google.maps.Marker({
//             position: coordinates,
//             map: map,
//             icon: markerImage
//         });
// }

// horizontal tabs
var jsTriggers = document.querySelectorAll('.js-tab-trigger');
jsTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function () {
        var id = this.getAttribute('data-tab'),
            content = document.querySelector('.js-tabs-content[data-tab="' + id + '"]'),
            activeTrigger = document.querySelector('.js-tab-trigger.active'),
            activeContent = document.querySelector('.js-tabs-content.active');
        activeTrigger.classList.remove('active');
        trigger.classList.add('active');
        activeContent.classList.remove('active');
        content.classList.add('active');
    });
});

// Accordion
const accordionItems = document.querySelectorAll(".accordion__item");
accordionItems.forEach(accordionItem => {
    const accordionItemHeader = accordionItem.querySelector(".accordion__header");
    const accordionItemBody = accordionItem.querySelector(".accordion__body");
    accordionItemHeader.addEventListener("click", () => {
        accordionItem.classList.toggle("active");

        if (accordionItemBody.style.display === "block") {
            accordionItemBody.style.display = "none";
        } else {
            accordionItemBody.style.display = "block";
        }
    });
});

// Filters
const filtersheaders = document.querySelectorAll(".filters__header");
filtersheaders.forEach(filtersheader => {
    filtersheader.addEventListener("click", event => {
        filtersheader.classList.toggle("active");
        const filtersItemBody = filtersheader.nextElementSibling;

        if (filtersItemBody.style.display === "none") {
            filtersItemBody.style.display = "block";
        } else {
            filtersItemBody.style.display = "none";
        }
    });
});

// Registration
const registrationheaders = document.querySelectorAll(".registration__header");
registrationheaders.forEach(registrationheader => {
    registrationheader.addEventListener("click", event => {
        registrationheader.classList.toggle("active");
        const registrationItemBody = registrationheader.nextElementSibling;

        if (registrationItemBody.style.display === "none") {
            registrationItemBody.style.display = "block";
        } else {
            registrationItemBody.style.display = "none";
        }
    });
});

// Развернуть и Свернуть
$(function () {
    var el = $('.js-interesting__desc'),
        curHeight = el.height(),
        autoHeight = el.css('height', 'auto').height();
    el.height(curHeight);
    $(".js-interesting__more").click(function (e) {
        var link = document.querySelector('.interesting__more');
        e.preventDefault();

        if (el.height() == 200) {
            el.height(curHeight).animate({
                height: autoHeight
            }, 600);
            link.innerText = link.getAttribute('data-text-hide');
            this.classList.add('active');
        } else {
            el.height(autoHeight).animate({
                height: curHeight
            }, 600);
            link.innerText = link.getAttribute('data-text-show');
            this.classList.remove('active');
        }
    });
});

// input checkbox
const checkboxes = document.querySelectorAll('a.checkbox__link');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('click', e => {
        e.preventDefault();
        checkbox.classList.toggle('active');
        return false;
    });
});

// noUiSlider
var stepsSlider = document.getElementById('steps-slider');
var input0 = document.getElementById('input-start');
var input1 = document.getElementById('input-end');
var inputs = [input0, input1];

noUiSlider.create(stepsSlider, {
    start: [800, 12000],
    connect: true,
    tooltips: true,
    format: wNumb({
        decimals: 0,
        // default is 2
        thousand: '' // thousand delimiter
        // postfix: ' (US $)', // gets appended after the number
    }),
    range: {
        'min': 0,
        'max': 15000
    }
});

stepsSlider.noUiSlider.on('update', function (values, handle) {
    inputs[handle].value = values[handle];
});

// Listen to keydown events on the input field.
inputs.forEach(function (input, handle) {
    input.addEventListener('change', function () {
        stepsSlider.noUiSlider.setHandle(handle, this.value);
    });
    input.addEventListener('keydown', function (e) {
        var values = stepsSlider.noUiSlider.get();
        var value = Number(values[handle]); // [[handle0_down, handle0_up], [handle1_down, handle1_up]]

        var steps = stepsSlider.noUiSlider.steps(); // [down, up]

        var step = steps[handle];
        var position; // 13 is enter,
        // 38 is key up,
        // 40 is key down.

        switch (e.which) {
            case 13:
                stepsSlider.noUiSlider.setHandle(handle, this.value);
                break;

            case 38:
                // Get step to go increase slider value (up)
                position = step[1]; // false = no step is set

                if (position === false) {
                    position = 1;
                } // null = edge of slider


                if (position !== null) {
                    stepsSlider.noUiSlider.setHandle(handle, value + position);
                }

                break;

            case 40:
                position = step[0];

                if (position === false) {
                    position = 1;
                }

                if (position !== null) {
                    stepsSlider.noUiSlider.setHandle(handle, value - position);
                }

                break;
        }
    });
});