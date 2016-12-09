var footer = {
	
	init :　function(){
		$("#footer").load("footer.html",function(){
			console.log("footer");
		});
	}
}
footer.init();
