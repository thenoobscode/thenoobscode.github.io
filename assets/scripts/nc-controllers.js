/***********************************************
 * SITE: ANIMATED BLOCK
 ***********************************************/
(function ($) {

	'use strict';

	ncJS.animatedBlock = {
		init: function () {

			var animatedBlock = $('.nc-animated-block'),
				prefix = 'animate__';

			if (ncJS.html.hasClass('nc-is--homepage')) {

				ncJS.window.on('nc.change-slide', function () {
					animatedBlock.each(function () {
						var $this = $(this);
						var animationName = $this.data('animation-name');
						$this.removeClass(prefix + 'animated').removeClass(prefix + animationName);
						if ($this.parents('.nc-section').hasClass('active')) {
							$this.addClass(prefix + 'animated').addClass(prefix + animationName);
						}
					});
				});

			} else {
				animatedBlock.each(function () {
					var $this = $(this);
					$this.css('opacity', 0);
					$this.one('inview', function () {
						var animationName = $this.data('animation-name');
						$this.addClass(prefix + 'animated').addClass(prefix + animationName);
					});
				});
			}
		}
	};
	ncJS.animatedBlock.init();
})(jQuery);
/***********************************************
 * SITE: CONTACT FORM
 ***********************************************/
(function ($) {

	'use strict';

	// check if plugin defined
	if (typeof $.fn.validate == 'undefined') {
		return;
	}

	ncJS.contactForm = {
		init: function () {

			var contactForm = $('.nc-contact-form');

			contactForm.each(function () {

				var thisForm = $(this),
					successMessage = thisForm.find('.message.success'),
					errorMessage = thisForm.find('.message.danger');

				thisForm.validate({
					errorClass: 'error',
					submitHandler: function (form) {
						$.ajax({
							type: 'POST',
							url: 'handler.php',
							data: new FormData(form),
							cache: false,
							contentType: false,
							processData: false,
							success: function () {
								successMessage.fadeIn();
								setTimeout(function () {
									successMessage.fadeOut();
								}, 5000);
							},
							error: function () {
								errorMessage.fadeIn();
								setTimeout(function () {
									errorMessage.fadeOut();
								}, 5000);
							}
						});
					}
				});

			});
		}
	}

	ncJS.contactForm.init();

})(jQuery);
/***********************************************
 * SITE: CONTENT SLIDER
 ***********************************************/
(function ($) {

	'use strict';

	// check if plugin defined
	if (typeof Swiper === 'undefined') {
		return;
	}

	ncJS.contentSlider = {
		init: function () {

			$('.nc-content-slider').each(function () {

				var $this = $(this),
					container = $this.find('.swiper-container'),
					anchor = $this.data('navigation-anchor'),
					gap = $this.data('gap') || 0,
					effect = $this.data('effect') || 'slide',
					loop = $this.data('loop') || false,
					speed = $this.data('speed') || 1000,
					autoplay = $this.data('autoplay') ? true : false,
					centered = $this.data('slides-centered') ? true : false,
					freemode = $this.data('free-mode') ? true : false,
					slider_offset = $this.data('slider-offset') ? true : false,
					mousewheel = $this.data('mousewheel') ? true : false,
					autoplay_speed = $this.data('autoplay-speed'),
					settings = $this.data('slide-settings');

				var swiper = new Swiper(container, {
					init: false,
					spaceBetween: gap,
					grabCursor: true,
					effect: effect,
					initialSlide: settings.initial_slide ? settings.initial_slide : 0,
					loop: loop,
					speed: speed,
					centeredSlides: centered,
					freeMode: freemode,
					autoHeight: true,
					mousewheel: mousewheel,
					autoplay: autoplay ? {
						delay: autoplay_speed,
						disableOnInteraction: false
					} : false,
					slidesOffsetBefore: 100,
					slidesOffsetBefore: slider_offset ? $('.container').get(0).getBoundingClientRect().left + 15 : false,
					slidesOffsetAfter: slider_offset ? $('.container').get(0).getBoundingClientRect().left + 15 : false,
					navigation: {
						nextEl: $(anchor).find('.nc-swiper-button-next'),
						prevEl: $(anchor).find('.nc-swiper-button-prev'),
					},
					pagination: {
						el: $(anchor).find('.nc-swiper-pagination'),
						clickable: true,
						renderBullet: function (index, className) {
							return '<span class="' + className + '"></span>';
						}
					},
					breakpoints: {
						// when window width is >= 576px
						576: {
							slidesPerView: settings.slides_to_show_mobile || settings.slides_to_show_tablet || settings.slides_to_show || 1,
							slidesPerGroup: settings.slides_to_scroll_mobile || settings.slides_to_scroll_tablet || settings.slides_to_scroll || 1,
						},
						// when window width is >= 768px
						768: {
							slidesPerView: settings.slides_to_show_tablet || settings.slides_to_show || 1,
							slidesPerGroup: settings.slides_to_scroll_tablet || settings.slides_to_scroll || 1,
						},
						// when window width is >= 992px
						992: {
							slidesPerView: settings.slides_to_show || 1,
							slidesPerGroup: settings.slides_to_scroll || 1,
						}
					}
				});

				swiper.on('init slideChange', function () {

					if ($this.find('.nc-project').length) {

						var current = swiper.realIndex,
							sectionsBackgroundImage = $('.nc-section__projects-background img');

						sectionsBackgroundImage.removeClass('is-active');
						sectionsBackgroundImage.eq(current).addClass('is-active');

					}

				});

				swiper.init();

				setTimeout(function () {
					swiper.updateAutoHeight();
				}, 50);

			});
		}
	}

	ncJS.contentSlider.init();

})(jQuery);
/***********************************************
 * SITE: FULLPAGE SLIDER
 ***********************************************/
