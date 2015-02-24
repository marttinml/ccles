// Creates canvas 320 × 200 at 10, 50
var width 	= 1000,
	height 	= 800,
	circles = [],
	paper = Raphael(10, 50, width, height);

var  session = {};

$("#numbert").bind('mouseup',function(){
	
});

var jqxhr = $.ajax( {
  	url: "/getsesion",
  	type: "POST"
  })
  .done(function(data) {
    //alert( "success" );
    console.log(data);
    session = data;
    initSesion();
  })
  .fail(function() {
    //alert( "error" );
    console.log('fail');
  })
  .always(function() {
    //alert( "complete" );
  });


/*
var  session ={
		profile:{
			number:'5567087001',
			name:'Martín',
			lastname:'Mtz',
			img:'5567087001.png'
		},
		contacts:[
			{
				number:'2491196788',
				name:'Rosalino',
				lastname:'Santos',
				img:'2491196788.png',
				frequency:200
			},
			{
				number:'5567076825',
				name:'Joss',
				lastname:'Rojas',
				img:'5567076825.png',
				frequency:350
			},
			{
				number:'5530170506',
				name:'Miguel',
				lastname:'Rojas',
				img:'5530170506.png',
				frequency:250
			},
			{
				number:'5564222038',
				name:'Neztor',
				lastname:'Lozano',
				img:'5564222038.png',
				frequency:320
			},
			{
				number:'5519250258',
				name:'Chicharito',
				lastname:'Luna',
				img:'5519250258.png',
				frequency:270
			},
			{
				number:'5517840751',
				name:'Lupita',
				lastname:'Mtz',
				img:'profile.png',
				frequency:300
			}
		]
	};
	*/




function initSesion(){

var getXY = function(r,agl){

	var xx 		= 0,
		yy 		= 0;

		aglT = agl * (Math.PI/180);

		xx = 500+(r*Math.cos(aglT));
		yy = 400+(r*Math.sin(aglT));

	return {
		x:xx,
		y:yy
	};
}


// Profile
var circleMain = paper.circle(width / 2, height / 2, 100)
				.attr("fill", "rgb(51,153,0)")
				.attr("stroke", "#fff")
				.data('obj',session.user)
				.click(function(){
					console.log(this.data('i'));
			});
paper.image("./img/"+session.user.img, (width/2)-100, (height/2)-100, 200, 200);

var contactsLength = session.user.contacts.length;

var agl = 360 / contactsLength;
var aglCount = 0;



for(var i = 0; i < contactsLength ; i++){
	
	console.log(session.user.contacts[i].frecuency);
	console.log(getXY(session.user.contacts[i].frecuency,aglCount));

	session.user.contacts[i].coordinates 	= getXY(session.user.contacts[i].frecuency,aglCount);
	session.user.contacts[i].coordinatesMin = getXY(110,aglCount);

	aglCount += agl; 
}

var pathC = function (xloc, yloc, value, total, R) {
        var alpha = 360 / total * value,
            a = (90 - alpha) * Math.PI / 180,
            x = xloc + R * Math.cos(a),
            y = yloc - R * Math.sin(a),
            path;

            path = "M"+ xloc+ ',' +(yloc - R)+"A"+R+','+ R+','+0+','+ 1+','+ 1+','+ (xloc - 0.01)+','+(yloc - R);
            
        
        return {
            path: path
        };
    };
var backCircle = paper.path(pathC(500, 400, 100, 100, 110).path).attr({
        "stroke": "rgb(51,153,0)",
            "stroke-width": 2
    }); 

 var mouseenterImg = function(element){
 	element.show().toFront();
 };
 var mouseenterOpacity = function(element){
 	element.unhover(mouseenterImg,function(){});
 };
 var mouseeleaveOpacity = function(elementImg,elementOpacity){
 	elementImg.hover(mouseenterImg,function(){});
 	circles[this.data('index')].opacity.hide();
 };

//contacts
for(var i = 0 ; i < contactsLength ; i++){


	var line = paper.path("M"+width/2+" "+height/2+"L"+session.user.contacts[i].coordinates.x+" "+session.user.contacts[i].coordinates.y)
		.attr({
	        "stroke": "rgb(200,200,200)",
	        "stroke-width": 1
	    })
		.toBack();

	var circleOpacity = paper.circle(session.user.contacts[i].coordinates.x,session.user.contacts[i].coordinates.y, 50)
				.attr("fill", "rgba(0,0,0,.5)")
				.attr("stroke", "rgba(0,0,0,0)")
				.data('index',i)
				.hover(
				function(){
						mouseenterOpacity(circles[this.data('index')].img);
				},function(){
					circles[this.data('index')].opacity.hide();
				})
				.hide();

	var circle = paper.circle(session.user.contacts[i].coordinates.x,session.user.contacts[i].coordinates.y, 50)
				.attr("fill", "rgb(200,200,200)")
				.attr("stroke", "#fff")
				.data('obj',session.contacts[i])
				.hover(
				function(){
						
				},function(){
					
				})
				.click(function(){
					console.log(this.data('obj'));
				});

	var circleMin = paper.circle(session.user.contacts[i].coordinatesMin.x,session.user.contacts[i].coordinatesMin.y, 4)
				.attr({
						"fill":"rgb(255,255,255)",
						"stroke":"rgb(51,153,0)",
						"stroke-width": 2
					});
				


	var img = paper.image("./img/"+session.contacts[i].img, session.user.contacts[i].coordinates.x-45, session.user.contacts[i].coordinates.y-45, 90, 90)
		.data('obj',session.contacts[i])
		.data('index',i)
		.click(function(){
					console.log(this.data('obj'));
				})
		.hover(function(){
				mouseenterImg(circles[this.data('index')].opacity);
			},
			function(){

			}
		);



	obj = {	index  		: i,
			contact 	: circle,
			img 		: img,
			opacity 	: circleOpacity,
			line 		: line,
			circleMin 	: circleMin
		};
	circles.push(obj);
}

}