<template>
	<div class="tese bottom_contes">
		<div class="top_box">
		    <div class="one">
		    	<div class="hezi_tit">
			    		<h3 class="title_dang2">绩效考核数据</h3>
			    		<select name="right_top" class="ones_select" v-model="my_jixiao_id2">
		              		<option value="YEAR">年终考核</option>
		              		<option value="MONTH">月度考核</option>
		              		<option value="QUARTER">季度考核</option>
		              	</select>
		              	<select name="right_top" class="twos_select" v-model="my_jixiao_id">
		              		<!--<option :value="val.ID+','+val.LEVEL" v-for="val in jiXiao_select">{{val.NAME}}</option>-->
		              		<option :value="val.id+','+val.flag" v-for="val in First_level_drop" :flag="val.flag">{{val.name}}</option>
		              	</select>
			    </div>
			    <div class="echarts_first" id="echarts_first"></div>
		    </div>
		    <div class="two">
		       	<div class="hezi_tit">
			    		<h3 class="title_dang2">党费缴纳数据</h3>		              
		              	<select name="right_top" class="ling" style="right:290px;width:128px;padding-right:30px" v-model="first_model_id_left" @change="changes(first_model_id_left)">
		              		<option :value="val.id+','+val.flag" v-for="val in First_level_drop" :flag="val.flag">{{val.name}}</option>
		              	</select>
		              	<select name="right_top" class="thers" style="width:120px;right:166px" v-model="two_model_id_left" @change="changes2(two_model_id_left)">
		              		<option :value="val.id+','+val.types" v-for="val in secondary_drop" :type="val.types">{{val.name}}</option>
		              	</select>
		              	<select name="right_top" class="twos" v-model="three_model_id_left" @change="changes3(three_model_id_left)">
		              		<option :value="val.id" v-for="val in three_level_drop">{{val.name}}</option>
		              	</select>
			    </div>
			    <div class="echarts_1" id="echarts_1"></div>
		    </div>
		</div>
		<div class="bottom_box">
		    <div class="lefts">
		    	<!--echart_boxs-->
		    	<div class="hezi_tit">
			    		<h3 class="title_dang2">问题墙回音壁数据</h3>
			    		<select name="right_top" class="ones_select" v-model="problem_id1">
		              		<option value="0">问题墙</option>
		              		<option value="1">回音壁</option>
		              	</select>
		              	<select name="right_top" class="twos_select" v-model="problem_id2">
		              		<option value="ALL">全部</option>
		              		<option value="OC">组织建设</option>
		              		<option value="PA">精准扶贫</option>
		              		<option value="PL">民生实事</option>
		              		<option value="DM">民主管理</option>
		              		<option value="PLR">信访矛盾</option>
		              	</select>
		              	<select name="right_top" class="threes_select" v-model="problem_id">
		              		<option :value="val.id+','+val.flag" v-for="val in First_level_drop" :flag="val.flag">{{val.name}}</option>
		              	</select>
			    </div>
			    <div id="echart_boxs"></div>
		    </div>
		    <div class="centers">
		    	<div class="hezi_tit">
			    	<h3 class="title_dang2">资源清单</h3>
			    	<select name="right_top" class="threes_select" style="right:30px" v-model="ziYuan_id">
	              		<option :value="val.id" v-for="val in ziYuan">{{val.name}}</option>
	              	</select>
			    </div>
			    <div id="echarts_2"></div>
		    </div>
		    <div class="lasts">
		    	<div class="hezi_tit">
			    	<h3 class="title_dang2">需求清单</h3>
			    	<select name="right_top" class="threes_select" style="right:30px" v-model="xuQiu_id">
	              		<option :value="val.id" v-for="val in xuQiu">{{val.name}}</option>
	              	</select>
			    </div>
			    <div id="echarts_3"></div>
		    </div>
		</div>
	</div>
