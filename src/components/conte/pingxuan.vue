<template>
	<div class="pingxuan bottom_contes">
		<div class="bot_box_d">
			 <div class="left_b">
			 	<div class="hezi_tit">
		    		<h3 class="title_dang2">民主生活数据</h3>
		    		<select name="right_top" class="ones" v-model="YearToday" @change="times">
	              		<option :value="val" v-for="val in Yearth">{{val+"年"}}</option>
	              	</select>
	              	<select name="right_top" class="ling" style="right:250px;width:128px;padding-right:30px" v-model="first_model_id_left" @change="changes(first_model_id_left)">
	              		<option :value="val.id+','+val.flag" v-for="val in First_level_drop" :flag="val.flag">{{val.name}}</option>
	              	</select>
	              	<select name="right_top" class="thers" style="width:120px;" v-model="two_model_id_left" @change="changes2(two_model_id_left)">
	              		<option :value="val.id+','+val.types" v-for="val in secondary_drop" :type="val.types">{{val.name}}</option>
	              	</select>
			    </div>
			    <div id="echarts_3"></div>
			 </div>
		     <div class="right_b">
		     	<div class="hezi_tit">
		    		<h3 class="title_dang2">组织生活会数据</h3>
		    		<select name="right_top" class="ones" v-model="YearToday2">
	              		<option :value="val" v-for="val in Yearth">{{val+"年"}}</option>
	              	</select>
	              	<select name="right_top" class="ling" style="right:250px;width:128px;padding-right:30px" v-model="first_model_id_right">
	              		<option :value="item.id+','+item.flag" v-for="item in First_level_drop_rights">{{item.name}}</option>
	              	</select>
	              	<select name="right_top" class="thers" style="width:120px" v-model="twos_model_id_right">
	              		<option :value="item.id+','+item.types" v-for="item in secondary_drop_right">{{item.name}}</option>
	              	</select>
			    </div>
			    <div id="echarts_4"></div>
		     </div>
		</div>
		
		<div class="top_box_d">
	
		     <div class="right_b">
		     	<div class="hezi_tit">
		    		<h3 class="title_dang2">民主评议数据</h3>
			    </div>
			    <div id="echarts_2"></div>
		     </div>
		</div>
	</div>
