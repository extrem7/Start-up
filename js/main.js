'use strict';

var timer = {
    data: {
        allDays: 66,
        days: 22,
        hours: 18,
        minutes: 24
    },
    start: function start() {
        this.makeCircle('.circle.days', this.data.days, this.data.allDays);
        this.makeCircle('.circle.hours', this.data.hours, 24);
        this.makeCircle('.circle.minutes', this.data.minutes, 60);
    },
    makeCircle: function makeCircle(selector, value, base) {
        var percentage = value / base;
        $(selector).circleProgress({
            value: percentage,
            size: 200,
            thickness: 25,
            lineCap: 'round',
            startAngle: -Math.PI / 2,
            emptyFill: 'rgba(83, 136, 247, 0.6)',
            fill: {
                gradient: ['#36cdff', '#333ecf'],
                gradientDirection: [0, 0, 200, 200]
            }
        });
        $(selector).find('span').text(value);
    }
},
    header = {
    button: false,
    controller: function controller() {
        $('.toggle-btn').click(function () {
            if (header.button === false) {
                $('header .logo').fadeOut(function () {
                    $('.mobile-menu').fadeIn();
                });
                $(this).find('span:first-child').css({
                    transform: "rotate(45deg)",
                    top: '5px',
                    width: "35px"
                });
                $(this).find('span:nth-child(2)').css({
                    opacity: 0
                });
                $(this).find('span:nth-child(3)').css({
                    transform: "rotate(-45deg)",
                    bottom: '9px',
                    width: "35px"
                });
                header.button = true;
            } else {
                $('.mobile-menu').fadeOut(function () {
                    $('header .logo').fadeIn();
                });
                $(this).find('span:first-child').css({
                    transform: "rotate(0)",
                    top: '0px',
                    width: "35px"
                });
                $(this).find('span:nth-child(2)').css({
                    opacity: 1
                });
                $(this).find('span:nth-child(3)').css({
                    transform: "rotate(0)",
                    bottom: '0px',
                    width: "35px"
                });
                header.button = false;
            }
        });
        $("header ul a,.scroll-down").click(function (event) {
            event.preventDefault();
            var target = $(this).attr('href'),
                top = $(target).offset().top;
            $('body,html').animate({ scrollTop: top }, Math.abs(top - $(document).scrollTop()) / 1.5);
            if (screen.availHeight < 768) {
                $('.toggle-btn').find('span:first-child').css({
                    transform: "rotate(0)",
                    top: '0px',
                    width: "35px"
                });
                $('.toggle-btn').find('span:nth-child(2)').css({
                    opacity: 1
                });
                $('.toggle-btn').find('span:nth-child(3)').css({
                    transform: "rotate(0)",
                    bottom: '0px',
                    width: "35px"
                });

                header.button = false;
                $('.mobile-menu').fadeOut();
            }
        });
    }
};

function iphone() {
    var selector = '#iphone';
    $(selector).on('slide.bs.carousel', function () {
        var active = '.carousel .item.active';
        var img = $(active).find('img').attr('src');
        $('.carousel-inner').css('background-image', 'url("' + img + '")');
        $(active).css('opacity', 0);
    });
    $(selector).on('slid.bs.carousel', function () {
        $('.carousel .item').css('opacity', 1);
    });
    $(selector).swiperight(function () {
        $(selector).carousel('prev');
    });
    $(selector).swipeleft(function () {
        $(selector).carousel('next');
    });
}

$(function () {
    timer.start();
    header.controller();
    iphone();
    $(".cheep").hide().show("slide", { direction: "left" }, 600);
    $(".cheep").animate({ opacity: 1 }, 600);
});