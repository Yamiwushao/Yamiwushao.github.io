$(function(){

	var detail = {
		//商品数量输入框
		amountIpt : $('.amo-ipt'),
		modalWrap: $('.modal-wrap'),
		modalClose : $('.modal-closs'),
		colorId : '',
		modelId : '',
		
		//初始化
		init:function(){
			this.priTypeShow();
			this.priTypeHide();
			
			//更多活动
			this.showMore();
			
			//数量增加
			this.increase();
			
			//直接输入
			this.iptAmount();
			
			//数量减少
			this.decrease();
			
			//颜色改变
			this.colorChange();
			
			//款式改变
			this.modelChange();
			
			//关闭模态框
			this.modalC();
			
			//加入购物袋
			this.addCart();
		},
		
		//会员价的显示与隐藏
		priTypeShow: function(){
			$('.price-type-a').hover(function(){
				$(this).addClass('hover');
				$('.price-type-hide').show();
			},function(){
				$(this).removeClass('hover');
				$('.price-type-hide').hide();
			});
		},
		priTypeHide:function(){
			$('.price-type-hide').hover(function(){
				$('.price-type-a').addClass('hover');
				$(this).show();
			},function(){
				$('.price-type-a').removeClass('hover');
				$(this).hide();
			});
		},
		
		//活动的显示
		showMore:function(){
			$('.show-more').click(function(){
				$('.list-hide').toggle();
			});
		},
		
		
		
		//数量的增加
		increase:function(){
			var that = this;
			$('.amo-inc').on('click',function(){
				var amount = parseInt(that.amountIpt.val());
				amount++;
				if(amount > 4){
					that.modalWrap.show();
					amount = 4;
					return;
				}
				that.amountIpt.val(amount);
			});
		},
		
		//数量的减少
		decrease:function(){
			var that = this;
			$('.amo-dec').on('click',function(){
				var amount = parseInt(that.amountIpt.val());
				amount--;
				if(amount < 1){
					amount = 1;
					return;
				}
				that.amountIpt.val(amount);
			});
		},
		
		//数量的直接输入
		iptAmount : function(){
			var that = this;
			this.amountIpt.on('input',function(){
				var amount = parseInt($(this).val());
				if(isNaN(amount) || amount==0){
					console.log(amount);
					$(this).val(1);
					return;
				}
				if(amount > 4){
					that.modalWrap.show();
					return;
				}
				$(this).val(amount);
			});
			
			
		},
		
		//选择颜色
		colorChange : function(){
			var that = this;
			$(".attr-list-color").on('click','.color-item',function(){
				$(this).addClass("active");
				$(this).siblings().removeClass("active");
			});
		},
		
		//选择款式
		modelChange : function(){
			var that = this;
			$(".attr-list-model").on('click','.model-item',function(){
				$(this).addClass("active");
				that.modelId = $(this).data("mid");
				console.log(that.modelId);
				$(this).siblings().removeClass("active");
			});
		},
		
		//模态框关闭
		modalC : function(){
			var that = this;
			this.modalClose.click(function(){
				that.modalWrap.hide();
			});
		},
		
		
		
		//加入购物车（加入cookie）
		addCart : function(){
			var that = this;
			$('.btn-addcart').click(function(){
				//获取创建cookie需要的数据 data-gid data-cid amount 
				var goodId = $('.gid').data('gid');
				var	colorId = $('.attr-list-color').find('.active').data('cid');
				var modelId = $('.attr-list-model').find('.active').data('mid');
				var amount = parseInt(that.amountIpt.val());
				
				//添加到购物车
				var cart = $.cookie('d5lu_cart') || '{}';
				cart = JSON.parse(cart);
				
				var status = cart[colorId];
				//判断购物车中是否存在该元素
				if(!cart[colorId]){
					cart[colorId] = {
						"goodId" : goodId,
						"colorId" : colorId,
						"modelId" : modelId,
						"amount" : amount	
					}
				}else{
					cart[colorId].amount += amount;	
				}
				$.cookie('d5lu_cart',JSON.stringify(cart));
				console.log($.cookie('d5lu_cart'));
			});
		},
		
		
	}
	detail.init();
});