</template>
<script>
	
	/*注释：
	     左侧两个echarts图表的下拉框调用方式不一样
	  echarts_3(民主生活数据)的下拉框采用的是select的change事件调用三级联动
	  echarts_4(组织生活数据)的下拉框采用的是vue的watch调用三级联动
	*/
	
	import api_demo from "../../../static/js/demo_api.js";
	export default{
		name:"pingxuan",
		data(){
			return{
				First_level_drop:[],          		//民主生活的一级数据保存
				secondary_drop:[],            		//民主生活的二级数据保存
				first_model_id_left:'610602,area', 	//民主生活一级默认id
				two_model_id_left:'',				//民主生活二级默认id
				
				First_level_drop_rights:[],   		//组织生活会的一级数据保存
				secondary_drop_right:[],      		//组织生活会的二级数据保存
				first_model_id_right:'610602,area',	//组织生活一级默认id
				twos_model_id_right:'',				//组织生活二级默认id

				Yearth:[],                   //日期数据保存
				YearToday:'',                //民主生活的年份
				YearToday2:''                //组织生活会年份
		}},
	
		mounted:function(){
			//时间自定义的年份;
			var _this=this;
			!function(){
				var YearTodayed=new Date().getFullYear();
				_this.YearToday=YearTodayed;
				_this.YearToday2=YearTodayed;
				_this.Yearth.push(YearTodayed);
				for(var i=0;i<10;i++){
					YearTodayed--;
					_this.Yearth.push(YearTodayed);
				}
			}();
			
			this.echarts_2();
			this.echarts_3();
			this.echarts_4();
			this.select_level_drop();     
			this.select_level_drop2(); 
		},
		watch:{
			first_model_id_right:function(data,old){
				var id=data.slice(0,data.indexOf(","));
				var flag=data.slice(data.indexOf(",")+1);
				this.select_level_drop2(id,flag);
				this.echarts_4();
				
			},
			twos_model_id_right:function(data,old){
				var id=data.slice(0,data.indexOf(","));
				var flag=data.slice(data.indexOf(",")+1);
				this.echarts_4();
			},
			YearToday2:function(news,old){
				this.echarts_4();
			}
		},
		methods:{
			times(){
				var first_id=this.first_model_id_left.slice(0,this.first_model_id_left.indexOf(","));
				var two_id=this.first_model_id_left.slice(this.first_model_id_left.indexOf(",")+1);
				this.echarts_3(first_id,two_id,this.YearToday);
			},
			changes(data){
				var id=data.slice(0,data.indexOf(","));
				var flag=data.slice(data.indexOf(",")+1);
				this.select_level_drop(id,flag);
				
				var first_id=this.first_model_id_left.slice(0,this.first_model_id_left.indexOf(","));
				var two_id=this.first_model_id_left.slice(this.first_model_id_left.indexOf(",")+1);
				this.echarts_3(first_id,two_id,this.YearToday);
			
			},
			changes2(data){
				var first_id=this.first_model_id_left.slice(0,this.first_model_id_left.indexOf(","));
				var two_id=this.first_model_id_left.slice(this.first_model_id_left.indexOf(",")+1);
				this.echarts_3(first_id,two_id,this.YearToday);
			},
			
			//民主评议数据图表
			echarts_2(){
				let nameArray=[];
				this.$http.get(api_demo.apis6+"/appraisal.action").then(function(data){
					data.body.forEach(function(val){
						nameArray.push(val.name)
					})
					let myChart=this.$echarts.init(document.getElementById("echarts_2"));
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
					        right: '4%',
					        bottom: '3%',
					        containLabel: true
					    },
					    xAxis : [
					        {
					            type : 'category',
					            data : nameArray,
					            axisTick: {
					                alignWithLabel: true
					            },
					            axisLabel: {        
		                        	show: true,
		                        	textStyle: {
		                            	color: '#fff'
		                        	}
	                        	}
					        }
					    ],
					    yAxis : [
					        {
					        	name:"党员人数",
					        	nameTextStyle:{color:"#1299f5"},
					            type : 'value',
	                            //Y轴线上的网格
	                            splitLine: {
	                            	show: true, 
	                            	//  改变轴线颜色
	                            	lineStyle: {
	                                	// 使用深浅的间隔色
	                                	color: ['#262C3E']
	                            	}                            
	                        	},
	                        	//设置轴线上的文字
	                        	axisLabel: {
		                        	show: true,
		                        	textStyle: {
		                            	color: '#fff'
		                        	}
	                        	}
					        }
					    ],
					    series : [
					        {
					            name:'人数',
					            type:'bar',
					            barWidth:55,
					            data:data.body,
					            itemStyle:{
					            	//设置隔行换色
					            	 normal:{
					            		color:function(params){
					            			let colorList=["#7F3AFE","#00C494","#FCC710","#DE5459"];
					            			return colorList[params.dataIndex];
					            		}
					            	}
					    
					            }		              
					        }
					    ]
					};
		            myChart.setOption(option,true);
	            },function(err){alert("民主生活数据报错")})
	            
			},
			//民主生活数据，组织生活数据图表
			//一级数据获取;
			select_level_drop(IDs,Flag){
				//一级下拉框
				var Ids=IDs?IDs:'610602';
				var Flag=Flag?Flag:'dw';
				this.$http.get(api_demo.apis6+"/queryDemocraticLifeFirstSelect.action").then(function(data){
					var inner_data=JSON.parse(data.bodyText);
					//左边的一级数据;
					this.First_level_drop=inner_data;
					
					this.erJi_level_drop(Ids,Flag);
				},function(err){console.log("民主生活一级下拉数据报错")})
			},
			erJi_level_drop(Ids,Flag){
				
				this.$http.get(api_demo.apis6+"/queryDemocraticLifeSecondSelect.action?id="+Ids+"&flag="+Flag).then(function(data_two){
				//左边的二级下拉数据
				this.secondary_drop=JSON.parse(data_two.bodyText);
					if(this.secondary_drop.length>=1){
					this.two_model_id_left=this.secondary_drop[0].flag?this.secondary_drop[0].id+','+this.secondary_drop[0].flag:this.secondary_drop[0].id+','+this.secondary_drop[0].types;
					}
				},function(err){console.log("二级下拉框报错")})
				
			},
			echarts_3(o,t,r,time){
				var one=o?o:"610602";
				var t=t?t:'area',r=r?r:'',time=time?time:this.YearToday;						                               
				this.$http.get(api_demo.apis6+"/queryDemocraticData.action?dw="+one+"&levels="+t+"&time="+this.YearToday+"&flag=1").then(function(data){
					var inner_data=JSON.parse(data.bodyText);
			    	var myChart=this.$echarts.init(document.getElementById("echarts_3")); 
					var builderJson = {
						  "all":inner_data.data[0].num+inner_data.data[1].num,
						  "charts": {
						    "_end": inner_data.data[0].num,
						    "_ing": inner_data.data[1].num
						  }
					};
			
					
					let waterMarkText = 'ECHARTS';
					let canvas = document.createElement('canvas');
					let ctx = canvas.getContext('2d');
						canvas.width = canvas.height = 100;
						ctx.textAlign = 'center';
						ctx.textBaseline = 'middle';
						ctx.globalAlpha = 0.08;
						ctx.font = '20px Microsoft Yahei';
						ctx.translate(50, 50);
						ctx.rotate(-Math.PI / 4);
						ctx.fillText(waterMarkText, 0, 0);
					let	option = {
						title:{
							     text:'召开率',
							     right:"17%",
							     bottom:"5%",
							     textStyle:{
							        //文字颜色
							        color:'#1299f5',
							        //字体风格,'normal','italic','oblique'
							        fontWeight:'bold',
							        //字体大小
							　　　　	fontSize:14
							    }
							},
							color:["#F78B27","#213263"],
						    backgroundColor: {
						        type: 'pattern',
						        image: canvas,
						        repeat: 'repeat'
						    },
						    tooltip: {},
						    grid:{
						        left: '3%',
						        right: '4%',
						        bottom: '3%',
						        width:"60%",
						        containLabel: true
						    },
						    xAxis: [{
						        show:false
						    }],
						    yAxis: [{
						        type: 'category',
						        data:['未召开','已召开'],
						        axisLabel: {
						            interval: 0,
						            textStyle:{
						            	color: '#1299f5',
						            	fontSize:14,
		                            	fontWeight:"bold"
						            }
						        },
						        splitLine: {show: false}
						    }],
						    graphic:{
						    	type:"text",
						    	right:"16%",
						    	top:"45%",
						    	style:{
						    		text:inner_data.pro,
						    		textAlign:"left",
						    		fill:"#fff",
						    		fontSize:20,
						    		fontWeight:"bolder"
						    	}
						    },
						    series: [{
						        type: 'bar',
						        barWidth:28,
						        stack: 'chart',
						        label: {
						            normal: {
						                position: 'right',
						                show: true
						            }
						        },
						        data:Object.keys(builderJson.charts).map(function (key) {
						            return builderJson.charts[key];
						        }),
						        itemStyle:{
							        normal:{
						            		color:function(params){
						            			let colorList=["#3368E2","#E93F8B"];
						            			return colorList[params.dataIndex];
						            		}
						            }
						        }
						    }, {
						        type: 'bar',
						        stack: 'chart',
						        silent: true,
						        itemStyle: {
						            normal: {
						                color: '#213263'
						            }
						        },
						        data: Object.keys(builderJson.charts).map(function (key) {
						            return builderJson.all - builderJson.charts[key];
						        })
						    },{
						        type: 'pie',
						        radius: [55, '60%'],
						        center: ['80%', '50%'],
						        data:Object.keys(builderJson.charts).map(function (key) {
						            return builderJson.charts[key];
						        }),
						        hoverAnimation: false,
	            				legendHoverLink: false,
						        itemStyle: {
							        normal : {
								        label:{
								            show:false
								        },
								        labelLine:{
								            show:false
								        }
							        }
							    }
						    }]
						}
			    	myChart.setOption(option,true);
		    	},function(err){console.log("echars3出错")});
		    },
		    //一级数据获取;
			select_level_drop2(IDs,Flag){
				//一级下拉框
				var Ids=IDs?IDs:'610602';
				var Flag=Flag?Flag:'dw';
				this.$http.get(api_demo.apis6+"/queryDemocraticLifeFirstSelect.action").then(function(data){
					var inner_data=JSON.parse(data.bodyText);
					//右边的一级数据;
					this.First_level_drop_rights=inner_data;
					this.erJi_level_drop2(Ids,Flag);
				},function(err){console.log("民主生活一级下拉数据报错")})
			},
			erJi_level_drop2(Ids,Flag){
				this.$http.get(api_demo.apis6+"/queryDemocraticLifeSecondSelect.action?id="+Ids+"&flag="+Flag).then(function(data_two){
							//右边的二级下拉数据
					this.secondary_drop_right=JSON.parse(data_two.bodyText);
					if(this.secondary_drop_right.length>=1){
							this.twos_model_id_right=this.secondary_drop_right[0].flag?this.secondary_drop_right[0].id+','+this.secondary_drop_right[0].flag:this.secondary_drop_right[0].id+','+this.secondary_drop_right[0].types;
					}
				},function(err){console.log("二级下拉框报错")})
			},
			echarts_4(){
				var one=this.first_model_id_right.slice(0,this.first_model_id_right.indexOf(","));
				var tow=this.first_model_id_right.slice(this.first_model_id_right.indexOf(",")+1);
				this.$http.get(api_demo.apis6+"/queryDemocraticData.action?dw="+one+"&levels="+tow+"&time="+this.YearToday2+"&flag=2").then(function(data){
					var inner_data=JSON.parse(data.bodyText);
				
			    	var myChart=this.$echarts.init(document.getElementById("echarts_4")); 
					var builderJson = {
						  "all":inner_data.data[0].num+inner_data.data[1].num,
						  "charts": {
						    "_end": inner_data.data[0].num,
						    "_ing": inner_data.data[1].num
						  }
					};
			
					
					let waterMarkText = 'ECHARTS';
					let canvas = document.createElement('canvas');
					let ctx = canvas.getContext('2d');
						canvas.width = canvas.height = 100;
						ctx.textAlign = 'center';
						ctx.textBaseline = 'middle';
						ctx.globalAlpha = 0.08;
						ctx.font = '20px Microsoft Yahei';
						ctx.translate(50, 50);
						ctx.rotate(-Math.PI / 4);
						ctx.fillText(waterMarkText, 0, 0);
					let	option = {
						title:{
							     text:'召开率',
							     right:"17%",
							     bottom:"5%",
							     textStyle:{
							        //文字颜色
							        color:'#1299f5',
							        //字体风格,'normal','italic','oblique'
							        fontWeight:'bold',
							        //字体大小
							　　　　	fontSize:14
							    }
							},
							color:["#F78B27","#213263"],
						    backgroundColor: {
						        type: 'pattern',
						        image: canvas,
						        repeat: 'repeat'
						    },
						    tooltip: {},
						    grid:{
						        left: '3%',
						        right: '4%',
						        bottom: '3%',
						        width:"60%",
						        containLabel: true
						    },
						    xAxis: [{
						        show:false
						    }],
						    yAxis: [{
						        type: 'category',
						        data:['未召开','已召开'],
						        axisLabel: {
						            interval: 0,
						            textStyle:{
						            	color: '#1299f5',
						            	fontSize:14,
		                            	fontWeight:"bold"
						            }
						        },
						        splitLine: {show: false}
						    }],
						    graphic:{
						    	elements:[
						    		{
								    	type:"text",
								    	right:"16%",
						    			top:"45%",
								    	style:{
								    		text:inner_data.pro,
								    		textAlign:"center",
								    		fill:"#fff",
								    		fontSize:20,
								    		fontWeight:"bold"
								    	}
						    		}
						    	]
						    },
						    series: [{
						        type: 'bar',
						        barWidth:28,
						        stack: 'chart',
						        z: 3,
						        label: {
						            normal: {
						                position: 'right',
						                show: true
						            }
						        },
						        data:Object.keys(builderJson.charts).map(function (key) {
						            return builderJson.charts[key];
						        }),
						        itemStyle:{
							        normal:{
						            		color:function(params){
						            			let colorList=["#3368E2","#E93F8B"];
						            			return colorList[params.dataIndex];
						            		}
						            }
						        }
						    }, {
						        type: 'bar',
						        stack: 'chart',
						        silent: true,
						        itemStyle: {
						            normal: {
						                color: '#213263'
						            }
						        },
						        data: Object.keys(builderJson.charts).map(function (key) {
						            return builderJson.all - builderJson.charts[key];
						        })
						    },{
						        type: 'pie',
						        radius: [55, '60%'],
						        center: ['80%', '50%'],
						        data:Object.keys(builderJson.charts).map(function (key) {
						            return builderJson.charts[key];
						        }),
						        hoverAnimation: false,
	            				legendHoverLink: false,
						        itemStyle: {
							        normal : {
								        label:{
								            show:false
								        },
								        labelLine:{
								            show:false
								        }
							        }
							    }
						    }]
						}
			    	myChart.setOption(option);
		    	},function(err){console.log("echars3出错")});
		    }
		}
	}
