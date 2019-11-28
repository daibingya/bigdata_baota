<template>
	<div class="hudong bottom_contes">
		<div class="top_Box">
		    <div class="ones">
		    	<div class="hezi_tit">
			    		<h3 class="title_dang2">党组织活跃度</h3>
			    		<select name="right_top" v-model="dzz_data">
		              		<option v-for="vals in dzz_select" :value="vals.id">{{vals.name}}</option>
		              	</select>
			    </div>
			    <div class="hd_echarts_1" id="hd_echarts_1"></div>
		    </div>
		    <div class="twos">
		    	<div class="hezi_tit">
			    		<h3 class="title_dang2">当日活跃度</h3>
			    		<select name="right_top" v-model="dr_data" style="padding-right:30px">
		              		<option v-for="vals in dr_select" :value="vals.id">{{vals.name}}</option>
		              	</select>
			    </div>
			    <div class="hd_echarts_3" id='hd_echarts_3'></div>
		    </div>
		</div>
		
		<div class="bottom_Box">
			<div class="fasts">
				<div class="hezi_tit">
			    		<h3 class="title_dang2">互动情况</h3>
			    		<select name="right_top" v-model="hd_data">
		              		<option v-for="vals in dzz_select" :value="vals.id">{{vals.name}}</option>
		              	</select>
			    </div>
			    <div class="hd_echarts_2" id="hd_echarts_2"></div>
			</div>
			<div class="centers">
				<div class="hezi_tit">
			    		<h3 class="title_dang2">创先优评</h3>
			    		<select name="right_top" v-model="texts"> 
		              		<option v-for="vals in chuang_data" :value="vals.id">{{vals.name}}</option>
		              	</select>
			    </div>
			    <ul class="piao_box">
			    	<li>
			    		<p>{{user}}</p>
			    		<p>参与人数</p>
			    	</li>
			    	<li>
			    		<p>{{piao}}</p>
			    		<p>获得票数</p>
			    	</li>
			    </ul>
			</div>
			<div class="lasts">
				<div class="hezi_tit">
			    		<h3 class="title_dang2">头条发布统计</h3>
			    		<select name="right_top" class="ones_select" v-model="nian">
		              		<option :value="yers" v-for="yers in time_date">{{yers}}年</option>
		              	</select>
			    		<select name="right_top" class="twos_select" v-model="yue">
		              		<option :value="yue" v-for="yue in yue_date">{{yue}}月</option>
		              	</select>
		              	<div class="cha_x" @click="query()">查询</div>
			    </div>
			    <div class="hd_eahcrts_last" id="hd_eahcrts_last">
			    	
			    </div>
			</div>
		</div>
	</div>
</template>
<script>
	
