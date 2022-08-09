$(document).ready(function(){

    // Main Slider
    $('.mainslider').slick({
        arrows: false,
        dots: true,
    });


    var windowWidth = $(document).width(),
    containerWidth = $('.container').width(),
    paddingContainer = ((windowWidth - containerWidth) / 2)
    // right
    $('.mainslider .slick-dots').css('right', paddingContainer);

    $(window).resize(function () {
        var windowWidth = $(document).width(),
            containerWidth = $('.container').width(),
            paddingContainer = ((windowWidth - containerWidth) / 2)
        // right
        $('.mainslider .slick-dots').css('right', paddingContainer);
    });
    


});