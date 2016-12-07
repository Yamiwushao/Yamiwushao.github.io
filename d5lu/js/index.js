$(function(){
	//加载头部文件
	$.getScript("js/header.js");
	
	//加载尾部文件
	$.getScript("js/footer.js");
	
	//加载侧边栏
	$.getScript("js/sidebar.js");
	

	
	
	//banner对象
	var Banner = function(banner){
		this.banner = banner;
		this.imgWrap = $(".img-wrap");
		this.imgs= $(".img-wrap img");
		this.arrows = $(".arrow");
		this.circlesW = $(".circle-s");
		this.circles = null;
		this.imgW = this.imgs.eq(0).width();
		this.index = 0;
		this.timer = null;
		
		
		this.init = function(){
			//初始化小圆点
			this.initCircle();
			
			//自动轮播
			this.autoPlay();
			
			//鼠标悬停
			this.mouserEnter();
			
			//鼠标离开
			this.mouserLeave();
			
			//左箭头
			this.arrowL();
			
			//右箭头
			this.arrowR();
			
			//小圆点点击
			this.circleC(); 
		}
		
		//初始化小圆点
		this.initCircle = function(){
			var content = '';
			console.log(this.imgs.length);
			for(var k=1;k<=this.imgs.length-1;k++){
				content += '<span class="circle"></span>';
			}
			$(".circle-s").html(content);
			console.log(content);
			this.circles = $(".circle");
			this.circles.eq(0).addClass('active');
		}
		
		//自动轮播
		this.autoPlay = function(){
			var that = this;
			this.timer = setInterval(function(){
				that.index++;
				//图片切换
				that.imgSwitch();		
			},4000);	
		}
		
		//图片切换
		this.imgSwitch = function(){
			var that = this;
			/*右边界的处理*/
			if(this.index >= this.imgs.length){
			 	this.imgWrap.css({
					marginLeft : -88
				});
			 	this.index = 1;
			}
			
			/*左边界的处理*/
			if(this.index < 0){
				this.index = this.imgs.length-1;
				this.imgWrap.css({
					marginLeft: -this.index * this.imgW-88,
					background: "#000"
				});
				this.index = this.imgs.length - 2;
			}
			
			this.imgWrap.stop().animate({
				marginLeft :  -(this.index * this.imgW + 88)
			});
			
			/*小圆点的切换*/
			if(this.index >= this.imgs.length-1){
				this.circles.eq(0).addClass("active").siblings().removeClass("active");
			}else{
				this.circles.eq(this.index).addClass("active").siblings().removeClass("active");
			}
	
		}
		
		//鼠标悬停
		this.mouserEnter = function(){	
			var that = this;
			this.banner.one('mousemove',function(){
				clearInterval(that.timer);
			});
			this.banner.mouseenter(function(){
				clearInterval(that.timer);
			});
		}
		
		this.mouserLeave = function(){
			var that = this;
			this.banner.mouseleave(function(){
				that.autoPlay();
			});
		};
		
		//向右箭头轮播
		this.arrowR = function(){
			var that = this;
			$(".arrow-right").click(function(){
				that.index++;
				that.imgSwitch();		
			});
		}
		//向左箭头轮播
		this.arrowL = function(){
			var that = this;
			$(".arrow-left").click(function(){
				that.index--;
				that.imgSwitch();		
			});
		}
		
		//小圆点点击事件
		this.circleC = function(){
			var that = this;
			this.circlesW.on("click",".circle",function(){
				$(this).addClass("active").siblings().removeClass("active");
				 that.index= $(this).index();
				 that.imgSwitch();
			});
		}	
	}
	var ban = $("#banner")
	var banner = new Banner(ban);
	banner.init();
	
	
	//主页对象
	var index = {
		flagshipList : $(".flagship-list"),
		init :function(){
			//品牌介绍升起
			this.brandUp();
			
			//热门商店
			this.storeAni();
			
			//商场同款
			this.hotItem();
		},
		
		//品牌旗舰
		//品牌介绍从下部升起
		brandUp : function(){
			this.flagshipList.on("mouseenter mouseleave","a",function(e){
				if(e.type == "mouseenter"){
					$(this).find(".flagship-hide").stop(true).animate({
						top : 0
					});
				}else{
					$(this).find(".flagship-hide").stop().animate({
						top : 100
					})
				}
			});
		},
		//热门店铺
		storeAni : function(){
			$(".hotstore-list").on("mouseenter mouseleave",".store-item",function(e){
				if(e.type == "mouseenter"){
					$(this).find(".storelogo").stop(true).fadeOut(300);
					$(this).find(".storelogo-hide").stop(true).fadeIn(300);
					$(this).find(".top-line").stop(true).animate({
						width : 165
					},300);
					$(this).find(".bottom-line").stop(true).animate({
						width : 165
					},300);
					$(this).find(".left-line").stop(true).animate({
						height : 85
					},300);
					$(this).find(".right-line").stop(true).animate({
						height : 85
					},300);
				}else{
					$(this).find(".storelogo-hide").stop(true).fadeOut(300);
					$(this).find(".storelogo").stop(true).fadeIn(300);
					$(this).find(".top-line").stop(true).animate({
						width : 0
					},300);
					$(this).find(".bottom-line").stop(true).animate({
						width : 0
					},300);
					$(this).find(".left-line").stop(true).animate({
						height : 0
					},300);
					$(this).find(".right-line").stop(true).animate({
						height : 0
					},300);
				}
			});
		},
		
		//商场同款
		hotItem : function(){
			//选项卡切换
			$(".items-tab li").each(function(){
				$(this).mouseenter(function(){
					$(this).addClass("active").siblings().removeClass("active");
					var index = $(this).index();
					var liW = $(".items-content li").eq(0).width();
					$(".items-content ul").stop().animate({
						marginLeft : -liW * index
					},300);
				});
			});
			
			//选项卡内容区
			//鼠标移入，错位
			$(".r-cell").each(function(){
				$(this).hover(function(){
					$(this).find(".message").stop(true).animate({
						left:-20
					},200);
					$(this).find(".pic").stop(true).animate({
						left:20
					},200); 
				},function(){
					$(this).find(".message").stop(true).animate({
						left:0
					},200);
					$(this).find(".pic").stop(true).animate({
						left:0
					},200);
				});
				
			});
			
		}
	}
	index.init();
});

