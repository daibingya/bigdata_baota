<template>
	<div class="fuwu bottom_contes">
		<div class="left_Box">
		   <div class="tops">
		        <div class="hezi_tit">
		    		<h3 class="title_dang2">便民服务数据</h3>
		    		<!--<select name="right_top">
	              		<option value="">宝塔区</option>
	              	</select>-->
			    </div>
			    <div id="f_echarts_1"></div>
		   </div>
		   <div class="bottoms">
		   	     <div class="hezi_tit">
		    		<h3 class="title_dang2">报到数据</h3>
		    		<!--<select name="right_top">
	              		<option value="">宝塔区</option>
	              	</select>-->
			    </div>
			    <div class="echarts_shuang">
			    	<div id="ec_1"></div>
			    	<div id="ec_2"></div>
			    </div>
		   </div>
		</div>
		<div class="right_Box">
			<div class="farsts">
				 <div class="hezi_tit">
		    		<h3 class="title_dang2">督查数据</h3>
		    		<!--<select name="right_top">
	              		<option value="">宝塔区</option>
	              	</select>-->
			    </div>
			    <div id="f_echarts_3"></div>
			</div>
			<div class="centers">
				<div class="hezi_tit">
		    		<h3 class="title_dang2">互动留言</h3>
			    </div>
			    <div id="f_echarts_4"></div>
			</div>
			<div class="lasts">
				<div class="hezi_tit">
		    		<h3 class="title_dang2">关系转接</h3>
			    </div>
			    <div id="f_echarts_5"></div>
			</div>
		</div>
	</div>
