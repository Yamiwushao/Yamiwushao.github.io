var sidebar = {
	init:function(){
		//边框页面加载
		$("#right-menu").load("sidebar.html",function(){
			//监听窗口改变事件
			$(window).resize(function(){
				//获取窗口改变后的高度
				var windowH = $(window).height();
				console.log(windowH);
				//设置边框的高度
				$(".sidebar").css({
					height:	windowH
				});
			});
			
			//边框选项卡的显示与隐藏
			$(".sidebar").find(".tab-item").hover(function(e){
				$(this).find("span").show();
				//$(this).css
			},function(){
				$(this).find("span").hide();
			});
			
			//回到顶部（？？？？）
			$(".tab-backtop").click(function(e){
				e.preventDefault();
				var st = $(document).scrollTop();
				var timer=setInterval(function(){
						st -= 100;
						if(st<=0){
							st=0;
							clearInterval(timer);
						}
						$("body").scrollTop(st);
					},30);
			});
			
		});
	}
}
sidebar.init();