(function ($) {

	'use strict';

	// check if plugin defined
	if (typeof $.fn.pagepiling == 'undefined') {
		return;
	}

	ncJS.fullpageSlider = {

		init: function () {

			var fullpageSlider = $('.nc-fullpage-slider'),
				progressBar = fullpageSlider.find('.nc-fullpage-slider-progress-bar'),
				loopTop = fullpageSlider.data('loop-top') ? true : false,
				loopBottom = fullpageSlider.data('loop-bottom') ? true : false,
				speed = fullpageSlider.data('speed') || 800,
				anchors = [];

			if (!fullpageSlider.length) {
				return;
			}

			$('.nc-offcanvas-menu ul.sf-menu > li:first-of-type, .nc-default-menu__navigation ul.sf-menu > li:first-of-type').addClass('active');

			ncJS.body.css('overflow', 'hidden');
			ncJS.html.css('overflow', 'hidden');

			fullpageSlider.find('[data-anchor]').each(function () {
				anchors.push($(this).data('anchor'));
			});

			function nchemes_navbar_solid() {
				if (fullpageSlider.find('.pp-section.active').scrollTop() > 0) {
					$('.nc-navbar').addClass('nc-navbar--solid');
				} else {
					$('.nc-navbar').removeClass('nc-navbar--solid');
				}
			}
			nchemes_navbar_solid();

			function nchemes_navigation() {
				var total = fullpageSlider.find('.nc-section').length,
					current = fullpageSlider.find('.nc-section.active').index(),
					scale = (current + 1) / total;
				progressBar.find('span').css({
					'transform': 'scaleY(' + scale + ')'
				});
			}

			fullpageSlider.pagepiling({
				menu: '.nc-offcanvas-menu ul.sf-menu, .nc-default-menu__navigation ul.sf-menu',
				scrollingSpeed: speed,
				loopTop: loopTop,
				loopBottom: loopBottom,
				anchors: anchors,
				sectionSelector: '.nc-section',
				navigation: false,
				afterRender: function () {
					nchemes_navigation();
					ncJS.window.trigger('nc.change-slide');
				},
				onLeave: function () {
					nchemes_navigation();
					ncJS.window.trigger('nc.change-slide');
				},
				afterLoad: function () {
					nchemes_navbar_solid();
				}
			});

			fullpageSlider.find('.pp-scrollable').on('scroll', function () {
				var scrollTop = $(this).scrollTop();
				if (scrollTop > 0) {
					$('.nc-navbar').addClass('nc-navbar--solid');
				} else {
					$('.nc-navbar').removeClass('nc-navbar--solid');
				}
			});

		}
	};

	ncJS.fullpageSlider.init();

})(jQuery);
/***********************************************
 * SITE: MENU OFFCANVAS
 ***********************************************/
