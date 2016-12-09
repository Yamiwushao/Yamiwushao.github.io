$(function(){
	
	//加载头部文件
	$.getScript("js/header.js");

	//加载尾部文件
	$.getScript("js/footer.js");

	//加载侧边栏
	$.getScript("js/sidebar.js");
	
	//购物车页面
	var cart = {
		cart : {},
		
		init:function(){
			//初始化页面
			this.initCart();
			this.delete();
			this.checkedAll();
			this.checkedAll();
			this.goodschecked();
			this.increase();
			this.decrease();
			this.iptAmount();
		},
		
		//初始化页面
		initCart : function(){
			var that = this;
			
			//读取cookie中的数据
			this.readCookie();
			
			//ajax获取data数据
			$.getJSON('js/data.json',function(data){
				//遍历从cookie中获取到的数据，将它显示在页面上，key是cookie中每条数据的标识
				for(var key in that.cart){
					(function(k){
						var gid = that.cart[k].goodId;
						var mid = that.cart[k].modelId;
						var amount = that.cart[k].amount;
						//将信息显示在页面上，并加上商品的id等标识符
						var ul = $('<ul class="tbody-item"></ul>');
						ul.attr({"data-cid":k});
						$(".tbody-item-wrap").append(ul);
						$(ul).load('cartlist.html?key='+Math.random(),function(){
							$(this).find(".name-txt").html(data[gid]["goods-name"]);
							var attrTxt = data[gid]["goods-color"][k]+','+data[gid]["goods-model"][mid];
							$(this).find(".item-attr span").html(attrTxt);
							var sprice = parseFloat(data[gid]["goods-sprice"]);
							$(this).find(".item-sprice span").html(sprice);
							$(this).find('.amo-ipt').val(amount);
							var sum = (amount*sprice).toFixed(2);
							$(this).find(".item-sum span").html(sum);	
						});	
					})(key);
					
				}
			});	
		},
		
		//数量的增加
		increase: function(){
			var that = this;
			$(".tbody-item-wrap").on("click",".amo-inc",function(){
				var amount = parseInt($(this).prev().val());
				amount++;
				if(amount > 4){
					amount = 4;
					return;
				}
				$(this).prev().val(amount);
				//改变总金额
				var sum = parseFloat($(this).parents(".item-amount").prev().find("span").html())* amount;
				sum = sum.toFixed(2);
				$(this).parents(".item-amount").siblings(".item-sum").find("span").html(sum);
				
				//改变下边的的总计
				that.handerpay();
			});
			
		},
		
		//数量的减少
		decrease:function(){
			var that = this;
			$(".tbody-item-wrap").on("click",".amo-dec",function(){
				var amount = parseInt($(this).next().val());
				amount--;
				if(amount < 1){
					amount = 1;
					return;
				}
				$(this).next().val(amount);
				//改变总金额
				var sum = parseFloat($(this).parents(".item-amount").prev().find("span").html())* amount;
				sum = sum.toFixed(2);
				$(this).parents(".item-amount").siblings(".item-sum").find("span").html(sum);
				
				//改变下边的的总计
				that.handerpay();
			});
		},
		
		//数量的直接输入
		iptAmount : function(){
			var that = this;
			$(".tbody-item-wrap").on("input",".amo-ipt",function(){
				var amount = parseInt($(this).val());
				if(isNaN(amount) || amount==0){
					$(this).val(1);
					return;
				}
				if(amount > 4){
					amount = 4;
					return;
				}
				$(this).val(amount);
				//改变总金额
				var sum = parseFloat($(this).parents(".item-amount").prev().find("span").html())* amount;
				sum = sum.toFixed(2);
				$(this).parents(".item-amount").siblings(".item-sum").find("span").html(sum);
				
				//改变下边的的总计
				that.handerpay();
			});	
		},
	
		//改变总金额
		changeSum : function(){
			
		},
		
		//删除记录
		delete : function(){
			var that = this;
			$(".tbody-item-wrap").on("click",".delete-btn",function(){
				console.log($(this).parents("ul"));
				
				//获取该条记录的商品标识
				var cid = $(this).parents("ul").data("cid");
				console.log($(this).parents("ul").data("cid"));
				//从页面上移除
				$(this).parents("ul").remove();
				
				//从cookie中移除
				console.log(that.cart);
				delete that.cart[cid];
				
				//重置cookie
				that.setCookie();
			});
		},
		
		//全选
		checkedAll : function(){
			var that = this;
			$(".cart-tbody").on("click",".check-all",function(){
				//获取所有复选框
				var allcheckbox = $(".cart-tbody").find("input[type=checkbox]");
				
				//如果状态为选中，再点击就会取消
				if($(this).prop("checked")){
					
					//选中所有复选框
					allcheckbox.each(function(){
						$(this).prop({
							"checked" : true
						});
					});
				}else{
					//取消所有复选框
					allcheckbox.each(function(){
						$(this).prop({
							"checked" : false
						});
					});
				}
				that.handerpay();		 
			});
		},
		
		//单个选中
		goodschecked : function(){
			var that = this;
			$(".tbody-item-wrap").on("change","input[type=checkbox]",function(){
				//获取所有复选框
				var bodyallcheck = $(".tbody-item-wrap").find("input[type=checkbox]");
				
				//获取所有的已经选中的
				var allchecked = $(".tbody-item-wrap").find("input[type=checkbox]:checked");
				
				if($(this).prop("checked")){
					that.handerpay();
					//判断需不需要勾选全选框
					
				}else{
					that.handerpay();
				}
				if(allchecked.length == bodyallcheck.length){
					$(".cart-tbody").find(".check-all").prop({"checked" : true});
				}else{
					$(".cart-tbody").find(".check-all").prop({"checked" : false});
				}

				
			});
		},
		
		//操作下面的总计
		handerpay : function(){
			//获取页面上选中的复选框
			var allchecked = $(".tbody-item-wrap").find("input[type=checkbox]:checked");
			//显示选中了几个
			$(".checked-amount").html(":&nbsp;" + allchecked.length);
			
			//显示总价钱
			
			//获取每一个选中的记录中的总钱数
			var sum = 0;
			for(var k=0;k<allchecked.length;k++){
				sum += parseFloat(allchecked.eq(k).parents("ul").find(".item-sum span").html())	
			}
			sum = sum.toFixed(2);
			$(".total-money").html("¥&nbsp;" + sum);
		},
		
		
		//读取购物车
		readCookie: function(){
			//获取cookie内容
			var cartStr = $.cookie("d5lu_cart") || '{}';
			//变成json对象
			this.cart = JSON.parse(cartStr);	
		},	
		
		//设置cookie
		setCookie :　function(){
			$.cookie("d5lu_cart",JSON.stringify(this.cart));
		}
	}
	cart.init();
});
