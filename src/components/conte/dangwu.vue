<template>
	<div class="dangwu bottom_contes">
		<div class="left_box">
		   <div class="top_boxs">
			   	<div class="hezi_tit">
			    		<h3 class="title_dang2">累计数据统计</h3>
			    		<select name="right_top" class="tes" v-model="select_data">
		              		<option v-for="vals in select_arr" :value="vals.id">{{vals.name}}</option>
		                </select> 
			    </div>
			    <div class="lei_ji">
			    	    <div class="left" v-for="(vals,key) in data" :class="{left:key==0,right:key==1}">
			    	    	<h3 class="titles">{{vals.name}}</h3>
			    	    	<div class="cont_box">{{vals.value}}</div>
			    	    </div>
			    </div>
		   </div>
		   <div class="bottom_boxs">
		        <div class="hezi_tit">
			    		<h3 class="title_dang2">各终端发文统计</h3>
			    		<select name="right_top" v-model="wen_data">
		              		<option v-for="val in select_arr" :value="val.id">{{val.name}}</option>
		              	</select>
			    </div>
			    <div class="echart_1" id="dw_echart_1"></div>
		   </div>
		</div>
		<div class="right_box">
			<div class="right_tops">
			    <div class="hezi_tit">
			    		<h3 class="title_dang2">党务办公量信息统计图</h3>
			    		<select name="right_top" v-model="dw_data" class="tes">
		              		<option v-for="vals in select_arr" :value="vals.id">{{vals.name}}</option>
		              	</select>
			    </div>
			    <div class="echart_2" id="dw_echart_2"></div>
			</div>
			<div class="right_botoms">
			    <div class="hezi_tit">
			    		<h3 class="title_dang2">信息发布统计图</h3>
			    		<select class="tes" name="right_top" v-model="xx_data">
		              		<option v-for="vals in select_arr" :value="vals.id">{{vals.name}}</option>
		              	</select>
			    </div>
			    <div class="echart_3" id="dw_echarts_3"></div>
			</div>
		</div>
	</div>
