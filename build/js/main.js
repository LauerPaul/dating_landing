var api,
settings = {
	sections: ['.section-1', '.section-2', '.section-3', '.section-4', '.feedback'],
	feedbackSection: '.feedback'
},
// constructor
run = function(){
	// offset top sections
	for (var i = 0; i < settings.sections.length; i++) {
		if(i==0 && typeof settings.sectionsPosition == 'undefined'){ settings.sectionsPosition = []; }
		settings.sectionsPosition.push($(settings.sections[i]).offset().top);
	}
},
// Scroll to form feedback
scrollTo = function(){
	var t = $(settings.feedbackSection).offset().top;
	$('body, html').animate({scrollTop: t});
},
validate = function(){
	var form = $('form#feedback'),
		name_input = $('input[name="name"]', form),
		email_input = $('input[name="email"]', form),
		name = name_input.val(),
		email = email_input.val(),
		status = {'email': false, 'name': false};

	if(email != '') {
	    var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,8}$/i;
	    if(!pattern.test(email)){
	    	email_input.addClass('error').next('.error-message').text('Вы ввели некорректный email').show();
    		status.email = false;
	    }else{
	    	email_input.removeClass('error').next('.error-message').text('').hide();
    		status.email = true;
	    }
	} else {
		email_input.addClass('error').next('.error-message').text('Укажите Ваш email').show();	
	}

	if(name == ''){
		name_input.addClass('error').next('.error-message').text('Укажите Вашe имя').show();
    	status.name = false;
	}
	else {
    	name_input.removeClass('error').next('.error-message').text('').hide();
    	status.name = true;
	}
	if(status.name && status.email){
		return true;
	}
},
form_submit = function(){
	var form_el = $('form#feedback'),
		valid = validate(),
		serialize = form_el.serialize();

	if(valid) {
		$.ajax({
			url: 'send.php',
			type: 'POST',
			data: serialize,
			dataType: 'json',
			success: function(data){
				if(data == 'SENDED') {
					$.ajax({
						url: 'send-success.html',
						type: 'POST',
						success: function(data){
							$('body').append(data);
							$('body').css({'overflow' : "hidden"});
						},
						error: function(er_log){
							console.log(er_log);
						}
					});		
				}
			},
			error: function(er_log){
				console.log(er_log);
			}
		});		
	}
},
close_success = function(){
	$('#Success').remove();
	$('body').css({'overflow' : "auto"});
},
loadModalImg = function(id){
	var id_ = $('#' + id),
		data = id_.attr('data-image'),
		next = id_.attr('data-next'),
		prev = id_.attr('data-prev'),
		modal = $('#myModal'),
		modal_img = $('.img-wrap img', modal),
		modal_next = $('.next-btn.control-btn', modal),
		modal_prev = $('.prev-btn.control-btn', modal);

	api.destroy();
	modal_img.attr('src', 'images/thumbnails/' + data);
	modal_next.attr('onclick', 'loadModalImg(\'' + next + '\')');
	modal_prev.attr('onclick', 'loadModalImg(\'' + prev + '\')');
	setTimeout(function(){
		var sP = $('.img-wrap').jScrollPane();
		api = sP.data('jsp');
	}, 200);
}

// DOCUMENT READY
$(document).ready(function(e){
	run();
	new WOW().init();
});

$(document).on('click','.image', function(){
	var this_ = $(this),
		data = this_.attr('data-image'),
		next = this_.attr('data-next'),
		prev = this_.attr('data-prev'),
		modal = $('#myModal'),
		modal_img = $('.img-wrap img', modal),
		modal_next = $('.next-btn.control-btn', modal),
		modal_prev = $('.prev-btn.control-btn', modal);

	modal_img.attr('src', 'images/thumbnails/' + data);
	modal_next.attr('onclick', 'loadModalImg(\'' + next + '\')');
	modal_prev.attr('onclick', 'loadModalImg(\'' + prev + '\')');
	modal.modal('show')
	setTimeout(function(){
		var sP = $('.img-wrap').jScrollPane();
		api = sP.data('jsp');
	}, 500);
});
