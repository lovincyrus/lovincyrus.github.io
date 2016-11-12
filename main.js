$(document).ready(function () {

    var History = window.History;

    //add animation to navbar
    navBarAnimate();

    addBrowerBodyClass($('body'));

    removeLastSectionDevider();

    // Call menu trigger
    menuTrigger('#menu-trigger', '#full-screen-menu', 'header');
    // Animation on about page - dots
    if ($('.dot-point').length > 0) {
        dotToDot();
        $('.vertical-ruler').css({
            left: $('.dot-point:first-child').offset().left - $('.dot-point:first-child').parent().offset().left
        });
    }
    function WidthHeightProportion() {
        $('.top-case-detail-hero').css({
            height: $(window).width() / 4.8
        });
    }

    doItOnResizeFn(WidthHeightProportion);
    // Transition/animation to case-detail page
    $('.loadHtmlContent').click(function(e) {
        e.preventDefault();
        var thisBlock = $(this).find('.case-block');
        var offset = thisBlock.offset();
        var thisBlockViewportOffsetTop = offset.top - $(document).scrollTop();
        var thisBlockViewportOffsetLeft = offset.left - $(document).scrollLeft();
        var hdImage = $(this).data('image-hd');

        thisBlock.delay(400).css({
            height: thisBlock.outerHeight(),
            width: thisBlock.outerWidth(),
            top: thisBlockViewportOffsetTop,
            left: thisBlockViewportOffsetLeft,
            'z-index': '9999',
            position: 'fixed',
        });
        $('.add-me-here').append(thisBlock);
        thisBlock = $('.add-me-here').find('.case-block');
        $('.cases-contetnt, .hp-negative, .we-recommend-cont, .logotips, .in-case-block-row').fadeOut(400, function () {
            $(this).remove();
        });
        $('header, footer, .page-title').fadeOut(400, function () {
            $(this).css({
                'opacity': '0',
                '-webkit-animation': 'none',
                '-o-animation': 'none',
                'animation': 'none',
                'display': 'block'
            });
        });
        // Load content
        $('body').addClass('case cases-detail');
        var linkDataId = $(this).data('id');
        var pageTitleURL = $(document).find('.loadAjaxTitle').data('page-title-url') + '&id=' + linkDataId;
        var pageContentURL = $(document).find('.loadAjaxTitle').data('page-content-url') + '&id=' + linkDataId;

        function ajaxCallForAll(url) {
            return $.ajax({
                url: url,
                type: 'get',
                dataType: 'html'
            });
        }

        ajaxCallForAll(pageTitleURL).done(function (data) {
            $('.title-result').html(data);
            var h1Text = $(document).find('.title-result h1').text();
            var h6Text = $(document).find('.title-result h6').text();
            $(document).find('.inner-page-title h1').text(h1Text).css({
                'position': 'relative',
                'top': '50px'
            });
            $(document).find('.inner-page-title h6').text(h6Text).css({
                'position': 'relative',
                'top': '50px'
            });
            var headerHeight = $(document).find('header').outerHeight();
            var pageTitleHeight = $(document).find('.page-title').outerHeight();
            var moveMeToMyPosition = headerHeight + pageTitleHeight;

            thisBlock.delay(400).animate({
                top: moveMeToMyPosition,
                left: 0,
                width: '100%',
                height: 450 // 450px is height of this block when visiting page directly so this why height is set to be 450
            }, 800, function () {
                $(this).css({
                    'position': '',
                    'top': '',
                    'width': '',
                    'z-index': ''

                });
                thisBlock.delay(800).queue(function(){
                    $(this).css({
                      'background-size': 'contain',
                      'background-image': 'url(' + hdImage + ')'
                    });
                });
                $('body').removeClass('home-page');
                $('header, .page-title').delay(400).animate({
                    opacity: 1
                }, 400);
                $(document).find('.inner-page-title h1, .inner-page-title h6').delay(400).animate({
                    'top': '0'
                }, 400);
                $('.content-result').fadeIn(400).animate({
                    opacity: 1,
                    'margin-top': '0'
                }, 400);
                $('footer').fadeIn(400).removeAttr('style');
                $(document).prop('title',  $(document).find('.inner-page-title h6').text() + ' - Folkmatic');
                $('html, body').delay(400).animate({scrollTop: 0}, 0);
                new WOW().init();
                removeLastSectionDevider();
            });
        });

        ajaxCallForAll(pageContentURL).done(function (data) {
            $('.content-result').hide().load(pageContentURL);

            $(document).find('.content-result').css({
                height: 'auto',
                'margin-top': '50px'
            });
        });

        var caseDetailURL = $(this).data('href');
        var stateObj = { state: 1 };

        History.pushState(stateObj, null, caseDetailURL);
    });
    // Add active class to the first element in the carousel
    carouselActive('.carousel-inner', '.carousel-item');

});

$(window).load(function () {
    var innerMoverSelector = $('.inner-mover'),
        innerMoverWrapperSelector = $('.inner-movers-wrapper'),
        pageUrl = window.location.href,
        caseBlock = $('.case-block');

    //Play ilustration on mouse enter
    caseBlock.on('mouseover', animateIlustration);
    //do the dot helper funcion call need to be done at load so that heights are correct
    setInnerMoverWrapperHeight(findBiggestInnerMover(innerMoverSelector), innerMoverWrapperSelector, 768);
    //On resize set height of innerWrapper)
    $(window).resize(function(){
      setInnerMoverWrapperHeight(findBiggestInnerMover(innerMoverSelector), innerMoverWrapperSelector, 768);
    });

    new WOW().init();
    // Set main margin bottom to reveal footer(if not on iOS device, such as iPhone, iPad etc...)

    makeFooterFixed();

    heroImageSize('.small-res-bckg', 1.77778);
    heroImageSize('.big-res-bckg', 3.555556);
    heroImageSize('.big-res-bckg-about', 2.1333333);

    responsiveBlock($('.case-block-single-sase'), 2, 210, 450);

    var bodyOnLoadHTML = $('body').html();

    // $(window).on("popstate", function(e) {
    //     var state = e.originalEvent.state;
    //
    //     if(state) {
    //         alert(state.index);
    //     } else {
    //
    //       $('body').removeClass('case cases-detail');
    //       $('body').html(bodyOnLoadHTML);
    //       $(document).prop('title', $(document).find('.inner-page-title h6').text() + ' - Folkmatic');
    //
    //     }
    // });

    History.Adapter.bind(window,'statechange',function(){
        var State = History.getState();

        if (State.url == homePageUrl + '/' || State.url == homePageUrl + '/cases/') {
          window.location.reload();
        }
    });


    //make recommended-views columns same size
    //column sizer take jquery selector as argument, and break point from which ColumnEqualizer will be enabled

    // Uncomment this if tested browser do not support display flex!
    // $('.we-recommend-row').ColumnEqualizer($('.we-recommend-block'), 991);

});