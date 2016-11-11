var isTouch =  !!("ontouchstart" in window) || window.navigator.msMaxTouchPoints > 0;
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
/**
 * Browser and devices detection methods
 */
function isIOS () {
    var iDevices = [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ];

  if (!!navigator.platform) {
    while (iDevices.length) {
      if (navigator.platform === iDevices.pop()){ return true; }
    }
  }

  return false;
}

/**
 * @param {jquery selector} elm - this element will have position static.
 */
function elmToFixed(elm) {
    elm.css({
      position: 'fixed'
    });

}

/**
 * @param {jquery selector} body - body jquery selrctor or any other.
 */
function addBrowerBodyClass(body) {
  if (isSafari) {
    body.addClass('isSafari');
  }

  if (isIOS()) {
    body.addClass('iOs-device');
  }
}

/**
 * @param {jquery selector} elm - Check if this element apear in VP, return true or false.
 */
function ifInViewPort(elm) {
  var viewPort = $(window),
      windowBottomOffset = viewPort.height() + viewPort.scrollTop(),
      elmentTopOfseet = elm.offset().top;

  return (
    elmentTopOfseet <= windowBottomOffset
  );
}

function doItOnResizeFn(elm) {
    $(window).resize(function () {
        elm();
    });
}

//Menu trigger
function menuTrigger(humbergerIcon, menuWrapper, header) {
    var topOffsetHeader;

    function openNav() {
      $(humbergerIcon).addClass('open');
      $(menuWrapper).addClass('open');
      $(header).addClass('open');
      $('.logo').addClass('hoveredLogo');
      $('.menuBar').addClass('hoverMenuBar');

      topOffsetHeader = $(header).offset().top;
      window.setTimeout(function(){
        $('body').addClass('menu-opened');
      }, 500)
    }
    function closeNav() {
       $(humbergerIcon).removeClass('open');
       $(menuWrapper).removeClass('open');
       $(header).removeClass('open');
       $('.logo').removeClass('hoveredLogo');
       $('body').removeClass('menu-opened');
       $('.menuBar').removeClass('hoverMenuBar');

       $(header).addClass('navbar-stay-open');
      if (!isTouch) {
        $('.menu-trigger').blur();
      }

      $(window).scrollTop(topOffsetHeader);
    }
    $(humbergerIcon).click(function () {
      if ($(this).hasClass('open')) {
        closeNav();
        return;
      }
      openNav();
    });

    $(document).keyup(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode `27`
          closeNav();
        }
    });

    $(menuWrapper).click(function(){
      closeNav();
    });

    $('.menu-container a').click(function(e){
      e.stopPropagation();
    });
}

// Add active class to the first element in the carousel
function carouselActive(elm1, elm2){
    $(elm1).find(elm2).eq(0).addClass('active');
}

// Set main margin bottom to reveal footer
/**
  * @param {jquery selector} element - dom element for margin to be seted.
  * @param {intiger} marginValue - margin value.
 */
function giveMarginToElement (element, elementToTakeMarginFrom) {
  marginValue = elementToTakeMarginFrom.outerHeight();

  element.css('margin-bottom', marginValue);

}

function makeFooterFixed() {
  var footer = $('footer'),
      main = $('main');

    if (ifInViewPort(footer) && !isIOS()) {
      $(window).resize(function(){
        giveMarginToElement(main, footer);
      })
    }

  $(window).scroll(function(){
    if (ifInViewPort(footer) && !isIOS()) {


      giveMarginToElement(main, footer);

      elmToFixed(footer);
    }
  });
}

/**
 * @param {jquery selector} innerMovers - moving divs in history slider.
 */
function findBiggestInnerMover (innerMovers) {
  var moverHeights = [],
      biggestMoverHeight;

  innerMovers.each(function(){
    var curentMover = $(this);

    moverHeights.push(curentMover.outerHeight());
  });

  biggestMoverHeight = Math.max.apply(Math, moverHeights);

  return biggestMoverHeight;

}

