var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		events: {
			onStateChange: function(event) {
				if (event.data == YT.PlayerState.ENDED)
					location.hash = "#to-nie-partia";
			}
		}
	});
	player.pauseVideo();
};

$(window).on("hashchange", function(e) {
	try
	{
		if (document.location.hash == "#spot")
			setTimeout(function(){player.playVideo();}, 500);
		else{}
			player.pauseVideo();
	}
	catch (e) {}
});