</template>
<script>
//	import {Url_api} from "../../../static/js/API_URL.js";
	import api_demo from "../../../static/js/demo_api.js"
	
	export default{
		name:"dangwu",
		data(){
			return {
				data:[],
				select_arr:'',
				select_data:'610602',
				select_went:'',
				wen_data:'610602',
				select_dw:'',
				dw_data:'610602',
				select_xx:'',
				xx_data:'610602'
			}
		},
		watch:{
			select_data:function(news,old){
				this.left_select(news)
			},
			wen_data:function(news,old){
				this.wen_fun(news);
			},
			dw_data:function(news,old){
			   this.right_Topdata(news);
			},
			xx_data:function(news,old){
				this.right_botData(news);
			}
		},
		mounted:function(){
			this.left_select();
			this.wen_fun();
			this.right_Topdata();
			this.right_botData();
            var _this=this;
            //左上角的下拉框数据
            _this.$http.get(api_demo.apis2+"/LowerHairCountSelect.action").then(function(data){
            	this.select_arr=JSON.parse(data.bodyText);
            	console.log(this.select_arr)
            },function(){
//          	window.location.href="http://113.137.27.18:9000/BaoTaBigData/index.action"
            })
		},
		created:function(){
			//此处不调用函数ajax
		},
		methods:{
			//左上角数据获取
			left_select(u_id){
				var uid=u_id?u_id:610602;
				this.$http.get(api_demo.apis2+"/LowerHairCount.action?regionId="+uid).then(function(data){
					this.data=JSON.parse(data.bodyText);
				},function(){})
			},
			//左下角图表数据获取
			wen_fun(uid){
				var uids=uid?uid:610602;
				this.$http.get(api_demo.apis2+"/queryTerminalWay.action?regionId="+uids).then(function(data){
					let data_arr=JSON.parse(data.bodyText);
					let app_arr=[],pc_arr=[],all_arr=[],names_arr=[];
					data_arr.forEach(function(val){
						app_arr.unshift(val.data.app);
						pc_arr.unshift(val.data.pc);
						all_arr.unshift(val.data.total);
						names_arr.unshift(val.time);
					})
					this.echarts_1(app_arr,pc_arr,all_arr,names_arr)
				},function(){})
			},
			//右上角数据获取
			right_Topdata(uid){
				var uids=uid?uid:610602;
				this.$http.get(api_demo.apis2+"/queryPartyOfficeInformationData.action?regionId="+uids).then(function(data){
					let data_arr=JSON.parse(data.bodyText);
					let msg_arr=[],task_arr=[],supervise_arr=[],names_arr=[];
					data_arr.forEach(function(val){
						msg_arr.unshift(val.data.msg);  //消息
						task_arr.unshift(val.data.task);  //公文
						supervise_arr.unshift(val.data.supervise);  //监督
						names_arr.unshift(val.time);   //时间
					})
					this.echarts_2(msg_arr,task_arr,supervise_arr,names_arr)
				},function(){})
			},
			//右下角数据获取
			//http://192.168.0.120:8888/BaoTaBigData/bigData/queryPublishInfoCount.action
			right_botData(uid){
				var uids=uid?uid:610602;
				this.$http.get(api_demo.apis2+"/queryPublishInfoCount.action?regionId="+uids).then(function(data){
					let data_arr=JSON.parse(data.bodyText);
					let shyk_arr=[],activity_arr=[],names_arr=[];
					data_arr.forEach(function(val){
						shyk_arr.unshift(val.data.shyk);  //三会一课
						activity_arr.unshift(val.data.activity);  //支部活动
						names_arr.unshift(val.time);   //时间
					})
					this.echarts_3(shyk_arr,activity_arr,names_arr);
				},function(error){console.log(error)})
			},
			//各终端发文统计图表
			echarts_1(a,b,c,d){
				let myChart=this.$echarts.init(document.getElementById("dw_echart_1"));
				let option = {
					    legend: {
					        data:['app','管理后台'],
					        textStyle:{
						        	color:"#1299f5"
						    },
						    itemGap:30
					    },
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
					        y2: '0',
					        containLabel: true
					    },
					    xAxis : [
					        {
					            type : 'category',
					            data : d,
					            axisTick: {
					                alignWithLabel: true
					            },
					            // x轴的字体样式
                        		axisLabel: {        
                                	show: true,
                                	rotate:30,
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
					        }
					    ],
					    series : [
					        {
					            name:'app',
					            type:'bar',
					            barWidth: '31',
					            stack:"标示",
					            label: {
						                normal: {
						                    show: true,
						                    position: 'insideTop'
						                }
						        },
					            itemStyle:{
									normal:{color:'#FF9080'}
								},
					            data:a
					        },
					        {
					            name:'管理后台',
					            type:'bar',
					            barWidth: '31',
					            stack:"标示",
					            label: {
						                normal: {
						                    show: true,
						                    position: 'insideTop'
						                }
						        },
					           	itemStyle:{
									normal:{color:'#00BFB7'}
								},
					            data:b
					        },{
							    name: '交易量',
							    type: 'line',
							    symbolSize: 6,     //拐点大小
//							    symbolOffset:[0,"-200%"],
								smooth:true,
							    itemStyle: {
							        normal: {
							            color:"#ffe614",     //折点颜色
							            lineStyle: {
							                color: '#d6c641',    //折线颜色
							            }
							        }
							    },
							     label: {
						                normal: {
						                    show: true,
						                    position: 'top'
						                }
						        },
							    data:c
							}
					    ]
				};
	            myChart.setOption(option);
			}
			//党务办公量信息统计图图表
		    ,echarts_2(msg,task,supervise,times){ 
		    	let myChart=this.$echarts.init(document.getElementById("dw_echart_2")); 
		    	let option = {
		    		legend: {
		    				right:"3%",
					        data:[{
					        	name:'消息',
					        	itemStyle:{color:"red"}
					        },'公文','督查'],
					        textStyle:{
						        	color:"#1299f5"
						    },
						    itemGap:30
					},
					tooltip:{
						show:true
					},
		    		grid:{
		    			x:60,
		    			y:40,
		    			x2:60,
		    			y2:30
		    		},
				    xAxis: {
				        type: 'category',
				        // x轴的字体样式
                		axisLabel: {        
                        	show: true,
                        	textStyle: {
                            	color: '#fff',
                            	fontSize:'12'
                        	}
                        },
				        data:times
				    },
				    yAxis: {
				        type: 'value',
				        axisLabel: {        
                                	show: true,
                                	textStyle: {
                                    	color: '#fff',
                                    	fontSize:'12'
                                	},
                                	formatter:function(value){
	                        		  return value/1000+"k"
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
				    		name:"公文",
					        data: task,
					        type: 'line',
					        symbol: 'triangle',
					        symbolSize: 10,
					        itemStyle: {
						        normal: {
						            color: "#e42889",
						            lineStyle: {
						                color: "#e42889",
						                width:2
						            }
						        }
						    }
				       },
				       {
				       	    name:"督查",
					        data: supervise,
					        type: 'line',
					        symbolSize: 10,
					        itemStyle: {
						        normal: {
						            color: "#0cb429",
						            lineStyle: {
						                color: "#0cb429",
						                width:2
						            }
						        }
						    }
				       },
				       {
				       	    name:"消息",
					        data:msg,
					        type: 'line',
					        symbol: 'square',
					        symbolSize: 10,
					        itemStyle: {
						        normal: {
						            color: "#f8bd00",
						            lineStyle: {
						                color: "#f8bd00",
						                width:2
						            }
						        }
						    }
				       },
				    ]
				};
		    	myChart.setOption(option);
		    },
		    //信息发布统计图图表
		    echarts_3(shyk,activity,name){
		    	let myChart=this.$echarts.init(document.getElementById("dw_echarts_3")); 
		    	let option = {
		    			grid:{
			    			x:60,
			    			y:40,
			    			x2:60,
			    			y2:30
		    			},
		    			legend: {
		    				right:"3%",
					        data:['支部活动','三会一课'],
					        textStyle:{
						        	color:"#fff"
						    },
						    itemGap:30
						},
		    			tooltip: {
					        trigger: 'axis'
					    },
					    xAxis: {
					    	name:"月份",
					    	nameTextStyle:{color:"#fff"},
					        type: 'category',
					        data: name,
					        axisLabel: {        
	                        	show: true,
	                        	textStyle: {
	                            	color: '#fff',
	                            	fontSize:'12'
	                        	}
                        	}

					    },
					    yAxis: {
					    	name:"条数",
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
					    		name:"支部活动",
						        data: activity,
						        type: 'line',
						        symbolSize: 10
					    	},
					    	{
					    		name:"三会一课",
						        data:shyk,
						        type: 'line',    
						        symbolSize: 10
					    	}
					    ]
					};
		    	myChart.setOption(option);
		    }
		}
	}