/**
 * @param {intriger} heightToSet - height of innerWrapper to be set.
 * @param {jquery selector} innerMoverWrapper - InnerMover wrapper.
 * @param {intriger} forBreakPointUp - height will be set when viewport size hits this number and above
 */
function setInnerMoverWrapperHeight (heightToSet, innerMoverWrapper, forBreakPointUp) {
  var vpSize = $(window).width();

  if (vpSize >= forBreakPointUp) {
    innerMoverWrapper.height(heightToSet);
    return;
  }

  innerMoverWrapper.height('auto');
}


function dotToDot(){
    function innerDotToDot() {
      var firstDot = $('.first-dot');
      function verticalRulerHandle (clickedDot) {
        var offset = clickedDot.offset().left - clickedDot.parent().offset().left;
        $('.vertical-ruler').css({
            left: offset
        });
        $('.vertical-line').css({
            height: 0
        });
        $('.upper-dot').css({
            bottom: -30
        }).toggleClass('has-height');
        function waitForIt(elm1, elm2) {
            $(elm1).css({
                height: ''
            });
            $(elm2).css({
                bottom: ''
            });
        }
        setTimeout(
            function(){
                waitForIt('.vertical-line', '.upper-dot');
            }, 600);
      }
      verticalRulerHandle(firstDot);
      $(window).resize(function(){
        verticalRulerHandle(firstDot);
      })

        $('.dot-point').on('click', function () {
            var elem = $(this);
            verticalRulerHandle(elem);
            $(window).resize(function(){
              verticalRulerHandle(elem);
            })
            var firstClass = $(this).attr('class').split(" ")[0]
            var firstClassOffOffset = firstClass.replace("offset-", "");
            $('.over-ruler').removeClass(function (index, css) {
                return (css.match (/(^|\s)col-md-\S+/g) || []).join(' ');
            });;
            $('.over-ruler').addClass(firstClassOffOffset);
            $('.move-me-right').removeClass(function (index, css) {
                return (css.match (/(^|\s)col-md-offset-\S+/g) || []).join(' ');
            });;
            $('.move-me-right').addClass(firstClass);
            var dataMover = $(this).data('mover-div');
            if($('.inner-mover').hasClass(dataMover)) {
                $('.inner-mover').removeClass('active');
                $('.' + dataMover).addClass('active');
                var shuffleH3 = $('.' + dataMover + ' h3');
                var shuffleH3text = shuffleH3.text();
                var shuffleP = $('.' + dataMover + ' p');
                var shufflePtext = shuffleP.text();
                var shufflePheight = shuffleP.height();
                shuffleP.css({
                    'min-height':  shufflePheight
                });
                $('.' + dataMover + ' h3').shuffleLetters(shuffleH3text);
                $('.' + dataMover + ' p').shuffleLetters({
                    "text"      : shufflePtext,
                    "fps"		: 300,
                    "callback"	: function(){
                        shuffleP.css({
                            'min-height':  ''
                        });
                    }
                });
            }
        });
    }
    innerDotToDot();
}

function heroImageSize(elm1, sizer) {
    function innerHeroImageSize() {
        var heroImg = $(elm1);
        var heroImgWidth = heroImg.width();
        heroImg.css({
            height: heroImgWidth / sizer
        });
    }
    doItOnResizeFn(innerHeroImageSize);
    innerHeroImageSize();
}

/**
 * @param {jquery selector} block - block to set height.
 * @param {intriger} aspectRatioDevider - devide block height with this value.
 * @param {intriger} minHeight - min height to be set
 * @param {intriger} maxHeight - max height to be set
 */