</script>
<style scoped>
	.pingxuan{
		color:white;
	}
	/*100%*423*/
	.top_box_d{
		width:690px;
		height:750px;
		margin-left:15px;
		display:inline-block;
		vertical-align:top;
		/*background-color:#0D1428;*/
	}
	/*856*423*/
	.top_box_d .left_b,.bot_box_d .left_b{
		width:882px;
		padding-top:10px;
		box-sizing:border-box;
	}
	.top_box_d .right_b,.bot_box_d .right_b{
		width:100%;
/*		margin-left:14px;*/
		padding-top:10px;
		box-sizing:border-box;
	}
	.left_b,.right_b{
		height:363px;
		display:inline-block;
		border:1px solid #262C3E;
		background-color:#0D1428;
		vertical-align:top;
	}
	.top_box_d .right_b{
		height:750px;
	}
	.top_box_d .right_b #echarts_2{
		height:700px;
	}
	.bot_box_d .right_b{
		height:363px;
		margin-top:23px
	}
	/*1570*307*/
	.bot_box_d{
		width:880px;
		height:307px;
		display:inline-block;
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
		width:125px;
		height:28px;
		border:none;
		font-size:12px;
		color:white;
		top:0;
		bottom:0;
		padding-right: 33px;
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
	select[name="right_top"].ones{
		right:25px;
	}
	select[name="right_top"].twos{
		right:199px;
	}
	select[name="right_top"].thers{
		right:373px;
		padding-right: 33px;
	}
	
	.bot_box_d select[name="right_top"].ones,.bot_box_d select[name="right_top"].thers{
		width:92px;
	}
	.bot_box_d select[name="right_top"].twos{
		right:120px;
	}
	.bot_box_d select[name="right_top"].thers{
	    right:125px
	}
	#echarts_3,#echarts_4{
		width:100%;
		height:256px;
	}
</style>