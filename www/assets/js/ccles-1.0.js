$('#register').bind('mouseup',createUser);


function createUser(event){
	event.preventDefault();
	var user = {
		number:$('#number').val(),
		name:$('#name').val(),
		contacts:[]
	}
	console.log(user);
	var createUserAjax = $.ajax({
		url:'http://localhost:2000/newUser',
		type:'POST',
		contentType:'application/json',
		dataType:'json',
		data:JSON.stringify(user)
	});

	createUserAjax.done(function(event, data){
		console.log(data);
	});

	createUserAjax.fail(function(event, data){
		console.log(data);
	});

}