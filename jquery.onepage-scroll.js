/* ===========================================================
* jquery-onepage-scroll.js v1.2.1
* ===========================================================
* Copyright 2013 Pete Rojwongsuriya.
* http://www.thepetedesign.com
*
* Create an Apple-like website that let user scroll
* one page at a time
*
* Credit: Eike Send for the awesome swipe event
* https://github.com/peachananr/onepage-scroll
*
* License: GPL v3
*
* ========================================================== */

!function($){

	$.fn.onepage_scroll = function(options){
		var settings = $.extend({
			enabled: true,
		}, options);

		var el = $(this)

		el.addClass("onepage-wrapper");

		$(window).on("hashchange", function(e) {
			if (typeof settings.enabled == 'function')
				if (!settings.enabled()) return;

			var pos = ((active.index) * 100) * -1;

			el.css({
				"-webkit-transform": !fixTransformPercentage ? "translate3d(0, " + pos + "%, 0)" : "translate3d(0, " + ((pos/100) * $(this).height()) + "px, 0)",
				"-webkit-transition": '',
				"-moz-transform": "translate3d(0, " + pos + "%, 0)",
				"-ms-transform": "translate3d(0, " + pos + "%, 0)",
				"-o-transform": "translate(0, " + pos + "%)",
				"transform": "translate3d(0, " + pos + "%, 0)",
			});

			el.data("onepage_scroll_pos", pos);

			el.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {});
		});

		$(window).resize(function(){
			if (typeof settings.enabled == 'function')
				if (settings.enabled()) return;

			el.css({
				"-webkit-transform": '',
				"-webkit-transition": '',
				"-moz-transform": '',
				"-ms-transform": '',
				"-o-transform": '',
				"transform": '',
			});
		});

		function getAndroidVersion(ua) {
			var ua = ua || navigator.userAgent;
			var match = ua.match(/Android\s([0-9\.]*)/);
			return match ? match[1] : false;
		};

		var fixTransformPercentage = getAndroidVersion();

		if (fixTransformPercentage)
			$(window).resize(function(){
				el.css({
					"-webkit-transform": "translate3d(0, " + ((el.data("onepage_scroll_pos")/100) * el.height()) + "px, 0)",
					"-webkit-transition": "",
				})
			});
	}
}(window.jQuery);
