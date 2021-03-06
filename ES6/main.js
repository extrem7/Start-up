const timer = {
        data: {
            allDays: 66,
            days: 22,
            hours: 18,
            minutes: 24
        },
        start() {
            this.makeCircle('.circle.days', 1, 1000);
            this.makeCircle('.circle.hours', 1, 10000);
            this.makeCircle('.circle.minutes', 1, 10000);
            setTimeout(() => {
                this.makeCircle('.circle.days', this.data.days, this.data.allDays);
                setTimeout(() => {
                    this.makeCircle('.circle.hours', this.data.hours, 24);
                    setTimeout(() => {
                        this.makeCircle('.circle.minutes', this.data.minutes, 60);
                    }, 600);
                }, 600);
            }, 1600);


        },
        makeCircle(selector, value, base) {
            let percentage = value / base;
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
        controller: function () {
            $('.toggle-btn').click(function () {
                if (header.button === false) {
                    $('header .logo').fadeOut(() => {
                        $('.mobile-menu').fadeIn();
                    });
                    $(this).find('span:first-child').css({
                        transform: "rotate(45deg)",
                        top: '5px',
                        width: "35px"
                    })
                    $(this).find('span:nth-child(2)').css({
                        opacity: 0
                    })
                    $(this).find('span:nth-child(3)').css({
                        transform: "rotate(-45deg)",
                        bottom: '9px',
                        width: "35px"
                    })
                    header.button = true
                } else {
                    $('.mobile-menu').fadeOut(() => {
                        $('header .logo').fadeIn();
                    });
                    $(this).find('span:first-child').css({
                        transform: "rotate(0)",
                        top: '0px',
                        width: "35px"
                    })
                    $(this).find('span:nth-child(2)').css({
                        opacity: 1
                    })
                    $(this).find('span:nth-child(3)').css({
                        transform: "rotate(0)",
                        bottom: '0px',
                        width: "35px"
                    })
                    header.button = false
                }
            });
            $("header ul .scroll-link").click(function (event) {
                event.preventDefault();
                let target = $(this).attr('href'),
                    top = $(target).offset().top;
                $('body,html').animate({scrollTop: top}, Math.abs(top - $(document).scrollTop()) / 1.5);
                if (screen.availHeight < 768) {
                    $('.toggle-btn').find('span:first-child').css({
                        transform: "rotate(0)",
                        top: '0px',
                        width: "35px"
                    })
                    $('.toggle-btn').find('span:nth-child(2)').css({
                        opacity: 1
                    })
                    $('.toggle-btn').find('span:nth-child(3)').css({
                        transform: "rotate(0)",
                        bottom: '0px',
                        width: "35px"
                    })

                    header.button = false;
                    $('.mobile-menu').fadeOut();
                }
            });
            $(".scroll-down, .scroll-link").click(function (event) {
                event.preventDefault();
                let target = $(this).attr('href'),
                    top = $(target).offset().top;
                $('body,html').animate({scrollTop: top}, Math.abs(top - $(document).scrollTop()) / 1.5);
            });
        }
    },
    upButton = {
        btn: '.scroll-up',
        controller: function () {
            $(upButton.btn).click(function () {
                $('html,body').animate({
                    scrollTop: 0
                }, {
                    duration: 1250
                });
            });
            $(window).scroll(function () {
                if ($(document).scrollTop() > $('.need').offset().top + 200) {
                    $('.scroll-up').css({opacity: 1, zIndex: 4});
                } else {
                    $('.scroll-up').css({opacity: 0, zIndex: -1});
                }
            });
        }
    },
    book = {
        init() {
            const selector = "#flipbook";
            if (screen.availWidth < 768) {
                $(selector).turn({
                    width: 270,
                    height: 408,
                    page: 2,
                    display: 'single'
                });
            } else if (screen.availWidth < 991) {
                $(selector).turn({
                    width: 700,
                    height: 525,
                    page: 2
                });
            } else if (screen.availWidth < 1200) {
                $(selector).turn({
                    width: 600,
                    height: 450,
                    page: 2
                });
            } else {
                $(selector).turn({
                    width: 700,
                    height: 525,
                    page: 2
                });
            }
            $(selector).turn("disable", true);
            $('.book-control a').click((e) => {
                $(selector).turn("disable", false);
                e.preventDefault();
                if ($(e.currentTarget).hasClass('left')) {
                    $('.book-control .right').removeClass('disabled');
                    $(selector).turn("previous");
                    setTimeout(() => {
                        if ($(selector).turn('page') === 3) {
                            $('.book-control .left').addClass('disabled');
                        } else {
                            $('.book-control .left').removeClass('disabled');
                        }
                    }, 700);
                } else {
                    $('.book-control .left').removeClass('disabled');
                    $(selector).turn("next");
                    setTimeout(() => {
                        if (($('#flipbook > div').length - 1 - $(selector).turn('page')) === 1) {
                            $('.book-control .right').addClass('disabled');
                        } else {
                            $('.book-control .right').removeClass('disabled');
                        }
                    }, 700);
                }
                $(selector).turn("disable", true);
            });
        }
    };

function iphone() {
    const selector = '#iphone';
    $(selector).on('slide.bs.carousel', () => {
        const active = '.need .carousel .item.active';
        let img = $(active).find('img').attr('src');
        $('.need .carousel-inner').css('background-image', 'url("' + img + '")');
        $(active).css('opacity', 0);
    });
    $(selector).on('slid.bs.carousel', () => {
        $('.need .carousel .item').css('opacity', 1);
    });
    $('.carousel').swiperight((e) => {
        $(e.currentTarget).carousel('prev');
    });
    $('.carousel').swipeleft((e) => {
        $(e.currentTarget).carousel('next');
    });
}

function scheme() {
    if ($('body').width() < 768) {
        const width = $('body').width(),
            height = $('.scheme').width(),
            percentage = Math.floor(width / 680 * 100) / 100 - .03;
        if (percentage < 1) {
            $('.scheme').css({
                transform: `scale(${percentage})`,
                'transform-origin': '0 0',
                width: width * (1 / percentage),
                height: width * (1 / percentage) / 3
            })
            $('.scheme .third-row').css({
                width: width * (1 / percentage) * .90
            })
        }
    }
}

function roadmap() {
    const speed = 150;
    $(".line-path").hide().show("slide", {direction: "left"}, 800);
    $(".line-path").animate({opacity: 1}, 800);
    setTimeout(() => {
        $(".line-path > div:nth-child(1) .date, .line-path > div:nth-child(1) span").animate({opacity: 1}, speed, () => {
            $(".line-path > div:nth-child(2) .date, .line-path > div:nth-child(2) span").animate({opacity: 1}, speed, () => {
                $(".line-path > div:nth-child(3) .date, .line-path > div:nth-child(3) span").animate({opacity: 1}, speed, () => {
                    $(".line-path > div:nth-child(4) .date, .line-path > div:nth-child(4) span").animate({opacity: 1}, speed, () => {
                        $(".line-path > div:nth-child(5) .date, .line-path > div:nth-child(5) span").animate({opacity: 1}, speed, () => {
                            $(".line-path > div:nth-child(6) .date, .line-path > div:nth-child(6) span").animate({opacity: 1}, speed, () => {
                                $(".line-path > div:nth-child(7) .date, .line-path > div:nth-child(7) span").animate({opacity: 1}, speed, () => {
                                    $(".line-path .text").animate({opacity: 1}, 1000);
                                });
                            });
                        });
                    });
                });
            });
        });
    }, 1500);
}

function offer() {
    $('.choose button').click(function () {
        if (!$(this).hasClass('active')) {
            $('.choose button').removeClass('active');
            $('.choose button').css({pointerEvents: 'none'});
            setTimeout(() => {
                $('.choose button').css({pointerEvents: 'all'});
            }, 600);
            $(this).addClass('active');
            if ($(this).hasClass('individual')) {
                $('.offer div.team-tab').fadeOut(() => {
                    $('.offer div.individual-tab').fadeIn();
                });
            } else {
                $('.offer div.individual-tab').fadeOut(() => {
                    $('.offer div.team-tab').fadeIn();
                });
            }
        }
    })
}

function accordion() {
    $('.accordion .control').click(function () {
        const parent = $(this).parent();
        if (!$(parent).hasClass('active')) {
            $(parent).parent().find('.item').removeClass('active');
            $(parent).parent().find('.item .text').slideUp();
            $(parent).addClass('active');
            $(parent).find('.text').slideDown();
        } else {
            $(parent).removeClass('active');
            $(parent).find('.text').slideUp();
        }
    })
}


$(() => {
    timer.start();
    header.controller();
    upButton.controller();
    book.init();
    iphone();
    //scheme();
    offer();
    accordion();
    const scroll = {
        scroll: 0,
        offsets: [
            {
                status: true,
                offset: $('#need').offset().top,
                error: screen.availHeight / 4,
                func() {
                    $(".cheep").hide().show("slide", {direction: "left"}, 600);
                    $(".cheep").animate({opacity: 1}, 600);
                }
            },
            {
                status: true,
                offset: $('#how').offset().top,
                error: screen.availHeight / 4,
                func() {
                    /*const items = $('.how .scheme .item'),
                        array = [0, 1, 2, 5, 4, 3, 7, 6];
                    /*$('.how .scheme .item').each(function (i,item) {
                        $(item).delay(300*i).hide().show("slide", {direction: "left"}, 600);
                        $(item).delay(300*i).animate({opacity: 1}, 600);
                    })*/
                    /*array.forEach((i, index) => {
                        $(items).eq(i).delay(300 * index).hide().show("slide", {direction: "left"}, 600);
                        $(items).eq(i).delay(300 * index).animate({opacity: 1}, 600);
                    })*/
                }
            },
            {
                status: true,
                offset: $('#roadmap').offset().top,
                error: screen.availHeight / 5,
                func() {
                    roadmap();
                }
            },
            {
                status: true,
                offset: $('.need .section-title').offset().top,
                error: 500,
                func() {
                    // setTimeout(()=>{$('.need .section-title').addClass('animation');},1500)

                }
            }
        ],
        controller() {
            $(window).scroll(() => {
                this.scroll = $(window).scrollTop();
                this.offsets.forEach((item, i) => {
                    setTimeout(() => {
                        if ((this.scroll + item.error >= item.offset) && item.status) {
                            console.log(item)
                            this.offsets[i].status = false;
                            item.func();
                        }
                    }, 100)

                });
                $('.section-title').each(function (i, item) {
                    if (window.pageYOffset + 500 >= $(item).offset().top) {
                        setTimeout(() => {
                            $(this).addClass('animation');
                        }, 1500)
                    }
                })
            })
        }
    };
    if (screen.availWidth < 1600 && screen.availWidth > 768) {
        //$('.line-path').css('transform', 'scale(' + screen.width / $('.line-path').width() + ')');
    }
    if (screen.availWidth > 768) {
        scroll.controller();
    }
    $('.scheme .item img, .scheme .arrow').mouseenter(function () {
        if ($(this).hasClass('arrow')) {
            $(this).find('.comment').animate({opacity: 1}).css('transform', 'scale(1)');
        } else {
            $(this).siblings('.comment').animate({opacity: 1, transform: 'scale(1)'}).css('transform', 'scale(1)')
        }
    }).mouseleave(function () {
        $(this).parent().find('.comment').animate({opacity: 0}).css('transform', 'scale(0)')
    })
    if (screen.availWidth > 768) {
        $('#news .item').each(function () {
            var next = $(this).next();
            if (!next.length) {
                next = $(this).siblings(':first');
            }
            next.children(':first-child').clone().appendTo($(this));

            if (next.next().length > 0) {
                next.next().children(':first-child').clone().appendTo($(this));
            } else {
                $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
            }
        });
    }
});