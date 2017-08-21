settings = {
	title_class: '.title',
	dataAttr: 'data-text',
	sections: ['.section-1', '.section-2', '.section-3', '.section-4', '.feedback'],
	feedbackSection: '.feedback'
},
// constructor
run = function(){
	// objects
	for (var i = 0; i < settings.sections.length; i++) {
		if(i==0 && typeof settings.objects == 'undefined'){ settings.objects = []; }
		settings.objects.push(settings.sections[i]+ ' ' + settings.title_class);
	}
	// options
	for (var i = 0; i < settings.sections.length; i++) {
		if(i==0 && typeof settings.options == 'undefined'){ settings.options = []; }
		settings.options.push({
			strings: [$(settings.objects[i]).attr(settings.dataAttr)],
			typeSpeed: 10
		});
	}
	// offset top sections
	for (var i = 0; i < settings.sections.length; i++) {
		if(i==0 && typeof settings.sectionsPosition == 'undefined'){ settings.sectionsPosition = []; }
		settings.sectionsPosition.push($(settings.sections[i]).offset().top);
	}
	// offset top sections
	for (var i = 0; i < settings.sections.length; i++) {
		if(i==0 && typeof settings.status == 'undefined'){ settings.status = []; }
		settings.status.push(false);
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
	    var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
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
		valid = validate();

	if(valid) {
		
	}
}

// DOCUMENT READY
$(document).ready(function(e){
	run();
	new WOW().init();
});