</template>
<script>
	import api_demo from "../../../static/js/demo_api.js";
	export default{
		name:"fuwu",
		mounted:function(){
			this.echarts_1();
			this.echarts_3();
			this.echarts_4();
			this.echarts_5();
			this.echarts_shuang();
		},
		created:function(){
		},
		methods:{
			//便民服务数据图表
			echarts_1(){
				let myChart=this.$echarts.init(document.getElementById("f_echarts_1"));
				this.$http.get(api_demo.apis4+"/queryConvenienceServices.action").then(function(data){
					var inner_Data=JSON.parse(data.bodyText);
					var tady_aRy=[],num_aRy=[];
					Array.from(inner_Data).forEach(function(val,index){
						tady_aRy.push(val.months);
						num_aRy.push(val.counts);
					})
					let option = {
					    color: ['#3398DB'],
					    tooltip : {
					        trigger: 'axis',
					        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					        }
					    },
					    grid: {
					        left: '3%',
					        right: '8%',
					        bottom: '3%',
					        containLabel: true
					    },
					    xAxis : [
					        {
					        	name:"年月",
					    		nameTextStyle:{color:"#fff"},
					            type : 'category',
					            data : tady_aRy,
					            axisTick: {
					                alignWithLabel: true
					            },
					            // x轴的字体样式
                        		axisLabel: {        
                                	show: true,
                                	rotate:35,
                                	textStyle: {
                                    	color: '#fff',
                                    	fontSize:'12'
                                	}
                                }
					        }
					    ],
					    yAxis : [
					        {
					            type : 'value',
					            // x轴的字体样式
                        		axisLabel: {        
                                	show: true,
                                	textStyle: {
                                    	color: '#1299f5',
                                    	fontSize:'12'
                                	}
                                }, 
                                splitLine: {
                                	show: true, 
                                	//  改变轴线颜色
                                	lineStyle: {
                                    	// 使用深浅的间隔色
                                    	color: ['#262C3E']
                                	}                            
                        		}
					        }
					    ],
					    series : [
					        {
					            name:'数量',
					            type:'bar',
					            barWidth: '31',
					            stack:"标示",
					            label: {
						                normal: {
						                    show: true,
						                    position: 'top'
						                }
						        },
					            itemStyle:{
									normal:{color:'#FF9080'}
								},
					            data:num_aRy
					        }
					    ]
				};
	            myChart.setOption(option);
				},function(err){
//					window.location.href="http://113.137.27.18:9000/BaoTaBigData/index.action"
				})
				
			},
			//督查数据图表
			echarts_3(){
				this.$http.get(api_demo.apis4+"/querySupervisionData.action").then(function(data){
				var inner_data=JSON.parse(data.bodyText);
				
		    	let myChart=this.$echarts.init(document.getElementById("f_echarts_3")); 
		    	let option = {
		    			grid:{
			    			x:60,
			    			y:30,
			    			x2:60,
			    			y2:40
		    			},
		    			legend: {
					        data:['三会一课','支部活动'],
					        right:"3%",
					        textStyle:{
						        	color:"#fff",
						        	fontSize:12
						    }
						},
		    			tooltip: {
					        trigger: 'axis'
					    },
					    xAxis: {
					    	name:"年月",
					    	nameTextStyle:{color:"#fff"},
					        type: 'category',
					        data:inner_data.time,
					        axisLabel: {        
	                        	show: true,
	                        	rotate:30,
	                        	textStyle: {
	                            	color: '#fff',
	                            	fontSize:'12'
	                        	}
                        	}
					    },
					    yAxis: {
					    	name:"人数",
					    	nameTextStyle:{color:"#fff"},
					        type: 'value',
					        axisLabel: {        
	                        	show: true,
	                        	
	                        	textStyle: {
	                            	color: '#fff',
	                            	fontSize:'12'
	                        	}
                        	},
                            splitLine: {
                            	show: true, 
                            	//  改变轴线颜色
                            	lineStyle: {
                                	// 使用深浅的间隔色
                                	color: ['#262C3E']
                            	}                            
                        	}
					    },
					    series: [
					    	{
					    		name:"三会一课",
						        data:inner_data.shyk,
						        type: 'line',
						        symbolSize: 8
					    	},
					    	{
					    		name:"支部活动",
						        data:inner_data.zbhd,
						        type: 'line',
						        symbolSize: 8,
					    	}
					    ]
					};
		    	myChart.setOption(option);
		    	},function(err){console.log("督查数据出错err")})
		   },
		   //互动留言图表
		   echarts_4(){
		   	this.$http.get(api_demo.apis4+"/queryVolunteer.action").then(function(data){
		   		var inner_data=JSON.parse(data.bodyText);
		   		var val_aRy=[],val2_aRy=[],time_aRy=[];
		   		Array.from(inner_data).forEach(function(val,index){
		   			val_aRy.push(val.fabu);
		   			val2_aRy.push(val.tongguo);
		   			time_aRy.push(val.months);
		   		})
		    	let myChart=this.$echarts.init(document.getElementById("f_echarts_4")); 
				let option = {
					grid:{
						x:60,
		    			y:30,
		    			x2:60,
		    			y2:30
					},
					legend: {
					        data:['留言发布','审核通过'],
					        right:"3%",
					        textStyle:{
						        	color:"#fff"
						    }
					},
					tooltip : {
				        trigger: 'axis',
				        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
				    xAxis: {
				    	name:"月份",
				    	nameTextStyle:{color:"#fff"},
				        type: 'category',
				        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
	                   },
				        data:time_aRy
				    },
				    yAxis: {
				    	name:"人数",
				    	nameTextStyle:{color:"#fff"},
				        type: 'value',
				        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }  
	                    },
                        splitLine: {
                        	show: true, 
                        	//  改变轴线颜色
                        	lineStyle: {
                            	// 使用深浅的间隔色
                            	color: ['#262C3E']
                        	}                            
                		}
				    },
				    series: [{
				    	name:"留言发布",
					    itemStyle:{
							normal:{color:'#31A9E4'}
					    },
				        data: val_aRy,
				        type: 'bar',
				        barWidth:16,
				        barGap:0  
				    },{
				    	name:"审核通过",
					    itemStyle:{
							normal:{color:'#F67678'}
					    },
				      	data: val2_aRy,
				        type: 'bar',
				        barWidth:16
				    }]
				};
		    	myChart.setOption(option);
		    },function(err){console.log("志愿者报错")})
			},
			//关系转接图表
			echarts_5(){
				this.$http.get(api_demo.apis4+"/queryRelationship.action").then(function(data){
					var inner_data=JSON.parse(data.bodyText);
					var val_aRy=[],time_aRy=[];
					Array.from(inner_data).forEach(function(val,index){
						val_aRy.push(val.value);
						time_aRy.push(val.time);
					})
				
		    	let myChart=this.$echarts.init(document.getElementById("f_echarts_5")); 
		    	let option = {
		    			grid:{
			    			x:60,
			    			y:30,
			    			x2:60,
			    			y2:30
		    			},
		    			legend:{
		    				right:"3%",
					        textStyle:{
						        	color:"#fff"
						    },
		    				data:["转入",'转出']
		    			},
		    			tooltip: {
					        trigger: 'axis'
					    },
					    xAxis: {
					    	name:"年月",
					    	nameTextStyle:{color:"#fff"},
					        type: 'category',
					        data: time_aRy,
					        axisLabel: {        
	                        	show: true,
	                        	textStyle: {
	                            	color: '#fff',
	                            	fontSize:'12'
	                        	}
                       		}
					    },
					    yAxis: {
					    	name:"人数",
					    	nameTextStyle:{color:"#fff"},
					        type: 'value',
					        axisLabel: {        
	                        	show: true,
	                        	textStyle: {
	                            	color: '#fff',
	                            	fontSize:'12'
	                        	}
                        	},
                            splitLine: {
                            	show: true, 
                            	//  改变轴线颜色
                            	lineStyle: {
                                	// 使用深浅的间隔色
                                	color: ['#262C3E']
                            	}                            
                        	}
					    },
					    series: [
					    	{
					    		name:"转入",
						        data: val_aRy,
						        type: 'line', 
						        smooth:true,
						        symbolSize: 0,
						        itemStyle:{
						        	normal:{
						        		lineStyle:{
						        			color:"#34ADE8"
						        		}
						        	}
						        }
					    	}
					    ]
					};
		    	myChart.setOption(option);
		    	},function(err){console.log("关系转接报错")})
		  },
		  //报到数据图表
		  echarts_shuang(){
		  		var _that=this,name_arry=["已报到","未报到"],color_Arr=["#19A1EC","#DF4480"];
		  		var baoDao=[
					{name:"党员报到",color:"#0d9ceb"},
					{name:"驻区单位报到",color:"#dd3a79"}
				];
				var leght_name=["党员报到","单位报到"];
		  		this.$http.get(api_demo.apis4+"/queryArrival.action").then(function(data){
		  			var inner_data=JSON.parse(data.bodyText);
		  			Array.from(inner_data).forEach(function(val,index){
		  				console.log(val);
				    	var myChart=_that.$echarts.init(document.getElementById("ec_"+(index+1))); 
						var	option = {
								title:{
									text:baoDao[index].name,
									left:'center',
									backgroundColor:baoDao[index].color,
									borderRadius:3,
									top:20,
									textStyle:{color:"#fff"}
								},
								tooltip: {
							        trigger: 'item',
							        formatter: "{a} <br/>{b}: {c} ({d}%)"
							   },
							    series: [
							        {
							            type:'pie',
							            color:[color_Arr[index]],
							            selectedMode: 'single',
							            radius: [0, '30%'],
							            label: {
							                normal: {
							                    position: 'center',
							                    formatter: (100*(val.baodao/val.zongshu)).toFixed(2)+'%',
							                    textStyle:{color:"#fff",fontSize:22},
							                    rich: {
							                        a: {
							                            color: '#fff',
							                            fontSize: 16,
							                            lineHeight: 20,
							                            align: 'center'
							                        },
							                        hr: {
							                            width: '100%',
							                            height: 0,
							                            alien:'center'
							                        },
							                        per: {
							                            color: '#fff',
							                            align: 'center',
							                            fontSize: 20,
							                        }
							                    }
							                }
							            },
							            labelLine: {
							                normal: {
							                    show: false
							                }
							            },
							            tooltip:{show:false},
							            data:[
							                {value:1, name:'比率'}
							            ]
							        },
							        {
							        	name:leght_name[index],
							            type:'pie',
							            color:[color_Arr[index],"#26345B"],
							            radius: ['45%', '55%'],
							            label: { 
							            		normal: {
							            			show:false
							            	}
							            },
							            data:[
							                {value:val.baodao, name:'已报到'},
							                {value:(val.zongshu-val.baodao), name:'未报到'}
							            ]
							        }
							    ]
							};
				    	myChart.setOption(option);
		  		})
		  		},function(err){})
		  	}
		}
	}
