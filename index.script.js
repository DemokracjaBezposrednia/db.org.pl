$(document).ready(function(){
	var isBig = function() { return $(window).width() >= 400; };

	$.hashnavig({
		elements: $("#main > section[id]"),
		loop: true,
		pagination: true,
		arrows: true,
		enabled: isBig,
	});
	$("#main").onepage_scroll({
		enabled: isBig,
	});

	var wasBig = !isBig();
	$(window).resize(function(){
		var changed = false;
		if (!isBig())
		{
			if (wasBig)
			{
				wasBig = false;
				changed = true;
				$("#main > section").each(function()
				{
					$(this).attr("id", $(this).data("id"));
				});
			}
		}
		else
		{
			if (!wasBig)
			{
				wasBig = true;
				changed = true;
				$("#main > section").each(function()
				{
					$(this).attr("id", $(this).data("id") + "-x");
				});
			}
		}
		if (changed)
		{
			console.log(window.location.hash);
			var hash = window.location.hash;
			window.location.hash = "#main";
			setTimeout(function(){window.location.hash = hash;}, 0);
		}
	});
	$(window).resize();
});

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-30138440-1']);
_gaq.push(['_trackPageview']);

(function() {
	var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