//	import {Url_api} from "../../../static/js/API_URL.js";
	import api_demo from "../../../static/js/demo_api.js"
	
	export default{
		name:"hudong",
		data(){
			return {
				nian:2018,
				user:'',
				piao:'',
				yue:'',
				texts:'',
				chuang_data:'',
				time_date:[],
				yue_date:[],
				righ_top_select:'',
				righ_top_data:'610602',
				dzz_select:'',
				dzz_data:'610602',
				hd_select:'',
				hd_data:'610602',
				dr_select:'',
				dr_data:'610602'
			}
		},
		mounted:function(){
            this.getNewtime();
            this.dr_Fun(); 
            this.dzz_Hyd();
            this.hd_Fun();
		},
		watch: {
	    	texts: function (val,oldval) {
	         let id=val;
             this.$http.get(api_demo.apis3+"/queryOutstandingVoteData.action?selectId="+id).then(function(data){
             	 let _all=JSON.parse(data.bodyText)[0];
         		 this.user=_all.all_user;
         		 this.piao=_all.all_piao;
             },function(){})
	    	},
	    	dzz_data:function(news,old){
	    		this.dzz_Hyd(news);
	    	},
	    	hd_data:function(news,old){
	    		this.hd_Fun(news);
	    	},
	    	dr_data:function(news,old){
	    		this.dr_Fun(news);
	    	}
	    },
		created:function(){
			var _this=this;
			//左上角下拉框数据
			!function(){
				_this.$http.get(api_demo.apis3+"/queryInteractionDataSelectContent.action").then(function(data){
					this.dzz_select=JSON.parse(data.bodyText);
					console.log(this.dzz_select);
				},function(){})
			}()
            //右上角下拉框数据
            !function(){
				_this.$http.get(api_demo.apis3+"/queryTodayActiveDataSelectName.action").then(function(data){
					this.dr_select=JSON.parse(data.bodyText);
				},function(){})
			}()
			
			//创先优评获取数据
			!function(){
				_this.$http.get(api_demo.apis3+"/queryOutstandingSelectData.action").then(function(data){
					this.chuang_data=JSON.parse(data.bodyText);
					this.texts=JSON.parse(data.bodyText)[0].id;
					this.$http.get(api_demo.apis3+"/queryOutstandingVoteData.action?selectId="+this.texts).then(function(data){
	             		 let _all=JSON.parse(data.bodyText)[0];
	             		 this.user=_all.all_user;
	             		 this.piao=_all.all_piao;
	             	},function(){})
				},function(){})
			}()
			 
			//头条发布统计
			!function(){ 
				 //当前年
				 let new_time=new Date().getFullYear();
				 //当前月
				 let num="0"+(new Date().getMonth()+1);
				 _this.yue=num;
				 _this.$http.get(api_demo.apis3+"/queryTopLineData.action?time="+new_time+"-"+num).then(function(data){
					var datas=JSON.parse(data.bodyText);
					if(!datas.data[0]){
					   datas.data[0]={
					   		zgtt:0,
						   	jrtt:0,
						   	hdtt:0,
						   	jhtt:0
					   	};
					}
					var obj_data=datas.data[0];
					var a=0;
					for(let val in obj_data){
						a+=obj_data[val]
					}
					this.echart_last(datas,a);
				},function(){})
			}()
		},
		methods:{
			//模拟时间插件
			getNewtime(){
				var new_time=new Date().getFullYear();
				this.nian=new_time;
				for(let i=0;i<10;i++){
					this.time_date.push(new_time-i);
				}
				for(let y=1;y<=12;y++){
					if(y<10){
						this.yue_date.push("0"+y);
					}else{
						this.yue_date.push(y);
					}
				}
			},
			query(){
				this.$http.get(api_demo.apis3+"/queryTopLineData.action?time="+String(this.nian)+"-"+String(this.yue)).then(function(data){
					var datas=JSON.parse(data.bodyText);
					if(!datas.data[0]){
					   datas.data[0]={
					   		zgtt:0,
						   	jrtt:0,
						   	hdtt:0,
						   	jhtt:0
					   	};
					}
					var obj_data=datas.data[0];
					var a=0;
					for(let val in obj_data){
						a+=obj_data[val]
					}
					this.echart_last(datas,a);
				},function(){
//					window.location.href="http://113.137.27.18:9000/BaoTaBigData/index.action"
				})
			},
			
			//当日活跃度获取数据
			dr_Fun(uid){ 
				
				let uids=uid?uid:610602;
				if(!uid){
					 //创建数据加载层文字
	                 let echart_dom=document.getElementById("hd_echarts_3");
	                 let divs=document.createElement("div");
	                 divs.innerHTML="正在加载，请等待...";
	                 divs.style.width="150px";
	                 divs.style.height="50px";
	                 divs.style.lineHeight="50px";
	                 divs.style.margin="150px auto 0";
	                 echart_dom.appendChild(divs);
		        }
				this.$http.get(api_demo.apis3+"/queryTodayActiveData.action?regionId="+uids).then(function(data){
					let data_arr=JSON.parse(data.bodyText);
					let app_arr=[],pc_arr=[],names_arr=[];
					data_arr.forEach(function(val){
						app_arr.push(val.data.app);
						pc_arr.push(val.data.pc);
						names_arr.push(val.time);
					})
					this.echarts_3(app_arr,pc_arr,names_arr)
				},function(error){
					console.log("获取失败")
				})
			},
			
			//党组织活跃度获取数据           
			dzz_Hyd(uid){
				let uids=uid?uid:610602;
				this.$http.get(api_demo.apis3+"/queryInteractionData.action?regionId="+uids).then(function(data){
					let data_arr=JSON.parse(data.bodyText);
					let app_arr=[],pc_arr=[],names_arr=[];
					data_arr.forEach(function(val){
						app_arr.unshift(val.data.app);
						pc_arr.unshift(val.data.pc);
						names_arr.unshift(val.time);
					})
					this.echarts_1(app_arr,pc_arr,names_arr)
				},function(){})
			},
			//互动情况获取数据
			hd_Fun(uid){
				let uids=uid?uid:610602;
			   				this.$http.get(api_demo.apis3+"/queryinteractData.action?regionId="+uids).then(function(data){
					let data_arr=JSON.parse(data.bodyText);
					let xdSh_arr=[],xdFb_arr=[],gwSh_arr=[],gwFb_arr=[],time_arr=[];
					data_arr.forEach(function(val){
						xdSh_arr.unshift(val.data.xindeshenhe);
						xdFb_arr.unshift(val.data.xindefabu);
						gwSh_arr.unshift(val.data.fanwushenhe);
						gwFb_arr.unshift(val.data.ganwufabu);
						time_arr.unshift(val.time)
					})
					this.echarts_2(xdSh_arr,xdFb_arr,gwSh_arr,gwFb_arr,time_arr)
				},function(){})
			},
			//党组织活跃度图表
			echarts_1(app,pc,name){
		    	let myChart=this.$echarts.init(document.getElementById("hd_echarts_1")); 
				let option = {
					grid:{
						x:60,
		    			y:30,
		    			x2:80,
		    			y2:30
					},
					legend: {
						icon:"rect",
                        itemGap:30,
				        data:['客户端','管理后台'],
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
				    	name:"年月",
				    	nameTextStyle:{color:"#fff"},
				        type: 'category',
				        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
	                   },
				        data:name
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
				    	name:"客户端",
					    itemStyle:{
							normal:{color:'#ED5294'}
					    },
				        data: pc,
				        type: 'bar',
				        barWidth:13,
				        barGap:0  
				    },{
				    	name:"管理后台",
					    itemStyle:{
							normal:{color:'#0D9CEB'}
					    },
				        data:app,
				        type: 'bar',
				        barWidth:13
				    }]
				};
		    	myChart.setOption(option);
			},
			//互动情况图表
			echarts_2(xdSh,xdFb,gwSh,gwFb,time){
		    	let myChart=this.$echarts.init(document.getElementById("hd_echarts_2")); 
		    	let option = {
			    		legend: {
			    			    right:"3%",
						        data:['心得体会发布','心得体会审核通过','微感悟发布','微感悟审核通过'],
						        textStyle:{
							        	color:"#fff",
							        	fontSize:12
							    }
						},
		    			grid:{
			    			x:60,
			    			y:40,
			    			x2:60,
			    			y2:50
		    			},
		    			tooltip: {
					        trigger: 'axis'
					    },
					    xAxis: {
					    	name:"年份",
					    	nameTextStyle:{color:"#fff"},
					        type: 'category',
					        data: time,
					        axisLabel: {        
	                        	show: true,
	                        	rotate:40,
	                        	textStyle: {
	                            	color: '#fff',
	                            	fontSize:'12'
	                        	}
                        	}

					    },
					    yAxis: {
					    	name:"数量",
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
					    		name:"心得体会发布",
						        data: xdFb,
						        type: 'line',
						        symbol: 'circle',
						        symbolSize: 5,
						        itemStyle:{
					                normal:{
					                    lineStyle:{
					                        color:"#E3746F"
					                    }
					                }
					            }
					    	},
					    	{
					    		name:"心得体会审核通过",
						        data: xdSh,
						        type: 'line',
						        symbol: 'circle',
						        symbolSize: 5,
						        itemStyle:{
					                normal:{
					                    lineStyle:{
					                        color:"#1DA4DB"
					                    }
					                }
					            } 
					    	},
					    	{
					    		name:"微感悟发布",
						        data: gwFb,
						        type: 'line',
						        symbolSize: 5,
						        symbol: 'circle',
						        itemStyle:{
					                normal:{
					                    lineStyle:{
					                        color:"#E2CA00"
					                    }
					                }
					            } 
					    	},
					    	{
					    		name:"微感悟审核通过",
						        data:gwSh,
						        type: 'line',
						        symbol: 'circle',
						        symbolSize: 5,
						        itemStyle:{
					                normal:{
					                    lineStyle:{
					                        color:"#00E285"
					                    }
					                }
					            } 
					    	}
					    ]
					};
		    	myChart.setOption(option);
		   },
		    //当日活跃度图表
		    echarts_3(app,pc,time){
		    	var myChart=this.$echarts.init(document.getElementById("hd_echarts_3"));
		    	var option = {
		    			grid:{
			    			x:60,
			    			y:30,
			    			x2:60,
			    			y2:45
		    			},
		    			legend: {
			    			    right:"3%",
						        data:['客户端','管理后台'],
						        textStyle:{
							        	color:"#fff"
							    },
							    itemGap:30
						},
		    			tooltip: {
					        trigger: 'axis'
					    },
					    xAxis: {
					    	name:"时间",
					    	nameTextStyle:{color:"#fff"},
					        type: 'category',
					        data: time,
					        axisLabel: {        
	                        	show: true,                            
	                        	rotate:45,
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
					    		name:"客户端",
						        data: app,
						        type: 'line',
						        symbolSize: 8,
						        itemStyle:{
					                normal:{
					                    lineStyle:{
					                        color:"#ED5294"
					                    }
					                }
					            } 
					    	},
					    	{
					    		name:"管理后台",
						        data: pc,
						        type: 'line',
						        symbolSize: 8,
						        itemStyle:{
					                normal:{
					                    lineStyle:{
					                        color:"#0D9CEB"
					                    }
					                }
					            } 
					    	}
					    ]
					};
					clearTimeout(loadingTicket);
					var loadingTicket=setTimeout(function (){
					    myChart.hideLoading();
					    myChart.setOption(option);
					},1000);
		    	myChart.setOption(option);
		    },
		    //头条发布统计图表
		    echart_last(datas,a){
		    	console.log(datas);
		    	let myChart=this.$echarts.init(document.getElementById("hd_eahcrts_last")); 
				let	option = {
					    title: {
					        text: '发布总计：'+a+'条',
					        left:75,
					        top:25,
					        textStyle:{
					        	color:"#fff",
					        	fontSize:14
					        }
					    },
					    tooltip: {
					        trigger: 'axis',
					        axisPointer: {
					            type: 'shadow'
					        }
					    },
					    grid: {
					        left: '3%',
					        right: '4%',
					        bottom: '3%',
					        containLabel: true
					    },
					    xAxis: {
					    	show:false
					    },
					    yAxis: {
					        type: 'category',
					        data: ['活动头条','讲话头条','组工头条','今日头条'],
				            axisLabel: {        
	                        	show: true,
	                        	textStyle: {
	                            	color: '#fff'
	                        	}
                        	}
					    },
					    series: [
					        {
					            name: datas.time,
					            type: 'bar',
					            barWidth:27,
					            data: [ datas.data[0].hdtt,datas.data[0].jhtt, datas.data[0].zgtt, datas.data[0].jrtt],
					            itemStyle:{
				            	//设置隔行换色
				            		normal:{
					            		color:function(params){
					            			let colorList=["#EF639E","#25A6ED","#EE9920","#9B77DD"];
					            			return colorList[params.dataIndex];
					            		}
				            		}
				            	},
				            	label: {
						                normal: {
						                    show: true,
						                    position: 'right'
						                }
						        }
					        }
					    ]
					};
		    	myChart.setOption(option);
		    }
		}
	}