(function ($) {

	'use strict';

	var menuIsOpen = false;

	ncJS.menuOffcanvas = {
		config: {
			easing: 'power2.out'
		},
		init: function () {
			var menu = $('.nc-offcanvas-menu'),
				navigation = menu.find('ul.sf-menu'),
				navigationItem = navigation.find('> li'),
				header = $('.nc-offcanvas-menu__header'),
				footer = $('.nc-offcanvas-menu__footer > div'),
				menuOpen = $('.js-offcanvas-menu-open'),
				menuClose = $('.js-offcanvas-menu-close'),
				siteOverlay = $('.nc-site-overlay');

			if (typeof $.fn.superclick !== 'undefined') {

				navigation.superclick({
					delay: 300,
					cssArrows: false,
					animation: {
						opacity: 'show',
						height: 'show'
					},
					animationOut: {
						opacity: 'hide',
						height: 'hide'
					},
				});

			}

			menuOpen.on('click', function (e) {
				e.preventDefault();
				if (!menuIsOpen) {
					ncJS.menuOffcanvas.open_menu(menu, siteOverlay, navigationItem, header, footer);
				}
			});

			menuClose.on('click', function (e) {
				e.preventDefault();
				if (menuIsOpen) {
					ncJS.menuOffcanvas.close_menu(menu, siteOverlay, navigationItem, header, footer);
				}
			});

			siteOverlay.on('click', function (e) {
				e.preventDefault();
				if (menuIsOpen) {
					ncJS.menuOffcanvas.close_menu(menu, siteOverlay, navigationItem, header, footer);
				}
			});

			ncJS.document.keyup(function (e) {
				if (e.keyCode === 27 && menuIsOpen) {
					e.preventDefault();
					ncJS.menuOffcanvas.close_menu(menu, siteOverlay, navigationItem, header, footer);
				}
			});

			// Close after click to anchor.
			navigationItem.filter('[data-menuanchor]').on('click', 'a', function () {
				if (menuIsOpen) {
					ncJS.menuOffcanvas.close_menu(menu, siteOverlay, navigationItem, header, footer);
				}
			});

		},
		open_menu: function (menu, siteOverlay, navigationItem, header, footer) {
			menuIsOpen = true;
			if (typeof gsap != 'undefined') {
				gsap.timeline({
						defaults: {
							ease: this.config.easing
						}
					})
					// set overflow for html
					.set(ncJS.html, {
						overflow: 'hidden'
					})
					// overlay animation
					.to(siteOverlay, .3, {
						autoAlpha: 1,
					})
					// menu animation
					.fromTo(menu, .6, {
						x: '100%',
					}, {
						x: 0,
						visibility: 'visible'
					}, '-=.3')
					// header animation
					.fromTo(header, .3, {
						x: 50,
						autoAlpha: 0
					}, {
						x: 0,
						autoAlpha: 1
					}, '-=.3')
					// navigation item animation
					.fromTo(navigationItem, .3, {
						x: 50,
						autoAlpha: 0
					}, {
						x: 0,
						autoAlpha: 1,
						stagger: {
							each: .1,
							from: 'start',
						}
					}, '-=.15')
					// footer animation
					.fromTo(footer, .3, {
						x: 50,
						autoAlpha: 0
					}, {
						x: 0,
						autoAlpha: 1,
						stagger: {
							each: .1,
							from: 'start',
						}
					}, '-=.15');
			}
		},
		close_menu: function (menu, siteOverlay, navigationItem, header, footer) {
			menuIsOpen = false;
			if (typeof gsap != 'undefined') {
				gsap.timeline({
						defaults: {
							ease: this.config.easing
						}
					})
					// set overflow for html
					.set(ncJS.html, {
						overflow: 'inherit'
					})
					// footer animation
					.to(footer, .3, {
						x: 50,
						autoAlpha: 0,
						stagger: {
							each: .1,
							from: 'end',
						}
					})
					// navigation item animation
					.to(navigationItem, .3, {
						x: 50,
						autoAlpha: 0,
						stagger: {
							each: .1,
							from: 'end',
						},
					}, '-=.15')
					// header animation
					.to(header, .3, {
						x: 50,
						autoAlpha: 0,
					}, '-=.15')
					// menu animation
					.to(menu, .6, {
						x: '100%',
					}, '-=.15')
					// set visibility menu after animation
					.set(menu, {
						visibility: 'hidden'
					})
					// overlay animation
					.to(siteOverlay, .3, {
						autoAlpha: 0
					}, '-=.6');
			}
		}
	};

	ncJS.menuOffcanvas.init();

})(jQuery);
/***********************************************
 * SITE: NAVBAR
 ***********************************************/
