
				
$( document ).ready(function() {

    console.log( "ready!" );

    // Video player
    var player = document.querySelector('.about__video');
    var video = document.querySelector('#about_video');
    var playBtn = document.querySelector('.about__video-play');
    // var fullscreenBtn =document.querySelector('.fullscreen'); 


    function togglePlay() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();	
        }
        playBtn.classList.toggle('paused');
        $('.about__video-play').fadeToggle(100)
    }
    function launchIntoFullscreen(element) {
        if(element.requestFullscreen) {
          element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if(element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        } else if(element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      }
      function exitFullscreen() {
        if(document.exitFullscreen) {
          document.exitFullscreen();
        } else if(document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if(document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      }

    var fullscreen = false;
    function toggleFullscreen() {
        fullscreen ? exitFullscreen() : launchIntoFullscreen(player)
        fullscreen = !fullscreen;
    }

    if (playBtn) {
        playBtn.addEventListener('click', togglePlay);
        video.addEventListener('click', togglePlay);
    // fullscreenBtn.addEventListener('click', toggleFullscreen);
    }

    //  Video player end ////////////////////
    

    
    $('.burger-menu').on('click', function(){
        $('.header__menu-wrap').toggleClass('active')
        $('body').toggleClass('hidden-scroll')
        $('html').toggleClass('hidden-scroll')
        $(this).toggleClass('active')

    })


    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
          $(".header__wrapper").addClass("fixed");
        } else {
          $(".header__wrapper").removeClass("fixed");
        }
    });

    $(".top-btn").click(function () {
        $("html, body").animate(
            {
                scrollTop: 0,
            },
            1000
        );
        return false;
    });

    $(window).scroll(function() {
        if ($(this).scrollTop()>400) {
            $('.top-btn').fadeIn();
        }
        else {
            $('.top-btn').fadeOut();
        }
    });

    $(".scrol-down").on("click", function (event) {
        event.preventDefault();
    
        var id = $(this).attr("href"),
          top = $(id).offset().top - 100;
    
        $("body,html").animate({ scrollTop: top }, 1000);
    });

    $('.nice__select').niceSelect()


    // contacts select footer
    $('#contacts_select').on('change', function () {
        let active = $(this).val();
        $('.footer__contact-list').removeClass('active')
        $('.footer__contact-list[data-list="'+ active +'"]').addClass('active')
        console.log(active);
    })
    /////////////////

    // contacts select modal
    $('#contacts_select_modal').on('change', function () {
        let active = $(this).val();
        $('.modal__contact-list').removeClass('active')
        $('.modal__image').removeClass('active')
        $('.modal__contact-list[data-list="'+ active +'"]').addClass('active')
        $('.modal__image[data-list="'+ active +'"]').addClass('active')
        console.log(active);
    })
    /////////////////
    
    // About counter //
    //////////////////////////////
    var aboutStatistics = $('.about__statistics')
    function counter () {
        var statisticsCount = 0;

        $(window).scroll(function() {
            var oTop = $('.about__statistics').offset().top - window.innerHeight;
            if (statisticsCount ==0 && $(window).scrollTop() > oTop) { 
                $('.count').each(function() {
                    var $this = $(this),
                        countTo = $this.attr('data-count');
                    
                    $({ countNum: $this.text()}).animate({
                          countNum: countTo
                    },
                  
                    {
                        duration: 2000,
                        easing:'linear',
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(this.countNum);
                        }
                    });  
                    statisticsCount = 1;
                });
            }
    
        })
    }
    if (aboutStatistics.length) {
        counter()
    }
    /// About counter end  ///////////////////////////


    // aos animation
    AOS.init({
        disable: function () {
            var maxWidth = 1025;
            return window.innerWidth < maxWidth;
        }
    });

    $('.accordeon-item__content:first').slideDown()

    $(".accordeon-item__prev").bind("click", function() {
        if (window.matchMedia("(max-width: 991px)").matches) {
            if ($(this).parent().hasClass("true")) {
                $(this).parent().find('.accordeon-item__content').slideUp()
                $(this).parent().removeClass("true");
                $(this).parent().removeClass("active");
            } else {
                $('.accordeon-item__content').slideUp()
                $(this).parent().find('.accordeon-item__content').slideToggle()
                $(".accordeon-item").removeClass("active true");
                $(this).parent().addClass("active true");
            }
        } else {
            $(".accordeon-item").removeClass("active");
            $(this).parent().addClass("active");
        }
    });

    $('.more-btn').on('click', function () {
        $(this).parent().fadeOut();
        $('.projects-item__wrap').fadeIn()
    })

    // main slider /////////////
    $('.intro-bg-slider').slick({
        arrows: false,
        fade: true,
        dots: true,
        appendDots:$(".slick-navigation"),
        infinite: false,

        // autoplay:true,
        // autoplaySpeed:5000,
        asNavFor: ".swiper-wrapper",
    })

    $('.swiper-wrapper').slick({
        // adaptiveHeight: true
        // dots: true,
        infinite: false,
        // autoplay:true,
        // autoplaySpeed:5000,
        prevArrow: $('.slick-rev-prev'),
        nextArrow: $('.slick-rev-next'),
        asNavFor: ".intro-bg-slider",
    })
    // main slider end /////////////


    $('.block-accessories__more .expand').on('click',function(e){
        e.preventDefault();
        
        var c = $(this).parent().prev();
        $(this).parents('.reviews-item').addClass('open')

        var h = c.prop('scrollHeight') ;
        console.log(h);
    
        c.animate({'maxHeight':h},function () {
            $(this).addClass('block-accessories__text--open')
        }, function () {
            window.dispatchEvent(new Event('resize'));
        
        });
        $(this).hide()
        $(this).next().show()
       
    });

    $('.block-accessories__more .collapse').on('click',function(e){
        e.preventDefault();
        $(this).parents('.reviews-item').removeClass('open')
        var c = $(this).parent().prev();
        var h = 60;
        c.animate({'maxHeight':h},function () {
            $(this).removeClass('block-accessories__text--open')
            
        }, function () {
           
        window.dispatchEvent(new Event('resize'));
     
          
        });
        $(this).hide()
        $(this).prev().show()
        
    });



    $('.about-intro-slider').slick({
        arrows: false,
        // fade: true,
        dots: true,
        appendDots:$(".slick-navigation"),
        autoplay:true,
        autoplaySpeed:5000,
    })

    $('.solution-intro-slider').slick({
        prevArrow: $('.solution-slider-prev'),
        nextArrow: $('.solution-slider-next'),
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        autoplaySpeed:5000,
        asNavFor: ".solution-intro-slider_nav",
    })
    $('.solution-intro-slider_nav').slick({
        arrows: false,
        slidesToShow: 4,
        dots: false,
        autoplaySpeed:5000,
        asNavFor: ".solution-intro-slider",
        focusOnSelect: true,
        responsive: [
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1
              }
            }
        ]

    })


    $('.projects__items_slider').slick({
        prevArrow: $('.projects-slider-prev'),
        nextArrow: $('.projects-slider-next'),
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        // autoplaySpeed:5000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1
                }
            },
            {
              breakpoint: 520,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
        ]
    })

    
    $('.related-products__slider').slick({
        prevArrow: $('.related-slider-prev'),
        nextArrow: $('.related-slider-next'),
        slidesToShow: 4,
        slidesToScroll: 1,
        // arrows: false,
        dots: false,
        

        responsive: [
            {
                breakpoint: 992,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1
                }
            },
            {
                breakpoint: 576,
                settings: {
                    vertical: false,
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    })

    $('.used-products').slick({
        prevArrow: $('.used-products-prev'),
        nextArrow: $('.used-products-next'),
        slidesToShow: 2,
        slidesToScroll: 1,
        // arrows: false,
        dots: false,
        vertical: true,
        verticalSwiping: true,
        

        responsive: [
            // {
            //     breakpoint: 992,
            //     settings: {
            //       slidesToShow: 2,
            //       slidesToScroll: 1
            //     }
            // },
            {
                breakpoint: 769,
                settings: {
                    vertical: false,
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    })
    
    if (document.querySelector(".product-slider-for")) {
        // $('.slider-for-item video').on('click', function () {
        //     if (this.paused) {
        //         this.play();
        //     } else {
        //         this.pause();	
        //     }
        // })
        var productSlider = $(".product-slider-for")
        // When the slide is changing
        function playPauseVideo(slick, control){
            var currentSlide, slideType, startTime, video;
        
            currentSlide = slick.find(".slick-current");
            slideType = currentSlide.attr("class").split(" ")[1];
            startTime = currentSlide.data("video-start");
        
            if (slideType === "video") {
            video = currentSlide.children("video").get(0);
            if (video != null) {
                if (control === "play"){
                video.play();
                } else {
                video.pause();
                }
            }
            }
        }

        
        productSlider.on("beforeChange", function(event, slick) {
            slick = $(slick.$slider);
            playPauseVideo(slick,"pause");
        });
        productSlider.on("afterChange", function(event, slick) {
            slick = $(slick.$slider);
            playPauseVideo(slick,"play");
        });

        // product-slider
        productSlider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: ".product-slider-nav",
        });


        // $(".product-slider-for").on('beforeChange', function(event, { slideCount: count }, currentSlide, nextSlide){
        //     let selectors = [nextSlide, nextSlide - count, nextSlide + count].map(n => `[data-slick-index="${n}"]`).join(', ');
        //     $('.slick-now').removeClass('slick-now');
        //     $(selectors).find('video').addClass('slick-now_' + count +'');
        //     var video = document.querySelectorAll('.sl-video');
        //     video.forEach(element => {
        //         element.pause();
        //     });
        //     video
        // });

        
       
        $(".product-slider-nav").slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: ".product-slider-for",
            dots: false,
            // arrows: false,
            focusOnSelect: true,
            vertical: true,
            verticalSwiping: true,
            prevArrow: `<div class='product-slider_prev'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.0098 11.2982L11.9994 5.28778L5.98895 11.2982L7.40316 12.7124L11.9994 8.11621L16.5956 12.7124L18.0098 11.2982Z" fill="white"/>
                            </svg>
                        </div>`,
            nextArrow: `<div class='product-slider_next'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.99023 9.70181L12.0006 15.7122L18.011 9.70181L16.5968 8.2876L12.0006 12.8838L7.40445 8.2876L5.99023 9.70181Z" fill="white"/>
                            </svg>
                        </div>`,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                    },
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 4,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                    },
                },
            ],
        });

       
    }
    // end product-slider

    // scroll to section
    if (document.querySelector(".scroll-section")) {
        $(".scroll-section").on("click", function (event) {
        event.preventDefault();
            $(".scroll-section").removeClass("active");
            $(this).addClass("active");
            var id = $(this).attr("href"),
                top = $(id).offset().top - 200;
            $("body,html").animate({ scrollTop: top }, 1000);
        });
    }
    $.fn.isInViewport = function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();
    
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height() / 3;
    
        return elementBottom > viewportTop && elementTop < viewportBottom;
    };



    $(window).on('resize scroll', function() {
        $('.desc-title').each(function() {
            var activeSec = $(this).attr('id');
            if ($(this).isInViewport()) {
                $('[data-screen]').removeClass('active');
                $('[data-screen="#'+activeSec+'"]').addClass('active');
            } else {
            // $('[data-screen="#'+activeSec+'"]').removeClass('active');
            }
        });
    });

    $('.share__list-btn').on('click', function () {
        $('.share__list').slideToggle();
    })

    $('.check-box__title').on('click', function () {
        
        if ($(this).hasClass('active')) {
            $(this).removeClass('active')
            $(this).next().removeClass('active')
        } else {
            $('.check-box__title').removeClass('active')
            $('.check-box__list').removeClass('active')
            $(this).addClass('active')
            $(this).next().addClass('active')
        }

        
        
    })

    $(document).click(function(event) {
        if (!$(event.target).closest(".check-box__title, .check-box-item, .check-box-item__label").length) {
            $('.check-box__title').removeClass('active')
            $('.check-box__list').removeClass('active')
        }
    });
 
});