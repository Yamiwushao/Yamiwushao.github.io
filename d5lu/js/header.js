
var header = {
	init:function(){
		$("#header").load('header.html?key='+Math.random(),function(){
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
			
			//搜索
			$('.search-ipt').on('input',function(){
				$(".search-wrap").find(".result-list").show();
				$.ajax({
					url:"http://suggest.taobao.com/sug?code=utf-8&q="+$(this).val(),
					dataType: "jsonp",
					success: function(data){
						console.log(data)
						var result = data.result;
						//对获取到的数据进行处理
						var content ="";
						if(result.length <= 0){
							var content = "<li>"
								+		"<span>搜索</span>"
								+		"<a href="+"#"+">"+$(".search-ipt").val()+"</a>"
								+		"<b>大约有商品<i>"+0+"</i>件</b>"
								+	"</li>"
						}else{
							for(var k=0;k<result.length;k++){
								content += "<li>"
										+		"<span>搜索</span>"
										+		"<a href="+"#"+">"+result[k][0] +"</a>"
										+		"<b>大约有商品<i>"+result[k][1]+"</i>件</b>"
										+	"</li>"
							}
						}
						content = "<ul>"+content+"</ul>";
						
						//将内容装入页面
						$(".result-list").html(content);	
					}
				});
			});
			
			//购物车的显示和隐藏
			$(".cart-icon").hover(function(){
				$(this).addClass('cactive');
				$(this).find(".cart-content").stop().slideDown(100);
			},function(){
				$(this).removeClass('cactive');
				$(this).find(".cart-content").stop().slideUp(100);
			})
			
			//菜单栏
			//商品分类
			$(".goods-categorys").hover(function(){
				$(".categorys-wrap").show();
			},function(){
				$(".categorys-wrap").hide();
			});
			
			//分类列表的生成
			var cateItems = $('.cate-item');
			var posiY = 0;
			for(var k=0;k<cateItems.length;k++){
				bgUrl = "url(img/cate1.png) no-repeat 0px "+posiY + "px";
				//console.log(cateItems[k]);
				$(cateItems[k]).find('i').css({
					background:bgUrl
				});
				posiY -= 25;
			}
			
			//鼠标滑过分类列表时的效果
			$('.categorys-wrap').find(".wrap-item").on('mouseenter mouseleave',function(e){
				var index = $(this).index();
				console.log(index);
				if(e.type == "mouseenter"){
					//执行鼠标进入事件
					//背景淡入
					$(this).find(" .cate-item").css({opacity:1});
					
					//前面图片的改变
					var bgUrl = "url(img/cate2.png) no-repeat 0px "+ (-25*index) + "px";
					console.log(bgUrl);
					$(this).find('i').css({
						background : bgUrl
					});
					
					//文字变色
					$(this).find('span').css({
						color :  "#b28247"
					});
					
					//后面箭头出现
					$(this).find('b').show();
					
					//内容区出现
					$(this).find('.cate-content').show();
					
				}else{
					
					//背景淡出
					$(this).find(" .cate-item").css({opacity:0.85});
					
					//前面图片的改变
					var bgUrl = "url(img/cate1.png) no-repeat 0px "+ (-25*index) + "px";
					console.log(bgUrl);
					$(this).find('i').css({
						background : bgUrl
					});
					
					//文字变色
					$(this).find('span').css({
						color :  "#000"
					});
					
					//后面箭头消失
					$(this).find('b').hide();
					
					$(this).find('.cate-content').hide();
				}
				
				
				//console.log($(this).find('i').css('background'));
				
			});
			
			//图片区域
			//鼠标滑过，显示文字
			$(".icon-wrap").find("li").hover(function(){
				$(this).stop(true).delay(50).animate({width:150},300);
			},function(){
				$(this).stop(true).delay(50).animate({width:30},300);
			});
			
		});
		
	}	
}
header.init();