</script>
<style scoped>
	.hudong{
		color:white
	}
	.top_Box{
		width:100%;
		height:436px;
	}
	.ones,.twos{
		display:inline-block;
		vertical-align:top;
		padding-top:10px;
		box-sizing:border-box
	}
	/*870*436*/
	.top_Box .ones{
		width:900px;
		height:100%;
		border:1px solid  #262C3E;
		background-color:#0D1428;
	}
	.centers .hezi_tit select{
		position:inherit;
		width:100%;
		box-sizing:border-box;
		left:0;
		top:10px;
		right:0;
		margin:auto;
		padding-right:30px;
		background-position:100% 50%;
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
	.hezi_tit .twos_select{
		right:95px;
	}
	.hezi_tit .ones_select{
		right:234px;
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
	.hd_echarts_1{
		width:100%;
		height:380px;
	}
	.hd_echarts_2{
		width:100%;
		height:250px;
	}
	.hd_echarts_3{
		width:100%;
		height:385px;
		color:white;
		text-align:center;
	}
	.piao_box{
		width:100%;
		height:125px;
		margin:50px auto 0;
		font-size:0;
	}
	.piao_box li{
		width:50%;
		height:100%;
		display:inline-block;
		vertical-align:top;
		font-size:16px;
		text-align:center;
	}
	.piao_box li:nth-child(1){
		border-right:1px solid #262C3E;
		box-sizing:border-box;
	}
	.piao_box li:nth-child(1) p:nth-child(1){
		font-size:34px;
		color:#0D9CEB;
		font-weight:bold;
	}
	.piao_box li:nth-child(2) p:nth-child(1){
		font-size:34px;
		color:#ED5294;
		font-weight:bold;
	}
	.piao_box li:nth-child(1) p:nth-child(2),.piao_box li:nth-child(2) p:nth-child(2){
		font-size:14px;
		color:#fff;
		font-weight:bold;
		width:90px;
		height:35px;
		border-radius:17.5px;
		text-align:center;
		line-height:35px;
		margin:25px auto 0;
	}
	.piao_box li:nth-child(1) p:nth-child(2){
	   	background-color:#0D9CEB;	
	}
	.piao_box li:nth-child(2) p:nth-child(2){
		background-color:#ED5294;
	}
	.cha_x{
		width:65px;
		height:28px;
		background-color:#0D78C1;
		border-radius:3px;
		cursor:pointer;
		color:white;
		font-size:14px;
		text-align:center;
		line-height:28px;
		position:absolute;
		right:25px;
		top:0;
	}
	/*655*436*/
	.top_Box .twos{
		width:672px;
		height:100%;
		border:1px solid #262C3E;
		background-color:#0D1428;
		margin-left:14px;
	}
	
	.bottom_Box{
		width:100%;
		height:300px;
		margin-top:14px;
	}
	.fasts,.centers,.lasts{
		display:inline-block;
		vertical-align:top;
		padding-top:10px;
		box-sizing:border-box;
	}
	.bottom_Box .fasts{
		width:583px;
		height:100%;
		border:1px solid #262C3E;
		background-color:#0D1428;
	}
	.bottom_Box .centers{
		width: 300px;
		height:100%;
		border:1px solid #262C3E;
		background-color:#0D1428;
		margin-left:14px;
	}
	.bottom_Box .lasts{
		width:672px;
		height:100%;
		border:1px solid #262C3E;
		background-color:#0D1428;
		margin-left:14px;
	}
	.hd_eahcrts_last{
		width:100%;
		height:248px;
	}
</style>