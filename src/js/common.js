$(document).ready(function() {

	$('body').on('click', function () {
		$('.js-header').removeClass('is-active');
		$('body').removeClass('is-hidden');
		$('.js-btn-menu').removeClass('is-active');
	});

	$('.js-btn-menu').on('click', function (event){
		var this_ 	= $(this),
			parents = this_.parents('.js-header');
		$('body').toggleClass('is-hidden');
		this_.toggleClass('is-active');
		parents.toggleClass('is-active');
		event.stopPropagation();
	});

});
