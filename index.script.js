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

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-30138440-1', 'db.org.pl');
ga('send', 'pageview');

$(window).on("hashchange", function(e) {
	try {
		if (location.hash != "#main")
			ga('send', 'pageview', {'page': '/' + location.hash, 'title': 'DB - ' + location.hash});
	} catch(e) {}
});
