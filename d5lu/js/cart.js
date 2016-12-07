$(function(){
	//购物车页面
	var cart = {
		cart : {},
		init:function(){
			//初始化页面
			this.initCart();
		},
		
		//初始化页面
		initCart : function(){
			var that = this;
			
			//读取cookie中的数据
			this.readCookie();
			
			
			//ajax获取data数据
			$.getJSON('js/data.json',function(data){
				console.log(data);
				
				for(var key in that.cart){
					(function(k){
						console.log(k);
						var gid = that.cart[k].goodId;
						var mid = that.cart[k].modelId;
						var amount = that.cart[k].amount;
						console.log(k,gid,mid,amount);
						var ul = $('<ul class="tbody-item"></ul>');
						$(ul).load('cartlist.html?key='+Math.random(),function(){
							//console.log(data[key]["goods-color"]+);
							$(".item-name span").html(data[gid]["goods-name"]);
							var attrTxt = data[gid]["goods-color"][k]+','+data[gid]["goods-model"][mid];
							console.log(attrTxt);
							$(".item-attr span").html(attrTxt);
							var sprice = parseFloat(data[gid]["goods-sprice"]);
							$(".item-sprice span").html(sprice);
							console.log(amount);
							$('.amo-ipt').val(amount);
							var sum = (amount*sprice).toFixed(2);
							$(".item-sum span").html(sum);
							$(".tbody-item-wrap").append(ul);
						});
						
					})(key);
					
				}
			});	
		},
		
		
		
		//读取购物车
		readCookie: function(){
			//获取cookie内容
			var cartStr = $.cookie("d5lu_cart") || '{}';
			//变成json对象
			this.cart = JSON.parse(cartStr);
			console.log(this.cart);
		}	
	}
	cart.init();
});