</template>
<script>
	import api_demo from "../../../static/js/demo_api.js";
	export default{
		name:"tese",
		data(){
			return {
				jiXiao_select:[],
				ziYuan:[],
				xuQiu:[],
				ziYuan_id:'',
				xuQiu_id:'',
				problem_id:'610602,area',
				problem_id1:'0',
				problem_id2:'ALL',
				my_jixiao_id:'610602,area', //初始化首次发送请求的区域名字;
				my_jixiao_id2:'YEAR',
				jiaoNa_data:[],
				First_level_drop:[],        //党费缴纳数据的第一个下拉框;
				first_model_id_left:'610602,area',
				secondary_drop:[],   
				two_model_id_left:"2c9178575caa18b9015cab3f2add11c9,zb",
				three_level_drop:'',
				three_model_id_left:'',
				jiaoNa_id:"2c9178575caa18b9015cab3da68e11b7,dw"
			}
		},
		created:function(){
		},
		mounted:function(){
			this.echarts_1();
			this.echarts_2();
			this.echarts_3();
			this.left_bottom();
			this.select_ziyuan();
			this.echarts_first();
			this.select_level_drop();
		},
		watch:{
			my_jixiao_id:function(news,old){
				this.echarts_first(news,this.my_jixiao_id2);
			},
			my_jixiao_id2:function(news,old){
				this.echarts_first(this.my_jixiao_id,news);
			},
			ziYuan_id:function(news,old){
				this.echarts_2(news)
			},
			xuQiu_id:function(news,old){
				this.echarts_3(news)
			},
			problem_id:function(news,old){
				this.left_bottom(news,this.problem_id2,this.problem_id1);
			},
			problem_id1:function(news,old){
				this.left_bottom(this.problem_id,this.problem_id2,news);
			},
			problem_id2:function(news,old){
				this.left_bottom(this.problem_id,news,this.problem_id1);
			}
		},
		methods:{
			changes(data){
				var id=data.slice(0,data.indexOf(","));
				var flag=data.slice(data.indexOf(",")+1);
				this.select_level_drop(id,flag);
				this.echarts_1(data);
			},
			changes2(data){
				var id=data.slice(0,data.indexOf(","));
				var flag=data.slice(data.indexOf(",")+1);
				this.sanJi_level_drop(data);
				this.echarts_1(data);
			},
			changes3(data){
				this.echarts_1(data);
			},
			//绩效考核数据图表
			echarts_first(id1,id2){
			  		var id1=id1?id1:this.my_jixiao_id;
			  		var id2=id2?id2:"year";
			  		//绩效考核数据			
					this.$http.get(api_demo.apis5+"/queryAchievements.action?str="+id1+"&type="+id2).then(function(data){
						var inner_data=JSON.parse(data.bodyText);
						var name_arr=[],data_arr=[];
						inner_data.forEach(function(val,index){
							name_arr.push(val.name);
							data_arr.push(val.value);
						})
						
                    let myChart=this.$echarts.init(document.getElementById("echarts_first"));
              		let option = {
		              		color:['#F87475','#59ADF3','#AF89D6','#86D560'],
						    tooltip: {
						        trigger: 'item',
						        formatter: "{a} <br/>{b}: {c} ({d}%)"
						    },
						    legend: {
						        orient: 'vertical',
						        x: '75%',
						        y:"25%",
								itemGap:15, 
						        data:name_arr,
						        textStyle:{
						        	color:"#1299f5"
						        }
						    },
						    //原生设置环形图内部文字
						    graphic:{
						    	type:"text",
						    	left:"29%",
						    	top:"42%",
						    	z:2,
						    	zlevel:100,
						    	style:{
						    		text:"绩效占比",
						    		x:10,
						    		y:10,
						    		textAlign:"center",
						    		fill:"#fff",
						    		fontSize:16
						    	}
						    },
						    series: [
						        {
						            name:'占比统计',
						            type:'pie',
						            center:["35%","45%"],
						            radius: ['35%', '70%'],
						            selectedMode: 'single',
						            label: {
						                normal: {
						                    show: false,
						                    position: 'inner',
                        					formatter : function (params) {                         
                          						return (params.percent - 0).toFixed(0) + '%'
                        					},
						                    textStyle:{
						                        color:"#fff",
						                        fontSize:16,
						                        fontWeight:"bold"
						                    }
						                },
						                emphasis: {
						                    show: true,
						                    formatter : "{b}\n{d}%",
						                    textStyle: {
						                        fontSize: '14',
						                        fontWeight: 'bold',
						                        color:"#fff"
						                    }
						                }
						            },
						            labelLine: {
						                normal: {
						                    show: false
						                }
						            },
						            data:inner_data
						        }
						    ]
				};
	            myChart.setOption(option);
	           },function(err){
	            });
			},
			
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
							var inner_data=JSON.parse(data_two.bodyText);
							console.log(inner_data);
							
							this.secondary_drop=inner_data;
							
							this.two_model_id_left=this.secondary_drop[0].flag?this.secondary_drop[0].id+','+this.secondary_drop[0].flag:this.secondary_drop[0].id+','+this.secondary_drop[0].types;
							this.sanJi_level_drop(this.two_model_id_left);
						},function(err){console.log("二级下拉框报错")})
			},
			sanJi_level_drop(data){//三级下拉框
							var id=data.slice(0,data.indexOf(","));
							var flag=data.slice(data.indexOf(",")+1);
							this.$http.get(api_demo.apis6+"/queryDemocraticLifeThreeSelect.action?id="+id+"&flag="+flag).then(function(data_therr){
								//左边的三级下拉菜单数据;
								this.three_level_drop=JSON.parse(data_therr.bodyText);
								if(this.three_level_drop[0]){
									this.three_model_id_left=this.three_level_drop[0].id?this.three_level_drop[0].id:'';
								};
							},function(err){console.log("三级下拉框数据报错")})
			},
			//党费缴纳数据图表
			echarts_1(id){
				var id=id?id:"610602,area";
				this.$http.get(api_demo.apis5+"/Partypayment.action?str="+id).then(function(data){
					var inner_data=JSON.parse(data.bodyText);
					var name_arr=[],data1_arr=[],data2_arr=[];
					inner_data.forEach(function(val,index){
						name_arr.push(val.months);
						data1_arr.push(val.totalnum);
						data2_arr.push(val.jiaofei);
					})
				
		    	let myChart=this.$echarts.init(document.getElementById("echarts_1")); 
				let option = {
					grid:{
						x:60,
		    			y:30,
		    			x2:80,
		    			y2:30
					},
					legend: {
					        data:['已缴纳','总人数'],
					        textStyle:{
						        	color:"#1299f5"
						    },
						    right:"3%",
						    itemGap:30
					},
					tooltip : {
				        trigger: 'axis',
				        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
				    xAxis: {
				    	name:"年月",
				    	nameTextStyle:{color:"#fff"},
				        type: 'category',
				        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
	                   },
				        data:name_arr
				    },
				    yAxis: {
				    	name:"个人",
				    	nameTextStyle:{color:"#fff"},
				        type: 'value',
				        axisLabel: {
                            show: true,
                            textStyle:{
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
				    	name:"已缴纳",
					    itemStyle:{
							normal:{color:'#26A4E3',barBorderRadius:[12, 12, 12, 12]}
					    },
				        data: data2_arr,
				        type: 'bar',
				        barWidth:16
				    },{
				    	name:"总人数",
					    itemStyle:{
							normal:{color:'#F56F71',barBorderRadius:[12,12,12, 12]}
					    },
				        data: data1_arr,
				        type: 'bar',
				        barWidth:16
				    }]
				};
		    	myChart.setOption(option);
		    	},function(err){console.log("党费缴纳err")})
			},
			//资源清单;
			select_ziyuan(){
			this.$http.get(api_demo.apis5+"/querySourceSelect.action#/").then(function(data){
					this.ziYuan=this.xuQiu=JSON.parse(data.bodyText);
					this.xuQiu_id=this.xuQiu[0].id;
					this.ziYuan_id=this.xuQiu[0].id;
					
				},function(err){console.log("资源清单err")})
			},
			//资源清单,需求清单图表
			echarts_2(id){
				var IDS=id?id:"2f4d626ddadd4744b73ddb118f55ea00";
				//资源清单下拉框数据
				this.$http.get(api_demo.apis5+"/queryOrgBySelectStreet.action?id="+IDS).then(function(data){
				var inner_data=JSON.parse(data.bodyText);
				var name_arr=[],data_arr=[];
				inner_data.forEach(function(val,index){
					name_arr.push(val.name);
					data_arr.push(val.value);
				})
				
				var myColors=[{
					color_start:"#47BAF4",
					color_end:"#1F92ED"
				},{
					color_start:"#AE78EE",
					color_end:"#8C50E4"
				}];
		    	let myChart=this.$echarts.init(document.getElementById("echarts_2")); 
				let option = {
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'shadow'
				        }
				    },
				    grid: {
				        x:100,
				        y:30,
				        x2:50,
				        y2:30
				    },
				    xAxis: {
				        show:false,
				        type: 'value',
				        boundaryGap: [0, 0.01]
				    },
				    dataZoom:[
				    	{
				    		type:"slider",
				    		yAxisIndex:0,
				    		start:100,
				    		end:70,
				    		right:20,
				    		borderColor:"#262C3E",
				    		handleStyle:{
				    			color:"#fff"
				    		},
				    		textStyle:{
				    			color:"#fff"
				    		}
				    	}
				    ],
				    yAxis: {
				        type: 'category',
				        axisLabel: {
                            textStyle: {
                                color: '#fff'
                            },
                            //处理文字过长时候显示省略号
                            formatter: function(value) {
							    if (value.length > 5) {
							      return value.substring(0, 5) + "...";
							    } else {
							      return value;
							    }
							}
	                   	},
				        data: name_arr
				    },
				    series: [
				        {
				            name: '今年',
				            itemStyle:{
									normal:{color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
						                  offset: 0,
						                  color: myColors[0].color_start
						                }, {
						                  offset: 1,
						                  color: myColors[0].color_end
						                }]),barBorderRadius:[5, 5, 5, 5]}
					    	},
				            type: 'bar',
				            barWidth:24,
				            data: data_arr,
				            label: {
				                normal: {
				                    show: true,
				                    position: 'right',
				                    textStyle:{
				                    	color:"#1F92ED"
				                    }
				                }
							}
				        }
				    ]
				};
		    	myChart.setOption(option);
		    	},function(err){console.log("资源数据报错")})
			},
			echarts_3(id){
				var IDS=id?id:"2f4d626ddadd4744b73ddb118f55ea00";
				//资源清单下拉框数据
				this.$http.get(api_demo.apis5+"/queryDemandSelect.action?id="+IDS).then(function(data){
				var inner_data=JSON.parse(data.bodyText);
				var name_arr=[],data_arr=[];
				inner_data.forEach(function(val,index){
					name_arr.push(val.name);
					data_arr.push(val.value);
				})
				
				let myColors=[{
					color_start:"#47BAF4",
					color_end:"#1F92ED"
				},{
					color_start:"#AE78EE",
					color_end:"#8C50E4"
				}];
		    	let myChart=this.$echarts.init(document.getElementById("echarts_3")); 
				let option = {
				    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'shadow'
				        }
				    },
				    grid: {
				        x:100,
				        y:30,
				        x2:50,
				        y2:30
				    },
				    xAxis: {
				        show:false,
				        type: 'value',
				        boundaryGap: [0, 0.01]
				    },
				    yAxis: {
				        type: 'category',
				        axisLabel: {
                            textStyle: {
                                color: '#fff'
                            },
                            //处理文字过长时候显示省略号
                            formatter: function(value) {
							    if (value.length > 5) {
							      return value.substring(0, 5) + "...";
							    } else {
							      return value;
							    }
							}
	                   	},
				        data: name_arr
				    },
				    dataZoom:[
				    	{
				    		type:"slider",
				    		yAxisIndex:0,
				    		start:100,
				    		end:70,
				    		right:20,
				    		borderColor:"#262C3E",
				    		handleStyle:{
				    			color:"#fff"
				    		},
				    		textStyle:{
				    			color:"#fff"
				    		}
				    	}
				    ],
				    series: [
				        {
				            name: '今年',
				            itemStyle:{
									normal:{color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
						                  offset: 0,
						                  color: myColors[0].color_start
						                }, {
						                  offset: 1,
						                  color: myColors[0].color_end
						                }]),barBorderRadius:[5, 5, 5, 5]}
					    	},
				            type: 'bar',
				            barWidth:24,
				            data: data_arr,
				            label: {
				                normal: {
				                    show: true,
				                    position: 'right',
				                    textStyle:{
				                    	color:"#1F92ED"
				                    }
				                }
							}
				        }
				    ]
				};
		    	myChart.setOption(option);
		    	},function(err){console.log("资源数据报错")})
			},
			
			
			//问题墙回音壁数据图表
			left_bottom(ones,twos,threes){
				var o_id=ones?ones:"610602,area";
				var t_id=twos?twos:"ALL";
				var f_id=threes?threes:"0";
//				return 
				this.$http.get(api_demo.apis5+"/problemAndechoCount.action?str="+o_id+"&type="+t_id+"&number="+f_id).then(function(data){
					var o=[],t=[],r=[],f=[],name_arr=[];
					var inner_data=JSON.parse(data.bodyText);
					console.log(inner_data);
					inner_data.forEach(function(val,index){
						name_arr.push(val.months);
						o.push(val.count_CD);
						t.push(val.count_CA);
						r.push(val.count_FY);
						f.push(val.count_SP);
					})
				
				let myChart=this.$echarts.init(document.getElementById("echart_boxs"));
				let option = {					    
					    tooltip : {
					        trigger: 'axis',
					        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					        }
					    },
					    legend: {
					    	y:"5%",
					    	itemGap:15,
					        data:['自己找','群众提','上级点','集体议'],
					        textStyle:{
						        	color:"#fff"
						    }
						},
					    //控制canvas画布内边距
					    grid: {
					        left: '3%',
					        right: '8%',
					        bottom: '6%',
					        containLabel: true
					    },
					    xAxis : [
					        {
					        	name:"年月",
					        	nameTextStyle:{
					        		color:"#fff"
					        	},
			
					            type : 'category',
					            data : name_arr,
					            axisTick: {
					                alignWithLabel: true
					            },
					             // x轴的字体样式
                        		axisLabel: {        
                                	show: true,
                                	rotate:-35,
                                	textStyle: {
                                    	color: '#fff',
                                    	fontSize:'12'
                                    }
                                }
					        }
					    ],
					    yAxis : [
					        {
					        	name:"数量（个）",
					        	nameTextStyle:{
					        		color:"#fff"
					        	},
					            type : 'value',
					            //改变y轴的字体颜色
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
					        }
					    ],
					    series : [
					        {
					            name:'自己找',
					            type:'bar',
					            barWidth: '24',
					            stack: '总量',
					            itemStyle:{
									normal:{color:'#F87B7C'}
								},
					            data:o
					        },{
					        	name:"群众提",
					        	type:'bar',
					        	barWidth:'24',
					        	stack: '总量',
					        	itemStyle:{
									normal:{color:"#61D797"}
								},
					            data:t
					        },{
					        	name:"上级点",
					        	type:'bar',
					        	barWidth:'24',
					        	stack: '总量',
					        	itemStyle:{
									normal:{color:"#B795DA"}
								},
					            data:r
					        },{
					        	name:"集体议",
					        	type:'bar',
					        	barWidth:'24',
					        	stack: '总量',
					        	itemStyle:{
									normal:{color:"#69B5F5"}
								},
					            data:f
					        }
					    ]
					};
	                myChart.setOption(option);
	                },function(err){console.log("问题墙数据err")})
			  	}
				
			  
		}
	}
