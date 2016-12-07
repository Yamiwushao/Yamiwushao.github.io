
var header = {
	init:function(){
		$("#header").load('header.html',function(){
			//【我的第五大道】显示与隐藏
			$(".top-nav").find(".myd5lu").hover(function(){
				$(this).addClass('active');
				$(this).find('.my-list').show();
			},function(){
				$(this).removeClass('active');
				$(this).find('.my-list').hide();
			});
			
			//【手机下载】显示与隐藏
			$(".top-nav").find(".phonedown").hover(function(){
				$(this).addClass('pactive');
				$(this).find('.phone-list').show();
			},function(){
				$(this).removeClass('pactive');
				$(this).find('.phone-list').hide();
			});
		});
	}	
}
header.init();