</script>
<style scoped>
	.fuwu{
		color:white;
	}
	/*654*/
	.left_Box{
		width:696px;
		height:auto;
	}
	.left_Box .tops{
		width:100%;
		height:356px;
		border:1px solid  #262C3E;
		background-color:#0D1428;
	}
	
	.hezi_tit{
		width:100%;
		padding:0 25px;
		box-sizing:border-box;
		position:relative;
	}
	.hezi_tit .title_dang2{
		color:#1299f5;
		font-size:18px;
		font-weight:bold;
		height:30px;
		line-height:30px;
		margin-bottom:7px;
	}
	select[name="right_top"]{
		position:absolute;
		width:134px;
		height:28px;
		border:none;
		font-size:12px;
		color:white;
		top:0;
		bottom:0;
		margin:auto;
		padding-left:15px;
		box-sizing:border-box;
		right:25px;
		border-radius:2px;
         /*很关键：将默认的select选择框样式清除*/
	   appearance:none;
	   -moz-appearance:none;
	   -webkit-appearance:none;
	   /*在选择框的最右侧中间显示小箭头图片*/
	   background: url("../../../static/images/x1_03.png") no-repeat right center /auto 110% #2C3C6B;
	   background-position:96% 50%;
	}
	/*100%*378*/
	.left_Box .bottoms{
		width:100%;
		height:378px;
		margin-top:14px;
		border:1px solid  #262C3E;
		background-color:#0D1428;
	}
	.left_Box .tops,.left_Box .bottoms{
		padding-top:10px;
		box-sizing:border-box;
	}
	.right_Box{
		width:880px;
		height:auto;
		margin-left:14px;
	}
	.left_Box,.right_Box{
		display:inline-block;
		vertical-align: top;
	}
	.right_Box .farsts{
		width:100%;
		height:238px;
		border:1px solid  #262C3E;
		background-color:#0D1428;
	    padding-top:10px;
	    box-sizing:border-box;
	}
	.right_Box .centers,.right_Box .lasts{
		width:100%;
		height:238px;
		margin-top:15.5px;
		border:1px solid  #262C3E;
		background-color:#0D1428;
		padding-top:10px;
		box-sizing:border-box;
	}
	#f_echarts_1{
		width:100%;
		height:305px;
	}
	#f_echarts_3,#f_echarts_4,#f_echarts_5{
		width:100%;
		height:185px;
	}
	.echarts_shuang{
		width:100%;
		height:325px;
		font-size:0
	}
	.echarts_shuang #ec_1,.echarts_shuang #ec_2{
		width:50%;
		height:100%;
		display:inline-block;
		vertical-align:top;
	}
</style>