(function ($) {
	'use strict';

	var navbarMain = $('.nc-navbar--main'),
		navbarHeight = navbarMain.outerHeight(),
		navbarMainOffset = 0;

	// fake navbar
	var navbarFake = $('<div class="nc-fake-navbar">').hide();

	// fixed navbar
	function _fixed_navbar() {
		navbarMain.addClass('nc-navbar--fixed');
		navbarFake.show();
		// add solid color
		if (navbarMain.hasClass('nc-navbar--transparent') && navbarMain.hasClass('nc-navbar--sticky')) {
			navbarMain.addClass('nc-navbar--solid');
		}
	}

	function _unfixed_navbar() {
		navbarMain.removeClass('nc-navbar--fixed');
		navbarFake.hide();
		// remove solid color
		if (navbarMain.hasClass('nc-navbar--transparent') && navbarMain.hasClass('nc-navbar--sticky')) {
			navbarMain.removeClass('nc-navbar--solid');
		}
	}

	function _on_scroll_navbar() {
		if (ncJS.window.scrollTop() > navbarMainOffset) {
			_fixed_navbar();
		} else {
			_unfixed_navbar();
		}
	}

	if (navbarMain.hasClass('nc-navbar--sticky')) {
		ncJS.window.on('scroll resize', _on_scroll_navbar);
		_on_scroll_navbar();
		// append fake navbar
		navbarMain.after(navbarFake);
		// fake navbar height after resize
		navbarFake.height(navbarHeight);
		ncJS.debounceResize(function () {
			navbarFake.height(navbarHeight);
		});
	}

})(jQuery);
/***********************************************
 * INIT THIRD PARTY SCRIPTS
 ***********************************************/
(function ($) {

	'use strict';

	/**
	 * Jarallax
	 */
	if (typeof $.fn.jarallax !== 'undefined') {
		$('.jarallax').jarallax({
			speed: 0.8
		});
	}

	/**
	 * Fast click
	 */
	if (typeof FastClick === 'function') {
		FastClick.attach(document.body);
	}

})(jQuery);
/***********************************************
 * SITE: PRELOADER
 ***********************************************/
(function ($) {
	'use strict';

	// check if plugin defined
	if (typeof $.fn.animsition == 'undefined') {
		return;
	}

	var preloader = $('.animsition');

	preloader.animsition({
		inDuration: 500,
		outDuration: 500,
		loadingParentElement: 'html',
		linkElement: 'a:not([target="_blank"]):not([href^="#"]):not([rel="nofollow"]):not([href~="#"]):not([href^=mailto]):not([href^=tel]):not(.sf-with-ul)',
		loadingClass: 'animsition-loading-2',
		loadingInner: '<div class="spinner"><span class="double-bounce-one"></span><span class="double-bounce-two"></span></div>',
	});

	preloader.on('animsition.inEnd', function () {
		ncJS.window.trigger('nc.preloader_done');
		ncJS.html.addClass('nc-is-page-loaded');
	});

})(jQuery);
/***********************************************
 * SITE: PROGRESS BAR
 ***********************************************/
(function ($) {

	'use strict';

	// check if plugin defined
	if (typeof gsap == 'undefined') {
		return;
	}

	ncJS.progressBar = {
		init: function () {

			var progressBar = $('.nc-progress-bar');

			progressBar.each(function () {

				var $this = $(this),
					final_value = $this.data('final-value') || 0,
					animation_duration = $this.data('animation-speed') || 0,
					delay = 500,
					obj = {
						count: 0
					};

				ncJS.window.on('nc.change-slide', function () {
					if ($this.parents('.nc-section').hasClass('active')) {

						obj.count = 0;
						$this.find('.nc-progress-bar__title > .counter').text(Math.round(obj.count));
						gsap.set($this.find('.nc-progress-bar__bar > span'), {
							width: 0
						});
						gsap.to(obj, (animation_duration / 1000) / 2, {
							count: final_value,
							delay: delay / 1000,
							onUpdate: function () {
								$this.find('.nc-progress-bar__title > .counter').text(Math.round(obj.count));
							}
						});

						gsap.to($this.find('.nc-progress-bar__bar > span'), animation_duration / 1000, {
							width: final_value + '%',
							delay: delay / 1000
						});

					}
				});

			});

		}
	}

	ncJS.progressBar.init();

})(jQuery);
/***********************************************
 * SITE: SIMPLE IMAGE
 ***********************************************/
(function ($) {

	'use strict';

	ncJS.simpleImage = {
		init: function () {

			var simpleImage = $('.nc-simple-image');

			simpleImage.each(function () {

				var $this = $(this),
					mask = $this.find('.nc-simple-image__mask');

				$this.on('inview', function () {
					mask.addClass('active');
				});

			});

		}
	}

	ncJS.simpleImage.init();

})(jQuery);