</script>
<style scoped>
	.dangwu{
		color:white
	}
	.left_box,.right_box{
		display:inline-block;
		vertical-align:top;
	}
	.left_box{
		width:729px;
	}
	/*697*233*/
	.left_box .top_boxs{
		width:100%;
		height:233px;
		border:1px solid #262C3E;
		background-color:#0D1428;
		padding-top:10px;
		box-sizing:border-box;
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
	.tes{
		padding-right:35px;
		box-sizing:border-box
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
	/*697*525*/
	.left_box .bottom_boxs{
		width:100%;
		height:520px;
		border:1px solid #262C3E;
		margin-top:14px;
		background-color:#0D1428;
		padding-top:10px;
		box-sizing:border-box;
	}
	
	/*15px;*/
	.right_box{
		margin-left:15px;
		width:846px;
		height:auto;
	}
	.right_box .right_tops{
		width:100%;
		height:291px;
		border:1px solid #262C3E;
		background-color:#0D1428;
		padding-top:10px;
		box-sizing:border-box;
	}
	.right_box .right_botoms{
		width:100%;
		height:462px;
		margin-top:14px;
		border:1px solid #262C3E;
		background-color:#0D1428;
		padding-top:10px;
		box-sizing:border-box;
	}
	.lei_ji{
		width:100%;
		height:182px;
		padding:20px 17px;
		box-sizing:border-box;
	}
	/*315*139*/
	.lei_ji .left,.lei_ji .right{
		width:335px;
		height:139px;
		display:inline-block;
		vertical-align:top;
		border:1px solid #262C3E;
		border-radius:5px;
		background-color:#1C233A;
		position:relative;
		overflow:hidden;
		padding-top:15px;
		box-sizing:border-box;
	}
	.lei_ji .left:before,.lei_ji .right:before{
		content:"";
		position:absolute;
		border-top:10px solid yellow;
		border-right:10px solid yellow;
		border-bottom:10px solid transparent;
		border-left:10px solid transparent;
		right:0;
		top:0;
		filter:blur(1px);
	}
	.lei_ji .right{
		margin-left:14px;
	}
	.titles{
		width:100%;
		text-align:center;
		font-weight:bold;
		font-size:18px;
		color:#1176C0;
	}
	.cont_box{
         width:80%;
         height:50px;
         box-shadow:0 0 5px -2px #cfcfcd;
         margin:15px auto 0;
         background-color:#020A21;
         color:#F5E711;
         font-weight:bold;
         text-align:center;
         line-height:50px;
         font-size:34px;
         letter-spacing:20px;
         padding-left:20px;
         box-sizing:border-box;
	}
	.echart_1{
		width:100%;
		height:466px;
	}
	.echart_2{
		width:100%;
		height:240px;
	}
	.echart_3{
		width:100%;
		height:410px;
	}
</style>