function responsiveBlock(block, aspectRatioDevider, minHeight, maxHeight) {

  function setImageHeight() {
    var blockWidth = block.width();

    block.css({
      height: blockWidth / aspectRatioDevider
    });
  }

  function setMinHeight() {
    block.css({
      height: minHeight
    });
  }

  function setMaxHeight() {
    block.css({
      height: maxHeight
    });
  }

  function init(){
    setImageHeight();

    var blockHeight = block.height();

    if (blockHeight <= minHeight) {
      setMinHeight()
    }
    if (blockHeight >= maxHeight) {
      setMaxHeight();
    }
  }

  init();
  doItOnResizeFn(init);
}


function navBarAnimate() {
  var previousScroll = 0,
      navbar = $('header');

  $(window).scroll(function(){
    var currentScroll = $(this).scrollTop();

    if (currentScroll > previousScroll && currentScroll > 30  && !navbar.hasClass('navbar-stay-open')) { // scroll up, 30 is because of safari stupid scroll!
      navbar.addClass('animate-header');

    } else { // scroll down
      navbar.removeClass('animate-header navbar-stay-open');

    }
    previousScroll = currentScroll;

  });
}

function animateIlustration() {
  var ilustration = $(this).find('video'),
      stillImage = $(this).find('img');

  stillImage.hide();
  ilustration.show().get(0).play();

}

function removeLastSectionDevider() {
  var sectionWithBorder = $('.hasDevider'),
      devider = $('.hr-devider'),
      lastSectionWithDevider = sectionWithBorder[sectionWithBorder.length - 1],
      lastDeviderToRemove = $(lastSectionWithDevider).next();

      lastDeviderToRemove.hide();
}

/**
 * ColumnEqualizer jQuery plugin, created by Nikola Mitic
 * Used for making columns same height per row
 *

 (function ($){
   $.fn.ColumnEqualizer = function (columnSelector, breakPointDown) {

     var defaultColumnSelector = $('div[class^="col-"]'),
          column = (typeof columnSelector === 'undefined') ? defaultColumnSelector : columnSelector,
          biggestColumns = [],
          vpSize = $(window).width();
          turnOffOnVPsize = (typeof breakPointDown === undefined) ? false : breakPointDown;
          me = this;

     //Find column with biggest height per row
     function findBiggestColumn () {
       //iterating through all of the rows
       me.each(function(){
         var columns = $(this).find(column),
             columnsHeight = [];
          //each column height is stored in array
          columns.each(function(){
           columnsHeight.push($(this).height());
         });
          //creating array of literal object with row and bigest height per row as data
          biggestColumns.push({
           row: $(this),
           biggestHeight: Math.max.apply(Math, columnsHeight)
         });
       });
     };

     //Set height of all columns to be same as height of biggest column per row
     function setBiggestHeight () {
       var nubmerOfRows = me.length;
       //iterating via array of object containg data of biggest height and it's appropriate row
       for (var i = 0; i < nubmerOfRows; i++) {
         var currentRow = biggestColumns[i].row,
             maxHeightToSet = biggestColumns[i].biggestHeight;

         //set heights to all columns per curent iterating row
         currentRow.each(function(){
           var columnToSet = $(this).find(column);

           columnToSet.height(maxHeightToSet);

         });
       };
     };
     //turn of column equalizer on setted break point
     function breakPointTurnOff (breakPoint) {
       if ($(window).width() <= breakPoint && turnOffOnVPsize) {
         setHeightsToAuto()
       };
     }

     //We need to revert columns height back to auto for resize event to work properly
     function setHeightsToAuto () {
       me.each(function(){
         $(this).find(column).css({
           height: 'auto'
         });
       });
     };

     //init method
     function init () {
       findBiggestColumn();
       setBiggestHeight();
       breakPointTurnOff(turnOffOnVPsize);
     };
     //on resize init ColumnEqualizer
     $(window).resize(function(){
       //reseting biggestColumn array of object back to initial state
       biggestColumns = [];

       setHeightsToAuto();
       init();
     })
     //Init ColumnEqualizer
     init();

   };
 }(jQuery));
 
*/