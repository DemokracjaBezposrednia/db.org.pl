(function($) {

	/*------------------------------------------------*/
	/*  Credit: Eike Send for the awesome swipe event */
	/*------------------------------------------------*/
	$.fn.swipeEvents = function() {
		return this.each(function() {
			var startX, startY, $this = $(this);

			$this.on('touchstart', touchstart);

			function touchstart(event) {
				var touches = event.originalEvent.touches;
				if (touches && touches.length) {
					startX = touches[0].pageX;
					startY = touches[0].pageY;
					$this.on('touchmove', touchmove);
				}
			}

			function touchmove(event) {
				var touches = event.originalEvent.touches;
				if (touches && touches.length) {
					var deltaX = startX - touches[0].pageX;
					var deltaY = startY - touches[0].pageY;

					if (deltaX >= 50)
						$this.trigger("swipeLeft");
					if (deltaX <= -50)
						$this.trigger("swipeRight");
					if (deltaY >= 50)
						$this.trigger("swipeUp");
					if (deltaY <= -50)
						$this.trigger("swipeDown");

					if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50)
						$this.off('touchmove', touchmove);
				}
			}
		});
	};

	$.hashnavig = function(options)
	{
		var settings = $.extend({
			loop: false,
			swipe: true,
			enabled: true,
			scroll: true,
			keyboard: true,
			pagination: false,
			elements: $("section[id]"),
			activeClass: true,
			activeVariable: true,
		}, options);

		settings.elements.each(function()
		{
			$(this).data("id", $(this).attr("id"));
		});

		var active = {}
		$(window).on("hashchange", function(e) {
			var hash = window.location.hash.split("#")[1];
			var node = settings.elements.filter(function(){return $(this).data("id") == hash;})[0];
			if (node == undefined && active.section == undefined)
				node = settings.elements[0];
			if (node == undefined)
				return;
			active.section = node;
			active.id      = $(active.section).data("id");
			active.index   = settings.elements.index(active.section);
		});

		var moveDown = function() {
			var next = active.index + 1;
			console.log(active.index);
			if (next >= settings.elements.length)
				if (settings.loop == true)
					next = 0;
				else
					return;
			window.location.hash = "#" + $(settings.elements[next]).data("id");
		}

		var moveUp = function() {
			var prev = active.index - 1;
			if (prev < 0)
				if (settings.loop == true)
					prev = settings.elements.length-1;
				else
					return;
			window.location.hash = "#" + $(settings.elements[prev]).data("id");
		}

		if (settings.enabled && settings.swipe)
			$(document).swipeEvents().on("swipeDown", function(e){
				if (typeof settings.enabled == 'function')
					if (!settings.enabled()) return;
				if (typeof settings.swipe == 'function')
					if (!settings.swipe()) return;
				e.preventDefault();
				moveUp();
			}).on("swipeUp", function(e){
				if (typeof settings.enabled == 'function')
					if (!settings.enabled()) return;
				if (typeof settings.swipe == 'function')
					if (!settings.swipe()) return;
				e.preventDefault();
				moveDown();
			});

		if (settings.enabled && settings.scroll)
		{
			var lastAnimation = 0;
			$(document).on('mousewheel DOMMouseScroll', function(e) {
				if (typeof settings.enabled == 'function')
					if (!settings.enabled()) return;
				if (typeof settings.scroll == 'function')
					if (!settings.scroll()) return;
				e.preventDefault();

				var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;

				var timeNow = new Date().getTime();
				// Cancel scroll if currently animating or within quiet period
				if(timeNow - lastAnimation < 1000)
					return;

				if (delta < 0)
					moveDown()
				else
					moveUp()

				lastAnimation = timeNow;
			});
		}

		if (settings.enabled && settings.keyboard)
			$(document).keydown(function(e) {
				if (typeof settings.enabled == 'function')
					if (!settings.enabled()) return;
				if (typeof settings.keyboard == 'function')
					if (!settings.keyboard()) return;

				var tag = e.target.tagName.toLowerCase();

				switch(e.which) {
					case 38:
						e.preventDefault();
						if (tag != 'input' && tag != 'textarea') moveUp()
					break;
					case 40:
						e.preventDefault();
						if (tag != 'input' && tag != 'textarea') moveDown()
					break;
					case 32: // space
						e.preventDefault();
						if (tag != 'input' && tag != 'textarea') moveDown()
					break;
					default: return;
				}
			});

		if (settings.pagination)
		{
			var paginationList = "";
			$.each(settings.elements, function(i) {
				paginationList += "<li><a href='#" + $(this).data("id") + "'></a></li>"
			});
			$("<ul id='pagination'>" + paginationList + "</ul>").prependTo("body");
		}

		if (settings.arrows)
		{
			$.each(settings.elements, function(i) {
				if (i != 0)
					$(this).append('<a class="arrow-up"   href="#' + $(settings.elements[i-1]).data("id") + '"><i class="fa fa-angle-up"></i></a>');
				if (i != settings.elements.length - 1)
					$(this).append('<a class="arrow-down" href="#' + $(settings.elements[i+1]).data("id") + '"><i class="fa fa-angle-down"></i></a>');
			});
		}

		if (settings.activeClass)
			$(window).on("hashchange", function(e) {
				if (typeof settings.enabled == 'function')
					if (!settings.enabled()) return;
				if (typeof settings.activeClass == 'function')
					if (!settings.activeClass()) return;

				settings.elements.removeClass("active");
				$(active.section).addClass("active");

				$("a.active").removeClass("active");
				$("a[href='#" + active.id + "']").addClass("active");

				$("html").removeClass(function (index, css) {
					return (css.match(/\bactive-\S+/g) || []).join(' ');
				}).addClass("active-" + active.id);
			});

		if (settings.activeVariable)
			window.active = active;

		if (!window.location.hash)
			window.location.hash = "#" + $(settings.elements[0]).data("id");
		else
			$(window).trigger("hashchange");
	}

}(jQuery));
