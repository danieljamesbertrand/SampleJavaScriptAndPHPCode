$(document).ready(function() {

	//------- Google Maps ---------//
var cnvas=document.getElementById("canvas");
var ctx=cnvas.getContext("2d");
var img = new Image();
///0var aud = new Audio();
var angleInDegrees=0;


$("#clockwise").click(function(){ 
    angleInDegrees+=90;
    drawRotated(angleInDegrees);
});

$("#counterclockwise").click(function(){ 
    angleInDegrees-=90;
    drawRotated(angleInDegrees);
});

function drawRotated(degrees){
    ctx.clearRect(0,0,cnvas.width,cnvas.height);
    ctx.save();
    ctx.translate(cnvas.width/2,cnvas.height/2);
    ctx.rotate(degrees*Math.PI/180);
    ctx.drawImage(img,-img.width/2,-img.width/2);
    ctx.restore();
}
                var fitAspectRatio = function(srcWidth, srcHeight, fitWidth, fitHeight) {
                    if(fitHeight > fitWidth) {
                        theta = Math.PI / 2;
                        var temp = srcWidth;
                        srcWidth = srcHeight;
                        srcHeight = temp;
                    } else {
                        theta = 0;
                    }
                    var ratio = [fitWidth / srcWidth, fitHeight / srcHeight];
                    ratio = Math.min(ratio[0], ratio[1]);
                    return {
                        width : srcWidth * ratio,
                        height : srcHeight * ratio,
                        angle : theta
                    };
                };
				
   img.onload=function(){
	   
	   console.log('img.onload function running....');
       var newsize = fitAspectRatio(img.width, img.height, 400, 600);
 	   console.log('fitAspectRatio(img.width, img.height, 400, 600)');
                    cnvas.width = 400;
                    cnvas.height = 600;
                    img.centerX = canvas.width / 2;
                    img.centerY = canvas.height / 2;
                    if(newsize.angle != 0) {
                        ctx.translate(img.centerX, img.centerY);
 	   console.log('ctx.translate(img.centerX, img.centerY)');
	   
       ctx.rotate(newsize.angle);
 	   console.log('ctx.rotate(newsize.angle)');
	   
       ctx.translate(-img.centerX, -img.centerY);
 	   console.log('ctx.translate(-img.centerX, -img.centerY)');
	   
       ctx.drawImage(img, (canvas.width - newsize.height) / 2, (canvas.height - newsize.width) / 2, 600, 400);
 	   console.log('ctx.drawImage(img, (canvas.width - newsize.height) / 2, (canvas.height - newsize.width) / 2, 600, 400)');

                    } else {
                        ctx.drawImage(img, (canvas.width - newsize.width) / 2, (canvas.height - newsize.height) / 2, 600, 400);
  	   console.log('ctx.drawImage(img, (canvas.width - newsize.width) / 2, (canvas.height - newsize.height) / 2, 600, 400)');
                   }
   }

   //aud.onload=function(){
	   
	// play audio    
   //}
   //vid.onload=function(){
	   
	// play video    
   //}

    function setMarkers(map, db) {
        for (var i = 0; i < db.length; i++) {
            var sites = db[i];
            var siteLatLng = new google.maps.LatLng(db[i].latitude, db[i].longitude);



            var marker = new google.maps.Marker({
                position: siteLatLng,
				  markertype : db[i].type,
                map: map,
                title: db[i].issue+' at '+db[i].time_formatted,
                zIndex: i,
                html: db[i].mediaUrl
            });

            var contentString = "Some content";

            google.maps.event.addListener(marker, "click", function () {
                console.log(this.html);

				  img.src = this.html;
				  infowindow.setContent('image: '+ this.html);
				 infowindow.open(map, this);
            });
        }
    }


 

	
var directions = {};
var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();


	
function drawLines() {
	var path;
	var coordinates;
  	var ttl = db.length;
	var i = 0;
	var j = i + 1;
	for (k=j;k<db.length;k++) {

 
	coordinates = [new google.maps.LatLng(db[k-1].latitude, db[k-1].longitude),new google.maps.LatLng(db[k].latitude, db[k].longitude)]; 
	   
/*     directions.start = new google.maps.LatLng(db[k-1].latitude, db[k-1].longitude);
         directions.end = new google.maps.LatLng(db[k].latitude, db[k].longitude);

         directionsService.route({
		       		origin : directions.start,
      		  destination : directions.end,
       		    travelMode: google.maps.TravelMode.DRIVING
         }, function(result, status) {
           if (status == google.maps.DirectionsStatus.OK) {
             directionsDisplay.setDirections(result);
             directionsDisplay.setMap(map);
            sleep(1000);
           } else alert("Directions Request failed:" +status);
         });
*/
 
    
	    path = new google.maps.Polyline({     
                 path: coordinates,    
                 geodesic: true,     
                 strokeColor: '#FF0000',     
                 strokeOpacity: 1.0,     
                 strokeWeight: 2   
                 });    

        path.setMap(map);	
	}
       } 


var infowindow = null;

	// Creating a LatLng object containing the coordinate for the center of the map
	var latlng = new google.maps.LatLng(db[0].latitude,db[0].longitude);
	  
	// Creating an object literal containing the properties we want to pass to the map  
	var options = {  
		zoom: 13, // This number can be set to define the initial zoom level of the map
		center: latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP // This value can be set to define the map type ROADMAP/SATELLITE/HYBRID/TERRAIN
	};  
	// Calling the constructor, thereby initializing the map  
	var map = new google.maps.Map(document.getElementById('map_div'), options);  
	
	// Define Marker properties
	var image = new google.maps.MarkerImage('images/beachflag.png',
		// This marker is 129 pixels wide by 42 pixels tall.
		new google.maps.Size(129, 42),
		// The origin for this image is 0,0.
		new google.maps.Point(0,0),
		// The anchor for this image is the base of the flagpole at 18,42.
		new google.maps.Point(18, 42)
	);

setMarkers(map, db);
drawLines();

infowindow = new google.maps.InfoWindow({
                content: "loading..."
});
	
function AutoCenter() {
//  Create a new viewpoint bound
	var bounds = new google.maps.LatLngBounds();
//  Go through each...
	$.each(markers, function (index, marker) {
		bounds.extend(marker.position);
	});
//  Fit these bounds to the map
	map.fitBounds(bounds);
	}
});