</script>
<style scoped>
	.tese{
		color:white
	}
	/*100%*358*/
	.top_box{
		width:100%;
		height:358px;
	}
	.top_box .one{
		width:512px;
		height:356px;
	}
     .top_box .two{
     	width:1060px;
     	height:356px;
     	margin-left:14px;
     }
     .one,.two{
     	display:inline-block;
     	vertical-align: top;
     	padding-top:10px;
     	box-sizing:border-box;
		background-color:#0D1428;
     	border:1px solid #262C3E;
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
		padding-right: 32px;
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
	select[name="right_top"].ones_select{
		width:130px;
	}
	select[name="right_top"].twos_select{
		right:164px;
		width:130px;
	}
	select[name="right_top"].threes_select{
		width:130px;
		right:303px;
	}
	.echarts_1{
		width:100%;
		height:305px;
	}
	#echarts_2,#echarts_3{
		width:100%;
		height:325px;
	}
	#echart_boxs{
		width:100%;
		height:328px;
	}
     /*1540*379*/
    .bottom_box{
    	width:100%;
    	height:379px;
     	margin-top:14px;
    }
    .centers,.lefts,.lasts{
    	display:inline-block;
    	vertical-align:top;
		background-color:#0D1428;
    	border:1px solid #262C3E;
    	padding-top:10px;
    	box-sizing:border-box;
    }
    /*654*378*/
    .bottom_box .lefts{
    	width:673px;
    	height:378px;
    }
    /*427*378*/
    .bottom_box .centers{
    	width:440px;
    	height:378px;
    	margin-left:14px;
    }
    /*428*378*/
   .bottom_box .lasts{
   		width:440px;
   		height:378px;
   		margin-left:14px;
   }
   .echarts_first{
   	width:100%;
   	height:305px;
   }
</style>