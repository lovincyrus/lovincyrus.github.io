function isIOS(){var e=["iPad Simulator","iPhone Simulator","iPod Simulator","iPad","iPhone","iPod"]
if(navigator.platform)for(;e.length;)if(navigator.platform===e.pop())return!0
return!1}function elmToFixed(e){e.css({position:"fixed"})}function addBrowerBodyClass(e){isSafari&&e.addClass("isSafari"),isIOS()&&e.addClass("iOs-device")}function ifInViewPort(e){var i=$(window),o=i.height()+i.scrollTop(),n=e.offset().top
return o>=n}function doItOnResizeFn(e){$(window).resize(function(){e()})}function menuTrigger(e,i,o){function n(){$(e).addClass("open"),$(i).addClass("open"),$(o).addClass("open"),$(".logo").addClass("hoveredLogo"),$(".menuBar").addClass("hoverMenuBar"),a=$(o).offset().top,window.setTimeout(function(){$("body").addClass("menu-opened")},500)}function t(){$(e).removeClass("open"),$(i).removeClass("open"),$(o).removeClass("open"),$(".logo").removeClass("hoveredLogo"),$("body").removeClass("menu-opened"),$(".menuBar").removeClass("hoverMenuBar"),$(o).addClass("navbar-stay-open"),isTouch||$(".menu-trigger").blur(),$(window).scrollTop(a)}var a
$(e).click(function(){return $(this).hasClass("open")?void t():void n()}),$(document).keyup(function(e){27==e.keyCode&&t()}),$(i).click(function(){t()}),$(".menu-container a").click(function(e){e.stopPropagation()})}function carouselActive(e,i){$(e).find(i).eq(0).addClass("active")}function giveMarginToElement(e,i){marginValue=i.outerHeight(),e.css("margin-bottom",marginValue)}function makeFooterFixed(){var e=$("footer"),i=$("main")
ifInViewPort(e)&&!isIOS()&&$(window).resize(function(){giveMarginToElement(i,e)}),$(window).scroll(function(){ifInViewPort(e)&&!isIOS()&&(giveMarginToElement(i,e),elmToFixed(e))})}function findBiggestInnerMover(e){var i,o=[]
return e.each(function(){var e=$(this)
o.push(e.outerHeight())}),i=Math.max.apply(Math,o)}function setInnerMoverWrapperHeight(e,i,o){var n=$(window).width()
return n>=o?void i.height(e):void i.height("auto")}function dotToDot(){function e(){function e(e){function i(e,i){$(e).css({height:""}),$(i).css({bottom:""})}var o=e.offset().left-e.parent().offset().left
$(".vertical-ruler").css({left:o}),$(".vertical-line").css({height:0}),$(".upper-dot").css({bottom:-30}).toggleClass("has-height"),setTimeout(function(){i(".vertical-line",".upper-dot")},600)}var i=$(".first-dot")
e(i),$(window).resize(function(){e(i)}),$(".dot-point").on("click",function(){var i=$(this)
e(i),$(window).resize(function(){e(i)})
var o=$(this).attr("class").split(" ")[0],n=o.replace("offset-","")
$(".over-ruler").removeClass(function(e,i){return(i.match(/(^|\s)col-md-\S+/g)||[]).join(" ")}),$(".over-ruler").addClass(n),$(".move-me-right").removeClass(function(e,i){return(i.match(/(^|\s)col-md-offset-\S+/g)||[]).join(" ")}),$(".move-me-right").addClass(o)
var t=$(this).data("mover-div")
if($(".inner-mover").hasClass(t)){$(".inner-mover").removeClass("active"),$("."+t).addClass("active")
var a=$("."+t+" h3"),s=a.text(),r=$("."+t+" p"),c=r.text(),d=r.height()
r.css({"min-height":d}),$("."+t+" h3").shuffleLetters(s),$("."+t+" p").shuffleLetters({text:c,fps:300,callback:function(){r.css({"min-height":""})}})}})}e()}function heroImageSize(e,i){function o(){var o=$(e),n=o.width()
o.css({height:n/i})}doItOnResizeFn(o),o()}function responsiveBlock(e,i,o,n){function t(){var o=e.width()
e.css({height:o/i})}function a(){e.css({height:o})}function s(){e.css({height:n})}function r(){t()
var i=e.height()
o>=i&&a(),i>=n&&s()}r(),doItOnResizeFn(r)}function navBarAnimate(){var e=0,i=$("header")
$(window).scroll(function(){var o=$(this).scrollTop()
o>e&&o>30&&!i.hasClass("navbar-stay-open")?i.addClass("animate-header"):i.removeClass("animate-header navbar-stay-open"),e=o})}function animateIlustration(){var e=$(this).find("video"),i=$(this).find("img")
i.hide(),e.show().get(0).play()}function removeLastSectionDevider(){var e=$(".hasDevider"),i=($(".hr-devider"),e[e.length-1]),o=$(i).next()
o.hide()}var isTouch=!!("ontouchstart"in window)||window.navigator.msMaxTouchPoints>0,isSafari=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)
